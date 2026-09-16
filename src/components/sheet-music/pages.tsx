import type { ReactNode } from 'react';
import { SiteFooter, SiteHeader } from '@/components/chords/site-chrome';
import { PageBreadcrumb } from '@/components/ui/breadcrumb';
import { ArrangementFocus } from '@/components/songs-sheet/arrangement-focus';
import { ExternalArrangementCard } from '@/components/songs-sheet/external-arrangement-card';
import { OriginalExercisePlayer } from '@/components/songs-sheet/original-exercise-player';
import { SheetEditionAccess } from './edition-access';
import { SongResourceCard } from '@/components/songs/resource-card';
import { canPublishAsset, capabilities, practiceUrl, publicDeploymentContext } from '@/lib/songs-sheet-contracts';
import { getLaunchExternalViews, getLegacySheetContent, getLockedOriginalViews, getPagePatch, getSongsSheetCatalog } from '@/lib/songs-sheet-content';
import { editorialHeading } from '@/lib/seo-editorial';
import { getLeadCopy, getPageSeo } from '@/lib/b07-content';
import type { ArrangementView, SheetMusicURL, SheetSection } from '@/lib/songs-sheet-types';
import '@/app/chords/a-minor/a-minor.css';
import '@/components/songs/songs.css';
import './sheet-music.css';
import './preserved.css';

const details: Record<string, string> = {
  'arr-ext-0a05b7954f5256': '/sheet-music/hot-cross-buns',
  'arr-ext-c3a78b0c5cb213': '/sheet-music/twinkle-twinkle-little-star',
  'arr-ext-a60b8d92c5a325': '/sheet-music/ode-to-joy',
};

function JsonLd({ value }: { value: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(value).replace(/</g, '\\u003c') }}/>
}

function SheetShell({ url, children }: { url: SheetMusicURL; children: ReactNode }) {
  const page = getPagePatch(url);
  const heading = editorialHeading(url, page.h1);
  const intro = getLeadCopy(url, page.intro);
  const crumbs = url === '/sheet-music' ? [{ label: 'Sheet Music' }] : [{ label: 'Sheet Music', href: '/sheet-music' }, { label: heading.replace(' Piano Sheet Music', '') || heading }];
  return <div className="am-page sg-page ss-page"><a className="am-skip" href="#main">Skip to content</a><SiteHeader search={null} current="Sheet Music"/><main id="main" className="pr-container" tabIndex={-1}>
    <header className="am-page-heading"><PageBreadcrumb items={crumbs}/><h1>{heading}</h1><p className="am-direct-answer">{intro}</p></header>
    {children}
    <JsonLd value={page.schema}/>
  </main><SiteFooter url={url}/></div>;
}

