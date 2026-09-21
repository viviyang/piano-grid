const base = process.env.PIANO_BASE_URL || 'http://127.0.0.1:3121';

const pages = [
  {
    url: '/chords/c-7',
    title: 'C7 Chord: Piano Notes, Inversions, Sound & PDF | PianoGrid',
    h1: 'C7 Chord',
    notes: ['C', 'E', 'G', 'B♭'],
    inversions: 4,
    keepTitle: true,
    cleanAudit: true,
    sources: ['Open Music Theory', 'PianoChord.org'],
  },
  {
    url: '/chords/g-major',
    title: 'G Major Chord: Piano Notes, Inversions & PDF | PianoGrid',
    h1: 'G Major Chord',
    notes: ['G', 'B', 'D'],
    inversions: 3,
    keepFingering: true,
    noFingeringInTitle: true,
  },
  {
    url: '/chords/a-major',
    title: 'A Major Chord: Piano Notes, Fingering & Inversions | PianoGrid',
    h1: 'A Major Chord',
    notes: ['A', 'C♯', 'E'],
    inversions: 3,
    keepFingering: true,
  },
  {
    url: '/chords/d-major',
    title: 'D Major Chord: Piano Notes, Inversions & PDF | PianoGrid',
    h1: 'D Major Chord',
    notes: ['D', 'F♯', 'A'],
    inversions: 3,
    noFingeringPromise: true,
  },
  {
    url: '/chords/f-major',
    title: 'F Major Chord: Piano Notes, Inversions & PDF | PianoGrid',
    h1: 'F Major Chord',
    notes: ['F', 'A', 'C'],
    inversions: 3,
    noFingeringPromise: true,
  },
  {
    url: '/keyboard-notes/chart',
    title: 'Piano Notes Chart: Staff Notes to Keyboard | PianoGrid',
    h1: 'Piano Notes Chart',
    alreadyOk: true,
  },
  {
    url: '/chords/a-m7',
    title: 'Am7 Chord: Piano Notes, Inversions, Sound & PDF | PianoGrid',
    h1: 'Am7 Chord',
    notes: ['A', 'C', 'E', 'G'],
    inversions: 4,
    cleanAudit: true,
    intro: 'Am7, also called A minor seventh, contains A–C–E–G and uses the formula 1–♭3–5–♭7.',
    theory: 'Am7 is a minor triad plus a minor seventh.',
    fingering: 'Fingering is not included on this page. The diagrams show note positions, not a required hand shape.',
    sources: ['Open Music Theory', 'PianoChord.org'],
  },
  {
    url: '/chords/b-major',
    title: 'B Major Chord: Piano Notes, Inversions & PDF | PianoGrid',
    h1: 'B Major Chord',
    notes: ['B', 'D♯', 'F♯'],
    inversions: 3,
    keepFingering: true,
    noFingeringInTitle: true,
  },
];

function decode(value) {
  return String(value || '')
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&nbsp;', ' ')
    .replaceAll('&#9839;', '♯')
    .replaceAll('&#9837;', '♭')
    .replaceAll('&sharp;', '♯')
    .replaceAll('&flat;', '♭');
}

