import { SiteFooter, SiteHeader } from '@/components/chords/site-chrome';
import { getBlankSheetModel } from '@/lib/blank-sheet-content';
import { BlankSheetTool } from './blank-sheet-tool';
import '@/app/chords/a-minor/a-minor.css';
import './blank-sheet.css';

export function BlankSheetPage() {
  const model = getBlankSheetModel();
  return <div className="am-page bs-page"><a className="am-skip" href="#main">Skip to content</a><SiteHeader search={null} current="Tools"/><main id="main" className="pr-container" tabIndex={-1}>
    <header className="am-page-heading"><nav className="am-breadcrumb" aria-label="Breadcrumb"><a href="/tools">Tools</a><span className="am-slash" aria-hidden="true">/</span><span aria-current="page">Blank sheet music</span></nav><h1>{model.title}</h1><p className="am-direct-answer">{model.description}</p></header>
    <BlankSheetTool assets={model.assets} previewURL={model.previewURL} systemCount={model.notation.systemCount}/>
    <div className="am-reading bs-reading">{model.blocks.map((block) => <section className="am-content-section" id={`bs-${block.id}`} data-block-id={block.id} key={block.id} tabIndex={-1} aria-labelledby={`bs-${block.id}-title`}><h2 id={`bs-${block.id}-title`}>{block.heading}</h2><div className="am-content-body"><p>{block.body}</p>{block.id === 'get' && <dl className="bs-specs"><div><dt>Systems</dt><dd>{model.notation.systemCount} grand staffs</dd></div><div><dt>Staff lines</dt><dd>{model.notation.staffLines} per staff</dd></div><div><dt>Clefs</dt><dd>Treble and bass</dd></div><div><dt>Music</dt><dd>Blank</dd></div></dl>}</div></section>)}</div>
  </main><SiteFooter url={model.url}/></div>;
}
