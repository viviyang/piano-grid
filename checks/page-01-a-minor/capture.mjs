import {createRequire} from 'node:module';
import {writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
const require=createRequire(import.meta.url);
const {chromium}=require('C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const browser=await chromium.launch({channel:'chrome',headless:true});
const results=[];
try{
  for(const width of [1440,390]){
    for(const kind of ['reference','page']){
      const p=await browser.newPage({viewport:{width,height:width===1440?900:844}});
      const url=kind==='reference'?pathToFileURL(resolve('docs/design/reference/final-a-minor.html')).href:`${process.env.PIANO_BASE_URL||'http://127.0.0.1:3000'}/chords/a-minor`;
      const errors=[];p.on('pageerror',e=>errors.push(e.message));
      const response=await p.goto(url);await p.getByRole('button',{name:'Play chord',exact:true}).waitFor();
      await p.waitForFunction(()=>!Array.from(document.querySelectorAll('button')).find(b=>b.textContent==='Play chord')?.disabled);
      // Hydration enables controls; wait for the approved 120ms color transition.
      await p.waitForTimeout(200);
      await p.screenshot({path:`checks/page-01-a-minor/${kind}-${width}-top.png`});
      await p.screenshot({path:`checks/page-01-a-minor/${kind}-${width}-full.png`,fullPage:true});
      await writeFile(`checks/page-01-a-minor/${kind}-${width}-snapshot.txt`,await p.locator('body').ariaSnapshot());
      const boxes=await p.evaluate(()=>Object.fromEntries(['h1','#am-result','#keyboard-scroll','.key-bed','.am-key-bed','.controls','.am-controls','.reading','.am-reading'].map(s=>{const e=document.querySelector(s);return[s,e?{...e.getBoundingClientRect().toJSON(),font:getComputedStyle(e).fontSize}:null];})));
      results.push({width,kind,status:response?.status(),boxes,errors});await p.close();
    }
  }
  await writeFile('checks/page-01-a-minor/visual-comparison.json',JSON.stringify(results,null,2));
  console.log(JSON.stringify(results,null,2));
}finally{await browser.close();}
