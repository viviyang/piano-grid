import fs from 'node:fs';
import crypto from 'node:crypto';

const master=JSON.parse(fs.readFileSync('docs/content/site-master/page-content.master.json','utf8'));
const batch=JSON.parse(fs.readFileSync('docs/content/site-master/C-Songs/batch-page-content.json','utf8'));
const before=JSON.parse(fs.readFileSync('checks/batches/04-songs/source-before.json','utf8').replace(/^\uFEFF/,''));
const out='checks/batches/04-songs';
const results=[];
const check=(name,passed,detail='')=>{results.push({name,passed:Boolean(passed),detail});if(!passed)console.error('FAIL',name,detail);};
const urls=['/songs','/songs/easy'];

for(const url of urls){
 const source=batch.pages.find(page=>page.url===url),page=master.pages[url];
 check(`${url} exists in master`,Boolean(page));
 check(`${url} exactly matches C-Songs batch page`,JSON.stringify(page)===JSON.stringify(source));
 check(`${url} template`,page.template_id===(url==='/songs'?'T15':'T16'),page.template_id);
 check(`${url} remains unpublished`,page.ready_for_publish===false&&page.deployment_status==='planning_only');
 check(`${url} canonical path`,page.metadata.canonical_path===url,page.metadata.canonical_path);
 check(`${url} unique block IDs`,new Set(page.blocks.map(block=>block.id)).size===page.blocks.length);
 for(const block of page.blocks){check(`${url} block ${block.id} body`,typeof block.body==='string'&&block.body.length>0);check(`${url} block ${block.id} sources`,Array.isArray(block.source_ids)&&block.source_ids.length>0);}
 for(const group of page.source_groups)check(`${url} source group ${group.id} required output`,Boolean(group.required_output),group.required_output);
}

function verifyResource(resource,scope){
 check(`${scope} ${resource.id} work title`,Boolean(resource.work_title));
 check(`${scope} ${resource.id} exact edition`,Boolean(resource.edition));
 check(`${scope} ${resource.id} publisher`,Boolean(resource.publisher));
 check(`${scope} ${resource.id} format`,Boolean(resource.format));
 check(`${scope} ${resource.id} level basis`,Boolean(resource.level_basis));
 check(`${scope} ${resource.id} access`,Boolean(resource.access));
 check(`${scope} ${resource.id} HTTPS external resource`,/^https:\/\//.test(resource.resource_url)&&!resource.resource_url.includes('localhost'),resource.resource_url);
 check(`${scope} ${resource.id} site use external only`,resource.rights?.site_use==='external reference only');
 check(`${scope} ${resource.id} no score redistribution`,resource.rights?.redistribute_score===false);
 check(`${scope} ${resource.id} no recording redistribution`,resource.rights?.redistribute_recording===false);
 check(`${scope} ${resource.id} source IDs`,Array.isArray(resource.source_ids)&&resource.source_ids.length>0);
}

const center=master.pages['/songs'].data;
check('Center has six checked resources',center.resources.length===6,center.resources.length);
check('Center resource IDs unique',new Set(center.resources.map(resource=>resource.id)).size===center.resources.length);
for(const resource of center.resources)verifyResource(resource,'center');
const centerIDs=new Set(center.resources.map(resource=>resource.id));
for(const section of center.sections){
 check(`Center section ${section.id} not empty`,section.resource_ids.length>0);
 for(const id of section.resource_ids)check(`Center section ${section.id} resource ${id}`,centerIDs.has(id));
}
check('Center search fields remain exact',JSON.stringify(center.filter_contract.search_fields)===JSON.stringify(['work_title','artist','edition']));
check('Unknown center values excluded from positive filters',center.filter_contract.unknown_values==='exclude from positive filters');
check('Only Easy topic link is authorized',center.topic_links.includes('/songs/easy')&&center.topic_links.filter(url=>url==='/songs/easy').length===1);

const easy=master.pages['/songs/easy'].data;
check('Easy has nine featured versions',easy.featured_resources.length===9,easy.featured_resources.length);
check('Easy has fifty catalog tracks',easy.additional_catalog_options.length===50,easy.additional_catalog_options.length);
check('Easy reports zero individually tested catalog tracks',easy.counts.individually_performance_tested===0);
const allEasy=[...easy.featured_resources,...easy.additional_catalog_options];
check('Easy resource IDs unique across both sets',new Set(allEasy.map(resource=>resource.id)).size===allEasy.length);
for(const resource of allEasy)verifyResource(resource,resource.id.startsWith('ce-hl50-')?'catalog':'featured');
const featuredIDs=new Set(easy.featured_resources.map(resource=>resource.id));
for(const [section,ids] of Object.entries(easy.sections)){
 check(`Easy section ${section} not empty`,ids.length>0);
 for(const id of ids)check(`Easy section ${section} resource ${id}`,featuredIDs.has(id));
}
check('C-major section has only C-major versions',easy.sections['c-major'].every(id=>easy.featured_resources.find(resource=>resource.id===id)?.key==='C major'));
check('Two Twinkle versions stay distinct',easy.featured_resources.filter(resource=>resource.work_title==='Twinkle, Twinkle, Little Star').length===2);
check('Twinkle versions have distinct IDs and level labels',new Set(easy.featured_resources.filter(resource=>resource.work_title==='Twinkle, Twinkle, Little Star').map(resource=>`${resource.id}:${resource.level}`)).size===2);
check('Conflicted Twinkle version has no free label',!easy.featured_resources.find(resource=>resource.id==='ce-twinkle-elementary').access.startsWith('external free'));
check('Catalog is one exact edition',new Set(easy.additional_catalog_options.map(resource=>`${resource.edition}|${resource.edition_id}|${resource.resource_url}`)).size===1);
check('Catalog policy rejects ranking claim',easy.number_query_policy.includes('never describe them as a graded top50 ranking'));

for(const file of before.files.filter(item=>item.path.startsWith('docs/content/site-master/')||item.path.startsWith('docs/product/')||item.path.startsWith('docs/design/reference/'))){
 const hash=crypto.createHash('sha256').update(fs.readFileSync(file.path)).digest('hex');
 check(`Read-only source unchanged: ${file.path}`,hash===file.sha256,hash);
}

const report={executed_at:new Date().toISOString(),runtime:process.version,passed:results.filter(item=>item.passed).length,failed:results.filter(item=>!item.passed).length,results};
fs.writeFileSync(`${out}/data-validation.json`,JSON.stringify(report,null,2)+'\n');
console.log(`Song data: ${report.passed} passed, ${report.failed} failed.`);
process.exitCode=report.failed?1:0;
