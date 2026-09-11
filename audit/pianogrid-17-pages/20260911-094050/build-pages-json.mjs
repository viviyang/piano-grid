import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve('audit/pianogrid-17-pages/20260911-094050');
const capture = JSON.parse(await readFile(resolve(root, 'evidence/page-captures.json'), 'utf8'));
const local = JSON.parse(await readFile(resolve(root, 'evidence/local-version.json'), 'utf8'));
const supplement = JSON.parse(await readFile(resolve(root, 'evidence/supplement-fetch-results.json'), 'utf8'));
const interactions = JSON.parse(await readFile(resolve(root, 'evidence/interaction-results.json'), 'utf8'));
const supplementaryInteractions = JSON.parse(await readFile(resolve(root, 'evidence/supplement-interactions.json'), 'utf8'));
await mkdir(resolve(root, 'evidence/head'), { recursive: true });

const findingMap = {
  '/songs': ['PG17-001', 'PG17-002', 'PG17-003'],
  '/songs/easy': ['PG17-001'],
  '/keyboard-notes/labeled': ['PG17-006', 'PG17-007'],
  '/tools/blank-sheet-music': ['PG17-007'],
  '/chords': ['PG17-005', 'PG17-007', 'PG17-008', 'PG17-009'],
  '/chords/a-major': ['PG17-004', 'PG17-005', 'PG17-007', 'PG17-008', 'PG17-009'],
  '/chords/a-minor': ['PG17-004', 'PG17-005', 'PG17-007', 'PG17-008', 'PG17-009'],
  '/chords/c-major': ['PG17-004', 'PG17-005', 'PG17-007', 'PG17-008', 'PG17-009'],
  '/keyboard-notes': ['PG17-005', 'PG17-008', 'PG17-009'],
  '/keyboard-notes/chart': ['PG17-005', 'PG17-008', 'PG17-009'],
  '/scales': ['PG17-008'],
  '/scales/c-major': ['PG17-005', 'PG17-008'],
  '/scales/a-minor': ['PG17-005', 'PG17-008'],
  '/guide': ['PG17-005', 'PG17-009'],
  '/guide/read-sheet-music': ['PG17-005', 'PG17-007', 'PG17-009']
};
const simple = link => ({ text: link.text, href: link.href, download: link.download, target: link.target });
const uniqueLinks = links => [...new Map(links.map(link => [`${link.href}|${link.text}`, simple(link)])).values()];
const routeURL = route => `https://pianogrid.com${route === '/' ? '/' : route}`;
const allRouteURLs = new Set(capture.routes.map(routeURL));
const incoming = Object.fromEntries(capture.routes.map(route => [route, []]));
for (const page of capture.pages) {
  for (const link of page.desktop.mainLinks) {
    let url;
    try { url = new URL(link.href); } catch { continue; }
    url.hash = '';
    if (allRouteURLs.has(url.href) && url.href !== routeURL(page.route)) incoming[url.pathname || '/'].push({ from: page.route, text: link.text, href: link.href });
  }
}
const parseJsonLd = scripts => scripts.map(raw => {
  try { return { valid: true, value: JSON.parse(raw) }; }
  catch (error) { return { valid: false, error: error.message, raw }; }
});
const extraMap = new Map(capture.extra.map(x => [x.route, x]));
const byRouteInteractions = route => [...interactions.tests, ...supplementaryInteractions.tests].filter(test => test.route === route).map(test => ({ id: test.id, passed_by_script: test.passed, evidence: test.evidence, limit: test.limit }));
const routeSlug = route => route === '/' ? 'home' : route.slice(1).replaceAll('/', '--');

