import {
  Difficulty,
  ExamTopicId,
  McqQuestion,
  StudyNote,
  StudyProgress,
  TopicId,
  WorkedExamQuestion,
} from '../types/cat';
import { TOPICS } from '../data/topics';

export const FLASHCARD_INTERVALS_DAYS = [0, 1, 2, 4, 8, 16];

export const DIFFICULTY_RANK: Record<Difficulty, number> = {
  easy: 1,
  medium: 2,
  hard: 3,
};

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  easy: 'Easy · Recall',
  medium: 'Medium · Comprehension & Application',
  hard: 'Hard · Analysis & Synthesis',
};

export function getDayNumber(nowMs: number = Date.now()): number {
  return Math.floor(nowMs / 86_400_000);
}

export function createInitialProgress(day: number = getDayNumber()): StudyProgress {
  return {
    studiedNotes: {},
    flashcards: {},
    mcqResults: {},
    examChecklist: {},
    examDrafts: {},
    dailyGoal: { day, count: 0 },
    streak: 0,
    lastActiveDay: 0,
    xp: 0,
    examDate: '',
    theme: 'light',
  };
}

export function scheduleFlashcard(
  currentBox: number,
  rating: 0 | 1 | 2,
  currentDay: number = getDayNumber()
): { box: number; nextDueDay: number } {
  const nextBox = rating === 0 ? 0 : Math.min(5, currentBox + rating);
  return {
    box: nextBox,
    nextDueDay: currentDay + FLASHCARD_INTERVALS_DAYS[nextBox],
  };
}

export function recordDailyActivity(
  progress: StudyProgress,
  xpEarned: number,
  currentDay: number = getDayNumber()
): StudyProgress {
  const sameDay = progress.dailyGoal.day === currentDay;
  const newGoalCount = sameDay ? progress.dailyGoal.count + 1 : 1;

  let nextStreak = progress.streak;
  if (progress.lastActiveDay !== currentDay) {
    nextStreak = progress.lastActiveDay === currentDay - 1 ? progress.streak + 1 : 1;
  }

  return {
    ...progress,
    dailyGoal: { day: currentDay, count: newGoalCount },
    streak: nextStreak,
    lastActiveDay: currentDay,
    xp: progress.xp + xpEarned,
  };
}

export function calculateTopicMastery(
  topicId: TopicId,
  notes: StudyNote[],
  mcqs: McqQuestion[],
  workedExams: WorkedExamQuestion[],
  progress: StudyProgress
): number {
  const topicNotes = notes.filter((n) => n.topic === topicId);
  const topicMcqs = mcqs.filter((q) => q.topic === topicId);
  const topicWorked = workedExams.filter((w) => w.topic === topicId);

  const noteCredits = topicNotes.filter(
    (n) => progress.studiedNotes[n.id] || (progress.flashcards[n.id]?.box ?? 0) >= 2
  ).length;

  const mcqCredits = topicMcqs.filter((q) => progress.mcqResults[q.id] === 1).length;

  const workedCredits = topicWorked.filter((w) => {
    const checks = progress.examChecklist[w.id];
    if (!checks || checks.length === 0) return false;
    const earned = checks.filter(Boolean).length;
    return earned >= Math.ceil(w.checklist.length * 0.6);
  }).length;

  const totalItems = topicNotes.length + topicMcqs.length + topicWorked.length;
  if (totalItems === 0) return 0;

  return Math.round((100 * (noteCredits + mcqCredits + workedCredits)) / totalItems);
}

export function calculateExamReadiness(
  notes: StudyNote[],
  mcqs: McqQuestion[],
  workedExams: WorkedExamQuestion[],
  progress: StudyProgress
): number {
  const totalPaperMarks = TOPICS.reduce((sum, t) => sum + t.paperMarks, 0);
  if (totalPaperMarks === 0) return 0;

  const weightedSum = TOPICS.reduce((sum, t) => {
    const mastery = calculateTopicMastery(t.id, notes, mcqs, workedExams, progress);
    return sum + mastery * t.paperMarks;
  }, 0);

  return Math.round(weightedSum / totalPaperMarks);
}

