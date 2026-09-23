/**
 * GEO round 1 acceptance for five public pages plus out-of-scope regression.
 * Checks crawlable answers, honest limits, and the absence of internal build directives.
 */
import { mkdir, writeFile } from 'node:fs/promises';

const base = process.env.PIANO_BASE_URL || 'http://127.0.0.1:3026';
const outDir = 'docs/geo/2026-09-23';
const results = [];

function test(name, fn) {
  try { fn(); results.push({ name, passed: true }); }
  catch (error) { results.push({ name, passed: false, detail: error.message }); console.error('FAIL', name, error.message); }
}
function assert(condition, detail) { if (!condition) throw new Error(detail || 'assertion failed'); }
function decode(value) {
  return value
    .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&#39;/g, "'")
    .replace(/&#x266F;/g, '♯').replace(/&#x266D;/g, '♭').replace(/&#x2013;/g, '–').replace(/&#x2014;/g, '—')
    .replace(/&#x2019;/g, '’').replace(/&#x2192;/g, '→');
}
function visible(html) {
  return decode(html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
}

const INTERNAL = [
  /do not make duplicate pages/i,
  /universally rewrite symbols/i,
  /must be labeled differently/i,
  /Deduplicate pitch classes/i,
  /Do not discard octaves/i,
  /Do not force the nearest major chord/i,
  /must not be passed to the current three-note/i,
  // A review identifier trailing the checked date. The `Scope limit:` label itself is legitimate:
  // it carries real provenance and rights limitations that must stay visible.
  /Checked 20\d\d-\d\d-\d\d\s*·/,
  /Source record:/,
  /Checked for:/,
  /checking scope/i,
  /\bN2[A-D]\b/,
  /\bAT-\d+\b/,
  /approved plan/i,
  /not the same as a teacher review/i,
];

const pages = new Map();
async function load(route) {
  if (pages.has(route)) return pages.get(route);
  const response = await fetch(`${base}${route}`, { redirect: 'manual' });
  const html = await response.text();
  const entry = {
    response,
    html,
    text: visible(html),
    noscript: [...html.matchAll(/<noscript[^>]*>([\s\S]*?)<\/noscript>/gi)].map((match) => visible(match[1])).join(' '),
    h1: [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((match) => decode(match[1].replace(/<[^>]+>/g, '').trim())),
    canonical: (html.match(/rel="canonical" href="([^"]+)"/i) ?? [])[1] ?? '',
    robots: (html.match(/name="robots" content="([^"]*)"/i) ?? [])[1] ?? '',
  };
  pages.set(route, entry);
  return entry;
}

const scope = ['/chords/finder', '/tools/hear-the-difference', '/scales/c-major', '/chords/c-add9', '/keyboard-notes/frequencies'];

for (const route of scope) {
  const page = await load(route);
  test(`${route} 200`, () => assert(page.response.status === 200, String(page.response.status)));
  test(`${route} single H1`, () => assert(page.h1.length === 1, JSON.stringify(page.h1)));
  test(`${route} canonical unchanged`, () => assert(page.canonical === `https://pianogrid.com${route}`, page.canonical));
  test(`${route} indexable`, () => assert(page.robots === 'index, follow', page.robots));
  test(`${route} no X-Robots-Tag`, () => assert(!page.response.headers.get('x-robots-tag'), String(page.response.headers.get('x-robots-tag'))));
  test(`${route} no internal directives`, () => {
    for (const pattern of INTERNAL) assert(!pattern.test(page.text), `${pattern} matched`);
  });
}

const finder = await load('/chords/finder');
test('finder describes the real input model', () => {
  assert(finder.text.includes('Select the distinct notes you are playing on the one-octave keyboard'), 'note-name input copy missing');
  assert(finder.text.includes('Leaving it unset means the bass is unknown'), 'unknown-bass copy missing');
  assert(!finder.text.includes('Enter pitch names with octave numbers'), 'octave-entry copy still present');
});
test('finder keeps root, bass and vocabulary facts', () => {
  assert(finder.text.includes('433 supported objects'), 'registry size missing');
  assert(/C major chord with E in the bass/.test(finder.text), 'slash-bass example missing');
  assert(finder.text.includes('C6 or Am7'), 'multiple-candidate example missing');
  assert(finder.text.includes('no supported match was found'), 'no-match honesty missing');
  assert(finder.text.includes('not microphone recognition, MIDI capture'), 'capability limit missing');
});
test('finder FAQ matches the note-name input', () => {
  assert(finder.text.includes('The finder works with note names rather than octaves'), 'FAQ answer not corrected');
  assert(!finder.text.includes('Not when notes include octaves'), 'old FAQ answer still present');
});
test('finder keeps a no-JavaScript text reference', () => assert(/remain readable without JavaScript/.test(finder.noscript), finder.noscript));

const addNine = await load('/chords/c-add9');
test('Cadd9 replaces the build directive with reader-facing scope', () => {
  assert(addNine.text.includes('add9 and add2 label the same added note in different notation rather than two separate chords'), 'replacement sentence missing');
  assert(addNine.text.includes('They do not list every omission a performer might make'), 'omission scope missing');
});
test('Cadd9 keeps notes, formula and comparisons', () => {
  assert(addNine.text.includes('Cadd9 contains C, E, G, D'), 'direct answer missing');
  assert(/1[–-]3[–-]5[–-]9/.test(addNine.text), 'formula missing');
  assert(addNine.text.includes('Csus2'), 'sus2 comparison missing');
  assert(addNine.html.includes('/chords/c-9') || addNine.text.includes('C9'), 'ninth-chord comparison missing');
});
test('Cadd9 keeps real source names and links', () => {
  assert(addNine.text.includes('Open Music Theory'), 'OMT missing');
  assert(addNine.text.includes('Musicca'), 'Musicca missing');
  assert(addNine.text.includes('PianoChord.org'), 'PianoChord missing');
  assert(/href="https:\/\/[^"]*musicca/i.test(addNine.html), 'Musicca link missing');
  assert(addNine.text.includes('Supports:'), 'source attribution removed');
});
test('Cadd9 keeps source scope and rights limits while hiding review codes', () => {
  assert(addNine.text.includes('Scope limit:'), 'source limitation text was removed with the review codes');
  assert(addNine.text.includes('calculated reference examples'), 'transposition provenance limit missing');
  assert(addNine.text.includes('no copied prose, diagrams, recordings or PDF files'), 'rights limitation missing');
  assert(!/OMT-ADDED-NOTES|MUSICCA-CADD9|PIANOCHORD-ADD/.test(addNine.text), 'internal review code still visible');
});
test('Cadd9 keeps the voicing and fingering limits in the body', () => {
  assert(addNine.text.includes('not a complete inversion catalogue'), 'voicing-scope limit missing');
  assert(addNine.text.includes('For an exact arrangement, use the written pitches or score'), 'exact-arrangement pointer missing');
  assert(addNine.text.includes('this is not a claim that added-note chords cannot be inverted'), 'inversion caveat missing');
  assert(addNine.text.includes('Fingerings are not supplied'), 'fingering limit missing');
  assert(addNine.text.includes('not a prescribed one-hand stretch'), 'hand-shape limit missing');
});
test('Cadd9 does not overstate add9/add2 equivalence or ninth placement', () => {
  assert(addNine.text.includes('not a claim that every player uses the labels identically'), 'label-variation caveat missing');
  assert(addNine.text.includes('not a universal position rule'), 'ninth-placement caveat missing');
  assert(!/add9 and add2 are (?:completely |fully )?(?:the same|identical)/i.test(addNine.text), 'overstated equivalence');
  assert(!/ninth must (?:always )?(?:stay|be) on top/i.test(addNine.text), 'overstated ninth placement');
});

const htd = await load('/tools/hear-the-difference');
test('hear-the-difference explains the no-JavaScript state', () => {
  assert(/Enable JavaScript to play the comparison/.test(htd.noscript), htd.noscript || 'noscript missing');
});
test('hear-the-difference keeps the accurate task description', () => {
  assert(htd.text.includes('find the voice that changed'), 'task copy missing');
  assert(htd.text.includes('does not measure general ear-training ability'), 'limit copy missing');
  assert(htd.text.includes('not a fixed'), 'mood caveat missing');
  assert(htd.text.includes('Chord names and the changed note appear after you answer'), 'no-spoiler copy missing');
});

const frequencies = await load('/keyboard-notes/frequencies');
test('frequency chart states tuning basis and method', () => {
  assert(frequencies.text.includes('twelve-tone equal temperament'), 'temperament missing');
  assert(frequencies.text.includes('A4 set to 440 Hz') || frequencies.text.includes('A4 = 440 Hz'), 'reference pitch missing');
  assert(frequencies.text.includes('440'), 'formula reference missing');
  assert(frequencies.text.includes('not measurements of an individual piano'), 'measurement caveat missing');
  assert(frequencies.text.includes('piano key number') || frequencies.text.includes('piano key'), 'key numbering missing');
  assert(frequencies.text.includes('MIDI'), 'MIDI numbering missing');
  assert((frequencies.html.match(/<tr/g) ?? []).length >= 89, 'full 88-key table not server-rendered');
});

const cMajor = await load('/scales/c-major');
test('C major keeps one-octave fingering and operations in HTML', () => {
  assert(cMajor.text.includes('C Major contains C, D, E, F, G, A, B'), 'note list missing');
  assert(cMajor.text.includes('1-2-3-1-2-3-4-5'), 'fingering row missing');
  assert(cMajor.text.includes('No two-octave fingering is supplied'), 'two-octave limit missing');
  assert(cMajor.text.includes('Play scale') && cMajor.text.includes('Print current scale'), 'audio or print entry missing');
  assert(cMajor.text.includes('Check the notes') && cMajor.text.includes('Practice with a pulse'), 'practice entries missing');
  assert(!/does detect|detects which hand/.test(cMajor.text), 'false detection claim');
});

// The added-note intro correction is shared by the whole add9 / minor-add9 family.
// These four cover a major and a minor subtype, a sharp key and a flat key.
for (const [route, ownNotes] of [
  ['/chords/g-add9', 'Gadd9 contains G, B, D, A'],
  ['/chords/c-madd9', 'Cm(add9) contains C, E♭, G, D'],
  ['/chords/f-sharp-add9', 'F♯add9 contains F♯, A♯, C♯, G♯'],
  ['/chords/e-flat-madd9', 'E♭m(add9) contains E♭, G♭, B♭, F'],
]) {
  const page = await load(route);
  test(`${route} shares the added-note cleanup without borrowing C data`, () => {
    assert(page.response.status === 200, String(page.response.status));
    assert(page.text.includes('add9 and add2 label the same added note in different notation rather than two separate chords'), 'replacement missing');
    assert(!/do not make duplicate pages/i.test(page.text), 'directive still present');
    assert(page.text.includes(ownNotes), `own note data missing: ${ownNotes}`);
    assert(page.text.includes('not a claim that every player uses the labels identically'), 'label caveat missing');
    assert(page.text.includes('not a complete inversion catalogue'), 'voicing-scope limit missing');
    assert(page.text.includes('Scope limit:'), 'source limitation removed on a non-allowlisted page');
  });
}

for (const [route, phrase] of [['/chords/c-7', 'C7 Chord'], ['/chords/by-key', 'Key, root, quality and Roman numeral'], ['/chord-progressions', 'One pattern, four kinds of information'], ['/scales/d-major', 'D Major Scale on Piano']]) {
  const page = await load(route);
  test(`${route} out-of-scope page unchanged`, () => {
    assert(page.response.status === 200, String(page.response.status));
    assert(page.text.includes(phrase), `missing ${phrase}`);
    assert(page.canonical === `https://pianogrid.com${route}`, page.canonical);
  });
}

const robotsResponse = await fetch(`${base}/robots.txt`);
const robotsText = await robotsResponse.text();
test('robots.txt unchanged and allows crawling', () => {
  assert(robotsText.includes('User-Agent: *'), robotsText);
  assert(robotsText.includes('Allow: /'), robotsText);
  assert(!/Disallow:\s*\/\s*$/m.test(robotsText), 'site-wide disallow present');
  assert(robotsText.includes('Sitemap: https://pianogrid.com/sitemap.xml'), 'sitemap reference missing');
});
const sitemapText = await (await fetch(`${base}/sitemap.xml`)).text();
test('sitemap keeps clean business URLs', () => {
  assert(!sitemapText.includes('utm_'), 'UTM parameters in sitemap');
  assert(!sitemapText.includes('localhost'), 'localhost in sitemap');
  for (const route of scope) assert(sitemapText.includes(`https://pianogrid.com${route}<`), `missing ${route}`);
});

await mkdir(outDir, { recursive: true });
const failed = results.filter((item) => !item.passed);
await writeFile(`${outDir}/geo-round1-validation.json`, `${JSON.stringify({ executed_at: new Date().toISOString(), base, passed: results.length - failed.length, failed: failed.length, results }, null, 2)}\n`);
console.log(`${results.length - failed.length}/${results.length} passed`);
process.exitCode = failed.length ? 1 : 0;
