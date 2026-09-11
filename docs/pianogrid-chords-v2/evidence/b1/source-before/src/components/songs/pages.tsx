import type { ReactNode } from 'react';
import { SiteFooter, SiteHeader } from '@/components/chords/site-chrome';
import { getEasySongs, getSongCenter } from '@/lib/song-content';
import type { SongBlock, SongPageModel, SongResource } from '@/lib/song-types';
import { SongCenterExperience } from './center-experience';
import { EasySongChooser } from './easy-experience';
import { PageBreadcrumb } from '@/components/ui/breadcrumb';
import '@/app/chords/a-minor/a-minor.css';
import './songs.css';

function SongShell({ model, children }: { model: SongPageModel; children: ReactNode }) {
  const detail = model.url === '/songs/easy';
  return <div className="am-page sg-page"><a className="am-skip" href="#main">Skip to content</a><SiteHeader search={null} current="Songs"/><main id="main" className="pr-container" tabIndex={-1}>
    <header className="am-page-heading"><PageBreadcrumb items={detail ? [{ label: 'Songs', href: '/songs' }, { label: 'Easy' }] : [{ label: 'Songs' }]}/><h1>{model.title}</h1><p className="am-direct-answer">{model.description}</p></header>
    {children}
  </main><SiteFooter url={model.url}/></div>;
}

function ReadingSection({ block, children }: { block: SongBlock; children?: ReactNode }) {
  return <section className="am-content-section" id={`sg-${block.id}`} data-block-id={block.id} tabIndex={-1} aria-labelledby={`sg-${block.id}-heading`}><h2 id={`sg-${block.id}-heading`}>{block.heading}</h2><div className="am-content-body"><p>{block.body}</p>{children}</div></section>;
}

function CatalogTable({ resources }: { resources: SongResource[] }) {
  return <div className="sg-catalog"><div className="sg-catalog-head"><div><p className="sg-overline">One exact published collection</p><h2>50 edition-backed options</h2></div><p>These titles share one Easy Piano collection label. They have not been individually ranked or performance tested.</p></div><div className="am-table-scroll" role="region" tabIndex={0} aria-label="First 50 Popular Songs collection titles"><table><caption className="pr-sr-only">Fifty titles in First 50 Popular Songs You Should Play on the Piano</caption><thead><tr><th scope="col">No.</th><th scope="col">Work</th><th scope="col">Edition</th><th scope="col">Difficulty</th><th scope="col">Arrangement</th><th scope="col">Acquisition format</th></tr></thead><tbody>{resources.map((resource, index) => <tr key={resource.id} data-resource-id={resource.id}><td>{String(index + 1).padStart(2, '0')}</td><td><a href={resource.resourceURL} target="_blank" rel="noreferrer">{resource.workTitle}</a></td><td>{resource.edition}</td><td>{resource.level ?? 'Unknown'}<span>{resource.levelBasis}</span></td><td>{resource.format}</td><td>{resource.publisher}<span>{resource.acquisitionFormat}</span></td></tr>)}</tbody></table></div></div>;
}

export function SongsCenterPage() {
  const data = getSongCenter();
  return <SongShell model={data.model}><SongCenterExperience resources={data.resources} goals={data.goals}/><div className="am-reading sg-reading">{data.model.blocks.map((block) => <ReadingSection block={block} key={block.id}>{block.id === 'start' && data.easyURLAvailable && <a className="am-button am-tertiary sg-inline-link" href="/songs/easy">Browse easy piano versions</a>}</ReadingSection>)}</div></SongShell>;
}

export function EasySongsPage() {
  const data = getEasySongs();
  return <SongShell model={data.model}><EasySongChooser resources={data.featuredResources} sections={data.sections}/><CatalogTable resources={data.catalogResources}/><p className="sg-catalog-policy">{data.numberQueryPolicy}</p><div className="am-reading sg-reading">{data.model.blocks.map((block) => <ReadingSection block={block} key={block.id}/>)}</div></SongShell>;
}
