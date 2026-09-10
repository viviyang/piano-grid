import type { SongResource } from '@/lib/song-types';

function PersonLine({ resource }: { resource: SongResource }) {
  const primary = resource.creator ?? resource.artist;
  const secondary = resource.creator && resource.artist && resource.creator !== resource.artist ? resource.artist : null;
  if (!primary && !resource.arranger) return null;
  return <p className="sg-byline">{primary}{secondary ? ` · ${secondary}` : ''}{resource.arranger ? ` · Arranged by ${resource.arranger}` : ''}</p>;
}

export function SongResourceCard({ resource, compact = false }: { resource: SongResource; compact?: boolean }) {
  return <article className={`sg-resource${compact ? ' sg-resource-compact' : ''}`} data-resource-id={resource.id}>
    <div className="sg-resource-main">
      <p className="sg-kicker">{resource.level ? `${resource.level} · ` : ''}{resource.format}</p>
      <h3>{resource.workTitle}</h3>
      <PersonLine resource={resource}/>
      <p className="sg-edition"><strong>Edition</strong> {resource.edition}{resource.editionID ? ` · ${resource.editionID}` : ''}</p>
      {!compact && resource.whyChoose && <p className="sg-reason">{resource.whyChoose}</p>}
      {!compact && resource.firstCheck && <p className="sg-check"><strong>Check first</strong> {resource.firstCheck}</p>}
    </div>
    <div className="sg-resource-facts">
      <dl>
        <div><dt>Publisher</dt><dd>{resource.publisher}</dd></div>
        <div><dt>Level basis</dt><dd>{resource.levelBasis}</dd></div>
        {resource.key && <div><dt>Key</dt><dd>{resource.key}</dd></div>}
        {resource.technicalDemands && <div><dt>Technical demands</dt><dd>{resource.technicalDemands}</dd></div>}
        {!compact && resource.editionFeatures && <div><dt>Edition notes</dt><dd>{resource.editionFeatures}</dd></div>}
        <div><dt>Access</dt><dd>{resource.access}</dd></div>
      </dl>
      <a className="am-button am-secondary sg-resource-link" href={resource.resourceURL} target="_blank" rel="noreferrer">Open publisher resource</a>
      <p className="sg-rights">External reference only. Score and recording are not hosted here.</p>
    </div>
  </article>;
}
