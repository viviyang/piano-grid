import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import ts from 'typescript';
import { readFileSync } from 'node:fs';

function harness() {
  let controller;
  class ReferenceAudio {
    available = true;
    constructor(status) { this.status = status; controller = this; }
    cancel() { this.finish?.('cancelled'); }
    play(_events, _mode, onStarted) { this.start = onStarted; return new Promise(resolve => { this.finish = resolve; }); }
  }
  const exports = {};
  const react = { useCallback: fn => fn, useRef: current => ({ current }), useState: initial => [initial, () => {}], useEffect: fn => fn() };
  const events = { addEventListener() {}, removeEventListener() {} };
  vm.runInNewContext(ts.transpileModule(readFileSync('src/components/scales/use-scale-audio.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText,
    { exports, require: name => name === 'react' ? react : { ReferenceAudio }, window: events, document: events, performance });
  return { audio: exports.useScaleAudio(), get controller() { return controller; } };
}

test('scale startup settles before completion and carries the actual origin', async () => {
  const h = harness(), token = h.audio.beginSession('practice');
  const pending = h.audio.playRawEvents([], token);
  h.controller.start(1234);
  const result = await pending;
  assert.equal(result.ok, true); assert.equal(result.startedAtMs, 1234);
  h.controller.finish('completed');
});

test('cancel before startup settles as cancelled, never a success', async () => {
  const h = harness(), token = h.audio.beginSession('practice');
  const pending = h.audio.playRawEvents([], token);
  h.audio.cancel();
  assert.equal((await pending).reason, 'cancelled');
  assert.equal((await h.audio.playRawEvents([], token)).reason, 'cancelled');
});

test('post-start output failure invalidates session and notifies practice cancellation', async () => {
  const h = harness(), token = h.audio.beginSession('practice'), reasons = [];
  h.audio.registerCancellation(reason => reasons.push(reason));
  const pending = h.audio.playRawEvents([], token);
  h.controller.start(1234); assert.equal((await pending).ok, true);
  h.controller.status('error', 'failed'); h.controller.finish('error');
  assert.equal(h.audio.isCurrent(token), false); assert.deepEqual(reasons, ['audio_error']);
});

test('unavailable startup remains a recoverable failure', async () => {
  const h = harness(), token = h.audio.beginSession('practice'); h.controller.available = false;
  assert.equal((await h.audio.playRawEvents([], token)).reason, 'unavailable');
});
