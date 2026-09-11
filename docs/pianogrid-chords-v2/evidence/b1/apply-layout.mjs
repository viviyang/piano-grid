import fs from 'node:fs';
function edit(path,changes){let s=fs.readFileSync(path,'utf8');for(const [from,to] of changes){if(!s.includes(from))throw Error('Missing exact input: '+from);s=s.replace(from,to);}fs.writeFileSync(path,s);}
edit('src/components/chords/center-experience.tsx',[
 ['<h2 id="chart-title">Find a chord</h2>','<h2 id="chart-title">Find a chord</h2>{chartIntro}'],
 ['{chartIntro}<noscript>','<noscript>'],
]);
edit('src/components/chords/center.css',[['.ch-chart-notes{margin-top:2rem;','.ch-chart-notes{margin-top:1rem;']]);
edit('src/components/chords/detail-page.tsx',[
 ["import { PageBreadcrumb }", "import { ChordPageToc } from './page-toc';\nimport { PageBreadcrumb }"],
 ['const heading=<header', 'const heading=<><header'],
 ['{answer}</p></header>;', `{answer}</p></header>{prefix==='am'&&<ChordPageToc items={[
    {id:data.toolId,label:'Chord & positions'},
    {id:'am-root-example',label:'Root-position example'},
    {id:'am-find-notes',label:'Find the notes'},
    {id:'am-inversions',label:'Inversions'},
    {id:'am-why-minor',label:'Why minor?'},
    {id:'am-practice',label:'Practice'},
    {id:'am-print',label:'Print & PDF'},
    {id:'am-questions',label:'Questions'},
    {id:'am-next',label:'Next steps'},
  ]}/>}</>;`],
 ['className="am-intro-rest" data-block-id', 'className="am-intro-rest" id={prefix===\'am\'?\'am-root-example\':undefined} tabIndex={prefix===\'am\'?-1:undefined} data-block-id'],
 ['![`${prefix}-intro`,data.toolId,`${prefix}-next`].includes(b.block_id)', '![`${prefix}-intro`,data.toolId].includes(b.block_id)'],
 ['    {/* am-next retained in source, not rendered: every destination is unpublished. */}', ''],
]);
