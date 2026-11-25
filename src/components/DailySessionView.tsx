import React, { useMemo, useState } from 'react';
import { McqQuestion, StudyNote, StudyProgress } from '../types/cat';
import { buildDailySession } from '../utils/studyEngine';

interface DailySessionViewProps {
  notes: StudyNote[];
  mcqs: McqQuestion[];
  progress: StudyProgress;
  onRateFlashcard: (noteId: string, rating: 0 | 1 | 2) => void;
  onAnswerMcq: (questionId: string, correct: boolean) => void;
  onExit: () => void;
}

export const DailySessionView: React.FC<DailySessionViewProps> = ({
  notes,
  mcqs,
  progress,
  onRateFlashcard,
  onAnswerMcq,
  onExit,
}) => {
  const [sessionItems] = useState(() => buildDailySession(notes, mcqs, progress, 'all', 10));
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [hits, setHits] = useState(0);

  const current = sessionItems[idx];

  const completionPercent = useMemo(() => {
    if (sessionItems.length === 0) return 100;
    return Math.round((idx * 100) / sessionItems.length);
  }, [idx, sessionItems.length]);

  const advance = () => {
    setIdx((i) => i + 1);
    setRevealed(false);
    setSelectedOpt(null);
  };

  if (sessionItems.length === 0 || idx >= sessionItems.length) {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Daily Mixed Session</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
          {sessionItems.length === 0
            ? 'All Caught Up for Today'
            : `Session Complete · ${hits} / ${sessionItems.length} Mastered`}
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Spaced-repetition flashcards are scheduled automatically for your next review window.
        </p>
        <button
          type="button"
          onClick={onExit}
          className="mt-6 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onExit}
          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
        >
          ← Exit Session
        </button>
        <span className="font-mono text-xs font-medium tabular-nums text-slate-500 dark:text-slate-400">
          Item {idx + 1} / {sessionItems.length}
        </span>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        <div
          className="h-full bg-blue-700 transition-all duration-200 dark:bg-blue-500"
          style={{ width: `${completionPercent}%` }}
        />
      </div>

      {current.kind === 'flashcard' ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Spaced-Repetition Flashcard · {current.note.subtopic}
          </p>
          <h2 className="mt-3 text-xl font-bold text-slate-900 dark:text-slate-100">
            {current.note.flashcardFront}
          </h2>

          {revealed ? (
            <div className="mt-6 space-y-6 border-t border-slate-100 pt-5 dark:border-slate-800">
              <p className="text-base text-slate-700 dark:text-slate-200">{current.note.flashcardBack}</p>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onRateFlashcard(current.note.id, 0);
                    advance();
                  }}
                  className="rounded-lg border border-rose-200 bg-rose-50 py-2.5 text-xs font-semibold text-rose-800 hover:bg-rose-100 dark:border-rose-900 dark:bg-rose-950/50 dark:text-rose-200"
                >
                  Needs Review
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onRateFlashcard(current.note.id, 1);
                    setHits((h) => h + 1);
                    advance();
                  }}
                  className="rounded-lg border border-slate-200 bg-slate-50 py-2.5 text-xs font-semibold text-slate-800 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  Got It
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onRateFlashcard(current.note.id, 2);
                    setHits((h) => h + 1);
                    advance();
                  }}
                  className="rounded-lg bg-emerald-600 py-2.5 text-xs font-semibold text-white hover:bg-emerald-700"
                >
                  Easy
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setRevealed(true)}
              className="mt-8 w-full rounded-lg bg-blue-700 py-3 text-sm font-semibold text-white hover:bg-blue-800 dark:bg-blue-600"
            >
              Show Answer
            </button>
          )}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Practice Question · {current.mcq.difficulty.toUpperCase()}
          </p>
          <h2 className="mt-3 text-lg font-bold text-slate-900 dark:text-slate-100">
            {current.mcq.question}
          </h2>

          <div className="mt-5 space-y-2.5">
            {current.mcq.options.map((opt, oIdx) => {
              const answered = selectedOpt !== null;
              const isCorrect = oIdx === current.mcq.correctIndex;
              const isChosen = oIdx === selectedOpt;
              let cls =
                'border-slate-200 bg-white text-slate-800 hover:border-blue-400 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200';
              if (answered) {
                if (isCorrect) {
                  cls =
                    'border-emerald-500 bg-emerald-50 text-emerald-950 dark:bg-emerald-950/50 dark:text-emerald-100';
                } else if (isChosen) {
                  cls = 'border-rose-500 bg-rose-50 text-rose-950 dark:bg-rose-950/50 dark:text-rose-100';
                }
              }

              return (
                <button
                  key={oIdx}
                  type="button"
                  disabled={answered}
                  onClick={() => {
                    setSelectedOpt(oIdx);
                    const ok = oIdx === current.mcq.correctIndex;
                    if (ok) setHits((h) => h + 1);
                    onAnswerMcq(current.mcq.id, ok);
                  }}
                  className={`w-full rounded-xl border px-4 py-3 text-left text-sm font-medium ${cls}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {selectedOpt !== null && (
            <div className="mt-5 space-y-4 border-t border-slate-100 pt-4 dark:border-slate-800">
              <p className="text-sm text-slate-700 dark:text-slate-300">
                <strong>{selectedOpt === current.mcq.correctIndex ? 'Correct.' : 'Not quite.'}</strong>{' '}
                {current.mcq.explanation}
              </p>
              <button
                type="button"
                onClick={advance}
                className="w-full rounded-lg bg-blue-700 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
              >
                Continue →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
