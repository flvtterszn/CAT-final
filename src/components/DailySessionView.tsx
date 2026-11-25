import React, { useState } from 'react';
import { McqQuestion, StudyNote, StudyProgress, TopicId } from '../types/cat';
import { TOPICS } from '../data/topics';
import { buildDailySession } from '../utils/studyEngine';
import { ConfettiBurst } from './Ring';
import { ConceptDiagram } from './Diagrams';
import { RichText } from './RichText';

interface DailySessionViewProps {
  notes: StudyNote[];
  mcqs: McqQuestion[];
  progress: StudyProgress;
  topicFilter: TopicId | 'all';
  onRateFlashcard: (noteId: string, rating: 0 | 1 | 2) => void;
  onAnswerMcq: (questionId: string, correct: boolean) => void;
  onCompleteBonus: () => void;
  onExit: () => void;
}

export const DailySessionView: React.FC<DailySessionViewProps> = ({
  notes,
  mcqs,
  progress,
  topicFilter,
  onRateFlashcard,
  onAnswerMcq,
  onCompleteBonus,
  onExit,
}) => {
  const [deck, setDeck] = useState(() => buildDailySession(notes, mcqs, progress, topicFilter, 10));
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [okCount, setOkCount] = useState(0);
  const [sessionStreak, setSessionStreak] = useState(0);
  const [sessionXp, setSessionXp] = useState(0);
  const [bonusGiven, setBonusGiven] = useState(false);

  const current = deck[idx];
  const topicColor = (id: TopicId) => TOPICS.find((t) => t.id === id)?.accentHex ?? 'var(--acc)';
  const topicName = (id: TopicId) => TOPICS.find((t) => t.id === id)?.name ?? id;

  const restartRound = () => {
    setDeck(buildDailySession(notes, mcqs, progress, topicFilter, 10));
    setIdx(0);
    setRevealed(false);
    setSelectedOpt(null);
    setOkCount(0);
    setSessionStreak(0);
    setSessionXp(0);
    setBonusGiven(false);
  };

  if (deck.length === 0 || idx >= deck.length) {
    const total = Math.max(1, deck.length);
    const pct = Math.round((100 * okCount) / total);
    if (!bonusGiven && deck.length > 0) {
      setBonusGiven(true);
      onCompleteBonus();
    }

    return (
      <div>
        <ConfettiBurst active={deck.length > 0} />
        <div className="cat-fc2" style={{ textAlign: 'center' }}>
          <div className="cat-big">
            {deck.length === 0
              ? 'All caught up!'
              : pct >= 80
              ? 'Brilliant!'
              : pct >= 50
              ? 'Good work!'
              : 'Keep going!'}
          </div>
          <p className="cat-def">
            {deck.length === 0
              ? 'Every flashcard and question in this topic is up to date.'
              : `${okCount} of ${deck.length} right · +${sessionXp + 20} XP`}
          </p>
          <p className="cat-mut">
            🔥 {progress.streak || 1}-day streak · Level {Math.floor(progress.xp / 100) + 1}
          </p>
        </div>

        <button type="button" className="cat-btn cat-btn-primary cat-bg" onClick={restartRound}>
          Another round
        </button>
        <button type="button" className="cat-btn cat-bg" onClick={onExit}>
          Back to Today
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="cat-top">
        <button type="button" className="cat-btn" onClick={onExit} aria-label="Exit session">
          ✕
        </button>
        <div className="cat-pb">
          <i style={{ width: `${Math.round((idx * 100) / deck.length)}%` }} />
        </div>
        {sessionStreak >= 3 ? (
          <span className="cat-chip">🔥 {sessionStreak}</span>
        ) : (
          <span className="cat-pill">
            {idx + 1}/{deck.length}
          </span>
        )}
      </div>

      {current.kind === 'flashcard' ? (
        <>
          <div className="cat-fc2" style={{ '--tc': topicColor(current.note.topic) } as React.CSSProperties}>
            <span className="cat-tag">Flashcard · {topicName(current.note.topic)}</span>
            <div className="cat-big" style={{ fontSize: '1.45rem' }}>
              <RichText text={current.note.flashcardFront} />
            </div>
            {revealed ? (
              <>
                <div className="cat-callout-good">
                  <p className="cat-def">
                    <RichText text={current.note.flashcardBack} />
                  </p>
                </div>
                {current.note.diagramId && <ConceptDiagram id={current.note.diagramId} />}
              </>
            ) : (
              <p className="cat-mut">Say the answer out loud or in your head first.</p>
            )}
          </div>

          {revealed ? (
            <div className="cat-row3">
              <button
                type="button"
                className="cat-btn"
                onClick={() => {
                  onRateFlashcard(current.note.id, 0);
                  setSessionStreak(0);
                  setSessionXp((x) => x + 1);
                  setIdx((i) => i + 1);
                  setRevealed(false);
                }}
              >
                Again
              </button>
              <button
                type="button"
                className="cat-btn cat-btn-primary"
                onClick={() => {
                  onRateFlashcard(current.note.id, 1);
                  setOkCount((c) => c + 1);
                  setSessionStreak((s) => s + 1);
                  setSessionXp((x) => x + 6);
                  setIdx((i) => i + 1);
                  setRevealed(false);
                }}
              >
                Good
              </button>
              <button
                type="button"
                className="cat-btn"
                onClick={() => {
                  onRateFlashcard(current.note.id, 2);
                  setOkCount((c) => c + 1);
                  setSessionStreak((s) => s + 1);
                  setSessionXp((x) => x + 7);
                  setIdx((i) => i + 1);
                  setRevealed(false);
                }}
              >
                Easy
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="cat-btn cat-btn-primary cat-bg"
              onClick={() => setRevealed(true)}
            >
              Show answer
            </button>
          )}
        </>
      ) : (
        <>
          <div className="cat-fc2" style={{ '--tc': topicColor(current.mcq.topic) } as React.CSSProperties}>
            <span className="cat-tag">
              Question · {topicName(current.mcq.topic)} · {current.mcq.difficulty.toUpperCase()}
            </span>
            <div className="cat-qq">
              <RichText text={current.mcq.question} />
            </div>

            <div>
              {current.mcq.options.map((opt, oIdx) => {
                const answered = selectedOpt !== null;
                const isCorrect = oIdx === current.mcq.correctIndex;
                const isChosen = oIdx === selectedOpt;
                const extra = answered ? (isCorrect ? 'ok' : isChosen ? 'bad' : '') : '';

                return (
                  <button
                    key={oIdx}
                    type="button"
                    disabled={answered}
                    className={`cat-opt ${extra}`}
                    onClick={() => {
                      setSelectedOpt(oIdx);
                      const ok = oIdx === current.mcq.correctIndex;
                      if (ok) {
                        setOkCount((c) => c + 1);
                        setSessionStreak((s) => s + 1);
                        setSessionXp((x) => x + 10);
                      } else {
                        setSessionStreak(0);
                        setSessionXp((x) => x + 2);
                      }
                      onAnswerMcq(current.mcq.id, ok);
                    }}
                  >
                    <RichText text={opt} />
                  </button>
                );
              })}
            </div>

            {selectedOpt !== null && (
              <>
                <div
                  className={
                    selectedOpt === current.mcq.correctIndex
                      ? 'cat-callout-good'
                      : 'cat-callout-trap'
                  }
                >
                  <p style={{ margin: 0 }}>
                    <b>{selectedOpt === current.mcq.correctIndex ? 'Correct!' : 'Not quite.'}</b>{' '}
                    <RichText text={current.mcq.explanation} />
                  </p>
                </div>
                {current.mcq.diagramId && <ConceptDiagram id={current.mcq.diagramId} />}
              </>
            )}
          </div>

          {selectedOpt !== null && (
            <button
              type="button"
              className="cat-btn cat-btn-primary cat-bg"
              onClick={() => {
                setIdx((i) => i + 1);
                setSelectedOpt(null);
              }}
            >
              Continue
            </button>
          )}
        </>
      )}
    </div>
  );
};
