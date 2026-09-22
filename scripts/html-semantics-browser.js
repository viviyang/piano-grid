// Run via Tabbit nodejs stdin. Set globalThis.htmlPhase to before/after first.
const phase=globalThis.htmlPhase || 'before';
const base=phase==='before'?'http://127.0.0.1:3141':'http://127.0.0.1:3142';
const routes=['/','/chords','/chords/c-major','/scales/c-major','/arpeggios','/keyboard-notes/labeled',...['add','augmented','diminished','major','minor','seventh','suspended'].map(x=>`/chords/${x}`)];
const fs=await import('node:fs/promises');
const results=[];
// Block every inline/external script with CSP, leaving original HTML and CSS intact.
await page.route('**/*',async route=>{
 if(route.request().isNavigationRequest()){
  const response=await route.fetch();
  await route.fulfill({response,headers:{...response.headers(),'content-security-policy':"script-src 'none'; object-src 'none'"}});
 }else await route.continue();
});
await page.setViewportSize({width:1440,height:1000});
for(const url of routes){
 await page.goto(base+url,{waitUntil:'networkidle'});
 const result=await page.evaluate(()=>{
  const main=document.querySelector('main');
  const clone=main.cloneNode(true);
  clone.querySelectorAll('script,style,[aria-hidden="true"],.pr-sr-only').forEach(el=>el.remove());
  const types=[];
  function visit(x){if(!x||typeof x!=='object')return;if(x['@type'])types.push(x['@type']);Object.values(x).forEach(v=>Array.isArray(v)?v.forEach(visit):visit(v));}
  const jsonld=[...document.querySelectorAll('script[type="application/ld+json"]')].map(el=>JSON.parse(el.textContent));jsonld.forEach(visit);
  const headings=[...main.querySelectorAll('h1,h2,h3,h4,h5,h6')].filter(el=>el.getClientRects().length).map(el=>({level:Number(el.tagName[1]),text:el.textContent}));
  const jumps=headings.flatMap((h,i)=>i&&h.level>headings[i-1].level+1?[h]:[]);
  const paragraphs=[...main.querySelectorAll('p')].filter(el=>el.getClientRects().length).map(el=>el.textContent.trim()).filter(t=>t.length>60);
  return {domElements:document.querySelectorAll('*').length,mainCount:document.querySelectorAll('main').length,h1:main.querySelectorAll('h1').length,visibleBodyCharacters:main.innerText.replace(/\s+/g,' ').trim().length,semanticText:clone.textContent.replace(/\s+/g,' ').trim(),headings,jumps,jsonld,types:[...new Set(types.flat())],title:document.title,description:document.querySelector('meta[name="description"]')?.content,canonical:document.querySelector('link[rel="canonical"]')?.href,duplicateParagraphs:paragraphs.filter((p,i)=>paragraphs.indexOf(p)!==i),rollingCount:document.querySelectorAll('.pr-rolling-text').length,rollingBytes:[...document.querySelectorAll('.pr-rolling-text')].reduce((n,e)=>n+new TextEncoder().encode(e.outerHTML).length,0),pdfLinks:[...document.querySelectorAll('a[href*=".pdf"]')].map(a=>({href:a.getAttribute('href'),text:a.textContent,download:a.hasAttribute('download')}))};
 });
 results.push({url,...result});
}
await page.unrouteAll({behavior:'wait'});
const path=artifactPath(`${phase}-dom.json`);await fs.writeFile(path,JSON.stringify(results,null,2));
globalThis[`${phase}DOM`]=results;
return {path,results:results.map(({semanticText,jsonld,headings,pdfLinks,...r})=>r)};
