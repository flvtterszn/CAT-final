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
import { HomeView } from './components/HomeView';
import { TopicView } from './components/TopicView';
import { LessonView } from './components/LessonView';
import { DailySessionView } from './components/DailySessionView';
import { ExamQuestionsView } from './components/ExamQuestionsView';
import { ExamGuideView } from './components/ExamGuideView';
import { SearchView } from './components/SearchView';
import { BottomNav } from './components/BottomNav';

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
  const [view, setView] = useState<AppView>('home');
  const [activeTopic, setActiveTopic] = useState<TopicId>('sys');
  const [activeLessonId, setActiveLessonId] = useState<string>(ALL_NOTES[0].id);
  const [sessionTopic, setSessionTopic] = useState<TopicId | 'all'>('all');
  const [examTopic, setExamTopic] = useState<ExamTopicId | 'all'>('all');
  const [examFocusId, setExamFocusId] = useState<string | null>(null);
  const [topicConfetti, setTopicConfetti] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore storage quota errors
    }
  }, [progress]);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = progress.theme;
    if (progress.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [progress.theme]);

  const go = (nextView: AppView) => {
    setView(nextView);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleFinishLesson = (noteId: string) => {
    setProgress((prev) => {
      const alreadyStudied = Boolean(prev.studiedNotes[noteId]);
      const base: StudyProgress = {
        ...prev,
        studiedNotes: { ...prev.studiedNotes, [noteId]: true },
      };
      return alreadyStudied ? base : recordDailyActivity(base, 20);
    });
    setTopicConfetti(true);
    go('topic');
  };

  const handleRateFlashcard = (noteId: string, rating: 0 | 1 | 2) => {
    setProgress((prev) => {
      const currentBox = prev.flashcards[noteId]?.box ?? 0;
      const nextState = scheduleFlashcard(currentBox, rating, getDayNumber());
      const xp = rating === 0 ? 1 : 5 + rating;
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

  const topicNotes = ALL_NOTES.filter((n) => n.topic === activeTopic);
  const currentLesson = ALL_NOTES.find((n) => n.id === activeLessonId) ?? ALL_NOTES[0];
  const lessonNumber =
    topicNotes.findIndex((n) => n.id === currentLesson.id) + 1 || 1;

  const isFullscreen = view === 'session' || view === 'lesson';

  return (
    <>
      <main className="cat-main">
        {view === 'home' && (
          <HomeView
            notes={ALL_NOTES}
            mcqs={MCQ_QUESTIONS}
            workedExams={WORKED_EXAM_QUESTIONS}
            progress={progress}
            onStartSession={() => {
              setSessionTopic('all');
              go('session');
            }}
            onOpenTopic={(t) => {
              setActiveTopic(t);
              setTopicConfetti(false);
              go('topic');
            }}
            onOpenWorked={(t) => {
              setExamTopic(t);
              setExamFocusId(null);
              go('exam');
            }}
            onToggleTheme={() =>
              setProgress((p) => ({ ...p, theme: p.theme === 'dark' ? 'light' : 'dark' }))
            }
            onChangeExamDate={(d) => setProgress((p) => ({ ...p, examDate: d }))}
            onResetProgress={() => setProgress(createInitialProgress())}
          />
        )}

        {view === 'topic' && (
          <TopicView
            topicId={activeTopic}
            notes={ALL_NOTES}
            mcqs={MCQ_QUESTIONS}
            workedExams={WORKED_EXAM_QUESTIONS}
            progress={progress}
            showConfetti={topicConfetti}
            onBack={() => go('home')}
            onOpenLesson={(noteId) => {
              setActiveLessonId(noteId);
              go('lesson');
            }}
            onPractiseTopic={(t) => {
              setSessionTopic(t);
              go('session');
            }}
            onOpenTopicExams={(t) => {
              setExamTopic(t);
              setExamFocusId(null);
              go('exam');
            }}
          />
        )}

        {view === 'lesson' && (
          <LessonView
            key={currentLesson.id}
            note={currentLesson}
            lessonNumber={lessonNumber}
            onExit={() => {
              setTopicConfetti(false);
              go('topic');
            }}
            onFinish={handleFinishLesson}
          />
        )}

        {view === 'session' && (
          <DailySessionView
            notes={ALL_NOTES}
            mcqs={MCQ_QUESTIONS}
            progress={progress}
            topicFilter={sessionTopic}
            onRateFlashcard={handleRateFlashcard}
            onAnswerMcq={handleAnswerMcq}
            onCompleteBonus={() =>
              setProgress((p) => ({ ...p, xp: p.xp + 20 }))
            }
            onExit={() => go('home')}
          />
        )}

        {view === 'exam' && (
          <ExamQuestionsView
            questions={WORKED_EXAM_QUESTIONS}
            progress={progress}
            selectedTopic={examTopic}
            initialQuestionId={examFocusId}
            onSelectTopic={(t) => {
              setExamTopic(t);
              setExamFocusId(null);
            }}
            onUpdateDraft={handleUpdateDraft}
            onToggleChecklistItem={handleToggleChecklistItem}
          />
        )}

        {view === 'guide' && <ExamGuideView />}

        {view === 'find' && (
          <SearchView
            notes={ALL_NOTES}
            workedExams={WORKED_EXAM_QUESTIONS}
            onOpenLesson={(topicId, noteId) => {
              setActiveTopic(topicId);
              setActiveLessonId(noteId);
              go('lesson');
            }}
            onOpenExamQuestion={(topicId, qId) => {
              setExamTopic(topicId);
              setExamFocusId(qId);
              go('exam');
            }}
          />
        )}
      </main>

      {!isFullscreen && (
        <BottomNav
          activeView={view}
          onNavigate={(tab) => {
            if (tab === 'exam') setExamFocusId(null);
            setTopicConfetti(false);
            go(tab);
          }}
        />
      )}
    </>
  );
};

export default App;
