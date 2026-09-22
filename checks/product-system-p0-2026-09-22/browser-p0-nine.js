const results=[],errors=[];page.setDefaultTimeout(8000);page.on('pageerror',e=>errors.push(e.message));
const routes=['/chords','/chords/finder','/chords/c-major','/chords/a-minor','/chords/c-maj7','/chords/c-diminished','/chords/c-add9','/scales/c-major','/keyboard-notes'];
for(const width of [1440,390]){await page.setViewportSize({width,height:950});for(const route of routes){
 const response=await page.goto('http://127.0.0.1:4349'+route,{waitUntil:'domcontentloaded'});
 await page.locator('h1').waitFor();
 if(route==='/chords/finder'){for(const name of ['C','E','G'])await page.getByRole('button',{name,exact:true}).click();}
 const selector=route==='/chords'?'.ch-results-bar':route==='/chords/finder'?'.fd-results':route==='/chords/c-major'?'.cp-reference-summary':route.startsWith('/chords/')?'.am-current-result':route.startsWith('/scales/')?'.sc-tool':'.kn-v2-explore-head';
 await page.locator(selector).scrollIntoViewIfNeeded();
 let exposed=true;try{await page.waitForFunction(()=>window.__p0.some(e=>e.name==='p0_result_seen'),null,{timeout:5000});}catch{exposed=false;}
 results.push({route,width,status:response.status(),exposed,...await page.evaluate(()=>({h1:document.querySelectorAll('h1').length,overflow:document.documentElement.scrollWidth>innerWidth,canonical:document.querySelector('link[rel=canonical]')?.href,events:window.__p0,analyticsScripts:[...document.scripts].filter(s=>/googletagmanager|clarity.ms/.test(s.src)).length}))});
}}
for(const route of ['/chords/d-major','/scales/d-major','/keyboard-notes/labeled','/chords/by-key','/chord-progressions']){
 await page.goto('http://127.0.0.1:4349'+route,{waitUntil:'domcontentloaded'});await page.locator('h1').waitFor();results.push({route,nonPilot:true,newEvents:await page.evaluate(()=>window.__p0.length)});
}
const path=artifactPath('p0-nine-pages.json');await(await import('node:fs/promises')).writeFile(path,JSON.stringify({results,errors},null,2));return {path,results:results.map(({events,...r})=>({...r,eventNames:events?.map(e=>e.name)})),errors};
