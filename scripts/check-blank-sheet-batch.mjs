import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';

const {chromium}=createRequire(import.meta.url)(process.env.PIANO_PLAYWRIGHT_PATH||'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const master=JSON.parse(await readFile('docs/content/site-master/page-content.master.json','utf8'));
const base=process.env.PIANO_BASE_URL||'http://localhost:3000',out=process.env.PIANO_CHECK_OUT||'checks/batches/06-blank-sheet';
await mkdir(`${out}/screenshots`,{recursive:true});
const results=[],errors=[];const check=(name,passed,detail='')=>{results.push({name,passed:Boolean(passed),detail});if(!passed)console.error('FAIL',name,detail);};
const browser=await chromium.launch({channel:'chrome',headless:true});const page=await browser.newPage({viewport:{width:1440,height:1000}});page.on('pageerror',error=>errors.push(error.message));
async function load(){const response=await page.goto(base+'/tools/blank-sheet-music');check('Page HTTP 200',response?.status()===200,response?.status());await page.waitForFunction(()=>!document.querySelector('.bs-paper-options').disabled);}
async function responsive(){for(const width of [1440,390,320,768]){await page.setViewportSize({width,height:950});await page.waitForTimeout(80);check(`No page overflow ${width}`,await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),await page.evaluate(()=>`${document.documentElement.scrollWidth}/${innerWidth}`));await page.screenshot({path:`${out}/screenshots/blank-sheet-${width}.png`,fullPage:true});}await page.evaluate(()=>document.documentElement.style.fontSize='200%');check('Text 200 no page overflow',await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.screenshot({path:`${out}/screenshots/blank-sheet-text200.png`,fullPage:true});await page.evaluate(()=>document.documentElement.style.fontSize='');}
try{
 await load();const source=master.pages['/tools/blank-sheet-music'];
 check('Metadata title',await page.title()===source.metadata.title,await page.title());
 check('Noindex',(await page.locator('meta[name=robots]').getAttribute('content')).includes('noindex'));
 check('Canonical',(await page.locator('link[rel=canonical]').getAttribute('href')).endsWith('/tools/blank-sheet-music'));
 check('Tools nav current',await page.locator('.am-site-nav [aria-current="page"]').textContent()==='Tools');
 check('One H1',await page.locator('h1').count()===1);
 check('No duplicate IDs',await page.evaluate(()=>{const ids=[...document.querySelectorAll('[id]')].map(node=>node.id);return ids.length===new Set(ids).size;}));
 for(const block of source.blocks){const section=page.locator(`[data-block-id="${block.id}"]`);check(`Block ${block.id} exact text`,await section.count()===1&&(await section.innerText()).includes(block.body));}
 check('Default Letter selected',await page.getByRole('radio',{name:/US Letter/}).isChecked());
 check('Two paper choices',await page.getByRole('radio').count()===2);
 check('Two always-available format downloads',await page.locator('.bs-paper-option>a[download]').count()===2);
 check('Preview is authorized SVG',await page.locator('.bs-preview-paper img').getAttribute('src')==='/reference/assets/blank-piano-staff-preview.svg');
 check('Preview accessible alternative',(await page.locator('.bs-preview-paper img').getAttribute('alt')).includes('6 paired treble and bass staff systems'));
 check('Preview SVG responds',(await page.request.get(base+'/reference/assets/blank-piano-staff-preview.svg')).status()===200);
 check('Letter print link exact',await page.getByRole('link',{name:'Open US Letter PDF to print'}).getAttribute('href')==='/reference/assets/blank-piano-staff-letter.pdf');
 await page.getByRole('radio',{name:/A4/}).check();
 check('A4 selection changes heading',(await page.locator('.bs-preview-head h2').innerText())==='A4 · 210 × 297 mm');
 check('A4 print link exact',await page.getByRole('link',{name:'Open A4 PDF to print'}).getAttribute('href')==='/reference/assets/blank-piano-staff-a4.pdf');
 check('Selected download follows A4',await page.getByRole('link',{name:'Download selected PDF'}).getAttribute('href')==='/reference/assets/blank-piano-staff-a4.pdf');
 await page.setViewportSize({width:390,height:844});
 const slider=page.getByRole('slider',{name:/Screen zoom/});await slider.focus();await page.keyboard.press('ArrowRight');check('Zoom focus visible after keyboard input',await slider.evaluate(element=>{const style=getComputedStyle(element);return style.outlineStyle!=='none'&&parseFloat(style.outlineWidth)>0;}));await slider.fill('150');await page.waitForFunction(()=>{const region=document.querySelector('.bs-preview-scroll');return region?.getAttribute('aria-label')?.endsWith('at 150%')&&region.scrollWidth>region.clientWidth;});
 check('Zoom updates accessible region label',(await page.locator('.bs-preview-scroll').getAttribute('aria-label')).endsWith('at 150%'));
 check('Zoom creates local preview overflow',await page.locator('.bs-preview-scroll').evaluate(element=>element.scrollWidth>element.clientWidth));
 await responsive();
 const files=[['letter',45614],['a4',45738]];
 for(const [id,bytes] of files){const response=await page.request.get(`${base}/reference/assets/blank-piano-staff-${id}.pdf`);check(`${id} PDF 200`,response.status()===200);check(`${id} PDF exact bytes`,(await response.body()).length===bytes,(await response.body()).length);check(`${id} PDF content type`,response.headers()['content-type']==='application/pdf',response.headers()['content-type']);}
 const nojs=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:844}});await nojs.goto(base+'/tools/blank-sheet-music');check('NoJS readable H1',await nojs.getByRole('heading',{level:1}).count()===1);check('NoJS paper controls disabled',await nojs.getByRole('radio').first().isDisabled());check('NoJS both PDF downloads available',await nojs.locator('.bs-paper-option>a[download]').count()===2);check('NoJS default print link works',await nojs.getByRole('link',{name:'Open US Letter PDF to print'}).count()===1);check('NoJS preview visible',await nojs.locator('.bs-preview-paper img').isVisible());check('NoJS no page overflow',await nojs.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await nojs.close();
 for(const route of ['/chords','/chords/a-minor','/chords/a-major','/chords/c-major','/keyboard-notes','/keyboard-notes/labeled','/keyboard-notes/chart','/scales','/scales/c-major','/scales/a-minor','/songs','/songs/easy','/guide','/guide/read-sheet-music'])check(`Existing route ${route}`,(await page.request.get(base+route)).status()===200);
 for(const route of ['/','/tools'])check(`Integrated route ${route}`,(await page.request.get(base+route)).status()===200);
 for(const route of ['/sheet-music','/sheet-music/easy','/tools/piano-cheat-sheet','/tools/anything'])check(`Unauthorized route ${route}`,(await page.request.get(base+route)).status()===404);
 check('No runtime errors',errors.length===0,errors);
}catch(error){check('Blank sheet browser runner completed',false,error.stack);}finally{await browser.close();const report={executed_at:new Date().toISOString(),passed:results.filter(item=>item.passed).length,failed:results.filter(item=>!item.passed).length,results};await writeFile(`${out}/validation.json`,JSON.stringify(report,null,2)+'\n');console.log(`Blank sheet browser: ${report.passed} passed, ${report.failed} failed.`);process.exitCode=report.failed?1:0;}
