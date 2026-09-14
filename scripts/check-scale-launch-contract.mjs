import fs from 'node:fs';
import path from 'node:path';
import { validateScaleAuthoringBundle } from './scale-authoring-contract.mjs';

const input = process.argv[2] ?? 'checks/launch-monetization/current-authoring-bundle.json';
const output = process.argv[3] ?? 'checks/launch-monetization/contract-validation.json';
const baseline = JSON.parse(fs.readFileSync(input, 'utf8'));
const master = JSON.parse(fs.readFileSync('docs/content/site-master/page-content.master.json', 'utf8'));
const results = [];

function check(id, passed, detail) {
  results.push({ id, passed: Boolean(passed), detail });
}

function probe(id, change, expected = 'reject') {
  const candidate = structuredClone(baseline);
  change?.(candidate);
  let accepted = true;
  let error = null;
  try { validateScaleAuthoringBundle(candidate, master); } catch (caught) { accepted = false; error = caught.message; }
  check(id, accepted === (expected === 'accept'), { expected, accepted, error });
}

probe('baseline-27-pages', null, 'accept');
probe('reject-invalid-midi', (x) => { x.pages['/scales/c-major'].data.pitch_sequences.RH.ascending[1].midi = 63; });
probe('reject-coherent-wrong-major', (x) => {
  const data = x.pages['/scales/c-major'].data;
  for (const key of ['notes_ascending', 'notes_descending']) data[key] = data[key].map((note) => note === 'D' ? 'D#' : note);
  for (const hand of ['RH', 'LH']) for (const direction of ['ascending', 'descending']) for (const pitch of data.pitch_sequences[hand][direction]) {
    if (pitch.note?.match(/^D[0-9]/)) { pitch.note = pitch.note.replace('D', 'D#'); pitch.alter = 1; pitch.midi += 1; pitch.key_color = 'black'; }
  }
});
probe('reject-family-staff-divergence', (x) => {
  const example = x.pages['/scales/blues'].data.examples.find((item) => item.ascending_notes.includes('Eb'));
  for (const direction of ['events_ascending', 'events_descending']) for (const note of example.staff[direction]) if (note.pitch === 'Eb') { note.pitch = 'E'; note.accidental = 'natural'; note.key_color = 'white'; }
});
probe('reject-nested-view-out-of-piano', (x) => { x.pages['/arpeggios'].data.examples[1].views[0].staff.events_ascending[1].octave = 12; });
probe('reject-source-less-fingering', (x) => { x.pages['/scales/d-major'].data.fingering.source_ids = []; });
probe('reject-missing-faq-answer', (x) => { x.pages['/scales/e-minor'].faqs.pop(); });

const faqPages = Object.values(baseline.pages).filter((page) => Array.isArray(page.faqs));
const faqCount = faqPages.reduce((sum, page) => sum + page.faqs.length, 0);
check('faq-23-pages-102-explicit', faqPages.length === 23 && faqCount === 102, { pages: faqPages.length, answers: faqCount });
const answer = (url, id) => baseline.pages[url].faqs.find((faq) => faq.id === id)?.answer ?? '';
check('critical-e-minor-descent', answer('/scales/e-minor', 'scales-e-minor-faq-03').includes('E5–D5–C5–B4–A4–G4–F#4–E4'), 'classical descending register');
check('critical-a-sharp-double-sharps', /F##.*G##/.test(answer('/scales/a-sharp-minor', 'scales-a-sharp-minor-faq-02')), 'F## and G## retained');
check('critical-f-sharp-e-sharp', answer('/scales/f-sharp-minor', 'scales-f-sharp-minor-faq-06').includes('E#4'), 'E# spelling retained');
check('critical-flat-key-fingerings', /2–1–2–3–1–2–3–4/.test(answer('/scales/b-flat-major', 'scales-b-flat-major-faq-03')) && /2–1–2–3–4–1–2–3/.test(answer('/scales/e-flat-major', 'scales-e-flat-major-faq-03')), 'Bb/Eb explicit rows');
check('critical-chromatic-counts', /12 distinct pitch classes.*13 note events/.test(answer('/scales/chromatic', 'scales-chromatic-faq-01')), '12 pitches / 13 events');

const report = {
  executed_at: new Date().toISOString(),
  input: path.resolve(input),
  passed: results.filter((item) => item.passed).length,
  failed: results.filter((item) => !item.passed).length,
  results,
};
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
process.exitCode = report.failed ? 1 : 0;
