import type {ReactNode} from 'react';
import type {KeyboardPageModel} from '@/lib/keyboard-types';
import {getKeyboardPage,getLayouts,getChartData} from '@/lib/keyboard-content';
import {SiteHeader,SiteFooter} from '../chords/site-chrome';
import {PageBreadcrumb} from '@/components/ui/breadcrumb';
import {LookupExperience} from './lookup-experience';
import {LabeledExperience} from './labeled-experience';
import {ChartExperience} from './chart-experience';
import '@/app/chords/a-minor/a-minor.css';
import './keyboard-notes.css';
function KeyboardPage({model,children}:{model:KeyboardPageModel;children:ReactNode}){const detail=model.url!=='/keyboard-notes';return <div className="am-page kn-page"><a className="am-skip" href="#main">Skip to content</a><SiteHeader search={null} current="Keyboard Notes"/><main id="main" className="pr-container" tabIndex={-1}><header className="am-page-heading kn-screen"><PageBreadcrumb items={detail?[{label:'Keyboard Notes',href:'/keyboard-notes'},{label:model.url.endsWith('chart')?'Notes chart':'Labeled keys'}]:[{label:'Keyboard Notes'}]}/><h1>{model.title}</h1><p className="am-direct-answer">{model.description}</p></header>{children}<div className="am-reading kn-screen">{model.blocks.map(b=><section className="am-content-section" id={`kn-${model.provenance.template_id}-${b.id}`} data-block-id={b.id} key={b.id}><h2>{b.heading}</h2><div className="am-content-body"><p>{b.body}</p></div></section>)}{model.links.length>0&&<nav className="kn-actions" aria-label="Related keyboard references">{model.links.map(l=><a key={l.url} className="am-button am-tertiary" href={l.url}>{l.label}</a>)}</nav>}</div></main><SiteFooter url={model.url}/></div>;}
export function KeyboardLookupPage(){const {model}=getKeyboardPage('/keyboard-notes');return <KeyboardPage model={model}><LookupExperience layouts={getLayouts('/keyboard-notes')}/></KeyboardPage>;}
export function LabeledKeyboardPage(){const {model,data}=getKeyboardPage('/keyboard-notes/labeled');return <KeyboardPage model={model}><LabeledExperience layouts={getLayouts('/keyboard-notes/labeled')} sourceIDs={model.provenance.source_ids}/><ol className="kn-label-steps kn-screen">{data.how_to_label_steps.map((s:{step:number;action:string})=><li key={s.step}>{s.action}</li>)}</ol></KeyboardPage>;}
export function KeyboardChartPage(){const {model}=getKeyboardPage('/keyboard-notes/chart');return <KeyboardPage model={model}><ChartExperience {...getChartData()}/></KeyboardPage>;}