const pages = capture.pages.map(page => {
  const d = page.desktop, m = page.mobile, extra = extraMap.get(page.route);
  const checked = ['desktop Chromium 1440x1000 screenshot + DOM + accessibility-tree snapshot', 'mobile Chromium 390x844 screenshot + DOM + accessibility-tree snapshot'];
  if (extra) checked.push('Chromium 320x844 screenshot', '390x844 at 200% root text-size sample');
  const headEvidence = `evidence/head/${routeSlug(page.route)}.json`;
  const evidence = [d.evidence.screenshot, m.evidence.screenshot, d.evidence.dom, m.evidence.dom, d.evidence.aria, m.evidence.aria, headEvidence];
  if (extra) evidence.push(extra.at320.evidence.screenshot, extra.at320.evidence.dom, extra.at320.evidence.aria, extra.text200.evidence);
  if (page.route === '/chords/a-minor') evidence.push('evidence/aria/a-minor-current-selection.yml');
  return {
    route: page.route,
    requested_url: d.requested_url,
    final_url: d.final_url,
    page_status: 'partial',
    observed_version: 'unknown',
    observed_response_etag: d.response_headers.etag || null,
    deployment_headers: {
      server: d.response_headers.server || null,
      x_vercel_cache: d.response_headers['x-vercel-cache'] || null,
      x_vercel_id: d.response_headers['x-vercel-id'] || null,
      x_nextjs_prerender: d.response_headers['x-nextjs-prerender'] || null
    },
    http_status: d.http_status,
    metadata: {
      title: d.title,
      description: d.description,
      canonical: d.canonical,
      robots: d.robots,
      h1: d.h1,
      json_ld: parseJsonLd(d.jsonLd)
    },
    body_text: d.bodyText,
    body_evidence: { desktop_html_sha256: d.html_sha256, desktop_html_bytes: d.html_bytes, mobile_html_sha256: m.html_sha256, mobile_html_bytes: m.html_bytes },
    incoming_links: uniqueLinks(incoming[page.route]),
    outgoing_main_links: uniqueLinks(d.mainLinks),
    global_navigation_links: uniqueLinks(d.globalLinks),
    download_links: uniqueLinks(d.downloadLinks),
    external_links: uniqueLinks(d.externalLinks.filter(link => !link.href.startsWith('https://pianogrid.com/'))),
    console_errors: [...d.console_errors, ...m.console_errors],
    failed_resource_responses: [...d.failed_responses, ...m.failed_responses],
    images: d.images,
    images_healthy: d.imagesHealthy && m.imagesHealthy,
    whole_document_horizontal_overflow: { desktop: d.documentOverflow, mobile: m.documentOverflow, at_320: extra?.at320.documentOverflow ?? null, text_200_percent: extra?.text200.overflow ?? null },
    unnamed_visible_controls: { desktop: d.focusableWithoutLabel, mobile: m.focusableWithoutLabel },
    checked_dimensions: checked,
    unchecked_dimensions: ['real iPhone/iPad/Android hardware', 'NVDA/JAWS/VoiceOver speech output and navigation', 'human listening for pitch/timbre/clicks', 'native print dialog, printer output and paper handling', 'real-user Core Web Vitals and field telemetry'],
    evidence_files: evidence,
    interaction_checks: byRouteInteractions(page.route),
    findings: [...(findingMap[page.route] || []), 'PG17-010']
  };
});

const output = {
  audit: {
    executed_local_time: '2026-09-11T09:40:50+08:00',
    timezone: 'Asia/Shanghai',
    production_origin: 'https://pianogrid.com',
    local_commit: local.git.head,
    local_branch: local.git.branch,
    local_worktree_dirty: local.git.dirty,
    observed_version: 'unknown',
    version_separation: local.separationNote,
    route_registry: local.registry,
    planning: local.planning,
    sitemap_exactly_matches_17_routes: supplement.sitemap.exact17,
    capture_stability: 'All 17 route rechecks returned 200 and retained their initial ETag during this run; this is continuity evidence only, not a commit identifier.',
    page_status_note: 'Every page is partial because the requested real-device, human-listening, native-print and real-screen-reader gates were not available; no page was blocked at HTTP/DOM/screenshot level.'
  },
  pages
};
for (const page of capture.pages) {
  const d = page.desktop;
  await writeFile(resolve(root, `evidence/head/${routeSlug(page.route)}.json`), JSON.stringify({
    requested_url: d.requested_url,
    final_url: d.final_url,
    http_status: d.http_status,
    response_headers: d.response_headers,
    title: d.title,
    description: d.description,
    canonical: d.canonical,
    robots: d.robots,
    h1: d.h1,
    json_ld: parseJsonLd(d.jsonLd)
  }, null, 2) + '\n');
}
await writeFile(resolve(root, 'pages.json'), JSON.stringify(output, null, 2) + '\n');
