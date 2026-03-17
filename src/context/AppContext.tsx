import React, { createContext, useContext, useState, useCallback } from 'react';
import { StudentSession, StudentAnswer, ClassPerformance, StandardPerformance, VocabClick, StudentRecord } from '@/types/sol';

interface RetakeRecord {
  standardId: string;
  retakeNumber: number;
  correct: number;
  total: number;
  byCategory: Record<string, { correct: number; total: number }>;
}

interface AppState {
  isLoggedIn: boolean;
  isTeacher: boolean;
  nickname: string; // Remediation ID (PP-101)
  classCode: string;
  session: StudentSession | null;
  classData: Record<string, ClassPerformance>;
  retakeHistory: Record<string, RetakeRecord[]>; // by remediation ID
  loginAsStudent: (remediationId: string, classCode: string, quizMode?: 'unit-mastery' | 'mock-sol', selectedUnit?: string, coachPersonality?: 'historian' | 'gen-alpha') => void;
  loginAsTeacher: (classCode: string) => void;
  logout: () => void;
  recordAnswer: (answer: StudentAnswer) => void;
  getStandardPerformance: (standardId: string) => StandardPerformance;
  logVocabClick: (term: string) => void;
  incrementHints: () => void;
  trackVersionUsed: (templateId: string, version: number) => void;
}

const AppContext = createContext<AppState | null>(null);

export function useAppState() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppState must be used within AppProvider');
  return ctx;
}

function createEmptyPerformance(standardId: string): StandardPerformance {
  return {
    standardId, total: 0, correct: 0,
    memorization: { total: 0, correct: 0 },
    sequence: { total: 0, correct: 0 },
    stimulus: { total: 0, correct: 0 },
  };
}

function generateDemoStudentRecords(classCode: string): Record<string, StudentRecord> {
  const standards = ['VUS.2','VUS.3','VUS.4','VUS.5','VUS.6','VUS.7','VUS.8','VUS.9','VUS.10','VUS.11','VUS.12','VUS.13','VUS.14','VUS.15','VUS.16','VUS.17'];
  const studentIds = ['PP-101','PP-102','PP-103','PP-104','PP-105','PP-106','PP-107','PP-108','PP-109','PP-110'];
  const records: Record<string, StudentRecord> = {};
  studentIds.forEach(id => {
    const stdData: Record<string, { correct: number; attempts: number }> = {};
    const unitAttempts: Record<string, number> = {};
    standards.forEach(sid => {
      const attempts = Math.floor(Math.random() * 8) + 1;
      const correct = Math.floor(Math.random() * (attempts + 1));
      stdData[sid] = { correct, attempts };
    });
    // Random unit attempts
    ['VUS.14','VUS.9','VUS.7'].forEach(u => {
      unitAttempts[u] = Math.floor(Math.random() * 4) + 1;
    });
    records[id] = { remediationId: id, standards: stdData, unitAttempts };
  });
  return records;
}

