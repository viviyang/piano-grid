import fs from 'node:fs';
import { createRequire } from 'node:module';

const { chromium } = createRequire(import.meta.url)(process.env.PIANO_PLAYWRIGHT_PATH || 'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base = process.env.PIANO_BASE_URL || 'http://127.0.0.1:3047';
const out = process.env.PIANO_CHECK_OUT || 'checks/indexing-quality-v2';
fs.mkdirSync(`${out}/screenshots`, { recursive: true });
const results = [];
const check = (name, passed, detail = '') => {
  results.push({ name, passed: Boolean(passed), detail });
  if (!passed) console.error('FAIL', name, detail);
};
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const seven = {
  '/chords/by-key': 'The current tables cover 12 major and 12 natural-minor keys',
  '/guide/piano-chords': 'Start with four chords',
  '/chords/a-minor': 'The root-position example uses A3–C4–E4',
  '/chords/b-flat-major': 'Find B♭ immediately to the left of B',
  '/chords/e-flat-major': 'Find E♭ immediately to the left of E',
  '/chords/c-sharp-minor': 'The middle note is E, not E♯',
  '/chords/c-diminished': 'Keep C and E♭, then lower G to G♭',
};
try {
  const nojs = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 1365, height: 900 } });
  for (const [route, phrase] of Object.entries(seven)) {
    const response = await nojs.goto(base + route);
    const body = await nojs.locator('main').innerText();
    const canonical = await nojs.locator('link[rel=canonical]').getAttribute('href');
    const robots = await nojs.locator('meta[name=robots]').getAttribute('content');
    check(`${route} no-JS content, canonical and robots`, response.status() === 200 && body.includes(phrase) && canonical === `https://pianogrid.com${route}` && /index/i.test(robots || '') && !/noindex/i.test(robots || ''), { status: response.status(), phrase, canonical, robots });
  }
  await nojs.goto(base + '/chords/by-key');
  const byKey = await nojs.locator('.bk-table-scroll tbody tr').evaluateAll(rows => ({ total: rows.length, links: rows.filter(row => row.querySelector('a[href]')).length, linked: Object.fromEntries(['Bdim', 'D♭', 'B♭', 'C♯m'].map(symbol => { const row = rows.find(row => row.cells[2]?.textContent.trim() === symbol); return [symbol, row?.querySelector('a')?.getAttribute('href') || null]; })) }));
  check('By-key exact-spelling links and unlinked rows', byKey.total === 336 && byKey.links === 289 && byKey.linked.Bdim === '/chords/b-diminished' && byKey.linked['D♭'] === '/chords/d-flat-major' && byKey.linked['B♭'] === '/chords/b-flat-major' && byKey.linked['C♯m'] === '/chords/c-sharp-minor', byKey);
  for (const [route, count] of [['/chords/extended', 108], ['/chords/altered', 96]]) {
    await nojs.goto(base + route);
    const actual = await nojs.locator('.cc-row').count();
    const complete = await nojs.locator('.cc-row').evaluateAll(rows => rows.every(row => Boolean(row.querySelector('strong')?.textContent && row.querySelector('b')?.textContent && row.querySelectorAll('small')[1]?.textContent)));
    check(`${route} full reference index in no-JS HTML`, actual === count && complete, { actual, complete });
  }
  await nojs.close();

  const page = await browser.newPage({ viewport: { width: 1365, height: 900 } });
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  await page.goto(base + '/chords/c-major');
  const cMajorHeadings = await page.locator('main h2').evaluateAll(nodes => nodes.filter(node => node.textContent.trim() === 'What to notice').map(node => ({ visible: !!(node.offsetWidth || node.offsetHeight || node.getClientRects().length) })));
  const accessible = await page.locator('main').ariaSnapshot();
  check('C major duplicate-title candidate is hidden from screen and accessibility tree', cMajorHeadings.length === 2 && cMajorHeadings.filter(node => node.visible).length === 1 && (accessible.match(/heading "What to notice"/g) || []).length === 1, cMajorHeadings);

  for (const [route, expected] of [['/chords/diminished', 'C3–C6'], ['/chords/augmented', 'C3–C6'], ['/chords/suspended', 'C3–C6'], ['/chords/add', 'C3–E5']]) {
    await page.goto(base + route);
    const range = await page.locator('.ch-category-card .am-keyboard-scroll').first().evaluate(node => ({ aria: node.getAttribute('aria-label'), caption: node.closest('figure')?.querySelector('.am-range')?.textContent, first: node.querySelector('.am-key')?.getAttribute('data-midi'), last: [...node.querySelectorAll('.am-key')].at(-1)?.getAttribute('data-midi') }));
    check(`${route} visible and ARIA keyboard range matches drawn keys`, range.aria?.includes(expected) && range.caption === `Keyboard range: ${expected}` && range.first === '48' && range.last === (expected === 'C3–E5' ? '76' : '84'), range);
  }
  for (const [route, count] of [['/chords/extended', 108], ['/chords/altered', 96]]) {
    await page.goto(base + route);
    check(`${route} hydrated reference index remains complete`, await page.locator('.cc-row').count() === count && await page.locator('.cc-count').innerText() === `${count} references`);
  }
  await page.goto(base + '/chords/altered');
  const alteredLabels = await page.locator('.cc-filters select').last().locator('option').allTextContents();
  check('Altered type labels are readable', alteredLabels.some(label => label.includes('Dominant seventh, flat ninth')) && alteredLabels.every(label => !/Dominant7/.test(label)), alteredLabels);
  await page.goto(base + '/chords/by-key');
  const keySelect = page.getByLabel('Key', { exact: true });
  for (const [key, expectRow] of [['C major', 'Bdim'], ['D♭ major', 'D♭'], ['A natural minor', 'Em'], ['D natural minor', 'Am']]) {
    await keySelect.selectOption(key);
    const visible = page.locator('.bk-key-panel:visible');
    const text = await visible.innerText();
    check(`By-key selection ${key}`, await visible.count() === 1 && await visible.locator('tbody tr').count() === 14 && text.includes(expectRow), { expectRow });
  }
  await keySelect.selectOption('D natural minor');
  const minorFifth = await page.locator('.bk-key-panel:visible tbody tr').filter({ has: page.locator('td[data-label="Degree"]', { hasText: /^5$/ }) }).first().locator('td[data-label="Roman numeral"]').textContent();
  check('Natural-minor fifth stays minor v', minorFifth?.trim() === 'v', minorFifth);

  await page.goto(base + '/chord-progressions');
  for (const [id, symbols] of [['pop-four-c-major', ['C', 'G', 'Am', 'F']], ['pop-four-e-major', ['E', 'B', 'C♯m', 'A']], ['pop-four-a-major', ['A', 'E', 'F♯m', 'D']]]) {
    await page.locator('.pg-picker select').nth(1).selectOption(id);
    const panel = page.locator('.pg-key-panel:visible');
    const romans = await panel.locator('.pg-roman b').allTextContents();
    const qualities = await panel.locator('.pg-quality span').allTextContents();
    const actualSymbols = await panel.locator('.pg-symbol').evaluateAll(nodes => nodes.map(node => (node.querySelector('a,strong')?.textContent || '').trim()));
    check(`Progression ${id} numerals, quality and transposition`, JSON.stringify(romans) === JSON.stringify(['I', 'V', 'vi', 'IV']) && JSON.stringify(qualities) === JSON.stringify(['Major', 'Major', 'Minor', 'Major']) && JSON.stringify(actualSymbols) === JSON.stringify(symbols), { romans, qualities, actualSymbols });
  }

  for (const [slug, notes, bass] of [
    ['b-flat-major', ['D4', 'F4', 'B♭4'], 'D4'],
    ['e-flat-major', ['G4', 'B♭4', 'E♭5'], 'G4'],
    ['c-sharp-minor', ['E4', 'G♯4', 'C♯5'], 'E4'],
  ]) {
    await page.goto(base + '/chords/' + slug);
    await page.getByRole('radio', { name: 'First inversion' }).check();
    const currentNotes = await page.locator('#note-order .am-pitch').allTextContents();
    const currentBass = await page.locator('#current-bass').innerText();
    const selectedMidis = await page.locator('.am-key.am-is-selected').evaluateAll(nodes => nodes.map(node => Number(node.getAttribute('data-midi'))));
    check(`${slug} first inversion keeps notes, bass and diagram synchronized`, JSON.stringify(currentNotes) === JSON.stringify(notes) && currentBass === bass && new Set(selectedMidis).size === 3, { currentNotes, currentBass, selectedMidis });
    await page.getByRole('button', { name: 'Play chord', exact: true }).first().click();
    await page.locator('.am-tool[data-audio-state="playing"]').first().waitFor({ timeout: 3500 });
    await page.getByRole('button', { name: 'Stop', exact: true }).first().click();
    check(`${slug} audio plays selected inversion and stops`, await page.locator('.am-tool').first().getAttribute('data-audio-state') === 'stopped' && (await page.locator('#audio-status').first().innerText()).includes('stopped'));
  }
  for (const route of ['/chords/c-sus2', '/chords/c-diminished', '/chords/d-flat-diminished', '/chords/c-maj7', '/chords/c-add9']) {
    await page.goto(base + route);
    const sources = await page.locator('.ch-source-details').evaluateAll(nodes => nodes.map(node => { node.open = true; return node.innerText; }).join(' '));
    check(`${route} public sources match reader-facing claims`, sources.length > 0 && !/N2[A-D]-|competitor|source ledger|this package|Checked 2026/i.test(sources) && (route !== '/chords/c-sus2' || (/suspended|sus2/i.test(sources) && !/diminished|augmented/i.test(sources))), sources.slice(0, 450));
  }
  await page.goto(base + '/chord-progressions');
  const progressionLayout = await page.locator('.pg-picker').evaluate(node => {
    const labels = [...node.querySelectorAll('label')];
    const boxes = labels.map(label => label.getBoundingClientRect());
    const controls = labels.map(label => label.querySelector('select,input')?.getBoundingClientRect());
    return {
      labels: labels.length,
      controlsUnderLabels: controls.every((box, index) => box && box.top >= boxes[index].top + 12 && box.left >= boxes[index].left - 1 && box.right <= boxes[index].right + 1),
      noOverlap: boxes.every((box, index) => boxes.slice(index + 1).every(other => box.right <= other.left || other.right <= box.left || box.bottom <= other.top || other.bottom <= box.top)),
      tempoWidth: controls[2]?.width,
    };
  });
  check('Progression controls align without overlap', progressionLayout.labels === 4 && progressionLayout.controlsUnderLabels && progressionLayout.noOverlap && progressionLayout.tempoWidth > 120, progressionLayout);
  await page.locator('.pg-picker').scrollIntoViewIfNeeded();
  await page.screenshot({ path: `${out}/screenshots/progression-controls-desktop.png` });
  await page.goto(base + '/chords/altered');
  const alteredLayout = await page.evaluate(() => {
    const links = [...document.querySelectorAll('.cc-toc a')].map(link => link.getBoundingClientRect());
    const type = document.querySelector('.cc-filters label:nth-child(3) select')?.getBoundingClientRect();
    const clear = document.querySelector('.cc-filters button')?.getBoundingClientRect();
    return {
      links: links.length,
      linksSeparated: links.every((box, index) => index === 0 || box.top > links[index - 1].top || box.left >= links[index - 1].right + 8),
      controlsSeparated: Boolean(type && clear && (type.right <= clear.left || clear.right <= type.left || type.bottom <= clear.top || clear.bottom <= type.top)),
    };
  });
  check('Altered contents and filters do not collide', alteredLayout.links >= 6 && alteredLayout.linksSeparated && alteredLayout.controlsSeparated, alteredLayout);
  await page.screenshot({ path: `${out}/screenshots/altered-filters-desktop.png` });
  await page.goto(base + '/guide/piano-chords');
  const guideHeadings = await page.locator('.sp-reading > section > h2').allTextContents();
  check('Guide has one ordered beginner path and retained advanced topics', ['Start with four chords', 'Read notes before finger numbers', 'Use a fingering only for its stated example', 'Move one note, then name the bass', 'Try one chord change', 'What to learn next'].every((heading, index) => guideHeadings[index] === heading) && guideHeadings.includes('Add a seventh without changing its name') && guideHeadings.includes('Read the changed degree'), guideHeadings);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: `${out}/screenshots/guide-mobile.png`, fullPage: true });
  check('Guide mobile document fits viewport', await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), await page.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth })));
  await page.goto(base + '/chords/b-flat-major');
  await page.screenshot({ path: `${out}/screenshots/b-flat-major-mobile.png`, fullPage: true });
  check('Chord detail mobile document fits viewport', await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), await page.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth })));
  check('No browser page errors', pageErrors.length === 0, pageErrors);
  await page.close();
} catch (error) {
  check('Browser audit completed', false, error.stack || String(error));
} finally {
  await browser.close();
}
const report = { environment: 'LOCAL_BUILD', base, passed: results.filter(item => item.passed).length, failed: results.filter(item => !item.passed).length, results, manual_gates: ['real mobile device', 'screen reader', 'professional music-theory review', 'acoustic listening and print review'] };
fs.writeFileSync(`${out}/browser-evidence.json`, JSON.stringify(report, null, 2) + '\n');
console.log(`Indexing-quality browser checks: ${report.passed} passed, ${report.failed} failed`);
if (report.failed) process.exitCode = 1;
