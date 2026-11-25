import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getChecklistTone,
  getExamPaceTone,
  getGoalTone,
  getMasteryTone,
  splitTermAndExplanation,
  tokenizeRichSegments,
} from './textHighlight';

test('splitTermAndExplanation separates Term from Definition without breaking URLs or ranges', () => {
  const res = splitTermAndExplanation(
    'BIOS / UEFI & POST: Firmware that runs immediately at power-on.'
  );
  assert.equal(res.term, 'BIOS / UEFI & POST');
  assert.equal(res.body, 'Firmware that runs immediately at power-on.');

  const url = splitTermAndExplanation('https://example.com is a secure website.');
  assert.equal(url.term, null);

  const range = splitTermAndExplanation('Use =SUM(B2:B10) to calculate totals.');
  assert.equal(range.term, null);
});

test('tokenizeRichSegments highlights numbers/units and technical terms distinctly', () => {
  const segs = tokenizeRichSegments(
    'A 3.2 GHz CPU with 16 GB RAM and 512 GB SSD costs R7 999 (30% off).'
  );
  const nums = segs.filter((s) => s.kind === 'number').map((s) => s.value);
  const terms = segs.filter((s) => s.kind === 'term').map((s) => s.value);

  assert.ok(nums.includes('3.2 GHz'));
  assert.ok(nums.includes('16 GB'));
  assert.ok(nums.includes('512 GB'));
  assert.ok(nums.includes('R7 999'));
  assert.ok(nums.includes('30%'));

  assert.ok(terms.includes('CPU'));
  assert.ok(terms.includes('RAM'));
  assert.ok(terms.includes('SSD'));
});

test('tokenizeRichSegments highlights Excel formulas and HTML tags as terms', () => {
  const segs = tokenizeRichSegments(
    'Write =IF(B2>=50,"Pass","Fail") in Excel or <a href="#"> in HTML.'
  );
  const terms = segs.filter((s) => s.kind === 'term').map((s) => s.value);
  assert.ok(terms.includes('=IF(B2>=50,"Pass","Fail")'));
  assert.ok(terms.includes('<a href="#">'));
  assert.ok(terms.includes('HTML'));
});

test('Conditional highlight tones map mastery, goal, pace, and checklists accurately', () => {
  assert.equal(getMasteryTone(10), 'low');
  assert.equal(getMasteryTone(50), 'mid');
  assert.equal(getMasteryTone(80), 'high');

  assert.equal(getGoalTone(0), 'low');
  assert.equal(getGoalTone(4), 'mid');
  assert.equal(getGoalTone(10), 'high');

  // 4 marks -> 288s budget
  assert.equal(getExamPaceTone(120, 4), 'ok');
  assert.equal(getExamPaceTone(320, 4), 'warn');
  assert.equal(getExamPaceTone(450, 4), 'over');

  assert.equal(getChecklistTone(0, 4), 'low');
  assert.equal(getChecklistTone(2, 4), 'mid');
  assert.equal(getChecklistTone(4, 4), 'high');
});
