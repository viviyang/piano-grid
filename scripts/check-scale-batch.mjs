import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';

const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PIANO_PLAYWRIGHT_PATH||'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const master=JSON.parse(await readFile('docs/content/site-master/page-content.master.json','utf8'));
const base=process.env.PIANO_BASE_URL||'http://localhost:3000';
const out=process.env.PIANO_CHECK_OUT||'checks/batches/03-scales';
const additionalRoutes=new Set((process.env.PIANO_ADDITIONAL_ROUTES||'').split(',').filter(Boolean));
await mkdir(`${out}/screenshots`,{recursive:true});await mkdir(`${out}/print-pdfs`,{recursive:true});
const results=[],errors=[];
const check=(name,passed,detail='')=>{results.push({name,passed:Boolean(passed),detail});if(!passed)console.error('FAIL',name,detail);};
const display=value=>value.replaceAll('##','𝄪').replaceAll('bb','𝄫').replaceAll('#','♯').replaceAll('b','♭');
const browser=await chromium.launch({channel:'chrome',headless:true});
function observe(){const Native=window.AudioContext;window.__audio={contexts:0,nodes:[]};if(Native)window.AudioContext=class extends Native{constructor(...args){super(...args);window.__audio.contexts++;}createOscillator(){const oscillator=super.createOscillator(),record={};window.__audio.nodes.push(record);const set=oscillator.frequency.setValueAtTime.bind(oscillator.frequency),stop=oscillator.stop.bind(oscillator),disconnect=oscillator.disconnect.bind(oscillator);oscillator.frequency.setValueAtTime=(frequency,time)=>{record.frequency=frequency;record.startFrequencyTime=time;return set(frequency,time);};oscillator.stop=(time)=>{if(time===undefined)record.cancelled=true;record.stopTime=time;return stop(time);};oscillator.disconnect=()=>{record.disconnected=true;return disconnect();};return oscillator;}};}
const page=await browser.newPage({viewport:{width:1440,height:1000}});page.on('pageerror',error=>errors.push(error.message));await page.addInitScript(observe);
async function load(url){await page.goto(base+url);await page.waitForFunction(()=>[...document.querySelectorAll('select')].every(select=>!select.disabled));}
function sourcePage(url){return master.pages[url];}
async function current(){return page.locator('.sc-tool').getAttribute('data-current-scale');}
async function rowText(sequence='ascending'){return page.locator(`[data-sequence="${sequence}"] tr`).first().locator('td').allTextContents();}
async function fingers(sequence='ascending'){return page.locator(`[data-sequence="${sequence}"] tr`).nth(1).locator('td').allTextContents();}

