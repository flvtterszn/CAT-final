import React, { useMemo, useState } from 'react';
import { CheckCircle2, RotateCw, Search } from 'lucide-react';
import { StudyNote, StudyProgress, TopicId } from '../types/cat';
import { TOPICS } from '../data/topics';
import { filterStudyNotes } from '../utils/studyEngine';
import { ConceptDiagram } from './Diagrams';

interface StudyNotesViewProps {
  notes: StudyNote[];
  progress: StudyProgress;
  selectedTopic: TopicId | 'all';
  initialSearch: string;
  onSelectTopic: (topic: TopicId | 'all') => void;
  onToggleStudied: (noteId: string) => void;
  onOpenWorkedForTopic: (topic: TopicId) => void;
}

export const StudyNotesView: React.FC<StudyNotesViewProps> = ({
  notes,
  progress,
  selectedTopic,
  initialSearch,
  onSelectTopic,
  onToggleStudied,
  onOpenWorkedForTopic,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [mode, setMode] = useState<'notes' | 'flashcards'>('notes');
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const filteredNotes = useMemo(
    () => filterStudyNotes(notes, selectedTopic, searchQuery),
    [notes, selectedTopic, searchQuery]
  );

  const safeCardIdx = filteredNotes.length > 0 ? cardIndex % filteredNotes.length : 0;
  const currentCard = filteredNotes[safeCardIdx];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between dark:border-slate-800">
        <div>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            IEB CAT Paper 2 · Recall, Comprehension &amp; Synthesis Study Guide
          </p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">
            Complete SAGS Study Notes
          </h1>
        </div>

        <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1 self-start dark:bg-slate-900">
          <button
            type="button"
            onClick={() => setMode('notes')}
            className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap ${
              mode === 'notes'
                ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-800 dark:text-slate-100'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
            }`}
          >
            Full Exam Notes
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('flashcards');
              setFlipped(false);
            }}
            className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap ${
              mode === 'flashcards'
                ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-800 dark:text-slate-100'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
            }`}
          >
            Flashcard Drill
          </button>
        </div>
      </div>

      {/* Topic Filter Tabs + Search */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Filter notes by SAGS topic">
          <button
            type="button"
            onClick={() => {
              onSelectTopic('all');
              setCardIndex(0);
              setFlipped(false);
            }}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
              selectedTopic === 'all'
                ? 'bg-blue-700 text-white dark:bg-blue-600'
                : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
            }`}
          >
            All Topics ({notes.length})
          </button>
          {TOPICS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                onSelectTopic(t.id);
                setCardIndex(0);
                setFlipped(false);
              }}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                selectedTopic === t.id
                  ? 'bg-blue-700 text-white dark:bg-blue-600'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
              }`}
            >
              {t.shortName}
            </button>
          ))}
        </div>

        <div className="relative w-full lg:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCardIndex(0);
              setFlipped(false);
            }}
            placeholder="Filter notes (CMOS, POPIA, RAM…)"
            aria-label="Filter study notes"
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
          />
        </div>
      </div>

      {filteredNotes.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
            No study notes match “{searchQuery}”.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              onSelectTopic('all');
            }}
            className="mt-3 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300"
          >
            Clear Filters
          </button>
        </div>
      ) : mode === 'flashcards' && currentCard ? (
        <section className="mx-auto max-w-2xl space-y-4">
          <p className="text-center text-xs font-medium text-slate-500 tabular-nums dark:text-slate-400">
            Card {safeCardIdx + 1} of {filteredNotes.length} · {currentCard.subtopic}
          </p>

          <button
            type="button"
            onClick={() => setFlipped((f) => !f)}
            className="flex min-h-64 w-full flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 text-center transition-colors hover:border-blue-400 focus-visible:outline-2 focus-visible:outline-blue-600 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500"
          >
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {flipped ? 'Model Answer · Tap to flip back' : `${currentCard.title} · Tap to reveal answer`}
            </span>
            <p className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
              {flipped ? currentCard.flashcardBack : currentCard.flashcardFront}
            </p>
          </button>

          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => {
                setCardIndex((i) => (i - 1 + filteredNotes.length) % filteredNotes.length);
                setFlipped(false);
              }}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
            >
              Previous Card
            </button>
            <button
              type="button"
              onClick={() => setFlipped((f) => !f)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 dark:bg-blue-600"
            >
              <RotateCw className="h-4 w-4" />
              <span>Flip Card</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setCardIndex((i) => (i + 1) % filteredNotes.length);
                setFlipped(false);
              }}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
            >
              Next Card
            </button>
          </div>
        </section>
      ) : (
        <div className="space-y-6">
          {filteredNotes.map((note) => {
            const studied = Boolean(progress.studiedNotes[note.id]);
            return (
              <article
                key={note.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-4 dark:border-slate-800">
                  <div>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      {note.sagsRef} · {note.subtopic}
                    </p>
                    <h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-slate-100">
                      {note.title}
                    </h2>
                    <p className="mt-2 max-w-3xl text-sm text-slate-600 dark:text-slate-300">
                      {note.summary}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => onToggleStudied(note.id)}
                      className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap ${
                        studied
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
                          : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>{studied ? 'Studied' : 'Mark Studied'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onOpenWorkedForTopic(note.topic)}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 whitespace-nowrap dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                    >
                      Worked Exam Qs
                    </button>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-3">
                  {/* Recall Core */}
                  <section>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      1. Recall Core (Definitions &amp; Facts)
                    </h3>
                    <ul className="mt-2.5 list-disc space-y-2 pl-4 text-sm text-slate-700 dark:text-slate-300">
                      {note.recallPoints.map((pt, idx) => (
                        <li key={idx}>{pt}</li>
                      ))}
                    </ul>
                  </section>

                  {/* Comprehension */}
                  <section>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      2. Comprehension (How &amp; Why It Works)
                    </h3>
                    <ul className="mt-2.5 list-disc space-y-2 pl-4 text-sm text-slate-700 dark:text-slate-300">
                      {note.comprehensionPoints.map((pt, idx) => (
                        <li key={idx}>{pt}</li>
                      ))}
                    </ul>
                  </section>

                  {/* Synthesis & Application */}
                  <section>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      3. IEB Synthesis &amp; Scenario Application
                    </h3>
                    <ul className="mt-2.5 list-disc space-y-2 pl-4 text-sm text-slate-700 dark:text-slate-300">
                      {note.synthesisAndApplication.map((pt, idx) => (
                        <li key={idx}>{pt}</li>
                      ))}
                    </ul>
                    <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50/70 p-3.5 dark:border-amber-900/60 dark:bg-amber-950/30">
                      <p className="text-xs font-bold text-amber-900 dark:text-amber-300">
                        Examiner Mark-Scoring Tips
                      </p>
                      <ul className="mt-1.5 list-disc space-y-1 pl-4 text-xs text-amber-900/90 dark:text-amber-200/90">
                        {note.examTips.map((tip, idx) => (
                          <li key={idx}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </section>
                </div>

                {/* Comparison Table if present */}
                {note.comparison && (
                  <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                    <table className="w-full text-left text-sm">
                      <caption className="bg-slate-50 px-4 py-2.5 text-left text-xs font-bold text-slate-700 dark:bg-slate-800/70 dark:text-slate-200">
                        {note.comparison.title}
                      </caption>
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900">
                          {note.comparison.headers.map((h) => (
                            <th key={h} className="px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {note.comparison.rows.map((row, rIdx) => (
                          <tr key={rIdx}>
                            {row.map((cell, cIdx) => (
                              <td
                                key={cIdx}
                                className={`px-4 py-2.5 text-xs ${
                                  cIdx === 0
                                    ? 'font-semibold text-slate-900 dark:text-slate-100'
                                    : 'text-slate-600 dark:text-slate-300'
                                }`}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Diagram if present */}
                {note.diagramId && <ConceptDiagram id={note.diagramId} />}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
