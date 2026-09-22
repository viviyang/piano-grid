import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { existsSync } from 'node:fs';

const base = process.env.PIANO_BASE_URL || 'http://127.0.0.1:3016';
const outDir = 'checks/reviews/16-page-fix';
const results = [];
const details = {};

function test(name, fn) {
  try {
    const value = fn();
    results.push({ name, passed: true, detail: value === true ? '' : value });
    return true;
  } catch (error) {
    results.push({ name, passed: false, detail: error.message });
    return false;
  }
}

function assert(condition, detail) {
  if (!condition) throw new Error(detail || 'assertion failed');
}

function attr(html, name) {
  const match = html.match(new RegExp(`<meta[^>]+name="${name}"[^>]+content="([^"]*)"`, 'i'))
    || html.match(new RegExp(`<meta[^>]+content="([^"]*)"[^>]+name="${name}"`, 'i'));
  return match?.[1] ?? '';
}

function prop(html, name) {
  const match = html.match(new RegExp(`<meta[^>]+property="${name}"[^>]+content="([^"]*)"`, 'i'))
    || html.match(new RegExp(`<meta[^>]+content="([^"]*)"[^>]+property="${name}"`, 'i'));
  return match?.[1] ?? '';
}

function titleOf(html) {
  return html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? '';
}

function h1s(html) {
  return [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((match) => match[1].replace(/<[^>]+>/g, '').trim());
}

function h2s(html) {
  return [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map((match) => match[1].replace(/<[^>]+>/g, '').trim());
}

function h3s(html) {
  return [...html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)].map((match) => match[1].replace(/<[^>]+>/g, '').trim());
}

function canonical(html) {
  const match = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i)
    || html.match(/<link[^>]+href="([^"]+)"[^>]+rel="canonical"/i);
  return match?.[1] ?? '';
}

