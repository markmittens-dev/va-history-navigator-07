export type ErrorCategory = 'memorization' | 'sequence' | 'stimulus';

export interface SOLStandard {
  id: string;
  title: string;
  description: string;
  era: string;
}

export interface Question {
  id: string;
  standardId: string;
  text: string;
  options: string[];
  correctIndex: number;
  errorCategory: ErrorCategory;
  stimulusUrl?: string;
  stimulusCaption?: string;
  strategyTip: string;
}

export interface StudentAnswer {
  questionId: string;
  standardId: string;
  selectedIndex: number;
  correct: boolean;
  errorCategory: ErrorCategory;
  timestamp: number;
}

export interface StudentSession {
  nickname: string;
  classCode: string;
  answers: StudentAnswer[];
  currentStandardIndex: number;
  currentQuestionIndex: number;
  feedbackMode: boolean;
  feedbackQuestions: Question[];
  feedbackIndex: number;
}

export interface StandardPerformance {
  standardId: string;
  total: number;
  correct: number;
  memorization: { total: number; correct: number };
  sequence: { total: number; correct: number };
  stimulus: { total: number; correct: number };
}

export interface ClassPerformance {
  classCode: string;
  standards: Record<string, StandardPerformance>;
  totalStudents: number;
}
