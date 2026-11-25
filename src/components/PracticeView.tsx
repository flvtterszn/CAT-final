import React, { useMemo, useState } from 'react';
import { McqQuestion, StudyProgress, TopicId } from '../types/cat';
import { TOPICS } from '../data/topics';
import { DIFFICULTY_LABEL, DIFFICULTY_RANK } from '../utils/studyEngine';
import { ConceptDiagram } from './Diagrams';

interface PracticeViewProps {
  mcqs: McqQuestion[];
  progress: StudyProgress;
  initialTopic: TopicId | 'all';
  onAnswerMcq: (questionId: string, correct: boolean) => void;
}

export const PracticeView: React.FC<PracticeViewProps> = ({
  mcqs,
  progress,
  initialTopic,
  onAnswerMcq,
}) => {
  const [filterMode, setFilterMode] = useState<TopicId | 'all' | 'weak'>(initialTopic);
  const [quizStarted, setQuizStarted] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [sessionScore, setSessionScore] = useState(0);

  const deck = useMemo(() => {
    return mcqs
      .filter((q) => {
        if (filterMode === 'all') return true;
        if (filterMode === 'weak') return progress.mcqResults[q.id] === 0;
        return q.topic === filterMode;
      })
      .sort((a, b) => DIFFICULTY_RANK[a.difficulty] - DIFFICULTY_RANK[b.difficulty]);
  }, [mcqs, filterMode, progress.mcqResults]);

  const startNewRun = (mode: TopicId | 'all' | 'weak') => {
    setFilterMode(mode);
    setCurrentIdx(0);
    setSelectedOption(null);
    setSessionScore(0);
    setQuizStarted(true);
  };

  const weakCount = Object.values(progress.mcqResults).filter((v) => v === 0).length;
  const currentQ = deck[currentIdx];

  const handleChoose = (optIdx: number) => {
    if (selectedOption !== null || !currentQ) return;
    setSelectedOption(optIdx);
    const isCorrect = optIdx === currentQ.correctIndex;
    if (isCorrect) setSessionScore((s) => s + 1);
    onAnswerMcq(currentQ.id, isCorrect);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-5 dark:border-slate-800">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
          IEB Paper 2 Questions 1–2 &amp; Concept Mastery · Ordered Easy → Hard
        </p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">
          Practice Quizzes
        </h1>
      </div>

      {/* Mode Selector */}
      <div className="flex flex-wrap items-center gap-1.5">
        <button
          type="button"
          onClick={() => startNewRun('all')}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap ${
            filterMode === 'all'
              ? 'bg-blue-700 text-white dark:bg-blue-600'
              : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
          }`}
        >
          All Topics ({mcqs.length})
        </button>
        {TOPICS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => startNewRun(t.id)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap ${
              filterMode === t.id
                ? 'bg-blue-700 text-white dark:bg-blue-600'
                : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
            }`}
          >
            {t.shortName}
          </button>
        ))}
        <button
          type="button"
          onClick={() => startNewRun('weak')}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap ${
            filterMode === 'weak'
              ? 'bg-amber-600 text-white'
              : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
          }`}
        >
          Weak Spots ({weakCount})
        </button>
      </div>

      {!quizStarted || deck.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {filterMode === 'weak'
              ? 'No missed questions in your weak-spot queue right now.'
              : 'No questions available in this filter.'}
          </p>
          <button
            type="button"
            onClick={() => startNewRun('all')}
            className="mt-4 rounded-lg bg-blue-700 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-800"
          >
            Practise All Topics
          </button>
        </div>
      ) : currentIdx >= deck.length ? (
        <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Quiz Complete</p>
          <h2 className="mt-2 font-mono text-3xl font-bold tabular-nums text-slate-900 dark:text-slate-100">
            {sessionScore} / {deck.length} ({Math.round((100 * sessionScore) / deck.length)}%)
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            {sessionScore / deck.length >= 0.8
              ? 'Strong Paper 2 mastery on this section. Test yourself on Worked Exam Questions next.'
              : 'Review the explanations in Study Notes and retry your weak spots.'}
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => startNewRun(filterMode)}
              className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
            >
              Restart Quiz
            </button>
            {weakCount > 0 && (
              <button
                type="button"
                onClick={() => startNewRun('weak')}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 dark:border-slate-700 dark:text-slate-200"
              >
                Retry Weak Spots ({weakCount})
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-3xl space-y-4">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500 tabular-nums dark:text-slate-400">
            <span>
              Question {currentIdx + 1} of {deck.length} · {DIFFICULTY_LABEL[currentQ.difficulty]}
            </span>
            <span>Score: {sessionScore}</span>
          </div>

          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <div
              className="h-full bg-blue-700 transition-all duration-200 dark:bg-blue-500"
              style={{ width: `${((currentIdx + (selectedOption !== null ? 1 : 0)) * 100) / deck.length}%` }}
            />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">{currentQ.question}</h2>

            <div className="mt-5 space-y-2.5">
              {currentQ.options.map((opt, idx) => {
                const answered = selectedOption !== null;
                const isCorrectOpt = idx === currentQ.correctIndex;
                const isChosen = idx === selectedOption;

                let cls =
                  'border-slate-200 bg-white text-slate-800 hover:border-blue-400 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-blue-500';
                if (answered) {
                  if (isCorrectOpt) {
                    cls =
                      'border-emerald-500 bg-emerald-50 text-emerald-950 dark:border-emerald-500 dark:bg-emerald-950/50 dark:text-emerald-100';
                  } else if (isChosen) {
                    cls =
                      'border-rose-500 bg-rose-50 text-rose-950 dark:border-rose-500 dark:bg-rose-950/50 dark:text-rose-100';
                  } else {
                    cls = 'border-slate-200 bg-white opacity-60 dark:border-slate-800 dark:bg-slate-950';
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={answered}
                    onClick={() => handleChoose(idx)}
                    className={`w-full rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors ${cls}`}
                  >
                    <span className="mr-2 font-mono text-xs font-bold">
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>

            {selectedOption !== null && (
              <div className="mt-5 space-y-4 border-t border-slate-100 pt-4 dark:border-slate-800">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  <strong
                    className={
                      selectedOption === currentQ.correctIndex
                        ? 'text-emerald-700 dark:text-emerald-400'
                        : 'text-rose-700 dark:text-rose-400'
                    }
                  >
                    {selectedOption === currentQ.correctIndex ? 'Correct.' : 'Incorrect.'}
                  </strong>{' '}
                  {currentQ.explanation}
                </p>

                {currentQ.diagramId && <ConceptDiagram id={currentQ.diagramId} />}

                <button
                  type="button"
                  onClick={() => {
                    setCurrentIdx((i) => i + 1);
                    setSelectedOption(null);
                  }}
                  className="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 dark:bg-blue-600"
                >
                  {currentIdx + 1 < deck.length ? 'Next Question →' : 'Finish Quiz'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
