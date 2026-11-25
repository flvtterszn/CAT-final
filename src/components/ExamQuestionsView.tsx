import React, { useEffect, useMemo, useState } from 'react';
import { Difficulty, ExamTopicId, StudyProgress, WorkedExamQuestion } from '../types/cat';
import { EXAM_TOPIC_LABELS } from '../data/topics';
import { DIFFICULTY_LABEL, filterAndRankWorkedExams } from '../utils/studyEngine';
import { getChecklistTone, getExamPaceTone } from '../utils/textHighlight';
import { RichText, TermPoint } from './RichText';

interface ExamQuestionsViewProps {
  questions: WorkedExamQuestion[];
  progress: StudyProgress;
  selectedTopic: ExamTopicId | 'all';
  initialQuestionId?: string | null;
  onSelectTopic: (topic: ExamTopicId | 'all') => void;
  onUpdateDraft: (questionId: string, draft: string) => void;
  onToggleChecklistItem: (questionId: string, idx: number, totalItems: number) => void;
}

const TOPIC_FILTERS: { id: ExamTopicId | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'sys', label: 'Systems' },
  { id: 'net', label: 'Network' },
  { id: 'inf', label: 'Info' },
  { id: 'soc', label: 'Social' },
  { id: 'dev', label: 'Solution' },
  { id: 'scn', label: 'Scenario' },
];

const DIFFICULTY_CLASS: Record<Difficulty, string> = {
  easy: 'cat-cond-high',
  medium: 'cat-cond-mid',
  hard: 'cat-cond-low',
};

const PACE_CLASS = {
  ok: 'cat-cond-high',
  warn: 'cat-cond-mid',
  over: 'cat-cond-low',
} as const;