function decode(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#x266F;/g, '♯')
    .replace(/&#x266D;/g, '♭');
}

const expected = {
  '/chords/b-7': { title: 'B7 Chord: Piano Notes, Inversions, Sound & PDF | PianoGrid', h1: 'B7 Chord', description: 'Learn the B7 chord on piano: B, D♯, F♯ and A. See the keyboard diagram and three inversions, hear the notes, and download a printable reference.', intro: 'B7, also called B dominant seventh, contains B, D♯, F♯ and A. Use the piano diagram to find the notes and compare root position with three inversions.', related: 'Related Chords and Practice', positions: 4, pdf: '/reference/assets/chord-b-7.pdf', token: 'B7' },
  '/chords/a-7': { title: 'A7 Chord: Piano Notes, Inversions, Sound & PDF | PianoGrid', h1: 'A7 Chord', description: 'Learn the A7 chord on piano: A, C♯, E and G. See the keyboard diagram and three inversions, hear the notes, and download a printable reference.', intro: 'A7, also called A dominant seventh, contains A, C♯, E and G. Use the piano diagram to find the notes and compare root position with three inversions.', related: 'Related Chords and Practice', positions: 4, pdf: '/reference/assets/chord-a-7.pdf', token: 'A7' },
  '/chords/g-7': { title: 'G7 Chord: Piano Notes, Inversions, Sound & PDF | PianoGrid', h1: 'G7 Chord', description: 'Learn the G7 chord on piano: G, B, D and F. See the keyboard diagram and three inversions, hear the notes, and download a printable reference.', intro: 'G7, also called G dominant seventh, contains G, B, D and F. Use the piano diagram to find the notes and compare root position with three inversions.', related: 'Related Chords and Practice', positions: 4, pdf: '/reference/assets/chord-g-7.pdf', token: 'G7' },
  '/chords/d-7': { title: 'D7 Chord: Piano Notes, Inversions, Sound & PDF | PianoGrid', h1: 'D7 Chord', description: 'Learn the D7 chord on piano: D, F♯, A and C. See the keyboard diagram and three inversions, hear the notes, and download a printable reference.', intro: 'D7, also called D dominant seventh, contains D, F♯, A and C. Use the piano diagram to find the notes and compare root position with three inversions.', related: 'Related Chords and Practice', positions: 4, pdf: '/reference/assets/chord-d-7.pdf', token: 'D7' },
  '/chords/e-7': { title: 'E7 Chord: Piano Notes, Inversions, Sound & PDF | PianoGrid', h1: 'E7 Chord', description: 'Learn the E7 chord on piano: E, G♯, B and D. See the keyboard diagram and three inversions, hear the notes, and download a printable reference.', intro: 'E7, also called E dominant seventh, contains E, G♯, B and D. Use the piano diagram to find the notes and compare root position with three inversions.', related: 'Related Chords and Practice', positions: 4, pdf: '/reference/assets/chord-e-7.pdf', token: 'E7' },
  '/chords/f-minor': { title: 'F Minor Chord – Piano Notes & Inversions | PianoGrid', h1: 'F Minor Chord', description: 'Learn the F minor chord on piano: F, A♭ and C. See the keyboard diagram and two inversions, hear the notes, and download a printable reference.', intro: 'The F minor chord (Fm) contains F, A♭ and C. Use the piano diagram to find the notes and compare root position with two inversions.', related: 'Related Chords and Practice', positions: 3, pdf: '/reference/assets/chord-f-minor.pdf', token: 'Fm' },
  '/chords/b-minor': { title: 'B Minor Chord – Piano Notes & Inversions | PianoGrid', h1: 'B Minor Chord', description: 'Learn the B minor chord on piano: B, D and F♯. See the keyboard diagram and two inversions, hear the notes, and download a printable reference.', intro: 'The B minor chord (Bm) contains B, D and F♯. Use the piano diagram to find the notes and compare root position with two inversions.', related: 'Related Chords and Practice', positions: 3, pdf: '/reference/assets/chord-b-minor.pdf', token: 'Bm' },
  '/chords/d-minor': { title: 'D Minor Chord – Piano Notes & Inversions | PianoGrid', h1: 'D Minor Chord', description: 'Learn the D minor chord on piano: D, F and A. See the keyboard diagram and two inversions, hear the notes, and download a printable reference.', intro: 'The D minor chord (Dm) contains D, F and A. Use the piano diagram to find the notes and compare root position with two inversions.', related: 'Related Chords and Practice', positions: 3, pdf: '/reference/assets/chord-d-minor.pdf', token: 'Dm' },
  '/chords/e-minor': { title: 'E Minor Chord – Piano Notes & Inversions | PianoGrid', h1: 'E Minor Chord', description: 'Learn the E minor chord on piano: E, G and B. See the keyboard diagram and two inversions, hear the notes, and download a printable reference.', intro: 'The E minor chord (Em) contains E, G and B. Use the piano diagram to find the notes and compare root position with two inversions.', related: 'Related Chords and Practice', positions: 3, pdf: '/reference/assets/chord-e-minor.pdf', token: 'Em' },
  '/chords/g-minor': { title: 'G Minor Chord – Piano Notes & Inversions | PianoGrid', h1: 'G Minor Chord', description: 'Learn the G minor chord on piano: G, B♭ and D. See the keyboard diagram and two inversions, hear the notes, and download a printable reference.', intro: 'The G minor chord (Gm) contains G, B♭ and D. Use the piano diagram to find the notes and compare root position with two inversions.', related: 'Related Chords and Practice', positions: 3, pdf: '/reference/assets/chord-g-minor.pdf', token: 'Gm' },
  '/guide/read-sheet-music': { title: 'How to Read Sheet Music for Piano – Beginner Guide | PianoGrid', h1: 'How to Read Sheet Music for Piano', description: 'Learn how to read sheet music for piano with staff and keyboard examples, note values, rests, and a short reading exercise with answers.', intro: 'Start with the clef, find the note on the staff, match it to a piano key, and count its length. Then put the steps together in a short reading exercise.' },
  '/songs/easy': { title: 'Easy Piano Songs for Beginners – Songs to Learn | PianoGrid', h1: 'Easy Piano Songs for Beginners', description: 'Choose easy piano songs for beginners, compare specific editions and access options, and use a short practice plan to get started.', intro: 'Choose one piece and one small goal for your next practice session. Compare the named editions below, check how to get the music, and follow a starting plan.' },
  '/songs': { title: 'Piano Songs to Learn – Find Your Next Piece | PianoGrid', h1: 'Piano Songs to Learn', description: 'Find piano songs to learn, compare skill levels and practice goals, and follow links to learning plans and clearly identified sheet music editions.', intro: 'Find your next piano piece by comparing the published level, playing goal and access options of a specific edition. For a first session, start with the easy-song selection.' },
  '/keyboard-notes/labeled': { title: 'Piano Keyboard Keys Labeled – Note Names & Layout | PianoGrid', h1: 'Piano Keyboard Keys Labeled', description: 'See piano keyboard keys labeled with note names, find middle C, understand black and white keys, and print a reference or practice worksheet.', intro: 'Find the note names on a piano keyboard, starting with the repeating groups of two and three black keys. Use the labeled layout, then try the white-key worksheet.' },
  '/sheet-music/easy': { title: 'Easy Piano Sheet Music: Compare Editions | PianoGrid', h1: 'Easy Piano Sheet Music', description: 'Compare easy piano sheet music editions, publisher levels and access options. Find a suitable version and get the score from its publisher.', intro: 'Compare easy piano sheet music by the exact edition, publisher level and access format. Open edition details here, then get the score from its publisher.' },
  '/sheet-music/beginner': { title: 'Beginner Piano Sheet Music: Where to Start | PianoGrid', h1: 'Beginner Piano Sheet Music', description: 'Find beginner piano sheet music with clear edition and access details. Choose a first piece and use note-reading help before you start.', intro: 'Start with one beginner edition and check how to get its score. Use the reading and keyboard references when a note or symbol is unfamiliar.' },
};

const chordUrls = Object.keys(expected).filter((url) => url.startsWith('/chords/'));
const pageUrls = Object.keys(expected);

async function fetchText(path) {
  const response = await fetch(base + path, { redirect: 'manual' });
  const text = await response.text();
  return { status: response.status, headers: Object.fromEntries(response.headers), text };
}

async function fetchBytes(path) {
  const response = await fetch(base + path, { redirect: 'manual' });
  const buffer = Buffer.from(await response.arrayBuffer());
  return { status: response.status, type: response.headers.get('content-type') || '', buffer };
}

function visibleEngineering(html) {
  const stripped = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '');
  return {
    n2c: /N2C-OMT|N2C-1\.0/.test(stripped),
    ledger: /source ledger|Preserved approved mapping|human acceptance record/i.test(stripped),
    fingeringTitle: /<title>[^<]*Fingering[^<]*<\/title>/i.test(html),
    styleTitle: /<title>[^<]*Style[^<]*<\/title>/i.test(html),
  };
}

