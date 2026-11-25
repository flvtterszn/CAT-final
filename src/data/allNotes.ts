import { NOTES_SYS } from './notesSys';
import { NOTES_NET } from './notesNet';
import { NOTES_INF } from './notesInf';
import { NOTES_SOC } from './notesSoc';
import { NOTES_DEV } from './notesDev';
import { StudyNote } from '../types/cat';

export const ALL_NOTES: StudyNote[] = [
  ...NOTES_SYS,
  ...NOTES_NET,
  ...NOTES_INF,
  ...NOTES_SOC,
  ...NOTES_DEV,
];
