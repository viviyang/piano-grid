import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';

const {chromium}=createRequire(import.meta.url)(process.env.PIANO_PLAYWRIGHT_PATH||'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base=process.env.PIANO_BASE_URL||'http://127.0.0.1:3001';
const out=process.env.PIANO_CHECK_OUT||'checks/batches/05-guides';
await mkdir(`${out}/screenshots`,{recursive:true});
const routes=['/chords','/chords/a-minor','/chords/a-major','/chords/c-major','/keyboard-notes','/keyboard-notes/labeled','/keyboard-notes/chart','/scales','/scales/c-major','/scales/a-minor','/songs','/songs/easy','/guide','/guide/read-sheet-music'];
const integrated=['/','/tools'];
const forbidden=['/guide/sight-reading','/guide/note-values-and-rhythm','/guide/anything'];
const results=[],errors=[];const check=(name,passed,detail='')=>{results.push({name,passed:Boolean(passed),detail});if(!passed)console.error('FAIL',name,detail);};
const browser=await chromium.launch({channel:'chrome',headless:true});const page=await browser.newPage({viewport:{width:1440,height:950}});page.on('pageerror',error=>errors.push(error.message));
try{
 for(const url of routes){const response=await page.goto(base+url),html=await response.text();check(`${url} production 200`,response.status()===200,response.status());check(`${url} production noindex`,(await page.locator('meta[name=robots]').getAttribute('content')).includes('noindex'));check(`${url} excludes source payload`,!html.includes('source_usage_batches')&&!html.includes('retained_without_url')&&!html.includes('E-REVIEW-read-sheet-music'));if(url.startsWith('/guide'))for(const width of [1440,390,320,768]){await page.setViewportSize({width,height:950});await page.waitForTimeout(60);check(`${url} production responsive ${width}`,await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.screenshot({path:`${out}/screenshots/production-${url.replaceAll('/','-').slice(1)}-${width}.png`,fullPage:true});}}
 check('production printable 200',(await page.request.get(base+'/assets/guides/piano-starter-and-reading.pdf')).status()===200);
 for(const url of integrated)check(`production includes ${url}`,(await page.request.get(base+url)).status()===200);
 for(const url of forbidden)check(`production excludes ${url}`,(await page.request.get(base+url)).status()===404);
 check('production has no runtime errors',errors.length===0,errors);
}finally{await browser.close();}
const report={executed_at:new Date().toISOString(),passed:results.filter(item=>item.passed).length,failed:results.filter(item=>!item.passed).length,results};await writeFile(`${out}/production-validation.json`,JSON.stringify(report,null,2)+'\n');console.log(`Guide production: ${report.passed} passed, ${report.failed} failed.`);process.exitCode=report.failed?1:0;
