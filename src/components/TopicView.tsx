import React from 'react';
import { DiagramId, McqQuestion, StudyNote, StudyProgress, TopicId, WorkedExamQuestion } from '../types/cat';
import { TOPICS } from '../data/topics';
import { calculateTopicMastery } from '../utils/studyEngine';
import { getMasteryTone } from '../utils/textHighlight';
import { ConfettiBurst, Ring } from './Ring';
import { ConceptDiagram } from './Diagrams';

interface TopicViewProps {
  topicId: TopicId;
  notes: StudyNote[];
  mcqs: McqQuestion[];
  workedExams: WorkedExamQuestion[];
  progress: StudyProgress;
  showConfetti: boolean;
  onBack: () => void;
  onOpenLesson: (noteId: string) => void;
  onPractiseTopic: (topicId: TopicId) => void;
  onOpenTopicExams: (topicId: TopicId) => void;
}

export const TopicView: React.FC<TopicViewProps> = ({
  topicId,
  notes,
  mcqs,
  workedExams,
  progress,
  showConfetti,
  onBack,
  onOpenLesson,
  onPractiseTopic,
  onOpenTopicExams,
}) => {
  const topic = TOPICS.find((t) => t.id === topicId) ?? TOPICS[0];
  const topicNotes = notes.filter((n) => n.topic === topicId);
  const mastery = calculateTopicMastery(topicId, notes, mcqs, workedExams, progress);
  const tone = getMasteryTone(mastery);

  const uniqueDiagrams: DiagramId[] = [];
  for (const n of topicNotes) {
    if (n.diagramId && !uniqueDiagrams.includes(n.diagramId)) {
      uniqueDiagrams.push(n.diagramId);
    }
  }

  return (
    <div>
      <ConfettiBurst active={showConfetti} />

      <div className="cat-top">
        <button type="button" className="cat-btn" onClick={onBack} aria-label="Back to Today">
          ←
        </button>
        <h2 className="cat-h2" style={{ margin: 0 }}>
          {topic.name}
        </h2>
      </div>

      <div className="cat-card cat-hz" style={{ borderLeft: `6px solid ${topic.accentHex}` }}>
        <Ring percent={mastery} size={64} color={topic.accentHex} label={`${mastery}%`} />
        <div className="cat-g">
          <div className="cat-row">
            <b className="cat-g">
              {mastery < 35 ? 'Let’s get started' : mastery < 75 ? 'Making progress' : 'Exam ready'}
            </b>
            <span className={`cat-pill cat-cond-${tone}`}>
              {tone === 'high' ? 'Ready' : tone === 'mid' ? 'Building' : 'Needs focus'}
            </span>
          </div>
          <p className="cat-mut">
            Worth <mark className="cat-num">{topic.paperMarks}</mark> of{' '}
            <mark className="cat-num">150 marks</mark> in Paper 2 ({topic.paperSection}).
          </p>
        </div>
      </div>

      <h2 className="cat-h2">Lessons</h2>

      {topicNotes.map((note, idx) => {
        const studied = Boolean(progress.studiedNotes[note.id]);
        return (
          <button
            key={note.id}
            type="button"
            className="cat-tc"
            style={
              studied
                ? {
                    borderColor: 'color-mix(in srgb, var(--ok) 45%, var(--line))',
                    background: 'color-mix(in srgb, var(--ok) 5%, var(--card))',
                  }
                : undefined
            }
            onClick={() => onOpenLesson(note.id)}
          >
            <span className="cat-g">
              <b>
                Lesson {idx + 1} · {note.title}
              </b>
              <span className="cat-mut">
                {note.subtopic} · {note.sagsRef}
              </span>
            </span>
            <span
              className={`cat-pill ${studied ? 'cat-cond-high' : ''}`}
              style={{ whiteSpace: 'nowrap' }}
            >
              {studied ? '✅ Studied' : '→ Study'}
            </span>
          </button>
        );
      })}

      <button
        type="button"
        className="cat-btn cat-btn-primary cat-bg"
        onClick={() => onPractiseTopic(topicId)}
      >
        Practise this topic · 10 items
      </button>

      <button
        type="button"
        className="cat-btn cat-bg"
        onClick={() => onOpenTopicExams(topicId)}
      >
        Worked exam questions (Easy → Hard)
      </button>

      {uniqueDiagrams.length > 0 && (
        <>
          <h2 className="cat-h2">Diagrams</h2>
          {uniqueDiagrams.map((dId) => (
            <div key={dId} className="cat-card">
              <ConceptDiagram id={dId} />
            </div>
          ))}
        </>
      )}
    </div>
  );
};
