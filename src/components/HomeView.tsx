import React, { useState } from 'react';
import { ExamTopicId, McqQuestion, StudyNote, StudyProgress, TopicId, WorkedExamQuestion } from '../types/cat';
import { TOPICS } from '../data/topics';
import { calculateExamReadiness, calculateTopicMastery, getDayNumber } from '../utils/studyEngine';
import { getGoalTone, getMasteryTone } from '../utils/textHighlight';
import { Ring } from './Ring';

interface HomeViewProps {
  notes: StudyNote[];
  mcqs: McqQuestion[];
  workedExams: WorkedExamQuestion[];
  progress: StudyProgress;
  onStartSession: () => void;
  onOpenTopic: (topicId: TopicId) => void;
  onOpenWorked: (topicId: ExamTopicId) => void;
  onToggleTheme: () => void;
  onChangeExamDate: (date: string) => void;
  onResetProgress: () => void;
}

const TONE_LABEL = {
  low: 'Needs focus',
  mid: 'Building',
  high: 'Ready',
} as const;

const TONE_COLOR = {
  low: 'var(--bad)',
  mid: '#d97706',
  high: 'var(--ok)',
} as const;

export const HomeView: React.FC<HomeViewProps> = ({
  notes,
  mcqs,
  workedExams,
  progress,
  onStartSession,
  onOpenTopic,
  onOpenWorked,
  onToggleTheme,
  onChangeExamDate,
  onResetProgress,
}) => {
  const [confirmReset, setConfirmReset] = useState(false);

  const today = getDayNumber();
  const goalCount = progress.dailyGoal.day === today ? progress.dailyGoal.count : 0;
  const readiness = calculateExamReadiness(notes, mcqs, workedExams, progress);
  const readinessTone = getMasteryTone(readiness);
  const goalTone = getGoalTone(goalCount, 10);

  const level = Math.floor(progress.xp / 100) + 1;
  const levelXp = progress.xp % 100;

  const daysUntilExam =
    progress.examDate && !Number.isNaN(Date.parse(progress.examDate))
      ? Math.max(0, Math.ceil((Date.parse(progress.examDate) - Date.now()) / 86_400_000))
      : null;

  const scenarioQuestions = workedExams.filter((w) => w.topic === 'scn');
  const scenarioCount = scenarioQuestions.length;
  const scenarioDone = scenarioQuestions.filter((w) => {
    const checks = progress.examChecklist[w.id];
    return checks && checks.filter(Boolean).length >= Math.ceil(w.checklist.length * 0.6);
  }).length;
  const scenarioPct =
    scenarioCount > 0 ? Math.round((100 * scenarioDone) / scenarioCount) : 0;
  const scenarioTone = getMasteryTone(scenarioPct);

  return (
    <div>
      <div className="cat-top">
        <div className="cat-g">
          <h1 className="cat-h1">Today</h1>
          <p className="cat-mut">
            {goalCount >= 10 ? 'Goal reached. Brilliant!' : 'Ten minutes a day beats a three-hour cram.'}
          </p>
        </div>
        <button
          type="button"
          className="cat-btn"
          onClick={onToggleTheme}
          aria-label={`Switch to ${progress.theme === 'dark' ? 'light' : 'dark'} theme`}
          title="Toggle light or dark mode"
        >
          🌓
        </button>
      </div>

      <div className="cat-chips">
        <span className="cat-chip">🔥 {progress.streak}-day streak</span>
        <span className="cat-chip">
          ⭐ Level {level} · {levelXp}/100 XP
        </span>
        {daysUntilExam !== null && (
          <span
            className={`cat-chip ${
              daysUntilExam <= 7 ? 'cat-cond-low' : daysUntilExam <= 21 ? 'cat-cond-mid' : ''
            }`}
          >
            📅 {daysUntilExam} days to go
          </span>
        )}
      </div>

      <div className="cat-card cat-hz">
        <Ring
          percent={Math.min(100, goalCount * 10)}
          size={84}
          color={goalTone === 'high' ? 'var(--ok)' : 'var(--acc)'}
          label={`${goalCount}/10`}
        />
        <div className="cat-g">
          <div className="cat-row">
            <b className="cat-g">Today’s goal</b>
            {goalCount >= 10 && <span className="cat-pill cat-cond-high">Complete</span>}
          </div>
          <p className="cat-mut">Due flashcards, weak spots and new questions, mixed for you.</p>
          <button type="button" className="cat-btn cat-btn-primary cat-bg" onClick={onStartSession}>
            {goalCount > 0 ? 'Keep going' : 'Start today’s session'}
          </button>
        </div>
      </div>

      <div className="cat-card">
        <div className="cat-row">
          <b className="cat-g">Exam readiness</b>
          <span className={`cat-pill cat-cond-${readinessTone}`}>
            {readiness}% · {TONE_LABEL[readinessTone]}
          </span>
        </div>
        <div className="cat-bar">
          <i style={{ width: `${readiness}%`, background: TONE_COLOR[readinessTone] }} />
        </div>
        <p className="cat-mut">
          Weighted by the <mark className="cat-num">150 marks</mark> across the Paper 2 SAGS blueprint.
        </p>
      </div>

      <h2 className="cat-h2">Topics</h2>

      {TOPICS.map((topic) => {
        const mastery = calculateTopicMastery(topic.id, notes, mcqs, workedExams, progress);
        const tone = getMasteryTone(mastery);
        const lessonCount = notes.filter((n) => n.topic === topic.id).length;
        const workedCount = workedExams.filter((w) => w.topic === topic.id).length;

        return (
          <button
            key={topic.id}
            type="button"
            className="cat-tc"
            style={{ borderLeft: `6px solid ${topic.accentHex}` }}
            onClick={() => onOpenTopic(topic.id)}
          >
            <Ring percent={mastery} size={48} color={topic.accentHex} label={`${mastery}%`} />
            <span className="cat-g">
              <span className="cat-row" style={{ gap: 6 }}>
                <b>{topic.name}</b>
                {mastery > 0 && (
                  <span className={`cat-pill cat-cond-${tone}`} style={{ fontSize: '0.72rem' }}>
                    {TONE_LABEL[tone]}
                  </span>
                )}
              </span>
              <span className="cat-mut">
                <mark className="cat-num">{topic.paperMarks} marks</mark> · {lessonCount} lessons ·{' '}
                {workedCount} exams
              </span>
            </span>
            <span aria-hidden="true" style={{ fontSize: '1.2rem', color: 'var(--mut)' }}>
              ›
            </span>
          </button>
        );
      })}

      <button
        type="button"
        className="cat-tc"
        style={{ borderLeft: '6px solid #e64980' }}
        onClick={() => onOpenWorked('scn')}
      >
        <Ring percent={scenarioPct} size={48} color="#e64980" label={`${scenarioPct}%`} />
        <span className="cat-g">
          <span className="cat-row" style={{ gap: 6 }}>
            <b>Integrated Scenarios (Q8 &amp; Q9)</b>
            {scenarioPct > 0 && (
              <span className={`cat-pill cat-cond-${scenarioTone}`} style={{ fontSize: '0.72rem' }}>
                {TONE_LABEL[scenarioTone]}
              </span>
            )}
          </span>
          <span className="cat-mut">
            <mark className="cat-num">±50 marks</mark> · {scenarioCount} synthesis questions (Easy → Hard)
          </span>
        </span>
        <span aria-hidden="true" style={{ fontSize: '1.2rem', color: 'var(--mut)' }}>
          ›
        </span>
      </button>

      <div className="cat-row" style={{ marginTop: 18 }}>
        <label className="cat-mut" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>Exam date:</span>
          <input
            type="date"
            className="cat-date"
            value={progress.examDate}
            onChange={(e) => onChangeExamDate(e.target.value)}
          />
        </label>

        {!confirmReset ? (
          <button type="button" className="cat-btn" onClick={() => setConfirmReset(true)}>
            Reset progress
          </button>
        ) : (
          <span className="cat-row">
            <button
              type="button"
              className="cat-btn"
              style={{ borderColor: 'var(--bad)', color: 'var(--bad)', fontWeight: 600 }}
              onClick={() => {
                onResetProgress();
                setConfirmReset(false);
              }}
            >
              Confirm reset
            </button>
            <button type="button" className="cat-btn" onClick={() => setConfirmReset(false)}>
              Cancel
            </button>
          </span>
        )}
      </div>
    </div>
  );
};
