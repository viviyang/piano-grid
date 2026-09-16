import type {ReactNode} from 'react';
import type {KeyboardPageModel} from '@/lib/keyboard-types';
import {getKeyboardPage,getLayouts,getChartData,getFrequencyData,getBlankData,getLabeledSources} from '@/lib/keyboard-content';
import {SiteHeader,SiteFooter} from '../chords/site-chrome';
import {PageBreadcrumb} from '@/components/ui/breadcrumb';
import {LookupExperience} from './lookup-experience';
import {LabeledExperience} from './labeled-experience';
import {ChartExperience} from './chart-experience';
import {FrequencyExperience} from './frequency-experience';
import {BlankExperience} from './blank-experience';
import '@/app/chords/a-minor/a-minor.css';
import './keyboard-notes.css';
import './keyboard-notes-v2.css';
function KeyboardPage({model,children}:{model:KeyboardPageModel;children:ReactNode}){const detail=model.url!=='/keyboard-notes',crumb:Record<string,string>={'/keyboard-notes/labeled':'Labeled keys','/keyboard-notes/chart':'Notes chart','/keyboard-notes/frequencies':'Frequencies','/keyboard-notes/blank':'Blank keyboard'};return <div className="am-page kn-page"><a className="am-skip" href="#main">Skip to content</a><SiteHeader search={null} current="Keyboard Notes"/><main id="main" className="pr-container" tabIndex={-1}><header className="am-page-heading kn-screen"><PageBreadcrumb items={detail?[{label:'Keyboard Notes',href:'/keyboard-notes'},{label:crumb[model.url]??model.title}]:[{label:'Keyboard Notes'}]}/><h1>{model.title}</h1><p className="am-direct-answer kn-default-description">{model.description}</p><p className="am-direct-answer kn-v2-description">Find a note, hear it, then try finding it on your own.</p></header>{children}<div className="am-reading kn-screen">{model.blocks.map(b=><section className="am-content-section" id={`kn-${model.provenance.template_id}-${b.id}`} data-block-id={b.id} key={b.id}><h2>{b.heading}</h2><div className="am-content-body"><p>{b.body}</p></div></section>)}{model.links.length>0&&<nav className="kn-actions" aria-label="Related keyboard references">{model.links.map(l=><a key={l.url} className="am-button am-tertiary" href={l.url}>{l.label}</a>)}</nav>}</div></main><SiteFooter url={model.url}/></div>;}
export function KeyboardLookupPage(){const {model}=getKeyboardPage('/keyboard-notes');return <KeyboardPage model={model}><LookupExperience layouts={getLayouts('/keyboard-notes')} blocks={model.blocks} links={model.links}/></KeyboardPage>;}
export function LabeledKeyboardPage(){const {model,data}=getKeyboardPage('/keyboard-notes/labeled');return <KeyboardPage model={model}><LabeledExperience layouts={getLayouts('/keyboard-notes/labeled')} sources={getLabeledSources()}/><ol className="kn-label-steps kn-screen">{data.how_to_label_steps.map((s:{step:number;action:string})=><li key={s.step}>{s.action}</li>)}</ol></KeyboardPage>;}
export function KeyboardChartPage(){const {model}=getKeyboardPage('/keyboard-notes/chart');return <KeyboardPage model={model}><ChartExperience {...getChartData()}/></KeyboardPage>;}
export function KeyboardFrequencyPage(){const {model}=getKeyboardPage('/keyboard-notes/frequencies');return <KeyboardPage model={model}><FrequencyExperience {...getFrequencyData()}/></KeyboardPage>;}
export function BlankKeyboardPage(){const {model}=getKeyboardPage('/keyboard-notes/blank');return <KeyboardPage model={model}><BlankExperience {...getBlankData()}/></KeyboardPage>;}
