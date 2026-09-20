import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const results = [];
function test(name, fn) {
  try {
    fn();
    results.push({ name, passed: true });
  } catch (error) {
    results.push({ name, passed: false, detail: error.message });
  }
}
function assert(condition, detail) {
  if (!condition) throw new Error(detail || 'assertion failed');
}

function loadObjectFromSource(src, exportName) {
  const start = src.indexOf(`export const ${exportName}`);
  if (start < 0) throw new Error(`missing ${exportName}`);
  const brace = src.indexOf('{', start);
  let depth = 0;
  let inStr = false;
  let quote = '';
  let escape = false;
  let end = brace;
  for (let i = brace; i < src.length; i += 1) {
    const ch = src[i];
    if (inStr) {
      if (escape) { escape = false; continue; }
      if (ch === '\\') { escape = true; continue; }
      if (ch === quote) { inStr = false; quote = ''; }
      continue;
    }
    if (ch === '"' || ch === "'") { inStr = true; quote = ch; continue; }
    if (ch === '{') depth += 1;
    else if (ch === '}') {
      depth -= 1;
      if (depth === 0) { end = i; break; }
    }
  }
  return Function(`"use strict"; return (${src.slice(brace, end + 1)});`)();
}

function loadObjectLiteral(file, exportName) {
  return loadObjectFromSource(readFileSync(resolve(root, file), 'utf8'), exportName);
}

function brandTitle(title) {
  return title.includes('PianoGrid') || title.length > 52 ? title : `${title} | PianoGrid`;
}

const detailCopy = loadObjectLiteral('src/lib/chord-detail-seo-copy.ts', 'CHORD_DETAIL_SEO_COPY');
const seoExtras = loadObjectFromSource(
  readFileSync(resolve(root, 'src/lib/seo-editorial.ts'), 'utf8').replace('...CHORD_DETAIL_SEO_COPY,', ''),
  'SEO_COPY',
);
const seo = { ...detailCopy, ...seoExtras };

const expected = {
  '/chords/b-7': { title: 'B7 Chord: Piano Notes, Inversions, Sound & PDF | PianoGrid', h1: 'B7 Chord', notes: ['B', 'D♯', 'F♯', 'A'], count: 4, pdf: 'chord-b-7.pdf', pack: 'docs/pianogrid-chords-n2c/03_details/b-7.page.json' },
  '/chords/a-7': { title: 'A7 Chord: Piano Notes, Inversions, Sound & PDF | PianoGrid', h1: 'A7 Chord', notes: ['A', 'C♯', 'E', 'G'], count: 4, pdf: 'chord-a-7.pdf', pack: 'docs/pianogrid-chords-n2c/03_details/a-7.page.json' },
  '/chords/g-7': { title: 'G7 Chord: Piano Notes, Inversions, Sound & PDF | PianoGrid', h1: 'G7 Chord', notes: ['G', 'B', 'D', 'F'], count: 4, pdf: 'chord-g-7.pdf', pack: 'docs/pianogrid-chords-n2c/03_details/g-7.page.json' },
  '/chords/d-7': { title: 'D7 Chord: Piano Notes, Inversions, Sound & PDF | PianoGrid', h1: 'D7 Chord', notes: ['D', 'F♯', 'A', 'C'], count: 4, pdf: 'chord-d-7.pdf', pack: 'docs/pianogrid-chords-n2c/03_details/d-7.page.json' },
  '/chords/e-7': { title: 'E7 Chord: Piano Notes, Inversions, Sound & PDF | PianoGrid', h1: 'E7 Chord', notes: ['E', 'G♯', 'B', 'D'], count: 4, pdf: 'chord-e-7.pdf', pack: 'docs/pianogrid-chords-n2c/03_details/e-7.page.json' },
  '/chords/f-minor': { title: 'F Minor Chord – Piano Notes & Inversions | PianoGrid', h1: 'F Minor Chord', notes: ['F', 'A♭', 'C'], count: 3, pdf: 'chord-f-minor.pdf', pack: 'docs/pianogrid-chords-next-expansion/04_details_next/f-minor.page.json' },
  '/chords/b-minor': { title: 'B Minor Chord – Piano Notes & Inversions | PianoGrid', h1: 'B Minor Chord', notes: ['B', 'D', 'F♯'], count: 3, pdf: 'chord-b-minor.pdf', pack: 'docs/pianogrid-chords-next-expansion/04_details_next/b-minor.page.json' },
  '/chords/d-minor': { title: 'D Minor Chord – Piano Notes & Inversions | PianoGrid', h1: 'D Minor Chord', notes: ['D', 'F', 'A'], count: 3, pdf: 'chord-d-minor.pdf', pack: 'docs/pianogrid-chords-next-expansion/04_details_next/d-minor.page.json' },
  '/chords/e-minor': { title: 'E Minor Chord – Piano Notes & Inversions | PianoGrid', h1: 'E Minor Chord', notes: ['E', 'G', 'B'], count: 3, pdf: 'chord-e-minor.pdf', pack: 'docs/pianogrid-chords-next-expansion/04_details_next/e-minor.page.json' },
  '/chords/g-minor': { title: 'G Minor Chord – Piano Notes & Inversions | PianoGrid', h1: 'G Minor Chord', notes: ['G', 'B♭', 'D'], count: 3, pdf: 'chord-g-minor.pdf', pack: 'docs/pianogrid-chords-next-expansion/04_details_next/g-minor.page.json' },
};