function SheetHubIntent({ url }: { url: SheetMusicURL }) {
  const seo = getPageSeo(url);
  if (!seo?.sections?.length) return null;
  const preserved = new Set((seo.sections ?? []).filter((section) => section.preserveSlot).map((section) => section.h2));
  const editorial = seo.sections.filter((section) => section.body || (section.h3 && section.h3.length));
  if (!editorial.length) return null;
  const practiceLink =
    url === '/sheet-music'
      ? { href: '/songs/easy', label: 'Choose a beginner practice goal', onH2: 'Beginner starting points' }
      : url === '/sheet-music/easy'
        ? { href: '/songs/easy', label: 'Choose what to practice first', onH2: 'Choose an easy edition' }
        : url === '/sheet-music/beginner'
          ? { href: '/songs/easy#first-10-minutes', label: 'Use a short practice plan', onH2: 'What to check before starting' }
          : null;
  return (
    <div className="am-reading ss-reading ss-b07-intent">
      {editorial.map((section) => (
        <section className="am-content-section ss-section" id={`b07-${section.h2.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} key={section.h2} aria-labelledby={`b07-${section.h2.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-h`}>
          <h2 id={`b07-${section.h2.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-h`}>{section.h2}</h2>
          <div className="am-content-body">
            {section.body ? <p>{section.body}</p> : null}
            {preserved.has(section.h2) ? <p className="ss-preserve-note">The existing collection, filters and edition cards for this page remain below.</p> : null}
            {section.h3?.length ? (
              <ul className="ss-intent-points">
                {section.h3.map((item) => <li key={item}><strong>{item}</strong></li>)}
              </ul>
            ) : null}
            {practiceLink && practiceLink.onH2 === section.h2 ? (
              <p><a className="am-button am-tertiary" href={practiceLink.href}>{practiceLink.label}</a></p>
            ) : null}
          </div>
        </section>
      ))}
    </div>
  );
}

function Directory() {
  return <nav className="ss-directory" aria-label="Sheet music collections"><a href="/sheet-music/easy"><span>By level</span><strong>Easy piano sheet music</strong><p>Compare publisher labels and known playing demands.</p></a><a href="/sheet-music/beginner"><span>Starting point</span><strong>Beginner sheet music</strong><p>Find identified first-lesson and early-elementary versions.</p></a><a href="/sheet-music/hot-cross-buns"><span>Exact edition</span><strong>Hot Cross Buns</strong><p>Hoffman Academy Lesson 1 materials.</p></a><a href="/sheet-music/twinkle-twinkle-little-star"><span>Exact edition</span><strong>Twinkle, Twinkle, Little Star</strong><p>Aron Bernstein Early Elementary edition.</p></a><a href="/sheet-music/ode-to-joy"><span>Exact edition</span><strong>Ode to Joy</strong><p>Joseph Hoffman D-major edition.</p></a></nav>;
}

function publicAssetURL(path: string) {
  if (!/^(?!\/)(?!.*(?:^|\/)\.\.(?:\/|$))[A-Za-z0-9_./-]+$/.test(path)) throw new Error('Unsafe public asset path');
  return `/${path}`;
}

function OriginalExerciseReleasePanel() {
  const catalog = getSongsSheetCatalog();
  const views = getLockedOriginalViews();
  const deployment = publicDeploymentContext();
  return <aside className="ss-gate-note" aria-label="Original exercise release status"><strong>Original exercises are evaluated separately.</strong><p>Each PianoGrid exercise has its own asset and action gates. It is never substituted for a named-song edition.</p><div className="ss-original-status-list">{views.map((view, index) => {
    const { arrangement, resource } = view;
    const caps = capabilities(catalog, resource.resource_id, deployment);
    const arrangementAssets = catalog.assets.filter((asset) => asset.arrangement_id === arrangement.arrangement_id);
    const score = arrangementAssets.find((asset) => asset.asset_id === arrangement.score_asset_id);
    const events = arrangementAssets.find((asset) => asset.asset_id === arrangement.music_events_asset_id);
    const printable = arrangementAssets.filter((asset) => asset.format.endsWith('.pdf') && (asset.format.startsWith('score-a4') || asset.format.startsWith('score-letter')) && canPublishAsset(catalog, asset.asset_id, 'print', deployment).allowed);
    const released = caps.previewLocal || caps.printLocal || caps.playLocal || caps.tempoAndSegments;
    const meter = arrangement.music.meter?.join('/') ?? 'not specified';
    return <article className="ss-original-status" data-arrangement-id={arrangement.arrangement_id} data-release-state={released ? 'partially-released' : 'locked'} key={arrangement.arrangement_id}><h3>{released ? arrangement.title : `Original exercise ${index + 1}`}</h3>{released ? <>
      <p className="ss-accessible-score"><strong>Accessible score summary:</strong> Key {arrangement.music.key ?? 'not specified'}; meter {meter}; {arrangement.music.hand_mode.replaceAll('_', ' ')}; notes {arrangement.music.note_inventory?.join(', ') ?? 'not specified'}.</p>
      {caps.previewLocal && score && <img className="ss-score-preview" src={publicAssetURL(score.path)} alt={`${arrangement.title} notation preview. ${arrangement.music.measure_count ?? 0} measures in ${meter}.`}/>} 
      {printable.length > 0 && <div className="ss-version-actions">{printable.map((asset) => <a className="am-button am-secondary" href={publicAssetURL(asset.path)} target="_blank" rel="noreferrer" key={asset.asset_id}>Print {asset.format.includes('a4') ? 'A4' : 'US Letter'} score</a>)}</div>}
      {caps.playLocal && caps.tempoAndSegments && events && <OriginalExercisePlayer sourceURL={publicAssetURL(events.path)} label={arrangement.title}/>} 
    </> : <p>Not public. Preview, print and sound remain locked for this exercise because no matching approved per-asset grant and human acceptance record exists.</p>}</article>;
  })}</div></aside>;
}

function LaunchCards({ url }: { url: SheetMusicURL }) {
  const all = getLaunchExternalViews();
  const views = url === '/sheet-music/hot-cross-buns' ? [all[0]] : url === '/sheet-music/twinkle-twinkle-little-star' ? [all[1]] : url === '/sheet-music/ode-to-joy' ? [all[2]] : all;
  return <><ArrangementFocus arrangementIDs={views.map((view) => view.arrangement.arrangement_id)}/><div className="ss-version-grid">{views.map((view) => <ExternalArrangementCard view={view} showLearning key={view.arrangement.arrangement_id}/>)}</div></>;
}

function PreservedSheetContent({ url }: { url: SheetMusicURL }) {
  const legacy = getLegacySheetContent(url);
  const launchURLs = new Set(getLaunchExternalViews().map((view) => view.resource.provider_url));
  const additional = legacy.resources.filter((resource) => !launchURLs.has(resource.resourceURL));
  return <section className="ss-preserved" aria-labelledby="ss-preserved-heading"><div className="sg-discovery-head"><div><p className="sg-overline">Preserved approved mapping</p><h2 id="ss-preserved-heading">Original sections and external resources</h2></div><p>{legacy.sections.length ? `The source ledger retains ${legacy.sections.join(', ')} as distinct page sections.` : 'The original exact-version task remains part of this page.'} No listed score or recording is rehosted.</p></div>
    {additional.length > 0 && <div className="sg-resource-list">{additional.map((resource) => <SongResourceCard resource={resource} compact key={resource.id}/>)}</div>}
    <div className="ss-legacy-blocks">{legacy.blocks.map((block) => <article key={block.id}><h3>{block.heading}</h3><p>{block.body}</p></article>)}</div>
  </section>;
}

function SectionBody({ section, url }: { section: SheetSection; url: SheetMusicURL }) {
  const ids = new Set(section.arrangement_ids ?? []);
  const cards = ids.size ? getLaunchExternalViews().filter((view) => ids.has(view.arrangement.arrangement_id)) : [];
  const localOnly = section.visibility_gate === 'LOCAL_EXERCISES_RELEASE_APPROVED';
  return <section className="am-content-section ss-section" id={section.id} aria-labelledby={`${section.id}-heading`}><h2 id={`${section.id}-heading`}>{section.heading}</h2><div className="am-content-body">
    {section.body && <p>{section.body}</p>}
    {section.link && <a className="am-button am-tertiary" href={section.link}>Open this collection</a>}
    {section.cta && <a className="am-button am-secondary" href={section.cta.href} target="_blank" rel="noreferrer">{section.cta.label}</a>}
    {section.id === 'learning' && cards.length === 0 && <a className="am-button am-tertiary" href={practiceUrl('/songs/easy', getLaunchExternalViews().find((view) => details[view.arrangement.arrangement_id] === url)!.arrangement).replace('https://pianogrid.com', '')}>Open the matching learning plan</a>}
    {cards.length > 0 && <div className="ss-section-cards">{cards.map((view: ArrangementView) => <ExternalArrangementCard view={view} compact key={view.arrangement.arrangement_id}/>)}</div>}
    {localOnly && <OriginalExerciseReleasePanel/>}
    {section.render_existing && <p className="ss-preserve-note">The original approved task and resource mapping remains preserved in the source ledger. Only destinations and capabilities verified for this release are linked here.</p>}
    {section.faqs?.map((faq) => <details className="ss-faq" key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
  </div></section>;
}

export function SheetMusicPage({ url }: { url: SheetMusicURL }) {
  const page = getPagePatch(url);
  const isRoot = url === '/sheet-music';
  const isCollection = url === '/sheet-music/easy' || url === '/sheet-music/beginner';
  const isHub = isRoot || isCollection;
  const sections = page.sections.filter((section) => !section.arrangement_ids?.some((id) => id.startsWith('arr-ext-')));
  return <SheetShell url={url}>
    {isRoot && <Directory/>}
    {url === '/sheet-music/twinkle-twinkle-little-star' && <SheetEditionAccess editionKey="twinkle" />}
    {url === '/sheet-music/hot-cross-buns' && <SheetEditionAccess editionKey="hot-cross-buns" />}
    {url === '/sheet-music/ode-to-joy' && <SheetEditionAccess editionKey="ode-to-joy" />}
    {isHub && <SheetHubIntent url={url}/>}
    {!isRoot && isCollection && <section className="ss-primary" aria-labelledby="ss-primary-heading"><div className="sg-discovery-head"><div><p className="sg-overline">Verified version comparison</p><h2 id="ss-primary-heading">Compare identified editions</h2></div><p>No third-party score or recording is hosted here. Musical details are shown only when supported for this exact edition.</p></div><LaunchCards url={url}/></section>}
    <PreservedSheetContent url={url}/>
    <div className="am-reading ss-reading">{sections.map((section) => <SectionBody section={section} url={url} key={section.id}/>)}</div>
  </SheetShell>;
}
