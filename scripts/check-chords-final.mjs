import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';

const { chromium } = createRequire(import.meta.url)(process.env.PIANO_PLAYWRIGHT_PATH || 'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base = process.env.PIANO_BASE_URL || 'http://127.0.0.1:3000';
const out = process.env.PIANO_CHECK_OUT || 'checks/final-chords';
await mkdir(`${out}/screenshots`, { recursive: true });
const seo = JSON.parse(await readFile('docs/pianogrid-chords-content-next/01_planning/url-seo-keywords.master.json', 'utf8'));
const master = JSON.parse(await readFile('docs/content/site-master/page-content.master.json', 'utf8'));
const planned = seo.pages.map(page => page.url);
const expectedPublic = ['/', '/tools', '/chords', '/chords/a-minor', '/chords/a-major', '/chords/c-major', '/chords/g-major', '/chords/c-minor', '/chords/e-major', '/chords/b-major', '/chords/a-flat-major', '/chords/c-flat-major', '/chords/by-key', '/chords/finder', '/chord-progressions', '/keyboard-notes', '/keyboard-notes/labeled', '/keyboard-notes/chart', '/keyboard-notes/finger-numbers', '/scales', '/scales/c-major', '/scales/a-minor', '/songs', '/songs/easy', '/guide', '/guide/read-sheet-music', '/guide/piano-chords', '/tools/blank-sheet-music'];
const details = ['/chords/a-minor', '/chords/a-major', '/chords/c-major', '/chords/g-major', '/chords/c-minor', '/chords/e-major', '/chords/b-major', '/chords/a-flat-major', '/chords/c-flat-major'];
const progressionDetails = ['/chords/a-minor', '/chords/a-major', '/chords/c-major', '/chords/g-major', '/chords/e-major', '/chords/b-major'];
const results = [], runtimeErrors = [];
const check = (name, passed, detail = '') => { results.push({ name, passed: Boolean(passed), detail }); if (!passed) console.error('FAIL', name, detail); };
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
page.on('pageerror', error => runtimeErrors.push(error.message));

try {
  check('Planning contains exactly 15 chord-system URLs', planned.length === 15 && new Set(planned).size === 15, planned);
  const published = [], deferred = [];
  for (const record of seo.pages) {
    const response = await page.goto(base + record.url);
    const html = await response.text();
    (response.status() === 200 ? published : deferred).push(record.url);
    check(`${record.url} HTTP 200`, response.status() === 200, response.status());
    check(`${record.url} title`, await page.title() === record.title, await page.title());
    check(`${record.url} description`, await page.locator('meta[name="description"]').getAttribute('content') === record.description);
    check(`${record.url} H1`, (await page.locator('h1').allTextContents()).join('').trim() === record.h1, await page.locator('h1').allTextContents());
    check(`${record.url} canonical`, await page.locator('link[rel="canonical"]').getAttribute('href') === record.canonical);
    const robots = (await page.locator('meta[name="robots"]').getAttribute('content')) || '';
    check(`${record.url} index/follow`, robots.includes('index') && robots.includes('follow') && !robots.includes('noindex') && !robots.includes('nofollow'), robots);
    check(`${record.url} no meta keywords`, await page.locator('meta[name="keywords"]').count() === 0);
    check(`${record.url} one breadcrumb`, await page.locator('nav[aria-label="breadcrumb"]').count() === 1);
    const firstBlock = master.pages[record.url].blocks[0];
    check(`${record.url} core copy in initial HTML`, html.includes(record.h1) && (html.includes(firstBlock.heading) || html.includes(firstBlock.body)));
  }

  const sitemapResponse = await page.request.get(base + '/sitemap.xml');
  const sitemapText = await sitemapResponse.text();
  const sitemapPaths = [...sitemapText.matchAll(/<loc>https:\/\/pianogrid\.com([^<]*)<\/loc>/g)].map(match => match[1] || '/');
  check('Sitemap contains exactly the 28 published routes', JSON.stringify([...sitemapPaths].sort()) === JSON.stringify([...expectedPublic].sort()), sitemapPaths);
  check('All 15 planned URLs are in sitemap', planned.every(url => sitemapPaths.includes(url)));
  const finalScope = sitemapPaths.filter(url => url.startsWith('/chord') || ['/guide/piano-chords', '/keyboard-notes/finger-numbers'].includes(url));
  check('No unexpected chord-system URL is published', finalScope.every(url => planned.includes(url)), finalScope.filter(url => !planned.includes(url)));

  const hrefs = new Set();
  for (const url of planned) {
    await page.goto(base + url);
    for (const href of await page.locator('main a[href]').evaluateAll(nodes => nodes.map(node => node.getAttribute('href')))) if (href?.startsWith('/')) hrefs.add(href.split('#')[0]);
  }
  for (const href of hrefs) check(`Internal link resolves ${href}`, (await page.request.get(base + href)).status() === 200);

  await page.goto(base + '/chords');
  check('Hub exposes 19 chord objects', await page.locator('.ch-result').count() === 19);
  check('Hub links nine published details', await page.locator('.ch-result a[href^="/chords/"]').count() === 9);
  check('Hub links finder, by-key and progressions', (await Promise.all(['/chords/finder', '/chords/by-key', '/chord-progressions'].map(href => page.locator(`main a[href="${href}"]`).count()))).every(count => count > 0));
  for (const url of details) {
    await page.goto(base + url);
    check(`${url} links to hub`, await page.locator('main a[href="/chords"]').count() > 0);
    check(`${url} links to by-key`, await page.locator('main a[href="/chords/by-key"]').count() > 0);
    check(`${url} progression relationship is scoped`, (await page.locator('main a[href="/chord-progressions"]').count() > 0) === progressionDetails.includes(url));
  }
  await page.goto(base + '/guide/piano-chords');
  const guideLinkCounts = await Promise.all(['/chords', '/chords/c-major', '/chords/a-minor', '/chords/g-major', '/chord-progressions', '/keyboard-notes/finger-numbers'].map(href => page.locator(`main a[href="${href}"]`).count()));
  check('Guide links chord tools and finger reference', guideLinkCounts.every(count => count > 0), guideLinkCounts);
  await page.goto(base + '/keyboard-notes/finger-numbers');
  check('Finger-number page links worked chord examples', (await Promise.all(['/chords/c-major', '/chords/a-minor'].map(href => page.locator(`main a[href="${href}"]`).count()))).every(count => count > 0));
  await page.goto(base + '/chords/by-key');
  check('By-key links details and progressions', await page.locator('.bk-table-scroll a[href^="/chords/"]').count() > 0 && await page.locator('main a[href="/chord-progressions"]').count() > 0);
  await page.goto(base + '/chord-progressions');
  check('Progressions link by-key and published details', await page.locator('main a[href="/chords/by-key"]').count() > 0 && await page.locator('.pg-symbol a[href^="/chords/"]').count() > 0);

  const nojs = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 1100, height: 900 } });
  const finderRaw = await nojs.goto(base + '/chords/finder');
  const finderHTML = await finderRaw.text();
  check('Finder server HTML includes tool and seven explanatory modules', finderRaw.status() === 200 && finderHTML.includes('Choose the keys you are playing') && await nojs.locator('.sp-reading .am-content-section').count() === 7);
  check('Finder server HTML states bounded vocabulary', finderHTML.includes('19-chord major/minor triad catalogue') && finderHTML.includes('does not guess sixth, seventh, incomplete or extended chords'));
  await nojs.close();

  await page.goto(base + '/chords/finder');
  const key = pc => page.locator(`.fd-key[data-pitch-class="${pc}"]`);
  for (const pc of [0, 4, 7]) await key(pc).click();
  check('Finder exact C-major lookup', await page.locator('.fd-candidates [data-chord-id="c-major"]').count() === 1 && await page.locator('.fd-candidates [data-chord-id="c-major"]').getAttribute('data-match') === 'exact');
  check('Finder published detail link', await page.locator('.fd-candidates [data-chord-id="c-major"] a[href="/chords/c-major"]').count() === 1);
  await page.locator('#finder-bass').selectOption('4');
  check('Finder inversion-equivalent lookup', await page.locator('.fd-candidates [data-chord-id="c-major"]').getAttribute('data-match') === 'inversion' && (await page.locator('.fd-candidates [data-chord-id="c-major"] h4').textContent()) === 'C/E');
  await page.getByRole('button', { name: 'Clear', exact: true }).click();
  check('Finder clear/reset', await page.locator('.fd-result').getAttribute('data-result-state') === 'empty' && await page.locator('.fd-key[aria-pressed="true"]').count() === 0);
  for (const pc of [0, 1, 2]) await key(pc).click();
  check('Finder no-result state', await page.locator('.fd-result').getAttribute('data-result-state') === 'none' && (await page.locator('.fd-state').innerText()).includes('No supported match confirmed'));
  await page.getByRole('button', { name: 'Clear', exact: true }).click();
  for (const pc of [0, 5, 9]) await key(pc).click();
  check('Finder unpublished candidate has no dead link', await page.locator('.fd-candidates [data-chord-id="f-major"]').count() === 1 && await page.locator('.fd-candidates [data-chord-id="f-major"] a').count() === 0 && await page.locator('.fd-candidates [data-chord-id="f-major"] .fd-no-link').count() === 1);
  const finderText = await page.locator('main').innerText();
  check('Finder explicitly limits MIDI, microphone and performance input', /not microphone recognition, MIDI capture or a measurement of timing and technique/i.test(finderText));
  await page.setViewportSize({ width: 1440, height: 1000 }); await page.screenshot({ path: `${out}/screenshots/finder-1440.png`, fullPage: true });
  await page.setViewportSize({ width: 390, height: 900 }); check('Finder mobile has no overflow', await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)); await page.screenshot({ path: `${out}/screenshots/finder-390.png`, fullPage: true });

  await page.setViewportSize({ width: 1440, height: 1000 }); await page.goto(base + '/chords/c-flat-major');
  check('C-flat written spelling is preserved', await page.locator('h1').textContent() === 'C-flat Major Piano Chord (C♭)' && (await page.locator('.am-tone-list').innerText()).replaceAll(/\s/g, '') === 'C♭–E♭–G♭');
  check('C-flat has three synchronized positions', await page.locator('.am-position-fieldset input').count() === 3 && await page.locator('.am-inversion-table tbody tr').count() === 3);
  check('C-flat root keyboard mapping', JSON.stringify(await page.locator('#keyboard-scroll .am-key.am-is-selected').evaluateAll(nodes => nodes.map(node => Number(node.getAttribute('data-midi'))))) === JSON.stringify([59, 63, 66]));
  check('C-flat root white-key label stays C-flat4', await page.locator('#keyboard-scroll .am-key-label.am-is-selected[data-midi="59"]').textContent() === 'C♭4');
  await page.locator('input[value="c-flat-major--first"]').check();
  check('C-flat first inversion updates notes, bass and keyboard', (await page.locator('#note-order').innerText()).replaceAll(/\s/g, '') === 'E♭4–G♭4–C♭5' && await page.locator('#current-bass').textContent() === 'E♭4' && JSON.stringify(await page.locator('#keyboard-scroll .am-key.am-is-selected').evaluateAll(nodes => nodes.map(node => Number(node.getAttribute('data-midi'))))) === JSON.stringify([63, 66, 71]));
  check('C-flat has no invented fingering', await page.locator('.ch-finger-map,.ch-hand-switch').count() === 0 && (await page.locator('[data-block-id="c-flat-major-fingering-example"]').innerText()).includes('No verified hand-number examples are currently provided'));
  const audioButton = page.getByRole('button', { name: 'Play chord', exact: true }); await audioButton.click(); await page.waitForFunction(() => document.querySelector('.am-tool')?.getAttribute('data-audio-state') === 'playing');
  check('C-flat audio follows selected inversion', await page.locator('.am-tool').getAttribute('data-voicing-id') === 'c-flat-major--first');
  await page.getByRole('button', { name: 'Stop', exact: true }).click();
  const pdfResponse = await page.request.get(base + '/reference/assets/chord-c-flat-major.pdf');
  const sourcePDF = await readFile('docs/pianogrid-chords-content-next/05_assets/chord-c-flat-major.pdf');
  const publicPDF = Buffer.from(await pdfResponse.body());
  check('C-flat PDF is present and byte-identical', pdfResponse.status() === 200 && createHash('sha256').update(sourcePDF).digest('hex') === createHash('sha256').update(publicPDF).digest('hex'));
  check('C-flat print snapshot uses written spelling', (await page.locator('.am-print-only').innerText()).includes('C♭') && !(await page.locator('.am-print-title').textContent()).includes('B Major'));
  await page.screenshot({ path: `${out}/screenshots/c-flat-major-1440.png`, fullPage: true });
  await page.setViewportSize({ width: 390, height: 900 }); check('C-flat mobile has no overflow', await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)); await page.screenshot({ path: `${out}/screenshots/c-flat-major-390.png`, fullPage: true });
  check('No runtime or hydration errors', runtimeErrors.length === 0, runtimeErrors);

  const report = { executed_at: new Date().toISOString(), passed: results.filter(item => item.passed).length, failed: results.filter(item => !item.passed).length, urlAudit: { planned, published, deferred, sitemap: sitemapPaths, unexpected: finalScope.filter(url => !planned.includes(url)) }, results };
  await writeFile(`${out}/validation.json`, JSON.stringify(report, null, 2) + '\n');
  console.log(`Final chords: ${report.passed} passed, ${report.failed} failed.`);
  process.exitCode = report.failed ? 1 : 0;
} finally {
  await browser.close();
}
