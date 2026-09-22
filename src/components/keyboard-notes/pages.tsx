import type {ReactNode} from 'react';
import type {KeyboardPageModel} from '@/lib/keyboard-types';
import {getKeyboardPage,getLayouts,getChartData,getFrequencyData,getBlankData,getLabeledSources} from '@/lib/keyboard-content';
import {editorialIntro} from '@/lib/seo-editorial';
import {getLeadCopy} from '@/lib/b07-content';
import {SiteHeader,SiteFooter} from '../chords/site-chrome';
import {PageBreadcrumb} from '@/components/ui/breadcrumb';
import {LookupExperience} from './lookup-experience';
import {LabeledExperience} from './labeled-experience';
import {ChartExperience} from './chart-experience';
import {FrequencyExperience} from './frequency-experience';
import {BlankExperience} from './blank-experience';
import {HubIntro, HubReference} from './hub-reference';
import '@/app/chords/a-minor/a-minor.css';
import './keyboard-notes.css';
import './keyboard-notes-v2.css';
import './keyboard-notes-hub.css';

const DETAIL_CRUMB: Record<string, string> = {
  '/keyboard-notes/labeled': 'Labeled keys',
  '/keyboard-notes/chart': 'Notes chart',
  '/keyboard-notes/frequencies': 'Frequencies',
  '/keyboard-notes/blank': 'Blank keyboard',
};

function KeyboardPage({model, children, hub = false}: {model: KeyboardPageModel; children: ReactNode; hub?: boolean}) {
  const detail = model.url !== '/keyboard-notes';
  const lead = editorialIntro(model.url, getLeadCopy(model.url, model.description));
  return (
    <div className={hub ? 'am-page kn-page kn-hub' : 'am-page kn-page'}>
      <a className="am-skip" href="#main">Skip to content</a>
      <SiteHeader search={null} current="Keyboard Notes" />
      <main id="main" className="pr-container" tabIndex={-1}>
        <header className="am-page-heading kn-screen kn-hub-heading">
          <PageBreadcrumb items={detail ? [{label: 'Keyboard Notes', href: '/keyboard-notes'}, {label: DETAIL_CRUMB[model.url] ?? model.title}] : [{label: 'Keyboard Notes'}]} />
          <h1>{model.title}</h1>
          {hub ? <HubIntro /> : (
            <>
              <p className="am-direct-answer kn-default-description">{model.url === '/keyboard-notes/labeled' ? lead : model.description}</p>
              <p className="am-direct-answer kn-v2-description">Find a note, hear it, then try finding it on your own.</p>
            </>
          )}
        </header>
        {children}
        {!hub && (
          <div className="am-reading kn-screen">
            {model.blocks.map(block => (
              <section className="am-content-section" id={`kn-${model.provenance.template_id}-${block.id}`} aria-labelledby={`kn-${model.provenance.template_id}-${block.id}-heading`} data-block-id={block.id} key={block.id}>
                <h2 id={`kn-${model.provenance.template_id}-${block.id}-heading`}>{block.heading}</h2>
                <div className="am-content-body"><p>{block.body}</p></div>
              </section>
            ))}
            {model.links.length > 0 && (
              <nav className="kn-actions" aria-label="Related keyboard references">
                {model.links.map(link => <a key={link.url} className="am-button am-tertiary" href={link.url}>{link.label}</a>)}
              </nav>
            )}
          </div>
        )}
      </main>
      <SiteFooter url={model.url} />
    </div>
  );
}

export function KeyboardLookupPage() {
  const {model} = getKeyboardPage('/keyboard-notes');
  const layouts = getLayouts('/keyboard-notes');
  return (
    <KeyboardPage model={model} hub>
      <LookupExperience layouts={layouts} />
      <HubReference layout={layouts.find(item => item.layout_id === '88-key-A0-C8') ?? layouts[0]} links={model.links} />
    </KeyboardPage>
  );
}

export function LabeledKeyboardPage() {
  const {model, data} = getKeyboardPage('/keyboard-notes/labeled');
  return (
    <KeyboardPage model={model}>
      <LabeledExperience layouts={getLayouts('/keyboard-notes/labeled')} sources={getLabeledSources()} />
      <ol className="kn-label-steps kn-screen">{data.how_to_label_steps.map((step: {step: number; action: string}) => <li key={step.step}>{step.action}</li>)}</ol>
    </KeyboardPage>
  );
}

export function KeyboardChartPage() {
  const {model} = getKeyboardPage('/keyboard-notes/chart');
  return <KeyboardPage model={model}><ChartExperience {...getChartData()} /></KeyboardPage>;
}

export function KeyboardFrequencyPage() {
  const {model} = getKeyboardPage('/keyboard-notes/frequencies');
  return <KeyboardPage model={model}><FrequencyExperience {...getFrequencyData()} /></KeyboardPage>;
}

export function BlankKeyboardPage() {
  const {model} = getKeyboardPage('/keyboard-notes/blank');
  return <KeyboardPage model={model}><BlankExperience {...getBlankData()} /></KeyboardPage>;
}
