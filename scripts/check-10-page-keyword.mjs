const base = process.env.PIANO_BASE_URL || 'http://127.0.0.1:3024';
const pages = [
  {
    url: '/scales/c-major',
    title: 'C Major Scale on Piano: Notes & Fingering | PianoGrid',
    h1: 'C Major Scale on Piano',
    description: 'Learn the C major scale on piano: C, D, E, F, G, A and B. See the key signature, keyboard notes, one-octave fingering, practice exercises and printable reference.',
    keyword: /c major scale on piano/i,
    notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
    kind: 'scale',
  },
  {
    url: '/chords/a-flat-major',
    title: 'A-flat Major Chord: Piano Notes, Inversions & PDF | PianoGrid',
    h1: 'A-flat Major Chord',
    description: 'Learn the A-flat major chord on piano: A♭, C and E♭. See the keyboard diagram, root position and two inversions, hear the chord and download a printable reference.',
    keyword: /a-flat major chord on piano/i,
    notes: ['A♭', 'C', 'E♭'],
    absent: ['A Flat Chord'],
    kind: 'chord',
  },
  {
    url: '/chords/b-flat-minor',
    title: 'B-flat Minor Chord: Piano Notes, Inversions & PDF | PianoGrid',
    h1: 'B-flat Minor Chord',
    description: 'Learn the B-flat minor chord on piano: B♭, D♭ and F. See the keyboard diagram, root position and two inversions, hear the chord and download a printable reference.',
    keyword: /b-flat minor chord on piano/i,
    notes: ['B♭', 'D♭', 'F'],
    kind: 'chord',
  },
  {
    url: '/chords/c-m7',
    title: 'Cm7 Chord: Piano Notes, Inversions, Sound & PDF | PianoGrid',
    h1: 'Cm7 Chord',
    description: 'Learn the Cm7 chord on piano: C, E♭, G and B♭. See the keyboard diagram and three inversions, hear the chord, practice the notes and download a printable reference.',
    keyword: /cm7 chord/i,
    notes: ['C', 'E♭', 'G', 'B♭'],
    must: ['Cm7 is a minor triad plus a minor seventh.', '1–♭3–5–♭7', 'Fingering is not included on this page.'],
    absent: ['A c minor seventh is'],
    kind: 'chord',
  },
  {
    url: '/chords/f-maj7',
    title: 'Fmaj7 Chord: Piano Notes, Inversions, Sound & PDF | PianoGrid',
    h1: 'Fmaj7 Chord',
    description: 'Learn the Fmaj7 chord on piano: F, A, C and E. See the keyboard diagram and three inversions, hear the chord, practice the notes and download a printable reference.',
    keyword: /fmaj7 chord/i,
    notes: ['F', 'A', 'C', 'E'],
    must: ['Fmaj7 is a major triad plus a major seventh.', '1–3–5–7'],
    absent: ['A f major seventh is'],
    kind: 'chord',
  },
  {
    url: '/chords/g-maj7',
    title: 'Gmaj7 Chord: Piano Notes, Inversions, Sound & PDF | PianoGrid',
    h1: 'Gmaj7 Chord',
    description: 'Learn the Gmaj7 chord on piano: G, B, D and F♯. See the keyboard diagram and three inversions, hear the chord, practice the notes and download a printable reference.',
    keyword: /gmaj7 chord/i,
    notes: ['G', 'B', 'D', 'F♯'],
    must: ['Gmaj7 is a major triad plus a major seventh.', '1–3–5–7', 'Fingering is not included on this page.'],
    absent: ['A g major seventh is'],
    kind: 'chord',
  },
  {
    url: '/scales/a-minor',
    title: 'A Minor Scale on Piano: Natural, Harmonic & Melodic | PianoGrid',
    h1: 'A Minor Scale on Piano',
    description: 'Find the notes of A minor, compare its three forms and descending patterns, and read source-checked piano fingerings.',
    keyword: /a minor scale on piano/i,
    notes: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    kind: 'scale',
  },
  {
    url: '/scales/blues',
    title: 'Blues Scales on Piano: Major and Minor | PianoGrid',
    h1: 'Blues Scales on Piano: Major and Minor',
    description: 'Compare C and G major and minor blues scales with note lists and the added blue-note position.',
    keyword: /blues scales on piano/i,
    notes: ['C', 'E♭', 'F', 'G♭', 'G', 'B♭'],
    must: ['University of Puget Sound', 'Open Music Theory', 'Berklee PULSE'],
    kind: 'scale',
  },
  {
    url: '/scales/d-major',
    title: 'D Major Scale on Piano: Notes & Fingering | PianoGrid',
    h1: 'D Major Scale on Piano',
    description: 'Learn the D major scale on piano: D, E, F♯, G, A, B and C♯. See the key signature, keyboard notes, one-octave fingering, practice exercises and printable reference.',
    keyword: /d major scale on piano/i,
    notes: ['D', 'E', 'F♯', 'G', 'A', 'B', 'C♯'],
    kind: 'scale',
  },
  {
    url: '/scales/e-minor',
    title: 'E Minor Scale on Piano: Natural, Harmonic & Melodic | PianoGrid',
    h1: 'E Minor Scale on Piano: Natural, Harmonic & Melodic',
    description: 'Find the notes of E minor, compare its three forms and descending patterns, and read source-checked piano fingerings.',
    keyword: /e minor scale on piano/i,
    notes: ['E', 'F♯', 'G', 'A', 'B', 'C', 'D'],
    kind: 'scale',
  },
];

