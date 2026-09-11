import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';

const { chromium } = createRequire(import.meta.url)(process.env.PIANO_PLAYWRIGHT_PATH || 'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base = process.env.PIANO_BASE_URL || 'http://127.0.0.1:3000';
const out = process.env.PIANO_SCALE_SAMPLE_OUT || 'checks/scales-sample';
const routes = ['/scales', '/scales/c-major', '/scales/a-minor'];
const results = [], errors = [];
const check = (name, passed, detail = '') => { results.push({ name, passed: Boolean(passed), detail }); if (!passed) console.error('FAIL', name, detail); };
await mkdir(`${out}/screenshots`, { recursive: true });
await mkdir(`${out}/html`, { recursive: true });
await mkdir(`${out}/print-pdfs`, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const slug = (route) => route === '/scales' ? 'scales' : route.slice(1).replaceAll('/', '-');

async function ready(page, route) {
  const response = await page.goto(base + route, { waitUntil: 'domcontentloaded', timeout: 60_000 });
  await page.waitForFunction(() => [...document.querySelectorAll('.sc-tool select')].every((select) => !select.disabled));
  return response;
}

try {
  for (const route of routes) {
    const nojs = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    const response = await nojs.goto(base + route);
    const raw = await response.text();
    await writeFile(`${out}/html/${slug(route)}-raw.html`, raw);
    await writeFile(`${out}/html/${slug(route)}-nojs-dom.html`, await nojs.content());
    const main = await nojs.locator('main').innerText();
    check(`${route} raw/noJS HTTP 200`, response.status() === 200, response.status());
    check(`${route} noJS default reference`, await nojs.locator('.sc-screen .sc-note-line').count() === 1 && /C.*D.*E.*F|A.*B.*C.*D/s.test(main));
    check(`${route} noJS staff and keyboard`, await nojs.locator('.kn-staff').count() >= 1 && await nojs.locator('.kn-keyboard').count() >= 1);
    check(`${route} noJS content/FAQ/sources/static answers`, await nojs.locator('[data-block-id]').count() >= 4 && await nojs.locator('#faq details').count() >= 4 && await nojs.locator('#sources').count() === 1 && await nojs.locator('.sc-static-answers details').count() >= 2);
    check(`${route} noJS interactive controls disabled`, await nojs.locator('.sc-tool select').first().isDisabled() && await nojs.getByRole('button', { name: 'Check answer', exact: true }).isDisabled());
    check(`${route} noJS real internal links`, await nojs.locator('a[href="/keyboard-notes/chart"],a[href="/guide/read-sheet-music"],a[href="/scales/c-major"],a[href="/scales/a-minor"]').count() >= 1);
    check(`${route} noJS no page overflow`, await nojs.evaluate(() => document.documentElement.scrollWidth <= innerWidth), await nojs.evaluate(() => `${document.documentElement.scrollWidth}/${innerWidth}`));
    await nojs.close();

    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    page.on('pageerror', (error) => errors.push(`${route}: ${error.message}`));
    await ready(page, route);
    const computed = await page.locator('.sc-tool').evaluate((element) => { const root = getComputedStyle(document.documentElement), body = getComputedStyle(document.body), tool = getComputedStyle(element), button = getComputedStyle(element.querySelector('.am-primary')); return { bodyBackground: body.backgroundColor, color: body.color, fontFamily: body.fontFamily, toolBackground: tool.backgroundColor, buttonBackground: button.backgroundColor, primaryToken: root.getPropertyValue('--primary').trim(), radius: tool.borderRadius, width: document.querySelector('main').getBoundingClientRect().width }; });
    check(`${route} current theme tokens`, computed.bodyBackground === 'rgb(255, 255, 255)' && computed.color === 'rgb(29, 29, 31)' && computed.toolBackground === 'rgb(246, 247, 249)' && ['#0066CC', '#06c'].includes(computed.primaryToken) && computed.fontFamily.includes('system-ui'), computed);
    await writeFile(`${out}/html/${slug(route)}-computed-style.json`, JSON.stringify(computed, null, 2));
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: width === 1440 ? 900 : 844 });
      await page.waitForTimeout(100);
      check(`${route} no page overflow ${width}`, await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), await page.evaluate(() => `${document.documentElement.scrollWidth}/${innerWidth}`));
      await page.screenshot({ path: `${out}/screenshots/${slug(route)}-${width}.png`, fullPage: true });
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
    check(`${route} 200% no page overflow`, await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), await page.evaluate(() => `${document.documentElement.scrollWidth}/${innerWidth}`));
    await page.screenshot({ path: `${out}/screenshots/${slug(route)}-text200.png`, fullPage: true });
    await page.close();
  }

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  page.on('pageerror', (error) => errors.push(`interaction: ${error.message}`));
  await ready(page, '/scales');
  check('Center retains 60 objects', await page.getByLabel('Scale type', { exact: true }).locator('option').count() === 4);
  let total = 0;
  for (const form of ['major', 'natural_minor', 'harmonic_minor', 'melodic_minor_classical']) { await page.getByLabel('Scale type', { exact: true }).selectOption(form); total += await page.getByLabel('Starting note', { exact: true }).locator('option').count(); }
  check('Center form tonic total is 60', total === 60, total);
  await page.getByLabel('Scale type', { exact: true }).selectOption('major'); await page.getByLabel('Starting note', { exact: true }).selectOption('C');
  check('Center defaults/returns C major RH ascending', await page.locator('.sc-tool').getAttribute('data-current-scale') === 'major:C' && await page.getByLabel('Hand', { exact: true }).inputValue() === 'RH' && await page.getByLabel('Direction', { exact: true }).inputValue() === 'ascending');

  await page.getByRole('button', { name: 'Check answer', exact: true }).click();
  check('Q1 empty feedback', await page.getByText('Choose at least one note, then check your answer.', { exact: true }).count() === 1);
  await page.locator('.sc-pitch-buttons button').nth(0).click(); await page.locator('.sc-pitch-buttons button').nth(1).click(); await page.getByRole('button', { name: 'Check answer', exact: true }).click();
  check('Q1 missing and extra feedback', /Missing:/.test(await page.locator('[data-quiz="note-set"] .sc-feedback').innerText()) && /Extra:/.test(await page.locator('[data-quiz="note-set"] .sc-feedback').innerText()));
  await page.screenshot({ path: `${out}/screenshots/state-q1-error.png`, fullPage: true });
  await page.getByRole('button', { name: 'Show answer', exact: true }).first().click();
  check('Q1 shown answer not counted', /not counted as a correct attempt/.test(await page.locator('[data-quiz="note-set"] .sc-feedback').innerText()));

  await page.getByLabel('Question type', { exact: true }).selectOption('order');
  for (const midi of [60, 62, 65, 64, 67, 69, 71, 72]) await page.locator(`[data-quiz="order"] button[data-midi="${midi}"]`).click();
  await page.getByRole('button', { name: 'Check order', exact: true }).click();
  check('Q2 first mismatch feedback', /first mismatch is at position 3/i.test(await page.locator('[data-quiz="order"] .sc-feedback').innerText()));
  await page.screenshot({ path: `${out}/screenshots/state-q2-mismatch.png`, fullPage: true });

  await ready(page, '/scales/a-minor');
  await page.getByLabel('Direction', { exact: true }).selectOption('descending');
  check('A natural descending RH fingering', JSON.stringify(await page.locator('[data-sequence="descending"] tr').nth(1).locator('td').allTextContents()) === JSON.stringify(['5','4','3','2','1','3','2','1']));
  await page.screenshot({ path: `${out}/screenshots/state-a-natural-descending.png`, fullPage: true });
  await page.getByLabel('Minor form', { exact: true }).selectOption('melodic_minor_classical');
  check('A classical descending is true direction and notes-only', (await page.locator('.sc-screen .sc-note-line').innerText()).includes('A – G – F – E') && await page.locator('.sc-screen [data-sequence="descending"] tr').count() === 1);
  await page.screenshot({ path: `${out}/screenshots/state-a-classical-descending-notes-only.png`, fullPage: true });
  await page.getByLabel('Question type', { exact: true }).selectOption('classical_descent');
  await page.locator('input[name="classical-descent"][value="reverse"]').check(); await page.getByRole('button', { name: 'Check answer', exact: true }).click();
  check('Q3 explains reverse-ascent distractor', /keeps the raised sixth and seventh/.test(await page.locator('[data-quiz="classical-descent"] .sc-feedback').innerText()));
  await page.screenshot({ path: `${out}/screenshots/state-q3-explanation.png`, fullPage: true });

  await page.getByLabel('Tempo BPM', { exact: true }).fill('120'); await page.getByLabel('Passes', { exact: true }).selectOption('2'); await page.getByRole('button', { name: 'Start practice' }).click(); await page.waitForTimeout(2200); await page.getByRole('button', { name: 'Pause', exact: true }).click();
  check('Follow-along pauses with resumable state', await page.locator('[data-practice-state="paused"]').count() === 1 && /new count-in/.test(await page.locator('#follow-along .sc-feedback').first().innerText()));
  await page.screenshot({ path: `${out}/screenshots/state-practice-paused.png`, fullPage: true });
  await page.getByLabel('Direction', { exact: true }).selectOption('up_down');
  check('Changing main setting cancels/remounts practice', await page.locator('[data-practice-state="idle"]').count() === 1);

  await page.getByLabel('Minor form', { exact: true }).selectOption('natural_minor'); await page.getByLabel('Direction', { exact: true }).selectOption('ascending');
  await page.evaluate(() => { window.__printScale = ''; window.print = () => { window.__printScale = document.querySelector('[data-print-scale]')?.getAttribute('data-print-scale') || ''; }; });
  await page.getByRole('button', { name: 'Print current scale' }).click();
  check('A print button snapshots current object', await page.evaluate(() => window.__printScale) === 'natural_minor:A');
  await page.getByLabel('Minor form', { exact: true }).selectOption('melodic_minor_classical'); await page.getByLabel('Direction', { exact: true }).selectOption('descending');
  await page.evaluate(() => window.dispatchEvent(new Event('beforeprint'))); await page.waitForTimeout(50);
  check('Native beforeprint refreshes current object', await page.locator('[data-print-scale]').getAttribute('data-print-scale') === 'melodic_minor_classical:A');
  await page.pdf({ path: `${out}/print-pdfs/a-minor-classical-descending-current.pdf`, format: 'Letter', printBackground: true, margin: { top: '14mm', bottom: '14mm', left: '14mm', right: '14mm' } });

  await ready(page, '/scales/c-major'); await page.evaluate(() => window.dispatchEvent(new Event('beforeprint'))); await page.waitForTimeout(50);
  await page.pdf({ path: `${out}/print-pdfs/c-major-current.pdf`, format: 'Letter', printBackground: true, margin: { top: '14mm', bottom: '14mm', left: '14mm', right: '14mm' } });
  check('C current print state', await page.locator('[data-print-scale]').getAttribute('data-print-scale') === 'major:C');

  for (const asset of ['/downloads/scales/pianogrid-scales-starter-reference.pdf', '/downloads/scales/pianogrid-scales-notes-check-worksheet.pdf']) { const response = await page.request.get(base + asset); check(`${asset} opens as PDF`, response.status() === 200 && (await response.body()).subarray(0, 4).toString() === '%PDF'); }
  check('No runtime page errors', errors.length === 0, errors);
  await page.close();
} catch (error) {
  check('Focused sample runner completed', false, error.stack);
} finally {
  await browser.close();
}

const report = { executed_at: new Date().toISOString(), base, passed: results.filter((item) => item.passed).length, failed: results.filter((item) => !item.passed).length, results, not_run: ['human listening', 'real iPhone or other physical mobile device', 'real screen reader', 'physical printing', 'PDF tag accessibility', 'independent piano educator review'] };
await writeFile(`${out}/validation.json`, JSON.stringify(report, null, 2) + '\n');
console.log(`Scale sample: ${report.passed} passed, ${report.failed} failed.`);
process.exitCode = report.failed ? 1 : 0;