export const ExamQuestionsView: React.FC<ExamQuestionsViewProps> = ({
  questions,
  progress,
  selectedTopic,
  initialQuestionId,
  onSelectTopic,
  onUpdateDraft,
  onToggleChecklistItem,
}) => {
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | 'all'>('all');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [memoVisible, setMemoVisible] = useState(false);
  const [elapsedSec, setElapsedSec] = useState(0);

  const ranked = useMemo(
    () => filterAndRankWorkedExams(questions, selectedTopic, difficultyFilter, ''),
    [questions, selectedTopic, difficultyFilter]
  );

  useEffect(() => {
    if (initialQuestionId) {
      const foundIdx = ranked.findIndex((q) => q.id === initialQuestionId);
      if (foundIdx >= 0) {
        setQuestionIndex(foundIdx);
        setMemoVisible(false);
        setElapsedSec(0);
      }
    }
  }, [initialQuestionId, ranked]);

  const safeIdx = ranked.length > 0 ? Math.min(questionIndex, ranked.length - 1) : 0;
  const current = ranked[safeIdx];

  useEffect(() => {
    setElapsedSec(0);
    setMemoVisible(false);
  }, [current?.id]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setElapsedSec((s) => s + 1);
    }, 1000);
    return () => window.clearInterval(id);
  }, [current?.id]);

  const timerLabel = `⏱ ${Math.floor(elapsedSec / 60)}:${String(elapsedSec % 60).padStart(2, '0')}`;
  const paceTone = current ? getExamPaceTone(elapsedSec, current.marks) : 'ok';
  const checks = current
    ? progress.examChecklist[current.id] ?? current.checklist.map(() => false)
    : [];
  const checkedCount = checks.filter(Boolean).length;
  const checkTone = current ? getChecklistTone(checkedCount, current.checklist.length) : 'low';

  return (
    <div>
      <div className="cat-top">
        <h1 className="cat-h1">Exam questions</h1>
      </div>

      {/* Topic Filter Chips */}
      <div className="cat-row" style={{ marginBottom: 8 }}>
        {TOPIC_FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            className={`cat-btn ${selectedTopic === f.id ? 'cat-btn-on' : ''}`}
            style={{ padding: '6px 10px', fontSize: '0.88rem' }}
            onClick={() => {
              onSelectTopic(f.id);
              setQuestionIndex(0);
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Difficulty Rank Filter (Easy -> Medium -> Hard) */}
      <div className="cat-row" style={{ marginBottom: 10 }}>
        {(
          [
            { id: 'all', label: 'All (Easy → Hard)' },
            { id: 'easy', label: 'Easy' },
            { id: 'medium', label: 'Medium' },
            { id: 'hard', label: 'Hard' },
          ] as const
        ).map((d) => (
          <button
            key={d.id}
            type="button"
            className={`cat-btn ${difficultyFilter === d.id ? 'cat-btn-on' : ''}`}
            style={{ padding: '5px 10px', fontSize: '0.82rem' }}
            onClick={() => {
              setDifficultyFilter(d.id);
              setQuestionIndex(0);
            }}
          >
            {d.label}
          </button>
        ))}
      </div>

      {!current ? (
        <div className="cat-card">No worked exam questions match this filter.</div>
      ) : (
        <>
          <div className="cat-row" style={{ marginBottom: 6 }}>
            <span className="cat-mut tabular-nums">
              Question <mark className="cat-num">{safeIdx + 1}</mark> of{' '}
              <mark className="cat-num">{ranked.length}</mark>
            </span>
            <span className={`cat-pill ${DIFFICULTY_CLASS[current.difficulty]}`}>
              {DIFFICULTY_LABEL[current.difficulty]}
            </span>
            <span className="cat-pill">Command: {current.commandWord}</span>
          </div>

          <div className="cat-card">
            <div className="cat-row" style={{ marginBottom: 8 }}>
              <b className="cat-g">
                {EXAM_TOPIC_LABELS[current.topic]} · {current.paperSection} ·{' '}
                <mark className="cat-num">{current.marks} marks</mark>
              </b>
              <span className="cat-pill">
                ~{Math.max(1, Math.round(current.marks * 1.2))} min
              </span>
              <span
                className={`cat-pill ${PACE_CLASS[paceTone]}`}
                title="Green = within 1.2 min/mark pace, Amber = wrap up, Red = over budget"
              >
                {timerLabel}
              </span>
            </div>

            <b style={{ display: 'block', marginBottom: 6, fontSize: '1.03rem' }}>{current.title}</b>

            {current.scenario && (
              <div
                className="cat-card"
                style={{
                  margin: '8px 0',
                  padding: '10px 12px',
                  background: 'var(--bg)',
                  boxShadow: 'none',
                }}
              >
                <span className="cat-tag">Scenario</span>
                <p style={{ margin: '4px 0 0', fontSize: '0.94rem' }}>
                  <RichText text={current.scenario} />
                </p>
              </div>
            )}

            {current.codeOrSpecBlock && (
              <pre
                style={{
                  overflowX: 'auto',
                  padding: '10px 12px',
                  borderRadius: 12,
                  background: '#161b26',
                  color: '#e8eaf3',
                  fontSize: '0.82rem',
                  margin: '8px 0',
                }}
              >
                {current.codeOrSpecBlock}
              </pre>
            )}

            <p style={{ margin: '8px 0' }}>
              <RichText text={current.question} />
            </p>

            <textarea
              className="cat-textarea"
              rows={4}
              aria-label="Draft your answer"
              placeholder="Write your answer here first…"
              value={progress.examDrafts[current.id] ?? ''}
              onChange={(e) => onUpdateDraft(current.id, e.target.value)}
            />

            <button
              type="button"
              className="cat-btn cat-btn-primary"
              onClick={() => setMemoVisible((m) => !m)}
            >
              {memoVisible ? 'Hide memo' : 'Reveal memo'}
            </button>

            {memoVisible && (
              <div style={{ marginTop: 14, borderTop: '1px solid var(--line)', paddingTop: 12 }}>
                <b style={{ display: 'block', marginBottom: 4 }}>Full-Mark Model Answer</b>
                {current.modelAnswer.map((line, i) => (
                  <p key={i} style={{ margin: '5px 0', fontSize: '0.94rem' }}>
                    <TermPoint text={line} />
                  </p>
                ))}

                <b style={{ display: 'block', margin: '12px 0 4px' }}>Mark Breakdown</b>
                <ul className="cat-list" style={{ fontSize: '0.92rem' }}>
                  {current.markBreakdown.map((m, i) => (
                    <li key={i}>
                      <RichText text={m.point} />{' '}
                      <mark className="cat-num">
                        +{m.marks} {m.marks === 1 ? 'mark' : 'marks'}
                      </mark>
                    </li>
                  ))}
                </ul>

                <div className="cat-callout-good">
                  <b style={{ fontSize: '0.86rem' }}>Why this scores full marks</b>
                  <p style={{ margin: '4px 0 0', fontSize: '0.9rem' }}>
                    <RichText text={current.workedReasoning} />
                  </p>
                </div>

                <div className="cat-callout-trap">
                  <b style={{ fontSize: '0.86rem' }}>Common trap to avoid</b>
                  <p style={{ margin: '4px 0 0', fontSize: '0.9rem' }}>
                    <RichText text={current.commonMistake} />
                  </p>
                </div>

                <b style={{ display: 'block', margin: '12px 0 6px' }}>Tick each point you earned:</b>
                {current.checklist.map((label, cIdx) => {
                  const isChecked = Boolean(checks[cIdx]);
                  return (
                    <label key={cIdx} className={`cat-mk ${isChecked ? 'checked' : ''}`}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() =>
                          onToggleChecklistItem(current.id, cIdx, current.checklist.length)
                        }
                      />
                      <span>
                        <RichText text={label} />
                      </span>
                    </label>
                  );
                })}

                <div className="cat-row" style={{ marginTop: 10 }}>
                  <span className={`cat-pill cat-cond-${checkTone}`}>
                    {checkedCount} / {current.checklist.length} points checked
                  </span>
                  <span className="cat-g" />
                  <button
                    type="button"
                    className="cat-btn cat-btn-primary"
                    onClick={() => {
                      setQuestionIndex((i) => (i + 1) % ranked.length);
                    }}
                  >
                    Save &amp; next →
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="cat-row" style={{ justifyContent: 'space-between', marginTop: 10 }}>
            <button
              type="button"
              className="cat-btn"
              onClick={() => setQuestionIndex((i) => (i - 1 + ranked.length) % ranked.length)}
            >
              ← Prev
            </button>
            <button
              type="button"
              className="cat-btn"
              onClick={() => setQuestionIndex((i) => (i + 1) % ranked.length)}
            >
              Skip →
            </button>
          </div>
        </>
      )}
    </div>
  );
};
