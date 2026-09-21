page.setDefaultNavigationTimeout(30000);
const results=[];const failures=[];page.on('pageerror',e=>failures.push(e.message));
for(const route of ['/chords/a-major','/scales/c-major','/keyboard-notes','/']){
 await page.setViewportSize({width:1440,height:900});await page.goto('http://localhost:3127'+route,{waitUntil:'domcontentloaded'});
 await expect(page.locator('.cp-pilot')).toHaveCount(0);const title=await page.title();const widths=[];
 for(const width of [1440,390]){await page.setViewportSize({width,height:900});const d=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));assert.ok(d.scroll<=d.width,route);widths.push(d);}
 results.push({route,title,noPilot:true,widths});
}
await page.setViewportSize({width:1440,height:900});await page.goto('http://localhost:3127/chords/a-major',{waitUntil:'domcontentloaded'});
await expect(page.getByRole('button',{name:'Play chord',exact:true})).toBeEnabled();await page.getByRole('button',{name:'Play chord',exact:true}).click();await expect(page.locator('.am-tool')).toHaveAttribute('data-audio-state','playing');await page.getByRole('button',{name:'Stop',exact:true}).click();await expect(page.locator('main .am-is-sounding')).toHaveCount(0);
await page.evaluate(()=>document.documentElement.style.fontSize='200%');const legacyZoom=await page.evaluate(()=>({width:innerWidth,page:document.documentElement.scrollWidth,header:document.querySelector('.am-header-right').getBoundingClientRect().right}));await page.evaluate(()=>document.documentElement.style.removeProperty('font-size'));
const file=artifactPath('browser-regression.json');await (await import('node:fs/promises')).writeFile(file,JSON.stringify({results,legacyAudio:true,legacyZoom,errors:failures},null,2));return {results,legacyAudio:true,legacyZoom,errors:failures,file};