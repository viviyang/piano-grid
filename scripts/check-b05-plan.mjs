import assert from 'node:assert/strict';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const catalog = JSON.parse(readFileSync('docs/content/songs-sheet-v2/content-data/catalog.v2.json', 'utf8'));
const copy = JSON.parse(readFileSync('docs/product-upgrade/b05-b07-v2/data/content.en.json', 'utf8'));
const siteRoutes = readFileSync('src/lib/site-routes.ts', 'utf8');

const MAP = {
  twinkle: 'arr-ext-c3a78b0c5cb213',
  'hot-cross-buns': 'arr-ext-0a05b7954f5256',
  'ode-to-joy': 'arr-ext-a60b8d92c5a325',
};
const CURRENT_PLAN_KEY = 'twinkle-early-elementary';
const CURRENT_PLAN_REVISION = 1;
const KEY_PATTERN = /^[a-z0-9-]{1,64}$/;

function parsePlanSearch(search) {
  const plans = search.getAll('plan');
  const revisions = search.getAll('plan-v');
  if (plans.length === 0 && revisions.length === 0) return { kind: 'none' };
  if (plans.length !== 1 || revisions.length !== 1) return { kind: 'unavailable', reason: 'duplicate' };
  const publicKey = plans[0];
  const revisionRaw = revisions[0];
  if (!KEY_PATTERN.test(publicKey) || !/^[0-9]{1,4}$/.test(revisionRaw)) return { kind: 'unavailable', reason: 'malformed' };
  if (publicKey !== CURRENT_PLAN_KEY || Number(revisionRaw) !== CURRENT_PLAN_REVISION) return { kind: 'unavailable', reason: 'expired' };
  return { kind: 'shared', publicKey, revision: Number(revisionRaw) };
}

const results = [];
function test(name, fn) {
  try { fn(); results.push({ name, passed: true }); }
  catch (error) { results.push({ name, passed: false, detail: error.message }); }
}

test('edition adapter maps three existing arrangement IDs', () => {
  for (const [key, id] of Object.entries(MAP)) {
    const arrangement = catalog.arrangements.find((item) => item.arrangement_id === id);
    assert.ok(arrangement, key);
    assert.equal(arrangement.representation, 'external_reference');
    assert.equal(arrangement.score_asset_id, null);
    assert.equal(arrangement.audio_asset_id, null);
  }
});

test('in-site capabilities stay false without hosted assets', () => {
  const arrangement = catalog.arrangements.find((item) => item.arrangement_id === MAP.twinkle);
  assert.equal(Boolean(arrangement.score_asset_id || arrangement.audio_asset_id || arrangement.music_events_asset_id), false);
});

test('plan parser whitelist', () => {
  assert.equal(parsePlanSearch(new URLSearchParams()).kind, 'none');
  assert.deepEqual(parsePlanSearch(new URLSearchParams('plan=twinkle-early-elementary&plan-v=1')), { kind: 'shared', publicKey: CURRENT_PLAN_KEY, revision: CURRENT_PLAN_REVISION });
  assert.equal(parsePlanSearch(new URLSearchParams('plan=unknown&plan-v=1')).kind, 'unavailable');
  assert.equal(parsePlanSearch(new URLSearchParams('plan=twinkle-early-elementary&plan-v=2')).kind, 'unavailable');
  assert.equal(parsePlanSearch(new URLSearchParams('plan=twinkle-early-elementary&plan=x&plan-v=1')).kind, 'unavailable');
  assert.equal(parsePlanSearch(new URLSearchParams(`plan=${'x'.repeat(80)}&plan-v=1`)).kind, 'unavailable');
});

test('share URL uses configured origin and no personal fields', () => {
  const url = new URL(`https://pianogrid.com/songs/easy?plan=${CURRENT_PLAN_KEY}&plan-v=${CURRENT_PLAN_REVISION}#first-10-minutes`);
  assert.equal(url.origin, 'https://pianogrid.com');
  assert.equal(url.pathname, '/songs/easy');
  assert.equal([...url.searchParams.keys()].sort().join(','), 'plan,plan-v');
  assert.equal(url.hash, '#first-10-minutes');
});

test('B05 copy has no hosted-player claims', () => {
  const blob = JSON.stringify(copy.easy);
  assert.equal(/Play here|You mastered this song|Learn the whole song in 10 minutes/i.test(blob), false);
  assert.equal(copy.easy.cards[0].primaryHref, '#first-10-minutes');
  assert.ok(copy.easy.cards[1].primaryHref.startsWith('/sheet-music/'));
});

test('no new business routes added for B05', () => {
  assert.ok(siteRoutes.includes("'/songs/easy'"));
  assert.ok(siteRoutes.includes("'/sheet-music/twinkle-twinkle-little-star'"));
  assert.equal(siteRoutes.includes("'/songs/practice-plan'"), false);
});

mkdirSync('docs/product-upgrade/b05-b07-v2/delivery/b05', { recursive: true });
writeFileSync('docs/product-upgrade/b05-b07-v2/delivery/b05/unit-results.json', JSON.stringify({ passed: results.filter((item) => item.passed).length, failed: results.filter((item) => !item.passed).length, results }, null, 2));
console.log(`B05 unit: ${results.filter((item) => item.passed).length} passed / ${results.filter((item) => !item.passed).length} failed`);
for (const result of results.filter((item) => !item.passed)) console.error(`FAIL ${result.name}: ${result.detail}`);
process.exitCode = results.some((item) => !item.passed) ? 1 : 0;
