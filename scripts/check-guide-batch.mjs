import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';

const {chromium}=createRequire(import.meta.url)(process.env.PIANO_PLAYWRIGHT_PATH||'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const master=JSON.parse(await readFile('docs/content/site-master/page-content.master.json','utf8'));
const base=process.env.PIANO_BASE_URL||'http://localhost:3000';
const out=process.env.PIANO_CHECK_OUT||'checks/batches/05-guides';
const metadataTitleOverrides={'/guide':'How to Play Piano for Beginners: First Notes and Rhythm'};
await mkdir(`${out}/screenshots`,{recursive:true});
const results=[],errors=[];
const check=(name,passed,detail='')=>{results.push({name,passed:Boolean(passed),detail});if(!passed)console.error('FAIL',name,detail);};
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000}});page.on('pageerror',error=>errors.push(error.message));

async function load(url){const response=await page.goto(base+url);check(`${url} HTTP 200`,response?.status()===200,response?.status());await page.waitForLoadState('networkidle');}
async function responsive(url){for(const width of [1440,390,320,768]){await page.setViewportSize({width,height:950});await page.waitForTimeout(80);check(`${url} no page overflow ${width}`,await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),await page.evaluate(()=>`${document.documentElement.scrollWidth}/${innerWidth}`));await page.screenshot({path:`${out}/screenshots/${url.replaceAll('/','-').slice(1)}-${width}.png`,fullPage:true});}await page.evaluate(()=>document.documentElement.style.fontSize='200%');check(`${url} text 200 no page overflow`,await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.screenshot({path:`${out}/screenshots/${url.replaceAll('/','-').slice(1)}-text200.png`,fullPage:true});await page.evaluate(()=>document.documentElement.style.fontSize='');}

