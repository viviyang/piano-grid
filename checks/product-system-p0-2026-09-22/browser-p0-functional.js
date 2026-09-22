// Tabbit browser-owned runtime; local production only, no external request permitted.
await page.route('**/*',route=>new URL(route.request().url()).hostname==='127.0.0.1'?route.continue():route.abort());
await page.addInitScript(()=>{
 window.__p0=[];window.addEventListener('pianogrid:product-event',e=>window.__p0.push(e.detail));
 window.__legacy=[];for(const name of ['pianogrid:scale-event','pianogrid:keyboard-practice-event'])window.addEventListener(name,e=>window.__legacy.push(e.detail));
 window.print=()=>{window.dispatchEvent(new Event('beforeprint'));window.dispatchEvent(new Event('afterprint'));};
});
const base='http://127.0.0.1:4349';
const results=[],errors=[];page.on('pageerror',error=>errors.push(error.message));
async function check(name,run){try{await run();results.push({name,passed:true});}catch(error){results.push({name,passed:false,error:String(error).slice(0,650)});}}
const counts=()=>page.evaluate(()=>Object.fromEntries([...new Set(window.__p0.map(e=>e.name))].map(n=>[n,window.__p0.filter(e=>e.name===n).length])));
await page.goto(base+'/chords/finder',{waitUntil:'domcontentloaded'});
await check('Finder published help',async()=>{await expect(page.locator('#how-to-enter')).toContainText('Select each different note');await expect(page.locator('#how-to-enter')).not.toContainText('Enter pitch names with octave');});
await check('empty/single inputs do not issue result/no-match',async()=>{
 await page.getByRole('button',{name:'C',exact:true}).click();
 await expect(page.locator('[data-result-state]')).toHaveAttribute('data-result-state','incomplete');
 await page.waitForFunction(()=>window.__p0.some(e=>e.name==='p0_tool_start'));
 assert.equal((await counts()).finder_no_match||0,0);assert.equal((await counts()).p0_tool_result||0,0);
});
await page.getByRole('button',{name:'E',exact:true}).click();await page.getByRole('button',{name:'G',exact:true}).click();
await check('stable complete result and visible aggregate counted',async()=>{
 await page.locator('.fd-results').scrollIntoViewIfNeeded();
 await page.waitForFunction(()=>window.__p0.some(e=>e.name==='p0_tool_result'&&e.properties.result_state==='0-4-7:none:interpret'));
 await page.waitForFunction(()=>window.__p0.some(e=>e.name==='p0_result_seen'&&e.properties.result_state==='0-4-7:none:interpret'));
});
await check('repeated visibility does not double count',async()=>{
 const before=await counts();await page.locator('h1').scrollIntoViewIfNeeded();await page.locator('.fd-results').scrollIntoViewIfNeeded();
 await page.evaluate(()=>document.dispatchEvent(new Event('visibilitychange')));
 assert.equal((await counts()).p0_result_seen,before.p0_result_seen);
});
await page.getByLabel('Lowest note (optional)').selectOption('4');
await check('bass state uses actual fingerprint',async()=>{await page.waitForFunction(()=>window.__p0.some(e=>e.name==='p0_tool_result'&&e.properties.result_state==='0-4-7:4:interpret'));});
await page.getByRole('button',{name:'Clear',exact:true}).click();
await page.getByRole('button',{name:'C',exact:true}).click();await page.getByRole('button',{name:'C sharp or D flat',exact:true}).click();
await check('registry-derived C/C-sharp no-match',async()=>{await expect(page.locator('[data-result-state]')).toHaveAttribute('data-result-state','none');await page.waitForFunction(()=>window.__p0.some(e=>e.name==='finder_no_match'&&e.properties.result_state==='0-1:none:interpret'));assert.equal((await counts()).p0_tool_start,1);});
const finderEvents=await page.evaluate(()=>window.__p0);
await page.goto(base+'/guide/piano-chords',{waitUntil:'domcontentloaded'});
await check('guide task link reaches Finder',async()=>{await page.getByRole('link',{name:'Identify a chord from selected notes',exact:true}).click();await expect(page).toHaveURL(/\/chords\/finder$/);});
await page.goto(base+'/chords/c-add9',{waitUntil:'domcontentloaded'});
await check('revealed add-chord answer is assisted, no duplicate completion',async()=>{
 const practice=page.locator('#practice');await practice.getByRole('button',{name:'Show answer',exact:true}).click();await practice.getByRole('button',{name:'Check answer',exact:true}).click();
 await page.waitForFunction(()=>window.__p0.some(e=>e.name==='p0_practice_complete'));
 const completed=await page.evaluate(()=>window.__p0.filter(e=>e.name==='p0_practice_complete'));
 assert.equal(completed[0].properties.assisted,true);
 await practice.getByRole('button',{name:'Check answer',exact:true}).click();assert.equal((await counts()).p0_practice_complete,1);
});
await page.goto(base+'/chords/d-major',{waitUntil:'domcontentloaded'});
await check('non-pilot has no new measurement side effects',async()=>{await page.locator('.am-current-result').scrollIntoViewIfNeeded();assert.deepEqual(await counts(),{});});
const path=artifactPath('p0-functional.json');await (await import('node:fs/promises')).writeFile(path,JSON.stringify({results,errors,finderEvents},null,2));return {path,results,errors};
