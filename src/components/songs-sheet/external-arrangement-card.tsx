import type { ArrangementView } from '@/lib/songs-sheet-types';
import { ArrangementShare } from './arrangement-share';

export function ExternalArrangementCard({ view, showLearning = true, compact = false, omitUnverified = false }: { view: ArrangementView; showLearning?: boolean; compact?: boolean; omitUnverified?: boolean }) {
  const { arrangement, resource, learning, accessLabel } = view;
  const publisherLevel = arrangement.difficulty.publisher_label;
  const key = arrangement.music.key;
  const meterValue = arrangement.music.meter ? `${arrangement.music.meter[0]}/${arrangement.music.meter[1]}` : null;
  const handsValue = arrangement.music.hands?.length ? arrangement.music.hands.join(' and ') : null;
  const fingeringValue = arrangement.music.fingering ? 'Edition-specific evidence available' : null;
  const omitted = omitUnverified && (!publisherLevel || !key || !meterValue || !handsValue || !fingeringValue);
  return <article className={`ss-version-card${compact ? ' ss-version-card-compact' : ''}`} id={arrangement.arrangement_id} tabIndex={-1} data-arrangement-id={arrangement.arrangement_id}>
    <div className="ss-version-title"><p className="sg-overline">External publisher edition</p><h3>{arrangement.title}</h3><p>{arrangement.edition}</p></div>
    <dl className="ss-version-facts">
      <div><dt>Provider</dt><dd>{resource.provider}</dd></div>
      <div><dt>Access</dt><dd>{accessLabel}</dd></div>
      {(!omitUnverified || publisherLevel) && <div><dt>Publisher level</dt><dd>{publisherLevel ?? 'Not verified'}</dd></div>}
      <div><dt>Difficulty basis</dt><dd>{arrangement.difficulty.basis}</dd></div>
      {(!omitUnverified || key) && <div><dt>Key</dt><dd>{key ?? 'Not verified'}</dd></div>}
      {(!omitUnverified || meterValue) && <div><dt>Meter</dt><dd>{meterValue ?? 'Not verified'}</dd></div>}
      {(!omitUnverified || handsValue) && <div><dt>Hands</dt><dd>{handsValue ?? 'Not verified'}</dd></div>}
      {(!omitUnverified || fingeringValue) && <div><dt>Fingering</dt><dd>{fingeringValue ?? 'Not verified'}</dd></div>}
    </dl>
    {omitted && <p className="ss-sample-note">Check the publisher’s sample for notation and hand details.</p>}
    {showLearning && <div className="ss-learning"><h4>Start with this version</h4><p><strong>Choose it when:</strong> {learning.why_it_fits}</p><p><strong>Before you start:</strong> {learning.before_you_start}</p><p><strong>Hands:</strong> {learning.first_hand}</p><ol>{learning.steps.map((step) => <li key={step}>{step}</li>)}</ol></div>}
    <div className="ss-version-actions"><a className="am-button am-secondary" href={resource.provider_url ?? '#'} target="_blank" rel="noreferrer">Open provider’s page</a>{arrangement.sheet_page && <a className="am-button am-tertiary" href={arrangement.sheet_page}>Check sheet-music access</a>}</div>
    <p className="ss-rights">External reference only. PianoGrid does not host this edition’s score or recording. Provider access and licence conditions apply.</p>
    <ArrangementShare arrangementID={arrangement.arrangement_id}/>
  </article>;
}
