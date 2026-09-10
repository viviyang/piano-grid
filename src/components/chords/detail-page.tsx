import { getAMinorContent } from '@/lib/a-minor-content';
import { AMinorExperience as ChordDetailExperience, PrintActions } from '../a-minor/experience';
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
      {id===`${prefix}-inversions`&&c.table&&<div className="am-table-scroll" tabIndex={0} role="region" aria-label={`${data.chord.name_en} inversion comparison table`}><table className="am-inversion-table"><caption className="pr-sr-only">{data.chord.name_en}: root position, first inversion, and second inversion</caption><thead><tr>{c.table.columns.map(t=><th scope="col" key={t}>{t}</th>)}</tr></thead><tbody>{c.table.rows.map((row,i)=><tr key={data.options[i].value} data-voicing-id={data.options[i].value} data-position={data.options[i].label}><td><span className="am-current-row-mark" aria-hidden="true"/>{row[0]}<span className="pr-sr-only am-row-selected-label">, current selection</span></td><td>{row[1]}</td><td className="am-pitch-cell">{row[2]}</td><td>{row[3]}</td></tr>)}</tbody></table></div>}
      {id===`${prefix}-questions`&&c.table?.rows.map(([q,a])=><details className="am-faq-item" key={q}><summary><span>{q}</span><span className="am-faq-icon" aria-hidden="true"/></summary><p>{a}</p></details>)}
      {id===`${prefix}-print`&&<PrintActions section/>}
      {c.links.filter(l=>l.published).map(l=><a className="am-button am-tertiary" key={l.url} href={l.url}>{l.label}</a>)}
    </div></section>)}
    {/* am-next retained in source, not rendered: every destination is unpublished. */}
  </ChordDetailExperience>;
}
