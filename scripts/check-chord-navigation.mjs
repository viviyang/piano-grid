import fs from 'node:fs';
import { createRequire } from 'node:module';

const { chromium } = createRequire(import.meta.url)(process.env.PIANO_PLAYWRIGHT_PATH || 'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base = process.env.PIANO_BASE_URL || 'http://127.0.0.1:3101';
const out = process.env.PIANO_CHECK_OUT || 'checks/chord-navigation';
fs.mkdirSync(`${out}/screenshots`, { recursive: true });

const results = [];
const runtimeErrors = [];
const check = (name, passed, detail = '') => {
  results.push({ name, passed: Boolean(passed), detail });
  if (!passed) console.error('FAIL', name, detail);
};
const same = (actual, expected) => JSON.stringify(actual) === JSON.stringify(expected);
const moveTo = async (page, locator) => {
  const box = await locator.boundingBox();
  if (!box) throw new Error('Cannot hover an element without a bounding box');
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 12 });
};

const majorRoutes = ['/chords/c-major', '/chords/d-flat-major', '/chords/d-major', '/chords/e-flat-major', '/chords/e-major', '/chords/f-major', '/chords/f-sharp-major', '/chords/g-major', '/chords/a-flat-major', '/chords/a-major', '/chords/b-flat-major', '/chords/b-major'];
const minorRoutes = ['/chords/c-minor', '/chords/c-sharp-minor', '/chords/d-minor', '/chords/e-flat-minor', '/chords/e-minor', '/chords/f-minor', '/chords/f-sharp-minor', '/chords/g-minor', '/chords/g-sharp-minor', '/chords/a-minor', '/chords/b-flat-minor', '/chords/b-minor'];
const moreRoutes = ['/chords/seventh', '/chords/diminished', '/chords/augmented', '/chords/suspended', '/chords/add', '/chords/extended', '/chords/altered'];
const browser = await chromium.launch({ channel: 'chrome', headless: true });

