import { getAMinorContent } from '@/lib/a-minor-content';
import { AMinorExperience as ChordDetailExperience, InversionRow, PrintActions } from '../a-minor/experience';
import { PageBreadcrumb } from '@/components/ui/breadcrumb';
import '@/app/chords/a-minor/a-minor.css';
import './shared.css';
export function ChordDetailPage({model}:{model:ReturnType<typeof getAMinorContent>}) {
  const {data,blocks,byId,answer,introduction,searchSections}=model;
  const prefix=data.namespace;
  const heading=<header key="heading" className="am-page-heading" data-block-id={`${prefix}-intro`}><PageBreadcrumb items={[{ label: 'Chords', href: '/chords' }, { label: data.chord.name_en }]}/><h1>{data.heading}</h1><p className="am-direct-answer">{answer}</p></header>;
  const intro=introduction.length>0&&<section key="introduction" className="am-intro-rest" data-block-id={`${prefix}-intro`} aria-labelledby="root-example-heading"><h2 className="am-eyebrow" id="root-example-heading">Root-position example</h2>{introduction.map(p=><p key={p}>{p}</p>)}</section>;
  return <ChordDetailExperience data={data} heading={heading} toolNotes={byId[data.toolId].content.paragraphs.map(p=><p key={p}>{p}</p>)} introduction={intro} searchSections={searchSections}>
    {blocks.filter(b=>![`${prefix}-intro`,data.toolId,`${prefix}-next`].includes(b.block_id)).map(({block_id:id,content:c})=><section className="am-content-section" id={id} data-block-id={id} key={id} tabIndex={-1} aria-labelledby={`${id}-heading`}><h2 id={`${id}-heading`}>{c.heading}</h2><div className="am-content-body">
      {c.paragraphs.map(p=><p key={p}>{p}</p>)}
      {c.steps.length>0&&<ol className="am-steps">{c.steps.map(s=><li key={s}><span>{s}</span></li>)}</ol>}
      {id===`${prefix}-inversions`&&c.table&&<div className="am-table-scroll" tabIndex={0} role="region" aria-label={`${data.chord.name_en} inversion comparison table`}><table className="am-inversion-table"><caption className="pr-sr-only">{data.chord.name_en}: root position, first inversion, and second inversion</caption><thead><tr>{c.table.columns.map(t=><th scope="col" key={t}>{t}</th>)}</tr></thead><tbody>{c.table.rows.map((row,i)=><InversionRow key={data.options[i].value} voicingId={data.options[i].value} position={data.options[i].label} cells={row}/>)}</tbody></table></div>}
      {id===`${prefix}-questions`&&c.table?.rows.map(([q,a])=><details className="am-faq-item" key={q}><summary><span>{q}</span><span className="am-faq-icon" aria-hidden="true"/></summary><p>{a}</p></details>)}
      {id===`${prefix}-print`&&<PrintActions section/>}
      {c.links.filter(l=>l.published).map(l=><a className="am-button am-tertiary" key={l.url} href={l.url}>{l.label}</a>)}
    </div></section>)}
    {/* am-next retained in source, not rendered: every destination is unpublished. */}
  </ChordDetailExperience>;
}
