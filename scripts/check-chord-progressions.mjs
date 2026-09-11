import fs from 'node:fs';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';

const { chromium } = createRequire(import.meta.url)(process.env.PIANO_PLAYWRIGHT_PATH || 'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base = process.env.PIANO_BASE_URL || 'http://127.0.0.1:3000';
const out = process.env.PIANO_CHECK_OUT || 'docs/pianogrid-chords-content-next/09_codex-results/latest/chord-progressions';
fs.mkdirSync(`${out}/screenshots`, { recursive: true });
const master = JSON.parse(fs.readFileSync('docs/content/site-master/page-content.master.json', 'utf8'));
const merge = JSON.parse(fs.readFileSync('docs/pianogrid-chords-content-next/02_content/support.merge.json', 'utf8')).pages['/chord-progressions'];
const modules = JSON.parse(fs.readFileSync('docs/pianogrid-chords-content-next/02_content/support.modules.json', 'utf8'))['/chord-progressions'];
const seo = JSON.parse(fs.readFileSync('docs/pianogrid-chords-content-next/01_planning/url-seo-keywords.master.json', 'utf8')).pages.find(page => page.url === '/chord-progressions');
const keywords = JSON.parse(fs.readFileSync('docs/pianogrid-chords-content-next/01_planning/keyword-task-map.json', 'utf8')).rows.filter(row => row.url === '/chord-progressions');
const links = JSON.parse(fs.readFileSync('docs/pianogrid-chords-content-next/01_planning/internal-links.json', 'utf8')).edges;
const component = fs.readFileSync('src/components/support/progression-experience.tsx', 'utf8');
const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');
const plain = value => value.replaceAll('’', "'").replaceAll('–', '-').replace(/\s+/g, ' ').trim();
const display = value => value.replaceAll('#', '♯').replaceAll('b', '♭');
const target = href => href.split('#')[0];
const patterns = [['I','V','vi','IV'],['I','IV','V','I'],['ii','V','I'],['vi','IV','I','V'],['I','vi','IV','V']];
const keys = master.pages['/chords/by-key'].data.keys.filter(key => key.key.endsWith('major'));
const publishedDetails = new Set(['/chords/a-minor','/chords/a-major','/chords/c-major','/chords/g-major','/chords/c-minor','/chords/e-major','/chords/b-major','/chords/a-flat-major']);
const results = [], errors = [];
function check(name, passed, detail = '') { results.push({ name, passed: Boolean(passed), detail }); if (!passed) console.error('FAIL', name, detail); }

check('Integrated page object matches support.merge.json', hash(master.pages['/chord-progressions']) === hash(merge));
check('Planning contains primary and variant keywords', keywords.some(row => row.role === 'primary' && row.keyword === seo.primary_keyword_original) && keywords.length === seo.keyword_variants_original.length, keywords.length);
check('Runtime maps shared chord rows instead of defining chord-note copies', component.includes('keyTable.chords.find') && !/notes\s*:\s*\[/.test(component) && !/symbol\s*:\s*['"]/.test(component));
check('Six verified major-key tables are available', keys.length === 6 && keys.every(key => key.evidence_status.includes('formula crosscheck passed') && key.chords.length === 7));
check('Prepared source progressions contain no fingering claims', merge.data.progressions.every(item => item.bars.every(bar => bar.fingering === null)));

const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const nojs = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } });
  const response = await nojs.goto(base + '/chord-progressions');
  const raw = await response.text(), body = plain(await nojs.locator('body').innerText());
  fs.writeFileSync(`${out}/raw.html`, raw);
  check('HTTP 200 with planned TDK H1 and canonical', response.status() === 200 && await nojs.title() === seo.title && await nojs.locator('meta[name=description]').getAttribute('content') === seo.description && await nojs.locator('link[rel=canonical]').getAttribute('href') === seo.canonical && plain(await nojs.locator('h1').innerText()) === plain(seo.h1));
  check('No meta keywords tag', await nojs.locator('meta[name=keywords]').count() === 0);
  check('Server HTML contains all six keys and thirty pattern maps', raw.includes('<h1') && !raw.includes('BAILOUT_TO_CLIENT_SIDE_RENDERING') && await nojs.locator('.pg-key-panel').count() === 6 && await nojs.locator('.pg-pattern').count() === 30);
  check('No-JS fallback exposes every key panel', await nojs.locator('.pg-key-panel[hidden]').count() === 0);
  check('Four required patterns plus preserved source pattern are present', patterns.every(pattern => nojs.locator(`[data-pattern="${pattern.join('-')}"]`).count()));
  for (const key of keys) {
    const panel = nojs.locator(`.pg-key-panel[data-key="${key.key}"]`);
    for (const pattern of patterns) {
      const card = panel.locator(`[data-pattern="${pattern.join('-')}"]`);
      const expected = pattern.map(roman => key.chords.find(chord => chord.roman === roman));
      check(`${key.key} ${pattern.join('–')} maps shared symbols and notes`, expected.every(Boolean) && JSON.stringify(await card.locator('.pg-symbol').evaluateAll(items => items.map(item => item.textContent.replace('Chord symbol', '').replace(/\s+/g, ' ').trim()))) === JSON.stringify(expected.map(chord => display(chord.symbol))) && JSON.stringify(await card.locator('.pg-notes').evaluateAll(items => items.map(item => item.textContent.replace('Chord notes', '').replace(/\s+/g, ' ').trim()))) === JSON.stringify(expected.map(chord => display(chord.notes.join(' · ')))));
    }
  }
  check('Key Roman numeral chord symbol and chord notes are explicitly labeled', JSON.stringify(await nojs.locator('.pg-terms dt').allTextContents()) === JSON.stringify(['Key','Roman numeral','Chord symbol','Chord notes']));
  check('Practice guidance has no invented fingering', await nojs.locator('.pg-pattern footer').count() === 30 && await nojs.getByText('No fingering is assigned by this progression.', { exact: true }).count() === 30 && !/finger\s*[1-5]|[1-5]\s*[-–]\s*[1-5]/i.test(body));
  const expectedOriginal = merge.blocks.map(block => plain(block.body.replace('The printable includes all three keys and every chord’s notes.', 'The preserved source data includes all three keys and every chord’s notes.')));
  check('All correct original blocks remain', merge.blocks.every(block => body.includes(plain(block.heading))) && expectedOriginal.every(text => body.includes(text)));
  check('All prepared module headings remain', modules.supplemental_blocks.every(block => body.includes(plain(block.content.heading))));
  check('Missing progression PDF is not exposed', !raw.includes('chord-progressions-c-e-a.pdf') && await nojs.locator('a[download]').count() === 0 && await nojs.locator('img').count() === 0);
  const hrefs = await nojs.locator('a').evaluateAll(items => items.map(item => item.getAttribute('href')));
  check('Required chord chart by-key and guide links are present', ['/chords','/chords/by-key','/guide/piano-chords'].every(href => hrefs.includes(href)));
  const chordLinks = await nojs.locator('.pg-symbol a').evaluateAll(items => items.map(item => item.getAttribute('href')));
  check('Chord detail links target published pages only', chordLinks.length > 0 && chordLinks.every(href => publishedDetails.has(href)), [...new Set(chordLinks)]);
  check('Finder is available in chord navigation without an unrelated C-flat progression link', hrefs.includes('/chords/finder') && !hrefs.includes('/chords/c-flat-major'));
  check('No duplicate IDs', await nojs.evaluate(() => { const ids = [...document.querySelectorAll('[id]')].map(item => item.id); return ids.length === new Set(ids).size; }));
  for (const href of [...new Set(hrefs.filter(href => href?.startsWith('/')).map(target))]) {
    const linked = await nojs.request.get(base + href);
    check(`Linked target ${href} returns 200`, linked.status() === 200, linked.status());
  }
  await nojs.close();

  const page = await browser.newPage({ viewport: { width: 1440, height: 950 } });
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto(base + '/chord-progressions');
  await page.waitForFunction(() => document.querySelectorAll('.pg-key-panel:not([hidden])').length === 1);
  const select = page.getByLabel('Key', { exact: true });
  check('Initial selection is C major with five maps', await select.inputValue() === 'C major' && await page.locator('.pg-key-panel:visible .pg-pattern').count() === 5);
  for (const key of keys) {
    await select.selectOption(key.key);
    check(`Key switch maps ${key.key}`, await page.locator('.pg-key-panel:visible').getAttribute('data-key') === key.key && await page.locator('.pg-key-panel:visible .pg-pattern').count() === 5);
  }
  await select.selectOption('C major');
  await page.setViewportSize({ width: 1440, height: 950 });
  await page.screenshot({ path: `${out}/screenshots/chord-progressions-1440-c-major.png`, fullPage: true });
  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    check(`Responsive width ${width}`, await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), await page.evaluate(() => ({ innerWidth, scrollWidth: document.documentElement.scrollWidth })));
  }
  await select.selectOption('E major');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: `${out}/screenshots/chord-progressions-390-e-major.png`, fullPage: true });
  await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
  await page.waitForTimeout(100);
  check('200% text reflow', await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), await page.evaluate(() => ({ innerWidth, scrollWidth: document.documentElement.scrollWidth })));
  check('No runtime or hydration errors', errors.length === 0, errors);
  const sitemap = await page.request.get(base + '/sitemap.xml'), xml = await sitemap.text();
  check('Sitemap has 28 routes and includes final chord routes', (xml.match(/<loc>/g) || []).length === 28 && ['/chord-progressions','/chords/finder','/chords/c-flat-major'].every(route => xml.includes(`https://pianogrid.com${route}</loc>`)));
  for (const route of ['/chords/finder','/chords/c-flat-major']) { const response = await page.request.get(base + route); check(`${route} is published`, response.status() === 200, response.status()); }
  for (const source of ['/chords','/chords/by-key','/guide/piano-chords']) {
    const sourcePage = await browser.newPage({ javaScriptEnabled: false }); await sourcePage.goto(base + source);
    check(`${source} exposes planned progression link`, await sourcePage.locator('a[href="/chord-progressions"]').count() > 0); await sourcePage.close();
  }
  await page.close();
} catch (error) { check('Progression validation runner completed', false, error.stack); }
finally {
  await browser.close();
  const report = { executed_at: new Date().toISOString(), base, passed: results.filter(item => item.passed).length, failed: results.filter(item => !item.passed).length, results, not_tested: ['named professional music review','real mobile or tablet device','named screen reader','physical printing'] };
  fs.writeFileSync(`${out}/validation.json`, JSON.stringify(report, null, 2) + '\n');
  console.log(`Chord progressions: ${report.passed} passed, ${report.failed} failed`);
  process.exitCode = report.failed ? 1 : 0;
}
