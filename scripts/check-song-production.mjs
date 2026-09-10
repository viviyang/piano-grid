import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';

const {chromium}=createRequire(import.meta.url)(process.env.PIANO_PLAYWRIGHT_PATH||'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base=process.env.PIANO_BASE_URL||'http://127.0.0.1:3001';
const out=process.env.PIANO_CHECK_OUT||'checks/batches/04-songs';
await mkdir(`${out}/screenshots`,{recursive:true});
const routes=['/chords','/chords/a-minor','/chords/a-major','/chords/c-major','/keyboard-notes','/keyboard-notes/labeled','/keyboard-notes/chart','/scales','/scales/c-major','/scales/a-minor','/songs','/songs/easy'];
const integrated=['/','/tools','/guide'];
const forbidden=['/songs/christmas','/songs/pop','/songs/anything','/sheet-music'];
const results=[],errors=[];
const check=(name,passed,detail='')=>{results.push({name,passed:Boolean(passed),detail});if(!passed)console.error('FAIL',name,detail);};
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:950}});page.on('pageerror',error=>errors.push(error.message));
try{
 for(const url of routes){const response=await page.goto(base+url),html=await response.text();check(`${url} production HTTP 200`,response.status()===200,response.status());const robotsContent=await page.locator('meta[name=robots]').getAttribute('content');check(`${url} production indexable`,robotsContent?.includes('index')&&!robotsContent.includes('noindex'),robotsContent);check(`${url} excludes master payload`,!html.includes('source_usage_batches')&&!html.includes('retained_without_url')&&!html.includes('C-EASY-RIGHTS'));if(url.startsWith('/songs')){await page.waitForFunction(()=>[...document.querySelectorAll('input,select,fieldset')].every(control=>!control.disabled));for(const width of [1440,390,320,768]){await page.setViewportSize({width,height:950});await page.waitForTimeout(80);check(`${url} production responsive ${width}`,await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.screenshot({path:`${out}/screenshots/production-${url.replaceAll('/','-').slice(1)}-${width}.png`,fullPage:true});}await page.evaluate(()=>document.documentElement.style.fontSize='200%');check(`${url} production text 200`,await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.evaluate(()=>document.documentElement.style.fontSize='');}}
 for(const url of integrated)check(`production includes ${url}`,(await page.request.get(base+url)).status()===200);
 for(const url of forbidden)check(`production excludes ${url}`,(await page.request.get(base+url)).status()===404);
 check('production has no runtime errors',errors.length===0,errors);
}finally{await browser.close();}
const report={executed_at:new Date().toISOString(),passed:results.filter(item=>item.passed).length,failed:results.filter(item=>!item.passed).length,results};await writeFile(`${out}/production-validation.json`,JSON.stringify(report,null,2)+'\n');console.log(`Song production: ${report.passed} passed, ${report.failed} failed.`);process.exitCode=report.failed?1:0;
