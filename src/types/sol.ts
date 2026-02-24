export type ErrorCategory = 'memorization' | 'sequence' | 'stimulus';
export type QuizMode = 'unit-mastery' | 'mock-sol';
export type CoachPersonality = 'historian' | 'gen-alpha';

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
  genAlphaTip: string;
  timelineData?: TimelineEvent[];
}

export interface TimelineEvent {
  year: number;
  label: string;
  highlight?: boolean;
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
  quizMode: QuizMode;
  selectedUnit?: string;
  coachPersonality: CoachPersonality;
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
