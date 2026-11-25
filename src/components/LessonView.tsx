import React, { useMemo, useState } from 'react';
import { StudyNote } from '../types/cat';
import { TOPICS } from '../data/topics';
import { ConceptDiagram } from './Diagrams';
import { RichText, TermPoint } from './RichText';

interface LessonViewProps {
  note: StudyNote;
  lessonNumber: number;
  onExit: () => void;
  onFinish: (noteId: string) => void;
}

export const LessonView: React.FC<LessonViewProps> = ({
  note,
  lessonNumber,
  onExit,
  onFinish,
}) => {
  const [stepIdx, setStepIdx] = useState(0);
  const [flashRevealed, setFlashRevealed] = useState(false);

  const topic = TOPICS.find((t) => t.id === note.topic) ?? TOPICS[0];

  const steps = useMemo(() => {
    const list: (
      | { kind: 'recall' }
      | { kind: 'comprehension' }
      | { kind: 'comparison' }
      | { kind: 'synthesis' }
      | { kind: 'flashcard' }
    )[] = [{ kind: 'recall' }, { kind: 'comprehension' }];
    if (note.comparison) list.push({ kind: 'comparison' });
    list.push({ kind: 'synthesis' }, { kind: 'flashcard' });
    return list;
  }, [note]);

  const currentStep = steps[stepIdx];
  const progressPct = Math.round(((stepIdx + 1) * 100) / steps.length);

  return (
    <div>
      <div className="cat-top">
        <button type="button" className="cat-btn" onClick={onExit} aria-label="Close lesson">
          ✕
        </button>
        <div className="cat-pb">
          <i style={{ width: `${progressPct}%` }} />
        </div>
        <span className="cat-pill">
          {stepIdx + 1}/{steps.length}
        </span>
      </div>

      <div className="cat-fc2" style={{ '--tc': topic.accentHex } as React.CSSProperties}>
        <div className="cat-row" style={{ justifyContent: 'space-between' }}>
          <span className="cat-tag">
            Lesson {lessonNumber} · {topic.name}
          </span>
          <span className="cat-mut" style={{ fontSize: '0.76rem' }}>
            <span className="cat-term-chip" style={{ fontSize: '0.72rem', padding: '0 5px' }}>
              Term
            </span>{' '}
            Definition · <mark className="cat-num">123</mark> Number
          </span>
        </div>

        {currentStep.kind === 'recall' && (
          <>
            <div className="cat-big">{note.title}</div>
            <p className="cat-def">
              <RichText text={note.summary} />
            </p>
            <div>
              <b style={{ fontSize: '0.92rem' }}>1. Recall Core (Key Terms &amp; Facts)</b>
              <ul className="cat-list">
                {note.recallPoints.map((pt, i) => (
                  <li key={i}>
                    <TermPoint text={pt} />
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {currentStep.kind === 'comprehension' && (
          <>
            <div className="cat-big" style={{ fontSize: '1.35rem' }}>
              2. Comprehension (How &amp; Why It Works)
            </div>
            <ul className="cat-list">
              {note.comprehensionPoints.map((pt, i) => (
                <li key={i}>
                  <TermPoint text={pt} />
                </li>
              ))}
            </ul>
            {note.diagramId && <ConceptDiagram id={note.diagramId} />}
          </>
        )}

        {currentStep.kind === 'comparison' && note.comparison && (
          <>
            <div className="cat-big" style={{ fontSize: '1.35rem' }}>
              {note.comparison.title}
            </div>
            <div className="cat-table-wrap">
              <table className="cat-table">
                <thead>
                  <tr>
                    {note.comparison.headers.map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {note.comparison.rows.map((row, rIdx) => (
                    <tr key={rIdx}>
                      {row.map((cell, cIdx) => (
                        <td key={cIdx}>
                          {cIdx === 0 ? (
                            <span className="cat-term-chip">{cell}</span>
                          ) : (
                            <RichText text={cell} />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {currentStep.kind === 'synthesis' && (
          <>
            <div className="cat-big" style={{ fontSize: '1.35rem' }}>
              3. IEB Synthesis &amp; Scenario Application
            </div>
            <ul className="cat-list">
              {note.synthesisAndApplication.map((pt, i) => (
                <li key={i}>
                  <TermPoint text={pt} />
                </li>
              ))}
            </ul>
            <div className="cat-callout-tip">
              <b style={{ fontSize: '0.88rem' }}>Examiner Mark-Scoring Tips</b>
              <ul className="cat-list" style={{ fontSize: '0.9rem' }}>
                {note.examTips.map((tip, i) => (
                  <li key={i}>
                    <RichText text={tip} />
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {currentStep.kind === 'flashcard' && (
          <>
            <span className="cat-tag">Quick Check Flashcard</span>
            <div className="cat-big" style={{ fontSize: '1.4rem' }}>
              <RichText text={note.flashcardFront} />
            </div>
            {flashRevealed ? (
              <div className="cat-callout-good">
                <p className="cat-def">
                  <RichText text={note.flashcardBack} />
                </p>
              </div>
            ) : (
              <div>
                <p className="cat-mut">Say the answer out loud or in your head first.</p>
                <button
                  type="button"
                  className="cat-btn"
                  style={{ marginTop: 8 }}
                  onClick={() => setFlashRevealed(true)}
                >
                  Reveal answer
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <div className="cat-row3" style={{ gridTemplateColumns: '1fr 2fr' }}>
        <button
          type="button"
          className="cat-btn"
          onClick={() => {
            setStepIdx((s) => Math.max(0, s - 1));
            setFlashRevealed(false);
          }}
          disabled={stepIdx === 0}
        >
          ← Back
        </button>

        {stepIdx < steps.length - 1 ? (
          <button
            type="button"
            className="cat-btn cat-btn-primary"
            onClick={() => {
              setStepIdx((s) => s + 1);
              setFlashRevealed(false);
            }}
          >
            Next →
          </button>
        ) : (
          <button
            type="button"
            className="cat-btn cat-btn-primary"
            onClick={() => onFinish(note.id)}
          >
            Finish · +20 XP
          </button>
        )}
      </div>
    </div>
  );
};
