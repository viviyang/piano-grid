import fs from 'node:fs';
import {createRequire} from 'node:module';
const {chromium}=createRequire(import.meta.url)(process.env.PIANO_PLAYWRIGHT_PATH||'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base=process.env.PIANO_BASE_URL||'http://127.0.0.1:3000',out=process.env.PIANO_CHECK_OUT||'docs/pianogrid-chords-v2/evidence/b3/browser';
fs.mkdirSync(out,{recursive:true});
const results=[],errors=[];const check=(name,ok,actual)=>{results.push({name,passed:!!ok,actual});if(!ok)console.error('FAIL',name,actual);};
const details={
 'a-minor':{symbol:'Am',tones:['A','C','E'],keys:['A pitch class','C pitch class','E pitch class'],root:'a-minor--root',canonical:'/chords/a-minor'},
 'a-major':{symbol:'A',tones:['A','C♯','E'],keys:['A pitch class','C♯ / D♭ pitch class','E pitch class'],root:'a-major--root',canonical:'/chords/a-major'},
 'c-major':{symbol:'C',tones:['C','E','G'],keys:['C pitch class','E pitch class','G pitch class'],root:'c-major--root',canonical:'/chords/c-major'},
};
const browser=await chromium.launch({channel:'chrome',headless:true});
async function page(options={}){const p=await browser.newPage({viewport:{width:1440,height:900},...options});p.on('pageerror',e=>errors.push(`pageerror: ${e.message}`));p.on('console',m=>{if(m.type()==='error')errors.push(`console: ${m.text()}`)});return p;}
async function choose(p,labels){for(const label of labels)await p.getByRole('button',{name:label,exact:true}).click();}
try{
 for(const [slug,expected] of Object.entries(details)){
  const url=`/chords/${slug}`,nojs=await page({javaScriptEnabled:false});const response=await nojs.goto(base+url),raw=await response.text(),dom=await nojs.locator('html').evaluate(element=>element.outerHTML);fs.writeFileSync(`${out}/${slug}-raw.html`,raw);fs.writeFileSync(`${out}/${slug}-nojs-dom.html`,dom);
  check(`${slug} HTTP and canonical`,response.status()===200&&(await nojs.locator('link[rel=canonical]').getAttribute('href')).endsWith(expected.canonical));
  check(`${slug} initial DOM has theory/fingering/source/practice`,await nojs.locator('.ch-fingering').count()===1&&await nojs.locator('.ch-source-details a[href^="https://"]').count()>=1&&await nojs.locator('#practice').count()===1&&await nojs.locator('.ch-practice-key').count()===12);
  check(`${slug} initial DOM has unique IDs`,await nojs.evaluate(()=>{const ids=[...document.querySelectorAll('[id]')].map(element=>element.id);return ids.length===new Set(ids).size;}));
  check(`${slug} no-JS practice is honest`,await nojs.getByRole('button',{name:'Check answer',exact:true}).isDisabled()&&await nojs.locator('.ch-static-answer').count()===1&&(await nojs.locator('.ch-static-answer').textContent()).includes(expected.tones.join(', ')));
  await nojs.close();

  const p=await page();await p.goto(base+url);await p.waitForFunction(()=>!document.querySelector('#practice button').disabled);
  check(`${slug} six-case hand controls represented`,await p.locator('.ch-finger-map li').count()===3&&await p.getByRole('radio',{name:'Right hand',exact:true}).isChecked());
  check(`${slug} right mapping`,JSON.stringify(await p.locator('.ch-finger-number').allTextContents())===JSON.stringify(['1','3','5']));
  await p.getByRole('radio',{name:'Left hand',exact:true}).check();check(`${slug} left mapping`,JSON.stringify(await p.locator('.ch-finger-number').allTextContents())===JSON.stringify(['5','3','1']));
  await p.getByRole('radio',{name:'First inversion',exact:true}).check();check(`${slug} inversion clears root fingering`,await p.locator('.ch-finger-map').count()===0&&await p.locator('.ch-fingering-unavailable').count()===1);
  await p.getByRole('radio',{name:'Root position',exact:true}).check();check(`${slug} root restores chosen hand`,JSON.stringify(await p.locator('.ch-finger-number').allTextContents())===JSON.stringify(['5','3','1']));
  const selectedBefore=await p.locator('.am-page').getAttribute('data-selected-voicing');
  await p.getByRole('button',{name:'Check answer',exact:true}).click();check(`${slug} empty feedback`,(await p.locator('.ch-practice-feedback').innerText()).startsWith('No notes selected'));
  await p.getByRole('button',{name:expected.keys[0],exact:true}).click();await p.getByRole('button',{name:'Check answer',exact:true}).click();check(`${slug} missing feedback`,(await p.locator('.ch-practice-feedback').innerText()).includes('Missing:'));
  await p.getByRole('button',{name:'Try again',exact:true}).click();check(`${slug} retry clears`,await p.locator('.ch-practice-key[aria-pressed=true]').count()===0&&await p.locator('#practice').getAttribute('data-practice-state')==='unanswered');
  await choose(p,expected.keys);await p.getByRole('button',{name:'D pitch class',exact:true}).click();await p.getByRole('button',{name:'Check answer',exact:true}).click();check(`${slug} extra feedback`,(await p.locator('.ch-practice-feedback').innerText()).includes('Extra: D'));
  await p.getByRole('button',{name:'Try again',exact:true}).click();await choose(p,expected.keys);await p.getByRole('button',{name:'Check answer',exact:true}).click();check(`${slug} correct pitch-class feedback`,await p.locator('#practice').getAttribute('data-practice-state')==='success'&&(await p.locator('.ch-practice-feedback').innerText()).includes('Octave and selection order'));
  await p.getByRole('button',{name:expected.keys[0],exact:true}).click();check(`${slug} edit invalidates old result`,await p.locator('#practice').getAttribute('data-practice-state')==='unanswered');await p.getByRole('button',{name:expected.keys[0],exact:true}).click();check(`${slug} repeated key toggles deterministically`,await p.getByRole('button',{name:expected.keys[0],exact:true}).getAttribute('aria-pressed')==='true');
  await p.getByRole('button',{name:'Show answer',exact:true}).click();check(`${slug} show answer is not success`,await p.locator('#practice').getAttribute('data-practice-state')==='info'&&(await p.locator('.ch-practice-feedback').innerText()).includes('not recorded as a correct attempt'));
  check(`${slug} practice does not change main selection`,await p.locator('.am-page').getAttribute('data-selected-voicing')===selectedBefore);
  await p.locator(`#${slug==='a-minor'?'am':slug}-fingering-example`).screenshot({path:`${out}/${slug}-fingering.png`});await p.locator('#practice').screenshot({path:`${out}/${slug}-practice-answer.png`});
  await p.setViewportSize({width:1440,height:900});await p.screenshot({path:`${out}/${slug}-1440.png`,fullPage:true});
  await p.setViewportSize({width:390,height:844});check(`${slug} mobile no horizontal overflow`,await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await p.screenshot({path:`${out}/${slug}-390.png`,fullPage:true});
  await p.evaluate(()=>document.documentElement.style.fontSize='200%');check(`${slug} 200% reflow`,await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await p.evaluate(()=>document.documentElement.style.fontSize='');
  await p.close();
 }
 const hubNojs=await page({javaScriptEnabled:false});const hubResponse=await hubNojs.goto(base+'/chords'),hubRaw=await hubResponse.text(),hubDom=await hubNojs.locator('html').evaluate(element=>element.outerHTML);fs.writeFileSync(`${out}/chords-raw.html`,hubRaw);fs.writeFileSync(`${out}/chords-nojs-dom.html`,hubDom);
 check('Hub initial DOM has vocabulary and practice links',hubResponse.status()===200&&await hubNojs.locator('#chords-how-to-read').count()===1&&(await hubNojs.locator('#chords-how-to-read').innerText()).includes('A root note names')&&await hubNojs.locator('.ch-practice-links a').count()===3);
 check('Hub metadata/canonical and unique IDs',(await hubNojs.locator('link[rel=canonical]').getAttribute('href')).endsWith('/chords')&&await hubNojs.evaluate(()=>{const ids=[...document.querySelectorAll('[id]')].map(element=>element.id);return ids.length===new Set(ids).size;}));await hubNojs.close();
 const hub=await page();await hub.goto(base+'/chords');await hub.waitForFunction(()=>!document.querySelector('.ch-result input').disabled);
 check('Hub exposes three real practice anchors',await hub.locator('.ch-practice-links a').count()===3&&JSON.stringify(await hub.locator('.ch-practice-links a').evaluateAll(items=>items.map(item=>item.getAttribute('href'))))===JSON.stringify(['/chords/a-minor#practice','/chords/a-major#practice','/chords/c-major#practice']));
 const root=hub.getByRole('combobox',{name:'Root note',exact:true}),quality=hub.getByRole('combobox',{name:'Chord type',exact:true});
 await root.selectOption('A');check('Hub root filter independent',await hub.locator('.ch-result').count()===2);await quality.selectOption('minor');check('Hub combined filter',await hub.locator('.ch-result').count()===1&&await hub.locator('.ch-result').getAttribute('data-chord-id')==='a-minor');
 await root.selectOption('Cb');check('Hub no-match state',await hub.locator('.ch-empty').count()===1);await hub.getByRole('button',{name:'Show the full collection'}).click();check('Hub clear restores 25',await hub.locator('.ch-result').count()===25);
 await quality.selectOption('major');check('Hub quality filter independent',await hub.locator('.ch-result').count()>1&&await hub.locator('.ch-result[data-quality=minor]').count()===0);
 await hub.setViewportSize({width:1440,height:900});await hub.screenshot({path:`${out}/chords-1440.png`,fullPage:true});await hub.setViewportSize({width:390,height:844});check('Hub mobile no horizontal overflow',await hub.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await hub.screenshot({path:`${out}/chords-390.png`,fullPage:true});await hub.evaluate(()=>document.documentElement.style.fontSize='200%');check('Hub 200% reflow',await hub.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await hub.close();
}catch(error){check('B3 browser execution completed',false,error.stack);}finally{await browser.close();}
check('No runtime or hydration errors',errors.length===0,errors);
const report={executedAt:new Date().toISOString(),base,passed:results.filter(item=>item.passed).length,failed:results.filter(item=>!item.passed).length,results,notRun:['human listening','real mobile device','screen reader','physical printing','PDF tag accessibility','independent review of PianoGrid-specific fingering presentation']};
fs.writeFileSync(`${out}/b3-validation.json`,JSON.stringify(report,null,2));console.log(`B3: ${report.passed} passed, ${report.failed} failed`);process.exitCode=report.failed?1:0;
