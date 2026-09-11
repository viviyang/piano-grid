import fs from 'node:fs';
import crypto from 'node:crypto';

const master=JSON.parse(fs.readFileSync('docs/content/site-master/page-content.master.json','utf8'));
const batch=JSON.parse(fs.readFileSync('docs/content/site-master/E-Guide-Reading-Practice/batch-page-content.json','utf8'));
const before=JSON.parse(fs.readFileSync('checks/batches/05-guides/source-before.json','utf8').replace(/^\uFEFF/,''));
const out='checks/batches/05-guides';
const results=[];
const check=(name,passed,detail='')=>{results.push({name,passed:Boolean(passed),detail});if(!passed)console.error('FAIL',name,detail);};
const urls=['/guide','/guide/read-sheet-music'];

for(const url of urls){
 const source=batch.pages.find(page=>page.url===url),page=master.pages[url];
 check(`${url} exists in master`,Boolean(page));
 check(`${url} exactly matches E batch page`,JSON.stringify(page)===JSON.stringify(source));
 check(`${url} template`,page.template_id===(url==='/guide'?'T21':'T22'),page.template_id);
 check(`${url} metadata canonical`,page.metadata.canonical_path===url,page.metadata.canonical_path);
 check(`${url} remains unpublished`,page.ready_for_publish===false&&page.deployment_status==='planning_only');
 check(`${url} title and description`,Boolean(page.title&&page.description));
 check(`${url} core blocks`,page.blocks.every(block=>block.heading&&block.body&&block.source_ids.length));
 check(`${url} heading unique`,new Set(page.blocks.map(block=>block.heading)).size===page.blocks.length);
 for(const group of page.source_groups)check(`${url} source group ${group.id}`,Boolean(group.required_output),group.required_output);
}

const center=master.pages['/guide'].data;
check('Center has four ordered path steps',center.path.length===4&&center.path.every((step,index)=>step.step===index+1));
check('Center only exposes two currently authorized path URLs',center.path.filter(step=>['/keyboard-notes/chart','/guide/read-sheet-music'].includes(step.url)).length===2);
check('Center first bar is four quarter units',center.first_example.total_quarters===4);
check('Center first bar exact pitches',center.first_example.events.map(event=>event.pitch).join(' ')==='C4 D4 E4');
check('Center first bar exact onsets',center.first_example.events.map(event=>event.onset_quarters).join(' ')==='0 1 2');
check('Center first bar exact durations',center.first_example.events.map(event=>event.duration_quarters).join(' ')==='1 1 2');

const reading=master.pages['/guide/read-sheet-music'].data;
check('Reading has nine anchors',reading.anchor_map.length===9,reading.anchor_map.length);
for(const anchor of reading.anchor_map)check(`Anchor ${anchor.clef} ${anchor.pitch}`,Boolean(anchor.position));
check('FACE exact treble spaces',reading.treble_spaces.join(' ')==='F4 A4 C5 E5');
check('Bass spaces remain separate',reading.bass_spaces.join(' ')==='A2 C3 E3 G3');
check('Treble second ledger below is A3',reading.anchor_map.some(item=>item.clef==='treble'&&item.pitch==='A3'&&item.position==='second ledger line below'));
check('Bass second ledger below is C2',reading.anchor_map.some(item=>item.clef==='bass'&&item.pitch==='C2'&&item.position==='second ledger line below'));
check('Middle C appears in both clefs',reading.anchor_map.filter(item=>item.pitch==='C4').length===2);
check('Exercise identity',reading.exercise.id==='E-SR1'&&reading.exercise.title==='Steps around middle C');
check('Exercise four bars',reading.exercise.bars.length===4);
for(const bar of reading.exercise.bars){
 const total=bar.events.reduce((sum,event)=>sum+event.duration_quarters,0);
 check(`Exercise bar ${bar.number} duration`,total===bar.total_quarters&&total===4,total);
 check(`Exercise bar ${bar.number} ordered onsets`,bar.events.every((event,index)=>index===0||event.onset_quarters>bar.events[index-1].onset_quarters));
 check(`Exercise bar ${bar.number} no inferred fingering`,bar.events.every(event=>event.finger===null));
}
check('Exercise exact answer',reading.exercise.bars.map(bar=>bar.events.map(event=>event.pitch).join(' ')).join('|')==='C4 D4 E4|E4 D4 C4|D4 E4 F4 D4|C4');
check('Exercise scope retains no simultaneous hands',reading.exercise.goal.includes('no simultaneous hands'));
check('Exercise fingering remains unavailable',reading.exercise.fingering_status==='not supplied; do not infer');
check('Chart URL is authorized',reading.chart_url==='/keyboard-notes/chart');

for(const [url,data] of [['/guide',center],['/guide/read-sheet-music',reading]]){
 check(`${url} exactly one printable`,data.assets.length===1);
 const asset=data.assets[0];
 check(`${url} printable identity`,asset.path==='assets/piano-starter-and-reading.pdf'&&asset.format==='PDF'&&asset.pages===4);
 check(`${url} printable rights`,asset.rights.site_use==='original Piano Reference material; distributable');
}
const sourcePDF=fs.readFileSync('docs/content/site-master/assets/piano-starter-and-reading.pdf');
const publicPDF=fs.readFileSync('public/assets/guides/piano-starter-and-reading.pdf');
check('Public printable is byte-identical to authorized source',crypto.createHash('sha256').update(sourcePDF).digest('hex')===crypto.createHash('sha256').update(publicPDF).digest('hex'));

for(const file of before.files.filter(item=>item.path.startsWith('docs/content/site-master/')||item.path.startsWith('docs/product/')||item.path.startsWith('docs/design/reference/'))){
 if(file.path==='docs/content/site-master/page-content.master.json')continue; // Mutable integration ledger; page-level equality checks above guard the original guide pages.
 const hash=crypto.createHash('sha256').update(fs.readFileSync(file.path)).digest('hex');
 check(`Read-only source unchanged: ${file.path}`,hash===file.sha256,hash);
}

const report={executed_at:new Date().toISOString(),runtime:process.version,passed:results.filter(item=>item.passed).length,failed:results.filter(item=>!item.passed).length,results};
fs.writeFileSync(`${out}/data-validation.json`,JSON.stringify(report,null,2)+'\n');
console.log(`Guide data: ${report.passed} passed, ${report.failed} failed.`);
process.exitCode=report.failed?1:0;
