import type { ChordDetailModel } from '@/lib/a-minor-types';
import { AMinorExperience as ChordDetailExperience, InversionRow, PrintActions } from '../a-minor/experience';
import { ChordPageToc, ChordSectionTitle } from './page-toc';
import { PageBreadcrumb } from '@/components/ui/breadcrumb';
import { FingeringGuide } from './fingering-guide';
import { ChordBuilderPractice } from './chord-builder-practice';
import '@/app/chords/a-minor/a-minor.css';
import './shared.css';
import './chord-learning.css';
export function ChordDetailPage({model}:{model:ChordDetailModel}) {
  const {data,blocks,byId,answer,introduction,searchSections}=model;
  const prefix=data.namespace;
  const category=data.chord.quality==='major'?{label:'Major Chords',href:'/chords/major'}:{label:'Minor Chords',href:'/chords/minor'};
  const heading=<><header key="heading" className="am-page-heading" data-block-id={`${prefix}-intro`}><PageBreadcrumb items={[{ label: 'Chords', href: '/chords' }, category, { label: data.chord.name_en }]}/><h1><ChordSectionTitle id={`${prefix}-intro`} text={data.heading}/></h1><p className="am-direct-answer">{answer}</p></header><ChordPageToc items={model.tocItems}/></>;
  const intro=introduction.length>0&&<section key="introduction" className="am-intro-rest am-root-example-panel" id={`${prefix}-root-example`} tabIndex={-1} data-block-id={`${prefix}-intro`} aria-labelledby={`${prefix}-root-example-heading`}><h2 className="am-eyebrow" id={`${prefix}-root-example-heading`}><ChordSectionTitle id={`${prefix}-intro`} text="Root-position example"/></h2><div className="am-root-example-copy">{introduction.map(p=><p key={p}>{p}</p>)}</div></section>;
  const toolParagraphs=[...byId[`${prefix}-intro`].content.paragraphs,...byId[data.toolId].content.paragraphs];
  return <ChordDetailExperience data={data} heading={heading} toolNotes={toolParagraphs.map(p=><p key={p}>{p}</p>)} introduction={intro} searchSections={searchSections}>
    {blocks.filter(b=>![`${prefix}-intro`,data.toolId].includes(b.block_id)).map(block=>{const {block_id:id,content:c}=block;
      if(id===`${prefix}-fingering-example`)return model.fingeringExamples.length?<FingeringGuide key={id} block={block} examples={model.fingeringExamples} sources={model.sources} defaultVoicingId={data.defaultId}/>:<section className="am-content-section ch-fingering" id={id} data-block-id={id} data-fingering-visible="false" key={id} tabIndex={-1} aria-labelledby={`${id}-heading`}><div className="ch-section-heading"><div className="ch-section-kicker">Reference scope</div><h2 id={`${id}-heading`}>{c.heading}</h2></div><div className="am-content-body ch-learning-panel">{c.paragraphs.map(p=><p key={p}>{p}</p>)}{c.links.filter(l=>l.published).map(l=><a className="am-button am-tertiary" key={l.url} href={l.url}>{l.label}</a>)}<details className="ch-source-details"><summary>Sources and scope</summary><div>{model.sources.map(source=><article key={source.id}><h3><a href={source.url} rel="noreferrer">{source.title}</a></h3><p>{source.publisher}</p><p><strong>Supports:</strong> {source.supports}</p><p><strong>Scope limit:</strong> {source.limitation}</p><small>Checked {source.checkedOn} · {source.id}</small></article>)}</div></details></div></section>;
      if(id==='practice')return <ChordBuilderPractice key={id} data={data} practice={model.practice}/>;
      return <section className="am-content-section" id={id} data-block-id={id} key={id} tabIndex={-1} aria-labelledby={`${id}-heading`}><h2 id={`${id}-heading`}><ChordSectionTitle id={id} text={c.heading}/></h2><div className={`am-content-body${prefix==='am'&&['am-why-minor','am-practice'].includes(id)?' ch-learning-panel':''}`}>
      {c.paragraphs.map(p=><p key={p}>{p}</p>)}
      {c.steps.length>0&&<ol className="am-steps">{c.steps.map(s=><li key={s}><span>{s}</span></li>)}</ol>}
      {id===`${prefix}-inversions`&&c.table&&<div className="am-table-scroll" tabIndex={0} role="region" aria-label={`${data.chord.name_en} inversion comparison table`}><table className="am-inversion-table"><caption className="pr-sr-only">{data.chord.name_en}: root position, first inversion, and second inversion</caption><thead><tr>{c.table.columns.map(t=><th scope="col" key={t}>{t}</th>)}</tr></thead><tbody>{c.table.rows.map((row,i)=><InversionRow key={data.options[i].value} voicingId={data.options[i].value} position={data.options[i].label} cells={row}/>)}</tbody></table></div>}
      {id===`${prefix}-questions`&&c.table?.rows.map(([q,a])=><details className="am-faq-item" key={q}><summary><span>{q}</span><span className="am-faq-icon" aria-hidden="true"/></summary><p>{a}</p></details>)}
      {id===`${prefix}-print`&&<PrintActions section/>}
      {c.links.filter(l=>l.published).map(l=><a className="am-button am-tertiary" key={l.url} href={l.url}>{l.label}</a>)}
    </div></section>})}

  </ChordDetailExperience>;
}
