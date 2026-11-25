import { StudyNote } from '../types/cat';

export const NOTES_DEV: StudyNote[] = [
  {
    id: 'dev-word-processing',
    topic: 'dev',
    subtopic: 'Word Processing Theory',
    title: 'Styles, Section Breaks, Pagination, Mail Merge, Forms & Referencing',
    sagsRef: 'SAGS · Solution Development · Word Processing Concepts',
    summary:
      'Paper 2 tests WHY and WHEN to use advanced Word tools—especially Styles, Section Breaks, Mail Merge, Track Changes, and Academic Referencing.',
    recallPoints: [
      'Styles: Named, reusable formatting presets (Heading 1, Normal) that guarantee consistent typography across long documents, allow instant global style edits, and are REQUIRED to generate an automatic Table of Contents (TOC).',
      'Page Break vs Section Break: A Page Break simply pushes text onto the next page. A Section Break divides a document into independent layout zones so one section can use Landscape orientation, multiple columns, or different headers/footers/page numbering (e.g., Roman numerals i, ii before Arabic 1, 2).',
      'Pagination Control: Widow/Orphan control prevents a single line of a paragraph sitting alone at the top/bottom of a page; Keep with next keeps a heading attached to the paragraph below it.',
      'Mail Merge: Joins two files—a Main Document (template letter/certificate containing merge fields like `<<FirstName>>`) and a Data Source (Excel sheet/Access table/Word table)—to generate personalised copies automatically.',
      'Review & Referencing Tools: Track Changes & Comments (collaborative editing audit trail), Electronic Forms (restricted legacy/content controls like drop-downs and checkboxes), Footnotes (bottom of page) vs Endnotes (end of section/document), Captions & Table of Figures, Automatic Bibliography (cites sources, stops plagiarism), Index (alphabetical back-of-book topic locator), Watermark (faded background text/logo e.g. CONFIDENTIAL).',
    ],
    comprehensionPoints: [
      'Students often manually bold and enlarge headings instead of applying Heading Styles—when asked why the auto Table of Contents says "No table of contents entries found", the reason is that Heading Styles were not applied.',
      'Without a Section Break (Next Page) between the front matter and body, changing page orientation to Landscape for one wide spreadsheet table rotates the entire document.',
    ],
    synthesisAndApplication: [
      'Scenario: A school must send 450 personalised fee statements showing each parent’s name, learner grade, and amount due → recommend Mail Merge using the Word statement template + Excel fee register as data source, explaining time saved and typo elimination.',
      'Scenario: A 40-page PAT report has a single wide chart on page 18 that only fits in Landscape, and pages i–iii must use Roman numerals → explain placing Next Page Section Breaks before and after page 18 and unlinking "Link to Previous" in headers/footers.',
    ],
    examTips: [
      'In Mail Merge questions, always name BOTH input components ("Main Document with merge fields" + "Data Source") for full marks.',
      'Remember the difference between Bibliography (list of cited sources, prevents plagiarism) and Index (alphabetical list of keywords + page numbers at the back).',
    ],
    diagramId: 'mail-merge',
    flashcardFront: 'Why must Heading Styles be used instead of manual bold/font-size formatting in a long report?',
    flashcardBack:
      'Styles ensure consistent formatting, let you update all headings globally in one click, enable Navigation Pane jumping, and are required for Word to build and update an automatic Table of Contents.',
  },
  {
    id: 'dev-spreadsheets',
    topic: 'dev',
    subtopic: 'Spreadsheets Theory',
    title: 'Referencing ($A$1), Grade 12 Functions, Charts, Validation & Error Codes',
    sagsRef: 'SAGS · Solution Development · Spreadsheet Concepts',
    summary:
      'Exam questions evaluate choosing the right Excel reference type, writing or debugging IF/Nested IF/COUNTIF/SUMIF/VLOOKUP formulas, selecting charts, and fixing errors.',
    recallPoints: [
      'Cell Referencing: Relative (`A1` — shifts automatically when copied/autofilled), Absolute (`$A$1` — locked row and column via F4, essential for fixed rates like VAT in one cell), Mixed (`$A1` locks column; `A$1` locks row).',
      'Core & Statistical Functions: `SUM`, `AVERAGE`, `MIN`, `MAX`, `LARGE(range, k)` (k-th largest e.g. 2nd highest), `SMALL(range, k)`, `MEDIAN`, `MODE`, `COUNT` (numbers only), `COUNTA` (all non-empty cells), `COUNTBLANK`, `ROUND` / `ROUNDUP` / `ROUNDDOWN`, `INT`, `RANDBETWEEN`, `TODAY()`, `NOW()`.',
      'Text Functions: `LEN` (length), `LEFT(cell, n)`, `RIGHT(cell, n)`, `MID(cell, start, n)`, `FIND`, `UPPER`/`LOWER`, `CONCATENATE`/`&`.',
      'Logical & Conditional Functions: `IF(test, true_val, false_val)`, Nested `IF` (testing 3+ outcomes sequentially), `AND`/`OR`, `COUNTIF(range, criteria)`, `COUNTIFS`, `SUMIF(range, criteria, sum_range)`, `SUMIFS`.',
      'Lookup & Analysis Tools: `VLOOKUP(lookup_val, table_array, col_index, FALSE/TRUE)` (`FALSE` = exact match; `TRUE` = approximate sorted brackets; `HLOOKUP` searches rows), Named Ranges, Conditional Formatting (auto-highlights cells meeting a rule), Data Validation (dropdowns/number limits blocking invalid entry), Subtotals, PivotTables.',
      'Common Formula Errors: `#DIV/0!` (dividing by zero/blank), `#VALUE!` (wrong data type e.g. adding text), `#NAME?` (misspelled function name or missing quotes around text), `#REF!` (deleted referenced cell), `#N/A` (lookup value not found), `###` (column too narrow for number/date).',
      'Charts: Column/Bar (compare categories), Line (show continuous trends over time), Pie (show parts/proportions of a single 100% whole), Scatter (correlation between two numeric variables). Always include descriptive title, axis labels with units, and legend.',
    ],
    comprehensionPoints: [
      'Notice the critical exam trap between `COUNT` and `COUNTA`: if column A holds Learner Names (`"Thabo"`, `"Anika"`) and you write `=COUNT(A2:A30)`, Excel returns `0` because `COUNT` ignores text—you MUST use `COUNTA`.',
      'In `VLOOKUP(..., col_index, FALSE)`, forgetting `FALSE` defaults to approximate match, returning wrong results on unsorted ID/product codes; and copying the lookup table reference without `$` shifts the table down row by row!',
    ],
    synthesisAndApplication: [
      'Trace & debug: `=IF(B2>=75,"Distinction",IF(B2>=50,"Pass","Fail"))` — explain why testing `>=75` MUST come before `>=50` (if `>=50` came first, a mark of 85 would stop at `"Pass"` and never reach `"Distinction"`!).',
      'Explain why `###` is NOT a formula calculation error and how to fix it (widen column width), versus `#NAME?` (fix misspelled function like `=AVARAGE()` or add double quotes around text criteria).',
    ],
    examTips: [
      'Whenever copying a formula down a column references a single Tax/Discount cell, write `$F$1` (absolute reference) and press `F4`.',
      'For Pie charts, state explicitly: "Shows parts of one whole (percentages adding to 100%)" — never pick a Pie chart to compare values across 5 years (use Line or Column).',
    ],
    comparison: {
      title: 'Excel Error Codes Decoder',
      headers: ['Error', 'Root Cause', 'How to Fix'],
      rows: [
        ['#DIV/0!', 'Formula divides by 0 or an empty cell', 'Check divisor cell or wrap with IF/IFERROR'],
        ['#NAME?', 'Typo in function name or unquoted text', 'Correct spelling e.g. AVERAGE; quote text'],
        ['#VALUE!', 'Incompatible type (e.g. text in math op)', 'Remove text from numeric range or use SUM()'],
        ['#REF!', 'Referenced row/column/sheet was deleted', 'Restore deleted cells or update formula range'],
        ['#N/A', 'VLOOKUP/HLOOKUP value not found in table', 'Check spelling, trailing spaces, or lookup range'],
        ['###', 'Column too narrow to display number/date', 'Double-click column border to auto-fit width'],
      ],
    },
    diagramId: 'excel-referencing',
    flashcardFront: 'What is the difference between COUNT and COUNTA, and why must VLOOKUP table ranges use absolute referencing?',
    flashcardBack:
      'COUNT counts only cells containing numbers, whereas COUNTA counts all non-empty cells (including text). A VLOOKUP table_array must be locked with $ (e.g. $F$2:$G$10) so it does not shift downward when autofilled.',
  },
  {
    id: 'dev-databases',
    topic: 'dev',
    subtopic: 'Databases Theory',
    title: 'Access Tables, Keys, Referential Integrity, Field Properties & Objects',
    sagsRef: 'SAGS · Solution Development · Database Concepts (SAGS Compliant)',
    summary:
      'Database theory focuses on structuring relational tables cleanly with primary/foreign keys, enforcing input accuracy via field properties, and querying/reporting data.',
    recallPoints: [
      'Tables, Records & Fields: A Table stores one entity type in rows (Records — one person/item) and columns (Fields — single attribute like Surname).',
      'Keys & Relationships: Primary Key (PK — uniquely identifies every record, e.g. LearnerID, never null/duplicate), Foreign Key (FK — field in a child table referencing the PK of a parent table to create a One-to-Many relationship). Referential Integrity prevents orphan records (cannot add a Loan for a MemberID that does not exist, nor delete a Member who still has active Loans).',
      'Data Types: Short Text (names, phone numbers with leading zeros like `082`!), Long Text, Number (quantities used in math), Currency (money `R49.99`), Date/Time, Yes/No (Boolean checkbox), AutoNumber (unique sequential ID), Hyperlink, Attachment.',
      'Field Properties: Field Size (limits text length/bytes, saves storage & prevents bloat), Format (display style only, e.g. Currency/uppercase), Input Mask (strict entry template e.g. `000-000-0000` or `LL000`), Default Value (auto-fills most common value e.g. `"South Africa"`), Validation Rule + Validation Text (blocks out-of-range/invalid values with a helpful message), Lookup Wizard (drop-down list reducing typos), Required (`Yes` prevents blank field).',
      'Four Database Objects: Tables (store raw structured data), Queries (search, filter, sort, calculate across linked tables), Forms (user-friendly single-record data entry interface), Reports (formatted, grouped, printable summaries with totals).',
    ],
    comprehensionPoints: [
      'Phone numbers and South African ID numbers MUST be stored as Short Text (not Number!): Number strips leading zeros (`082...` becomes `82...`) and cannot hold hyphens, and ID numbers exceed standard integer limits and are never added/averaged.',
      'Notice the strict IEB SAGS boundary: Paper 2 tests PK/FK links, Referential Integrity, Field Properties, and QBE Query logic—formal 1NF/2NF/3NF Normalisation and writing raw SQL code are NOT examined in IEB CAT Paper 2.',
    ],
    synthesisAndApplication: [
      'Scenario: A vet clinic has an Owners table and a Pets table; when deleting an Owner, staff accidentally leave Pets pointing to nobody → explain linking `OwnerID (PK)` in Owners to `OwnerID (FK)` in Pets in a One-to-Many relationship with Referential Integrity enabled.',
      'Recommend three Access field properties for a `Province` field and `DateJoined` field: Lookup Wizard drop-down for Province (prevents spelling errors like "Guateng"), Default Value `=Date()` for DateJoined, and Validation Rule `<=Date()` (cannot join in the future).',
    ],
    examTips: [
      'Always explain BOTH why a phone/ID field is Short Text ("preserves leading zero" + "not used in mathematical calculations").',
      'Distinguish Input Mask (controls character pattern/format like digits vs letters) from Validation Rule (checks logical value/range like `>=18` or `Between 0 And 100`).',
    ],
    comparison: {
      title: 'Access Field Properties: Format vs Input Mask vs Validation Rule',
      headers: ['Property', 'What It Controls', 'Example'],
      rows: [
        ['Format', 'How stored data is DISPLAYED only', 'Currency R 0.00; > (displays uppercase)'],
        ['Input Mask', 'Forces character-by-character typing pattern', '000-000-0000; LLL-000'],
        ['Validation Rule', 'Logical test data must pass before saving', '>=0 And <=100; "M" Or "F"'],
        ['Default Value', 'Auto-entered starting value on new records', '"Gauteng" or =Date()'],
        ['Lookup Wizard', 'Provides fixed drop-down selection list', 'List of 9 South African provinces'],
      ],
    },
    diagramId: 'db-pk-fk',
    flashcardFront: 'Why should a cell phone number field in Access use Short Text rather than Number, and which property enforces its pattern?',
    flashcardBack:
      'Number strips the leading zero (082 becomes 82) and phone numbers are never used in arithmetic. Use Short Text paired with an Input Mask (e.g. 000-000-0000) to enforce formatting.',
  },
  {
    id: 'dev-html-css-files',
    topic: 'dev',
    subtopic: 'HTML/CSS & File Management',
    title: 'HTML5 Structure, Tags, Common Exam Bugs, Basic CSS & File Management',
    sagsRef: 'SAGS · Solution Development · Web Design & File Management',
    summary:
      'HTML defines webpage structure via paired tags and attributes interpreted by browsers, styled with CSS, alongside disciplined file-management workflows.',
    recallPoints: [
      'Webpage Basics: HTML (HyperText Markup Language) is plain text interpreted by a web browser to render structure; CSS (Cascading Style Sheets) controls visual styling (colours, fonts, borders, alignment).',
      'Core Skeleton & Text Tags: `<!DOCTYPE html>`, `<html>`, `<head>` (`<title>` shown in browser tab), `<body>`, Headings `<h1>`–`<h6>` (`<h1>` largest), `<p>`, `<br />`, `<hr />`, `<b>`/`<strong>`, `<i>`/`<em>`, Lists `<ul>`/`<ol>` containing `<li>`.',
      'Links, Images & Tables: `<a href="https://...">Link text</a>` (external link, `mailto:...`, `#anchor`), `<img src="photo.jpg" alt="Description" width="300" />` (`alt` aids screen readers & shows if image fails), Tables (`<table>`, `<tr>` row, `<th>` bold header cell, `<td>` data cell, `colspan`, `rowspan`).',
      'CSS Methods: Inline (`<p style="color:blue;">`), Internal (`<style>` inside `<head>`), External (`<link rel="stylesheet" href="style.css">`).',
      'Common HTML Exam Mistakes: Missing closing tag (`</h1>` or `</table>`), unclosed/missing quotation marks around attributes, misspelled attribute names (`scr=` instead of `src=`, `hre=` instead of `href=`), overlapping/incorrectly nested tags (`<b><i>text</b></i>`), missing `alt` text on `<img>`.',
      'Keyboard Editing & File Management: `Esc` (cancel/exit menu/fullscreen), `Backspace` (deletes LEFT of cursor), `Delete` (deletes RIGHT of cursor or selected file); logical folder trees, descriptive filenames, compression (`.zip`), exporting/converting (`.docx` → `.pdf`).',
    ],
    comprehensionPoints: [
      'Why `<img src="pic.jpg">` fails in an exam folder: either the filename extension (`.png` vs `.jpg`), relative folder path (`images/pic.jpg`), or attribute spelling (`scr`) is wrong; always add `alt="..."` for accessibility (screen readers for visually impaired users) and broken-image fallback.',
      'External CSS is preferred over Inline CSS on multi-page websites because updating one stylesheet changes typography and colours across every page consistently.',
    ],
    synthesisAndApplication: [
      'Debug an exam HTML snippet: `<a hrf=page2.html>Next Page<a>` + `<img scr="logo.png">` → identify 4 syntax errors: `hrf` → `href`, missing quotes `"page2.html"`, missing `/` in closing `</a>`, and `scr` → `src` plus missing `alt="..."`.',
      'File management scenario: A learner emails a 45 MB folder of `.bmp` screenshots and `.docx` drafts → recommend converting `.bmp` to `.jpg`/`.png`, exporting final report to `.pdf` (preserves layout & read-only), and compressing remaining assets into a single `.zip` archive.',
    ],
    examTips: [
      'In Paper 2 HTML debugging questions, scan systematically for 4 classic traps: (1) missing `/ ` on closing tags, (2) missing `" "` quotes, (3) `src` vs `href` typos, and (4) `<th>` vs `<td>` or `colspan`/`rowspan`.',
    ],
    diagramId: 'html-structure',
    flashcardFront: 'Name four common HTML coding mistakes tested in Paper 2 debugging questions.',
    flashcardBack:
      '1) Missing or unclosed closing tags (e.g. <a> instead of </a>); 2) Missing quotation marks on attribute values; 3) Misspelled attributes (scr instead of src); 4) Incorrect tag nesting or missing alt attribute on <img>.',
  },
];
