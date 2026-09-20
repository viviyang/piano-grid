import type { ReactNode } from 'react';
import { SiteFooter, SiteHeader } from '@/components/chords/site-chrome';
import { getEasySongs, getSongCenter } from '@/lib/song-content';
import type { SongBlock, SongPageModel, SongResource } from '@/lib/song-types';
import { SongCenterExperience } from './center-experience';
import { EasySongChooser } from './easy-experience';
import { PageBreadcrumb } from '@/components/ui/breadcrumb';
import { getPagePatch } from '@/lib/songs-sheet-content';
import { BeginnerEditionCards, SongsBeginnerTeaser } from './edition-cards';
import { TwinklePracticePlan } from './practice-plan';
import { getB05Copy } from '@/lib/b05-content';
import { editorialHeading, editorialIntro } from '@/lib/seo-editorial';
import { allowedProviderUrl, getBeginnerEditionView } from '@/lib/b05-editions';
import '@/app/chords/a-minor/a-minor.css';
import '@/components/sheet-music/sheet-music.css';
import './songs.css';
import './song-plan.css';

function SongShell({ model, heading, intro, children }: { model: SongPageModel; heading: string; intro: string; children: ReactNode }) {
  const detail = model.url === '/songs/easy';
  const patch = getPagePatch(model.url);
  const description = editorialIntro(model.url, intro);
  const schema = { ...patch.schema, name: heading, description };
  return <div className="am-page sg-page"><a className="am-skip" href="#main">Skip to content</a><SiteHeader search={null} current="Songs"/><main id="main" className="pr-container" tabIndex={-1}>
    <header className="am-page-heading"><PageBreadcrumb items={detail ? [{ label: 'Songs', href: '/songs' }, { label: 'Easy Piano Songs' }] : [{ label: 'Songs' }]}/><h1>{heading}</h1><p className="am-direct-answer">{description}</p></header>
    {children}
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}/>
  </main><SiteFooter url={model.url}/></div>;
}

function ReadingSection({ block, children }: { block: SongBlock; children?: ReactNode }) {
  return <section className="am-content-section" id={`sg-${block.id}`} data-block-id={block.id} tabIndex={-1} aria-labelledby={`sg-${block.id}-heading`}><h2 id={`sg-${block.id}-heading`}>{block.heading}</h2><div className="am-content-body"><p>{block.body}</p>{children}</div></section>;
}

function userFacingCheck(resource: SongResource): SongResource {
  if (!resource.firstCheck?.includes('Do not copy the page')) return resource;
  return { ...resource, firstCheck: 'Read the melody and chord symbols in this edition, then use the linked Unit 6 accompaniment lesson. Treat the publisher’s score as the source of truth for chord tones.' };
}

function CatalogTable({ resources }: { resources: SongResource[] }) {
  const sample = resources[0];
  if (!sample) return null;
  return <section className="sg-catalog sg-songbook" aria-labelledby="sg-songbook-heading">
    <div className="sg-catalog-head"><div><p className="sg-overline">One published songbook</p><h2 id="sg-songbook-heading">More Songs in a Published Collection</h2></div></div>
    <p><strong>{sample.edition}</strong></p>
    <p>Publisher: {sample.publisher}. Collection level: {sample.level ?? 'Unknown'} ({sample.levelBasis}).</p>
    <p>{sample.acquisitionFormat}</p>
    <p>These titles share one Easy Piano collection label. They have not been individually ranked or performance tested.</p>
    <p><a className="am-button am-secondary" href={sample.resourceURL} target="_blank" rel="noreferrer">View this songbook at the publisher</a></p>
    <ul className="sg-songbook-list" aria-label="Song titles in this collection">{resources.map((resource) => <li key={resource.id} data-resource-id={resource.id}>{resource.workTitle}</li>)}</ul>
  </section>;
}

export function SongsCenterPage() {
  const data = getSongCenter();
  const copy = getB05Copy();
  return <SongShell model={data.model} heading={editorialHeading(data.model.url, copy.songs.h1)} intro={copy.songs.intro}><SongsBeginnerTeaser compact/><SongCenterExperience resources={data.resources} goals={data.goals}/><div className="am-reading sg-reading">{data.model.blocks.map((block) => <ReadingSection block={block} key={block.id}>{block.id === 'start' && data.easyURLAvailable && <a className="am-button am-tertiary sg-inline-link" href="/songs/easy">Browse easy piano versions</a>}</ReadingSection>)}</div></SongShell>;
}

export function EasySongsPage({ search = {} }: { search?: Record<string, string | string[] | undefined> }) {
  const data = getEasySongs();
  const copy = getB05Copy();
  const twinkle = getBeginnerEditionView('twinkle');
  const providerUrl = allowedProviderUrl(twinkle.resource.provider_url);
  const beginnerUrls = new Set(Object.values(copy.editionEvidence).map((item) => item.providerUrl));
  const moreFeatured = data.featuredResources.filter((resource) => !beginnerUrls.has(resource.resourceURL)).map(userFacingCheck);
  const keepIds = new Set(moreFeatured.map((resource) => resource.id));
  const sections = data.sections.map((section) => ({ ...section, resourceIDs: section.resourceIDs.filter((id) => keepIds.has(id)) })).filter((section) => section.resourceIDs.length);
  return <SongShell model={data.model} heading={editorialHeading(data.model.url, copy.easy.h1)} intro={copy.easy.intro}>
    <BeginnerEditionCards withPlanAnchor />
    <TwinklePracticePlan copy={copy.easy.plan} providerUrl={providerUrl} sheetHref="/sheet-music/twinkle-twinkle-little-star" search={search} />
    {moreFeatured.length > 0 && <EasySongChooser resources={moreFeatured} sections={sections}/>}
    <CatalogTable resources={data.catalogResources}/>
    <p className="sg-catalog-policy">These 50 titles belong to that one published collection. They are not 50 separate PianoGrid scores or a ranked top-50 list.</p>
    <section className="pg-song-plan" aria-labelledby="pg-understand-heading">
      <h2 id="pg-understand-heading">How to Choose Your First Piano Song</h2>
      <div className="pg-learn-grid">{copy.easy.learnSections.map((item) => <article key={item.h2}><h3>{item.h2}</h3><p>{item.body}</p></article>)}</div>
    </section>
    <div className="am-reading sg-reading">{data.model.blocks.map((block) => <ReadingSection block={block} key={block.id}/>)}</div>
  </SongShell>;
}
