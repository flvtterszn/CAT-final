import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildDailySession,
  calculateExamReadiness,
  calculateTopicMastery,
  createInitialProgress,
  filterAndRankWorkedExams,
  filterStudyNotes,
  recordDailyActivity,
  scheduleFlashcard,
} from './studyEngine';
import { ALL_NOTES } from '../data/allNotes';
import { MCQ_QUESTIONS } from '../data/questionsMcq';
import { WORKED_EXAM_QUESTIONS } from '../data/workedExams';
import { TOPICS } from '../data/topics';
import { ExamTopicId } from '../types/cat';

test('SAGS curriculum coverage: all 5 strands have deep notes and MCQs', () => {
  for (const topic of TOPICS) {
    const notes = ALL_NOTES.filter((n) => n.topic === topic.id);
    const mcqs = MCQ_QUESTIONS.filter((q) => q.topic === topic.id);
    assert.ok(notes.length >= 4, `Expected >= 4 comprehensive note modules for ${topic.id}`);
    assert.ok(mcqs.length >= 8, `Expected >= 8 MCQs for ${topic.id}`);
  }
  const totalMarks = TOPICS.reduce((s, t) => s + t.paperMarks, 0);
  assert.equal(totalMarks, 150, 'IEB CAT Paper 2 total marks must equal 150');
});

test('SAGS strictness: no excluded PowerPoint/1NF-3NF theory taught as examinable', () => {
  for (const note of ALL_NOTES) {
    const combined = [
      note.title,
      note.summary,
      ...note.recallPoints,
      ...note.comprehensionPoints,
    ].join(' ');
    assert.equal(
      /powerpoint\s+transitions|first normal form|second normal form|third normal form/i.test(combined),
      false,
      `Note ${note.id} should not teach excluded PowerPoint or 1NF-3NF topics`
    );
  }
});

test('Every topic (including Integrated Scenarios) has worked exam questions ranked Easy -> Medium -> Hard', () => {
  const allExamTopics: ExamTopicId[] = ['sys', 'net', 'inf', 'soc', 'dev', 'scn'];
  for (const topic of allExamTopics) {
    const easy = WORKED_EXAM_QUESTIONS.filter((w) => w.topic === topic && w.difficulty === 'easy');
    const med = WORKED_EXAM_QUESTIONS.filter((w) => w.topic === topic && w.difficulty === 'medium');
    const hard = WORKED_EXAM_QUESTIONS.filter((w) => w.topic === topic && w.difficulty === 'hard');
    assert.ok(easy.length >= 2, `${topic} must have >= 2 easy worked exam questions`);
    assert.ok(med.length >= 2, `${topic} must have >= 2 medium worked exam questions`);
    assert.ok(hard.length >= 2, `${topic} must have >= 2 hard worked exam questions`);

    const ranked = filterAndRankWorkedExams(WORKED_EXAM_QUESTIONS, topic, 'all');
    assert.equal(ranked[0].difficulty, 'easy');
    assert.equal(ranked[ranked.length - 1].difficulty, 'hard');
  }
});

test('Spaced repetition scheduleFlashcard advances boxes and resets on miss', () => {
  const day = 20000;
  const hit = scheduleFlashcard(1, 2, day);
  assert.equal(hit.box, 3);
  assert.equal(hit.nextDueDay, day + 4);

  const missed = scheduleFlashcard(4, 0, day);
  assert.equal(missed.box, 0);
  assert.equal(missed.nextDueDay, day);
});

test('Topic mastery and weighted Paper 2 readiness update accurately', () => {
  const p = createInitialProgress(20000);
  assert.equal(calculateExamReadiness(ALL_NOTES, MCQ_QUESTIONS, WORKED_EXAM_QUESTIONS, p), 0);

  for (const n of ALL_NOTES.filter((x) => x.topic === 'sys')) {
    p.studiedNotes[n.id] = true;
  }
  for (const q of MCQ_QUESTIONS.filter((x) => x.topic === 'sys')) {
    p.mcqResults[q.id] = 1;
  }
  for (const w of WORKED_EXAM_QUESTIONS.filter((x) => x.topic === 'sys')) {
    p.examChecklist[w.id] = w.checklist.map(() => true);
  }

  const sysMastery = calculateTopicMastery('sys', ALL_NOTES, MCQ_QUESTIONS, WORKED_EXAM_QUESTIONS, p);
  assert.equal(sysMastery, 100);

  const readiness = calculateExamReadiness(ALL_NOTES, MCQ_QUESTIONS, WORKED_EXAM_QUESTIONS, p);
  // sys carries 60 of 150 marks -> 40%
  assert.equal(readiness, 40);
});

test('Daily activity increments streak and goal count cleanly', () => {
  let p = createInitialProgress(100);
  p = recordDailyActivity(p, 10, 100);
  assert.equal(p.dailyGoal.count, 1);
  assert.equal(p.streak, 1);
  assert.equal(p.xp, 10);

  p = recordDailyActivity(p, 15, 101);
  assert.equal(p.dailyGoal.count, 1);
  assert.equal(p.streak, 2);
  assert.equal(p.xp, 25);
});

test('Search filtering and daily session builder return expected items', () => {
  const popiaNotes = filterStudyNotes(ALL_NOTES, 'all', 'POPIA');
  assert.ok(popiaNotes.length >= 1);

  const p = createInitialProgress(20000);
  const session = buildDailySession(ALL_NOTES, MCQ_QUESTIONS, p, 'all', 10, 20000);
  assert.equal(session.length, 10);
});
