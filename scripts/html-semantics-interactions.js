// Run through Tabbit nodejs, with both production servers running.
const fs=await import('node:fs/promises');
const results=[],errors=[],screenshots=[];
page.on('pageerror',e=>errors.push(e.message));
page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
async function check(name,fn){try{await fn();results.push({name,passed:true});}catch(e){results.push({name,passed:false,error:String(e)});}}
await page.setViewportSize({width:1440,height:1000});
const geometry=[];
for(const [phase,port] of [['before',3141],['after',3142]]){
 await page.goto(`http://127.0.0.1:${port}/chords`,{waitUntil:'networkidle'});
 const card=page.locator('.ch-result').first();
 const path=artifactPath(`${phase}-card-1440.png`);
 await card.screenshot({path});screenshots.push(path);
 geometry.push(await card.locator('button').evaluateAll(xs=>xs.map(e=>({label:e.querySelector('.pr-sr-only')?.textContent,width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height}))));
}
await check('Identical chord button geometry',async()=>assert.deepEqual(geometry[0],geometry[1]));
await check('SSR chart retains 25 chord articles',async()=>assert.equal(await page.locator('article.ch-result').count(),25));
await check('Root/type filters and radio selection',async()=>{
 await page.locator('#center-root').selectOption('C');
 await expect(page.locator('.ch-result')).toHaveCount(2);
 await page.locator('#center-quality').selectOption('minor');
 await expect(page.locator('.ch-result')).toHaveCount(1);
 await expect(page.locator('.ch-select input')).toBeChecked();
});
await check('Keyboard activation, audio starts/stops',async()=>{
 const play=page.locator('.ch-result').first().getByRole('button',{name:'Play chord',exact:true});
 await play.focus();await play.press('Enter');
 await expect(page.locator('.ch-center')).toHaveAttribute('data-audio-state','playing');
 await page.locator('.ch-result').first().getByRole('button',{name:'Stop',exact:true}).click();
 await expect(page.locator('.ch-center')).toHaveAttribute('data-audio-state','stopped');
});
await check('Print snapshot follows filtered chord',async()=>{
 await page.evaluate(()=>{window.print=()=>{window.dispatchEvent(new Event('beforeprint'));};});
 await page.locator('.ch-result').first().getByRole('button',{name:'Print this chord',exact:true}).click();
 await expect(page.locator('#center-print-content .ch-print-item')).toHaveCount(1);
 assert.match(await page.locator('#center-print-content').innerText(),/C minor/);
 await page.emulateMedia({media:'print'});
 await expect(page.locator('#center-print-content')).toBeVisible();
 await page.emulateMedia({media:'screen'});
 await page.evaluate(()=>window.dispatchEvent(new Event('afterprint')));
});
await check('Rolling animation focus and reduced-motion',async()=>{
 const play=page.locator('.ch-result').first().getByRole('button',{name:'Play chord',exact:true});
 await play.focus();
 await expect(play).toHaveAccessibleName('Play chord');
 const glyph=play.locator('.pr-rolling-text-current > span').first();
 assert.equal(await glyph.evaluate(e=>getComputedStyle(e,'::after').content),'"P"');
 await page.emulateMedia({reducedMotion:'reduce'});
 assert.equal(await glyph.evaluate(e=>getComputedStyle(e).transitionDuration),'0s');
 await page.emulateMedia({reducedMotion:'no-preference'});
});
const path=artifactPath('chord-interactions.json');await fs.writeFile(path,JSON.stringify({results,errors,geometry,screenshots},null,2));
return {path,results,errors,screenshots};
