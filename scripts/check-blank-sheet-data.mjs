import fs from 'node:fs';
import crypto from 'node:crypto';

const master=JSON.parse(fs.readFileSync('docs/content/site-master/page-content.master.json','utf8'));
const batch=JSON.parse(fs.readFileSync('docs/content/site-master/D-Sheet-Music/batch-page-content.json','utf8'));
const before=JSON.parse(fs.readFileSync('checks/batches/06-blank-sheet/source-before.json','utf8').replace(/^\uFEFF/,''));
const out='checks/batches/06-blank-sheet';
const results=[];const check=(name,passed,detail='')=>{results.push({name,passed:Boolean(passed),detail});if(!passed)console.error('FAIL',name,detail);};
const url='/tools/blank-sheet-music',page=master.pages[url],source=batch.pages.find(item=>item.url===url);
check('Page exists in master',Boolean(page));
check('Page exactly matches D batch object',JSON.stringify(page)===JSON.stringify(source));
check('T19 template',page.template_id==='T19',page.template_id);
check('Canonical path',page.metadata.canonical_path===url,page.metadata.canonical_path);
check('Page remains unpublished',page.ready_for_publish===false&&page.deployment_status==='planning_only');
check('Core block order',page.blocks.map(block=>block.id).join(',')==='get,use');
for(const block of page.blocks){check(`Block ${block.id} heading and body`,Boolean(block.heading&&block.body));check(`Block ${block.id} sources`,block.source_ids.length>0);}
check('Only source group P079',page.source_groups.length===1&&page.source_groups[0].id==='P079');
check('P079 required delivery',page.source_groups[0].required_output.includes('钢琴大谱表预览')&&page.source_groups[0].required_output.includes('无须账号'));
check('No account required',page.data.account_required===false);
check('Blank notation contract',page.data.notation.staff_lines===5&&page.data.notation.system_count===6&&page.data.notation.music_content==='blank');
check('Clef contract',page.data.notation.clefs.join('|')==='treble G2|bass F4');
check('Exact preview identity',page.data.preview_asset==='assets/blank-piano-staff-preview.svg');
check('Exactly two PDFs',page.data.assets.length===2);

const outputs={
 'assets/blank-piano-staff-letter.pdf':'public/reference/assets/blank-piano-staff-letter.pdf',
 'assets/blank-piano-staff-a4.pdf':'public/reference/assets/blank-piano-staff-a4.pdf',
 'assets/blank-piano-staff-preview.svg':'public/reference/assets/blank-piano-staff-preview.svg',
};
for(const asset of page.data.assets){
 check(`${asset.path} PDF`,asset.format==='PDF'&&asset.pages===1);
 check(`${asset.path} six systems`,asset.grand_staff_systems===6);
 check(`${asset.path} no account access`,asset.access==='free local download');
 check(`${asset.path} distributable`,asset.rights.site_use==='original Piano Reference worksheet; distributable');
 const sourcePath=`docs/content/site-master/${asset.path}`,publicPath=outputs[asset.path];
 const sourceHash=crypto.createHash('sha256').update(fs.readFileSync(sourcePath)).digest('hex');
 const publicHash=crypto.createHash('sha256').update(fs.readFileSync(publicPath)).digest('hex');
 check(`${asset.path} exported byte-identical`,sourceHash===publicHash,publicHash);
}
const svg=fs.readFileSync('docs/content/site-master/assets/blank-piano-staff-preview.svg','utf8');
check('SVG has accessible image label',svg.includes('role="img"')&&svg.includes('aria-label="Six blank piano grand staffs with treble and bass clefs"'));
check('SVG has sixty staff lines',(svg.match(/<path d="M50 [0-9.]+H/g)||[]).length===60,(svg.match(/<path d="M50 [0-9.]+H/g)||[]).length);
check('SVG has six system braces',(svg.match(/M43 [0-9.]+ C31/g)||[]).length===6);
check('SVG has twelve clef glyph paths',(svg.match(/<path d="M(?:376|252) /g)||[]).length===12);
check('SVG has no executable or external content',!/<script|javascript:|onload=|onerror=|<foreignObject|(?:href|xlink:href)\s*=\s*["']https?:/i.test(svg));
check('SVG public copy is byte-identical',crypto.createHash('sha256').update(fs.readFileSync(outputs['assets/blank-piano-staff-preview.svg'])).digest('hex')===crypto.createHash('sha256').update(svg).digest('hex'));

for(const file of before.files.filter(item=>item.path.startsWith('docs/content/site-master/')||item.path.startsWith('docs/product/')||item.path.startsWith('docs/design/reference/'))){const hash=crypto.createHash('sha256').update(fs.readFileSync(file.path)).digest('hex');check(`Read-only source unchanged: ${file.path}`,hash===file.sha256,hash);}
const report={executed_at:new Date().toISOString(),runtime:process.version,passed:results.filter(item=>item.passed).length,failed:results.filter(item=>!item.passed).length,results};fs.writeFileSync(`${out}/data-validation.json`,JSON.stringify(report,null,2)+'\n');console.log(`Blank sheet data: ${report.passed} passed, ${report.failed} failed.`);process.exitCode=report.failed?1:0;