export function filterAndRankWorkedExams(
  questions: WorkedExamQuestion[],
  topicFilter: ExamTopicId | 'all',
  difficultyFilter: Difficulty | 'all',
  searchQuery: string = ''
): WorkedExamQuestion[] {
  const q = searchQuery.trim().toLowerCase();

  return questions
    .filter((item) => (topicFilter === 'all' ? true : item.topic === topicFilter))
    .filter((item) => (difficultyFilter === 'all' ? true : item.difficulty === difficultyFilter))
    .filter((item) => {
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.question.toLowerCase().includes(q) ||
        (item.scenario && item.scenario.toLowerCase().includes(q)) ||
        item.commandWord.toLowerCase().includes(q) ||
        item.modelAnswer.some((a) => a.toLowerCase().includes(q))
      );
    })
    .sort((a, b) => {
      const diffDelta = DIFFICULTY_RANK[a.difficulty] - DIFFICULTY_RANK[b.difficulty];
      if (diffDelta !== 0) return diffDelta;
      return a.marks - b.marks;
    });
}

export function filterStudyNotes(
  notes: StudyNote[],
  topicFilter: TopicId | 'all',
  searchQuery: string = ''
): StudyNote[] {
  const q = searchQuery.trim().toLowerCase();
  return notes
    .filter((n) => (topicFilter === 'all' ? true : n.topic === topicFilter))
    .filter((n) => {
      if (!q) return true;
      return (
        n.title.toLowerCase().includes(q) ||
        n.subtopic.toLowerCase().includes(q) ||
        n.summary.toLowerCase().includes(q) ||
        n.recallPoints.some((p) => p.toLowerCase().includes(q)) ||
        n.comprehensionPoints.some((p) => p.toLowerCase().includes(q)) ||
        n.synthesisAndApplication.some((p) => p.toLowerCase().includes(q))
      );
    });
}

export type SessionItem =
  | { kind: 'flashcard'; note: StudyNote }
  | { kind: 'mcq'; mcq: McqQuestion };

export function buildDailySession(
  notes: StudyNote[],
  mcqs: McqQuestion[],
  progress: StudyProgress,
  topicFilter: TopicId | 'all' = 'all',
  limit: number = 10,
  currentDay: number = getDayNumber()
): SessionItem[] {
  const dueCards = notes
    .filter((n) => topicFilter === 'all' || n.topic === topicFilter)
    .map((n) => {
      const state = progress.flashcards[n.id];
      const isDue = !state || state.nextDueDay <= currentDay;
      const priority = state ? (isDue ? 0 : 2) : 1;
      return { note: n, priority, isDue };
    })
    .filter((x) => x.isDue)
    .sort((a, b) => a.priority - b.priority);

  const dueMcqs = mcqs
    .filter((q) => (topicFilter === 'all' || q.topic === topicFilter) && progress.mcqResults[q.id] !== 1)
    .map((q) => ({
      mcq: q,
      priority: progress.mcqResults[q.id] === 0 ? 0 : 1,
    }))
    .sort((a, b) => a.priority - b.priority);

  const items: SessionItem[] = [];
  let ci = 0;
  let qi = 0;

  for (let step = 0; items.length < limit && (ci < dueCards.length || qi < dueMcqs.length); step++) {
    const preferCard = step % 2 === 0;
    if (preferCard && ci < dueCards.length) {
      items.push({ kind: 'flashcard', note: dueCards[ci++].note });
    } else if (!preferCard && qi < dueMcqs.length) {
      items.push({ kind: 'mcq', mcq: dueMcqs[qi++].mcq });
    } else if (ci < dueCards.length) {
      items.push({ kind: 'flashcard', note: dueCards[ci++].note });
    } else if (qi < dueMcqs.length) {
      items.push({ kind: 'mcq', mcq: dueMcqs[qi++].mcq });
    }
  }

  return items;
}
