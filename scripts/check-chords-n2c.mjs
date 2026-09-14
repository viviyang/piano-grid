import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import {createRequire} from 'node:module';
const {chromium}=createRequire(import.meta.url)(process.env.PIANO_PLAYWRIGHT_PATH||'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base=process.env.PIANO_BASE_URL||'http://127.0.0.1:3101';
const out=process.env.PIANO_CHECK_OUT||path.join(os.tmpdir(),'pianogrid-chords-n2c');
fs.mkdirSync(`${out}/screenshots`,{recursive:true});
const pkg='docs/pianogrid-chords-n2c';
const manifest=JSON.parse(fs.readFileSync(`${pkg}/manifest.json`,'utf8'));
const seo=JSON.parse(fs.readFileSync(`${pkg}/04_seo/N2C.url-keyword-tdh.json`,'utf8'));
const category=JSON.parse(fs.readFileSync(`${pkg}/02_category/seventh.page.json`,'utf8'));
const links=JSON.parse(fs.readFileSync(`${pkg}/05_internal_links/N2C.internal-links.json`,'utf8'));
const details=fs.readdirSync(`${pkg}/03_details`).filter(name=>name.endsWith('.page.json')).map(name=>JSON.parse(fs.readFileSync(`${pkg}/03_details/${name}`,'utf8')));
const detailURLs=details.map(item=>item.url),n2cURLs=['/chords/seventh',...detailURLs],results=[],runtimeErrors=[];
const check=(name,passed,detail='')=>{results.push({name,passed:Boolean(passed),detail});if(!passed)console.error('FAIL',name,detail);};
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const clean=value=>value.replace(/\s+/g,' ').trim();
const hash=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
const browser=await chromium.launch({channel:'chrome',headless:true});
function observe(){const Native=window.AudioContext;window.__audio={contexts:0,nodes:[]};if(!Native)return;window.AudioContext=class extends Native{constructor(...args){super(...args);window.__audio.contexts++;}createOscillator(){const oscillator=super.createOscillator(),record={frequency:null,start:null,stop:null,disconnects:0};window.__audio.nodes.push(record);const set=oscillator.frequency.setValueAtTime.bind(oscillator.frequency),start=oscillator.start.bind(oscillator),stop=oscillator.stop.bind(oscillator),disconnect=oscillator.disconnect.bind(oscillator);oscillator.frequency.setValueAtTime=(value,time)=>{record.frequency=value;return set(value,time)};oscillator.start=time=>{record.start=time;start(time)};oscillator.stop=time=>{record.stop=time;stop(time)};oscillator.disconnect=(...args)=>{record.disconnects++;return disconnect(...args)};return oscillator;}};}
async function page(options={}){const value=await browser.newPage(options);value.on('pageerror',error=>runtimeErrors.push(error.message));value.on('console',message=>{if(message.type()==='error')runtimeErrors.push(message.text())});await value.addInitScript(observe);return value;}

try{
  for(const entry of manifest.files){const bytes=fs.readFileSync(`${pkg}/${entry.path}`);check(`Package manifest ${entry.path}`,bytes.length===entry.bytes&&hash(bytes)===entry.sha256);}
  check('Package declares 49 unique N2C URLs',manifest.newUrls===49&&seo.length===49&&n2cURLs.length===49&&new Set(n2cURLs).size===49);
  check('Package contains 12/12/12/12 seventh subtypes',same(Object.fromEntries(['dominant7','major7','minor7','halfDiminished7'].map(subtype=>[subtype,details.filter(item=>item.subtype===subtype).length])),{dominant7:12,major7:12,minor7:12,halfDiminished7:12}));
  const formulaBySubtype={dominant7:['1','3','5','♭7'],major7:['1','3','5','7'],minor7:['1','♭3','5','♭7'],halfDiminished7:['1','♭3','♭5','♭7']};
  const nojs=await page({javaScriptEnabled:false,viewport:{width:1280,height:900}});
  for(const raw of details){
    const response=await nojs.goto(base+raw.url),html=await response.text(),main=clean(await nojs.locator('main').innerText()),seoRow=seo.find(item=>item.url===raw.url),slug=raw.url.split('/').at(-1);
    check(`${raw.url} static HTTP/metadata`,response.status()===200&&html.includes('<h1')&&!html.includes('BAILOUT_TO_CLIENT_SIDE_RENDERING')&&await nojs.title()===seoRow.title&&await nojs.locator('meta[name=description]').getAttribute('content')===seoRow.description&&clean(await nojs.locator('h1').innerText())===seoRow.h1&&await nojs.locator('link[rel=canonical]').getAttribute('href')===`https://pianogrid.com${raw.url}`);
    check(`${raw.url} family/subtype/formula`,raw.family==='seventh'&&raw.expectedNoteCount===4&&same(raw.definition.formulaDegrees,formulaBySubtype[raw.subtype])&&raw.definition.toneSpellings.every(note=>main.includes(note))&&raw.definition.formulaDegrees.every(degree=>main.includes(degree)));
    check(`${raw.url} four structured positions`,raw.voicings.length===4&&await nojs.locator('.am-position-fieldset input').count()===4&&await nojs.locator('.am-inversion-table tbody tr').count()===4&&same(await nojs.locator('.am-inversion-table tbody tr').evaluateAll(rows=>rows.map(row=>row.getAttribute('data-position'))),['Root position','First inversion','Second inversion','Third inversion']));
    check(`${raw.url} slash bass and channels`,raw.voicings.every((voicing,index)=>voicing.position.inversionIndex===index&&voicing.bass===voicing.notesLowToHigh[0]&&voicing.midiLowToHigh.length===4&&same(voicing.midiLowToHigh,voicing.keyboardHighlights.map(item=>item.midi))&&same(voicing.midiLowToHigh,voicing.playbackEvents.map(item=>item.midi))&&same(voicing.notesLowToHigh,voicing.printPitches)&&(index===0?!voicing.symbol.includes('/'):voicing.symbol.endsWith('/'+voicing.bass.replace(/\d+$/,'')))));
    check(`${raw.url} no invented fingering`,raw.fingering.status==='not_provided'&&raw.voicings.every(voicing=>voicing.fingering.status==='not_provided'&&voicing.fingering.right===null&&voicing.fingering.left===null)&&await nojs.locator('.ch-finger-map,.ch-hand-switch').count()===0&&main.includes('Fingering is not provided'));
    check(`${raw.url} category breadcrumb`,await nojs.locator('nav[aria-label="breadcrumb"] a[href="/chords/seventh"]').count()===1);
    const sourcePDF=fs.readFileSync(`${pkg}/09_generated_assets/chord-${slug}.pdf`),publicPDF=fs.readFileSync(`public/reference/assets/chord-${slug}.pdf`),sourceSVG=fs.readFileSync(`${pkg}/09_generated_assets/chord-${slug}.svg`,'utf8'),publicSVG=fs.readFileSync(`public/reference/assets/chord-${slug}.svg`,'utf8');
    check(`${raw.url} two-page PDF and four-position SVG`,Buffer.compare(sourcePDF,publicPDF)===0&&(publicPDF.toString('latin1').match(/\/Type\s*\/Page(?!s)/g)||[]).length===2&&sourceSVG===publicSVG&&(sourceSVG.match(/Selected pitches:/g)||[]).length===4&&raw.definition.toneSpellings.every(note=>sourceSVG.includes(note))&&!/<script|javascript:|<foreignObject/i.test(sourceSVG));
    const planned=links.filter(edge=>edge.from===raw.url).map(edge=>edge.to),actual=await nojs.locator('main a[href^="/"]').evaluateAll(nodes=>nodes.map(node=>node.getAttribute('href').split('#')[0]));
    check(`${raw.url} planned internal links`,planned.every(href=>actual.includes(href)),planned);
  }
  await nojs.goto(base+'/chords/seventh?root=C&type=major7');const categoryHTML=await nojs.content();
  check('Seventh category static metadata',await nojs.title()===category.title&&await nojs.locator('meta[name=description]').getAttribute('content')===category.description&&clean(await nojs.locator('h1').innerText())===category.h1&&await nojs.locator('link[rel=canonical]').getAttribute('href')==='https://pianogrid.com/chords/seventh');
  check('Seventh category complete no-JS grid',await nojs.locator('.ch-category-card').count()===48&&await nojs.locator('.ch-category-card[hidden]').count()===0&&new Set(await nojs.locator('.ch-category-card>a').evaluateAll(nodes=>nodes.map(node=>node.getAttribute('href')))).size===48);
  check('Seventh category initial theory',categoryHTML.includes(category.intro)&&categoryHTML.includes('Four positions for four chord tones'));
  await nojs.close();

  const categoryPage=await page({viewport:{width:1440,height:950}});await categoryPage.goto(base+'/chords/seventh');await categoryPage.waitForFunction(()=>!document.querySelector('.ch-root-chips button').disabled);
  await categoryPage.getByRole('button',{name:'C',exact:true}).click();check('Seventh root filter shows four subtypes',await categoryPage.locator('.ch-category-card:visible').count()===4);
  await categoryPage.getByRole('button',{name:'Major 7',exact:true}).click();check('Seventh subtype filter shows one C major7',await categoryPage.locator('.ch-category-card:visible').count()===1&&await categoryPage.locator('.ch-category-card:visible').getAttribute('data-subtype')==='major7');
  for(const width of [1440,768,390,320]){await categoryPage.setViewportSize({width,height:900});check(`Seventh category no overflow ${width}`,await categoryPage.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));if(width===1440||width===390)await categoryPage.screenshot({path:`${out}/screenshots/seventh-${width}.png`,fullPage:true});}
  await categoryPage.close();

  const raw=details.find(item=>item.url==='/chords/c-7'),interactive=await page({viewport:{width:1440,height:950}});await interactive.goto(base+raw.url);await interactive.waitForFunction(()=>!document.querySelector('.am-position-fieldset input').disabled);
  for(const [index,voicing] of raw.voicings.entries()){
    await interactive.getByRole('radio',{name:voicing.label,exact:true}).check();
    check(`C7 ${voicing.label} UI channels`,same(await interactive.locator('#note-order [data-midi]').allTextContents(),voicing.notesLowToHigh)&&same(await interactive.locator('#keyboard-scroll .am-key.am-is-selected').evaluateAll(nodes=>nodes.map(node=>Number(node.getAttribute('data-midi')))),[...voicing.midiLowToHigh].sort((a,b)=>a-b))&&await interactive.locator('#current-bass').textContent()===voicing.bass&&await interactive.locator('#current-symbol').textContent()===voicing.symbol,index);
  }
  await interactive.getByRole('radio',{name:'Root position',exact:true}).check();await interactive.getByRole('button',{name:'Play chord',exact:true}).click();await interactive.waitForFunction(()=>document.querySelector('[data-audio-state]').dataset.audioState==='playing');let nodes=await interactive.evaluate(()=>window.__audio.nodes.slice(-4));check('C7 playback creates four oscillators',nodes.length===4&&nodes.every((node,index)=>Math.abs(node.frequency-440*2**((raw.voicings[0].midiLowToHigh[index]-69)/12))<.00001));
  await interactive.getByRole('radio',{name:'First inversion',exact:true}).check();await interactive.waitForTimeout(80);nodes=await interactive.evaluate(()=>window.__audio.nodes.slice(-4));check('Switching position cancels old playback',nodes.every(node=>node.stop!==null||node.disconnects>0));
  const key=pc=>interactive.locator(`.ch-practice-key[aria-label][aria-pressed]`).nth(pc);
  for(const pc of [10,7,4,0])await key(pc).click();await interactive.getByRole('button',{name:'Check answer',exact:true}).click();check('Practice accepts inversion-equivalent exact set',(await interactive.locator('.ch-practice-feedback').innerText()).startsWith('Correct:'));
  await interactive.getByRole('button',{name:'Try again',exact:true}).click();for(const pc of [0,4,7])await key(pc).click();await interactive.getByRole('button',{name:'Check answer',exact:true}).click();check('Practice reports missing note',(await interactive.locator('.ch-practice-feedback').innerText()).includes('Missing: B♭'));
  await key(10).click();await key(2).click();await interactive.getByRole('button',{name:'Check answer',exact:true}).click();check('Practice reports extra note',(await interactive.locator('.ch-practice-feedback').innerText()).includes('Extra: D'));
  await interactive.getByRole('button',{name:'Try again',exact:true}).click();check('Practice reset clears selection',await interactive.locator('.ch-practice-key[aria-pressed="true"]').count()===0&&(await interactive.locator('.ch-current-selection').innerText()).includes('none'));
  await interactive.getByRole('button',{name:'Show answer',exact:true}).click();check('Practice show answer reveals four notes',await interactive.locator('.ch-practice-key[aria-pressed="true"]').count()===4&&(await interactive.locator('.ch-practice-feedback').innerText()).includes('Answer shown'));
  await interactive.evaluate(()=>{window.print=()=>window.dispatchEvent(new Event('beforeprint'))});await interactive.locator('[data-print-current]').first().click();check('C7 print keeps four written pitches',(await interactive.locator('#print-content .am-print-notes').textContent())===raw.voicings[1].printPitches.join(' – '));
  for(const width of [1440,768,390,320]){await interactive.setViewportSize({width,height:900});await interactive.waitForTimeout(80);const overflow=await interactive.evaluate(()=>({innerWidth,scrollWidth:document.documentElement.scrollWidth,offenders:[...document.querySelectorAll('body *')].map(element=>{const box=element.getBoundingClientRect();return{tag:element.tagName,className:element.className?.toString().slice(0,80),left:Math.round(box.left),right:Math.round(box.right)}}).filter(item=>item.right>innerWidth+1||item.left< -1).slice(0,12)}));check(`Seventh detail no overflow ${width}`,overflow.scrollWidth<=overflow.innerWidth,overflow);check(`Four-position selector reflows ${width}`,await interactive.locator('.am-position-fieldset').getAttribute('data-position-count')==='4');if(width===1440||width===390)await interactive.screenshot({path:`${out}/screenshots/c-7-${width}.png`,fullPage:true});}
  await interactive.close();

  const audit=await page({viewport:{width:1440,height:900}});await audit.goto(base+'/chords');check('Hub remains 25 practical triads',await audit.locator('.ch-result').count()===25&&await audit.locator('main a[href="/chords/seventh"]').count()>0);
  const chordNav=audit.locator('.site-nav-group').filter({has:audit.locator('.site-nav-parent-link[href="/chords"]')});await chordNav.hover();check('Navigation retains Seventh and Add with completion families',same(await chordNav.locator('.site-nav-link-group').filter({hasText:'More Chords'}).locator('.site-nav-child-link').evaluateAll(nodes=>nodes.map(node=>node.getAttribute('href'))),['/chords/diminished','/chords/augmented','/chords/suspended','/chords/seventh','/chords/add','/chords/extended','/chords/altered']));
  const sitemap=await (await audit.request.get(base+'/sitemap.xml')).text(),sitemapPaths=[...sitemap.matchAll(/<loc>https:\/\/pianogrid\.com([^<]*)<\/loc>/g)].map(match=>match[1]||'/');check('Sitemap has 173 unique URLs including N2C',sitemapPaths.length===173&&new Set(sitemapPaths).size===173&&n2cURLs.every(url=>sitemapPaths.includes(url)),sitemapPaths.length);
  for(const url of ['/chords/extended','/chords/altered'])check(`${url} is published by the completion batch`,(await audit.request.get(base+url)).status()===200&&sitemapPaths.includes(url));
  check('Finder, by-key and progressions remain bounded',(await audit.request.get(base+'/chords/finder')).status()===200&&(await audit.request.get(base+'/chords/by-key')).status()===200&&(await audit.request.get(base+'/chord-progressions')).status()===200);
  check('No runtime or hydration errors',runtimeErrors.length===0,runtimeErrors);await audit.close();
}catch(error){check('N2C browser validation completed',false,error.stack)}finally{await browser.close();}

const report={executedAt:new Date().toISOString(),base,passed:results.filter(item=>item.passed).length,failed:results.filter(item=>!item.passed).length,counts:{category:1,details:48,newURLs:49,sitemap:173},manualChecks:['real mobile/tablet touch','screen reader','human listening','physical printing','PDF tag accessibility','independent piano-teacher review'],results};
fs.writeFileSync(`${out}/validation.json`,JSON.stringify(report,null,2)+'\n');
console.log(`Chords N2C: ${report.passed} passed, ${report.failed} failed.`);process.exitCode=report.failed?1:0;