function generateDemoClassData(classCode: string): ClassPerformance {
  const standards = ['VUS.2','VUS.3','VUS.4','VUS.5','VUS.6','VUS.7','VUS.8','VUS.9','VUS.10','VUS.11','VUS.12','VUS.13','VUS.14','VUS.15','VUS.16','VUS.17'];
  const perf: Record<string, StandardPerformance> = {};
  standards.forEach(sid => {
    const total = Math.floor(Math.random() * 30) + 20;
    const correctRate = 0.3 + Math.random() * 0.5;
    const correct = Math.floor(total * correctRate);
    perf[sid] = {
      standardId: sid, total, correct,
      memorization: { total: Math.floor(total * 0.4), correct: Math.floor(total * 0.4 * (correctRate + (Math.random() - 0.5) * 0.2)) },
      sequence: { total: Math.floor(total * 0.3), correct: Math.floor(total * 0.3 * (correctRate + (Math.random() - 0.5) * 0.2)) },
      stimulus: { total: Math.floor(total * 0.3), correct: Math.floor(total * 0.3 * (correctRate + (Math.random() - 0.5) * 0.3)) },
    };
  });
  const demoVocabClicks: VocabClick[] = [
    { term: 'Ratification', timestamp: Date.now(), remediationId: 'PP-101', classCode },
    { term: 'Ratification', timestamp: Date.now(), remediationId: 'PP-102', classCode },
    { term: 'Ratification', timestamp: Date.now(), remediationId: 'PP-103', classCode },
    { term: 'Secede', timestamp: Date.now(), remediationId: 'PP-101', classCode },
    { term: 'Secede', timestamp: Date.now(), remediationId: 'PP-104', classCode },
    { term: 'Tariff', timestamp: Date.now(), remediationId: 'PP-102', classCode },
    { term: 'Containment', timestamp: Date.now(), remediationId: 'PP-105', classCode },
    { term: 'Containment', timestamp: Date.now(), remediationId: 'PP-103', classCode },
    { term: 'Containment', timestamp: Date.now(), remediationId: 'PP-101', classCode },
    { term: 'Containment', timestamp: Date.now(), remediationId: 'PP-106', classCode },
    { term: 'Disenfranchisement', timestamp: Date.now(), remediationId: 'PP-102', classCode },
    { term: 'Disenfranchisement', timestamp: Date.now(), remediationId: 'PP-107', classCode },
    { term: 'Federalism', timestamp: Date.now(), remediationId: 'PP-101', classCode },
    { term: 'Emancipation', timestamp: Date.now(), remediationId: 'PP-103', classCode },
    { term: 'Emancipation', timestamp: Date.now(), remediationId: 'PP-109', classCode },
  ];
  const demoHints: Record<string, number> = {
    'PP-101': 12, 'PP-102': 3, 'PP-103': 8, 'PP-104': 1, 'PP-105': 15,
    'PP-106': 0, 'PP-107': 6, 'PP-108': 2, 'PP-109': 9, 'PP-110': 4,
  };
  return { classCode, standards: perf, totalStudents: 10, vocabClicks: demoVocabClicks, hintsByStudent: demoHints, studentRecords: generateDemoStudentRecords(classCode) };
}

