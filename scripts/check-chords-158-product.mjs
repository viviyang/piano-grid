import fs from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PUBLIC_ROUTES } from '../src/lib/site-routes.ts';
import { chordSearchMatches } from '../src/lib/chord-search-text.ts';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const base = process.env.PIANO_BASE_URL || 'http://127.0.0.1:3132';
const outDir = resolve(root, 'docs/seo/chords/evidence-2026-09-18/task-12');
fs.mkdirSync(outDir, { recursive: true });

const FAMILY = [
  '/chords/major',
  '/chords/minor',
  '/chords/diminished',
  '/chords/augmented',
  '/chords/suspended',
  '/chords/seventh',
  '/chords/add',
  '/chords/extended',
  '/chords/altered',
];
const STRUCTURE = ['/chords', '/chords/by-key', '/chords/finder', '/chord-progressions'];
const MODULE = new Set([...STRUCTURE, ...FAMILY]);
const chordUrls = PUBLIC_ROUTES.filter((url) => url === '/chord-progressions' || url.startsWith('/chords'));
const detailUrls = chordUrls.filter((url) => !MODULE.has(url));

const results = [];
const check = (name, passed, detail = '') => {
  results.push({ name, passed: Boolean(passed), detail: detail == null ? '' : String(detail) });
  if (!passed) console.error('FAIL', name, detail || '');
  else console.log('PASS', name, detail || '');
};

function assert(name, condition, detail) {
  check(name, condition, detail);
  if (!condition) throw new Error(name + (detail ? `: ${detail}` : ''));
}

assert('module URL count is 158', chordUrls.length === 158, String(chordUrls.length));
assert('detail URL count is 145', detailUrls.length === 145, String(detailUrls.length));
assert('family URL count is 9', FAMILY.length === 9);
assert('structure URL count is 4', STRUCTURE.length === 4);

const bbFields = ['B-flat Major Piano Chord', 'B♭', 'B-flat'];
const cmFields = ['C minor add9', 'Cm(add9)', 'Cmadd9'];
assert('Bb matches B-flat / B♭', chordSearchMatches('Bb', bbFields));
assert('B-flat still matches', chordSearchMatches('B-flat', bbFields));
assert('Cmadd9 matches Cm(add9)', chordSearchMatches('Cmadd9', cmFields));
assert('Bb does not match A-flat', !chordSearchMatches('Bb', ['A-flat Major Piano Chord', 'A♭']));
assert('short B does not match A-flat via compact', !chordSearchMatches('B', ['A-flat Major Piano Chord', 'A♭']));
assert('short B still matches B Major', chordSearchMatches('B', ['B Major Piano Chord', 'B']));

const publicSet = new Set(PUBLIC_ROUTES);
const allowPrefix = ['/reference/', '/assets/', '/_next/'];
const allowExact = new Set([
  '/manifest.webmanifest',
  '/favicon.ico',
  '/favicon.svg',
  '/favicon-96x96.png',
  '/apple-touch-icon.png',
]);
function isAllowedHref(href) {
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return true;
  if (/^https?:\/\//i.test(href) || href.startsWith('//')) return true;
  const path = href.split('#')[0].split('?')[0];
  if (!path.startsWith('/')) return true;
  if (publicSet.has(path) || allowExact.has(path)) return true;
  return allowPrefix.some((prefix) => path.startsWith(prefix));
}

function extract(html, pattern, fallback = '') {
  const match = html.match(pattern);
  return match ? match[1].replace(/\s+/g, ' ').trim() : fallback;
}

function stripTags(value) {
  return value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

async function waitForServer() {
  for (let i = 0; i < 90; i += 1) {
    try {
      const response = await fetch(base + '/chords', { redirect: 'manual' });
      if (response.status === 200) return;
    } catch {}
    await new Promise((resolveWait) => setTimeout(resolveWait, 2000));
  }
  throw new Error('Server not reachable at ' + base);
}

await waitForServer();

const scans = [];
const queue = [...chordUrls];
const concurrency = 8;
async function worker() {
  while (queue.length) {
    const url = queue.shift();
    const response = await fetch(base + url, { redirect: 'manual' });
    const html = await response.text();
    const title = extract(html, /<title>([^<]*)<\/title>/i);
    const h1 = stripTags(extract(html, /<h1\b[^>]*>([\s\S]*?)<\/h1>/i));
    const canonical = extract(html, /<link rel="canonical" href="([^"]+)"/i);
    const robots = extract(html, /<meta name="robots" content="([^"]+)"/i);
    const description = extract(html, /<meta name="description" content="([^"]+)"/i);
    const tones = stripTags(extract(html, /<dd class="am-tone-list">([\s\S]*?)<\/dd>/i));
    const formula = stripTags(extract(html, /<dd class="am-formula">([\s\S]*?)<\/dd>/i));
    const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
    const broken = [...new Set(hrefs.filter((href) => !isAllowedHref(href)))];
    const engineering = [];
    if (/independently authorized fingering dataset/i.test(html) || /independent fingering dataset is authorized/i.test(html)) {
      engineering.push('engineering_fingering');
    }
    const paragraphs = [...html.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)].map((match) => stripTags(match[1])).filter((text) => text.length > 40);
    const seen = new Map();
    const duplicates = [];
    for (const text of paragraphs) {
      seen.set(text, (seen.get(text) || 0) + 1);
    }
    for (const [text, count] of seen) {
      if (count > 1) duplicates.push(text.slice(0, 120));
    }
    const hasPlay = /Play chord|Play notes one at a time|Playback/i.test(html);
    const hasPractice = html.includes('id="practice"') || html.includes('Practice this');
    const hasPrint = /Print|print/i.test(html);
    const indexable = /index/i.test(robots) && /follow/i.test(robots) && !/noindex/i.test(robots);
    const canonicalOk = canonical === `https://pianogrid.com${url === '/' ? '/' : url}`;
    scans.push({
      url,
      status: response.status,
      title,
      h1,
      description,
      canonical,
      robots,
      tones,
      formula,
      broken,
      engineering,
      duplicates: duplicates.slice(0, 3),
      hasPlay,
      hasPractice,
      hasPrint,
      indexable,
      canonicalOk,
    });
  }
}

