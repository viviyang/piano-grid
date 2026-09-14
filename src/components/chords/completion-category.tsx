import { SiteFooter, SiteHeader } from './site-chrome';
import { PageBreadcrumb } from '@/components/ui/breadcrumb';
import { CompletionCategoryExperience } from './completion-category-experience';
import type { getCompletionCategory } from '@/lib/chord-completion-content';
import '@/app/chords/a-minor/a-minor.css';
import './shared.css';
import './completion.css';

export function CompletionCategoryPage({ model }: { model: ReturnType<typeof getCompletionCategory> }) {
  return <div className="am-page cc-page"><a className="am-skip" href="#main">Skip to content</a><SiteHeader search={null}/><main id="main" className="pr-container" tabIndex={-1}>
    <header className="am-page-heading"><PageBreadcrumb items={[{ label: 'Chords', href: '/chords' }, { label: model.h1 }]}/><h1>{model.h1}</h1><p className="am-direct-answer">{model.description}</p><p className="cc-scope">This page contains {model.items.length} reference objects across {model.subtypes.length} named types and twelve roots. It is a declared reference collection, not every possible chord name or voicing.</p></header>
    <nav className="sp-toc cc-toc" aria-label="On this page">{model.sections.map(section => <a key={section.id} href={`#${section.id}`}>{section.heading}</a>)}</nav>
    <CompletionCategoryExperience items={model.items} defaultObjectId={model.defaultObjectId} family={model.url.endsWith('extended') ? 'extended' : 'altered'} pdf={model.pdf} allRoots={model.sections.find(section=>section.id==='all-roots')!}/>
    <div className="am-reading cc-reading">{model.sections.filter(section => section.id !== 'all-roots').map(section => <section className="am-content-section" id={section.id} key={section.id} tabIndex={-1}><h2>{section.heading}</h2><div className="am-content-body">{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></section>)}</div>
    <nav className="sp-links cc-links" aria-label="Continue learning"><a className="am-button am-tertiary" href="/chords">Browse the supported chord collection</a><a className="am-button am-tertiary" href="/chords/finder">Find possible names from your notes</a><a className="am-button am-tertiary" href="/guide/piano-chords">Learn chord formulas and voicings</a></nav>
  </main><SiteFooter url={model.url}/></div>;
}
