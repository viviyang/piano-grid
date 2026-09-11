import fs from 'node:fs';
import {createRequire} from 'node:module';
const {chromium}=createRequire(import.meta.url)('C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const out='docs/pianogrid-chords-v2/evidence/b1',results=[];
const check=(name,passed,actual)=>results.push({name,passed:!!passed,actual});
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const expected=JSON.parse(fs.readFileSync(`${out}/after/dom.json`));
 for(const slug of Object.keys(expected)){
  const p=await browser.newPage({javaScriptEnabled:false}),route=slug==='chords'?'/chords':`/chords/${slug}`;
  const r=await p.goto('http://127.0.0.1:3000'+route),raw=await p.locator('main').textContent();
  check(`${slug} production SSR content/metadata`,r.status()===200&&await p.title()===expected[slug].title&&expected[slug].content.every(t=>raw.includes(t)));
  await p.close();
 }
 for(const action of ['stop','selection']){
  const p=await browser.newPage();
  await p.addInitScript(()=>{
   const Native=window.AudioContext;window.__nodes=[];window.__held=true;
   window.AudioContext=class extends Native{
    get state(){return window.__held?'suspended':super.state;}
    resume(){return new Promise(resolve=>{window.__release=()=>{window.__held=false;super.resume().then(resolve);};});}
    createOscillator(){const o=super.createOscillator(),n={disconnected:false,stopped:false};window.__nodes.push(n);const d=o.disconnect.bind(o),s=o.stop.bind(o);o.disconnect=(...a)=>{n.disconnected=true;return d(...a);};o.stop=(t)=>{if(t===undefined)n.stopped=true;return s(t);};return o;}
   };
  });
  await p.goto('http://127.0.0.1:3000/chords/a-minor');await p.waitForFunction(()=>!document.querySelector('.am-play-btn').disabled);
  await p.getByRole('button',{name:'Play chord',exact:true}).click();await p.waitForFunction(()=>document.querySelector('#am-result').dataset.audioState==='loading');
  if(action==='stop')await p.getByRole('button',{name:'Stop',exact:true}).click();else await p.getByRole('radio',{name:'First inversion',exact:true}).check();
  await p.evaluate(()=>window.__release());await p.waitForTimeout(180);
  const actual=await p.evaluate(()=>({nodes:window.__nodes,state:document.querySelector('#am-result').dataset.audioState,sounding:document.querySelectorAll('#keyboard-scroll .am-is-sounding').length}));
  check(`Delayed ${action}: created nodes stopped/disconnected; no playing state`,actual.nodes.length===3&&actual.nodes.every(n=>n.disconnected&&n.stopped)&&actual.sounding===0&&!['loading','playing'].includes(actual.state),actual);
  await p.close();
 }
}finally{await browser.close();}
const report={passed:results.filter(r=>r.passed).length,failed:results.filter(r=>!r.passed).length,results};fs.writeFileSync(`${out}/production-validation.json`,JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));process.exitCode=report.failed?1:0;
