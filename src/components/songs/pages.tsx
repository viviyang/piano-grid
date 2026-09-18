import type { ReactNode } from 'react';
import { SiteFooter, SiteHeader } from '@/components/chords/site-chrome';
import { getEasySongs, getSongCenter } from '@/lib/song-content';
import type { SongBlock, SongPageModel, SongResource } from '@/lib/song-types';
import { SongCenterExperience } from './center-experience';
import { EasySongChooser } from './easy-experience';
import { PageBreadcrumb } from '@/components/ui/breadcrumb';
import { getLaunchExternalViews, getPagePatch } from '@/lib/songs-sheet-content';
import { ArrangementFocus } from '@/components/songs-sheet/arrangement-focus';
import { ExternalArrangementCard } from '@/components/songs-sheet/external-arrangement-card';
import { BeginnerEditionCards, SongsBeginnerTeaser } from './edition-cards';
import { TwinklePracticePlan } from './practice-plan';
import { getB05Copy } from '@/lib/b05-content';
import { editorialHeading } from '@/lib/seo-editorial';
import { allowedProviderUrl, getBeginnerEditionView } from '@/lib/b05-editions';
import '@/app/chords/a-minor/a-minor.css';
import '@/components/sheet-music/sheet-music.css';
import './songs.css';
import './song-plan.css';

function SongShell({ model, heading, intro, children }: { model: SongPageModel; heading: string; intro: string; children: ReactNode }) {
  const detail = model.url === '/songs/easy';
  const schema = getPagePatch(model.url).schema;
  return <div className="am-page sg-page"><a className="am-skip" href="#main">Skip to content</a><SiteHeader search={null} current="Songs"/><main id="main" className="pr-container" tabIndex={-1}>
    <header className="am-page-heading"><PageBreadcrumb items={detail ? [{ label: 'Songs', href: '/songs' }, { label: 'Easy Piano Songs' }] : [{ label: 'Songs' }]}/><h1>{heading}</h1><p className="am-direct-answer">{intro}</p></header>
    {children}
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}/>
  </main><SiteFooter url={model.url}/></div>;
}

function ReadingSection({ block, children }: { block: SongBlock; children?: ReactNode }) {
  return <section className="am-content-section" id={`sg-${block.id}`} data-block-id={block.id} tabIndex={-1} aria-labelledby={`sg-${block.id}-heading`}><h2 id={`sg-${block.id}-heading`}>{block.heading}</h2><div className="am-content-body"><p>{block.body}</p>{children}</div></section>;
}

function CatalogTable({ resources }: { resources: SongResource[] }) {
  return <div className="sg-catalog"><div className="sg-catalog-head"><div><p className="sg-overline">One exact published collection</p><h2>{resources.length} edition-backed options</h2></div><p>These titles share one Easy Piano collection label. They have not been individually ranked or performance tested.</p></div><div className="am-table-scroll" role="region" tabIndex={0} aria-label="First 50 Popular Songs collection titles"><table><caption className="pr-sr-only">{resources.length} titles in First 50 Popular Songs You Should Play on the Piano</caption><thead><tr><th scope="col">No.</th><th scope="col">Work</th><th scope="col">Edition</th><th scope="col">Difficulty</th><th scope="col">Arrangement</th><th scope="col">Acquisition format</th></tr></thead><tbody>{resources.map((resource, index) => <tr key={resource.id} data-resource-id={resource.id}><td>{String(index + 1).padStart(2, '0')}</td><td><a href={resource.resourceURL} target="_blank" rel="noreferrer">{resource.workTitle}</a></td><td>{resource.edition}</td><td>{resource.level ?? 'Unknown'}<span>{resource.levelBasis}</span></td><td>{resource.format}</td><td>{resource.publisher}<span>{resource.acquisitionFormat}</span></td></tr>)}</tbody></table></div></div>;
}

function LaunchVersions({ detail = false }: { detail?: boolean }) {
  const views = getLaunchExternalViews();
  return <section className="ss-launch" aria-labelledby="ss-launch-heading"><div className="sg-discovery-head"><div><p className="sg-overline">Exact external editions</p><h2 id="ss-launch-heading">Three identified starting versions</h2></div><p>These are provider editions, not PianoGrid score or audio downloads. Unknown musical fields stay unknown. Share links restore this exact version; they do not include personal practice check-ins.</p></div><ArrangementFocus arrangementIDs={views.map((view) => view.arrangement.arrangement_id)}/><div className="ss-version-grid">{views.map((view) => <ExternalArrangementCard view={view} showLearning={detail} key={view.arrangement.arrangement_id}/>)}</div></section>;
}

export function SongsCenterPage() {
  const data = getSongCenter();
  const copy = getB05Copy();
  return <SongShell model={data.model} heading={editorialHeading(data.model.url, copy.songs.h1)} intro={copy.songs.intro}><SongsBeginnerTeaser/><LaunchVersions/><SongCenterExperience resources={data.resources} goals={data.goals}/><div className="am-reading sg-reading">{data.model.blocks.map((block) => <ReadingSection block={block} key={block.id}>{block.id === 'start' && data.easyURLAvailable && <a className="am-button am-tertiary sg-inline-link" href="/songs/easy">Browse easy piano versions</a>}</ReadingSection>)}</div></SongShell>;
}

export function EasySongsPage({ search = {} }: { search?: Record<string, string | string[] | undefined> }) {
  const data = getEasySongs();
  const copy = getB05Copy();
  const twinkle = getBeginnerEditionView('twinkle');
  const providerUrl = allowedProviderUrl(twinkle.resource.provider_url);
  return <SongShell model={data.model} heading={editorialHeading(data.model.url, copy.easy.h1)} intro={copy.easy.intro}>
    <BeginnerEditionCards withPlanAnchor />
    <TwinklePracticePlan copy={copy.easy.plan} providerUrl={providerUrl} sheetHref="/sheet-music/twinkle-twinkle-little-star" search={search} />
    <section className="pg-song-plan" aria-labelledby="pg-more-easy-heading">
      <h2 id="pg-more-easy-heading">Browse more easy editions</h2>
      <p className="pg-muted">Compare more versions using the existing catalogue. Check the stated level and materials for each one.</p>
    </section>
    <LaunchVersions detail />
    <EasySongChooser resources={data.featuredResources} sections={data.sections}/>
    <CatalogTable resources={data.catalogResources}/>
    <p className="sg-catalog-policy">{data.numberQueryPolicy}</p>
    <section className="pg-song-plan" aria-labelledby="pg-understand-heading">
      <h2 id="pg-understand-heading">How to Choose Your First Piano Song</h2>
      <div className="pg-learn-grid">{copy.easy.learnSections.map((item) => <article key={item.h2}><h3>{item.h2}</h3><p>{item.body}</p></article>)}</div>
    </section>
    <div className="am-reading sg-reading">{data.model.blocks.map((block) => <ReadingSection block={block} key={block.id}/>)}</div>
  </SongShell>;
}
