import type { ArrangementView } from '@/lib/songs-sheet-types';
import { ArrangementShare } from './arrangement-share';

function meter(value: [number, number] | null) { return value ? `${value[0]}/${value[1]}` : 'Not verified'; }
function hands(value: string[] | null) { return value?.length ? value.join(' and ') : 'Not verified'; }

export function ExternalArrangementCard({ view, showLearning = true, compact = false }: { view: ArrangementView; showLearning?: boolean; compact?: boolean }) {
  const { arrangement, resource, learning, accessLabel } = view;
  return <article className={`ss-version-card${compact ? ' ss-version-card-compact' : ''}`} id={arrangement.arrangement_id} tabIndex={-1} data-arrangement-id={arrangement.arrangement_id}>
    <div className="ss-version-title"><p className="sg-overline">External publisher edition</p><h3>{arrangement.title}</h3><p>{arrangement.edition}</p></div>
    <dl className="ss-version-facts">
      <div><dt>Provider</dt><dd>{resource.provider}</dd></div>
      <div><dt>Access</dt><dd>{accessLabel}</dd></div>
      <div><dt>Publisher level</dt><dd>{arrangement.difficulty.publisher_label ?? 'Not verified'}</dd></div>
      <div><dt>Difficulty basis</dt><dd>{arrangement.difficulty.basis}</dd></div>
      <div><dt>Key</dt><dd>{arrangement.music.key ?? 'Not verified'}</dd></div>
      <div><dt>Meter</dt><dd>{meter(arrangement.music.meter)}</dd></div>
      <div><dt>Hands</dt><dd>{hands(arrangement.music.hands)}</dd></div>
      <div><dt>Fingering</dt><dd>{arrangement.music.fingering ? 'Edition-specific evidence available' : 'Not verified'}</dd></div>
    </dl>
    {showLearning && <div className="ss-learning"><h4>Start with this version</h4><p><strong>Choose it when:</strong> {learning.why_it_fits}</p><p><strong>Before you start:</strong> {learning.before_you_start}</p><p><strong>Hands:</strong> {learning.first_hand}</p><ol>{learning.steps.map((step) => <li key={step}>{step}</li>)}</ol></div>}
    <div className="ss-version-actions"><a className="am-button am-secondary" href={resource.provider_url ?? '#'} target="_blank" rel="noreferrer">Open provider’s page</a>{arrangement.sheet_page && <a className="am-button am-tertiary" href={arrangement.sheet_page}>Check sheet-music access</a>}</div>
    <p className="ss-rights">External reference only. PianoGrid does not host this edition’s score or recording. Provider access and licence conditions apply.</p>
    <ArrangementShare arrangementID={arrangement.arrangement_id}/>
  </article>;
}