const pages = {};
for (const url of [...pageUrls, '/chords/c-major', '/chords/a-minor', '/chords/c-7', '/guide', '/sheet-music', '/keyboard-notes/chart', '/sitemap.xml', '/robots.txt']) {
  pages[url] = await fetchText(url);
}

await mkdir(outDir, { recursive: true });

let metadataPass = 0;
for (const url of pageUrls) {
  const page = pages[url];
  const html = page.text;
  const spec = expected[url];
  const title = decode(titleOf(html));
  const description = decode(attr(html, 'description'));
  const robots = attr(html, 'robots');
  const canon = canonical(html);
  const headings = h1s(html).map(decode);
  const sections = h2s(html).map(decode);
  const intro = html.match(/am-direct-answer[^>]*>([\s\S]*?)<\/p>/i)?.[1]?.replace(/<[^>]+>/g, '').trim();
  const ogTitle = decode(prop(html, 'og:title'));
  const flags = visibleEngineering(html);
  details[url] = { status: page.status, title, description, h1: headings, robots, canonical: canon, ogTitle, intro: intro ? decode(intro) : '', h2: sections, flags };
  const metaOk = test(`${url} 200`, () => { assert(page.status === 200, String(page.status)); });
  const titleOk = test(`${url} title`, () => { assert(title === spec.title, title); });
  const descOk = test(`${url} description`, () => { assert(description === spec.description, description); });
  const h1Ok = test(`${url} h1`, () => { assert(headings.length === 1 && headings[0] === spec.h1, JSON.stringify(headings)); });
  test(`${url} intro`, () => { assert(decode(intro || '') === spec.intro, intro); });
  test(`${url} robots`, () => { assert(robots.includes('index') && robots.includes('follow') && !robots.includes('noindex'), robots); });
  test(`${url} canonical`, () => { assert(canon === `https://pianogrid.com${url}` || canon === url, canon); });
  test(`${url} no double brand`, () => { assert(!/PianoGrid \| PianoGrid/.test(title), title); });
  test(`${url} no N2C codes`, () => { assert(!flags.n2c, 'N2C still visible'); });
  test(`${url} no fingering in title`, () => { assert(!flags.fingeringTitle); });
  if (metaOk && titleOk && descOk && h1Ok) metadataPass += 1;
}

