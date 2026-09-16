import assert from 'node:assert/strict';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  generatePresetPractice,
  practiceGeometryHint,
  practiceWrongFeedback,
  resolveStartPreset,
  restorePracticePreset,
  scorePractice,
} from '../src/lib/keyboard-practice.ts';
import { labeledFullSegments, printCompactSegments, visibleMidiWindow } from '../src/lib/keyboard-viewport.ts';
import { asciiNote, lookupShareParams, resolveLookup } from '../src/lib/keyboard-resolution.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'checks/product-upgrade-2026-09-16/integration-fix');
mkdirSync(outDir, { recursive: true });

const master = JSON.parse(readFileSync(join(root, 'docs/content/site-master/page-content.master.json'), 'utf8'));
const layouts = master.pages['/keyboard-notes'].data.layouts;
const layout88 = layouts.find((item: { layout_id: string }) => item.layout_id === '88-key-A0-C8');
const layout61 = layouts.find((item: { layout_id: string }) => item.layout_id === '61-key-C2-C7');

const results: { name: string; passed: boolean; detail?: string }[] = [];
function test(name: string, fn: () => void) {
  try {
    fn();
    results.push({ name, passed: true });
  } catch (error) {
    results.push({ name, passed: false, detail: error instanceof Error ? error.message : String(error) });
  }
}

test('F01 shared option change creates custom black-key preset', () => {
  const incoming = restorePracticePreset(new URLSearchParams('practice=v1&practice-option=natural-c4-c5&practice-seed=20260916&practice-count=10'));
  assert.equal(incoming.status, 'valid');
  const kept = resolveStartPreset(incoming, 'natural-c4-c5');
  assert.equal(kept.fromShared, true);
  assert.equal(kept.preset.seed, 20260916);
  const custom = resolveStartPreset(incoming, 'black-c4-c5');
  assert.equal(custom.isCustom, true);
  assert.equal(custom.fromShared, false);
  assert.equal(custom.preset.option, 'black-c4-c5');
  const targets = generatePresetPractice(layout88, custom.preset);
  assert.equal(targets.length, 10);
  assert.ok(targets.every((target: { midi: number }) => layout88.keys.find((key: { midi: number; color: string }) => key.midi === target.midi)?.color === 'black'));
});

test('F01 v1 natural shared sequence remains stable', () => {
  const targets = generatePresetPractice(layout88, { version: 1, option: 'natural-c4-c5', seed: 20260916, count: 10 });
  assert.deepEqual(targets.map((item: { label: string }) => item.label), ['F4', 'A4', 'G4', 'D4', 'D4', 'A4', 'F4', 'B4', 'C4', 'A4']);
});

test('F02 black-key geometry hints', () => {
  const samples: Array<[string, number, string]> = [
    ['C♯4', 61, 'left black key in the pair'],
    ['D♭4', 61, 'left black key in the pair'],
    ['D♯4', 63, 'right black key in the pair'],
    ['F♯4', 66, 'left black key in the group of three'],
    ['G♯4', 68, 'middle black key in the group of three'],
    ['A♯4', 70, 'right black key in the group of three'],
  ];
  for (const [label, midi, fragment] of samples) {
    const hint = practiceGeometryHint(label, midi);
    assert.match(hint, new RegExp(fragment, 'i'), label);
    assert.doesNotMatch(hint, /white key/i, label);
  }
  assert.match(practiceGeometryHint('D4', 62), /between the pair of black keys/i);
});

test('F02 wrong-octave feedback', () => {
  assert.equal(scorePractice(60, 72), 'wrong_octave');
  assert.match(practiceWrongFeedback('C5', 60, 72), /different octave/i);
  assert.match(practiceWrongFeedback('D4', 60, 62), /Try another key/i);
});

test('F05 lookup share keeps requested spelling', () => {
  const resolution = resolveLookup('Bb3', layout88);
  assert.equal(resolution.status, 'selected');
  const params = lookupShareParams(layout88, resolution.selected);
  assert.equal(params.get('note'), 'Bb3');
  assert.notEqual(asciiNote(resolution.selected!.requestedSpelling.display), 'C4');
});

test('F07 labeled segments cover edges without lone C8', () => {
  const segments88 = labeledFullSegments(layout88);
  assert.equal(segments88[0].label, 'A0–B1');
  assert.equal(segments88.at(-1)!.label, 'C7–C8');
  assert.ok(segments88.every(segment => !(segment.keys.length === 1 && segment.keys[0].midi === 108)));
  const covered = new Set(segments88.flatMap(segment => segment.keys.map(key => key.midi)));
  assert.equal(covered.size, layout88.keys.length);
  const segments61 = labeledFullSegments(layout61);
  assert.equal(segments61[0].keys[0].midi, 36);
  assert.equal(segments61.at(-1)!.keys.at(-1)!.midi, 96);
  assert.equal(printCompactSegments(layout88).length, 3);
  assert.equal(printCompactSegments(layout61).length, 2);
  const window = visibleMidiWindow(layout88, 60, 12);
  assert.ok(window.keys.some(key => key.midi === 60));
});

const failed = results.filter(item => !item.passed);
writeFileSync(join(outDir, 'unit-results.json'), JSON.stringify({ passed: failed.length === 0, results }, null, 2));
console.log(JSON.stringify({ passed: failed.length === 0, total: results.length, failed: failed.length }, null, 2));
if (failed.length) {
  for (const item of failed) console.error(`FAIL ${item.name}: ${item.detail}`);
  process.exit(1);
}
