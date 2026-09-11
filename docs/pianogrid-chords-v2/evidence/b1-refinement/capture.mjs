import fs from 'node:fs';
import {createRequire} from 'node:module';
const {chromium}=createRequire(import.meta.url)('C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const phase=process.argv[2]||'before',out=`docs/pianogrid-chords-v2/evidence/b1-refinement/${phase}`;
fs.mkdirSync(out,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true}),records={};
try{
for(const slug of ['chords','a-minor','a-major','c-major']){
 const url=slug==='chords'?'/chords':`/chords/${slug}`,page=await browser.newPage({viewport:{width:1440,height:900}});
 const response=await page.goto('http://127.0.0.1:3000'+url);
 fs.writeFileSync(`${out}/${slug}.html`,await response.text());
 await page.waitForFunction(()=>document.querySelector('.am-play-btn')&&!document.querySelector('.am-play-btn').disabled);
 records[slug]=await page.evaluate(()=>{
  const style=selector=>{const e=document.querySelector(selector);if(!e)return null;const s=getComputedStyle(e);return Object.fromEntries(['color','backgroundColor','borderColor','fontFamily','fontSize','lineHeight','borderRadius','boxShadow'].map(k=>[k,s[k]]));};
  return {title:document.title,description:document.querySelector('meta[name=description]')?.content,canonical:document.querySelector('link[rel=canonical]')?.href,robots:document.querySelector('meta[name=robots]')?.content,
   content:[...document.querySelectorAll('main p,main li,main th,main td,main summary')].filter(e=>!e.closest('.ch-page-toc')).map(e=>e.textContent.trim()),
   ids:[...document.querySelectorAll('main [id]')].map(e=>e.id),
   links:[...document.querySelectorAll('main a')].map(e=>({text:e.textContent,href:e.getAttribute('href')})),
   figures:[...document.querySelectorAll('main figure')].map(e=>e.textContent),
   tokens:Object.fromEntries(['--background','--foreground','--surface','--primary','--border','--selected-hover','--pr-container-page'].map(k=>[k,getComputedStyle(document.documentElement).getPropertyValue(k)])),
   computed:Object.fromEntries(['body','.am-page-heading h1','.am-button.am-primary','.am-play-btn','.am-key.am-is-selected','.am-key.am-black','header','footer'].map(k=>[k,style(k)]))};
 });
 if(['chords','a-minor'].includes(slug))for(const width of [1440,390]){
  await page.setViewportSize({width,height:width===1440?900:844});await page.evaluate(()=>window.scrollTo(0,0));await page.waitForTimeout(250);
  await page.screenshot({path:`${out}/${slug}-${width}-top.png`});
  if(slug==='a-minor'){await page.locator('#am-why-minor').scrollIntoViewIfNeeded();await page.screenshot({path:`${out}/${slug}-${width}-reading.png`});await page.locator('#am-questions').scrollIntoViewIfNeeded();await page.screenshot({path:`${out}/${slug}-${width}-end.png`});}
  if(phase==='after'&&slug==='a-minor'){await page.getByRole('radio',{name:'First inversion',exact:true}).check();await page.locator('#am-result').scrollIntoViewIfNeeded();await page.screenshot({path:`${out}/${slug}-${width}-first-inversion.png`});await page.getByRole('radio',{name:'Root position',exact:true}).check();}
 }
 await page.close();
}
fs.writeFileSync(`${out}/dom.json`,JSON.stringify(records,null,2));
if(phase==='after'){
 const before=JSON.parse(fs.readFileSync('docs/pianogrid-chords-v2/evidence/b1-refinement/before/dom.json'));
 const comparison=Object.fromEntries(Object.keys(records).map(k=>{const a=before[k],b=records[k];const tally=xs=>xs.reduce((r,x)=>(r[x]=(r[x]||0)+1,r),{});const ac=tally(a.content),bc=tally(b.content);return [k,{missingContent:Object.keys(ac).filter(x=>(bc[x]||0)<ac[x]),missingIds:a.ids.filter(x=>!b.ids.includes(x)),missingLinks:a.links.filter(x=>!b.links.some(y=>JSON.stringify(x)===JSON.stringify(y))),figuresUnchanged:JSON.stringify(a.figures)===JSON.stringify(b.figures),metadataUnchanged:['title','description','canonical','robots'].every(x=>a[x]===b[x]),tokensUnchanged:JSON.stringify(a.tokens)===JSON.stringify(b.tokens),computedUnchanged:JSON.stringify(a.computed)===JSON.stringify(b.computed)}];}));
 fs.writeFileSync('docs/pianogrid-chords-v2/evidence/b1-refinement/comparison.json',JSON.stringify(comparison,null,2));console.log(JSON.stringify(comparison,null,2));
}
}finally{await browser.close();}
