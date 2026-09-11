import fs from 'node:fs';
import {createRequire} from 'node:module';
const {chromium}=createRequire(import.meta.url)('C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const out='docs/pianogrid-chords-v2/evidence/b1-refinement',results=[],errors=[];
const check=(name,passed,actual)=>{results.push({name,passed:!!passed,actual});if(!passed)console.log('FAIL',name,actual);};
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 for(const slug of ['chords','a-minor','a-major','c-major']){
  const url=slug==='chords'?'/chords':`/chords/${slug}`,p=await browser.newPage();p.on('pageerror',e=>errors.push(e.message));
  await p.goto('http://127.0.0.1:3000'+url);await p.waitForFunction(()=>!document.querySelector('.am-play-btn').disabled);
  check(`${slug} no duplicate IDs`,await p.evaluate(()=>{const ids=[...document.querySelectorAll('[id]')].map(e=>e.id);return new Set(ids).size===ids.length;}));
  const links=await p.locator('.ch-page-toc a').evaluateAll(es=>es.map(e=>({href:e.getAttribute('href'),name:e.textContent})));
  check(`${slug} TOC scoped to B1`,links.length===(slug==='chords'?6:slug==='a-minor'?9:0));
  for(const {href,name} of links){
   await p.getByRole('navigation',{name:'On this page',exact:true}).getByRole('link',{name,exact:true}).focus();
   check(`${slug} ${href} visible keyboard focus`,await p.locator('.ch-page-toc a:focus').evaluate(e=>getComputedStyle(e).outlineStyle!=='none'));
   await p.keyboard.press('Enter');
   check(`${slug} ${href} native anchor/focus`,await p.evaluate(id=>location.hash==='#'+id&&document.activeElement?.id===id,href.slice(1)));
  }
  for(const width of [320,390,768,1440]){
   await p.setViewportSize({width,height:width===1440?900:844});await p.waitForTimeout(200);
   check(`${slug} ${width} no page overflow`,await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
   check(`${slug} ${width} TOC targets >=44px`,await p.locator('.ch-page-toc a').evaluateAll(es=>es.every(e=>e.getBoundingClientRect().height>=44)));
   if(slug!=='chords')for(const name of ['Root position','First inversion','Second inversion']){await p.getByRole('radio',{name,exact:true}).check();await p.waitForTimeout(120);check(`${slug} ${width} ${name} selected keys visible`,await p.locator('#keyboard-scroll').evaluate(e=>{const r=e.getBoundingClientRect();return [...e.querySelectorAll('.am-key.am-is-selected')].every(k=>{const b=k.getBoundingClientRect();return b.left>=r.left-1&&b.right<=r.right+1;});}));}
   if(slug==='chords'&&[390,1440].includes(width)){await p.locator('.ch-filters').scrollIntoViewIfNeeded();await p.screenshot({path:`${out}/after/chords-${width}-filters.png`});}
  }
  if(slug==='chords')check('Reading guidance precedes filters and 19 results',await p.evaluate(()=>{const s=document.querySelector('.ch-chart-notes'),f=document.querySelector('.ch-filters');return !!(s.compareDocumentPosition(f)&Node.DOCUMENT_POSITION_FOLLOWING)&&document.querySelectorAll('.ch-result').length===19;}));
  if(slug==='a-minor'){
   for(const href of ['/chords','/chords/a-major','/scales/a-minor'])check(`Restored ${href} HTTP200`,(await p.request.get('http://127.0.0.1:3000'+href)).status()===200);
   await p.getByRole('button',{name:'Search this page',exact:true}).click();await p.locator('#page-search-input').fill('notes and forms');check('Restored next section searchable',await p.locator('.am-search-result[href="#am-next"]').count()===1);await p.keyboard.press('Escape');
  }
  await p.close();
  const n=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:844}});const r=await n.goto('http://127.0.0.1:3000'+url);
  check(`${slug} noJS HTTP200/static diagrams/PDF`,r.status()===200&&await n.locator('main .am-key.am-is-selected').count()>0&&await n.locator('a[download]').count()>0);
  check(`${slug} noJS controls disabled`,await n.locator('.am-play-btn').first().isDisabled());
  if(links.length){await n.locator(`.ch-page-toc a[href="${links.at(-1).href}"]`).click();check(`${slug} noJS TOC works`,new URL(n.url()).hash===links.at(-1).href);}
  const before=JSON.parse(fs.readFileSync(`${out}/before/dom.json`))[slug];const raw=await n.locator('main').textContent();
  check(`${slug} noJS all baseline text`,before.content.every(t=>raw.includes(t)));
  await n.close();
 }
 check('No browser runtime errors',errors.length===0,errors);
}catch(e){check('Execution completed',false,e.stack);}finally{await browser.close();}
const report={passed:results.filter(r=>r.passed).length,failed:results.filter(r=>!r.passed).length,results};fs.writeFileSync(`${out}/b1-validation.json`,JSON.stringify(report,null,2));console.log(JSON.stringify({passed:report.passed,failed:report.failed}));process.exitCode=report.failed?1:0;
