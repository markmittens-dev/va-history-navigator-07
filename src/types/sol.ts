export type ErrorCategory = 'memorization' | 'sequence' | 'stimulus';
export type QuizMode = 'unit-mastery' | 'mock-sol';
export type CoachPersonality = 'historian' | 'gen-alpha';
export type VersionFormat = 'direct' | 'quote' | 'visual' | 'diagram' | 'timeline';

export const VERSION_FORMAT_ORDER: VersionFormat[] = ['direct', 'quote', 'visual', 'diagram', 'timeline'];

export const VERSION_XP: Record<VersionFormat, number> = {
  direct: 10,
  quote: 25,
  visual: 35,
  diagram: 40,
  timeline: 25,
};

export const VERSION_FORMAT_LABELS: Record<VersionFormat, string> = {
  direct: 'Direct Recall',
  quote: 'Quote / Primary Source',
  visual: 'Visual Stimulus',
  diagram: 'Data / Diagram',
  timeline: 'Timeline / Sequence',
};

export interface SOLStandard {
  id: string;
  title: string;
  description: string;
  era: string;
}

export interface Question {
  id: string;
  templateId: string;
  version: number;    // 1-5
  versionFormat: VersionFormat;
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
  headline?: string;
  quote?: string;
  quoteSource?: string;
  imageDescription?: string; // V3: styled text box describing an image
  diagramData?: DiagramData;  // V4: flow, table, or list
}

export interface DiagramData {
  type: 'flow' | 'table' | 'list';
  // Flow: array of steps with optional blank
  flowSteps?: string[];
  // Table
  tableHeaders?: string[];
  tableRows?: string[][];
  tableCaption?: string;
  // Bulleted list
  listItems?: string[];
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
  xpEarned?: number;
}

export interface VocabClick {
  term: string;
  timestamp: number;
  remediationId: string;
  classCode: string;
}

export interface StandardMastery {
  standardId: string;
  versionsCorrect: number[]; // which version numbers answered correctly
  mastered: boolean; // true if 3+ of 5 versions correct
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
  vocabClicks: VocabClick[];
  hintsUsed: number;
  retakeNumber: number;
  usedTemplateVersions: Record<string, number[]>;
  totalXP: number;
  standardMastery: Record<string, StandardMastery>;
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
  vocabClicks: VocabClick[];
  hintsByStudent: Record<string, number>;
}
