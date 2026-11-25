import { TopicMeta } from '../types/cat';

export const TOPICS: TopicMeta[] = [
  {
    id: 'sys',
    name: 'System Technologies',
    shortName: 'System Tech',
    paperMarks: 60,
    paperSection: 'Questions 1–3 & 8–9',
    description:
      'Hardware architecture, processing, memory, storage, ports, assistive devices, OS mechanics, licensing, file management, and troubleshooting.',
    accentHex: '#2563EB',
  },
  {
    id: 'net',
    name: 'Internet & Network Technologies',
    shortName: 'Networks & Web',
    paperMarks: 30,
    paperSection: 'Questions 1–2, 4 & 8–9',
    description:
      'Network scopes, topologies, cabling, hardware, ISP broadband criteria, protocols, web technologies, cloud computing, IoT, and e-communication.',
    accentHex: '#0284C7',
  },
  {
    id: 'inf',
    name: 'Information Management',
    shortName: 'Info Management',
    paperMarks: 15,
    paperSection: 'Question 5 & PAT Theory',
    description:
      'DIKW hierarchy, 5-step problem-solving cycle, source evaluation, question types, questionnaire design, formal reports, and algorithm trace tables.',
    accentHex: '#059669',
  },
  {
    id: 'soc',
    name: 'Social Implications',
    shortName: 'Social & Ethics',
    paperMarks: 15,
    paperSection: 'Questions 6 & 8–9',
    description:
      'Green computing, ergonomics, digital divide, POPIA & copyright, BYOD/AUP, malware & cybercrime, data safeguards, and 4IR/5IR emerging technologies.',
    accentHex: '#D97706',
  },
  {
    id: 'dev',
    name: 'Solution Development',
    shortName: 'Solution Dev',
    paperMarks: 30,
    paperSection: 'Questions 1–2, 7 & 8–9',
    description:
      'Theoretical concepts behind Word processing, Excel formulas & charts, Access relational tables/queries/forms/reports, and HTML/CSS debugging.',
    accentHex: '#7C3AED',
  },
];

export const EXAM_TOPIC_LABELS: Record<string, string> = {
  sys: 'System Technologies',
  net: 'Internet & Network Technologies',
  inf: 'Information Management',
  soc: 'Social Implications',
  dev: 'Solution Development',
  scn: 'Integrated Scenarios (Q8–Q9)',
};

export const PAPER2_STRUCTURE = [
  { question: 'Questions 1–2', focus: 'Short objective questions across all SAGS topics (MCQ, matching, true/false)', marks: '±25' },
  { question: 'Question 3', focus: 'System Technologies (hardware specs, OS, storage, troubleshooting)', marks: '±25' },
  { question: 'Question 4', focus: 'Internet & Network Technologies (topologies, ISP, protocols, cloud)', marks: '±15' },
  { question: 'Question 5', focus: 'Information Management (IPO, source evaluation, surveys, trace tables)', marks: '±10' },
  { question: 'Question 6', focus: 'Social Implications (POPIA, security, ergonomics, green computing, 4IR)', marks: '±10' },
  { question: 'Question 7', focus: 'Solution Development Theory (Word, Excel functions, Access design, HTML)', marks: '±15' },
  { question: 'Questions 8–9', focus: 'Integrated Scenario (complex real-world synthesis across all 5 topics)', marks: '±50' },
];

export const COGNITIVE_LEVELS_GUIDE = [
  {
    tier: 'Lower Order · Recall (30%)',
    marks: '45 / 150 marks',
    commandWords: 'Define, Name, List, Identify, State, Give the term, True/False, Multiple Choice',
    strategy: 'Give exact, concise SAGS terminology. Do not write long paragraphs for 1-mark recall prompts.',
  },
  {
    tier: 'Middle Order · Comprehension & Application (40%)',
    marks: '60 / 150 marks',
    commandWords: 'Explain, Describe, Distinguish/Compare, Discuss, Give examples, Trace, Write formula',
    strategy: 'Match the mark allocation: 2 marks require two distinct points or a concept + clear reason/consequence.',
  },
  {
    tier: 'Higher Order · Analysis, Evaluation & Synthesis (30%)',
    marks: '45 / 150 marks',
    commandWords: 'Evaluate, Recommend & Justify, Argue, Propose solutions, Predict, How could you tell…?',
    strategy: 'Always anchor every recommendation to explicit facts in the scenario (budget, users, environment, specs, POPIA/security constraints).',
  },
];

export const SAGS_EXCLUSIONS = [
  {
    item: 'Presentation Software (PowerPoint)',
    status: 'PAT Only — Excluded from Paper 1 & Paper 2',
    detail: 'Per the IEB CAT SAGS, slide design and presentation tools are assessed exclusively in the PAT and are not examined in Paper 2.',
  },
  {
    item: 'Database Normalisation (1NF, 2NF, 3NF) & Raw SQL Syntax',
    status: 'Excluded from Paper 2 Theory',
    detail: 'Formal 1NF–3NF decomposition and writing SQL statements are outside IEB CAT Paper 2 scope; focus on PK/FK links, referential integrity, field properties, and QBE queries.',
  },
  {
    item: 'Computer Science / IT Programming (OOP, Binary Arithmetic, OSI 7-Layer Bitfields)',
    status: 'Out of Scope (IT Subject)',
    detail: 'CAT Paper 2 tests pseudocode/trace tables (IPO, selection, loops) and end-user computing synthesis, not OOP classes or binary math.',
  },
  {
    item: 'Grade 10 & Grade 11 Foundational Theory',
    status: 'Examinable in Grade 12',
    detail: 'The IEB SAGS specifies that Grade 10 and 11 theory (hardware basics, file extensions, topologies, email netiquette, basic Word/Excel/Access) remains examinable in Matric.',
  },
];
