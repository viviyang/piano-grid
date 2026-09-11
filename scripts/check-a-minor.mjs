/** Actual page/browser regression. Uses the existing Codex Playwright runtime; installs nothing. */
import { createRequire } from 'node:module';
import { readFile,writeFile,mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PIANO_PLAYWRIGHT_PATH || 'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base=process.env.PIANO_BASE_URL||'http://127.0.0.1:3000';
const out=resolve(process.env.PIANO_CHECK_OUT||'checks/batches/01-chords/a-minor-regression');await mkdir(out,{recursive:true});
const source=JSON.parse(await readFile('docs/content/chords/page-content.json','utf8'));
const content=source.pages['/chords/a-minor'];
const results=[],runtimeErrors=[];
function check(name,passed,actual){results.push({name,passed:Boolean(passed),actual});if(!passed)console.error('FAIL',name,actual);}
const equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const browser=await chromium.launch({channel:'chrome',headless:true});
const pages=[];
async function newPage(options={}){const p=await browser.newPage({viewport:{width:1440,height:900},...options});pages.push(p);p.on('pageerror',e=>runtimeErrors.push(e.message));p.on('console',m=>{if(m.type()==='error')runtimeErrors.push(m.text());});return p;}
async function load(p){const r=await p.goto(`${base}/chords/a-minor`);await p.getByRole('button',{name:'Play chord',exact:true}).waitFor();return r;}
async function ready(p){await p.getByRole('radio',{name:'Root position',exact:true}).waitFor();await p.waitForFunction(()=>!document.querySelector('fieldset').disabled);}
// Observe actual native Web Audio calls, not a replacement success implementation.
function observeAudio(){
  const Native=window.AudioContext;
  window.__audio={contexts:0,nodes:[]};
  if(!Native)return;
  window.AudioContext=class extends Native{
    constructor(...args){super(...args);window.__audio.contexts++;}
    createOscillator(){
      const osc=super.createOscillator(),record={frequency:null,start:null,stop:null,disconnects:0};window.__audio.nodes.push(record);
      const frequency=osc.frequency.setValueAtTime.bind(osc.frequency);osc.frequency.setValueAtTime=(value,time)=>{record.frequency=value;record.frequencyTime=time;return frequency(value,time);};
      const start=osc.start.bind(osc),stop=osc.stop.bind(osc),disconnect=osc.disconnect.bind(osc);
      osc.start=time=>{record.start=time;start(time);};osc.stop=time=>{if(time!==undefined)record.stop=time;else record.cancelled=true;stop(time);};
      osc.disconnect=(...args)=>{record.disconnects++;return disconnect(...args);};return osc;
    }
  };
}
try{
  const page=await newPage();await page.addInitScript(observeAudio);const response=await load(page);await ready(page);
  check('Page HTTP 200',response.status()===200,response.status());
  check('No automatic AudioContext',await page.evaluate(()=>window.__audio.contexts===0));
  check('Metadata title',await page.title()===content.metadata.title);
  const robotsContent=await page.locator('meta[name="robots"]').getAttribute('content');
  check('Public route remains indexable',robotsContent?.includes('index')&&!robotsContent.includes('noindex'),robotsContent);
  check('Canonical matches the integrated route',(await page.locator('link[rel="canonical"]').getAttribute('href')).endsWith('/chords/a-minor'));
  const html=await page.content();
  check('No full ledger/base64 delivered',!html.includes('data:application/pdf;base64')&&!html.includes('source_task_mapping')&&!html.includes('retained_keywords'));
  const rendered=await page.locator('main').textContent();
  for(const b of content.blocks){
    if(b.block_id==='am-next'){
      // B1 restores the three existing destinations; historical JSON publication flags stay intact.
      const expected=['/chords','/chords/a-major','/scales/a-minor'];
      check('am-next preserves the three original published references',equal((await page.locator('#am-next a').evaluateAll(links=>links.map(a=>a.getAttribute('href')))).slice(0,3),expected));
      check('am-next preserves original link labels',equal((await page.locator('#am-next a').allTextContents()).slice(0,3),b.content.links.map(l=>l.label)));
      check('A major comparison has its real detail link',await page.locator('#am-why-minor a[href="/chords/a-major"]').count()===1);
      continue;
    }
    check(`Block rendered ${b.block_id}`,await page.locator(`[data-block-id="${b.block_id}"]`).count()>0);
    for(const [i,text] of [...b.content.paragraphs,...b.content.steps].entries()){
      const expected=b.block_id==='am-intro'?text.replace('The example below','The root-position example'):text;
      // Intro first paragraph is split between direct answer and root-position explanation.
      const present=b.block_id==='am-intro'&&i===0?expected.split('. ').every(s=>rendered.includes(s)):rendered.includes(expected);
      check(`Source copy ${b.block_id} ${i}`,present);
    }
    if(b.block_id==='am-questions')for(const row of b.content.table.rows)for(const text of row)check(`FAQ source ${text.slice(0,30)}`,rendered.includes(text));
  }
  const links=await page.locator('main a,header a,footer a').evaluateAll(items=>items.map(a=>a.getAttribute('href')));
  const linkStatuses=await Promise.all([...new Set(links.filter(h=>h&&h.startsWith('/')))].map(async href=>[href,(await page.request.get(base+href)).status()]));
  check('No dead page links',linkStatuses.every(([,status])=>status===200),linkStatuses);
  check('B3 exposes only the two verified single-hand choices',await page.locator('#am-fingering-example input[type="radio"]').count()===2&&await page.getByRole('radio',{name:'Right hand',exact:true}).count()===1&&await page.getByRole('radio',{name:'Left hand',exact:true}).count()===1);
  const expectedCases=[['root','Am',['A3','C4','E4'],[57,60,64],'A3'],['first','Am/C',['C4','E4','A4'],[60,64,69],'C4'],['second','Am/E',['E4','A4','C5'],[64,69,72],'E4']];
  for(const [i,[id,symbol,names,midi,bass]] of expectedCases.entries()){
    const radio=page.getByRole('radio',{name:content.selection.options[i].label,exact:true});await radio.check();
    const v=source.shared_data.voicings[`a-minor--${id}`];
    check(`${id}: symbol`,await page.locator('#current-symbol').textContent()===symbol);
    check(`${id}: bass`,await page.locator('#current-bass').textContent()===bass);
    check(`${id}: note order`,equal(await page.locator('#note-order .am-pitch').allTextContents(),names));
    check(`${id}: selected keyboard MIDI`,equal(await page.locator('#keyboard-scroll .am-key.am-is-selected').evaluateAll(els=>els.map(e=>Number(e.dataset.midi))),midi));
    check(`${id}: root identity unchanged`,await page.locator('.am-chord-id').textContent()==='Am'&&(await page.locator('.am-tool-notes').textContent()).includes('The root stays A'));
    check(`${id}: one 15-white/10-black C3-C5 keyboard`,await page.locator('#keyboard-scroll .am-white').count()===15&&await page.locator('#keyboard-scroll .am-black').count()===10);
    check(`${id}: table follows selection`,await page.locator(`tr[data-voicing-id="a-minor--${id}"] .am-current-row-mark`).evaluate(e=>getComputedStyle(e).visibility)==='visible');
    check(`${id}: only current table row is exposed as selected`,await page.locator('.am-inversion-table tr[aria-current="true"]').count()===1&&await page.locator('.am-inversion-table tbody').getByText('current selection',{exact:false}).count()===1&&await page.locator(`tr[data-voicing-id="a-minor--${id}"]`).getAttribute('aria-current')==='true');
    for(const mode of ['together','ascending']){
      const before=await page.evaluate(()=>window.__audio.nodes.length);
      await page.getByRole('button',{name:mode==='together'?'Play chord':'Play notes one at a time',exact:true}).click();
      await page.waitForFunction(()=>document.querySelector('#am-result').dataset.audioState==='playing');
      const actual=await page.evaluate(index=>window.__audio.nodes.slice(index),before);
      const expected=v.playback[mode];
      check(`${id}/${mode}: actual frequencies`,equal(actual.map(n=>n.frequency),expected.map(e=>e.frequency_hz)),actual);
      check(`${id}/${mode}: actual event timing`,actual.length===3&&actual.every((n,j)=>Math.abs((n.start-actual[0].start)*1000-expected[j].onset_ms)<.01&&Math.abs((n.stop-n.start)*1000-expected[j].duration_ms)<.01),actual);
      await page.locator('.am-stop-btn').evaluate(button=>{if(!button.disabled)button.click();});
      await page.waitForFunction(()=>document.querySelector('#am-result').dataset.audioState==='stopped');
      check(`${id}/${mode}: Stop clears sound retains selection`,await page.locator('#am-result').getAttribute('data-audio-state')==='stopped'&&await page.locator('#keyboard-scroll .am-is-sounding').count()===0&&await radio.isChecked());
      check(`${id}/${mode}: old oscillators disconnected`,await page.evaluate(index=>window.__audio.nodes.slice(index).every(n=>n.disconnects>0),before));
    }
    await page.evaluate(()=>{window.print=()=>window.dispatchEvent(new Event('beforeprint'));});
    await page.locator('[data-print-current]').first().click();
    check(`${id}: print snapshot`,await page.locator('#print-content').getAttribute('data-voicing-id')===v.voicing_id);
    check(`${id}: print MIDI and notes`,equal(await page.locator('#print-content .am-key.am-is-selected').evaluateAll(els=>els.map(e=>Number(e.dataset.midi))),midi)&&(await page.locator('#print-content .am-print-notes').textContent())===names.join(' – '));
    await page.emulateMedia({media:'print'});
    check(`${id}: print independent of screen crop`,await page.locator('main').isHidden()&&await page.locator('#print-content').isVisible()&&await page.locator('#print-content .am-keyboard').evaluate(e=>e.scrollWidth<=e.clientWidth+1));
    await page.screenshot({path:`${out}/print-${id}.png`,fullPage:true});
    await page.pdf({path:`${out}/print-${id}.pdf`,preferCSSPageSize:true,printBackground:true});
    await page.emulateMedia({media:'screen'});await page.evaluate(()=>window.dispatchEvent(new Event('afterprint')));
  }
  // Printing keeps the captured selection even if screen state changes while preview is open.
  await page.getByRole('radio',{name:'Root position',exact:true}).check();await page.locator('[data-print-current]').first().click();
  await page.getByRole('radio',{name:'First inversion',exact:true}).check();
  check('Print snapshot is stable across a later selection',await page.locator('#print-content').getAttribute('data-voicing-id')==='a-minor--root');
  await page.evaluate(()=>window.dispatchEvent(new Event('afterprint')));
  await page.waitForFunction(()=>document.querySelector('#print-content')?.getAttribute('data-voicing-id')==='a-minor--first');
  check('Afterprint releases snapshot without success claim',await page.locator('#print-content').getAttribute('data-voicing-id')==='a-minor--first'&&!(await page.locator('body').textContent()).includes('Print successful'));
  await page.evaluate(()=>window.dispatchEvent(new Event('beforeprint')));
  check('Browser direct-print uses current selection',await page.locator('#print-content').getAttribute('data-voicing-id')==='a-minor--first');await page.evaluate(()=>window.dispatchEvent(new Event('afterprint')));
  await page.evaluate(()=>{window.print=()=>{throw new Error('test print failure');};});await page.locator('[data-print-current]').first().click();
  check('Print failure is honest and leaves PDF available',(await page.locator('.am-resource-feedback').textContent())===content.microcopy.print_error);
  // Native radio keyboard interaction, focus and FAQ.
  await page.getByRole('radio',{name:'Root position',exact:true}).focus();await page.keyboard.press('ArrowRight');
  check('Radio ArrowRight changes selection and retains focus',await page.getByRole('radio',{name:'First inversion',exact:true}).isChecked()&&await page.getByRole('radio',{name:'First inversion',exact:true}).evaluate(e=>e===document.activeElement));
  await page.getByRole('radio',{name:'Second inversion',exact:true}).focus();await page.keyboard.press('Space');
  check('Radio Space selects focused position',await page.getByRole('radio',{name:'Second inversion',exact:true}).isChecked());
  const ring=await page.locator('.am-radio-label input:checked + .am-segment').evaluate(e=>({width:getComputedStyle(e).outlineWidth,offset:getComputedStyle(e).outlineOffset}));
  check('Visible proxy focus ring',ring.width==='2px'&&ring.offset==='3px',ring);
  const faq=page.locator('details').first();await faq.locator('summary').focus();await page.keyboard.press('Enter');check('FAQ keyboard expands',await faq.getAttribute('open')!==null);await page.keyboard.press('Enter');check('FAQ keyboard collapses',await faq.getAttribute('open')===null);
  await page.getByRole('button',{name:'Search this page',exact:true}).click();await page.locator('#page-search-input').fill('inversions');
  check('Search stays local and has results',await page.locator('.am-search-result').count()>0&&(await page.locator('.am-search-result').evaluateAll(els=>els.every(e=>e.getAttribute('href').startsWith('#')))));
  await page.keyboard.press('Escape');check('Escape closes populated search and returns focus',await page.locator('#page-search').isHidden()&&await page.getByRole('button',{name:'Search this page',exact:true}).evaluate(e=>e===document.activeElement));
  // Lifecycle cancellation and quick mode switches using real AudioContext.
  await page.getByRole('button',{name:'Play notes one at a time',exact:true}).click();const oldCount=await page.evaluate(()=>window.__audio.nodes.length);
  await page.getByRole('button',{name:'Play chord',exact:true}).click();
  check('Quick replay disconnects prior scheduled events',await page.evaluate(n=>window.__audio.nodes.slice(n-3,n).every(x=>x.disconnects>0),oldCount));
  await page.getByRole('radio',{name:'Root position',exact:true}).check();check('Selection cancels without autoplay',await page.locator('#am-result').getAttribute('data-audio-state')==='idle');
  await page.getByRole('button',{name:'Play chord',exact:true}).click();
  await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,get:()=>true});document.dispatchEvent(new Event('visibilitychange'));});
  await page.waitForFunction(()=>document.querySelector('#am-result').dataset.audioState==='stopped');
  check('Hidden page cancels audio',await page.locator('#am-result').getAttribute('data-audio-state')==='stopped');await page.evaluate(()=>delete document.hidden);
  await page.getByRole('button',{name:'Play chord',exact:true}).click();await page.evaluate(()=>window.dispatchEvent(new Event('pagehide')));
  check('Pagehide disconnects all active nodes',await page.evaluate(()=>window.__audio.nodes.every(n=>n.disconnects>0)));
  // Responsive layout, key visibility, actual text size, 200% text scaling.
  for(const width of [320,390,768,1024,1440]){
    await page.setViewportSize({width,height:width===390?844:900});
    for(let i=0;i<3;i++){
      await page.getByRole('radio',{name:content.selection.options[i].label,exact:true}).check();
      await page.waitForFunction(()=>{const s=document.querySelector('#keyboard-scroll'),r=s.getBoundingClientRect();return Array.from(s.querySelectorAll('.am-key.am-is-selected')).every(k=>{const b=k.getBoundingClientRect();return b.left>=r.left-1&&b.right<=r.right+1;});});
      check(`${width}/${i}: selected keys fully visible`,true);
    }
    check(`${width}: no whole-page overflow`,await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    check(`${width}: key labels actually 14px`,await page.locator('#keyboard-scroll .am-key-label').first().evaluate(e=>getComputedStyle(e).fontSize)==='14px');
    check(`${width}: controls at least 44px`,await page.locator('.am-playback-actions button').evaluateAll(els=>els.every(e=>e.getBoundingClientRect().height>=44)));
    await page.getByRole('radio',{name:'Root position',exact:true}).check();await page.screenshot({path:`${out}/responsive-${width}.png`,fullPage:true});
  }
  await page.setViewportSize({width:390,height:844});await page.evaluate(()=>document.documentElement.style.fontSize='200%');
  check('200% text reflow without whole-page overflow',await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.screenshot({path:`${out}/text-200.png`,fullPage:true});await page.evaluate(()=>document.documentElement.style.fontSize='');
  await page.emulateMedia({reducedMotion:'reduce'});check('Reduced motion removes transitions',await page.locator('.am-button').first().evaluate(e=>getComputedStyle(e).transitionDuration)==='0s');
  await page.emulateMedia({reducedMotion:'no-preference',forcedColors:'active'});await page.getByRole('radio',{name:'Root position',exact:true}).focus();await page.keyboard.press('ArrowRight');
  check('Forced colors keeps selection and focus outlines',await page.locator('.am-radio-label input:checked + .am-segment').evaluate(e=>getComputedStyle(e).outlineWidth==='2px'));await page.emulateMedia({forcedColors:'none'});
  const pdf=await page.request.get(`${base}/assets/chords/a-minor-notes-inversions.pdf`),bytes=await pdf.body(),local=await readFile('public/assets/chords/a-minor-notes-inversions.pdf');
  check('PDF served exact verified bytes',pdf.status()===200&&bytes.equals(local),{status:pdf.status(),sha256:createHash('sha256').update(bytes).digest('hex')});
  const nojs=await newPage({javaScriptEnabled:false});await load(nojs);
  check('No-JS has root notes, keyboard, table, full copy',await nojs.locator('#current-symbol').textContent()==='Am'&&await nojs.locator('#keyboard-scroll .am-key').count()===25&&await nojs.locator('.am-inversion-table tbody tr').count()===3&&(await nojs.locator('main').textContent()).includes(content.blocks.find(b=>b.block_id==='am-why-minor').content.paragraphs[0]));
  check('No-JS disables unsupported actions, retains static PDF',await nojs.getByRole('button',{name:'Play chord',exact:true}).isDisabled()&&await nojs.getByRole('link',{name:'Download A minor PDF',exact:true}).count()===2);
  await nojs.emulateMedia({media:'print'});check('No-JS browser print has root-position fallback',await nojs.locator('#print-content').isVisible());
  for(const scenario of ['unavailable','error','delayed-stop','delayed-selection']){
    const p=await newPage();await p.addInitScript(observeAudio);
    await p.addInitScript(s=>{
      if(s==='unavailable'){Object.defineProperty(window,'AudioContext',{value:undefined,configurable:true});Object.defineProperty(window,'webkitAudioContext',{value:undefined,configurable:true});}
      else if(s==='error')window.AudioContext=class{constructor(){throw new Error('Injected audio startup error');}};
      else {const Native=window.AudioContext;window.__hold=true;window.AudioContext=class extends Native{get state(){return window.__hold?'suspended':super.state;}resume(){return new Promise(resolve=>{window.__release=()=>{window.__hold=false;super.resume().then(resolve);};});}};}
    },scenario);
    await load(p);await ready(p);
    if(scenario==='unavailable')check('Unavailable audio is disabled and explained',await p.getByRole('button',{name:'Play chord',exact:true}).isDisabled()&&await p.locator('#audio-status').textContent()===content.microcopy.audio_unavailable);
    else {
      await p.getByRole('button',{name:'Play chord',exact:true}).click();
      if(scenario==='error')check('Startup error preserves correct answer',await p.locator('#audio-status').textContent()===content.microcopy.audio_error&&await p.locator('#current-symbol').textContent()==='Am');
      else {
        await p.waitForFunction(()=>document.querySelector('#am-result').dataset.audioState==='loading');
        if(scenario==='delayed-stop')await p.getByRole('button',{name:'Stop',exact:true}).click();else await p.getByRole('radio',{name:'First inversion',exact:true}).check();
        await p.evaluate(()=>window.__release());await p.waitForTimeout(150);
        check(`${scenario}: late resume leaves no live sound`,await p.evaluate(()=>window.__audio.nodes.length===3&&window.__audio.nodes.every(n=>n.cancelled&&n.disconnects>0)&&document.querySelectorAll('#keyboard-scroll .am-is-sounding').length===0));
      }
    }
    await p.getByRole('radio',{name:'Second inversion',exact:true}).check();check(`${scenario}: switching and printing remain usable`,await p.locator('#current-symbol').textContent()==='Am/E'&&await p.locator('[data-print-current]').first().isEnabled());
    await p.close();
  }
  check('Integrated root exists',(await page.request.get(`${base}/`)).status()===200);
  check('Authorized chords index exists',(await page.request.get(`${base}/chords`)).status()===200);
}catch(error){check('Browser execution completed',false,error.stack);}
finally{await browser.close();}
check('No runtime/console/hydration errors',runtimeErrors.length===0,runtimeErrors);
const report={executed_at:new Date().toISOString(),passed:results.filter(x=>x.passed).length,failed:results.filter(x=>!x.passed).length,results,not_tested:['human listening','real mobile device','screen-reader audit','physical printing','production deployment']};
await writeFile(`${out}/page-validation.json`,JSON.stringify(report,null,2));console.log(`Page: ${report.passed} passed, ${report.failed} failed.`);process.exitCode=report.failed?1:0;
