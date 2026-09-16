import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PIANO_PLAYWRIGHT_PATH || 'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base = process.env.PIANO_BASE_URL || 'http://localhost:3116';
const out = 'docs/product-upgrade/b05-b07-v2/delivery/b05';
await mkdir(`${out}/screenshots`, { recursive: true });
const results = [];
const errors = [];
const check = (name, passed, detail = '') => { results.push({ name, passed: Boolean(passed), detail }); if (!passed) console.error('FAIL', name, detail); };
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
page.on('pageerror', (error) => errors.push(error.message));

try {
  await page.goto(`${base}/songs/easy`);
  check('easy h1', await page.locator('h1').innerText() === 'Easy Piano Songs for Beginners');
  check('three edition cards', await page.locator('.pg-edition-card').count() === 3);
  check('twinkle plan CTA', await page.locator('[data-edition-key="twinkle"] .am-primary').getAttribute('href') === '#first-10-minutes');
  check('hot cross goes to sheet', (await page.locator('[data-edition-key="hot-cross-buns"] a.am-secondary').getAttribute('href')) === '/sheet-music/hot-cross-buns');
  check('ode goes to sheet', (await page.locator('[data-edition-key="ode-to-joy"] a.am-secondary').getAttribute('href')) === '/sheet-music/ode-to-joy');
  check('paid access visible', (await page.locator('[data-edition-key="ode-to-joy"]').innerText()).includes('Paid or membership'));
  check('free form access visible', (await page.locator('[data-edition-key="twinkle"]').innerText()).includes('email or sign-in'));
  check('existing featured chooser remains', await page.locator('.sg-easy-chooser .sg-resource').count() === 9);
  check('catalog remains', await page.locator('.sg-catalog tbody tr').count() === 50);
  check('no hosted player', await page.locator('audio,video,[data-player],.ss-player').count() === 0);
  check('all five steps in SSR', await page.locator('#first-10-minutes .pg-all-steps li').count() === 5);
  await page.screenshot({ path: `${out}/screenshots/easy-cards-1440.png`, fullPage: true });

  await page.getByRole('button', { name: 'Start the plan' }).click();
  check('start opens step 1', await page.locator('#pg-active-title').innerText() === 'Get the right edition');
  check('start does not auto-check', await page.locator('.pg-selfcheck input').isChecked() === false);
  await page.screenshot({ path: `${out}/screenshots/plan-step1-1440.png`, fullPage: true });

  await page.getByRole('button', { name: 'Next step' }).click();
  check('step 2 title', await page.locator('#pg-active-title').innerText() === 'Find the starting position');
  await page.screenshot({ path: `${out}/screenshots/plan-step2-1440.png`, fullPage: true });
  for (let i = 0; i < 3; i += 1) await page.getByRole('button', { name: 'Next step' }).click();
  check('step 5 without checks', await page.locator('#pg-active-title').innerText() === 'Choose what to revisit');
  check('still 0 checks after skip', await page.locator('.pg-selfcheck input').isChecked() === false);
  await page.screenshot({ path: `${out}/screenshots/plan-step5-1440.png`, fullPage: true });
  await page.getByRole('button', { name: 'Finish this check-in' }).click();
  check('finish 0 marked', (await page.locator('.pg-count').innerText()).includes('0 of 5'));
  await page.screenshot({ path: `${out}/screenshots/plan-finished-0-1440.png`, fullPage: true });

  await page.locator('.pg-plan-head').getByRole('button', { name: 'Share this plan' }).click();
  const shareURL = await page.locator('.kn-share-dialog textarea, .kn-share-panel').evaluate(() => document.querySelector('.kn-share-dialog')?.innerText || '');
  check('share dialog open', await page.locator('.kn-share-dialog').evaluate((node) => node.open === true));
  check('share URL has plan only', shareURL.includes('plan=twinkle-early-elementary') && shareURL.includes('plan-v=1') && !shareURL.includes('selfChecked'));
  await page.screenshot({ path: `${out}/screenshots/plan-share-1440.png` });
  await page.getByRole('button', { name: 'Close' }).click();

  await page.goto(`${base}/songs/easy?plan=unknown&plan-v=1#first-10-minutes`);
  check('unknown plan unavailable', (await page.locator('#first-10-minutes').innerText()).includes('This plan version is unavailable'));
  await page.screenshot({ path: `${out}/screenshots/plan-expired-1440.png`, fullPage: true });

  await page.goto(`${base}/songs/easy?plan=twinkle-early-elementary&plan-v=1#first-10-minutes`);
  check('shared landing copy', (await page.locator('.pg-shared-intro').innerText()).includes('No one else’s check-ins'));

  await page.goto(`${base}/sheet-music/twinkle-twinkle-little-star`);
  check('twinkle provider CTA', await page.getByRole('link', { name: /Open on Hoffman Academy/ }).getAttribute('href') === 'https://www.hoffmanacademy.com/store/sheet-music/twinkle-twinkle-little-star-early-elementary-version');
  check('twinkle plan link', await page.getByRole('link', { name: /Start this edition’s 10-minute plan/ }).getAttribute('href') === '/songs/easy#first-10-minutes');
  check('twinkle no player', await page.locator('audio,video,.ss-player').count() === 0);
  await page.screenshot({ path: `${out}/screenshots/sheet-twinkle-1440.png`, fullPage: true });

  await page.goto(`${base}/sheet-music/hot-cross-buns`);
  check('hcb compare link', await page.getByRole('link', { name: 'Compare beginner editions' }).getAttribute('href') === '/songs/easy');
  await page.goto(`${base}/sheet-music/ode-to-joy`);
  check('ode compare link', await page.getByRole('link', { name: 'Compare beginner editions' }).getAttribute('href') === '/songs/easy');

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${base}/songs/easy`);
  await page.evaluate(() => sessionStorage.clear());
  await page.reload();
  await page.getByRole('button', { name: 'Start the plan' }).waitFor();
  check('mobile no overflow 390', await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
  await page.screenshot({ path: `${out}/screenshots/easy-cards-390.png`, fullPage: true });
  await page.getByRole('button', { name: 'Start the plan' }).click();
  check('mobile step 1', await page.locator('#pg-active-title').innerText() === 'Get the right edition');
  await page.screenshot({ path: `${out}/screenshots/plan-step1-390.png`, fullPage: true });
  await page.setViewportSize({ width: 320, height: 740 });
  check('mobile no overflow 320', await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));

  const nojs = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 1440, height: 1000 } });
  await nojs.goto(`${base}/songs/easy`);
  check('nojs five steps readable', await nojs.locator('#first-10-minutes .pg-all-steps li').count() === 5);
  check('nojs provider href', (await nojs.locator('#first-10-minutes a[href*="hoffmanacademy.com"]').first().getAttribute('href'))?.includes('twinkle-twinkle-little-star-early-elementary-version') === true);
  await nojs.close();

  for (const url of ['/songs', '/tools/hear-the-difference', '/keyboard-notes']) {
    check(`${url} still 200`, (await page.request.get(base + url)).status() === 200);
  }
  check('No runtime errors', errors.length === 0, errors.join('\n'));
} catch (error) {
  check('B05 browser runner completed', false, error.stack);
} finally {
  await browser.close();
  const report = { executed_at: new Date().toISOString(), passed: results.filter((item) => item.passed).length, failed: results.filter((item) => !item.passed).length, results, errors };
  await writeFile(`${out}/browser-results.json`, JSON.stringify(report, null, 2));
  console.log(`B05 browser: ${report.passed} passed / ${report.failed} failed`);
  process.exitCode = report.failed ? 1 : 0;
}
