import fs from 'node:fs';
import { buildPracticeEvents, evaluateOrderedPitches, evaluatePitchClasses } from '../src/lib/scale-practice.ts';
import { scaleSequence } from '../src/lib/scale-resolver.ts';
import { validateScaleAuthoringBundle } from './scale-authoring-contract.mjs';

const master = JSON.parse(fs.readFileSync('docs/content/site-master/page-content.master.json', 'utf8'));
const authoring = JSON.parse(fs.readFileSync('checks/launch-monetization/current-authoring-bundle.json', 'utf8'));
const results = [];
const check = (name, passed, detail = '') => {
  results.push({ name, passed: Boolean(passed), detail });
  if (!passed) console.error('FAIL', name, detail);
};
const pitchClass = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
const black = new Set([1, 3, 6, 8, 10]);

function split(spelling) {
  const match = spelling.match(/^([A-G])(#{1,2}|b{1,2})?$/);
  if (!match) throw new Error(`Unsupported spelling ${spelling}`);
  return { letter: match[1], accidental: match[2] ?? '' };
}

function midiFor(spelling, octave) {
  const { letter, accidental } = split(spelling);
  const offset = [...accidental].reduce((sum, token) => sum + (token === '#' ? 1 : -1), 0);
  return (octave + 1) * 12 + pitchClass[letter] + offset;
}

function pitch(spelling, octave) {
  const midi = midiFor(spelling, octave);
  return { spelling, note: `${spelling}${octave}`, midi, key_color: black.has((midi + 120) % 12) ? 'black' : 'white', staff: {} };
}

function ascending(notes, hand) {
  let octave = hand === 'RH' ? 4 : 3;
  let previous = -Infinity;
  return notes.map((spelling) => {
    while (midiFor(spelling, octave) <= previous) octave += 1;
    const value = pitch(spelling, octave);
    previous = value.midi;
    return value;
  });
}

function descending(notes, hand) {
  let octave = hand === 'RH' ? 5 : 4;
  let previous = Infinity;
  return notes.map((spelling) => {
    while (midiFor(spelling, octave) >= previous) octave -= 1;
    const value = pitch(spelling, octave);
    previous = value.midi;
    return value;
  });
}

function centerOptions() {
  const data = master.pages['/scales'].data;
  return [
    ...data.major_overview.map((row) => ({ tonic: row.tonic, form: 'major', up: [...row.notes, row.tonic], down: [...row.notes, row.tonic].reverse() })),
    ...data.minor_overview.flatMap((row) => [
      { tonic: row.tonic, form: 'natural_minor', up: row.natural_ascending, down: row.natural_descending },
      { tonic: row.tonic, form: 'harmonic_minor', up: row.harmonic_ascending, down: row.harmonic_descending },
      { tonic: row.tonic, form: 'melodic_minor_classical', up: row.melodic_classical_ascending, down: row.melodic_classical_descending },
    ]),
  ].map((item) => ({
    id: `${item.form}:${item.tonic}`,
    tonic: item.tonic,
    form: item.form,
    sequences: Object.fromEntries(['RH', 'LH'].map((hand) => [hand, { ascending: ascending(item.up, hand), descending: descending(item.down, hand) }])),
  }));
}

const options = centerOptions();
check('60 unique scale objects', options.length === 60 && new Set(options.map((option) => option.id)).size === 60, options.length);
let oneWay = 0;
let roundTrips = 0;
let practiceSelections = 0;
for (const option of options) for (const hand of ['RH', 'LH']) {
  for (const direction of ['ascending', 'descending']) {
    const sequence = scaleSequence(option, hand, direction);
    oneWay += 1;
    check(`${option.id} ${hand} ${direction} nonempty ordered pitches`, sequence.length > 0 && sequence.every((item, index) => index === 0 || (direction === 'ascending' ? item.midi > sequence[index - 1].midi : item.midi < sequence[index - 1].midi)), sequence.map((item) => item.note).join(' '));
    check(`${option.id} ${hand} ${direction} spelling/MIDI/key color agree`, sequence.every((item) => midiFor(item.spelling, Number(item.note.match(/-?\d+$/)[0])) === item.midi && item.key_color === (black.has((item.midi + 120) % 12) ? 'black' : 'white')));
  }
  const upDown = scaleSequence(option, hand, 'up_down');
  roundTrips += 1;
  practiceSelections += 3;
  check(`${option.id} ${hand} up-down has one shared apex`, upDown.length === option.sequences[hand].ascending.length + option.sequences[hand].descending.length - 1);
}
check('V02 single-direction selection count', oneWay === 240, oneWay);
check('V02 up-down selection count', roundTrips === 120, roundTrips);
check('V05 Q1 context count', options.length * 2 === 120, options.length * 2);
check('V06 Q2 context count', oneWay === 240, oneWay);
check('V06 Q3 classical-minor tonic count', master.pages['/scales'].data.minor_overview.length === 15, master.pages['/scales'].data.minor_overview.length);
check('V07 practice selection count', practiceSelections === 360, practiceSelections);

const c = master.pages['/scales/c-major'].data;
const a = master.pages['/scales/a-minor'].data;
for (const hand of ['RH', 'LH']) for (const direction of ['ascending', 'descending']) {
  const row = c.pitch_sequences[hand][direction];
  const fingers = c.fingering[hand][direction];
  check(`C fingering ${hand} ${direction} matches events`, fingers.length === row.length && fingers.every((finger) => Number.isInteger(finger) && finger >= 1 && finger <= 5));
}
for (const form of a.forms) for (const hand of ['right_hand', 'left_hand']) for (const direction of ['ascending', 'descending']) {
  const row = form.pitch_mapping[`${hand}_${direction}_example`];
  const fingers = form.fingering[direction][hand];
  check(`A ${form.id} ${hand} ${direction} fingering is scoped or null`, fingers === null || (fingers.length === row.length && fingers.every((finger) => Number.isInteger(finger) && finger >= 1 && finger <= 5)), fingers);
}
check('A harmonic and melodic descending fingering remain unknown', a.forms.filter((form) => form.id !== 'natural_minor').every((form) => form.fingering.descending.right_hand === null && form.fingering.descending.left_hand === null));
check('A natural descending source scope remains explicit', a.forms[0].fingering.descending_source_scope?.source_id === 'AM-FINGER-LMT' && a.forms[0].fingering.descending_source_scope?.teacher_reviewed === false);

for (const [name, spelling, octave, expected] of [['E-sharp', 'E#', 4, 65], ['B-sharp', 'B#', 3, 60], ['C-flat', 'Cb', 4, 59], ['F-double-sharp', 'F##', 4, 67], ['G-double-sharp', 'G##', 4, 69]]) check(`V04 ${name} written octave`, midiFor(spelling, octave) === expected, midiFor(spelling, octave));
for (const length of [5, 6, 8, 12, 15]) {
  const sequence = Array.from({ length }, (_, index) => pitch(['C', 'D', 'E', 'F', 'G', 'A', 'B'][index % 7], 4 + Math.floor(index / 7)));
  const fixture = { sequences: { RH: { ascending: sequence, descending: [...sequence].reverse() }, LH: { ascending: sequence, descending: [...sequence].reverse() } } };
  check(`V04 resolver supports ${length} events`, scaleSequence(fixture, 'RH', 'ascending').length === length && scaleSequence(fixture, 'RH', 'up_down').length === length * 2 - 1);
  check(`V04 practice builder supports ${length} events`, buildPracticeEvents(sequence, 60, 1, 2).length === length * 2);
}

for (const bpm of [40, 60, 120]) for (const notesPerBeat of [1, 2]) for (const passes of [1, 2, 4]) {
  const row = options[0].sequences.RH.ascending;
  const events = buildPracticeEvents(row, bpm, notesPerBeat, passes);
  check(`V07 timing ${bpm} BPM ${notesPerBeat}/beat ${passes} pass`, events.length === row.length * passes && events.every((event, index) => index === 0 || event.onsetMs > events[index - 1].onsetMs));
}
const qExpected = options[0].sequences.RH.ascending;
check('Q1 empty state is not correct', !evaluatePitchClasses(qExpected, []).startsWith('Correct'));
check('Q1 exact set is correct', evaluatePitchClasses(qExpected, [...new Set(qExpected.map((item) => item.midi % 12))]).startsWith('Correct'));
check('Q1 extra pitch is rejected', evaluatePitchClasses(qExpected, [...new Set(qExpected.map((item) => item.midi % 12)), 1]).includes('Extra'));
check('Q2 exact ordered octave is correct', evaluateOrderedPitches(qExpected, qExpected.map((item) => item.midi)).startsWith('Correct'));
check('Q2 missing final tonic is named', evaluateOrderedPitches(qExpected, qExpected.slice(0, -1).map((item) => item.midi)).includes('final'));
check('Q2 octave error is distinct', evaluateOrderedPitches(qExpected, [qExpected[0].midi + 12, ...qExpected.slice(1).map((item) => item.midi)]).includes('wrong octave'));

const centerBundle = structuredClone(authoring);
centerBundle.pages = { '/scales': centerBundle.pages['/scales'] };
check('runtime author validator accepts null center fingering', Boolean(validateScaleAuthoringBundle(centerBundle, master)));
for (const [name, mutate, expectedPath] of [
  ['empty sequence', (bundle) => { bundle.pages['/scales'].data.major_overview[0].notes = []; }, 'major_overview[0].notes'],
  ['wrong MIDI', (bundle) => { bundle.pages['/scales/c-major'].data.pitch_sequences.RH.ascending[0].midi = 999; }, 'pitch_sequences.RH.ascending[0].midi'],
  ['unapproved URL', (bundle) => { bundle.pages['/scales/new'] = bundle.pages['/scales']; }, 'unapproved URL'],
]) {
  const invalid = structuredClone(authoring);
  mutate(invalid);
  let message = '';
  try { validateScaleAuthoringBundle(invalid, master); } catch (error) { message = String(error.message); }
  check(`runtime author validator rejects ${name}`, message.includes(expectedPath), message);
}

const runtimeSource = fs.readFileSync('src/lib/scale-content.ts', 'utf8');
const pageSource = fs.readFileSync('src/components/scales/pages.tsx', 'utf8');
check('page-wide source rendering does not filter AC-03', runtimeSource.includes('publicPageSources(master, typedPage.source_ids)') && pageSource.includes('model.pageSources.map'));
check('compatibility anchors include requested aliases', pageSource.includes("'what-is-a-scale'") && pageSource.includes("'major-vs-minor'") && pageSource.includes("'scale-degrees'") && pageSource.includes("'section-3': ['practice']"));

const report = {
  executed_at: new Date().toISOString(),
  runtime: process.version,
  counts: { objects: options.length, one_way: oneWay, up_down: roundTrips, q1: 120, q2: 240, q3: 15, practice: practiceSelections },
  passed: results.filter((item) => item.passed).length,
  failed: results.filter((item) => !item.passed).length,
  results,
};
fs.mkdirSync('checks/scales-completion', { recursive: true });
fs.writeFileSync('checks/scales-completion/data-and-contract-validation.json', `${JSON.stringify(report, null, 2)}\n`);
console.log(`Scale final data/contract: ${report.passed} passed, ${report.failed} failed.`);
process.exitCode = report.failed ? 1 : 0;