function generateDemoRetakeHistory(): Record<string, RetakeRecord[]> {
  const demoIds = ['PP-101', 'PP-102', 'PP-103', 'PP-105'];
  const history: Record<string, RetakeRecord[]> = {};
  demoIds.forEach(id => {
    const retakes: RetakeRecord[] = [];
    const numRetakes = Math.floor(Math.random() * 3) + 2;
    for (let r = 1; r <= numRetakes; r++) {
      retakes.push({
        standardId: `VUS.${Math.floor(Math.random() * 16) + 2}`,
        retakeNumber: r,
        correct: Math.floor(Math.random() * 10) + 5 + r * 2,
        total: 15,
        byCategory: {
          memorization: { correct: Math.floor(Math.random() * 4) + r, total: 6 },
          sequence: { correct: Math.floor(Math.random() * 3) + r, total: 4 },
          stimulus: { correct: Math.floor(Math.random() * 3) + r, total: 5 },
        },
      });
    }
    history[id] = retakes;
  });
  return history;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [nickname, setNickname] = useState('');
  const [classCode, setClassCode] = useState('');
  const [session, setSession] = useState<StudentSession | null>(null);
  const [classData, setClassData] = useState<Record<string, ClassPerformance>>({});
  const [retakeHistory, setRetakeHistory] = useState<Record<string, RetakeRecord[]>>({});

  const loginAsStudent = useCallback((remId: string, code: string, quizMode: 'unit-mastery' | 'mock-sol' = 'mock-sol', selectedUnit?: string, coachPersonality: 'historian' | 'gen-alpha' = 'historian') => {
    setNickname(remId);
    setClassCode(code);
    setIsLoggedIn(true);
    setIsTeacher(false);
    setSession({
      nickname: remId, classCode: code, answers: [],
      currentStandardIndex: 0, currentQuestionIndex: 0,
      feedbackMode: false, feedbackQuestions: [], feedbackIndex: 0,
      quizMode, selectedUnit, coachPersonality,
      vocabClicks: [], hintsUsed: 0,
      retakeNumber: 1,
      usedTemplateVersions: {},
      totalXP: 0,
      standardMastery: {},
    });
  }, []);

  const loginAsTeacher = useCallback((code: string) => {
    setClassCode(code);
    setIsLoggedIn(true);
    setIsTeacher(true);
    if (!classData[code]) {
      setClassData(prev => ({ ...prev, [code]: generateDemoClassData(code) }));
      setRetakeHistory(generateDemoRetakeHistory());
    }
  }, [classData]);

  const logout = useCallback(() => {
    // Save retake record before logging out
    if (session && session.answers.length > 0) {
      const correct = session.answers.filter(a => a.correct).length;
      const byCategory: Record<string, { correct: number; total: number }> = {};
      session.answers.forEach(a => {
        if (!byCategory[a.errorCategory]) byCategory[a.errorCategory] = { correct: 0, total: 0 };
        byCategory[a.errorCategory].total++;
        if (a.correct) byCategory[a.errorCategory].correct++;
      });
      const record: RetakeRecord = {
        standardId: session.selectedUnit || 'mock-sol',
        retakeNumber: session.retakeNumber,
        correct,
        total: session.answers.length,
        byCategory,
      };
      setRetakeHistory(prev => {
        const existing = prev[session.nickname] || [];
        return { ...prev, [session.nickname]: [...existing, record] };
      });
    }
    setIsLoggedIn(false);
    setIsTeacher(false);
    setNickname('');
    setClassCode('');
    setSession(null);
  }, [session]);

  const recordAnswer = useCallback((answer: StudentAnswer) => {
    setSession(prev => {
      if (!prev) return prev;
      return { ...prev, answers: [...prev.answers, answer] };
    });
    setClassData(prev => {
      const code = classCode;
      const existing = prev[code] || { classCode: code, standards: {}, totalStudents: 1, vocabClicks: [], hintsByStudent: {}, studentRecords: {} };
      const sp = existing.standards[answer.standardId] || createEmptyPerformance(answer.standardId);
      sp.total++;
      if (answer.correct) sp.correct++;
      const cat = sp[answer.errorCategory];
      cat.total++;
      if (answer.correct) cat.correct++;
      return { ...prev, [code]: { ...existing, standards: { ...existing.standards, [answer.standardId]: { ...sp } } } };
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

  const logVocabClick = useCallback((term: string) => {
    const click: VocabClick = { term, timestamp: Date.now(), remediationId: nickname, classCode };
    setSession(prev => {
      if (!prev) return prev;
      return { ...prev, vocabClicks: [...prev.vocabClicks, click] };
    });
    setClassData(prev => {
      const existing = prev[classCode] || { classCode, standards: {}, totalStudents: 1, vocabClicks: [], hintsByStudent: {}, studentRecords: {} };
      return { ...prev, [classCode]: { ...existing, vocabClicks: [...existing.vocabClicks, click] } };
    });
  }, [nickname, classCode]);

  const incrementHints = useCallback(() => {
    setSession(prev => {
      if (!prev) return prev;
      return { ...prev, hintsUsed: prev.hintsUsed + 1 };
    });
    setClassData(prev => {
      const existing = prev[classCode];
      if (!existing) return prev;
      const hints = { ...existing.hintsByStudent };
      hints[nickname] = (hints[nickname] || 0) + 1;
      return { ...prev, [classCode]: { ...existing, hintsByStudent: hints } };
    });
  }, [nickname, classCode]);

  const trackVersionUsed = useCallback((templateId: string, version: number) => {
    setSession(prev => {
      if (!prev) return prev;
      const existing = prev.usedTemplateVersions[templateId] || [];
      if (existing.includes(version)) return prev;
      return {
        ...prev,
        usedTemplateVersions: {
          ...prev.usedTemplateVersions,
          [templateId]: [...existing, version],
        },
      };
    });
  }, []);

  return (
    <AppContext.Provider value={{
      isLoggedIn, isTeacher, nickname, classCode,
      session, classData, retakeHistory,
      loginAsStudent, loginAsTeacher, logout,
      recordAnswer, getStandardPerformance,
      logVocabClick, incrementHints, trackVersionUsed,
    }}>
      {children}
    </AppContext.Provider>
  );
}
