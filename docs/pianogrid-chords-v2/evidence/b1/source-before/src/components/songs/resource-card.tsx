import type { SongResource } from '@/lib/song-types';

function PersonLine({ resource }: { resource: SongResource }) {
  const normalize = (value: string) => value.toLocaleLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
  let primary = resource.creator ?? resource.artist;
  let secondary = resource.creator && resource.artist && normalize(resource.creator) !== normalize(resource.artist) ? resource.artist : null;
  if (primary && secondary && normalize(secondary).includes(normalize(primary))) { primary = secondary; secondary = null; }
  if (!primary && !resource.arranger) return null;
  return <p className="sg-byline">{primary}{secondary ? ` · ${secondary}` : ''}{resource.arranger ? ` · Arranged by ${resource.arranger}` : ''}</p>;
}

export function SongResourceCard({ resource, compact = false, decisionFirst = false }: { resource: SongResource; compact?: boolean; decisionFirst?: boolean }) {
  if (decisionFirst) return <article className="sg-resource sg-resource-decision" data-resource-id={resource.id}>
    <div className="sg-resource-main">
      <h3>{resource.workTitle}</h3>
      <PersonLine resource={resource}/>
      <p className="sg-edition"><strong>Specific edition</strong> {resource.edition}{resource.editionID ? ` · ${resource.editionID}` : ''}</p>
      <div className="sg-choice-point"><h4>Choose this for</h4><p>{resource.whyChoose}</p></div>
      <div className="sg-choice-point"><h4>Main playing challenge</h4><p>{resource.technicalDemands ?? 'No exact-edition playing challenge has been independently verified.'}</p></div>
    </div>
    <div className="sg-resource-facts">
      <dl>
        <div><dt>Publisher</dt><dd>{resource.publisher}</dd></div>
        <div><dt>Difficulty (publisher label)</dt><dd>{resource.level ?? 'Unknown — no publisher level listed'}</dd></div>
        <div><dt>Arrangement</dt><dd>{resource.format}</dd></div>
        <div><dt>Acquisition format</dt><dd>{resource.acquisitionFormat}</dd></div>
      </dl>
      <a className="am-button am-secondary sg-resource-link" href={resource.resourceURL} target="_blank" rel="noreferrer">Open publisher resource</a>
      <details className="sg-version-details">
        <summary>Version and use details</summary>
        <dl>
          <div><dt>Difficulty basis</dt><dd>{resource.levelBasis}</dd></div>
          {resource.editionFeatures && <div><dt>Edition notes</dt><dd>{resource.editionFeatures}</dd></div>}
          {resource.firstCheck && <div><dt>Before choosing</dt><dd>{resource.firstCheck}</dd></div>}
        </dl>
        <p className="sg-rights">External reference only. Score and recording are not hosted here.</p>
      </details>
    </div>
  </article>;
  return <article className={`sg-resource${compact ? ' sg-resource-compact' : ''}`} data-resource-id={resource.id}>
    <div className="sg-resource-main">
      <p className="sg-kicker">Checked edition</p>
      <h3>{resource.workTitle}</h3>
      <PersonLine resource={resource}/>
      <p className="sg-edition"><strong>Edition</strong> {resource.edition}{resource.editionID ? ` · ${resource.editionID}` : ''}</p>
      {!compact && resource.whyChoose && <p className="sg-reason">{resource.whyChoose}</p>}
      {!compact && resource.firstCheck && <p className="sg-check"><strong>Check first</strong> {resource.firstCheck}</p>}
    </div>
    <div className="sg-resource-facts">
      <dl>
        <div><dt>Publisher</dt><dd>{resource.publisher}</dd></div>
        <div><dt>Difficulty (publisher label)</dt><dd>{resource.level ?? 'Unknown — no publisher level listed'}</dd></div>
        <div><dt>Difficulty basis</dt><dd>{resource.levelBasis}</dd></div>
        <div><dt>Arrangement</dt><dd>{resource.format}</dd></div>
        {resource.key && <div><dt>Key</dt><dd>{resource.key}</dd></div>}
        {resource.technicalDemands && <div><dt>Technical demands</dt><dd>{resource.technicalDemands}</dd></div>}
        {!compact && resource.editionFeatures && <div><dt>Edition notes</dt><dd>{resource.editionFeatures}</dd></div>}
        <div><dt>Acquisition format</dt><dd>{resource.acquisitionFormat}</dd></div>
      </dl>
      <a className="am-button am-secondary sg-resource-link" href={resource.resourceURL} target="_blank" rel="noreferrer">Open publisher resource</a>
      <p className="sg-rights">External reference only. Score and recording are not hosted here.</p>
    </div>
  </article>;
}
