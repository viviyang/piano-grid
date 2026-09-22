import test from 'node:test';
import assert from 'node:assert/strict';
import { createMeasurementSession, createSettler, createPracticeAttempt, finderFingerprint, isP0Path, P0_PATHS, RESULT_SETTLE_MS } from '../src/lib/product-measurement-core.ts';
test('nine paths only; input fingerprint has only supported state',()=>{
 assert.equal(P0_PATHS.length,9);assert.equal(isP0Path('/chords/d-major'),false);
 assert.equal(finderFingerprint([7,0,4,0],4,'interpret'),'0-4-7:4:interpret');
 assert.notEqual(finderFingerprint([0,4,7],4,'root'),finderFingerprint([0,4,7],4,'interpret'));
});
test('logical-view exposure and engaged denominator cannot exceed 100%',()=>{
 const view=createMeasurementSession();assert.equal(view.rate(),null);
 assert.equal(view.engage('c'),false);assert.equal(view.once('seen:c'),true);
 assert.equal(view.once('seen:c'),false);assert.equal(view.engage('c'),true);assert.equal(view.engage('c'),false);
 assert.equal(view.rate(),1);view.once('seen:a');assert.equal(view.rate(),0.5);
 assert.equal(createMeasurementSession().once('seen:c'),true);
});
test('300ms settling cancels stale input, even if an old callback is delivered',()=>{
 const queue=[],calls=[];const settle=createSettler((fn,ms)=>{assert.equal(ms,300);queue.push(fn);return queue.length;},()=>{});
 assert.equal(RESULT_SETTLE_MS,300);settle.update(()=>calls.push('old'));settle.update(()=>calls.push('new'));
 queue[0]();queue[1]();assert.deepEqual(calls,['new']);settle.update(()=>calls.push('cancelled'));settle.cancel();queue[2]();assert.deepEqual(calls,['new']);
});
test('help stays sticky across retries; success repeats are not new completions',()=>{
 const task=createPracticeAttempt();assert.equal(task.start(),1);assert.equal(task.start(),null);task.reveal();
 assert.equal(task.complete().assisted,true);assert.equal(task.complete(),null);task.reset();assert.equal(task.start(),2);assert.equal(task.complete().assisted,true);
 const independent=createPracticeAttempt();assert.equal(independent.complete().assisted,false);
});
test('existing transport handles absent and throwing gtag without breaking the task',async()=>{
 process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID='G-LOCAL-STUB';process.env.NEXT_PUBLIC_PIANOGRID_ANALYTICS_PROVIDER='ga4';
 const {sendAnalyticsEvent}=await import('../src/lib/analytics.ts');
 globalThis.window={location:{pathname:'/chords'}};
 assert.equal(sendAnalyticsEvent('test'),false);
 window.gtag=()=>{throw Error('blocked');};assert.equal(sendAnalyticsEvent('test'),false);
 const calls=[];window.gtag=(...args)=>calls.push(args);assert.equal(sendAnalyticsEvent('test'),true);assert.equal(calls.length,1);
 delete globalThis.window;
});
