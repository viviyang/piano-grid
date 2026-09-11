import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import https from 'node:https';

const origin = 'https://pianogrid.com';
const authorized = [
  '/', '/tools', '/songs', '/songs/easy', '/tools/blank-sheet-music',
  '/keyboard-notes', '/keyboard-notes/labeled', '/keyboard-notes/chart',
  '/chords', '/chords/a-major', '/chords/a-minor', '/chords/c-major',
  '/scales', '/scales/c-major', '/scales/a-minor', '/guide',
  '/guide/read-sheet-music',
];

const plan = JSON.parse(await readFile('docs/product/url-plan.final.json', 'utf8'));
const planned = plan.pages.map((page) => page.url);
const unauthorized = planned.filter((url) => !authorized.includes(url));
const evidence = { checked_at: new Date().toISOString(), origin, authorized, checks: {} };

async function get(url, options = {}) {
  const response = await fetch(url, { redirect: 'manual', ...options });
  return { response, text: await response.text() };
}

const routeResults = await Promise.all(authorized.map(async (path) => {
  const response = await fetch(origin + path, { redirect: 'manual' });
  return { path, status: response.status, location: response.headers.get('location') };
}));
evidence.checks.authorized_routes = routeResults;

const unauthorizedResults = [];
for (let index = 0; index < unauthorized.length; index += 12) {
  unauthorizedResults.push(...await Promise.all(unauthorized.slice(index, index + 12).map(async (path) => {
    const response = await fetch(origin + path, { redirect: 'manual' });
    return { path, status: response.status, location: response.headers.get('location') };
  })));
}
evidence.checks.unauthorized_planned_routes = unauthorizedResults;

const sensitivePaths = [
  '/docs/release/release-readiness.md', '/checks/release/public-launch/report.md',
  '/src/lib/site-routes.ts', '/package.json', '/next.config.ts',
  '/docs/design/reference/final-a-minor.html',
];
evidence.checks.non_public_workspace_files = await Promise.all(sensitivePaths.map(async (path) => {
  const response = await fetch(origin + path, { redirect: 'manual' });
  return { path, status: response.status };
}));

const http = await fetch('http://pianogrid.com/', { redirect: 'manual' });
const www = await fetch('https://www.pianogrid.com/', { redirect: 'manual' });
evidence.checks.redirects = [
  { from: 'http://pianogrid.com/', status: http.status, location: http.headers.get('location') },
  { from: 'https://www.pianogrid.com/', status: www.status, location: www.headers.get('location') },
];

const { response: homeResponse, text: homeHTML } = await get(origin + '/');
evidence.checks.home_security_headers = {
  status: homeResponse.status,
  server: homeResponse.headers.get('server'),
  strict_transport_security: homeResponse.headers.get('strict-transport-security'),
  content_security_policy: homeResponse.headers.get('content-security-policy'),
  x_content_type_options: homeResponse.headers.get('x-content-type-options'),
  referrer_policy: homeResponse.headers.get('referrer-policy'),
  permissions_policy: homeResponse.headers.get('permissions-policy'),
};

const { response: robotsResponse, text: robots } = await get(origin + '/robots.txt');
const { response: sitemapResponse, text: sitemap } = await get(origin + '/sitemap.xml');
const sitemapURLs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
evidence.checks.robots = { status: robotsResponse.status, text: robots };
evidence.checks.sitemap = { status: sitemapResponse.status, urls: sitemapURLs };

