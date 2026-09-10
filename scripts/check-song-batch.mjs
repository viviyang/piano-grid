import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';

const {chromium}=createRequire(import.meta.url)(process.env.PIANO_PLAYWRIGHT_PATH||'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const master=JSON.parse(await readFile('docs/content/site-master/page-content.master.json','utf8'));
const base=process.env.PIANO_BASE_URL||'http://localhost:3000';
const out=process.env.PIANO_CHECK_OUT||'checks/batches/04-songs';
await mkdir(`${out}/screenshots`,{recursive:true});
const results=[],errors=[];
const check=(name,passed,detail='')=>{results.push({name,passed:Boolean(passed),detail});if(!passed)console.error('FAIL',name,detail);};
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
page.on('pageerror',error=>errors.push(error.message));

async function load(url){await page.goto(base+url);await page.waitForFunction(()=>[...document.querySelectorAll('input,select,fieldset')].every(control=>!control.disabled));}
async function responsive(url){for(const width of [1440,390,320,768]){await page.setViewportSize({width,height:950});await page.waitForTimeout(80);check(`${url} no page overflow ${width}`,await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));if(url==='/songs'&&width===390)check('/songs result count stays on one line at 390',await page.locator('.sg-results-heading p').first().evaluate(element=>getComputedStyle(element).whiteSpace==='nowrap'&&element.getClientRects().length===1));await page.screenshot({path:`${out}/screenshots/${url.replaceAll('/','-').slice(1)}-${width}.png`,fullPage:true});}await page.evaluate(()=>document.documentElement.style.fontSize='200%');check(`${url} text 200 no page overflow`,await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.screenshot({path:`${out}/screenshots/${url.replaceAll('/','-').slice(1)}-text200.png`,fullPage:true});await page.evaluate(()=>document.documentElement.style.fontSize='');}

try{
 for(const url of ['/songs','/songs/easy']){
  await load(url);const source=master.pages[url];
  check(`${url} metadata title`,await page.title()===source.metadata.title,await page.title());
  check(`${url} noindex`,(await page.locator('meta[name=robots]').getAttribute('content')).includes('noindex'));
  check(`${url} canonical`,(await page.locator('link[rel=canonical]').getAttribute('href')).endsWith(url));
  check(`${url} no duplicate IDs`,await page.evaluate(()=>{const ids=[...document.querySelectorAll('[id]')].map(node=>node.id);return ids.length===new Set(ids).size;}));
  for(const block of source.blocks)check(`${url} block ${block.id}`,(await page.locator(`[data-block-id="${block.id}"]`).textContent()).includes(block.body));
  await responsive(url);
 }

 await page.setViewportSize({width:1440,height:1000});await load('/songs');const center=master.pages['/songs'].data;
 check('Center renders every resource ID',JSON.stringify((await page.locator('[data-resource-id]').evaluateAll(nodes=>nodes.map(node=>node.getAttribute('data-resource-id')))).sort())===JSON.stringify(center.resources.map(resource=>resource.id).sort()));
 check('Center six external resource links',await page.locator('.sg-resource-link').count()===6);
 for(const resource of center.resources){const card=page.locator(`[data-resource-id="${resource.id}"]`);const text=await card.innerText();check(`${resource.id} title and edition`,text.includes(resource.work_title)&&text.includes(resource.edition));check(`${resource.id} level basis and access`,text.includes(resource.level_basis)&&text.includes(resource.access));check(`${resource.id} exact URL`,await card.locator('.sg-resource-link').getAttribute('href')===resource.resource_url);}
 const search=page.getByLabel('Search title, artist or edition',{exact:true});
 await search.fill('Minecraft');check('Search uses provided fields',await page.locator('.sg-resource').count()===1&&(await page.locator('.sg-resource h3').innerText())==='Sweden');
 await page.getByRole('button',{name:'Clear filters'}).click();check('Clear restores six',await page.locator('.sg-resource').count()===6);
 await page.locator('.sg-filters select').nth(0).selectOption('Easy Piano');check('Easy Piano filter has three exact editions',await page.locator('.sg-resource').count()===3);
 await page.locator('.sg-filters select').nth(1).selectOption('sing-and-play');check('Goal filter combines with level to empty result',await page.locator('.sg-empty').count()===1);
 await page.getByRole('button',{name:'Show all editions'}).click();check('Empty-state reset restores six',await page.locator('.sg-resource').count()===6);
 for(const [goal,count] of [['reflective',1],['cheerful',2],['beautiful',1],['intermediate',2],['soundtrack',1],['sing-and-play',1]]){await page.locator('.sg-filters select').nth(1).selectOption(goal);check(`Goal ${goal} exact result count`,await page.locator('.sg-resource').count()===count);}
 await page.getByRole('button',{name:'Clear filters'}).click();await search.fill('no checked title');check('Unknown search has usable empty state',await page.getByRole('heading',{name:'No checked edition matches'}).count()===1);await page.getByRole('button',{name:'Show all editions'}).click();
 await search.focus();check('Search focus visible',await search.evaluate(element=>getComputedStyle(element).outlineStyle==='solid'));

 await load('/songs/easy');const easy=master.pages['/songs/easy'].data;
 check('Easy renders nine featured versions',await page.locator('.sg-easy-chooser .sg-resource').count()===9);
 check('Easy renders fifty catalog resource IDs',await page.locator('.sg-catalog tbody tr').count()===50);
 check('Easy catalog numbering reaches fifty',(await page.locator('.sg-catalog tbody tr').last().locator('td').first().innerText())==='50');
 for(const resource of easy.featured_resources){const card=page.locator(`.sg-easy-chooser [data-resource-id="${resource.id}"]`);const text=await card.innerText();check(`${resource.id} title edition access`,text.includes(resource.work_title)&&text.includes(resource.edition)&&text.includes(resource.access));check(`${resource.id} exact resource URL`,await card.locator('.sg-resource-link').getAttribute('href')===resource.resource_url);}
 for(const [value,count] of [['kids',3],['c-major',3],['beautiful',2],['adults',2],['impress',2]]){await page.locator(`input[value="${value}"]`).check();check(`Easy ${value} exact result count`,await page.locator('.sg-easy-chooser .sg-resource').count()===count);}
 await page.locator('input[value="all"]').check();check('Easy all featured restores nine',await page.locator('.sg-easy-chooser .sg-resource').count()===9);
 check('Two Twinkle versions visible as distinct editions',await page.getByRole('heading',{name:'Twinkle, Twinkle, Little Star',exact:true}).count()===2);
 check('Catalog explicitly rejects individual ranking',(await page.locator('.sg-catalog-head').innerText()).includes('not been individually ranked or performance tested'));
 check('All visible resource targets open externally',await page.locator('a[target="_blank"]').evaluateAll(links=>links.every(link=>link.getAttribute('rel')?.includes('noreferrer')&&link.href.startsWith('https://'))));

 const nojs=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:844}});
 for(const [url,count] of [['/songs',6],['/songs/easy',9]]){await nojs.goto(base+url);check(`NoJS ${url} default resources`,await nojs.locator('.sg-resource').count()===count);const control=url==='/songs'?nojs.locator('input,select').first():nojs.locator('input[type="radio"]').first();check(`NoJS ${url} controls disabled`,await control.isDisabled());check(`NoJS ${url} no overflow`,await nojs.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));}
 await nojs.close();
 for(const url of ['/chords','/chords/a-minor','/chords/a-major','/chords/c-major','/keyboard-notes','/keyboard-notes/labeled','/keyboard-notes/chart','/scales','/scales/c-major','/scales/a-minor'])check(`Existing route ${url}`,(await page.request.get(base+url)).status()===200);
 for(const url of ['/','/tools','/guide'])check(`Integrated route ${url}`,(await page.request.get(base+url)).status()===200);
 for(const url of ['/songs/christmas','/songs/pop','/songs/anything','/sheet-music'])check(`Unauthorized route ${url}`,(await page.request.get(base+url)).status()===404);
 check('No runtime errors',errors.length===0,errors);
}catch(error){check('Song browser runner completed',false,error.stack);}finally{
 await browser.close();const report={executed_at:new Date().toISOString(),passed:results.filter(item=>item.passed).length,failed:results.filter(item=>!item.passed).length,results};await writeFile(`${out}/validation.json`,JSON.stringify(report,null,2)+'\n');console.log(`Song browser: ${report.passed} passed, ${report.failed} failed.`);process.exitCode=report.failed?1:0;
}
