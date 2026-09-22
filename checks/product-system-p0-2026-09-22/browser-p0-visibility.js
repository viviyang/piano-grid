// Separate browser test of observer lifecycle with a deterministic local observer stub.
await page.route('**/*',r=>new URL(r.request().url()).hostname==='127.0.0.1'?r.continue():r.abort()); await page.addInitScript(()=>{
 window.__visibilityFinalEvidence=[];window.__observers=[];
 window.addEventListener('pianogrid:product-event',e=>window.__visibilityFinalEvidence.push(e.detail));
 window.IntersectionObserver=class{constructor(cb){this.cb=cb;this.connected=false;window.__observers.push(this);}observe(el){this.el=el;this.connected=true;}unobserve(){this.connected=false;}disconnect(){this.connected=false;}};
});
const results=[];const record=(name,passed)=>{results.push({name,passed});assert(passed,name);};
await page.goto('http://127.0.0.1:4349/chords/c-major',{waitUntil:'domcontentloaded'});
await page.waitForFunction(()=>document.visibilityState==='visible'&&window.__observers.some(o=>o.connected&&o.el?.className==='cp-reference-summary'));
record('not visible => no exposure',await page.evaluate(()=>!window.__visibilityFinalEvidence.some(e=>e.name==='p0_result_seen')));
await page.evaluate(()=>{for(const o of window.__observers.filter(o=>o.connected))o.cb([{target:o.el,isIntersecting:true,intersectionRatio:1}]);});
record('visible once',await page.evaluate(()=>window.__visibilityFinalEvidence.filter(e=>e.name==='p0_result_seen').length===1));
await page.evaluate(()=>{for(const o of window.__observers.filter(o=>o.connected))o.cb([{target:o.el,isIntersecting:true,intersectionRatio:1}]);});
record('duplicate observer notifications deduped',await page.evaluate(()=>window.__visibilityFinalEvidence.filter(e=>e.name==='p0_result_seen').length===1));
await page.getByRole('radio').nth(1).check();
await page.waitForFunction(()=>window.__observers.filter(o=>o.el?.className==='cp-reference-summary').length>1);
await page.evaluate(()=>{for(const o of window.__observers)o.cb([{target:o.el,isIntersecting:true,intersectionRatio:1}]);});
record('new result state once; stale observer ignored',await page.evaluate(()=>new Set(window.__visibilityFinalEvidence.filter(e=>e.name==='p0_result_seen').map(e=>e.properties.result_state)).size===2));
await page.reload({waitUntil:'domcontentloaded'});await page.waitForFunction(()=>document.visibilityState==='visible'&&window.__observers.some(o=>o.connected&&o.el?.className==='cp-reference-summary'));
await page.evaluate(()=>{for(const o of window.__observers.filter(o=>o.connected))o.cb([{target:o.el,isIntersecting:true,intersectionRatio:1}]);});
record('new document creates a new logical view',await page.evaluate(()=>window.__visibilityFinalEvidence.filter(e=>e.name==='p0_result_seen').length===1));
const path=artifactPath('p0-visibility.json');await (await import('node:fs/promises')).writeFile(path,JSON.stringify(results,null,2));return {path,results};






