import React, { createContext, useContext, useState, useCallback } from 'react';
import { StudentSession, StudentAnswer, ClassPerformance, StandardPerformance } from '@/types/sol';

interface AppState {
  // Auth
  isLoggedIn: boolean;
  isTeacher: boolean;
  nickname: string;
  classCode: string;
  // Student session
  session: StudentSession | null;
  // Class data (simulated aggregate)
  classData: Record<string, ClassPerformance>;
  // Actions
  loginAsStudent: (nickname: string, classCode: string) => void;
  loginAsTeacher: (classCode: string) => void;
  logout: () => void;
  recordAnswer: (answer: StudentAnswer) => void;
  getStandardPerformance: (standardId: string) => StandardPerformance;
}

const AppContext = createContext<AppState | null>(null);

export function useAppState() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppState must be used within AppProvider');
  return ctx;
}

function createEmptyPerformance(standardId: string): StandardPerformance {
  return {
    standardId,
    total: 0,
    correct: 0,
    memorization: { total: 0, correct: 0 },
    sequence: { total: 0, correct: 0 },
    stimulus: { total: 0, correct: 0 },
  };
}

// Simulated class data for teacher view demo
function generateDemoClassData(classCode: string): ClassPerformance {
  const standards = ['VUS.1','VUS.2','VUS.3','VUS.4','VUS.5','VUS.6','VUS.7','VUS.8','VUS.9','VUS.10','VUS.11','VUS.12','VUS.13','VUS.14','VUS.15','VUS.16','VUS.17'];
  const perf: Record<string, StandardPerformance> = {};

  standards.forEach(sid => {
    const total = Math.floor(Math.random() * 30) + 20;
    const correctRate = 0.3 + Math.random() * 0.5;
    const correct = Math.floor(total * correctRate);
    perf[sid] = {
      standardId: sid,
      total,
      correct,
      memorization: { total: Math.floor(total * 0.4), correct: Math.floor(total * 0.4 * (correctRate + (Math.random() - 0.5) * 0.2)) },
      sequence: { total: Math.floor(total * 0.3), correct: Math.floor(total * 0.3 * (correctRate + (Math.random() - 0.5) * 0.2)) },
      stimulus: { total: Math.floor(total * 0.3), correct: Math.floor(total * 0.3 * (correctRate + (Math.random() - 0.5) * 0.3)) },
    };
  });

  return { classCode, standards: perf, totalStudents: Math.floor(Math.random() * 20) + 10 };
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [nickname, setNickname] = useState('');
  const [classCode, setClassCode] = useState('');
  const [session, setSession] = useState<StudentSession | null>(null);
  const [classData, setClassData] = useState<Record<string, ClassPerformance>>({});

  const loginAsStudent = useCallback((nick: string, code: string) => {
    setNickname(nick);
    setClassCode(code);
    setIsLoggedIn(true);
    setIsTeacher(false);
    setSession({
      nickname: nick,
      classCode: code,
      answers: [],
      currentStandardIndex: 0,
      currentQuestionIndex: 0,
      feedbackMode: false,
      feedbackQuestions: [],
      feedbackIndex: 0,
    });
  }, []);

  const loginAsTeacher = useCallback((code: string) => {
    setClassCode(code);
    setIsLoggedIn(true);
    setIsTeacher(true);
    // Generate demo data
    if (!classData[code]) {
      setClassData(prev => ({ ...prev, [code]: generateDemoClassData(code) }));
    }
  }, [classData]);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setIsTeacher(false);
    setNickname('');
    setClassCode('');
    setSession(null);
  }, []);

  const recordAnswer = useCallback((answer: StudentAnswer) => {
    setSession(prev => {
      if (!prev) return prev;
      return { ...prev, answers: [...prev.answers, answer] };
    });
    // Update class data
    setClassData(prev => {
      const code = classCode;
      const existing = prev[code] || { classCode: code, standards: {}, totalStudents: 1 };
      const sp = existing.standards[answer.standardId] || createEmptyPerformance(answer.standardId);
      sp.total++;
      if (answer.correct) sp.correct++;
      const cat = sp[answer.errorCategory];
      cat.total++;
      if (answer.correct) cat.correct++;
      return {
        ...prev,
        [code]: { ...existing, standards: { ...existing.standards, [answer.standardId]: { ...sp } } }
      };
    });
  }, [classCode]);

  const getStandardPerformance = useCallback((standardId: string): StandardPerformance => {
    if (!session) return createEmptyPerformance(standardId);
    const answers = session.answers.filter(a => a.standardId === standardId);
    const perf = createEmptyPerformance(standardId);
    answers.forEach(a => {
      perf.total++;
      if (a.correct) perf.correct++;
      const cat = perf[a.errorCategory];
      cat.total++;
      if (a.correct) cat.correct++;
    });
    return perf;
  }, [session]);

  return (
    <AppContext.Provider value={{
      isLoggedIn, isTeacher, nickname, classCode,
      session, classData,
      loginAsStudent, loginAsTeacher, logout,
      recordAnswer, getStandardPerformance,
    }}>
      {children}
    </AppContext.Provider>
  );
}