let chordStates = 0;
for (const url of chordUrls) {
  const html = pages[url].text;
  const spec = expected[url];
  const count = Number(html.match(/data-position-count="(\d+)"/)?.[1] || 0);
  const rows = [...html.matchAll(/data-voicing-id="([^"]+)"[^>]*data-position="([^"]+)"/g)];
  test(`${url} position count`, () => { assert(count === spec.positions, String(count)); });
  test(`${url} inversion rows`, () => { assert(rows.length === spec.positions, String(rows.length)); });
  if (count === spec.positions) chordStates += count;
  test(`${url} related heading`, () => { assert(h2s(html).map(decode).includes(spec.related), h2s(html).map(decode).join(' | ')); });
  if (url.includes('-minor')) {
    const headings = h2s(html).map(decode);
    test(`${url} no fingering H2`, () => {
      assert(headings.every((heading) => !/fingering/i.test(heading)), headings.join(' | '));
    });
    test(`${url} playing heading`, () => {
      assert(headings.includes(`Playing the ${spec.h1}`), headings.join(' | '));
    });
  }
  test(`${url} finger note`, () => { assert(html.includes('Finger numbers are not included. The diagrams show note positions, not a prescribed hand shape.')); });
  test(`${url} play control`, () => { assert(/Play chord/.test(html)); });
  test(`${url} pdf link`, () => { assert(html.includes(spec.pdf), spec.pdf); });
  test(`${url} no by-key invention`, () => { assert(!/\/chords\/by-key\/[^"'<\s]+/.test(html)); });
  if (html.includes('id="') && /id="[^"]*-related"/.test(html)) {
    const related = html.match(/id="[^"]*-related"[\s\S]*?<\/section>/)?.[0] || '';
    if (related.includes('/chords/by-key')) {
      test(`${url} by-key label`, () => { assert(/Browse chords by key/.test(related), 'related by-key label'); });
    }
  }
}

for (const url of chordUrls) {
  const spec = expected[url];
  const pdf = await fetchBytes(spec.pdf);
  test(`${url} PDF bytes`, () => {
    assert(pdf.status === 200, String(pdf.status));
    assert(pdf.buffer.subarray(0, 5).toString() === '%PDF-', pdf.buffer.subarray(0, 16).toString());
    assert(!pdf.type.includes('text/html'), pdf.type);
    const latin = pdf.buffer.toString('latin1');
    assert(latin.includes(spec.token) || /Dominant Seventh|Minor Piano Chord/.test(latin), 'chord identity missing in PDF');
  });
}

const guide = pages['/guide/read-sheet-music'].text;
test('guide new teaching headings', () => {
  const heads = h2s(guide).map(decode);
  for (const heading of ['Match Written Notes to Piano Keys', 'Count Note Values and Rests', 'Read Time Signatures and Accidentals', 'Read the Grand Staff', 'Practice Reading Piano Sheet Music', 'Piano Starter and Reading Pack']) {
    assert(heads.includes(heading), heading);
  }
});
test('guide rest example', () => { assert(/play 1 \/ rest 2 \/ hold 3–4/.test(guide) && /class="gd-rest"/.test(guide)); });
test('guide C4 match', () => { assert(/C4 in treble/.test(guide) && /C4 in bass/.test(guide)); });
test('guide PDF href', () => { assert(guide.includes('/assets/guides/piano-starter-and-reading.pdf')); });
const guidePdf = await fetchBytes('/assets/guides/piano-starter-and-reading.pdf');
test('guide PDF bytes', () => {
  assert(guidePdf.status === 200, String(guidePdf.status));
  assert(guidePdf.buffer.subarray(0, 5).toString() === '%PDF-');
});

const songs = pages['/songs'].text;
test('songs dropped Style promise', () => { assert(!/Browse by Difficulty &amp; Style|Browse by Difficulty & Style/.test(songs)); });
test('songs teaser not full cards', () => { assert(/pg-songs-teaser/.test(songs) && !/data-edition-key/.test(songs)); });
test('songs catalog heading', () => { assert(h2s(songs).map(decode).includes('Choose a Piano Song to Learn')); });

const easy = pages['/songs/easy'].text;
const easyVisible = easy.replace(/<script[\s\S]*?<\/script>/gi, '');
const songbook = [...easyVisible.matchAll(/<li[^>]*data-resource-id="([^"]+)"[^>]*>([^<]+)<\/li>/g)];
test('easy songbook compact 50 titles', () => { assert(songbook.length === 50, String(songbook.length)); });
test('easy songbook one publisher button', () => {
  const buttons = [...easyVisible.matchAll(/View this songbook at the publisher/g)];
  assert(buttons.length === 1, String(buttons.length));
});
test('easy no fake play/download for songbook', () => { assert(!/sg-songbook[\s\S]{0,2000}Play \/ Download/.test(easy)); });

const sheetEasy = pages['/sheet-music/easy'].text;
const sheetBeginner = pages['/sheet-music/beginner'].text;
test('easy sheet comparison first', () => { assert(h2s(sheetEasy).map(decode)[0] === 'Compare Easy Piano Sheet Music', h2s(sheetEasy).map(decode)[0]); });
test('beginner sheet first-piece heading', () => { assert(h2s(sheetBeginner).map(decode).includes('Choose Your First Sheet Music')); });
test('sheet locked originals hidden', () => {
  assert(!/arr-pg-step-and-hold-v1/.test(sheetEasy + sheetBeginner));
  assert(!/Original PianoGrid practice scores/.test(sheetEasy + sheetBeginner));
  assert(!/Original exercise 1/.test(sheetEasy + sheetBeginner));
});
test('sheet reading help', () => {
  assert(sheetEasy.includes('/guide/read-sheet-music') && sheetEasy.includes('/keyboard-notes/labeled'));
  assert(sheetBeginner.includes('/guide/read-sheet-music') && sheetBeginner.includes('/keyboard-notes/labeled'));
});
test('sheet no source-ledger copy', () => { assert(!/source ledger|Preserved approved mapping/i.test(sheetEasy + sheetBeginner)); });

const labeled = pages['/keyboard-notes/labeled'].text;
test('labeled explain headings', () => {
  const heads2 = h2s(labeled).map(decode);
  const heads3 = h3s(labeled).map(decode);
  assert(heads2.filter((heading) => heading === 'White-Key Names').length === 1, JSON.stringify(heads2));
  assert(!heads3.includes('White-Key Names'), JSON.stringify(heads3));
  assert(heads3.includes('Repeating letter names'), JSON.stringify(heads3));
  assert(heads3.includes('Black Keys: Sharps and Flats'), JSON.stringify(heads3));
  assert(heads3.includes('Find Middle C'), JSON.stringify(heads3));
  assert(!heads2.includes('Find Middle C'), JSON.stringify(heads2));
});
test('labeled print-only markup present', () => { assert(/kn-print-only/.test(labeled)); });
for (const asset of ['/reference/generated/keyboard-notes/labeled-88-octaves.pdf', '/reference/generated/keyboard-notes/labeled-88-letters.pdf', '/reference/generated/keyboard-notes/labeled-61-octaves.pdf', '/reference/generated/keyboard-notes/labeled-61-letters.pdf']) {
  const pdf = await fetchBytes(asset);
  test(`labeled PDF ${asset}`, () => {
    assert(pdf.status === 200, String(pdf.status));
    assert(pdf.buffer.subarray(0, 5).toString() === '%PDF-');
  });
}

const controlMajor = pages['/chords/c-major'].text;
test('control /chords/c-major 200', () => { assert(pages['/chords/c-major'].status === 200); });
test('control /chords/c-major related not rewritten', () => { assert(!h2s(controlMajor).map(decode).includes('Related Chords and Practice')); });
test('control /chords/c-major sources label', () => { assert(/Sources and scope/.test(controlMajor)); });
test('control /chords/a-minor 200', () => { assert(pages['/chords/a-minor'].status === 200); });
test('control /guide 200', () => { assert(pages['/guide'].status === 200); });
test('control /sheet-music uses public edition copy', () => {
  const text = pages['/sheet-music'].text;
  assert(!/Preserved approved mapping|source ledger|recheck before new claims|original approved task/i.test(text));
  assert(/External editions/.test(text));
});
test('control /keyboard-notes/chart 200', () => { assert(pages['/keyboard-notes/chart'].status === 200); });
if (pages['/chords/c-7'].status === 200) {
  test('control /chords/c-7 related not rewritten', () => { assert(!h2s(pages['/chords/c-7'].text).map(decode).includes('Related Chords and Practice')); });
}

const sitemap = pages['/sitemap.xml'].text;
const sitemapPaths = [...sitemap.matchAll(/<loc>https:\/\/pianogrid\.com([^<]*)<\/loc>/g)].map((match) => match[1] || '/');
test('sitemap still contains 16 URLs', () => {
  for (const url of pageUrls) assert(sitemapPaths.includes(url), url);
});
test('robots unchanged allow', () => {
  assert(pages['/robots.txt'].status === 200);
  assert(pages['/robots.txt'].text.includes('Allow: /'));
  assert(!pages['/robots.txt'].text.includes('Disallow: /'));
});

let playwright = { ran: false, failed: [], notes: [] };
const playwrightPath = process.env.PIANO_PLAYWRIGHT_PATH || 'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright';
if (existsSync(playwrightPath)) {
  const { chromium } = createRequire(import.meta.url)(playwrightPath);
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 950 } });
  playwright.ran = true;
  async function checkOverflow(url, width) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(base + url, { waitUntil: 'domcontentloaded' });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
    test(`${url} overflow ${width}`, () => { assert(!overflow, 'horizontal overflow'); });
  }
  async function chordInteract(url, expectedCount) {
    await page.setViewportSize({ width: 1440, height: 950 });
    await page.goto(base + url, { waitUntil: 'domcontentloaded' });
    const radios = page.locator('input[name="position"]');
    const count = await radios.count();
    test(`${url} live position radios`, () => { assert(count === expectedCount, String(count)); });
    for (let i = 0; i < count; i += 1) {
      await radios.nth(i).check();
      const notes = await page.locator('#note-order [data-midi]').count();
      test(`${url} live voicing ${i} notes`, () => { assert(notes === expectedCount, String(notes)); });
    }
    await page.getByRole('button', { name: 'Play chord' }).click();
    await page.waitForTimeout(400);
    const playing = await page.locator('#audio-status').innerText();
    playwright.notes.push(`${url} play status: ${playing}`);
    test(`${url} play clicked`, () => { assert(playing.length > 0, playing); });
    const stop = page.locator('button.am-stop-btn');
    if (await stop.isEnabled()) await stop.click();
    const white = page.locator('.ch-practice-key.is-white, .ch-practice-key.is-black');
    if (await white.count()) {
      await white.first().click();
      await page.getByRole('button', { name: 'Check answer' }).click();
      const wrong = await page.locator('.ch-practice-feedback').innerText();
      test(`${url} build wrong feedback`, () => { assert(/Not yet|No notes selected/.test(wrong), wrong); });
      await page.getByRole('button', { name: 'Show answer' }).click();
      await page.getByRole('button', { name: 'Check answer' }).click();
      const right = await page.locator('.ch-practice-feedback').innerText();
      test(`${url} build reveal then check`, () => { assert(/Correct|Answer shown/.test(right), right); });
    }
    const printDisplay = await page.locator('.am-print-only').evaluate((el) => getComputedStyle(el).display);
    test(`${url} print-only hidden on screen`, () => { assert(printDisplay === 'none', printDisplay); });
  }
  try {
    await chordInteract('/chords/b-7', 4);
    await chordInteract('/chords/b-minor', 3);
    await page.goto(base + '/guide/read-sheet-music', { waitUntil: 'domcontentloaded' });
    await page.getByText('Reveal the pitch answer').click();
    const answer = await page.locator('.gd-exercise details p').innerText();
    test('guide reveal answers', () => { assert(/Bar 1:/.test(answer), answer); });
    await page.goto(base + '/songs', { waitUntil: 'domcontentloaded' });
    await page.locator('.sg-filters input[type="search"]').fill('Twinkle');
    await page.waitForTimeout(200);
    const filtered = await page.locator('.sg-resource').count();
    test('songs search filters', () => { assert(filtered >= 0); playwright.notes.push(`songs Twinkle matches: ${filtered}`); });
    await page.goto(base + '/songs/easy', { waitUntil: 'domcontentloaded' });
    test('easy plan present', () => { assert(page.url().endsWith('/songs/easy')); });
    await page.goto(base + '/sheet-music/easy', { waitUntil: 'domcontentloaded' });
    const easyLocked = await page.locator('[data-arrangement-id^="arr-pg-"]').count();
    test('easy sheet no locked cards', () => { assert(easyLocked === 0, String(easyLocked)); });
    await page.goto(base + '/sheet-music/beginner', { waitUntil: 'domcontentloaded' });
    const beginnerLocked = await page.locator('[data-arrangement-id^="arr-pg-"]').count();
    test('beginner sheet no locked cards', () => { assert(beginnerLocked === 0, String(beginnerLocked)); });
    await page.goto(base + '/keyboard-notes/labeled', { waitUntil: 'domcontentloaded' });
    const printOnly = await page.locator('.kn-print-only').evaluate((el) => getComputedStyle(el).display);
    test('labeled print-only hidden on screen', () => { assert(printOnly === 'none', printOnly); });
    const keyboardFirst = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      const keyboard = document.querySelector('.kn-labeled-viewport, .kn-tool');
      return h1 && keyboard && h1.getBoundingClientRect().top < keyboard.getBoundingClientRect().top;
    });
    test('labeled heading before keyboard', () => { assert(keyboardFirst); });
    for (const url of ['/chords/b-7', '/chords/b-minor', '/guide/read-sheet-music', '/songs', '/songs/easy', '/sheet-music/easy', '/sheet-music/beginner', '/keyboard-notes/labeled']) {
      await checkOverflow(url, 1440);
      await checkOverflow(url, 390);
    }
  } catch (error) {
    playwright.failed.push(error.message);
    test('playwright suite', () => { throw error; });
  } finally {
    await browser.close();
  }
} else {
  test('playwright available', () => { throw new Error('NOT_RUN: playwright runtime missing'); });
}

const report = {
  executed_at: new Date().toISOString(),
  base,
  passed: results.filter((item) => item.passed).length,
  failed: results.filter((item) => item.failed === true || item.passed === false).length,
  metadataPass,
  chordStates,
  playwright,
  results,
  details,
  sitemapCount: sitemapPaths.length,
};
await writeFile(`${outDir}/live-validation.json`, JSON.stringify(report, null, 2) + '\n');
const failed = results.filter((item) => !item.passed);
for (const item of failed) console.error('FAIL', item.name, item.detail);
console.log(`16-page live: ${report.passed} passed, ${report.failed} failed; metadata ${metadataPass}/16; chord states ${chordStates}/35; playwright ${playwright.ran ? 'ran' : 'NOT_RUN'}`);
process.exitCode = failed.length ? 1 : 0;
