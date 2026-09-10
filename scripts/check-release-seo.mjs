import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { join } from 'node:path';

const { chromium } = createRequire(import.meta.url)(process.env.PIANO_PLAYWRIGHT_PATH || 'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base = process.env.PIANO_BASE_URL || 'http://127.0.0.1:3001';
const out = process.env.PIANO_CHECK_OUT || 'checks/release/08';
const phase = process.env.PIANO_AUDIT_PHASE || 'after';
const expectReleaseLinks = process.env.PIANO_EXPECT_RELEASE_LINKS !== '0';
const checkExternal = process.env.PIANO_CHECK_EXTERNAL === '1';
const routes = ['/', '/tools', '/songs', '/songs/easy', '/tools/blank-sheet-music', '/keyboard-notes', '/keyboard-notes/labeled', '/keyboard-notes/chart', '/chords', '/chords/a-major', '/chords/a-minor', '/chords/c-major', '/scales', '/scales/c-major', '/scales/a-minor', '/guide', '/guide/read-sheet-music'];
const homeMetadata = {
  title: 'Piano Chords, Scales & Practice Tools | PianoGrid',
  description: 'Learn piano with clear chord and scale references, labeled keyboard notes, beginner songs, sheet music, and practical tools for focused practice.',
};
const routeSet = new Set(routes);
const parentByRoute = {
  '/tools': '/', '/songs': '/', '/songs/easy': '/songs', '/tools/blank-sheet-music': '/tools',
  '/keyboard-notes': '/', '/keyboard-notes/labeled': '/keyboard-notes', '/keyboard-notes/chart': '/keyboard-notes',
  '/chords': '/', '/chords/a-major': '/chords', '/chords/a-minor': '/chords', '/chords/c-major': '/chords',
  '/scales': '/', '/scales/c-major': '/scales', '/scales/a-minor': '/scales', '/guide': '/', '/guide/read-sheet-music': '/guide',
};
const capabilities = {
  T01: ['task discovery', 'section navigation'], T02: ['tool discovery', 'authorized printable downloads'],
  T03: ['key lookup', 'octave disambiguation', 'audio reference'], T04: ['88/61-key labels', 'layout selection', 'print reference'],
  T05: ['staff-to-key mapping', 'key-to-staff mapping', 'range and clef selection', 'print reference'],
  T06: ['chord filtering', 'keyboard diagrams', 'audio reference', 'current and collection printing'],
  T07: ['three inversions', 'keyboard diagrams', 'audio reference', 'current-position printing'],
  T11: ['scale selection', 'hand and direction selection', 'audio reference', 'current selection printing'],
  T12: ['fixed-tonic scale reference', 'hand and direction selection', 'audio reference', 'current selection printing'],
  T15: ['edition search', 'level and goal filtering', 'external edition resources'],
  T16: ['goal-based edition selection', 'edition-backed catalog', 'external edition resources'],
  T19: ['Letter/A4 selection', 'screen preview zoom', 'authorized PDF downloads'],
  T21: ['ordered beginner path', 'first-note exercise', 'authorized PDF download'],
  T22: ['reading order', 'staff anchors', 'practice exercise', 'authorized PDF download'],
};
const intentFallback = {
  '/chords': 'Find and compare selected piano chords by name and quality.',
  '/chords/a-minor': 'Find the A minor triad and compare its three inversions.',
};

const master = JSON.parse(await readFile('docs/content/site-master/page-content.master.json', 'utf8'));
await mkdir(join(out, 'html'), { recursive: true });
await mkdir(join(out, 'headers'), { recursive: true });
await mkdir(join(out, 'screenshots'), { recursive: true });
const fileName = (url) => url === '/' ? 'home' : url.slice(1).replaceAll('/', '--');
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const crawler = await browser.newContext({ viewport: { width: 1440, height: 1000 }, userAgent: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' });
const runtimeErrors = [];
const pages = [];
const statusCache = new Map();
const externalByPage = new Map();

async function statusFor(pathname) {
  if (!statusCache.has(pathname)) {
    const response = await context.request.get(new URL(pathname, base).href, { failOnStatusCode: false, maxRedirects: 5 });
    statusCache.set(pathname, response.status());
  }
  return statusCache.get(pathname);
}

function sourceGroups(page) {
  if (Array.isArray(page.source_groups)) return page.source_groups.map((item) => item.id);
  return page.source_group_ids || [];
}

function releaseBlockers(url) {
  const blockers = [];
  if (url === '/chords/a-major') blockers.push('Named professional approval remains required by F-RELEASE-a-major; absent inversion fingerings remain intentionally undisclosed.');
  if (url === '/chords/c-major') blockers.push('Named professional approval remains required by F-RELEASE-c-major; absent inversion fingerings remain intentionally undisclosed.');
  if (url === '/guide' || url === '/guide/read-sheet-music') {
    blockers.push('Named piano-educator review remains required by the E-REVIEW release gate.');
    blockers.push('The linked four-page guide PDF remains untagged; acceptance or an accessible re-export from an editable source is required.');
  }
  return blockers;
}

function sourceBlockEvidence(page, mainText) {
  const samples = [];
  for (const block of page.blocks || []) {
    if (typeof block.body === 'string') samples.push(block.body);
    for (const paragraph of block.content?.paragraphs || []) samples.push(paragraph);
  }
  const exact = samples.map((text) => ({ text: text.slice(0, 160), matched: mainText.includes(text) }));
  return {
    source_block_count: page.blocks?.length || 0,
    rendered_data_block_count: null,
    exact_text_samples: exact,
    exact_matches: exact.filter((item) => item.matched).length,
    exact_samples: exact.length,
  };
}

for (const url of routes) {
  const source = master.pages[url];
  const page = await context.newPage();
  page.on('pageerror', (error) => runtimeErrors.push(`${url}: ${error.message}`));
  page.on('console', (message) => { if (message.type() === 'error') runtimeErrors.push(`${url}: ${message.text()}`); });
  const response = await page.goto(base + url, { waitUntil: 'networkidle' });
  const rawHTML = await response.text();
  const headers = response.headers();
  await writeFile(join(out, 'html', `${fileName(url)}.html`), rawHTML);
  await writeFile(join(out, 'headers', `${fileName(url)}.json`), JSON.stringify({ url, status: response.status(), headers }, null, 2) + '\n');
  const dom = await page.evaluate((knownRoutes) => {
    const normalizedText = (value) => (value || '').replace(/\s+/g, ' ').trim();
    const headings = [...document.querySelectorAll('main h2,main h3')].map((element) => ({ level: element.tagName, text: normalizedText(element.textContent), printOnly: Boolean(element.closest('.am-print-only,.kn-print-only,.sc-print-only')) }));
    const links = [...document.querySelectorAll('a[href]')].map((anchor) => ({ href: anchor.getAttribute('href'), text: normalizedText(anchor.textContent), inMain: Boolean(anchor.closest('main')), inNav: Boolean(anchor.closest('header nav')), inFooter: Boolean(anchor.closest('footer')) }));
    const imgs = [...document.querySelectorAll('img')].map((element) => ({ src: element.getAttribute('src'), alt: element.getAttribute('alt'), role: element.getAttribute('role'), width: element.naturalWidth, height: element.naturalHeight }));
    const svgs = [...document.querySelectorAll('svg')].map((element) => ({ hidden: element.getAttribute('aria-hidden') === 'true', role: element.getAttribute('role'), label: element.getAttribute('aria-label'), labelledby: element.getAttribute('aria-labelledby'), title: normalizedText(element.querySelector(':scope > title')?.textContent) }));
    const jsonld = [...document.querySelectorAll('script[type="application/ld+json"]')].map((element) => element.textContent || '');
    const mainText = normalizedText(document.querySelector('main')?.innerText);
    const h1 = [...document.querySelectorAll('h1')].map((element) => ({ text: normalizedText(element.textContent), visible: getComputedStyle(element).display !== 'none' && getComputedStyle(element).visibility !== 'hidden' && !element.closest('[aria-hidden="true"]') }));
    return {
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.getAttribute('content') || null,
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') || null,
      robots: document.querySelector('meta[name="robots"]')?.getAttribute('content') || null,
      h1,
      headings,
      mainText,
      bodyText: normalizedText(document.body?.innerText),
      renderedDataBlocks: document.querySelectorAll('main [data-block-id]').length,
      links,
      imgs,
      svgs,
      jsonld,
      pageOverflow: document.documentElement.scrollWidth > innerWidth,
      knownRoutes,
    };
  }, routes);
  const crawlerPage = await crawler.newPage();
  const crawlerResponse = await crawlerPage.goto(base + url, { waitUntil: 'domcontentloaded' });
  const crawlerState = { status: crawlerResponse.status(), title: await crawlerPage.title(), h1: await crawlerPage.locator('h1').allTextContents(), description: await crawlerPage.locator('meta[name="description"]').getAttribute('content'), canonical: await crawlerPage.locator('link[rel="canonical"]').getAttribute('href') };
  await crawlerPage.close();
  const internalLinks = [];
  const externalLinks = [];
  for (const link of dom.links) {
    if (!link.href || link.href.startsWith('#') || link.href.startsWith('mailto:') || link.href.startsWith('tel:')) continue;
    const target = new URL(link.href, base);
    if (target.origin === new URL(base).origin) internalLinks.push({ ...link, pathname: target.pathname });
    else if (target.protocol === 'https:' || target.protocol === 'http:') externalLinks.push({ ...link, url: target.href });
  }
  externalByPage.set(url, externalLinks);
  const uniqueInternal = [...new Set(internalLinks.map((link) => link.pathname))];
  const brokenInternal = [];
  for (const pathname of uniqueInternal) {
    const status = await statusFor(pathname);
    if (status >= 400) brokenInternal.push({ pathname, status });
  }
  const jsonld = dom.jsonld.map((value) => { try { return { valid: true, value: JSON.parse(value) }; } catch (error) { return { valid: false, error: error.message }; } });
  const jsonldTypes = jsonld.flatMap((item) => item.valid ? [item.value?.['@type'], ...(Array.isArray(item.value?.['@graph']) ? item.value['@graph'].map((node) => node?.['@type']) : [])].filter(Boolean) : []);
  const canonicalPath = dom.canonical ? new URL(dom.canonical, base).pathname : null;
  const sourceTitle = url === '/' ? homeMetadata.title : source.metadata?.title || null;
  const sourceDescription = url === '/' ? homeMetadata.description : source.metadata?.description || null;
  const coverage = sourceBlockEvidence(source, dom.mainText);
  coverage.rendered_data_block_count = dom.renderedDataBlocks;
  const svgIssues = dom.svgs.filter((item) => !item.hidden && !item.label && !item.labelledby && !item.title && item.role === 'img');
  const imageIssues = dom.imgs.filter((item) => item.alt === null || (item.alt !== '' && (!item.width || !item.height)));
  const issues = [];
  if (response.status() !== 200) issues.push({ severity: 'P1', code: 'HTTP_STATUS', detail: response.status() });
  if (!dom.title || dom.title !== sourceTitle) issues.push({ severity: 'P2', code: 'TITLE_MISMATCH', detail: { sourceTitle, effectiveTitle: dom.title } });
  if (!dom.description || dom.description !== sourceDescription) issues.push({ severity: 'P2', code: 'DESCRIPTION_MISMATCH', detail: { sourceDescription, effectiveDescription: dom.description } });
  if (dom.h1.length !== 1) issues.push({ severity: 'P2', code: 'H1_COUNT', detail: dom.h1 });
  if (canonicalPath !== url) issues.push({ severity: 'P1', code: 'CANONICAL_PATH', detail: dom.canonical });
  if (!dom.robots?.includes('index') || !dom.robots?.includes('follow') || dom.robots.includes('noindex') || dom.robots.includes('nofollow')) issues.push({ severity: 'P1', code: 'PUBLIC_INDEX_POLICY', detail: dom.robots });
  if (/local page preview|local preview|in this preview/i.test(dom.bodyText)) issues.push({ severity: 'P2', code: 'STALE_PREVIEW_COPY' });
  if (brokenInternal.length) issues.push({ severity: 'P1', code: 'BROKEN_INTERNAL_LINK', detail: brokenInternal });
  if (dom.pageOverflow) issues.push({ severity: 'P2', code: 'PAGE_OVERFLOW_1440' });
  if (imageIssues.length || svgIssues.length) issues.push({ severity: 'P2', code: 'MEDIA_ACCESSIBILITY', detail: { imageIssues, svgIssues } });
  if (jsonld.some((item) => !item.valid)) issues.push({ severity: 'P2', code: 'INVALID_JSONLD', detail: jsonld });
  if (crawlerState.status !== response.status() || crawlerState.title !== dom.title || crawlerState.description !== dom.description || crawlerState.canonical !== dom.canonical) issues.push({ severity: 'P1', code: 'CRAWLER_PARITY', detail: crawlerState });
  await page.screenshot({ path: join(out, 'screenshots', `${fileName(url)}-1440.png`), fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(80);
  const mobile = await page.evaluate(() => ({ overflow: document.documentElement.scrollWidth > innerWidth, h1Size: getComputedStyle(document.querySelector('h1')).fontSize, h1LineHeight: getComputedStyle(document.querySelector('h1')).lineHeight }));
  if (mobile.overflow) issues.push({ severity: 'P2', code: 'PAGE_OVERFLOW_390' });
  await page.screenshot({ path: join(out, 'screenshots', `${fileName(url)}-390.png`), fullPage: true });
  const mainKeyword = source.main_keyword ?? null;
  pages.push({
    url,
    template_id: source.template_id,
    main_keyword: mainKeyword,
    intent_summary: source.user_task || intentFallback[url] || source.description,
    source_groups: sourceGroups(source),
    content_version: master.schema_version,
    implemented_capabilities: capabilities[source.template_id] || [],
    source_title: sourceTitle,
    effective_title: dom.title,
    title_length: [...dom.title].length,
    description: dom.description,
    description_length: dom.description ? [...dom.description].length : 0,
    h1_text_and_count: { count: dom.h1.length, items: dom.h1 },
    h2_h3_outline: dom.headings,
    coverage_evidence: coverage,
    rendered_core_content: { in_http_html: sourceTitle ? rawHTML.includes(sourceTitle.replaceAll('&', '&amp;')) || rawHTML.includes(sourceTitle) : false, main_text_characters: dom.mainText.length, main_word_count: dom.mainText.split(/\s+/).filter(Boolean).length },
    canonical: { source_path: source.metadata?.canonical_path || null, effective: dom.canonical, effective_path: canonicalPath, absolute_domain_pending: !dom.canonical || new URL(dom.canonical).origin !== 'https://pianogrid.com' },
    robots_meta_and_header: { meta: dom.robots, x_robots_tag: headers['x-robots-tag'] || null },
    internal_inbound: [],
    parent_and_related_outbound: { expected_parent: parentByRoute[url] || null, main_links: internalLinks.filter((link) => link.inMain).map((link) => ({ href: link.pathname, text: link.text })) },
    reachability: null,
    broken_links: { internal: brokenInternal, external: [] },
    image_or_svg_accessibility: { images: dom.imgs, svgs: dom.svgs, issues: [...imageIssues, ...svgIssues] },
    jsonld_types_and_validity: { count: jsonld.length, types: jsonldTypes, valid: jsonld.every((item) => item.valid), absolute_domain_pending: jsonld.some((item) => item.valid && JSON.stringify(item.value).includes('localhost')) },
    crawler_parity: crawlerState,
    responsive: { desktop_overflow: dom.pageOverflow, mobile_390: mobile },
    issue_severity: issues.length ? issues.map((item) => item.severity).sort()[0] : null,
    issues,
    fix: [],
    after_result: phase === 'after' ? (issues.length ? 'needs_fix' : 'pass') : 'before_snapshot',
    release_blockers: releaseBlockers(url),
    _outbound_routes: [...new Set(internalLinks.map((link) => link.pathname).filter((pathname) => routeSet.has(pathname)))],
    _external_urls: [...new Set(externalLinks.map((link) => link.url))],
  });
  await page.close();
}

const pageByURL = new Map(pages.map((page) => [page.url, page]));
for (const source of pages) for (const target of source._outbound_routes) pageByURL.get(target)?.internal_inbound.push(source.url);
const distance = new Map([['/', 0]]);
const queue = ['/'];
while (queue.length) {
  const current = queue.shift();
  for (const target of pageByURL.get(current)?._outbound_routes || []) if (!distance.has(target)) { distance.set(target, distance.get(current) + 1); queue.push(target); }
}
for (const page of pages) {
  page.internal_inbound = [...new Set(page.internal_inbound)].sort();
  page.reachability = { from_home_clicks: distance.get(page.url) ?? null, reachable: distance.has(page.url) };
  if (expectReleaseLinks && !distance.has(page.url)) page.issues.push({ severity: 'P1', code: 'ORPHAN_IN_RELEASE_PREVIEW' });
  if (expectReleaseLinks && page.url !== '/' && page.parent_and_related_outbound.expected_parent && !page._outbound_routes.includes(page.parent_and_related_outbound.expected_parent)) page.issues.push({ severity: 'P2', code: 'MISSING_PARENT_LINK', detail: page.parent_and_related_outbound.expected_parent });
  page.issue_severity = page.issues.length ? page.issues.map((item) => item.severity).sort()[0] : null;
  page.after_result = phase === 'after' ? (page.issues.length ? 'needs_fix' : 'pass') : 'before_snapshot';
}

async function inspectExternal(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    let response = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: controller.signal, headers: { 'user-agent': 'PianoGridReleaseCheck/1.0' } });
    if (response.status === 405 || response.status === 501) {
      response = await fetch(url, { method: 'GET', redirect: 'follow', signal: controller.signal, headers: { range: 'bytes=0-0', 'user-agent': 'PianoGridReleaseCheck/1.0' } });
      await response.body?.cancel();
    }
    return { url, status: response.status, final_url: response.url, result: response.status === 404 || response.status === 410 ? 'broken' : response.status >= 200 && response.status < 400 ? 'reachable' : [401, 403, 429].includes(response.status) ? 'restricted' : 'indeterminate' };
  } catch (error) {
    return { url, status: null, final_url: null, result: 'indeterminate', error: error.name === 'AbortError' ? 'timeout' : error.message };
  } finally { clearTimeout(timeout); }
}

let externalResults = [];
if (checkExternal) {
  const urls = [...new Set(pages.flatMap((page) => page._external_urls))];
  for (let index = 0; index < urls.length; index += 4) {
    externalResults.push(...await Promise.all(urls.slice(index, index + 4).map(inspectExternal)));
  }
  const resultByURL = new Map(externalResults.map((item) => [item.url, item]));
  for (const page of pages) {
    page.broken_links.external = page._external_urls.map((url) => resultByURL.get(url));
    const broken = page.broken_links.external.filter((item) => item?.result === 'broken');
    if (broken.length) page.issues.push({ severity: 'P2', code: 'BROKEN_EXTERNAL_LINK', detail: broken });
    page.issue_severity = page.issues.length ? page.issues.map((item) => item.severity).sort()[0] : null;
    page.after_result = phase === 'after' ? (page.issues.length ? 'needs_fix' : 'pass') : 'before_snapshot';
  }
  await writeFile(join(out, 'external-links.json'), JSON.stringify({ checked_at: new Date().toISOString(), count: externalResults.length, results: externalResults }, null, 2) + '\n');
}

for (const page of pages) { delete page._outbound_routes; delete page._external_urls; }
const duplicateTitles = Object.entries(Object.groupBy(pages, (page) => page.effective_title)).filter(([, items]) => items.length > 1).map(([title, items]) => ({ title, urls: items.map((item) => item.url) }));
const duplicateDescriptions = Object.entries(Object.groupBy(pages, (page) => page.description)).filter(([, items]) => items.length > 1).map(([description, items]) => ({ description, urls: items.map((item) => item.url) }));
const blocking = pages.flatMap((page) => page.issues.filter((issue) => ['P0', 'P1', 'P2'].includes(issue.severity)).map((issue) => ({ url: page.url, ...issue })));
const linkGraph = { routes, expect_release_links: expectReleaseLinks, edges: pages.flatMap((page) => page.parent_and_related_outbound.main_links.filter((link) => routeSet.has(link.href)).map((link) => ({ from: page.url, to: link.href, text: link.text }))), reachability: Object.fromEntries(pages.map((page) => [page.url, page.reachability])), inbound: Object.fromEntries(pages.map((page) => [page.url, page.internal_inbound])) };
const report = { checked_at: new Date().toISOString(), phase, base, expected_noindex: false, expected_release_links: expectReleaseLinks, pages, site_findings: { duplicate_titles: duplicateTitles, duplicate_descriptions: duplicateDescriptions, runtime_errors: runtimeErrors, external_summary: checkExternal ? Object.fromEntries(['reachable', 'restricted', 'broken', 'indeterminate'].map((kind) => [kind, externalResults.filter((item) => item.result === kind).length])) : null }, result: { passed_pages: pages.filter((page) => page.issues.length === 0).length, pages_with_issues: pages.filter((page) => page.issues.length).length, blocking_issues: blocking.length } };
await writeFile(join(out, phase === 'after' ? 'seo-pages.json' : `seo-pages-${phase}.json`), JSON.stringify(report, null, 2) + '\n');
await writeFile(join(out, phase === 'after' ? 'link-graph.json' : `link-graph-${phase}.json`), JSON.stringify(linkGraph, null, 2) + '\n');
await browser.close();
console.log(`SEO ${phase}: ${report.result.passed_pages}/${routes.length} pages passed; ${report.result.blocking_issues} blocking findings; ${runtimeErrors.length} runtime errors.`);
if (phase === 'after' && blocking.length) process.exitCode = 1;