await Promise.all(Array.from({ length: concurrency }, () => worker()));
scans.sort((a, b) => a.url.localeCompare(b.url));

const missing200 = scans.filter((item) => item.status !== 200).map((item) => item.url);
const missingH1 = scans.filter((item) => !item.h1).map((item) => item.url);
const badRobots = scans.filter((item) => !item.indexable).map((item) => `${item.url}:${item.robots}`);
const badCanonical = scans.filter((item) => !item.canonicalOk).map((item) => `${item.url}:${item.canonical}`);
const brokenLinks = scans.filter((item) => item.broken.length).map((item) => `${item.url} -> ${item.broken.join('|')}`);
const remainingEngineering = scans.filter((item) => item.engineering.length).map((item) => item.url);
const detailsMissingTones = scans.filter((item) => detailUrls.includes(item.url) && !item.tones).map((item) => item.url);
const detailsMissingPlay = scans.filter((item) => detailUrls.includes(item.url) && !item.hasPlay).map((item) => item.url);

check('all 158 URLs return 200', missing200.length === 0, missing200.slice(0, 8).join(', '));
check('all 158 URLs have H1', missingH1.length === 0, missingH1.slice(0, 8).join(', '));
check('all 158 stay index,follow', badRobots.length === 0, badRobots.slice(0, 8).join(', '));
check('all 158 canonicals stay pianogrid.com + path', badCanonical.length === 0, badCanonical.slice(0, 8).join(', '));
check('no unknown in-site hrefs', brokenLinks.length === 0, brokenLinks.slice(0, 8).join(' ; '));
check('engineering fingering copy removed from HTML', remainingEngineering.length === 0, remainingEngineering.slice(0, 12).join(', '));
check('all 145 details expose chord tones', detailsMissingTones.length === 0, detailsMissingTones.slice(0, 8).join(', '));
check('all 145 details expose playback controls in HTML', detailsMissingPlay.length === 0, detailsMissingPlay.slice(0, 8).join(', '));

const hub = scans.find((item) => item.url === '/chords');
check('hub browse copy is present', hub && hub.h1.length > 0 && true);
const hubHtml = await (await fetch(base + '/chords')).text();
for (const family of FAMILY) {
  check(`hub links ${family}`, hubHtml.includes(`href="${family}"`), family);
}

const familyLinks = {};
for (const url of ['/chords', ...FAMILY]) {
  const html = await (await fetch(base + url)).text();
  familyLinks[url] = new Set([...html.matchAll(/href="([^"]+)"/g)].map((match) => match[1].split('#')[0]).filter((href) => href.startsWith('/')));
}
const unlinked = detailUrls.filter((url) => {
  if (url === '/chords/c-flat-major') return !(familyLinks['/chords'].has(url) || familyLinks['/chords/major'].has(url));
  const family = url.includes('-madd9') || url.endsWith('-add9') ? '/chords/add'
    : /-(7|m7|m7-flat5|maj7)$/.test(url.split('/').at(-1)) ? '/chords/seventh'
    : url.endsWith('-diminished') ? '/chords/diminished'
    : url.endsWith('-augmented') ? '/chords/augmented'
    : url.endsWith('-sus2') || url.endsWith('-sus4') ? '/chords/suspended'
    : url.endsWith('-minor') ? '/chords/minor'
    : url.endsWith('-major') ? '/chords/major'
    : null;
  return !family || !familyLinks[family].has(url);
});
check('every detail has an SSR family or hub href', unlinked.length === 0, unlinked.slice(0, 12).join(', '));

fs.writeFileSync(resolve(outDir, '_html_scan.json'), JSON.stringify({
  base,
  generatedAt: new Date().toISOString(),
  counts: { module: chordUrls.length, details: detailUrls.length, families: FAMILY.length, structure: STRUCTURE.length },
  failed: results.filter((item) => !item.passed),
  results,
  scans,
}, null, 2) + '\n');

const failed = results.filter((item) => !item.passed);
if (failed.length) {
  console.error(JSON.stringify(failed, null, 2));
  process.exit(1);
}
console.log(JSON.stringify({ ok: true, checks: results.length, urls: scans.length }, null, 2));
