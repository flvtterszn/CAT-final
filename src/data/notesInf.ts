import { StudyNote } from '../types/cat';

export const NOTES_INF: StudyNote[] = [
  {
    id: 'inf-dikw-cycle',
    topic: 'inf',
    subtopic: 'Information & Problem-Solving Cycle',
    title: 'DIKW Hierarchy & The 5-Step Information Management Cycle',
    sagsRef: 'SAGS · Information Management · Problem Solving & PAT Theory',
    summary:
      'Information management converts raw data into actionable decisions through a disciplined five-step research and processing cycle.',
    recallPoints: [
      'DIKW Hierarchy: Data (raw, unprocessed facts/figures with no meaning on their own, e.g. `42, 78, 55`) → Information (processed, organised, contextualised data with meaning, e.g. class average = 58.3%) → Knowledge (understanding patterns/rules gained through experience) → Wisdom (sound, ethical judgement and long-term decision-making).',
      '5 Steps of Information Management (Research & PAT): Step 1: Define the Task (identify problem, purpose, focus question, audience) → Step 2: Gather Information (primary & secondary sources: websites, books, interviews, questionnaires) → Step 3: Process Information (sift, verify, sort, filter, calculate, chart in Excel/Access) → Step 4: Present Information (clear reports, tables, graphs, websites) → Step 5: Evaluate (check accuracy, reliability, completeness, effectiveness).',
      'Primary vs Secondary Sources: Primary sources capture new first-hand data (your own survey, interview, direct observation); Secondary sources analyse existing published material (books, articles, verified websites).',
      'Sifting: Filtering gathered material to keep ONLY information relevant to the focus question and criteria, discarding off-topic or unreliable noise.',
    ],
    comprehensionPoints: [
      'GIGO (Garbage In, Garbage Out) links directly to Step 2 and Step 3: if survey questions are biased or raw figures contain typos, even flawless Excel formulas or Access queries will output misleading decisions.',
      'Step 1 (Define the Task) prevents wasted research: writing a crisp focus question and identifying sub-questions ensures every source gathered in Step 2 actually answers the problem.',
    ],
    synthesisAndApplication: [
      'Scenario: A school wants to reduce cafeteria queue delays → structure a 5-step investigation: (1) Define focus question & peak times; (2) Gather POS till logs + learner survey; (3) Process wait times in Excel/Access; (4) Present graphs & recommendations in a formal report; (5) Evaluate whether proposed solutions fit budget & constraints.',
      'Explain why "78" on its own is Data, "78% in CAT Term 3" is Information, and "Students who complete trace-table practice improve Paper 2 marks by 14%, so we should schedule weekly drills" represents Knowledge/Wisdom.',
    ],
    examTips: [
      'In Paper 2 Question 5, clearly distinguish Data (unprocessed) vs Information (processed, organised, meaningful) vs Knowledge (applied insight/experience).',
      'Know both the 5 Information Management steps AND why Sifting matters (reduces information overload and improves relevance).',
    ],
    diagramId: 'dikw-pyramid',
    flashcardFront: 'List the 5 steps of the Information Management cycle in order.',
    flashcardBack:
      '1) Define the Task, 2) Gather Information, 3) Process Information (sift, organise, analyse), 4) Present Information, and 5) Evaluate completeness and effectiveness.',
  },
  {
    id: 'inf-sources-evaluation',
    topic: 'inf',
    subtopic: 'Evaluating Sources & Questioning',
    title: 'Evaluating Information Sources, Websites & Question Types',
    sagsRef: 'SAGS · Information Management · Source Evaluation & Questioning',
    summary:
      'Reliable research requires evaluating sources across five strict criteria and matching question levels from factual recall to evaluative judgement.',
    recallPoints: [
      'Five Core Evaluation Criteria: 1) Authority (who is the author/publisher and what are their credentials?), 2) Accuracy (are facts verifiable against other sources, error-free, with cited evidence?), 3) Currency (when was it published/updated — vital for fast-changing tech?), 4) Objectivity (is it balanced and free of bias, commercial sponsorship, or propaganda?), 5) Coverage (does it cover the topic deeply enough for the target audience?).',
      'Additional Website Checks: Affiliation (domain e.g. `.gov.za`, `.ac.za`, `.org` vs random blog), Target Audience (academic vs kids), Content & Design (working links, professional layout, clear citations, secure HTTPS).',
      'Four Question Levels: 1) Factual ("What?", "When?", "How many?" — single verifiable fact), 2) Exploratory ("Why?", "How?" — explains causes/mechanisms), 3) Predictive ("What if…?" — forecasts outcomes under change), 4) Evaluative ("Would it be better if…?", "Which should we recommend?" — weighs pros/cons to judge).',
    ],
    comprehensionPoints: [
      'A sleek, expensive-looking website does NOT guarantee Accuracy or Objectivity: a hardware vendor’s glossy blog praising its own SSD has strong design but fails Objectivity due to commercial bias.',
      'Currency matters more for ICT topics (e.g. 5G tariffs, POPIA amendments, AI risks) than for historical dates: a 2014 article on broadband pricing fails Currency.',
      'Higher-order research relies on Exploratory, Predictive, and Evaluative questions rather than just Factual questions.',
    ],
    synthesisAndApplication: [
      'Scenario: You find an anonymous blog post from 2017 claiming "SSDs fail after 6 months" with three broken links and banner ads for HDDs → critique it systematically using Authority (anonymous), Currency (2017 — outdated), Objectivity (HDD ad bias), and Accuracy (unverified, broken links).',
      'Rewrite a weak closed/factual research question ("What is cloud storage?") into an Evaluative question ("To what extent would migrating to cloud storage improve collaboration and cost efficiency for a 20-person accounting firm despite South African load-shedding?").',
    ],
    examTips: [
      'When asked for 4 criteria to judge a website, use the exact SAGS terms: Authority, Accuracy, Currency, Objectivity, Coverage (never just write "looks neat" or "no spelling mistakes" without linking to Accuracy/Design).',
    ],
    comparison: {
      title: 'The Four Question Levels',
      headers: ['Level', 'Starter Words', 'Cognitive Depth', 'Example'],
      rows: [
        ['Factual', 'What, When, Who, How many', 'Lower (Recall)', 'What is the maximum cable length of Cat6 UTP?'],
        ['Exploratory', 'Why, How', 'Middle (Comprehension)', 'Why is fibre optic immune to electromagnetic interference?'],
        ['Predictive', 'What if, How might', 'Higher (Forecasting)', 'What if a school drops its firewall on the guest WLAN?'],
        ['Evaluative', 'Recommend, Judge, Would it be better', 'Higher (Synthesis)', 'Which broadband option best suits the clinic’s budget and VoIP needs?'],
      ],
    },
    flashcardFront: 'Name the five SAGS criteria used to evaluate the reliability of an information source.',
    flashcardBack:
      'Authority (author/organisation credentials), Accuracy (verifiable & cited facts), Currency (recent/updated date), Objectivity (unbiased, not sponsored), and Coverage (sufficient depth for purpose).',
  },
  {
    id: 'inf-surveys-reports-tools',
    topic: 'inf',
    subtopic: 'Surveys, Reports & Analysis Tools',
    title: 'Questionnaire Design, Open vs Closed Questions, Spreadsheets vs Databases & Reports',
    sagsRef: 'SAGS · Information Management · Surveys, Tools & Formal Reports',
    summary:
      'Clean primary data starts with unbiased questionnaire design, flows into spreadsheets or databases for processing, and finishes in a structured, referenced formal report.',
    recallPoints: [
      'Closed vs Open Questions: Closed questions (Yes/No, MCQ, Likert scale) offer fixed options — quick to answer and easy to graph/quantify in Excel, but limit detail. Open questions invite free-text opinions — reveal rich motivations/ideas, but are slow and hard to tabulate.',
      '7 Guidelines for Questionnaire Design: 1) Clear, unambiguous wording; 2) Relevant only to the task; 3) Avoid bias / leading questions ("What is your opinion on CAT?" not "Don’t you agree CAT is best?"); 4) Keep it short/concise; 5) Logical order (easy demographic/general first, sensitive/complex later); 6) Respect privacy (POPIA — no unnecessary ID numbers/addresses); 7) Include clear completion instructions.',
      'Spreadsheet (Excel) vs Database (Access) in Problem Solving: Excel excels at smaller numerical datasets, formulas/what-if financial modelling, and charts. Access excels at large structured record datasets, multi-table relationships, rapid querying/filtering, reducing duplication, and printable reports.',
      'Formal Report Sections (Exact Order): 1) Cover/Title Page, 2) Table of Contents, 3) Introduction (purpose & background), 4) Body/Main Content (headings, research findings, analysis), 5) Conclusion (summarises key findings), 6) Recommendations (actionable next steps), 7) Bibliography/References (prevents plagiarism, credits authors), 8) Appendices (raw questionnaires, extra tables, screenshots).',
      'Summarising vs Plagiarism: Summarising extracts core meaning in your OWN words, dropping minor examples; copying text without citation is plagiarism and violates copyright.',
    ],
    comprehensionPoints: [
      'An electronic survey (Google Forms / Microsoft Forms) exports directly to CSV/Excel, avoiding manual transcription errors (data verification failures) and saving hours of capturing.',
      'When asked to recommend options against user needs ("Requirements and Recommendations"), always list the user’s constraints first (purpose, budget, number of users, mobility), compare candidates against those constraints, and justify the winning choice.',
    ],
    synthesisAndApplication: [
      'Fix a flawed survey item in an exam: "Enter your full ID number and explain why terrible school Wi-Fi ruins your grades?" → identify 3 flaws: violates privacy (unnecessary ID number), biased/leading wording ("terrible... ruins"), and open-ended where a Likert scale + closed cause list would yield cleaner graphs.',
      'Decide between Excel and Access for a national sports club managing 12 000 members, coaches, and fixture payments → recommend Access (large relational dataset, queries, forms, less duplication) rather than one giant flat spreadsheet.',
    ],
    examTips: [
      'When evaluating a survey question in Paper 2, look immediately for: double-barrelled questions (asking two things at once), leading/biased phrasing, missing "Other / N/A" options, overlapping numeric ranges (e.g., 10–20 and 20–30), and unnecessary personal data (POPIA).',
    ],
    comparison: {
      title: 'Spreadsheet (Excel) vs Database (Access) for Problem Solving',
      headers: ['Dimension', 'Spreadsheet (Excel)', 'Database (Access)'],
      rows: [
        ['Primary strength', 'Calculations, financial models & charts', 'Large structured records, relations & queries'],
        ['Dataset scale', 'Smaller / tabular numerical sheets', 'Large multi-table datasets (thousands of rows)'],
        ['Core structure', 'Formula-based cells (rows × columns)', 'Record-based tables linked via PK/FK'],
        ['Duplication risk', 'Higher in flat tables', 'Minimised via related tables & Lookup Wizard'],
      ],
    },
    flashcardFront: 'Why are closed questions preferred for large quantitative surveys, and what is their main limitation?',
    flashcardBack:
      'Closed questions (MCQ, Yes/No, rating scales) are fast for respondents to complete and easy to tally, filter, and graph automatically in Excel/Access; however, they restrict depth and cannot explain unexpected reasons.',
  },
  {
    id: 'inf-algorithms-trace',
    topic: 'inf',
    subtopic: 'Algorithms & Trace Tables',
    title: 'Algorithms, Pseudocode Control Structures & Trace Tables',
    sagsRef: 'SAGS · Information Management · Problem Solving & Algorithms',
    summary:
      'Paper 2 Question 5 tests algorithmic thinking using IPO identification, selection/loop pseudocode, and line-by-line trace tables.',
    recallPoints: [
      'Algorithm: A finite, unambiguous, step-by-step sequence of instructions in logical order designed to solve a problem.',
      'Three Core Control Structures: 1) Sequence (steps executed top-to-bottom), 2) Selection (`IF condition THEN ... ELSE ... ENDIF` branching), 3) Repetition / Iteration (`FOR` counted loop, `WHILE` pre-test loop, `REPEAT...UNTIL` post-test loop).',
      'Key Algorithm Patterns: Initialisation (setting `total = 0`, `count = 0` BEFORE a loop), Counter (`count = count + 1`), Accumulator (`total = total + value`), Sentinel value (special input like `-1` or `"STOP"` that ends a loop), Validation loop (repeating input prompt until valid).',
      'Trace Table: A structured grid with one column per variable, an optional condition/line column, and an Output column used to dry-run pseudocode line by line and verify output or spot logic bugs.',
    ],
    comprehensionPoints: [
      'Forgetting to initialise `total = 0` or resetting `total = 0` INSIDE a loop is a classic logic error: resetting inside the loop wipes previous values on every iteration.',
      'Boundary operators (`>` vs `>=`) decide off-by-one marks in trace tables: if pass mark is 50, `mark > 50` wrongly fails someone who scored exactly 50; `mark >= 50` is required.',
      'Dividing by `count` when `count` could be `0` causes a division-by-zero runtime error—guard averages with `IF count > 0 THEN`.',
    ],
    synthesisAndApplication: [
      'Given pseudocode with inputs `40, 65, 50, 85`, step through every row of a trace table updating `mark`, `count`, `total`, and `output` only when each variable changes, then state the algorithm’s purpose in plain English (e.g., "Calculates the class average of all 4 marks and counts how many learners passed with ≥ 50").',
      'Spot why a loop runs forever (infinite loop): e.g., a `WHILE` loop checks `mark <> -1` but forgets to read the next `mark` inside the loop body.',
    ],
    examTips: [
      'Never calculate in your head on a Paper 2 trace table! Draw every variable column, write initial values (`0`), and trace every single iteration row by row.',
      'When asked "State the purpose of this algorithm", do NOT repeat the code line-by-line—summarise the real-world outcome (e.g., "Finds the highest temperature and counts days above 30 °C").',
    ],
    diagramId: 'trace-table',
    flashcardFront: 'What is the purpose of a trace table, and what columns must it contain?',
    flashcardBack:
      'A trace table dry-runs an algorithm step-by-step to determine its output and locate logic errors. It contains one column for every variable, any key condition check, and an Output column.',
  },
];
