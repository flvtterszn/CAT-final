import React, { useMemo, useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { Difficulty, ExamTopicId, StudyProgress, WorkedExamQuestion } from '../types/cat';
import { EXAM_TOPIC_LABELS } from '../data/topics';
import { DIFFICULTY_LABEL, filterAndRankWorkedExams } from '../utils/studyEngine';

interface WorkedExamsViewProps {
  questions: WorkedExamQuestion[];
  progress: StudyProgress;
  selectedTopic: ExamTopicId | 'all';
  onSelectTopic: (topic: ExamTopicId | 'all') => void;
  onUpdateDraft: (questionId: string, draft: string) => void;
  onToggleChecklistItem: (questionId: string, idx: number, totalItems: number) => void;
}

const DIFFICULTY_STYLE: Record<Difficulty, string> = {
  easy: 'text-emerald-700 dark:text-emerald-400',
  medium: 'text-amber-700 dark:text-amber-400',
  hard: 'text-rose-700 dark:text-rose-400',
};

const TOPIC_TABS: { id: ExamTopicId | 'all'; label: string }[] = [
  { id: 'all', label: 'All Topics' },
  { id: 'sys', label: 'System Tech' },
  { id: 'net', label: 'Networks & Web' },
  { id: 'inf', label: 'Info Management' },
  { id: 'soc', label: 'Social & Ethics' },
  { id: 'dev', label: 'Solution Dev' },
  { id: 'scn', label: 'Integrated Q8–Q9' },
];

export const WorkedExamsView: React.FC<WorkedExamsViewProps> = ({
  questions,
  progress,
  selectedTopic,
  onSelectTopic,
  onUpdateDraft,
  onToggleChecklistItem,
}) => {
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});

  const rankedQuestions = useMemo(
    () => filterAndRankWorkedExams(questions, selectedTopic, difficultyFilter, searchQuery),
    [questions, selectedTopic, difficultyFilter, searchQuery]
  );

  const toggleReveal = (id: string) => {
    setRevealedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between dark:border-slate-800">
        <div>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Ranked Progression: Easy (Recall) → Medium (Application) → Hard (Synthesis)
          </p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">
            Worked Exam Questions &amp; Marking Memos
          </h1>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search worked questions…"
            aria-label="Search worked exam questions"
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
          />
        </div>
      </div>

      {/* Topic & Difficulty Controls */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Filter worked exams by topic">
          {TOPIC_TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => onSelectTopic(t.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                selectedTopic === t.id
                  ? 'bg-blue-700 text-white dark:bg-blue-600'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1 self-start dark:bg-slate-900">
          {(
            [
              { id: 'all', label: 'All Ranks' },
              { id: 'easy', label: 'Easy' },
              { id: 'medium', label: 'Medium' },
              { id: 'hard', label: 'Hard' },
            ] as const
          ).map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setDifficultyFilter(d.id)}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap ${
                difficultyFilter === d.id
                  ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-800 dark:text-slate-100'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs font-medium text-slate-500 tabular-nums dark:text-slate-400">
        Showing {rankedQuestions.length} worked exam questions ordered from Easy to Hard
      </p>

      {rankedQuestions.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-600 dark:text-slate-300">No worked questions match your filter.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {rankedQuestions.map((item, idx) => {
            const isRevealed = Boolean(revealedIds[item.id]);
            const checks = progress.examChecklist[item.id] ?? item.checklist.map(() => false);
            const checkedCount = checks.filter(Boolean).length;
            const draft = progress.examDrafts[item.id] ?? '';

            return (
              <article
                key={item.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
              >
                {/* Clean unboxed metadata header */}
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-xs font-medium text-slate-500 tabular-nums dark:text-slate-400">
                    <span>#{idx + 1}</span>
                    <span aria-hidden="true"> · </span>
                    <span className={`font-bold ${DIFFICULTY_STYLE[item.difficulty]}`}>
                      {DIFFICULTY_LABEL[item.difficulty]}
                    </span>
                    <span aria-hidden="true"> · </span>
                    <span>{EXAM_TOPIC_LABELS[item.topic]}</span>
                    <span aria-hidden="true"> · </span>
                    <span>{item.paperSection}</span>
                    <span aria-hidden="true"> · </span>
                    <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                      {item.marks} marks
                    </span>
                  </p>

                  <span className="text-xs font-medium text-slate-500 tabular-nums dark:text-slate-400">
                    Command: <strong className="text-slate-800 dark:text-slate-200">{item.commandWord}</strong>
                    {checkedCount > 0 && ` · Self-check ${checkedCount}/${item.checklist.length}`}
                  </span>
                </div>

                <h2 className="mt-2 text-lg font-bold text-slate-900 dark:text-slate-100">{item.title}</h2>

                {item.scenario && (
                  <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300">
                    <span className="block text-xs font-bold text-slate-500 dark:text-slate-400">Scenario</span>
                    <p className="mt-1">{item.scenario}</p>
                  </div>
                )}

                {item.codeOrSpecBlock && (
                  <pre className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs leading-relaxed text-slate-100 dark:border-slate-800">
                    {item.codeOrSpecBlock}
                  </pre>
                )}

                <p className="mt-4 text-base font-medium text-slate-900 dark:text-slate-100">{item.question}</p>

                {/* Active Recall Answer Workspace */}
                <div className="mt-4">
                  <label
                    htmlFor={`draft-${item.id}`}
                    className="block text-xs font-medium text-slate-600 dark:text-slate-400"
                  >
                    Draft your answer before checking the memo (optional, saved automatically)
                  </label>
                  <textarea
                    id={`draft-${item.id}`}
                    rows={3}
                    value={draft}
                    onChange={(e) => onUpdateDraft(item.id, e.target.value)}
                    placeholder="Write your bullet points matching the mark allocation…"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/70 p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                  />
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => toggleReveal(item.id)}
                    aria-expanded={isRevealed}
                    className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500"
                  >
                    {isRevealed ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    <span>{isRevealed ? 'Hide Worked Solution' : 'Reveal Worked Solution & Marking Memo'}</span>
                  </button>
                </div>

                {isRevealed && (
                  <div className="mt-5 space-y-5 border-t border-slate-200 pt-5 dark:border-slate-800">
                    {/* Model Answer */}
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        Full-Mark Model Answer
                      </h3>
                      <div className="mt-2 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                        {item.modelAnswer.map((line, i) => (
                          <p key={i}>{line}</p>
                        ))}
                      </div>
                    </div>

                    {/* Mark Breakdown */}
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        Mark-by-Mark Allocation ({item.marks} marks)
                      </h3>
                      <ul className="mt-2 divide-y divide-slate-100 rounded-xl border border-slate-200 dark:divide-slate-800 dark:border-slate-800">
                        {item.markBreakdown.map((m, i) => (
                          <li key={i} className="flex items-baseline justify-between gap-4 px-4 py-2.5 text-sm">
                            <span className="text-slate-700 dark:text-slate-300">{m.point}</span>
                            <span className="font-mono text-xs font-semibold tabular-nums text-emerald-700 shrink-0 dark:text-emerald-400">
                              +{m.marks} {m.marks === 1 ? 'mark' : 'marks'}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Examiner Reasoning & Common Mistake */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-4 dark:border-blue-900/60 dark:bg-blue-950/30">
                        <h4 className="text-xs font-bold text-blue-900 dark:text-blue-300">
                          Why This Earns Full Marks
                        </h4>
                        <p className="mt-1.5 text-xs text-blue-950/90 dark:text-blue-200/90">
                          {item.workedReasoning}
                        </p>
                      </div>
                      <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4 dark:border-amber-900/60 dark:bg-amber-950/30">
                        <h4 className="text-xs font-bold text-amber-900 dark:text-amber-300">
                          Common Exam Trap to Avoid
                        </h4>
                        <p className="mt-1.5 text-xs text-amber-950/90 dark:text-amber-200/90">
                          {item.commonMistake}
                        </p>
                      </div>
                    </div>

                    {/* Self-Marking Checklist */}
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        Self-Marking Checklist (updates your Readiness %)
                      </h3>
                      <div className="mt-2 space-y-2">
                        {item.checklist.map((label, cIdx) => {
                          const checked = Boolean(checks[cIdx]);
                          return (
                            <label
                              key={cIdx}
                              className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/60"
                            >
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => onToggleChecklistItem(item.id, cIdx, item.checklist.length)}
                                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
                              />
                              <span className="text-slate-800 dark:text-slate-200">{label}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