const htmlByRoute = await Promise.all(authorized.map(async (path) => {
  const response = await fetch(origin + path);
  return { path, html: await response.text() };
}));
const assetPaths = [...new Set(htmlByRoute.flatMap(({ html }) =>
  [...html.matchAll(/(?:src|href)=["'](\/[^"'#?]+)["']/g)]
    .map((match) => match[1])
    .filter((path) => path.startsWith('/_next/') || path.startsWith('/assets/') || path.startsWith('/reference/'))
))].sort();
evidence.checks.referenced_assets = await Promise.all(assetPaths.map(async (path) => {
  const response = await fetch(origin + path, { redirect: 'manual' });
  const bytes = new Uint8Array(await response.arrayBuffer());
  const sha256 = createHash('sha256').update(bytes).digest('hex');
  let local = null;
  if (!path.startsWith('/_next/')) {
    try {
      const localBytes = await readFile(`public${path}`);
      local = { bytes: localBytes.length, sha256: createHash('sha256').update(localBytes).digest('hex'), matches_live: createHash('sha256').update(localBytes).digest('hex') === sha256 };
    } catch (error) {
      local = { error: error.code || error.message, matches_live: false };
    }
  }
  return { path, status: response.status, content_type: response.headers.get('content-type'), bytes: bytes.length, sha256, local };
}));

evidence.checks.home_html_markers = {
  title_present: homeHTML.includes('<title>Piano Chords, Scales &amp; Practice Tools | PianoGrid</title>'),
  canonical_present: homeHTML.includes('rel="canonical" href="https://pianogrid.com/"'),
  index_follow_present: homeHTML.includes('name="robots" content="index, follow"'),
};

evidence.checks.tls = await new Promise((resolve, reject) => {
  const request = https.get(origin, { rejectUnauthorized: true }, (response) => {
    const socket = response.socket;
    const certificate = socket.getPeerCertificate();
    resolve({
      authorized: socket.authorized,
      authorization_error: socket.authorizationError ?? null,
      protocol: socket.getProtocol(),
      subject: certificate.subject,
      issuer: certificate.issuer,
      valid_from: certificate.valid_from,
      valid_to: certificate.valid_to,
      fingerprint256: certificate.fingerprint256,
    });
    response.resume();
  });
  request.on('error', reject);
});

const failures = [];
for (const item of routeResults) if (item.status !== 200) failures.push(`authorized route ${item.path}: ${item.status}`);
for (const item of unauthorizedResults) if (item.status !== 404) failures.push(`unauthorized planned route ${item.path}: ${item.status}`);
for (const item of evidence.checks.non_public_workspace_files) if (item.status !== 404) failures.push(`workspace file exposed ${item.path}: ${item.status}`);
if (http.status !== 308 || http.headers.get('location') !== origin + '/') failures.push('HTTP apex redirect mismatch');
if (www.status !== 308 || www.headers.get('location') !== origin + '/') failures.push('www redirect mismatch');
if (robotsResponse.status !== 200 || !robots.includes('Allow: /') || !robots.includes(`Sitemap: ${origin}/sitemap.xml`)) failures.push('robots mismatch');
const expectedSitemap = authorized.map((path) => origin + path).sort();
if (JSON.stringify([...sitemapURLs].sort()) !== JSON.stringify(expectedSitemap)) failures.push('sitemap URL set mismatch');
for (const item of evidence.checks.referenced_assets) if (item.status !== 200) failures.push(`referenced asset ${item.path}: ${item.status}`);
for (const item of evidence.checks.referenced_assets) if (item.local && !item.local.matches_live) failures.push(`static asset differs from workspace ${item.path}`);
if (!evidence.checks.tls.authorized) failures.push(`TLS unauthorized: ${evidence.checks.tls.authorization_error}`);
evidence.result = { passed: failures.length === 0, failures, counts: { authorized: authorized.length, unauthorized: unauthorized.length, assets: assetPaths.length } };

await writeFile('checks/release/public-launch/independent-reverification/public-boundary.json', JSON.stringify(evidence, null, 2) + '\n');
console.log(`Public boundary: ${evidence.result.passed ? 'PASS' : 'FAIL'}; ${authorized.length} authorized, ${unauthorized.length} unauthorized, ${assetPaths.length} referenced assets; ${failures.length} failures.`);
if (failures.length) process.exitCode = 1;
