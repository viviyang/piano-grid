import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const master=JSON.parse(readFileSync('docs/content/site-master/page-content.master.json','utf8'));
const batch=JSON.parse(readFileSync('docs/content/site-master/F-Homepage/batch-page-content.json','utf8'));
const sourceMap=JSON.parse(readFileSync('docs/content/content-source-map.json','utf8'));
const assets=JSON.parse(readFileSync('docs/content/asset-map.json','utf8')).assets;
const out='checks/batches/07-site-integration';mkdirSync(out,{recursive:true});
const results=[];const check=(name,passed,detail='')=>{results.push({name,passed:Boolean(passed),detail});if(!passed)console.error('FAIL',name,detail);};
const equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b),hash=path=>createHash('sha256').update(readFileSync(path)).digest('hex');
const batchPage=url=>batch.pages.find(page=>page.url===url);
for(const [url,template,blocks] of [['/','T01',3],['/tools','T02',2]]){
  const page=master.pages[url],copy=batchPage(url),map=sourceMap.pages.find(item=>item.url===url);
  check(`${url} master matches F batch`,equal(page,copy));
  check(`${url} template`,page.template_id===template,page.template_id);
  check(`${url} block count`,page.blocks.length===blocks,page.blocks.length);
  check(`${url} metadata`,page.metadata.title===page.title&&page.metadata.description===page.description&&page.metadata.canonical_path===url);
  check(`${url} stays unpublished`,page.ready_for_publish===false&&page.deployment_status==='planning_only');
  check(`${url} source map implementation`,map.implementation_status==='implementation_checked',map.implementation_status);
  check(`${url} source map review pending`,map.review_status==='independent_review_pending',map.review_status);
}
const home=master.pages['/'],tools=master.pages['/tools'];
check('Home task URLs exact',equal(home.data.primary_tasks.map(item=>item.url),['/keyboard-notes','/chords','/scales','/songs','/sheet-music','/guide']));
check('Home release policy exact',home.data.navigation_release_policy==='render a link only if its destination has passed the baseline release gate');
check('Home first action exact',equal(home.data.first_action.notes,['C','D','E'])&&home.data.first_action.instruction==='Locate C to the left of two black keys, then the next two white keys.');
check('Tools lookup URLs exact',equal(tools.data.lookup_links.map(item=>item.url),['/keyboard-notes/chart','/chords','/scales','/chords/finder']));
check('Tools printable URLs exact',equal(tools.data.printables.map(item=>item.url),['/tools/piano-cheat-sheet','/tools/blank-sheet-music','/keyboard-notes/blank','/guide','/chord-progressions']));
check('Tools P113 exact',equal(tools.source_groups.map(item=>item.id),['P113']));
check('Tools visibility policy exact',tools.data.visibility_policy==='show destination links only when that page is released; asset availability does not imply page release');
const releasedAssets=[['assets/blank-piano-staff-letter.pdf','public/reference/assets/blank-piano-staff-letter.pdf'],['assets/piano-starter-and-reading.pdf','public/assets/guides/piano-starter-and-reading.pdf']];
for(const [logical,publicPath] of releasedAssets){const record=assets.find(item=>item.logical_id===logical);check(`${logical} asset mapped`,record.output_path===publicPath&&record.url==='/'+publicPath.slice(7)&&record.status==='exported_hash_verified');check(`${logical} byte identical`,hash('docs/content/site-master/'+logical)===hash(publicPath));}
const protectedFiles=JSON.parse(readFileSync('checks/batches/07-site-integration/source-before.json','utf8')).files.filter(item=>item.path.startsWith('docs/content/site-master/')||item.path.startsWith('docs/product/')||item.path.startsWith('docs/design/reference/')||item.path.startsWith('docs/design/piano-final/'));
for(const file of protectedFiles)check(`Protected source unchanged: ${file.path}`,hash(file.path)===file.sha256);
const report={executed_at:new Date().toISOString(),passed:results.filter(item=>item.passed).length,failed:results.filter(item=>!item.passed).length,results};writeFileSync(`${out}/data-validation.json`,JSON.stringify(report,null,2)+'\n');console.log(`Integration data: ${report.passed} passed, ${report.failed} failed.`);process.exitCode=report.failed?1:0;