try{
 for(const url of ['/guide','/guide/read-sheet-music']){
  await load(url);const source=master.pages[url];
  check(`${url} title`,await page.title()===(metadataTitleOverrides[url]||source.metadata.title),await page.title());
  const robots=(await page.locator('meta[name=robots]').getAttribute('content'))||'';
  check(`${url} index/follow`,robots.includes('index')&&robots.includes('follow')&&!robots.includes('noindex')&&!robots.includes('nofollow'),robots);
  check(`${url} canonical`,(await page.locator('link[rel=canonical]').getAttribute('href')).endsWith(url));
  check(`${url} one H1`,await page.locator('h1').count()===1);
  check(`${url} no duplicate IDs`,await page.evaluate(()=>{const ids=[...document.querySelectorAll('[id]')].map(node=>node.id);return ids.length===new Set(ids).size;}));
  for(const block of source.blocks){const section=page.locator('section[data-block-id]').filter({has:page.getByRole('heading',{name:block.heading})});check(`${url} block ${block.heading}`,await section.count()===1&&(await section.innerText()).includes(block.body));}
  check(`${url} printable exact URL`,await page.getByRole('link',{name:'Download the PDF'}).getAttribute('href')==='/assets/guides/piano-starter-and-reading.pdf');
  check(`${url} printable responds`,(await page.request.get(base+'/assets/guides/piano-starter-and-reading.pdf')).status()===200);
  await responsive(url);
 }

 await page.setViewportSize({width:1440,height:1000});await load('/guide');
 check('Center executable bar exact aria label',(await page.locator('.gd-start .gd-beat-pattern').getAttribute('aria-label'))==='C4 for 1 count, D4 for 1 count, E4 for 2 counts');
 check('Center keyboard marks exactly C4 D4 E4',await page.locator('.gd-keyboard .kn-marked').count()===3);
 check('Center path has four ordered steps',await page.locator('.gd-path li').count()===4);
 check('Center only links two available path steps',await page.locator('.gd-path a').count()===2);
 check('Center keeps two future guides visibly planned',await page.locator('.gd-planned').count()===2);
 check('Center available route links exact',JSON.stringify((await page.locator('.gd-path a').evaluateAll(nodes=>nodes.map(node=>node.getAttribute('href')))))===JSON.stringify(['/keyboard-notes/chart','/guide/read-sheet-music']));
 check('Center chord guide points to authorized route',await page.getByRole('link',{name:'Open the chord guide'}).getAttribute('href')==='/chords');

 await load('/guide/read-sheet-music');
 check('Reading TOC has four anchors',await page.locator('.gd-toc a').count()===4);
 check('Reading order is exact',JSON.stringify(await page.locator('.gd-read-order li').allTextContents())===JSON.stringify(['Clef','Key signature and accidentals','Line or space','Duration']));
 check('Reading has treble and bass anchor diagrams',await page.locator('.gd-anchor-grid .kn-staff-frame').count()===2);
 check('Reading renders nine anchor definitions',await page.locator('.gd-anchor-grid dl div').count()===9);
 check('FACE appears only in treble panel',(await page.locator('.gd-memory>div').nth(0).innerText()).includes('F4 · A4 · C5 · E5')&&!(await page.locator('.gd-memory>div').nth(1).innerText()).includes('FACE'));
 check('Reading renders four exercise bars',await page.locator('.gd-bars>div').count()===4);
 check('Exercise answer starts collapsed',!(await page.locator('.gd-exercise details').evaluate(node=>node.open)));
 await page.locator('.gd-exercise summary').click();
 check('Exercise exact answer visible',(await page.locator('.gd-exercise details p').innerText())==='Bar 1: C4 D4 E4 | Bar 2: E4 D4 C4 | Bar 3: D4 E4 F4 D4 | Bar 4: C4');
 check('Chart target exact',await page.getByRole('link',{name:'Find C4–F4 on the keyboard chart'}).getAttribute('href')==='/keyboard-notes/chart');
 await page.locator('[data-slot="breadcrumb-link"]').focus();for(let index=0;index<4;index+=1)await page.keyboard.press('Tab');check('TOC keyboard focus reaches final anchor',await page.locator('.gd-toc a').nth(3).evaluate(element=>element===document.activeElement));check('TOC focus visible',await page.locator('.gd-toc a').nth(3).evaluate(element=>{const style=getComputedStyle(element);return style.outlineStyle!=='none'&&parseFloat(style.outlineWidth)>0;}));

 const nojs=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:844}});
 for(const url of ['/guide','/guide/read-sheet-music']){await nojs.goto(base+url);check(`NoJS ${url} content`,await nojs.locator('h1').count()===1&&await nojs.getByRole('link',{name:'Download the PDF'}).count()===1);check(`NoJS ${url} no overflow`,await nojs.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));}
 check('NoJS exercise answer available in DOM',(await nojs.locator('.gd-exercise details').textContent()).includes('Bar 4: C4'));
 await nojs.close();

 for(const url of ['/chords','/chords/a-minor','/chords/a-major','/chords/c-major','/keyboard-notes','/keyboard-notes/labeled','/keyboard-notes/chart','/scales','/scales/c-major','/scales/a-minor','/songs','/songs/easy'])check(`Existing route ${url}`,(await page.request.get(base+url)).status()===200);
 for(const url of ['/','/tools'])check(`Integrated route ${url}`,(await page.request.get(base+url)).status()===200);
 for(const url of ['/guide/sight-reading','/guide/note-values-and-rhythm','/guide/learn-a-piano-song','/guide/anything'])check(`Unauthorized route ${url}`,(await page.request.get(base+url)).status()===404);
 check('No runtime errors',errors.length===0,errors);
}catch(error){check('Guide browser runner completed',false,error.stack);}finally{
 await browser.close();const report={executed_at:new Date().toISOString(),passed:results.filter(item=>item.passed).length,failed:results.filter(item=>!item.passed).length,results};await writeFile(`${out}/validation.json`,JSON.stringify(report,null,2)+'\n');console.log(`Guide browser: ${report.passed} passed, ${report.failed} failed.`);process.exitCode=report.failed?1:0;
}
