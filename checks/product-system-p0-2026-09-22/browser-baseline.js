// Execute with Tabbit nodejs stdin; no external analytics requests are allowed.
const routes=['/chords','/chords/finder','/chords/c-major','/chords/a-minor','/chords/c-maj7','/chords/c-diminished','/chords/c-add9','/scales/c-major','/keyboard-notes'];
await page.route('**/*',async route=>{
 const url=new URL(route.request().url());
 if(url.hostname==='127.0.0.1')await route.continue();else await route.abort();
});
const results=[];
for(const width of [1440,390]){
 await page.setViewportSize({width,height:900});
 for(const path of routes){
  await page.goto('http://127.0.0.1:4348'+path,{waitUntil:'domcontentloaded'});
  await page.locator('main h1').waitFor();
  results.push(await page.evaluate(({path,width})=>({path,width,title:document.title,h1:document.querySelectorAll('main h1').length,canonical:document.querySelector('link[rel="canonical"]')?.href,overflow:document.documentElement.scrollWidth>window.innerWidth,gaLoaded:!!document.querySelector('script[src*="googletagmanager"]'),clarityLoaded:!!document.querySelector('script[src*="clarity.ms"]')}),{path,width}));
 }
}
await page.goto('http://127.0.0.1:4348/chords/finder',{waitUntil:'domcontentloaded'});
await page.getByRole('button',{name:'C',exact:true}).click();
await page.getByRole('button',{name:'E',exact:true}).click();
await page.getByRole('button',{name:'G',exact:true}).click();
await expect(page.locator('[data-result-state]')).toHaveAttribute('data-result-state','matches');
const candidates=await page.locator('.fd-candidates article').count();
await page.getByLabel('Lowest note (optional)').selectOption('4');
const bass=await page.locator('#finder-bass').inputValue();
await page.getByRole('button',{name:'Clear',exact:true}).click();
await expect(page.locator('[data-result-state]')).toHaveAttribute('data-result-state','empty');
const fs=await import('node:fs/promises');
const result={results,finder:{candidates,bass,clear:'PASS'},phase:'before',note:'viewport checks are not physical-device acceptance'};
const path=artifactPath('p0-baseline.json');await fs.writeFile(path,JSON.stringify(result,null,2));
return {path,...result};
