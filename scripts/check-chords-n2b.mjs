import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import {createRequire} from 'node:module';
const {chromium}=createRequire(import.meta.url)(process.env.PIANO_PLAYWRIGHT_PATH||'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base=process.env.PIANO_BASE_URL||'http://127.0.0.1:3104';
const out=process.env.PIANO_CHECK_OUT||path.join(os.tmpdir(),'pianogrid-chords-n2b');
fs.mkdirSync(`${out}/screenshots`,{recursive:true});
const pkg='docs/pianogrid-chords-n2b';
const manifest=JSON.parse(fs.readFileSync(`${pkg}/manifest.json`,'utf8'));
const seo=JSON.parse(fs.readFileSync(`${pkg}/04_seo/N2B.url-keyword-tdh.json`,'utf8'));
const categories=JSON.parse(fs.readFileSync(`${pkg}/02_categories/categories.master.json`,'utf8'));
const details=fs.readdirSync(`${pkg}/03_details`).filter(name=>name.endsWith('.page.json')).map(name=>JSON.parse(fs.readFileSync(`${pkg}/03_details/${name}`,'utf8')));
const n2bURLs=seo.map(item=>item.url),results=[],runtimeErrors=[];
const check=(name,passed,detail='')=>{results.push({name,passed:Boolean(passed),detail});if(!passed)console.error('FAIL',name,detail);};
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const clean=value=>value.replace(/\s+/g,' ').trim();
const hash=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
const browser=await chromium.launch({channel:'chrome',headless:true});
function observe(){const Native=window.AudioContext;window.__audio={contexts:0,nodes:[]};if(!Native)return;window.AudioContext=class extends Native{constructor(...args){super(...args);window.__audio.contexts++;}createOscillator(){const oscillator=super.createOscillator(),record={frequency:null,start:null,stop:null,disconnects:0};window.__audio.nodes.push(record);const set=oscillator.frequency.setValueAtTime.bind(oscillator.frequency),start=oscillator.start.bind(oscillator),stop=oscillator.stop.bind(oscillator),disconnect=oscillator.disconnect.bind(oscillator);oscillator.frequency.setValueAtTime=(value,time)=>{record.frequency=value;return set(value,time)};oscillator.start=time=>{record.start=time;start(time)};oscillator.stop=time=>{record.stop=time;stop(time)};oscillator.disconnect=(...args)=>{record.disconnects++;return disconnect(...args)};return oscillator;}};}
async function page(options={}){const value=await browser.newPage(options);value.on('pageerror',error=>runtimeErrors.push(error.message));value.on('console',message=>{if(message.type()==='error')runtimeErrors.push(message.text())});await value.addInitScript(observe);return value;}

try{
  for(const entry of manifest.files){const bytes=fs.readFileSync(`${pkg}/${entry.path}`);check(`Package manifest ${entry.path}`,bytes.length===entry.bytes&&hash(bytes)===entry.sha256);}
  check('Package and SEO declare 51 unique N2B URLs',manifest.newUrls===51&&n2bURLs.length===51&&new Set(n2bURLs).size===51);
  check('Package contains 12/12/12/12 details',same(Object.fromEntries(['diminished','augmented','sus2','sus4'].map(subtype=>[subtype,details.filter(item=>item.subtype===subtype).length])),{diminished:12,augmented:12,sus2:12,sus4:12}));
  for(const raw of details){
    const nojs=await page({javaScriptEnabled:false,viewport:{width:1280,height:900}}),response=await nojs.goto(base+raw.url),html=await response.text(),main=clean(await nojs.locator('main').innerText()),seoRow=seo.find(item=>item.url===raw.url),slug=raw.url.split('/').at(-1);
    check(`${raw.url} static HTTP/metadata`,response.status()===200&&html.includes('<h1')&&!html.includes('BAILOUT_TO_CLIENT_SIDE_RENDERING')&&await nojs.title()===seoRow.title&&await nojs.locator('meta[name=description]').getAttribute('content')===seoRow.description&&clean(await nojs.locator('h1').innerText())===seoRow.h1&&await nojs.locator('link[rel=canonical]').getAttribute('href')===`https://pianogrid.com${raw.url}`);
    check(`${raw.url} core written data`,raw.definition.toneSpellings.every(note=>main.includes(note))&&raw.definition.formulaDegrees.every(degree=>main.includes(degree))&&await nojs.locator('.am-inversion-table tbody tr').count()===3);
    check(`${raw.url} three structured positions`,await nojs.locator('.am-position-fieldset input').count()===3&&same(await nojs.locator('.am-inversion-table tbody tr').evaluateAll(rows=>rows.map(row=>row.getAttribute('data-position'))),['Root position','First inversion','Second inversion']));
    check(`${raw.url} no invented fingering`,await nojs.locator('.ch-finger-map,.ch-hand-switch').count()===0&&(await nojs.locator(`[data-block-id="${slug}-fingering-example"]`).innerText()).includes('No independent fingering dataset'));
    check(`${raw.url} category breadcrumb`,await nojs.locator(`nav[aria-label="breadcrumb"] a[href="${raw.categoryRoute}"]`).count()===1);
    const pdf=fs.readFileSync(`${pkg}/09_generated_assets/chord-${slug}.pdf`),svg=fs.readFileSync(`${pkg}/09_generated_assets/chord-${slug}.svg`,'utf8'),publicPDF=fs.readFileSync(`public/reference/assets/chord-${slug}.pdf`),publicSVG=fs.readFileSync(`public/reference/assets/chord-${slug}.svg`,'utf8');
    check(`${raw.url} PDF/SVG exported`,pdf.length>10000&&Buffer.compare(pdf,publicPDF)===0&&svg===publicSVG&&svg.includes('<title')&&svg.includes('<desc')&&raw.definition.toneSpellings.every(note=>svg.includes(note))&&!/<script|javascript:|<foreignObject/i.test(svg));
    const hrefs=[...new Set(await nojs.locator('main a[href^="/"]').evaluateAll(nodes=>nodes.map(node=>node.getAttribute('href').split('#')[0]).filter(href=>!href.startsWith('/reference/'))))];
    for(const href of hrefs)check(`${raw.url} link ${href}`,(await nojs.request.get(base+href)).status()===200);
    await nojs.close();
  }
  for(const raw of categories){
    const expected=raw.id==='suspended'?24:12,nojs=await page({javaScriptEnabled:false,viewport:{width:1280,height:900}}),response=await nojs.goto(base+raw.url+'?root=C&type=sus2'),html=await response.text();
    check(`${raw.url} static category`,response.status()===200&&html.includes('<h1')&&await nojs.title()===raw.title&&await nojs.locator('meta[name=description]').getAttribute('content')===raw.description&&clean(await nojs.locator('h1').innerText())===raw.h1&&await nojs.locator('link[rel=canonical]').getAttribute('href')===`https://pianogrid.com${raw.url}`);
    check(`${raw.url} complete no-JS grid`,await nojs.locator('.ch-category-card').count()===expected&&await nojs.locator('.ch-category-card[hidden]').count()===0&&new Set(await nojs.locator('.ch-category-card>a').evaluateAll(nodes=>nodes.map(node=>node.getAttribute('href')))).size===expected);
    check(`${raw.url} initial theory`,html.includes(raw.intro)&&html.includes('Root position and inversions'));
    await nojs.close();
  }
  const categoryPage=await page({viewport:{width:1440,height:950}});await categoryPage.goto(base+'/chords/suspended');await categoryPage.waitForFunction(()=>!document.querySelector('.ch-root-chips button').disabled);
  await categoryPage.getByRole('button',{name:'C',exact:true}).click();check('Suspended root filter',await categoryPage.locator('.ch-category-card:visible').count()===2);
  await categoryPage.getByRole('button',{name:'sus2',exact:true}).click();check('Suspended subtype filter',await categoryPage.locator('.ch-category-card:visible').count()===1&&await categoryPage.locator('.ch-category-card:visible').getAttribute('data-subtype')==='sus2');
  await categoryPage.setViewportSize({width:390,height:844});check('Suspended mobile filter has no page overflow',await categoryPage.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await categoryPage.screenshot({path:`${out}/screenshots/suspended-390.png`,fullPage:true});await categoryPage.close();

  for(const sample of ['c-diminished','b-augmented','c-sus2','c-sus4']){
    const raw=details.find(item=>item.url===`/chords/${sample}`),interactive=await page({viewport:{width:1440,height:950}});await interactive.goto(base+raw.url);await interactive.waitForFunction(()=>!document.querySelector('.am-position-fieldset input').disabled);
    check(`${sample} starts without audio`,await interactive.evaluate(()=>window.__audio.contexts===0));
    for(const [index,voicing] of raw.voicings.entries()){
      await interactive.getByRole('radio',{name:voicing.label,exact:true}).check();
      check(`${sample}/${voicing.id} note/MIDI/bass/symbol`,same(await interactive.locator('#note-order [data-midi]').allTextContents(),voicing.notesLowToHigh)&&same(await interactive.locator('#keyboard-scroll .am-key.am-is-selected').evaluateAll(nodes=>nodes.map(node=>Number(node.getAttribute('data-midi')))),[...voicing.midiLowToHigh].sort((a,b)=>a-b))&&await interactive.locator('#current-bass').textContent()===voicing.bass&&await interactive.locator('#current-symbol').textContent()===voicing.symbol,index);
    }
    await interactive.getByRole('radio',{name:'Root position',exact:true}).check();await interactive.getByRole('button',{name:'Play chord',exact:true}).click();await interactive.waitForFunction(()=>document.querySelector('[data-audio-state]').dataset.audioState==='playing');const nodes=await interactive.evaluate(()=>window.__audio.nodes.slice(-3));check(`${sample} audio follows root MIDI`,nodes.every((node,index)=>Math.abs(node.frequency-440*2**((raw.voicings[0].midiLowToHigh[index]-69)/12))<.00001));const stop=interactive.getByRole('button',{name:'Stop',exact:true});if(await stop.isEnabled())await stop.evaluate(button=>button.click());
    await interactive.evaluate(()=>{window.print=()=>window.dispatchEvent(new Event('beforeprint'))});await interactive.locator('[data-print-current]').first().click();check(`${sample} print keeps written spelling`,(await interactive.locator('#print-content .am-print-notes').textContent())===raw.voicings[0].printPitches.join(' – '));
    if(sample==='b-augmented')await interactive.screenshot({path:`${out}/screenshots/b-augmented-1440.png`,fullPage:true});await interactive.close();
  }

  const hub=await page({viewport:{width:1440,height:950}});await hub.goto(base+'/chords');check('Hub keeps 25 practical cards',await hub.locator('.ch-result').count()===25);check('Hub links all three N2B families',(await Promise.all(['/chords/diminished','/chords/augmented','/chords/suspended'].map(href=>hub.locator(`main a[href="${href}"]`).count()))).every(count=>count>0));
  const chordNav=hub.locator('.site-nav-group').filter({has:hub.locator('.site-nav-parent-link[href="/chords"]')});await chordNav.hover();check('Desktop navigation has four planned groups',same(await chordNav.locator('.site-nav-link-group h3').allTextContents(),['Browse','More Chords','Explore','Learn']));check('More Chords exact links',same(await chordNav.locator('.site-nav-link-group').filter({hasText:'More Chords'}).locator('.site-nav-child-link').evaluateAll(nodes=>nodes.map(node=>node.getAttribute('href'))),['/chords/diminished','/chords/augmented','/chords/suspended']));
  const mobile=hub.locator('.site-mobile-section').filter({has:hub.locator('.site-mobile-parent[href="/chords"]')});const mobileLinks=[await mobile.locator('.site-mobile-parent').getAttribute('href'),...await mobile.locator('.site-mobile-children a').evaluateAll(nodes=>nodes.map(node=>node.getAttribute('href')))];check('Mobile chord navigation order',same(mobileLinks,['/chords','/chords/major','/chords/minor','/chords/diminished','/chords/augmented','/chords/suspended','/chords/by-key','/chord-progressions','/chords/finder','/guide/piano-chords','/keyboard-notes/finger-numbers']));
  const sitemap=await (await hub.request.get(base+'/sitemap.xml')).text(),sitemapPaths=[...sitemap.matchAll(/<loc>https:\/\/pianogrid\.com([^<]*)<\/loc>/g)].map(match=>match[1]||'/');check('Sitemap has 97 unique public URLs',sitemapPaths.length===97&&new Set(sitemapPaths).size===97&&n2bURLs.every(url=>sitemapPaths.includes(url)),sitemapPaths.length);
  for(const url of ['/chords/seventh','/chords/add','/chords/extended','/chords/altered'])check(`${url} remains deferred`,(await hub.request.get(base+url)).status()===404&&!sitemapPaths.includes(url));
  check('Finder, by-key and progressions stay bounded',(await hub.request.get(base+'/chords/finder')).status()===200&&(await hub.request.get(base+'/chords/by-key')).status()===200&&(await hub.request.get(base+'/chord-progressions')).status()===200);
  check('No runtime or hydration errors',runtimeErrors.length===0,runtimeErrors);await hub.close();
}catch(error){check('N2B browser validation completed',false,error.stack)}finally{await browser.close();}

const report={executedAt:new Date().toISOString(),base,passed:results.filter(item=>item.passed).length,failed:results.filter(item=>!item.passed).length,counts:{categories:3,details:48,newURLs:51,sitemap:97},manualChecks:['real mobile/tablet touch','screen reader','human listening','physical printing','PDF tag accessibility','independent piano-teacher review'],results};
fs.writeFileSync(`${out}/validation.json`,JSON.stringify(report,null,2)+'\n');
console.log(`Chords N2B: ${report.passed} passed, ${report.failed} failed.`);process.exitCode=report.failed?1:0;