const pages = {
  '/guide/read-sheet-music': { title: 'How to Read Sheet Music for Piano – Beginner Guide | PianoGrid', h1: 'How to Read Sheet Music for Piano' },
  '/songs/easy': { title: 'Easy Piano Songs for Beginners – Songs to Learn | PianoGrid', h1: 'Easy Piano Songs for Beginners' },
  '/songs': { title: 'Piano Songs to Learn – Find Your Next Piece | PianoGrid', h1: 'Piano Songs to Learn' },
  '/keyboard-notes/labeled': { title: 'Piano Keyboard Keys Labeled – Note Names & Layout | PianoGrid', h1: 'Piano Keyboard Keys Labeled' },
  '/sheet-music/easy': { title: 'Easy Piano Sheet Music: Compare Editions | PianoGrid', h1: 'Easy Piano Sheet Music' },
  '/sheet-music/beginner': { title: 'Beginner Piano Sheet Music: Where to Start | PianoGrid', h1: 'Beginner Piano Sheet Music' },
};

for (const [url, want] of Object.entries(expected)) {
  const copy = seo[url];
  test(`${url} copy title`, () => {
    assert(copy, 'missing copy');
    assert(brandTitle(copy.title) === want.title, brandTitle(copy.title));
  });
  test(`${url} copy h1`, () => assert(copy.h1 === want.h1, copy.h1));
  test(`${url} no fingering in title`, () => assert(!/fingering/i.test(copy.title), copy.title));
  test(`${url} related heading`, () => assert(copy.h2['Related chord references'] === 'Related Chords and Practice', JSON.stringify(copy.h2)));
  test(`${url} finger copy`, () => assert(copy.fingering?.includes('Finger numbers are not included'), copy.fingering));
  if (url.includes('-minor')) {
    test(`${url} playing heading`, () => {
      assert(copy.h2['Fingering is not provided for this reference'] === `Playing the ${copy.h1}`, JSON.stringify(copy.h2));
    });
  }
  const pack = JSON.parse(readFileSync(resolve(root, want.pack), 'utf8'));
  const voicings = pack.voicings || pack.data.voicings;
  const notes = pack.definition?.toneSpellings || pack.data.pitch_classes;
  test(`${url} pack notes`, () => assert(JSON.stringify(notes) === JSON.stringify(want.notes), JSON.stringify(notes)));
  test(`${url} pack voicing count`, () => assert(voicings.length === want.count, String(voicings.length)));
  voicings.forEach((voicing, index) => {
    const written = voicing.notesLowToHigh || voicing.notes;
    const bass = voicing.bass;
    test(`${url} voicing ${index} bass`, () => assert(bass === written[0], `${bass} vs ${written[0]}`));
    test(`${url} voicing ${index} note count`, () => assert(written.length === want.count, String(written.length)));
  });
  const pdfPath = resolve(root, 'public/reference/assets', want.pdf);
  test(`${url} PDF is a PDF`, () => {
    assert(existsSync(pdfPath), `missing ${want.pdf}`);
    assert(readFileSync(pdfPath).subarray(0, 5).toString() === '%PDF-', 'not a PDF header');
  });
}

for (const [url, want] of Object.entries(pages)) {
  const copy = seo[url];
  test(`${url} title`, () => assert(brandTitle(copy.title) === want.title, brandTitle(copy.title)));
  test(`${url} h1`, () => assert(copy.h1 === want.h1, copy.h1));
}

test('songs title dropped Style', () => {
  assert(!/Style/.test(seo['/songs'].title), seo['/songs'].title);
});
test('guide description mentions rests', () => {
  assert(seo['/guide/read-sheet-music'].description.includes('rests'), seo['/guide/read-sheet-music'].description);
});
test('guide PDF is a PDF', () => {
  const pdf = resolve(root, 'public/assets/guides/piano-starter-and-reading.pdf');
  assert(existsSync(pdf), 'missing guide PDF');
  assert(readFileSync(pdf).subarray(0, 5).toString() === '%PDF-', 'guide PDF header');
});
test('labeled worksheet PDFs exist', () => {
  const files = [
    'public/reference/generated/keyboard-notes/labeled-88-octaves.pdf',
    'public/reference/generated/keyboard-notes/labeled-88-letters.pdf',
    'public/reference/generated/keyboard-notes/labeled-61-octaves.pdf',
    'public/reference/generated/keyboard-notes/labeled-61-letters.pdf',
  ];
  for (const file of files) {
    const path = resolve(root, file);
    assert(existsSync(path), `missing ${file}`);
    assert(readFileSync(path).subarray(0, 5).toString() === '%PDF-', `${file} header`);
  }
});

const catalog = JSON.parse(readFileSync(resolve(root, 'docs/content/songs-sheet-v2/content-data/catalog.v2.json'), 'utf8'));
test('locked original exercises stay unpublished in catalog', () => {
  for (const id of ['arr-pg-step-and-hold-v1', 'arr-pg-left-hand-answer-v1', 'arr-pg-one-hand-at-a-time-v1']) {
    const arrangement = catalog.arrangements.find((item) => item.arrangement_id === id);
    assert(arrangement, id);
    assert(arrangement.release?.public_asset_enabled === false, JSON.stringify(arrangement.release));
  }
});

const failed = results.filter((item) => !item.passed);
for (const item of results) console.log(`${item.passed ? 'PASS' : 'FAIL'} ${item.name}${item.detail ? ` :: ${item.detail}` : ''}`);
console.log(`\n${results.length - failed.length}/${results.length} passed`);
if (failed.length) process.exit(1);
