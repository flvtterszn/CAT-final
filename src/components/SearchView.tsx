import React, { useMemo, useState } from 'react';
import { ExamTopicId, StudyNote, TopicId, WorkedExamQuestion } from '../types/cat';
import { EXAM_TOPIC_LABELS, TOPICS } from '../data/topics';
import { filterAndRankWorkedExams, filterStudyNotes } from '../utils/studyEngine';
import { ConceptDiagram } from './Diagrams';
import { RichText, TermPoint } from './RichText';

interface SearchViewProps {
  notes: StudyNote[];
  workedExams: WorkedExamQuestion[];
  onOpenLesson: (topicId: TopicId, noteId: string) => void;
  onOpenExamQuestion: (topicId: ExamTopicId, questionId: string) => void;
}

const TOPIC_COLOR: Record<string, string> = {
  sys: '#4c6ef5',
  net: '#12b886',
  inf: '#f59f00',
  soc: '#e64980',
  dev: '#7950f2',
  scn: '#e64980',
};

const DIFFICULTY_CLASS = {
  easy: 'cat-cond-high',
  medium: 'cat-cond-mid',
  hard: 'cat-cond-low',
} as const;

export const SearchView: React.FC<SearchViewProps> = ({
  notes,
  workedExams,
  onOpenLesson,
  onOpenExamQuestion,
}) => {
  const [query, setQuery] = useState('');

  const noteHits = useMemo(
    () => (query.trim() ? filterStudyNotes(notes, 'all', query).slice(0, 15) : []),
    [notes, query]
  );

  const examHits = useMemo(
    () => (query.trim() ? filterAndRankWorkedExams(workedExams, 'all', 'all', query).slice(0, 10) : []),
    [workedExams, query]
  );

  return (
    <div>
      <div className="cat-top">
        <h1 className="cat-h1">Search</h1>
      </div>

      <input
        type="search"
        className="cat-search"
        aria-label="Search all notes and exam questions"
        placeholder="Search all notes & exam questions…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {!query.trim() ? (
        <p className="cat-mut">
          Type a term such as <span className="cat-term-inline">VPN</span>,{' '}
          <span className="cat-term-inline">RAM</span>,{' '}
          <span className="cat-term-inline">POPIA</span>,{' '}
          <span className="cat-term-inline">VLOOKUP</span>, or primary key.
        </p>
      ) : noteHits.length === 0 && examHits.length === 0 ? (
        <p className="cat-mut">No notes or exam questions match “{query}”.</p>
      ) : (
        <>
          {noteHits.map((note) => {
            const topicMeta = TOPICS.find((t) => t.id === note.topic);
            const firstMatchPoint =
              note.recallPoints.find((p) => p.toLowerCase().includes(query.trim().toLowerCase())) ??
              note.recallPoints[0];

            return (
              <div
                key={note.id}
                className="cat-card"
                style={{ borderLeft: `6px solid ${TOPIC_COLOR[note.topic]}` }}
              >
                <div className="cat-row" style={{ marginBottom: 6 }}>
                  <span className="cat-tag">Study Note · {topicMeta?.name ?? note.topic}</span>
                </div>
                <p style={{ margin: '4px 0' }}>
                  <span className="cat-term-chip">{note.title}</span>{' '}
                  <span className="cat-expl">
                    <RichText text={note.summary} />
                  </span>
                </p>
                {firstMatchPoint && (
                  <p style={{ margin: '6px 0', fontSize: '0.9rem' }}>
                    <TermPoint text={firstMatchPoint} />
                  </p>
                )}
                {note.diagramId && <ConceptDiagram id={note.diagramId} />}
                <button
                  type="button"
                  className="cat-btn"
                  onClick={() => onOpenLesson(note.topic, note.id)}
                >
                  Open lesson →
                </button>
              </div>
            );
          })}

          {examHits.map((q) => (
            <div
              key={q.id}
              className="cat-card"
              style={{ borderLeft: `6px solid ${TOPIC_COLOR[q.topic]}` }}
            >
              <div className="cat-row" style={{ marginBottom: 6 }}>
                <span className="cat-tag">Worked Exam · {EXAM_TOPIC_LABELS[q.topic]}</span>
                <span className={`cat-pill ${DIFFICULTY_CLASS[q.difficulty]}`}>
                  {q.difficulty.toUpperCase()}
                </span>
                <mark className="cat-num">{q.marks} marks</mark>
              </div>
              <p style={{ margin: '4px 0' }}>
                <span className="cat-term-chip">{q.title}</span>{' '}
                <span className="cat-expl">
                  <RichText text={q.question} />
                </span>
              </p>
              <button
                type="button"
                className="cat-btn"
                onClick={() => onOpenExamQuestion(q.topic, q.id)}
              >
                Open question →
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
