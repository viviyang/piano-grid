import fs from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const { chromium } = createRequire(import.meta.url)(process.env.PIANO_PLAYWRIGHT_PATH || 'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base = process.env.PIANO_BASE_URL || 'http://127.0.0.1:3132';
const outDir = resolve(root, 'docs/seo/chords/evidence-2026-09-18/task-12');
const shotDir = resolve(outDir, 'screenshots');
fs.mkdirSync(shotDir, { recursive: true });

const results = [];
const check = (name, passed, detail = '') => {
  results.push({ name, passed: Boolean(passed), detail: detail == null ? '' : String(detail) });
  console.log(passed ? 'PASS' : 'FAIL', name, detail || '');
};

const structure = [
  '/chords',
  '/chords/major',
  '/chords/minor',
  '/chords/diminished',
  '/chords/augmented',
  '/chords/suspended',
  '/chords/seventh',
  '/chords/add',
  '/chords/extended',
  '/chords/altered',
  '/chords/finder',
  '/chords/by-key',
  '/chord-progressions',
];
const details = [
  '/chords/b-minor',
  '/chords/d-minor',
  '/chords/c-maj7',
  '/chords/c-7',
  '/chords/b-7',
  '/chords/c-m7',
  '/chords/c-add9',
  '/chords/c-diminished',
  '/chords/a-sus2',
  '/chords/a-sus4',
  '/chords/b-diminished',
  '/chords/f-add9',
  '/chords/c-augmented',
  '/chords/c-madd9',
  '/chords/d-flat-m7-flat5',
  '/chords/f-sharp-madd9',
  '/chords/a-flat-madd9',
  '/chords/b-flat-madd9',
  '/chords/d-flat-madd9',
  '/chords/c-major',
  '/chords/a-minor',
  '/chords/c-sus2',
  '/chords/c-sus4',
  '/chords/g-major',
  '/chords/e-flat-minor',
];
const viewports = [
  { name: 'desktop-1440', width: 1440, height: 900 },
  { name: 'mobile-390', width: 390, height: 844 },
];

async function overflow(page) {
  return page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
}

const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    page.setDefaultTimeout(20000);

    for (const url of structure) {
      const response = await page.goto(base + url, { waitUntil: 'domcontentloaded', timeout: 60000 });
      check(`${vp.name} ${url} 200`, response?.status() === 200, String(response?.status()));
      const delta = await overflow(page);
      check(`${vp.name} ${url} no horizontal overflow`, delta <= 1, 'delta=' + delta);
      check(`${vp.name} ${url} has h1`, ((await page.locator('h1').first().textContent()) || '').trim().length > 0);
      await page.screenshot({ path: resolve(shotDir, `${url.replaceAll('/', '_')}-${vp.name}.png`) });
    }

    await page.goto(base + '/chords', { waitUntil: 'networkidle', timeout: 120000 });
    const search = page.locator('#full-library input[type="search"]');
    check(`${vp.name} hub library search exists`, await search.count() > 0);
    const queries = [
      { q: 'Bb', expect: '/chords/b-flat-major' },
      { q: 'Cmadd9', expect: '/chords/c-madd9' },
      { q: 'Bm', expect: '/chords/b-minor' },
    ];
    for (const item of queries) {
      await search.fill('');
      await search.fill(item.q);
      const hit = page.locator(`#full-library a[href="${item.expect}"]`);
      check(`${vp.name} hub search ${item.q} -> ${item.expect}`, await hit.isVisible(), item.q);
    }

    if (vp.name === 'desktop-1440') {
      await page.locator('#browse-by-type a[href="/chords/minor"]').first().click();
      await page.waitForURL(/\/chords\/minor/);
      check('desktop hub to minor', page.url().includes('/chords/minor'));
      const rootChip = page.getByRole('button', { name: 'B', exact: true });
      if (await rootChip.count()) {
        await rootChip.click();
        check('minor family root filter B keeps B minor card', await page.locator('main a[href="/chords/b-minor"]').first().isVisible());
      }
      await page.locator('main a[href="/chords/b-minor"]').first().click();
      await page.waitForURL(/\/chords\/b-minor/);
      check('desktop family to B minor', page.url().includes('/chords/b-minor'));
      const relatedFamily = page.locator('main a[href="/chords/minor"]');
      check('B minor returns to minor family', await relatedFamily.count() > 0);
    }

    await page.goto(base + '/chords/finder', { waitUntil: 'domcontentloaded', timeout: 60000 });
    check(`${vp.name} finder empty state`, await page.locator('.fd-state').first().isVisible());
    await page.locator('button.fd-white[data-pitch-class="0"]').click();
    check(`${vp.name} finder incomplete after one note`, (await page.locator('[data-result-state]').getAttribute('data-result-state')) === 'incomplete');
    await page.locator('button.fd-white[data-pitch-class="4"]').click();
    await page.locator('button.fd-white[data-pitch-class="7"]').click();
    const finderState = await page.locator('[data-result-state]').getAttribute('data-result-state');
    check(`${vp.name} finder C-E-G yields matches`, finderState === 'matches', finderState);
    await page.locator('button.fd-white[data-pitch-class="2"]').click();
    const noneOrMatch = await page.locator('[data-result-state]').getAttribute('data-result-state');
    check(`${vp.name} finder extra note still a defined state`, noneOrMatch === 'none' || noneOrMatch === 'matches', noneOrMatch);
    await page.getByRole('button', { name: 'Clear' }).click();
    check(`${vp.name} finder clear returns empty`, (await page.locator('[data-result-state]').getAttribute('data-result-state')) === 'empty');

    await page.goto(base + '/chords/by-key', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.locator('#by-key-select').selectOption({ label: 'G major' }).catch(() => page.locator('#by-key-select').selectOption('G major'));
    const gLink = page.locator('section[data-key="G major"] a').first();
    check(`${vp.name} by-key G major table has chord links`, await gLink.count() > 0);

    await page.goto(base + '/chord-progressions', { waitUntil: 'domcontentloaded', timeout: 60000 });
    const play = page.getByRole('button', { name: 'Play' });
    const stop = page.getByRole('button', { name: 'Stop' });
    check(`${vp.name} progressions play exists`, await play.count() > 0);
    await play.click();
    await page.waitForTimeout(400);
    check(`${vp.name} progressions stop remains usable`, await stop.isEnabled());
    await stop.click();

    for (const url of details) {
      const response = await page.goto(base + url, { waitUntil: 'domcontentloaded', timeout: 60000 });
      check(`${vp.name} ${url} 200`, response?.status() === 200, String(response?.status()));
      const delta = await overflow(page);
      check(`${vp.name} ${url} no horizontal overflow`, delta <= 1, 'delta=' + delta);
      const tones = ((await page.locator('.am-tone-list').first().textContent()) || '').replace(/\s+/g, '');
      check(`${vp.name} ${url} tones visible`, tones.length >= 3, tones);
      const radios = page.locator('.am-radio-label input, .am-positions input[type="radio"]');
      if (await radios.count() > 1) {
        const before = tones;
        await radios.nth(1).check({ force: true }).catch(() => radios.nth(1).click({ force: true }));
        const after = ((await page.locator('.am-tone-list').first().textContent()) || '').replace(/\s+/g, '');
        check(`${vp.name} ${url} inversion keeps same chord-tone letters`, after.replace(/\d+/g, '') === before.replace(/\d+/g, ''), `${before} -> ${after}`);
      }
    }

    await page.close();
  }
} finally {
  await browser.close();
}

fs.writeFileSync(resolve(outDir, '_browser.json'), JSON.stringify({
  base,
  generatedAt: new Date().toISOString(),
  failed: results.filter((item) => !item.passed),
  results,
}, null, 2) + '\n');

const failed = results.filter((item) => !item.passed);
if (failed.length) {
  console.error(failed);
  process.exit(1);
}
console.log(JSON.stringify({ ok: true, checks: results.length }, null, 2));
