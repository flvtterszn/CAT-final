export type TopicId = 'sys' | 'net' | 'inf' | 'soc' | 'dev';
export type ExamTopicId = TopicId | 'scn';

export type Difficulty = 'easy' | 'medium' | 'hard';

export type CognitiveLevel =
  | 'Lower Order · Recall'
  | 'Middle Order · Comprehension & Application'
  | 'Higher Order · Analysis, Evaluation & Synthesis';

export type DiagramId =
  | 'ipo-cycle'
  | 'memory-hierarchy'
  | 'storage-units'
  | 'boot-sequence'
  | 'software-layers'
  | 'topologies'
  | 'lan-router-switch'
  | 'attenuation-emi'
  | 'vpn-tunnel'
  | 'https-ssl'
  | 'client-server-p2p'
  | 'dikw-pyramid'
  | 'trace-table'
  | 'phishing-pharming'
  | 'validation-verification'
  | 'mail-merge'
  | 'excel-referencing'
  | 'db-pk-fk'
  | 'html-structure';

export interface ComparisonTable {
  title: string;
  headers: string[];
  rows: string[][];
}

export interface StudyNote {
  id: string;
  topic: TopicId;
  subtopic: string;
  title: string;
  sagsRef: string;
  summary: string;
  recallPoints: string[];
  comprehensionPoints: string[];
  synthesisAndApplication: string[];
  examTips: string[];
  comparison?: ComparisonTable;
  diagramId?: DiagramId;
  flashcardFront: string;
  flashcardBack: string;
}

export interface McqQuestion {
  id: string;
  topic: TopicId;
  difficulty: Difficulty;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  diagramId?: DiagramId;
}

export interface MarkPoint {
  point: string;
  marks: number;
}

export interface WorkedExamQuestion {
  id: string;
  topic: ExamTopicId;
  difficulty: Difficulty;
  cognitiveLevel: CognitiveLevel;
  paperSection: string;
  commandWord: string;
  marks: number;
  title: string;
  scenario?: string;
  codeOrSpecBlock?: string;
  question: string;
  modelAnswer: string[];
  markBreakdown: MarkPoint[];
  workedReasoning: string;
  commonMistake: string;
  checklist: string[];
}

export interface TopicMeta {
  id: TopicId;
  name: string;
  shortName: string;
  paperMarks: number;
  paperSection: string;
  description: string;
  accentHex: string;
}

export interface FlashcardState {
  box: number;
  nextDueDay: number;
}

export interface StudyProgress {
  studiedNotes: Record<string, boolean>;
  flashcards: Record<string, FlashcardState>;
  mcqResults: Record<string, 0 | 1>;
  examChecklist: Record<string, boolean[]>;
  examDrafts: Record<string, string>;
  dailyGoal: {
    day: number;
    count: number;
  };
  streak: number;
  lastActiveDay: number;
  xp: number;
  examDate: string;
  theme: 'light' | 'dark';
}

export type AppView = 'home' | 'topic' | 'lesson' | 'session' | 'exam' | 'guide' | 'find';