try {
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  desktop.on('pageerror', error => runtimeErrors.push(error.message));
  desktop.on('console', message => { if (message.type() === 'error') runtimeErrors.push(message.text()); });
  const response = await desktop.goto(`${base}/chords`, { waitUntil: 'networkidle', timeout: 120000 });
  check('Desktop page responds', response?.status() === 200, response?.status());
  const topLabels = await desktop.locator('.site-nav-desktop .site-nav-parent-link').allTextContents();
  check('Other header sections stay present', same(topLabels, ['Keyboard Notes', 'Chords', 'Scales', 'Songs', 'Guide', 'Tools']), topLabels);

  const chords = desktop.locator('.site-nav-group').filter({ has: desktop.locator('.site-nav-parent-link[href="/chords"]') });
  await desktop.waitForTimeout(700);
  await chords.locator('.site-nav-parent-link').focus();
  await desktop.waitForTimeout(120);
  check('Desktop focus opens Chords', await chords.locator('.site-nav-panel-chords').isVisible());
  const compactPanelBox = await chords.locator('.site-nav-panel-chords').boundingBox();
  const introBox = await chords.locator('.site-nav-panel-intro').boundingBox();
  check('Chords panel stays compact before a third level opens', Boolean(compactPanelBox && compactPanelBox.width <= 460), compactPanelBox);
  check('Chords overview column has the wider measure', Boolean(introBox && introBox.width >= 149.5), introBox);
  await desktop.screenshot({ path: `${out}/screenshots/chords-navigation-compact-1440.png`, fullPage: false });
  const major = chords.locator('.site-nav-chord-item').nth(0);
  check('Major parent is a category link', await major.locator('.site-nav-chord-parent-link').getAttribute('href') === '/chords/major');
  await moveTo(desktop, major);
  await desktop.waitForTimeout(120);
  const majorPanel = major.locator('.site-nav-third-panel');
  check('Major hover opens third level', await majorPanel.isVisible());
  const expandedPanelBox = await chords.locator('.site-nav-panel-chords').boundingBox();
  check('Chords panel expands only for third-level content', Boolean(expandedPanelBox && compactPanelBox && expandedPanelBox.width > compactPanelBox.width + 250), { compactPanelBox, expandedPanelBox });
  check('Major lists twelve published roots', same(await majorPanel.locator('.site-nav-third-link').evaluateAll(nodes => nodes.map(node => node.getAttribute('href'))), majorRoutes));
  check('Major uses two columns', (await majorPanel.locator('.site-nav-third-links').evaluate(element => getComputedStyle(element).gridTemplateColumns.split(' ').length)) === 2);
  check('Third level uses the outer menu surface', await majorPanel.evaluate(element => {
    const style = getComputedStyle(element);
    return style.backgroundColor === 'rgba(0, 0, 0, 0)' && style.boxShadow === 'none' && style.borderTopWidth === '0px';
  }));
  await moveTo(desktop, majorPanel.locator('.site-nav-third-link').first());
  await desktop.waitForTimeout(120);
  check('Hover stays open inside third level', await majorPanel.isVisible());
  await desktop.screenshot({ path: `${out}/screenshots/chords-navigation-major-1440.png`, fullPage: false });

  await moveTo(desktop, chords.locator('.site-nav-chord-direct-groups .site-nav-child-link').first());
  await desktop.waitForTimeout(120);
  check('Moving to a lower second-level item closes third level', await majorPanel.isHidden());

  await major.locator('.site-nav-chord-parent-link').focus();
  check('Major focus opens third level', await majorPanel.isVisible());
  const majorToggle = major.locator('.site-nav-chord-submenu-trigger');
  await majorToggle.focus();
  await desktop.keyboard.press('Escape');
  check('Escape closes third level', await majorPanel.isHidden());
  check('Escape restores submenu trigger focus', await majorToggle.evaluate(element => element === document.activeElement));
  await desktop.keyboard.press('Enter');
  check('Keyboard Enter opens third level', await majorPanel.isVisible());

  const minor = chords.locator('.site-nav-chord-item').nth(1);
  await moveTo(desktop, minor);
  await desktop.waitForTimeout(120);
  const minorPanel = minor.locator('.site-nav-third-panel');
  check('Minor parent is a category link', await minor.locator('.site-nav-chord-parent-link').getAttribute('href') === '/chords/minor');
  check('Minor lists twelve published roots', same(await minorPanel.locator('.site-nav-third-link').evaluateAll(nodes => nodes.map(node => node.getAttribute('href'))), minorRoutes));
  check('Minor uses two columns', (await minorPanel.locator('.site-nav-third-links').evaluate(element => getComputedStyle(element).gridTemplateColumns.split(' ').length)) === 2);

  const more = chords.locator('.site-nav-chord-item').nth(2);
  await more.locator('.site-nav-chord-group-button').click();
  const morePanel = more.locator('.site-nav-third-panel');
  check('More Chords is a button-only group', await more.locator('a[href="/chords/more"]').count() === 0 && await more.locator('.site-nav-chord-group-button').count() === 1);
  check('More Chords opens its category panel', await morePanel.isVisible());
  check('More Chords has exact category list', same(await morePanel.locator('.site-nav-third-link').evaluateAll(nodes => nodes.map(node => node.getAttribute('href'))), moreRoutes));
  check('No fourth-level menu exists', await chords.locator('.site-nav-third-panel .site-nav-third-panel').count() === 0);
  check('No /chords/more link exists', await desktop.locator('a[href="/chords/more"]').count() === 0);
  await desktop.screenshot({ path: `${out}/screenshots/chords-navigation-1440.png`, fullPage: false });
  const chordPanelBox = await chords.locator('.site-nav-panel-chords').boundingBox();
  if (!chordPanelBox) throw new Error('Chords desktop panel has no bounding box');
  await desktop.mouse.move(chordPanelBox.x + chordPanelBox.width - 20, chordPanelBox.y + chordPanelBox.height - 20, { steps: 12 });
  await desktop.waitForTimeout(120);
  check('Moving to empty menu space closes third level', await morePanel.isHidden());

  const hrefs = [...new Set(await desktop.locator('.site-nav-desktop a[href], .site-mobile-nav a[href]').evaluateAll(nodes => nodes.map(node => node.getAttribute('href')).filter(Boolean)))];
  if (process.env.PIANO_SKIP_LINK_CHECK !== '1') {
    const targetResults = await Promise.all(hrefs.map(async href => ({ href, status: (await desktop.request.get(`${base}${href}`)).status() })));
    for (const target of targetResults) check(`Navigation target ${target.href} responds`, target.status === 200, target.status);
  }
  await desktop.close();

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true });
  mobile.on('pageerror', error => runtimeErrors.push(error.message));
  mobile.on('console', message => { if (message.type() === 'error') runtimeErrors.push(message.text()); });
  await mobile.goto(`${base}/chords`);
  await mobile.locator('.site-menu-button').click();
  const mobileChords = mobile.locator('.site-mobile-section').filter({ has: mobile.locator('.site-mobile-parent[href="/chords"]') });
  const mobileTriggers = mobileChords.locator('.site-mobile-accordion-trigger');
  check('Mobile exposes three chord groups', same(await mobileTriggers.allTextContents(), ['Major Chords', 'Minor Chords', 'More Chords']));
  const beforeMajorClick = mobile.url();
  await mobileTriggers.nth(0).click();
  const mobileMajorPanel = mobileChords.locator('.site-mobile-accordion-panel[data-kind="major"]');
  check('Mobile Major tap expands without navigating', mobile.url() === beforeMajorClick && await mobileMajorPanel.isVisible());
  const mobileMajorLinks = await mobileMajorPanel.locator('a').evaluateAll(nodes => nodes.map(node => ({ text: node.textContent?.trim(), href: node.getAttribute('href') })));
  check('Mobile Major starts with View all then twelve roots', mobileMajorLinks.length === 13 && mobileMajorLinks[0].text === 'View all Major Chords' && mobileMajorLinks[0].href === '/chords/major' && same(mobileMajorLinks.slice(1).map(item => item.href), majorRoutes), mobileMajorLinks);
  await mobile.screenshot({ path: `${out}/screenshots/chords-navigation-major-390.png`, fullPage: false });
  await mobileTriggers.nth(1).click();
  const mobileMinorPanel = mobileChords.locator('.site-mobile-accordion-panel[data-kind="minor"]');
  check('Mobile Minor opens and Major closes', await mobileMinorPanel.isVisible() && await mobileMajorPanel.isHidden());
  const mobileMinorLinks = await mobileMinorPanel.locator('a').evaluateAll(nodes => nodes.map(node => ({ text: node.textContent?.trim(), href: node.getAttribute('href') })));
  check('Mobile Minor starts with View all then twelve roots', mobileMinorLinks.length === 13 && mobileMinorLinks[0].text === 'View all Minor Chords' && mobileMinorLinks[0].href === '/chords/minor' && same(mobileMinorLinks.slice(1).map(item => item.href), minorRoutes), mobileMinorLinks);
  await mobileTriggers.nth(2).click();
  const mobileMorePanel = mobileChords.locator('.site-mobile-accordion-panel[data-kind="more"]');
  check('Mobile More has exact categories and no details', same(await mobileMorePanel.locator('a').evaluateAll(nodes => nodes.map(node => node.getAttribute('href'))), moreRoutes));
  check('Mobile accordion touch targets are at least 44px', (await mobileTriggers.evaluateAll(nodes => nodes.every(node => node.getBoundingClientRect().height >= 44))));
  check('390px navigation has no horizontal overflow', await mobile.evaluate(() => document.documentElement.scrollWidth <= innerWidth), await mobile.evaluate(() => [document.documentElement.scrollWidth, innerWidth]));
  await mobile.screenshot({ path: `${out}/screenshots/chords-navigation-390.png`, fullPage: false });
  await mobile.close();
  check('No runtime or hydration errors', runtimeErrors.length === 0, runtimeErrors);
} catch (error) {
  check('Navigation browser suite completed', false, error.stack);
} finally {
  await browser.close();
}

const report = {
  executedAt: new Date().toISOString(),
  base,
  passed: results.filter(result => result.passed).length,
  failed: results.filter(result => !result.passed).length,
  results,
  runtimeErrors,
};
fs.writeFileSync(`${out}/browser-validation.json`, `${JSON.stringify(report, null, 2)}\n`);
console.log(`Chord navigation: ${report.passed} passed, ${report.failed} failed.`);
process.exitCode = report.failed ? 1 : 0;
