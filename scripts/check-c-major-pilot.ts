import assert from 'node:assert/strict';
import { writeFileSync, mkdirSync } from 'node:fs';
import { emptyChordAttempt, toggleChordNote, clearChordAttempt, checkChordAttempt, chordAttemptKind, chordAttemptMessage } from '../src/lib/chord-pilot-practice.ts';
import { ReferenceAudio } from '../src/lib/a-minor-audio.ts';

const results: {name:string;passed:boolean}[]=[];
function check(name:string,run:()=>void){run();results.push({name,passed:true});}
const answer=[60,64,67];
const selected=(notes:number[])=>notes.reduce(toggleChordNote,emptyChordAttempt());
check('Pitch-class grading ignores octave and order',()=>assert.equal(checkChordAttempt(selected([79,72,76]),answer).result,'correct'));
check('Octave doubling toggles one pitch class rather than counting twice',()=>assert.deepEqual(selected([60,72]).selected,[]));
check('Cannot grade fewer than three distinct pitch classes',()=>assert.equal(checkChordAttempt(selected([60,64]),answer).result,'unanswered'));
check('Extra notes are rejected',()=>assert.equal(checkChordAttempt(selected([60,64,67,69]),answer).result,'wrong'));
check('First correct is independent',()=>assert.equal(chordAttemptKind(checkChordAttempt(selected(answer),answer)),'independent'));
check('Wrong then correct retains retry classification',()=>{
  const wrong=checkChordAttempt(selected([60,64,66]),answer);
  const corrected=checkChordAttempt(toggleChordNote(toggleChordNote(wrong,66),67),answer);
  assert.equal(chordAttemptKind(corrected),'assisted');assert.match(chordAttemptMessage(corrected),/after retrying/);
});
check('Hint, reference and reveal survive Clear and Try again',()=>{
  const helped=clearChordAttempt({...selected(answer),hinted:true,viewedReference:true,revealed:true});
  const corrected=checkChordAttempt({...helped,selected:[0,4,7]},answer);
  assert.equal(chordAttemptKind(corrected),'revealed');assert.equal(corrected.hinted,true);assert.equal(corrected.viewedReference,true);
});

// Fake Web Audio clocks/voices exercise ownership and cancellation, not speaker quality.
let nextFrame=0;
const frames=new Map<number,FrameRequestCallback>();
Object.assign(globalThis,{window:{},document:{hidden:false},requestAnimationFrame:(fn:FrameRequestCallback)=>{frames.set(++nextFrame,fn);return nextFrame;},cancelAnimationFrame:(id:number)=>frames.delete(id)});
class Param { value=0; setValueAtTime(value:number){this.value=value;} linearRampToValueAtTime(value:number){this.value=value;} setTargetAtTime(value:number){this.value=value;} }
const oscillators:FakeOscillator[]=[];
class FakeOscillator { type=''; frequency=new Param(); stopped=false; connected=true; connect(){} disconnect(){this.connected=false;} start(){} stop(when?:number){if(when===undefined)this.stopped=true;} addEventListener(){} }
class FakeGain { gain=new Param(); connected=true; connect(){} disconnect(){this.connected=false;} }
class FakeContext { state='running';currentTime=0;destination={};createOscillator(){const node=new FakeOscillator();oscillators.push(node);return node;}createGain(){return new FakeGain();}addEventListener(){}async resume(){this.state='running';}async close(){this.state='closed';} }
(window as unknown as {AudioContext:typeof FakeContext}).AudioContext=FakeContext;
let marked:number[]=[],status='';
const create=()=>new ReferenceAudio(state=>{status=state;},notes=>{marked=notes;},{loading:'loading',audio_error:'error',audio_unavailable:'unavailable'});
const engine=create();
await engine.press(60,'pointer:1');await engine.press(60,'key:Space:60');
check('Two input sources share a live note',()=>assert.deepEqual(marked,[60]));
engine.release('pointer:1');
check('Releasing one source preserves the other source',()=>assert.deepEqual(marked,[60]));
engine.release('key:Space:60');
check('Final source release clears note',()=>assert.deepEqual(marked,[]));
engine.setSustain(true);await engine.press(64,'pointer:2');engine.release('pointer:2');
check('Sustain holds released note',()=>assert.deepEqual(marked,[64]));
engine.cancel();
check('Stop overrides sustain and clears every oscillator',()=>{assert.deepEqual(marked,[]);assert.ok(oscillators.every(n=>n.stopped));});
await engine.press(67,'pointer:3');engine.release('pointer:3');engine.setSustain(false);
check('Sustain off releases unheld voices',()=>assert.deepEqual(marked,[]));
const playback={together:[{midi:60,frequency_hz:261.63,onset_ms:0,duration_ms:1000}],ascending:[{midi:60,frequency_hz:261.63,onset_ms:0,duration_ms:1000}]};
const playing=engine.play({playback},'together');
await engine.press(60,'pointer:4');engine.release('pointer:4');
engine.cancel();
check('Scheduled cancellation settles its promise',()=>assert.equal(frames.size,0));
assert.equal(await playing,'cancelled');
const interrupted=engine.play({playback},'ascending');engine.dispose();assert.equal(await interrupted,'cancelled');
check('Unmount clears scheduled and live voices',()=>{assert.deepEqual(marked,[]);assert.ok(oscillators.every(n=>n.stopped));});
delete (window as unknown as {AudioContext?:typeof FakeContext}).AudioContext;
const unavailable=create();await unavailable.press(60,'test');
check('Missing AudioContext reports unavailable',()=>assert.equal(status,'unavailable'));
class FailingContext extends FakeContext { async resume(){throw new Error('blocked');}constructor(){super();this.state='suspended';} }
(window as unknown as {AudioContext:typeof FakeContext}).AudioContext=FailingContext;
const failed=create();await failed.press(60,'blocked');
check('Audio start failure cleans live voices',()=>{assert.equal(status,'error');assert.deepEqual(marked,[]);assert.ok(oscillators.every(n=>n.stopped));});
class SuspendedContext extends FakeContext { constructor(){super();this.state='suspended';}async resume(){await new Promise<void>(()=>{});} }
(window as unknown as {AudioContext:typeof FakeContext}).AudioContext=SuspendedContext;
const pending=create(),pressing=pending.press(60,'pending');pending.cancel();await pressing;
check('Stop cancels an unresolved live resume',()=>{assert.deepEqual(marked,[]);assert.ok(oscillators.every(n=>n.stopped));});
(window as unknown as {AudioContext:typeof FakeContext}).AudioContext=FakeContext;
const a=create(),b=create();await a.press(60,'a');await b.press(64,'b');
check('A second audio owner cancels the first engine',()=>{assert.equal(a.currentStatus,'idle');assert.deepEqual(marked,[64]);});
b.dispose();a.dispose();
mkdirSync('checks/piano-design-system-fix',{recursive:true});
writeFileSync('checks/piano-design-system-fix/unit-results.json',JSON.stringify({results,passed:results.length,failed:0},null,2));
console.log(`C-major pilot: ${results.length} assertions passed.`);
