import fs from 'node:fs';
import { validateScaleAuthoringBundle } from './scale-authoring-contract.mjs';

const input = JSON.parse(fs.readFileSync('checks/launch-monetization/current-authoring-bundle.json', 'utf8'));
const master = JSON.parse(fs.readFileSync('docs/content/site-master/page-content.master.json', 'utf8'));
const clone = () => structuredClone(input);
const results = [];

function expectReject(name, mutate, pattern) {
  const value = clone(); mutate(value);
  try { validateScaleAuthoringBundle(value, master); results.push({ name, passed: false, detail: 'invalid input was accepted' }); }
  catch (error) { results.push({ name, passed: pattern.test(String(error)), detail: String(error) }); }
}

function expectPass(name, check) {
  try { check(); results.push({ name, passed: true }); }
  catch (error) { results.push({ name, passed: false, detail: String(error) }); }
}

expectPass('all 27 approved authoring records and 74 dependency-closure sources validate', () => validateScaleAuthoringBundle(input, master));
expectReject('C4 cannot be declared as a black key', (value) => { value.pages['/scales/c-major'].data.pitch_sequences.RH.ascending[0].key_color = 'black'; }, /key_color.*white/i);
expectReject('C major cannot silently contain D-sharp even with internally consistent MIDI and color', (value) => {
  Object.assign(value.pages['/scales/c-major'].data.pitch_sequences.RH.ascending[1], { note: 'D#4', step: 'D', alter: 1, written_octave: 4, midi: 63, key_color: 'black' });
}, /must match the scale definition/i);
expectReject('nested unknown source IDs are rejected', (value) => { value.pages['/scales/d-major'].data.note_source_ids[0] = 'SOURCE-DOES-NOT-EXIST'; }, /unknown nested source id/i);
expectReject('new descending fingering without exact descending scope is rejected', (value) => {
  value.pages['/scales/e-minor'].data.forms[1].fingering.descending.right_hand = [5,4,3,2,1,3,2,1];
}, /descending source scope/i);
expectReject('ascending event order cannot be swapped', (value) => {
  const row = value.pages['/scales/d-major'].data.pitch_sequences.RH.ascending;
  [row[0], row[1]] = [row[1], row[0]];
}, /strictly ascending|must match the scale definition/i);
expectPass('C-flat written octave maps to B3 physical MIDI without changing the spelling', () => {
  const row = input.pages['/scales/c-flat-major'].data.pitch_sequences.RH.ascending;
  const cb = row.find((event) => event.note === 'Cb4');
  if (!cb || cb.midi !== 59 || cb.key_color !== 'white') throw new Error(JSON.stringify(cb));
});
expectPass('A classical melodic minor descent restores F and G naturals', () => {
  const form = input.pages['/scales/a-minor'].data.forms.find((item) => item.id === 'melodic_minor_classical');
  if (form.notes_descending.join() !== 'A,G,F,E,D,C,B,A') throw new Error(form.notes_descending.join());
});
expectPass('family and arpeggio event counts retain 5/6/7/12 and 3-tone boundaries', () => {
  const counts = Object.fromEntries(['/scales/modes','/scales/pentatonic','/scales/blues','/scales/chromatic','/arpeggios'].map((url) => [url, input.pages[url].data.examples[0].ascending_notes.length]));
  const expected = { '/scales/modes': 8, '/scales/pentatonic': 6, '/scales/blues': 7, '/scales/chromatic': 13, '/arpeggios': 4 };
  if (JSON.stringify(counts) !== JSON.stringify(expected)) throw new Error(JSON.stringify(counts));
});

const report = { executed_at: new Date().toISOString(), passed: results.filter((item) => item.passed).length, failed: results.filter((item) => !item.passed).length, results };
fs.writeFileSync('checks/scales-completion/contract-validation.json', `${JSON.stringify(report, null, 2)}\n`);
console.log(`Scales completion contract: ${report.passed} passed, ${report.failed} failed`);
if (report.failed) process.exitCode = 1;
