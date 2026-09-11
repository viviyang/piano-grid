import fs from 'node:fs';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';

const { chromium } = createRequire(import.meta.url)(process.env.PIANO_PLAYWRIGHT_PATH || 'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base = process.env.PIANO_BASE_URL || 'http://127.0.0.1:3000';
const out = process.env.PIANO_CHECK_OUT || 'docs/pianogrid-chords-content-next/09_codex-results/latest/by-key';
fs.mkdirSync(`${out}/screenshots`, { recursive: true });
const master = JSON.parse(fs.readFileSync('docs/content/site-master/page-content.master.json', 'utf8'));
const merge = JSON.parse(fs.readFileSync('docs/pianogrid-chords-content-next/02_content/support.merge.json', 'utf8')).pages['/chords/by-key'];
const modules = JSON.parse(fs.readFileSync('docs/pianogrid-chords-content-next/02_content/support.modules.json', 'utf8'))['/chords/by-key'];
const seo = JSON.parse(fs.readFileSync('docs/pianogrid-chords-content-next/01_planning/url-seo-keywords.master.json', 'utf8')).pages.find(page => page.url === '/chords/by-key');
const keywordRows = JSON.parse(fs.readFileSync('docs/pianogrid-chords-content-next/01_planning/keyword-task-map.json', 'utf8')).rows.filter(row => row.url === '/chords/by-key');
const links = JSON.parse(fs.readFileSync('docs/pianogrid-chords-content-next/01_planning/internal-links.json', 'utf8')).edges;
const publishedDetails = new Set(['/chords/a-minor','/chords/a-major','/chords/c-major','/chords/g-major','/chords/c-minor','/chords/e-major','/chords/b-major','/chords/a-flat-major','/chords/c-flat-major','/chords/f-major','/chords/d-minor','/chords/e-minor','/chords/d-major','/chords/b-minor','/chords/f-sharp-minor','/chords/c-sharp-minor','/chords/g-sharp-minor','/chords/b-flat-major','/chords/g-minor','/chords/d-flat-major','/chords/e-flat-major','/chords/f-sharp-major','/chords/f-minor','/chords/b-flat-minor','/chords/e-flat-minor']);
const results = [], errors = [];
const hash = value => crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex');
const display = value => value.replaceAll('#', '♯').replaceAll('b', '♭');
const plain = value => value.replaceAll('’', "'").replaceAll('–', '-').replace(/\s+/g, ' ').trim();
const noteSlug = note => note.replace('#', '-sharp').replace('b', '-flat').toLowerCase();
const detailURL = chord => ['major', 'minor'].includes(chord.quality) ? `/chords/${noteSlug(chord.notes[0])}-${chord.quality}` : null;
function check(name, passed, detail = '') { results.push({ name, passed: Boolean(passed), detail }); if (!passed) console.error('FAIL', name, detail); }

check('Integrated page object matches support.merge.json', hash(master.pages['/chords/by-key']) === hash(merge));
check('Planning has primary and variant keyword rows', keywordRows.some(row => row.role === 'primary' && row.keyword === seo.primary_keyword_original) && keywordRows.length > 1, keywordRows.length);
check('Prepared data has seven keys and 49 rows', merge.data.keys.length === 7 && merge.data.keys.reduce((sum, key) => sum + key.chords.length, 0) === 49);
check('No prepared chord row supplies fingering', merge.data.keys.every(key => key.chords.every(chord => chord.fingering === null)));

const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const nojs = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } });
  const response = await nojs.goto(base + '/chords/by-key');
  const raw = await response.text();
  fs.writeFileSync(`${out}/by-key-raw.html`, raw);
  const body = plain(await nojs.locator('body').textContent());
  check('HTTP 200 and exact planned TDK/H1/canonical', response.status() === 200 && await nojs.title() === seo.title && await nojs.locator('meta[name="description"]').getAttribute('content') === seo.description && await nojs.locator('link[rel="canonical"]').getAttribute('href') === seo.canonical && plain(await nojs.locator('h1').innerText()) === plain(seo.h1));
  check('No meta keywords tag', await nojs.locator('meta[name="keywords"]').count() === 0);
  check('Server HTML contains all 49 rows and seven tables', (raw.match(/data-degree=/g) || []).length === 49 && await nojs.locator('.bk-key-panel').count() === 7 && await nojs.locator('.bk-table-scroll tbody tr').count() === 49);
  check('No-JS fallback exposes all seven tables', await nojs.locator('.bk-key-panel:visible').count() === 7);
  check('All original blocks remain', merge.blocks.every(block => body.includes(plain(block.heading)) && body.includes(plain(block.body))), merge.blocks.map(block => block.heading));
  const moduleText = modules.supplemental_blocks.flatMap(block => [block.content.heading, ...block.content.paragraphs, ...block.content.steps, ...(block.content.table?.rows.flat() || [])]);
  check('All prepared module copy is rendered', moduleText.every(text => body.includes(plain(text))));
  check('Four terms are explicitly separated', JSON.stringify(await nojs.locator('.bk-terms dt').allTextContents()) === JSON.stringify(['Key', 'Root note', 'Chord quality', 'Roman numeral']));
  check('D natural minor and raised-leading-tone options are separate', body.includes('D natural minor') && await nojs.locator('[data-key="D minor"] .bk-altered article').count() === 2 && body.includes('These use C♯ and do not replace the D natural minor rows above.'));
  check('Every row says no fingering is assigned', await nojs.getByText('No fingering assigned', { exact: true }).count() === 49);
  const expectedLinkedRows = merge.data.keys.flatMap(key => key.chords.map(chord => detailURL(chord))).filter(url => publishedDetails.has(url));
  const rowHrefs = await nojs.locator('.bk-table-scroll tbody a').evaluateAll(nodes => nodes.map(node => node.getAttribute('href')));
  check('Rows link exactly when a published detail exists', rowHrefs.length === expectedLinkedRows.length && expectedLinkedRows.every((url, index) => rowHrefs[index] === url), { expected: expectedLinkedRows.length, actual: rowHrefs.length });
  check('No row links to unpublished detail', rowHrefs.every(href => publishedDetails.has(href)), rowHrefs);
  const pageHrefs = await nojs.locator('a').evaluateAll(nodes => nodes.map(node => node.getAttribute('href')));
  check('Planned chart and C-major scale links are present', ['/chords', '/scales/c-major'].every(href => pageHrefs.includes(href)));
  check('Progression and finder navigation links are present without an unrelated C-flat table link', pageHrefs.includes('/chord-progressions') && pageHrefs.includes('/chords/finder') && !pageHrefs.includes('/chords/c-flat-major'));
  check('No duplicate IDs or image requests', await nojs.evaluate(() => { const ids = [...document.querySelectorAll('[id]')].map(node => node.id); return ids.length === new Set(ids).size; }) && await nojs.locator('img').count() === 0);
  for (const href of [...new Set(pageHrefs.filter(href => href?.startsWith('/')).map(href => href.split('#')[0]))]) {
    const linked = await nojs.request.get(base + href);
    check(`Linked target ${href} returns 200`, linked.status() === 200, linked.status());
  }
  await nojs.close();

  const page = await browser.newPage({ viewport: { width: 1440, height: 950 } });
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto(base + '/chords/by-key');
  await page.waitForFunction(() => document.querySelectorAll('.bk-key-panel:not([hidden])').length === 1);
  const select = page.getByLabel('Key', { exact: true });
  check('Initial selection is C major with one visible table', await select.inputValue() === 'C major' && await page.locator('.bk-key-panel:visible').count() === 1 && await page.locator('.bk-key-panel:visible').getAttribute('data-key') === 'C major');
  for (const key of merge.data.supported_keys) {
    await select.selectOption(key);
    const panel = page.locator('.bk-key-panel:visible');
    check(`Selection shows ${key}`, await panel.count() === 1 && await panel.getAttribute('data-key') === key && await panel.locator('tbody tr').count() === 7);
  }
  await select.selectOption('C major');
  await page.screenshot({ path: `${out}/screenshots/by-key-1440-c-major.png`, fullPage: true });
  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    check(`Responsive width ${width}`, await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), await page.evaluate(() => ({ innerWidth, scrollWidth: document.documentElement.scrollWidth })));
  }
  await select.selectOption('D minor');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: `${out}/screenshots/by-key-390-d-minor.png`, fullPage: true });
  await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
  await page.waitForTimeout(100);
  check('200% text reflow', await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), await page.evaluate(() => ({ innerWidth, scrollWidth: document.documentElement.scrollWidth })));
  check('No runtime or hydration errors', errors.length === 0, errors);

  const sitemap = await page.request.get(base + '/sitemap.xml');
  const xml = await sitemap.text();
  check('Sitemap has 46 routes and includes chord tools', (xml.match(/<loc>/g) || []).length === 46 && ['/chords/by-key','/chord-progressions','/chords/finder','/chords/c-flat-major','/chords/major','/chords/minor'].every(route => xml.includes(`https://pianogrid.com${route}</loc>`)), (xml.match(/<loc>/g) || []).length);
  for (const route of ['/chords/finder', '/chords/c-flat-major']) {
    const result = await page.request.get(base + route);
    check(`${route} is published`, result.status() === 200, result.status());
  }
  const inbound = links.filter(edge => edge.to === '/chords/by-key' && ['/chords', '/chords/a-minor', '/chords/c-major', '/chords/g-major', '/chords/e-major', '/chords/b-major', '/chords/a-major'].includes(edge.from));
  for (const source of [...new Set(inbound.map(edge => edge.from))]) {
    const sourcePage = await browser.newPage({ javaScriptEnabled: false });
    await sourcePage.goto(base + source);
    const hrefs = await sourcePage.locator('a').evaluateAll(nodes => nodes.map(node => node.getAttribute('href')));
    check(`${source} has planned by-key link`, inbound.filter(edge => edge.from === source).every(edge => hrefs.includes(edge.href)));
    await sourcePage.close();
  }
  await page.close();
} catch (error) {
  check('By-key browser runner completed', false, error.stack);
} finally {
  await browser.close();
}

const report = { executed_at: new Date().toISOString(), base, passed: results.filter(result => result.passed).length, failed: results.filter(result => !result.passed).length, results, not_tested: ['real mobile/tablet device', 'screen reader', 'independent music-theory review'] };
fs.writeFileSync(`${out}/validation.json`, JSON.stringify(report, null, 2) + '\n');
console.log(`By-key: ${report.passed} passed, ${report.failed} failed`);
process.exitCode = report.failed ? 1 : 0;
