import fs from 'node:fs';
import {createRequire} from 'node:module';
const {chromium}=createRequire(import.meta.url)(process.env.PIANO_PLAYWRIGHT_PATH||'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base=process.env.PIANO_BASE_URL||'http://127.0.0.1:3000',out=process.env.PIANO_CHECK_OUT||'checks/batches/01-chords/b2';
fs.mkdirSync(out,{recursive:true});
const results=[],errors=[];const check=(name,passed,actual)=>{results.push({name,passed:!!passed,actual});if(!passed)console.error('FAIL',name,actual);};
const definitions={
 'a-minor':{symbol:'Am',tones:['A','C','E'],formula:['1','♭3','5'],quality:'Minor triad',canonical:'/chords/a-minor',rows:[['Am','A3','C4','E4'],['Am/C','C4','E4','A4'],['Am/E','E4','A4','C5']]},
 'a-major':{symbol:'A',tones:['A','C♯','E'],formula:['1','3','5'],quality:'Major triad',canonical:'/chords/a-major',rows:[['A','A4','C♯5','E5'],['A/C♯','C♯4','E4','A4'],['A/E','E4','A4','C♯5']]},
 'c-major':{symbol:'C',tones:['C','E','G'],formula:['1','3','5'],quality:'Major triad',canonical:'/chords/c-major',rows:[['C','C4','E4','G4'],['C/E','E4','G4','C5'],['C/G','G4','C5','E5']]},
};
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 for(const [slug,expected] of Object.entries(definitions)){
  const url=`/chords/${slug}`,page=await browser.newPage({javaScriptEnabled:false,viewport:{width:1440,height:900}});page.on('pageerror',e=>errors.push(`${slug}: ${e.message}`));
  const response=await page.goto(base+url),raw=await response.text();fs.writeFileSync(`${out}/${slug}-raw.html`,raw);
  check(`${slug} raw HTTP/static payload`,response.status()===200&&raw.includes('<h1')&&raw.includes('am-print-only'));
  check(`${slug} metadata/canonical`,(await page.title()).length>0&&(await page.locator('link[rel=canonical]').getAttribute('href')).endsWith(expected.canonical));
  check(`${slug} server-rendered definition`,await page.locator('.am-chord-id').textContent()===expected.symbol&&JSON.stringify(await page.locator('.am-summary .am-tone-list span:not(.am-separator)').allTextContents())===JSON.stringify(expected.tones));
  check(`${slug} server-rendered formula/quality`,JSON.stringify(await page.locator('.am-summary .am-formula span:not(.am-separator)').allTextContents())===JSON.stringify(expected.formula)&&await page.locator('.am-quick-facts').getByText(expected.quality,{exact:true}).count()===1);
  check(`${slug} server-rendered keyboard/inversions`,await page.locator('#keyboard-scroll .am-key.am-is-selected').count()===3&&await page.locator('.am-inversion-table tbody tr').count()===3);
  check(`${slug} server-rendered page content`,await page.locator('h1').count()===1&&await page.locator('.am-direct-answer').count()===1&&await page.locator('nav[aria-label="breadcrumb"]').count()===1&&await page.locator('.ch-page-toc').count()===1);
  check(`${slug} no-JS fallback`,await page.locator('.am-play-btn').isDisabled()&&await page.locator('a[download]').count()>0&&await page.locator('#print-content').count()===1);
  for(const width of [1440,390]){await page.setViewportSize({width,height:width===1440?900:844});await page.screenshot({path:`${out}/${slug}-${width}.png`});check(`${slug} ${width} no page overflow`,await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));}
  await page.close();
  const interactive=await browser.newPage({viewport:{width:1440,height:900}});await interactive.goto(base+url);await interactive.waitForFunction(()=>!document.querySelector('.am-play-btn').disabled);
  for(let index=0;index<3;index++){const row=expected.rows[index];await interactive.getByRole('radio',{name:['Root position','First inversion','Second inversion'][index],exact:true}).check();check(`${slug} voicing ${index+1} synchronized`,await interactive.locator('#current-symbol').textContent()===row[0]&&JSON.stringify(await interactive.locator('#note-order .am-pitch').allTextContents())===JSON.stringify(row.slice(1))&&await interactive.locator('#current-bass').textContent()===row[1]&&await interactive.locator('#keyboard-scroll .am-key.am-is-selected').count()===3);}
  await interactive.close();
 }
 const hub=await browser.newPage();await hub.goto(base+'/chords');await hub.waitForFunction(()=>!document.querySelector('.ch-result input').disabled);
 check('Hub has unified 25-item collection',await hub.locator('.ch-result').count()===25);
 await hub.getByRole('combobox',{name:'Root note',exact:true}).selectOption('A');await hub.getByRole('combobox',{name:'Chord type',exact:true}).selectOption('minor');
 check('Hub A × minor resolves Am with real detail',await hub.locator('.ch-result').count()===1&&await hub.locator('.ch-result[data-chord-id="a-minor"] a[href="/chords/a-minor"]').count()===1);
 await hub.getByRole('combobox',{name:'Root note',exact:true}).selectOption('C');await hub.getByRole('combobox',{name:'Chord type',exact:true}).selectOption('major');
 check('Hub C × major resolves C major with real detail',await hub.locator('.ch-result').count()===1&&await hub.locator('.ch-result[data-chord-id="c-major"] a[href="/chords/c-major"]').count()===1);
 await hub.close();
}catch(error){check('B2 browser execution completed',false,error.stack);}finally{await browser.close();}
check('No runtime errors',errors.length===0,errors);
const report={base,passed:results.filter(item=>item.passed).length,failed:results.filter(item=>!item.passed).length,results,notTested:['human listening','real mobile device','screen reader','physical printing']};
fs.writeFileSync(`${out}/b2-validation.json`,JSON.stringify(report,null,2));console.log(`B2: ${report.passed} passed, ${report.failed} failed`);process.exitCode=report.failed?1:0;