try{
 for(const url of ['/scales','/scales/c-major','/scales/a-minor']){
  await load(url);const source=sourcePage(url);
  check(`${url} metadata`,await page.title()===source.metadata.title,await page.title());
  check(`${url} noindex`,(await page.locator('meta[name=robots]').getAttribute('content')).includes('noindex'));
  for(const block of source.blocks)check(`${url} block ${block.id}`,(await page.locator(`[data-block-id="${block.id}"]`).textContent()).includes(block.body));
  check(`${url} no autoplay`,await page.evaluate(()=>window.__audio.contexts===0));
  check(`${url} no duplicate IDs`,await page.evaluate(()=>{const ids=[...document.querySelectorAll('[id]')].map(node=>node.id);return ids.length===new Set(ids).size;}));
  for(const width of [1440,390,320,768]){await page.setViewportSize({width,height:950});await page.waitForTimeout(80);check(`${url} no page overflow ${width}`,await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.screenshot({path:`${out}/screenshots/${url.replaceAll('/','-').slice(1)}-${width}.png`,fullPage:true});}
  await page.evaluate(()=>document.documentElement.style.fontSize='200%');check(`${url} text 200 no page overflow`,await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.screenshot({path:`${out}/screenshots/${url.replaceAll('/','-').slice(1)}-text200.png`,fullPage:true});await page.evaluate(()=>document.documentElement.style.fontSize='');
 }

 await page.setViewportSize({width:1440,height:1000});await load('/scales');
 const center=sourcePage('/scales').data;
 check('Center defaults C major',await current()==='major:C');
 check('Center default source fingering',JSON.stringify(await fingers())===JSON.stringify(['1','2','3','1','2','3','4','5']));
 for(const [form,label,field] of [
  ['major','Major','major_overview'],
  ['natural_minor','Natural minor','minor_overview'],
  ['harmonic_minor','Harmonic minor','minor_overview'],
  ['melodic_minor_classical','Melodic minor (classical)','minor_overview'],
 ]){
  await page.getByLabel('Scale type',{exact:true}).selectOption(form);
  const rows=center[field];
  check(`${label} exposes every prepared tonic`,await page.getByLabel('Starting note',{exact:true}).locator('option').count()===rows.length,rows.length);
  for(const row of rows){
   await page.getByLabel('Starting note',{exact:true}).selectOption(row.tonic);
   check(`${label} ${row.tonic} selected`,await current()===`${form}:${row.tonic}`);
   const expected=form==='major'?[...row.notes,row.tonic]:form==='natural_minor'?row.natural_ascending:form==='harmonic_minor'?row.harmonic_ascending:row.melodic_classical_ascending;
   check(`${label} ${row.tonic} note spelling`,(await page.locator('.sc-screen .sc-note-line').textContent()).trim()===expected.map(display).join(' – '),await page.locator('.sc-screen .sc-note-line').textContent());
   check(`${label} ${row.tonic} eight staff notes`,await page.locator('.sc-screen .kn-staff-note').count()===8);
  }
 }
 await page.getByLabel('Scale type',{exact:true}).selectOption('harmonic_minor');await page.getByLabel('Starting note',{exact:true}).selectOption('G#');check('Double sharp spelling retained',(await page.locator('.sc-screen .sc-note-line').textContent()).includes('F𝄪'));
 await page.getByLabel('Direction',{exact:true}).selectOption('descending');check('Unverified center fingering withheld',await page.locator('.sc-screen').getByText('Fingering is not available for this hand and direction.').count()===1);
 await page.getByLabel('Scale type',{exact:true}).selectOption('major');await page.getByLabel('Starting note',{exact:true}).selectOption('C');await page.getByLabel('Direction',{exact:true}).selectOption('up_down');check('Center up and down has two staffs',await page.locator('.sc-screen .kn-staff').count()===2);check('Center up and down playback has 15 notes',(await page.locator('.sc-screen .sc-sequence-table tr').first().locator('td').count())+(await page.locator('.sc-screen .sc-sequence-table tr').nth(2).locator('td').count())===16);
 await page.evaluate(()=>window.print=()=>{});await page.getByRole('button',{name:'Print current scale'}).click();check('Center print snapshot',await page.locator('[data-print-scale]').getAttribute('data-print-scale')==='major:C'&&await page.locator('[data-print-direction]').getAttribute('data-print-direction')==='up_down');await page.pdf({path:`${out}/print-pdfs/scales-center-c-major.pdf`,format:'Letter',margin:{top:'14mm',bottom:'14mm',left:'14mm',right:'14mm'},printBackground:true});

 await load('/scales/c-major');const c=sourcePage('/scales/c-major').data;
 for(const hand of ['RH','LH'])for(const direction of ['ascending','descending']){
  await page.getByLabel('Hand',{exact:true}).selectOption(hand);await page.getByLabel('Direction',{exact:true}).selectOption(direction);
  check(`C major ${hand} ${direction} notes`,JSON.stringify(await rowText(direction))===JSON.stringify(c.pitch_sequences[hand][direction].map(item=>display(item.note))));
  check(`C major ${hand} ${direction} fingers`,JSON.stringify(await fingers(direction))===JSON.stringify(c.fingering[hand][direction].map(String)));
  check(`C major ${hand} ${direction} clef`,await page.locator(`.${'sc-screen'} [aria-label="${hand==='RH'?'treble':'bass'} staff notes"]`).count()===1);
 }
 await page.getByLabel('Hand',{exact:true}).selectOption('LH');await page.getByLabel('Direction',{exact:true}).selectOption('up_down');check('C major combined direction has two checked finger rows',await page.locator('.sc-screen').getByText('Source-checked fingering',{exact:true}).count()===2);
 await page.getByRole('button',{name:'Play scale'}).click();await page.waitForFunction(()=>window.__audio.nodes.length>=15);check('C major up-down schedules 15 notes',await page.evaluate(()=>window.__audio.nodes.length>=15));await page.getByRole('button',{name:'Stop'}).click();check('C major stop disconnects scheduled notes',await page.evaluate(()=>window.__audio.nodes.every(node=>node.disconnected)));
 await page.evaluate(()=>window.print=()=>{});await page.getByRole('button',{name:'Print current scale'}).click();check('C major print state',await page.locator('[data-print-hand]').getAttribute('data-print-hand')==='LH'&&await page.locator('[data-print-direction]').getAttribute('data-print-direction')==='up_down');await page.pdf({path:`${out}/print-pdfs/c-major-lh-up-down.pdf`,format:'Letter',margin:{top:'14mm',bottom:'14mm',left:'14mm',right:'14mm'},printBackground:true});

 await load('/scales/a-minor');const a=sourcePage('/scales/a-minor').data;
 for(const form of a.forms){
  await page.getByLabel('Minor form',{exact:true}).selectOption(form.id);
  for(const hand of ['RH','LH'])for(const direction of ['ascending','descending','up_down']){
   await page.getByLabel('Hand',{exact:true}).selectOption(hand);await page.getByLabel('Direction',{exact:true}).selectOption(direction);
   check(`A ${form.id} ${hand} ${direction} selected`,await current()===`${form.id}:A`);
   if(direction==='ascending'){
    const key=hand==='RH'?'right_hand_ascending_example':'left_hand_ascending_example';
    check(`A ${form.id} ${hand} ascending notes`,JSON.stringify(await rowText())===JSON.stringify(form.pitch_mapping[key].map(item=>display(`${item.spelling}${item.written_octave}`))));
    check(`A ${form.id} ${hand} ascending fingers`,JSON.stringify(await fingers())===JSON.stringify(form.fingering.ascending[hand==='RH'?'right_hand':'left_hand'].map(String)));
   }else if(direction==='descending'){
    const key=hand==='RH'?'right_hand_descending_example':'left_hand_descending_example';
    check(`A ${form.id} ${hand} descending notes`,JSON.stringify(await rowText('descending'))===JSON.stringify(form.pitch_mapping[key].map(item=>display(`${item.spelling}${item.written_octave}`))));
    check(`A ${form.id} ${hand} descending fingering withheld`,await page.locator('.sc-screen').getByText('Fingering is not available for this hand and direction.').count()===1);
   }else{
    check(`A ${form.id} ${hand} up-down two sequences`,await page.locator('.sc-screen .sc-sequence-block').count()===2);
    check(`A ${form.id} ${hand} up-down descending fingering withheld`,await page.locator('.sc-screen').getByText('Fingering is not available for this hand and direction.').count()===1);
   }
  }
 }
 await page.getByLabel('Minor form',{exact:true}).selectOption('melodic_minor_classical');await page.getByLabel('Hand',{exact:true}).selectOption('RH');await page.getByLabel('Direction',{exact:true}).selectOption('up_down');await page.getByLabel('Tempo',{exact:true}).selectOption('80');check('A melodic direction-specific spelling',(await page.locator('.sc-screen [data-sequence="ascending"]').textContent()).includes('F♯5')&&(await page.locator('.sc-screen [data-sequence="descending"]').textContent()).includes('F5'));
 await page.getByRole('button',{name:'Play scale'}).click();await page.waitForFunction(()=>window.__audio.nodes.length>=15);await page.getByLabel('Minor form',{exact:true}).selectOption('natural_minor');check('Form switch cancels old scale',await page.evaluate(()=>window.__audio.nodes.every(node=>node.disconnected)));
 await page.getByLabel('Direction',{exact:true}).selectOption('ascending');await page.getByLabel('Tempo',{exact:true}).selectOption('40');await page.evaluate(()=>window.print=()=>{});await page.getByRole('button',{name:'Print current scale'}).click();check('A minor print state',await page.locator('[data-print-scale]').getAttribute('data-print-scale')==='natural_minor:A'&&await page.locator('[data-print-tempo]').getAttribute('data-print-tempo')==='40');await page.pdf({path:`${out}/print-pdfs/a-minor-natural-rh-ascending.pdf`,format:'Letter',margin:{top:'14mm',bottom:'14mm',left:'14mm',right:'14mm'},printBackground:true});
 await page.getByLabel('Minor form',{exact:true}).selectOption('melodic_minor_classical');await page.getByLabel('Direction',{exact:true}).selectOption('descending');await page.getByLabel('Tempo',{exact:true}).selectOption('80');
 check('A melodic current note line follows descending direction',(await page.locator('.sc-screen .sc-note-line').textContent()).trim()===a.forms[2].notes_descending.map(display).join(' – '));
 check('A melodic current steps follow descending direction',(await page.locator('.sc-screen .sc-step-line').textContent()).trim()==='Semitone steps: 2 – 2 – 1 – 2 – 2 – 1 – 2');
 await page.getByRole('button',{name:'Print current scale'}).click();await page.pdf({path:`${out}/print-pdfs/a-minor-melodic-rh-descending.pdf`,format:'Letter',margin:{top:'14mm',bottom:'14mm',left:'14mm',right:'14mm'},printBackground:true});

 const nojs=await browser.newPage({javaScriptEnabled:false});for(const url of ['/scales','/scales/c-major','/scales/a-minor']){await nojs.goto(base+url);check(`NoJS readable ${url}`,await nojs.locator('.sc-screen .sc-note-line').count()===1);check(`NoJS controls disabled ${url}`,await nojs.locator('select').first().isDisabled());}await nojs.close();
 for(const url of ['/chords','/chords/a-minor','/chords/a-major','/chords/c-major','/keyboard-notes','/keyboard-notes/labeled','/keyboard-notes/chart',...additionalRoutes])check(`Existing route ${url}`,(await page.request.get(base+url)).status()===200);
 for(const url of ['/','/tools','/scales/d-major','/scales/modes','/songs','/guide'].filter(url=>!additionalRoutes.has(url)))check(`Unauthorized route ${url}`,(await page.request.get(base+url)).status()===404);
 check('No runtime errors',errors.length===0,errors);
}catch(error){check('Scale browser runner completed',false,error.stack);}finally{
 await browser.close();const report={executed_at:new Date().toISOString(),passed:results.filter(item=>item.passed).length,failed:results.filter(item=>!item.passed).length,results};await writeFile(`${out}/validation.json`,JSON.stringify(report,null,2)+'\n');console.log(`Scale browser: ${report.passed} passed, ${report.failed} failed.`);process.exitCode=report.failed?1:0;
}