const unchanged = [
  ['/scales/modes', 'Scale Modes on Piano: 7 Modes, Notes & Patterns | PianoGrid'],
  ['/scales/pentatonic', 'Pentatonic Scales on Piano: Major and Minor | PianoGrid'],
  ['/scales', 'Piano Scales: Notes, Patterns & Fingering | PianoGrid'],
  ['/chords/c-major', 'C Major Chord: Piano Notes, Inversions & Practice | PianoGrid'],
  ['/arpeggios', 'Piano Arpeggios: C & G Major Notes and Fingering | PianoGrid'],
];

const banned = [/N2[A-D]/, /AT-\d+/, /AM-[A-Z0-9-]+/, /AN-[A-Z0-9-]+/, /PG-[A-Z0-9-]+/, /Checked for:/, /checking scope/, /Source record:/, /Scope limit:/, /approved plan/i, /teacher review/];
const results = [];
function test(name, fn) {
  try { fn(); results.push({ name, passed: true }); }
  catch (error) { results.push({ name, passed: false, detail: error.message }); console.error('FAIL', name, error.message); }
}
function assert(condition, detail) { if (!condition) throw new Error(detail || 'failed'); }
function decode(value) {
  return value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&#39;/g, "'").replace(/&#x266F;/g, '♯').replace(/&#x266D;/g, '♭').replace(/&#x2013;/g, '–').replace(/&#x2014;/g, '—');
}
function visible(html) {
  return decode(html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
}

for (const page of pages) {
  const response = await fetch(`${base}${page.url}`);
  const html = await response.text();
  const text = visible(html);
  const title = decode((html.match(/<title>([^<]*)<\/title>/i) ?? [])[1] ?? '');
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((match) => decode(match[1].replace(/<[^>]+>/g, '').trim()));
  const description = decode((html.match(/name="description" content="([^"]*)"/i) ?? [])[1] ?? '');
  const canonical = (html.match(/rel="canonical" href="([^"]+)"/i) ?? [])[1] ?? '';
  const robots = (html.match(/name="robots" content="([^"]*)"/i) ?? [])[1] ?? '';
  test(`${page.url} 200`, () => assert(response.status === 200, String(response.status)));
  test(`${page.url} title`, () => assert(title === page.title, title));
  test(`${page.url} h1`, () => assert(h1s.length === 1 && h1s[0] === page.h1, JSON.stringify(h1s)));
  test(`${page.url} description`, () => assert(description === page.description, description));
  test(`${page.url} keyword`, () => assert(page.keyword.test(`${title} ${h1s[0]} ${description}`), title));
  test(`${page.url} canonical`, () => assert(canonical === `https://pianogrid.com${page.url}`, canonical));
  test(`${page.url} robots`, () => assert(robots === 'index, follow', robots));
  test(`${page.url} notes`, () => { for (const note of page.notes) assert(text.includes(note), `missing ${note}`); });
  test(`${page.url} required copy`, () => { for (const line of page.must ?? []) assert(text.includes(line), line); });
  test(`${page.url} absent copy`, () => { for (const line of page.absent ?? []) assert(!text.includes(line), line); });
  test(`${page.url} no audit language`, () => { for (const pattern of banned) assert(!pattern.test(text), pattern); });
  if (page.kind === 'chord') {
    test(`${page.url} chord controls`, () => {
      assert(text.includes('Play chord'), 'play');
      assert(/Build .+ on the keyboard/.test(text) || text.includes('Check answer'), 'build');
      assert(html.includes('.pdf'), 'pdf');
      assert(/Related/.test(text), 'related');
    });
  } else {
    test(`${page.url} scale controls`, () => {
      assert(text.includes('Play scale'), 'play');
      assert(text.includes('Check the notes'), 'quiz');
      assert(text.includes('Practice with a pulse'), 'practice');
      assert(text.includes('Print current scale'), 'print');
      assert(text.includes('Sources'), 'sources');
    });
  }
}

for (const [url, title] of unchanged) {
  const html = await (await fetch(`${base}${url}`)).text();
  const actual = decode((html.match(/<title>([^<]*)<\/title>/i) ?? [])[1] ?? '');
  test(`${url} unchanged title`, () => assert(actual === title, actual));
}

const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const robots = await (await fetch(`${base}/robots.txt`)).text();
for (const page of pages) test(`sitemap ${page.url}`, () => assert(sitemap.includes(`https://pianogrid.com${page.url}`), 'missing'));
test('robots allow', () => assert(robots.includes('Allow: /') && !robots.includes('Disallow: /'), robots.slice(0, 180)));

const failed = results.filter((item) => !item.passed);
console.log(`${results.length - failed.length}/${results.length} passed`);
process.exitCode = failed.length ? 1 : 0;
