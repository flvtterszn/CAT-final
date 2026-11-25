import React, { useEffect, useState } from 'react';
import { AppView, ExamTopicId, StudyProgress, TopicId } from './types/cat';
import { ALL_NOTES } from './data/allNotes';
import { MCQ_QUESTIONS } from './data/questionsMcq';
import { WORKED_EXAM_QUESTIONS } from './data/workedExams';
import {
  createInitialProgress,
  getDayNumber,
  recordDailyActivity,
  scheduleFlashcard,
} from './utils/studyEngine';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { StudyNotesView } from './components/StudyNotesView';
import { WorkedExamsView } from './components/WorkedExamsView';
import { PracticeView } from './components/PracticeView';
import { ExamGuideView } from './components/ExamGuideView';
import { DailySessionView } from './components/DailySessionView';

const STORAGE_KEY = 'cat_ieb_prep_v2';

function loadProgress(): StudyProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<StudyProgress>;
      return { ...createInitialProgress(), ...parsed };
    }
  } catch {
    // Ignore corrupt local storage
  }
  return createInitialProgress();
}

export const App: React.FC = () => {
  const [progress, setProgress] = useState<StudyProgress>(loadProgress);
  const [view, setView] = useState<AppView>('dashboard');
  const [notesTopic, setNotesTopic] = useState<TopicId | 'all'>('sys');
  const [notesSearch, setNotesSearch] = useState('');
  const [notesMountKey, setNotesMountKey] = useState(0);
  const [workedTopic, setWorkedTopic] = useState<ExamTopicId | 'all'>('all');
  const [quizTopic, setQuizTopic] = useState<TopicId | 'all'>('all');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore storage quota errors
    }
  }, [progress]);

  useEffect(() => {
    const root = document.documentElement;
    if (progress.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [progress.theme]);

  const handleToggleStudied = (noteId: string) => {
    setProgress((prev) => {
      const nextVal = !prev.studiedNotes[noteId];
      const base: StudyProgress = {
        ...prev,
        studiedNotes: { ...prev.studiedNotes, [noteId]: nextVal },
      };
      return nextVal ? recordDailyActivity(base, 15) : base;
    });
  };

  const handleRateFlashcard = (noteId: string, rating: 0 | 1 | 2) => {
    setProgress((prev) => {
      const currentBox = prev.flashcards[noteId]?.box ?? 0;
      const nextState = scheduleFlashcard(currentBox, rating, getDayNumber());
      const xp = rating === 0 ? 2 : 6 + rating;
      return recordDailyActivity(
        {
          ...prev,
          flashcards: { ...prev.flashcards, [noteId]: nextState },
        },
        xp
      );
    });
  };

  const handleAnswerMcq = (questionId: string, correct: boolean) => {
    setProgress((prev) =>
      recordDailyActivity(
        {
          ...prev,
          mcqResults: { ...prev.mcqResults, [questionId]: correct ? 1 : 0 },
        },
        correct ? 10 : 2
      )
    );
  };

  const handleUpdateDraft = (questionId: string, draft: string) => {
    setProgress((prev) => ({
      ...prev,
      examDrafts: { ...prev.examDrafts, [questionId]: draft },
    }));
  };

  const handleToggleChecklistItem = (questionId: string, idx: number, totalItems: number) => {
    setProgress((prev) => {
      const existing = prev.examChecklist[questionId] ?? Array.from({ length: totalItems }, () => false);
      const updated = existing.map((val, i) => (i === idx ? !val : val));
      const wasChecked = Boolean(existing[idx]);
      const base: StudyProgress = {
        ...prev,
        examChecklist: { ...prev.examChecklist, [questionId]: updated },
      };
      return !wasChecked ? recordDailyActivity(base, 8) : base;
    });
  };

  const navigateAndScroll = (nextView: AppView) => {
    setView(nextView);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Header
        activeView={view}
        onNavigate={navigateAndScroll}
        onStartSession={() => navigateAndScroll('session')}
      />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {view === 'dashboard' && (
          <DashboardView
            notes={ALL_NOTES}
            mcqs={MCQ_QUESTIONS}
            workedExams={WORKED_EXAM_QUESTIONS}
            progress={progress}
            onOpenTopicNotes={(t) => {
              setNotesTopic(t);
              setNotesSearch('');
              setNotesMountKey((k) => k + 1);
              navigateAndScroll('notes');
            }}
            onOpenTopicWorked={(t) => {
              setWorkedTopic(t);
              navigateAndScroll('worked');
            }}
            onStartQuiz={(t) => {
              setQuizTopic(t);
              navigateAndScroll('practice');
            }}
            onStartSession={() => navigateAndScroll('session')}
            onGlobalSearch={(q) => {
              setNotesTopic('all');
              setNotesSearch(q);
              setNotesMountKey((k) => k + 1);
              navigateAndScroll('notes');
            }}
            onToggleTheme={() =>
              setProgress((p) => ({ ...p, theme: p.theme === 'dark' ? 'light' : 'dark' }))
            }
            onChangeExamDate={(d) => setProgress((p) => ({ ...p, examDate: d }))}
            onResetProgress={() => setProgress(createInitialProgress())}
          />
        )}

        {view === 'notes' && (
          <StudyNotesView
            key={notesMountKey}
            notes={ALL_NOTES}
            progress={progress}
            selectedTopic={notesTopic}
            initialSearch={notesSearch}
            onSelectTopic={(t) => setNotesTopic(t)}
            onToggleStudied={handleToggleStudied}
            onOpenWorkedForTopic={(t) => {
              setWorkedTopic(t);
              navigateAndScroll('worked');
            }}
          />
        )}

        {view === 'worked' && (
          <WorkedExamsView
            questions={WORKED_EXAM_QUESTIONS}
            progress={progress}
            selectedTopic={workedTopic}
            onSelectTopic={setWorkedTopic}
            onUpdateDraft={handleUpdateDraft}
            onToggleChecklistItem={handleToggleChecklistItem}
          />
        )}

        {view === 'practice' && (
          <PracticeView
            key={quizTopic}
            mcqs={MCQ_QUESTIONS}
            progress={progress}
            initialTopic={quizTopic}
            onAnswerMcq={handleAnswerMcq}
          />
        )}

        {view === 'guide' && <ExamGuideView />}

        {view === 'session' && (
          <DailySessionView
            notes={ALL_NOTES}
            mcqs={MCQ_QUESTIONS}
            progress={progress}
            onRateFlashcard={handleRateFlashcard}
            onAnswerMcq={handleAnswerMcq}
            onExit={() => navigateAndScroll('dashboard')}
          />
        )}
      </main>
    </div>
  );
};

export default App;
