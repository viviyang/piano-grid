import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  getHearPair,
  getHearPairs,
  hearCompareRoles,
  hearPairCount,
  hearShareParams,
  HEAR_PAIR_ORDER,
  HEAR_PATH,
  nextHearPairId,
  parseHearPairId,
  restoreHearPair,
} from '../src/lib/hear-the-difference.ts';
import { getHearMeasurementConfiguration } from '../src/lib/hear-the-difference-events.ts';
import { getChordCenter, getChordDetail } from '../src/lib/chord-content.ts';
import { SEO_COPY } from '../src/lib/seo-editorial.ts';
import { PUBLIC_ROUTES, SITE_NAVIGATION } from '../src/lib/site-routes.ts';
import { getToolsModel } from '../src/lib/integration-content.ts';
import { getPianoChordsGuide } from '../src/lib/support-content.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'checks/product-upgrade-2026-09-15/b04-hear-the-difference');
mkdirSync(outDir, { recursive: true });

const results = [];
function test(name, fn) {
  try {
    fn();
    results.push({ name, passed: true });
  } catch (error) {
    results.push({ name, passed: false, detail: error instanceof Error ? error.message : String(error) });
  }
}

test('four curated pairs minor→major', () => {
  const pairs = getHearPairs();
  assert.equal(pairs.length, 4);
  assert.deepEqual(pairs.map(pair => pair.id), ['a', 'c', 'd', 'e']);
  for (const pair of pairs) {
    assert.equal(pair.direction, 'raise-one-semitone');
    assert.equal(pair.voicing, 'root-position-close');
    assert.equal(pair.answer, 'middle');
    assert.equal(pair.majorNotes[1].midi - pair.minorNotes[1].midi, 1);
    assert.equal(pair.minorNotes[0].midi, pair.majorNotes[0].midi);
    assert.equal(pair.minorNotes[2].midi, pair.majorNotes[2].midi);
  }
});

test('exact B04 listening pitches', () => {
  assert.deepEqual(getHearPair('a').minorNotes.map(n => n.midi), [57, 60, 64]);
  assert.deepEqual(getHearPair('a').majorNotes.map(n => n.midi), [57, 61, 64]);
  assert.deepEqual(getHearPair('c').minorNotes.map(n => n.midi), [60, 63, 67]);
  assert.deepEqual(getHearPair('c').majorNotes.map(n => n.midi), [60, 64, 67]);
  assert.deepEqual(getHearPair('d').minorNotes.map(n => n.midi), [62, 65, 69]);
  assert.deepEqual(getHearPair('d').majorNotes.map(n => n.midi), [62, 66, 69]);
  assert.deepEqual(getHearPair('e').minorNotes.map(n => n.midi), [64, 67, 71]);
  assert.deepEqual(getHearPair('e').majorNotes.map(n => n.midi), [64, 68, 71]);
});

test('deterministic next pair cycle', () => {
  assert.equal(nextHearPairId('a'), 'c');
  assert.equal(nextHearPairId('c'), 'd');
  assert.equal(nextHearPairId('d'), 'e');
  assert.equal(nextHearPairId('e'), 'a');
  assert.equal(hearPairCount(), 4);
});

test('share URL restores pair only', () => {
  const params = hearShareParams('d', { from: 'share' });
  assert.equal(params.get('pair'), 'd');
  assert.equal(params.get('from'), 'share');
  assert.equal(params.has('answer'), false);
  assert.equal(params.has('guess'), false);
  assert.equal(params.has('method'), false);
  assert.equal(restoreHearPair(params), 'd');
  assert.equal(parseHearPairId('nope'), 'a');
  assert.equal(HEAR_PATH, '/tools/hear-the-difference');
});

test('compare roles only expose answer keys when requested', () => {
  const roles = hearCompareRoles(getHearPair('a'));
  assert.equal(roles[57], 'common');
  assert.equal(roles[64], 'common');
  assert.equal(roles[60], 'source');
  assert.equal(roles[61], 'target');
});

test('public route, sitemap eligibility, tools nav', () => {
  assert.ok(PUBLIC_ROUTES.includes('/tools/hear-the-difference'));
  const tools = SITE_NAVIGATION.find(item => item.label === 'Tools');
  assert.ok(tools?.children.some(child => child.href === '/tools/hear-the-difference' && child.label === 'Hear the Difference'));
  assert.ok(!SITE_NAVIGATION.some(item => item.label === 'Listen & Practice'));
});

test('tools hub entry exists', () => {
  const tools = getToolsModel();
  const item = tools.practiceLinks.find(link => link.id === 'hear-the-difference');
  assert.ok(item);
  assert.equal(item.url, '/tools/hear-the-difference');
  assert.match(item.description, /one note/i);
});

test('SEO copy present and analytics unconfigured', () => {
  assert.equal(SEO_COPY['/tools/hear-the-difference']?.title.includes('Hear the Difference'), true);
  assert.equal(getHearMeasurementConfiguration().status, 'ANALYTICS_NOT_CONFIGURED');
});

test('chord detail inbound links for A/C/D/E', () => {
  for (const id of HEAR_PAIR_ORDER) {
    const pair = getHearPair(id);
    for (const url of [pair.minorURL, pair.majorURL]) {
      const model = getChordDetail(url);
      const related = model.blocks.find(block => block.block_id.endsWith('-related') || block.block_id === 'am-next');
      assert.ok(related?.content.links.some(link => link.url.startsWith(`/tools/hear-the-difference?pair=${id}`)), url);
    }
  }
});

test('guide inbound link present', () => {
  const guide = getPianoChordsGuide();
  assert.ok(guide.model.links.some(link => link.url === '/tools/hear-the-difference'));
});

test('center has low-weight hear link', () => {
  const center = getChordCenter();
  const next = center.blocks.find(block => block.block_id === 'chords-next');
  assert.ok(next?.content.links.some(link => link.url === '/tools/hear-the-difference'));
});

const failed = results.filter(item => !item.passed);
writeFileSync(join(outDir, 'unit-results.json'), `${JSON.stringify({ passed: results.length - failed.length, failed: failed.length, results }, null, 2)}\n`);
for (const item of results) console.log(`${item.passed ? 'PASS' : 'FAIL'} ${item.name}${item.detail ? ` :: ${item.detail}` : ''}`);
if (failed.length) {
  console.error(`B04 unit checks failed: ${failed.length}`);
  process.exitCode = 1;
} else {
  console.log(`B04 unit checks passed: ${results.length}`);
}
