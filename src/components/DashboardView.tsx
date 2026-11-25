import React, { useState } from 'react';
import { BookOpen, CheckCircle2, ClipboardList, Layers, Moon, Search, Sun } from 'lucide-react';
import { ExamTopicId, McqQuestion, StudyNote, StudyProgress, TopicId, WorkedExamQuestion } from '../types/cat';
import { TOPICS } from '../data/topics';
import {
  calculateExamReadiness,
  calculateTopicMastery,
  getDayNumber,
} from '../utils/studyEngine';

interface DashboardViewProps {
  notes: StudyNote[];
  mcqs: McqQuestion[];
  workedExams: WorkedExamQuestion[];
  progress: StudyProgress;
  onOpenTopicNotes: (topicId: TopicId) => void;
  onOpenTopicWorked: (topicId: ExamTopicId) => void;
  onStartQuiz: (topicId: TopicId | 'all') => void;
  onStartSession: () => void;
  onGlobalSearch: (query: string) => void;
  onToggleTheme: () => void;
  onChangeExamDate: (date: string) => void;
  onResetProgress: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  notes,
  mcqs,
  workedExams,
  progress,
  onOpenTopicNotes,
  onOpenTopicWorked,
  onStartQuiz,
  onStartSession,
  onGlobalSearch,
  onToggleTheme,
  onChangeExamDate,
  onResetProgress,
}) => {
  const [searchText, setSearchText] = useState('');
  const [confirmReset, setConfirmReset] = useState(false);

  const today = getDayNumber();
  const dailyCount = progress.dailyGoal.day === today ? progress.dailyGoal.count : 0;
  const readiness = calculateExamReadiness(notes, mcqs, workedExams, progress);

  const studiedCount = notes.filter((n) => progress.studiedNotes[n.id]).length;
  const mcqsCorrect = Object.values(progress.mcqResults).filter((v) => v === 1).length;
  const workedDone = workedExams.filter((w) => {
    const c = progress.examChecklist[w.id];
    return c && c.filter(Boolean).length >= Math.ceil(w.checklist.length * 0.6);
  }).length;

  const daysUntilExam =
    progress.examDate && !Number.isNaN(Date.parse(progress.examDate))
      ? Math.max(0, Math.ceil((Date.parse(progress.examDate) - Date.now()) / 86_400_000))
      : null;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchText.trim()) {
      onGlobalSearch(searchText.trim());
    }
  };

  return (
    <div className="space-y-8">
      {/* Workspace Utility Strip */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search notes, terms, or topics…"
            aria-label="Search curriculum notes"
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-20 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
          />
          {searchText.trim() && (
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200"
            >
              Find
            </button>
          )}
        </form>

        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
            <span>Paper 2 Date</span>
            <input
              type="date"
              value={progress.examDate}
              onChange={(e) => onChangeExamDate(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
            />
          </label>
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${progress.theme === 'dark' ? 'light' : 'dark'} theme`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {progress.theme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            <span>{progress.theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      </div>

      {/* Hero Overview */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch">
        <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              IEB Grade 12 NSC · Computer Applications Technology · Paper 2 (150 Marks)
              {daysUntilExam !== null && ` · ${daysUntilExam} days remaining`}
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">
              Master Recall, Comprehension &amp; Matric Scenario Synthesis
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
              Complete SAGS-aligned theory notes covering all five Paper 2 modules, spaced-repetition flashcards,
              and worked past-paper questions ranked from Easy Recall to Hard Integrated Synthesis.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onStartSession}
              className="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-800 whitespace-nowrap dark:bg-blue-600 dark:hover:bg-blue-500"
            >
              {dailyCount > 0 ? 'Continue Today’s Session' : 'Start Today’s Session'}
            </button>
            <button
              type="button"
              onClick={() => onOpenTopicWorked('scn')}
              className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-100 whitespace-nowrap dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
            >
              Practise Integrated Scenarios (Q8–Q9)
            </button>
          </div>
        </div>

        {/* Readiness & Daily Goal Summary */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <div>
            <div className="flex items-baseline justify-between">
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">Paper 2 Exam Readiness</h2>
              <span className="font-mono text-2xl font-bold tabular-nums text-blue-700 dark:text-blue-400">
                {readiness}%
              </span>
            </div>
            <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div
                className="h-full bg-blue-700 transition-all duration-300 dark:bg-blue-500"
                style={{ width: `${readiness}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Weighted across the 150-mark SAGS topic blueprint.
            </p>
          </div>

          <div className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-800">
            <div className="flex items-baseline justify-between text-sm">
              <span className="font-medium text-slate-700 dark:text-slate-300">Today’s Goal (10 items)</span>
              <span className="font-mono font-semibold tabular-nums text-slate-900 dark:text-slate-100">
                {Math.min(10, dailyCount)} / 10
              </span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div
                className="h-full bg-emerald-600 transition-all duration-300 dark:bg-emerald-500"
                style={{ width: `${Math.min(100, dailyCount * 10)}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-slate-500 tabular-nums dark:text-slate-400">
              {progress.streak}-day streak · Level {Math.floor(progress.xp / 100) + 1} · {progress.xp} XP
            </p>
          </div>
        </div>
      </section>

      {/* 4-column Progress Metrics Strip below hero */}
      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span>Notes Studied</span>
          </div>
          <p className="mt-2 font-mono text-2xl font-bold tabular-nums text-slate-900 dark:text-slate-100">
            {studiedCount}/{notes.length}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span>MCQs Mastered</span>
          </div>
          <p className="mt-2 font-mono text-2xl font-bold tabular-nums text-slate-900 dark:text-slate-100">
            {mcqsCorrect}/{mcqs.length}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <ClipboardList className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <span>Worked Exams</span>
          </div>
          <p className="mt-2 font-mono text-2xl font-bold tabular-nums text-slate-900 dark:text-slate-100">
            {workedDone}/{workedExams.length}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <Layers className="h-4 w-4 text-violet-600 dark:text-violet-400" />
            <span>SAGS Scope</span>
          </div>
          <p className="mt-2 font-mono text-2xl font-bold tabular-nums text-slate-900 dark:text-slate-100">
            150 Marks
          </p>
        </div>
      </section>

      {/* SAGS Curriculum Modules */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Grade 12 SAGS Curriculum Topics
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Strictly aligned to the IEB CAT Subject Assessment Guidelines (Paper 2 Theory).
            </p>
          </div>
          <button
            type="button"
            onClick={() => onStartQuiz('all')}
            className="text-sm font-semibold text-blue-700 hover:underline dark:text-blue-400"
          >
            Launch Mixed 48-Question Quiz →
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {TOPICS.map((topic) => {
            const mastery = calculateTopicMastery(topic.id, notes, mcqs, workedExams, progress);
            const topicNoteCount = notes.filter((n) => n.topic === topic.id).length;
            const topicWorkedCount = workedExams.filter((w) => w.topic === topic.id).length;
            const topicMcqCount = mcqs.filter((q) => q.topic === topic.id).length;

            return (
              <article
                key={topic.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
              >
                <div>
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="text-xs font-medium text-slate-500 tabular-nums dark:text-slate-400">
                      {topic.paperMarks} marks · {topic.paperSection}
                    </p>
                    <span className="font-mono text-sm font-semibold tabular-nums text-slate-900 dark:text-slate-100">
                      {mastery}% mastery
                    </span>
                  </div>

                  <h3 className="mt-1.5 text-lg font-bold text-slate-900 dark:text-slate-100">
                    {topic.name}
                  </h3>
                  <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300">{topic.description}</p>

                  <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className="h-full transition-all duration-300"
                      style={{ width: `${mastery}%`, backgroundColor: topic.accentHex }}
                    />
                  </div>

                  <p className="mt-2 text-xs text-slate-500 tabular-nums dark:text-slate-400">
                    {topicNoteCount} comprehensive modules · {topicWorkedCount} worked exams (Easy–Hard) · {topicMcqCount} MCQs
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => onOpenTopicNotes(topic.id)}
                    className="rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white hover:bg-slate-800 whitespace-nowrap dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
                  >
                    Study Notes
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenTopicWorked(topic.id)}
                    className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 whitespace-nowrap dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                  >
                    Worked Exams
                  </button>
                  <button
                    type="button"
                    onClick={() => onStartQuiz(topic.id)}
                    className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 whitespace-nowrap dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                  >
                    Topic Quiz
                  </button>
                </div>
              </article>
            );
          })}

          {/* Integrated Scenario Card */}
          <article className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <div>
              <p className="text-xs font-medium text-slate-500 tabular-nums dark:text-slate-400">
                ±50 marks combined · Questions 8 &amp; 9
              </p>
              <h3 className="mt-1.5 text-lg font-bold text-slate-900 dark:text-slate-100">
                Integrated Scenarios (Cross-Topic Synthesis)
              </h3>
              <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300">
                A third of Paper 2 synthesises Hardware, Networks, POPIA/Security, Information Management, and Solution
                Development inside real business and school case studies.
              </p>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
              <button
                type="button"
                onClick={() => onOpenTopicWorked('scn')}
                className="rounded-lg bg-blue-700 px-3.5 py-2 text-xs font-semibold text-white hover:bg-blue-800 whitespace-nowrap dark:bg-blue-600 dark:hover:bg-blue-500"
              >
                Open Ranked Scenario Questions
              </button>
            </div>
          </article>
        </div>
      </section>

      {/* Footer / Reset Progress */}
      <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
        <span>Aligned strictly to IEB CAT Grade 12 Subject Assessment Guidelines (SAGS).</span>
        {!confirmReset ? (
          <button
            type="button"
            onClick={() => setConfirmReset(true)}
            className="font-medium text-slate-600 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400"
          >
            Reset Study Progress
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-red-600 dark:text-red-400">Clear all saved progress?</span>
            <button
              type="button"
              onClick={() => {
                onResetProgress();
                setConfirmReset(false);
              }}
              className="rounded-md bg-red-600 px-2.5 py-1 font-semibold text-white hover:bg-red-700"
            >
              Confirm Reset
            </button>
            <button
              type="button"
              onClick={() => setConfirmReset(false)}
              className="rounded-md border border-slate-200 px-2.5 py-1 font-medium text-slate-700 dark:border-slate-700 dark:text-slate-300"
            >
              Cancel
            </button>
          </div>
        )}
      </footer>
    </div>
  );
};