function parse(html) {
  const title = decode((html.match(/<title>([^<]*)<\/title>/i) || [])[1] || '');
  const description = decode((html.match(/<meta\s+name="description"\s+content="([^"]*)"/i) || html.match(/<meta\s+content="([^"]*)"\s+name="description"/i) || [])[1] || '');
  const robots = decode((html.match(/<meta\s+name="robots"\s+content="([^"]*)"/i) || [])[1] || '');
  const canonical = decode((html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i) || html.match(/<link\s+href="([^"]*)"\s+rel="canonical"/i) || [])[1] || '');
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((match) => decode(match[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()));
  const intro = decode(((html.match(/<p class="am-direct-answer">([\s\S]*?)<\/p>/i) || [])[1] || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());
  const main = decode((html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i) || [])[1] || '').replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '');
  const visible = main.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  return { title, description, robots, canonical, h1s, intro, visible, html };
}

const results = [];
function test(name, fn) {
  try {
    fn();
    results.push({ name, passed: true });
    console.log(`PASS ${name}`);
  } catch (error) {
    results.push({ name, passed: false, detail: error.message });
    console.error('FAIL', name, error.message);
  }
}
function assert(condition, detail) {
  if (!condition) throw new Error(detail || 'assertion failed');
}

const cMajor = parse(await (await fetch(`${base}/chords/c-major`)).text());
test('out-of-scope C major H1 unchanged', () => {
  assert(cMajor.h1s.join('') === 'C Major Piano Chord', JSON.stringify(cMajor.h1s));
});

for (const spec of pages) {
  const response = await fetch(base + spec.url, { redirect: 'manual' });
  const html = await response.text();
  const page = parse(html);
  test(`${spec.url} 200`, () => assert(response.status === 200, String(response.status)));
  test(`${spec.url} title`, () => assert(page.title === spec.title, page.title));
  test(`${spec.url} exactly one H1`, () => assert(page.h1s.length === 1 && page.h1s[0] === spec.h1, JSON.stringify(page.h1s)));
  test(`${spec.url} canonical`, () => {
    assert(page.canonical === `https://pianogrid.com${spec.url}` || page.canonical === spec.url, page.canonical);
  });
  test(`${spec.url} index,follow`, () => {
    const robots = page.robots.toLowerCase();
    assert(robots.includes('index') && robots.includes('follow') && !robots.includes('noindex'), page.robots);
  });
  if (spec.notes) {
    test(`${spec.url} notes`, () => {
      for (const note of spec.notes) assert(page.visible.includes(note), `missing ${note}`);
    });
  }
  if (spec.inversions) {
    test(`${spec.url} inversion rows`, () => {
      const table = html.match(/<table class="am-inversion-table"[\s\S]*?<\/table>/);
      const rows = table ? [...table[0].matchAll(/<tr\b/g)].length - 1 : 0;
      assert(rows === spec.inversions, String(rows));
    });
  }
  if (spec.noFingeringInTitle) {
    test(`${spec.url} title has no Fingering`, () => assert(!/fingering/i.test(page.title), page.title));
  }
  if (spec.noFingeringPromise) {
    test(`${spec.url} no fingering examples or promise`, () => {
      assert(!/fingering/i.test(page.title + ' ' + page.description), `${page.title} | ${page.description}`);
      assert(!/ch-finger-map|ch-hand-switch/.test(html), 'fingering UI added');
    });
  }
  if (spec.keepFingering) {
    test(`${spec.url} keeps root-position fingering`, () => {
      assert(/Root-position fingering examples/.test(page.visible), 'fingering section missing');
      assert(/ch-finger-map|ch-finger-number/.test(html) || /1–3–5|1-3-5/.test(page.visible) || /finger 1/.test(html), 'finger numbers missing');
    });
  }
  if (spec.cleanAudit) {
    test(`${spec.url} no N2C or Checked IDs`, () => {
      assert(!/N2C-|Checked 2026|Scope limit:/.test(page.visible), page.visible.match(/N2C-|Checked 2026|Scope limit:/)?.[0] || 'audit text');
    });
    test(`${spec.url} keeps sources`, () => {
      assert(/Sources/.test(page.visible), 'Sources missing');
      for (const name of spec.sources) assert(page.visible.includes(name), `missing ${name}`);
    });
  }
  if (spec.intro) test(`${spec.url} intro`, () => assert(page.intro === spec.intro, page.intro));
  if (spec.theory) test(`${spec.url} theory`, () => assert(page.visible.includes(spec.theory), 'theory missing'));
  if (spec.fingering) test(`${spec.url} fingering copy`, () => assert(page.visible.includes(spec.fingering), 'fingering copy missing'));
  test(`${spec.url} no A a minor seventh`, () => assert(!/A a minor seventh/.test(page.visible), 'article-case bug'));
  if (!spec.alreadyOk) {
    test(`${spec.url} play/build/pdf markup`, () => {
      assert(/Play chord|Play this/.test(html) || spec.url.includes('chart'), 'play missing');
      assert(/Build |practice/.test(html) || /Check answer/.test(html), 'build missing');
      assert(/\.pdf/.test(html), 'pdf missing');
    });
  }
}

const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const robots = await (await fetch(`${base}/robots.txt`)).text();
test('sitemap still lists the 8 URLs', () => {
  for (const spec of pages) assert(sitemap.includes(`https://pianogrid.com${spec.url}`), spec.url);
});
test('robots still allows indexing', () => {
  assert(robots.includes('Allow: /') && !robots.includes('Disallow: /'), robots.slice(0, 200));
});

const failed = results.filter((item) => !item.passed);
console.log(`${results.length - failed.length}/${results.length} passed`);
process.exitCode = failed.length ? 1 : 0;
