import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

function harness({ suspended = false, unavailable = false } = {}) {
  let now = 1000, id = 0, instance;
  const frames = new Map(), statuses = [], starts = [], nodes = [];
  class AudioContext {
    currentTime = 10;
    state = suspended ? 'suspended' : 'running';
    destination = {};
    constructor() { instance = this; }
    addEventListener() {}
    resume() { return new Promise((resolve, reject) => { this.resumeOK = () => { this.state = 'running'; resolve(); }; this.resumeError = reject; }); }
    close() { this.state = 'closed'; return Promise.resolve(); }
    createGain() { return { gain: { setValueAtTime() {}, linearRampToValueAtTime() {} }, connect() {}, disconnect() {} }; }
    createOscillator() {
      const node = { frequency: { setValueAtTime() {} }, connect() {}, disconnect() { node.disconnected = true; }, addEventListener() {}, start(at) { starts.push(at); }, stop() {} };
      nodes.push(node); return node;
    }
  }
  const exports = {};
  const context = vm.createContext({ exports, window: unavailable ? {} : { AudioContext }, document: { hidden: false }, navigator: {},
    performance: { now: () => now }, AbortController,
    setTimeout: (fn, ms) => { if (ms !== 16) return setTimeout(fn, ms); frames.set(++id, fn); return id; },
    clearTimeout: key => { if (typeof key === 'number') frames.delete(key); else clearTimeout(key); },
    requestAnimationFrame: fn => { frames.set(++id, fn); return id; }, cancelAnimationFrame: key => frames.delete(key) });
  vm.runInContext(ts.transpileModule(readFileSync('src/lib/a-minor-audio.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText, context);
  const audio = new exports.ReferenceAudio((state) => statuses.push(state), () => {}, { loading: 'loading', audio_error: 'error', audio_unavailable: 'unavailable' });
  const events = [{ midi: 60, frequency_hz: 261.63, onset_ms: 4000, duration_ms: 800 }];
  return { audio, voicing: { playback: { ascending: events, together: events } }, statuses, starts, nodes,
    get context() { return instance; }, setNow(value) { now = value; },
    tick(time) { instance.currentTime = time; const pending = [...frames.values()]; frames.clear(); pending.forEach(fn => fn()); } };
}

test('startup reports scheduled origin; legacy promise still waits for completion', async () => {
  const h = harness(); let origin, completed = false;
  const pending = h.audio.play(h.voicing, 'ascending', value => { origin = value; }).then(value => { completed = true; return value; });
  assert.ok(Math.abs(origin - 1035) < 0.001);
  assert.deepEqual(h.starts, [14.035]);
  await Promise.resolve(); assert.equal(completed, false);
  h.tick(14.9); assert.equal(await pending, 'completed'); h.audio.dispose();
});

test('suspended context startup uses the resumed clock, never request time', async () => {
  const h = harness({ suspended: true }); let origin;
  let notify;
  const started = new Promise(resolve => { notify = resolve; });
  const pending = h.audio.play(h.voicing, 'ascending', value => { origin = value; notify(); });
  assert.equal(origin, undefined); h.setNow(2500); h.context.resumeOK();
  await started;
  assert.ok(Math.abs(origin - 2535) < 0.001);
  h.audio.cancel(); assert.equal(await pending, 'cancelled');
  assert.ok(h.nodes.every(node => node.disconnected)); h.audio.dispose();
});

test('cancel during resume never emits startup and settles completion', async () => {
  const h = harness({ suspended: true }); let started = 0;
  const pending = h.audio.play(h.voicing, 'ascending', () => started++);
  h.audio.cancel(); h.context.resumeOK();
  assert.equal(await pending, 'cancelled'); assert.equal(started, 0); h.audio.dispose();
});

test('unavailable and rejected resume settle without a false startup', async () => {
  for (const unavailable of [true, false]) {
    const h = harness({ unavailable, suspended: true }); let started = 0;
    const pending = h.audio.play(h.voicing, 'ascending', () => started++);
    if (!unavailable) h.context.resumeError(new Error('Denied'));
    assert.equal(await pending, unavailable ? 'unavailable' : 'error');
    assert.equal(started, 0); h.audio.dispose();
  }
});

test('superseded playback is cancelled while the new playback completes', async () => {
  const h = harness();
  const first = h.audio.play(h.voicing, 'ascending');
  const second = h.audio.play(h.voicing, 'together');
  assert.equal(await first, 'cancelled'); h.tick(14.9);
  assert.equal(await second, 'completed'); h.audio.dispose();
});
