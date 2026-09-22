const fs=await import('node:fs/promises');const results=[],errors=[];page.setDefaultTimeout(8000);page.on('pageerror',e=>errors.push(e.message));
await page.addInitScript(()=>{
  window.__audioEvents=[];window.__audioContexts=[];
  const C=window.AudioContext||window.webkitAudioContext;
  if(!C)return;
  const create=C.prototype.createOscillator;
  C.prototype.createOscillator=function(...args){
    if(!window.__audioContexts.includes(this))window.__audioContexts.push(this);
    const node=create.apply(this,args),start=node.start,stop=node.stop,context=this;
    const event={frequency:0,start:0,end:0};
    node.start=function(at=0){event.frequency=node.frequency.value;event.start=at;window.__audioEvents.push(event);return start.call(node,at);};
    node.stop=function(at=0){event.end=at;return stop.call(node,at);};
    return node;
  };
});
await page.goto('http://127.0.0.1:4353/scales/c-major',{waitUntil:'domcontentloaded'});
await page.getByLabel('Tempo BPM',{exact:true}).fill('120');
await page.evaluate(()=>{window.__samples=[];window.__sampler=setInterval(()=>{const p=document.querySelector('#follow-along');window.__samples.push({clock:window.__audioContexts.at(-1)?.currentTime,state:p?.getAttribute('data-practice-state'),cue:p?.querySelector('.sc-learning-head strong')?.textContent,visible:document.visibilityState});},25);});
await page.getByRole('button',{name:'Start practice',exact:true}).click();
await expect(page.locator('#follow-along')).toHaveAttribute('data-practice-state','counting',{timeout:3000});
await expect(page.locator('#follow-along')).toHaveAttribute('data-practice-state','completed',{timeout:12000});
const evidence=await page.evaluate(()=>{clearInterval(window.__sampler);return {samples:window.__samples,events:window.__audioEvents};});
const music=evidence.events.filter(e=>e.frequency<1000),midi=music.map(e=>Math.round(69+12*Math.log2(e.frequency/440)));
assert.deepEqual(midi,[60,62,64,65,67,69,71,72]);
const cues=['C4','D4','E4','F4','G4','A4','B4','C5'];let checked=0;const mismatches=[];
for(const s of evidence.samples){const i=music.findIndex(e=>s.clock>e.start+.08&&s.clock<e.end-.04);if(i>=0){checked++;if(s.cue!==cues[i]||s.state!=='playing')mismatches.push(s);}}
assert(checked>=20);assert.equal(mismatches.length,0);results.push({name:'actual WebAudio note sequence and clock match visual practice cues',passed:true,checked,mismatches});
await page.getByRole('button',{name:'Start practice',exact:true}).click();await expect(page.locator('#follow-along')).toHaveAttribute('data-practice-state','counting');
await page.evaluate(async()=>{await window.__audioContexts.at(-1).suspend();});
await expect(page.locator('#follow-along')).toHaveAttribute('data-practice-state','error');
await page.getByRole('button',{name:'Use silent guide',exact:true}).click();await expect(page.locator('#follow-along')).toHaveAttribute('data-practice-state','counting');
await page.getByRole('button',{name:'Stop and reset',exact:true}).click();results.push({name:'output interruption stops the visual timeline and offers silent recovery',passed:true});
await page.getByRole('button',{name:'Start practice',exact:true}).click();await expect(page.locator('#follow-along')).toHaveAttribute('data-practice-state','counting');
await page.evaluate(()=>window.dispatchEvent(new Event('pagehide')));await expect(page.locator('#follow-along')).toHaveAttribute('data-practice-state','idle');results.push({name:'pagehide cancels the practice',passed:true});
const path=artifactPath('audio-clock.json');await fs.writeFile(path,JSON.stringify({results,errors,...evidence},null,2));return {path,results,errors};
