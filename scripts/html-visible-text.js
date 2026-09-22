const fs=await import('node:fs/promises');
await page.route('**/*',async route=>{
 if(route.request().isNavigationRequest()){
  const response=await route.fetch();await route.fulfill({response,headers:{...response.headers(),'content-security-policy':"script-src 'none'; object-src 'none'"}});
 }else await route.continue();
});
await page.setViewportSize({width:1440,height:1000});
const rows=[];
for(const phase of ['before','after'])for(const url of ['/','/chords','/chords/c-major','/scales/c-major','/arpeggios','/keyboard-notes/labeled']){
 await page.goto(`http://127.0.0.1:${phase==='before'?3141:3142}${url}`,{waitUntil:'networkidle'});
 rows.push({phase,url,...await page.evaluate(()=>{
  const main=document.querySelector('main'),walker=document.createTreeWalker(main,NodeFilter.SHOW_TEXT),texts=[];
  let n;
  while(n=walker.nextNode()){
   const el=n.parentElement;
   if(el.closest('script,style,noscript,.pr-rolling-text,.pr-sr-only'))continue;
   if(!el.checkVisibility({visibilityProperty:true,opacityProperty:true})||!el.getClientRects().length)continue;
   texts.push(n.textContent);
  }
  // Each animated label is counted once, not once per decorative track/glyph.
  for(const el of main.querySelectorAll('.pr-rolling-text'))if(el.checkVisibility({visibilityProperty:true}))texts.push(el.querySelector('.pr-sr-only').textContent);
  const text=texts.join(' ').replace(/\s+/g,' ').trim();
  return {visibleText:text,visibleCharacters:Array.from(text).length,keyboardBytes:[...main.querySelectorAll('.am-keyboard,.kn-keyboard')].reduce((n,e)=>n+new TextEncoder().encode(e.outerHTML).length,0)};
 })});
}
await page.unrouteAll({behavior:'wait'});
const path=artifactPath('visible-text.json');await fs.writeFile(path,JSON.stringify(rows,null,2));
return {path,rows:rows.map(({visibleText,...r})=>r)};
