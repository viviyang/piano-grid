import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const { chromium } = createRequire(import.meta.url)(process.env.PIANO_PLAYWRIGHT_PATH || 'playwright');
const base = process.env.PIANO_BASE_URL || 'http://localhost:3117';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
const githubRequests = [];
page.on('pageerror', error => errors.push(error.message));
page.on('request', request => { if (new URL(request.url()).hostname.endsWith('github.com')) githubRequests.push(request.url()); });

try {
  if (process.env.PIANO_FEEDBACK_EXPECT_DISABLED === '1') {
    for (const route of ['/', '/chords/c-major', '/tools']) {
      await page.goto(base + route);
      assert.equal(await page.getByRole('button', { name: 'Feedback', exact: true }).count(), 0);
      assert.equal(await page.getByRole('heading', { name: 'Was this page helpful?' }).count(), 0);
    }
    console.log('Feedback disabled-state browser checks passed.');
  } else {
  await page.goto(base + '/');
  await page.waitForTimeout(500);
  const footer = page.locator('.ph-footer');
  assert.equal(await footer.getByRole('button', { name: 'Feedback' }).count(), 1);
  await footer.getByRole('button', { name: 'Feedback' }).click();
  const dialog = page.getByRole('dialog');
  await dialog.waitFor({ state: 'visible' });
  assert.equal(await dialog.getByRole('heading', { name: 'Help us improve PianoGrid' }).count(), 1);
  assert.equal((await dialog.innerText()).includes('GitHub'), false);
  await page.keyboard.press('Escape');
  await dialog.waitFor({ state: 'hidden' });
  await page.waitForFunction(() => document.activeElement === document.querySelector('.ph-footer .fb-footer-link'));

  await page.goto(base + '/chords/c-major');
  await page.waitForTimeout(500);
  assert.equal(await page.getByRole('heading', { name: 'Was this page helpful?' }).count(), 1);
  await page.getByRole('button', { name: 'Yes', exact: true }).click();
  assert.equal(await page.getByRole('status').filter({ hasText: 'Thanks for answering.' }).count(), 1);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base + '/tools');
  await page.waitForTimeout(500);
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await page.locator('.site-mobile-nav').getByRole('button', { name: 'Feedback' }).click();
  await page.getByRole('dialog').waitFor({ state: 'visible' });
  assert.equal(await page.locator('.site-mobile-nav').isVisible(), false);
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => document.activeElement === document.querySelector('.site-menu-button'));

  const failedMessage = 'Please keep this message after a network failure.';
  await page.locator('.am-site-footer').getByRole('button', { name: 'Feedback' }).click();
  await page.getByRole('dialog').waitFor({ state: 'visible' });
  await page.getByRole('radio', { name: 'I have an idea' }).check();
  await page.getByRole('textbox', { name: 'Tell us more' }).fill(failedMessage);
  await page.route('**/api/feedback', route => route.abort('failed'));
  await page.getByRole('button', { name: 'Send feedback' }).click();
  await page.getByRole('alert').filter({ hasText: 'Please try again.' }).waitFor();
  assert.equal(await page.getByRole('textbox', { name: 'Tell us more' }).inputValue(), failedMessage);
  await page.unroute('**/api/feedback');

  if (process.env.PIANO_FEEDBACK_LIVE === '1') {
    if (process.env.PIANO_FEEDBACK_LIVE_PAGE_ONLY !== '1') {
      await page.getByRole('textbox', { name: 'Tell us more' }).fill('Local feedback integration test. No user data.');
      await page.getByRole('button', { name: 'Send feedback' }).click();
      await page.getByRole('status').filter({ hasText: 'Thanks — this helps us improve PianoGrid.' }).waitFor();
    }
    await page.goto(base + '/chords/c-major');
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'Not really' }).click();
    await page.getByRole('radio', { name: 'Something looks incorrect' }).check();
    await page.getByRole('textbox', { name: 'Tell us more' }).fill('Local content-error integration test. No user data.');
    await page.getByRole('button', { name: 'Send', exact: true }).click();
    await page.getByRole('status').filter({ hasText: 'Thanks — this helps us improve PianoGrid.' }).waitFor();
  }

  assert.deepEqual(errors, []);
  assert.deepEqual(githubRequests, []);
  console.log(`Feedback browser checks passed (${process.env.PIANO_FEEDBACK_LIVE === '1' ? 'live submission' : 'UI only'}).`);
  }
} finally {
  await browser.close();
}
