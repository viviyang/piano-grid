import type {CenterModel} from '@/lib/chord-content';
import {ChordCenterExperience,CenterPrintActions} from './center-experience';
import {KeyboardViewport} from './keyboard-viewport';
import {ChordPageToc,ChordSectionTitle} from './page-toc';
import {PageBreadcrumb} from '@/components/ui/breadcrumb';
import '@/app/chords/a-minor/a-minor.css';
import './shared.css';
import './center.css';
export function ChordCenterPage({model}:{model:CenterModel}) {
 const {blocks,items,filters,microcopy,whitePitchClasses,pdf}=model,byId=Object.fromEntries(blocks.map(b=>[b.block_id,b.content]));
 const heading=<><header key="heading" className="am-page-heading" data-block-id="chords-intro"><PageBreadcrumb items={[{label:'Chords'}]}/><h1><ChordSectionTitle id="chords-intro" text={model.title}/></h1><p className="ch-intro">{byId['chords-intro'].paragraphs[0]}</p></header><ChordPageToc items={[
  {id:'chords-chart',label:'Find a chord'},
  {id:'chords-how-to-read',label:'Read the diagrams'},
  {id:'chords-major-minor',label:'Major and minor'},
  {id:'chords-print',label:'Print & PDF'},
  {id:'chords-questions',label:'Questions'},
  {id:'chords-next',label:'Details & practice'},
 ]}/></>;
 return <ChordCenterExperience data={{items,filters,microcopy,whitePitchClasses,pdf}} heading={heading} chartIntro={<div key="chart-introduction" className="ch-chart-notes"><div data-block-id="chords-intro">{byId['chords-intro'].paragraphs.slice(1).map(p=><p key={p}>{p}</p>)}</div>{byId['chords-chart'].paragraphs.map(p=><p key={p}>{p}</p>)}</div>} searchSections={blocks.filter(b=>b.block_id!=='chords-intro').map(b=>({id:b.block_id,heading:b.content.heading,text:JSON.stringify(b.content)}))}>
 {blocks.filter(b=>!['chords-intro','chords-chart'].includes(b.block_id)).map(({block_id:id,content:c})=><section className="am-content-section" key={id} id={id} data-block-id={id} tabIndex={-1} aria-labelledby={`${id}-heading`}><h2 id={`${id}-heading`}><ChordSectionTitle id={id} text={c.heading}/></h2><div className={`am-content-body${id==='chords-how-to-read'?' ch-learning-panel':''}`}>{c.paragraphs.map(p=><p key={p}>{p}</p>)}{c.steps.length>0&&<ol className="am-steps">{c.steps.map(s=><li key={s}><span>{s}</span></li>)}</ol>}
 {id==='chords-major-minor'&&<><div className="am-table-scroll" tabIndex={0} role="region" aria-label="Major and minor comparison"><table className="am-inversion-table"><thead><tr>{c.table!.columns.map(x=><th scope="col" key={x}>{x}</th>)}</tr></thead><tbody>{c.table!.rows.map(row=><tr key={row[0]}>{row.map((x,i)=><td key={i}>{x}</td>)}</tr>)}</tbody></table></div>{model.comparisons.map(pair=><div className="ch-comparison" key={pair.left.id}>{[pair.left,pair.right].map(item=><div key={item.id}><h3>{item.name}</h3><p>{item.voicing.notes_low_to_high.map(n=>n.display_pitch).join(' – ')}</p><KeyboardViewport voicing={item.voicing} whitePitchClasses={whitePitchClasses} ready rangeLabel="C3–C5"/></div>)}</div>)}</>}
 {id==='chords-questions'&&c.table!.rows.map(([q,a])=><details className="am-faq-item" key={q}><summary><span>{q}</span><span className="am-faq-icon" aria-hidden="true"/></summary><p>{a}</p></details>)}
 {id==='chords-print'&&<CenterPrintActions/>}{id==='chords-next'&&<><div className="ch-original-links">{c.links.map(l=><a className="am-button am-tertiary" key={l.url} href={l.url}>{l.label}</a>)}</div><div className="ch-practice-links" aria-label="Chord building practice links">{model.practiceLinks.map(link=><a key={link.url} href={link.url}><strong>{link.label}</strong><span>{link.description}</span></a>)}</div></>}
 </div></section>)}
 </ChordCenterExperience>;
}
