'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { ShareDialog } from '@/components/keyboard-notes/share-control';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { emitSongPlanEvent } from '@/lib/b05-events';
import {
  CURRENT_PLAN_KEY,
  CURRENT_PLAN_REVISION,
  PLAN_STEP_IDS,
  emptySession,
  parsePlanSearch,
  planShareURL,
  readPlanSession,
  searchFromRecord,
  writePlanSession,
  type FocusChoice,
  type PlanQuery,
  type PlanSession,
  type PlanStepId,
} from '@/lib/b05-plan';
import type { B05Copy } from '@/lib/b05-content';

type Props = {
  copy: B05Copy['easy']['plan'];
  providerUrl: string | null;
  sheetHref: string;
  search: Record<string, string | string[] | undefined>;
};

function clampStep(value: number) {
  return Math.max(0, Math.min(PLAN_STEP_IDS.length - 1, value));
}

export function TwinklePracticePlan({ copy, providerUrl, sheetHref, search }: Props) {
  const query = parsePlanSearch(searchFromRecord(search));
  const [hydrated, setHydrated] = useState(false);
  const [session, setSession] = useState<PlanSession>(emptySession);
  const [sharedLanding, setSharedLanding] = useState(query.kind === 'shared');
  const [unavailable, setUnavailable] = useState(query.kind === 'unavailable');
  const [shareOpen, setShareOpen] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const shareTrigger = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const parsed: PlanQuery = parsePlanSearch(searchFromRecord(search));
    if (parsed.kind === 'unavailable') {
      setUnavailable(true);
      setSharedLanding(false);
    } else if (parsed.kind === 'shared') {
      setUnavailable(false);
      setSharedLanding(true);
      setSession(emptySession());
      emitSongPlanEvent('valid_shared_landing', { kind: 'plan', public_key: parsed.publicKey, revision: parsed.revision });
    } else {
      const stored = readPlanSession();
      if (stored) setSession(stored);
    }
    emitSongPlanEvent('song_plan_open', { plan_key: CURRENT_PLAN_KEY, revision: CURRENT_PLAN_REVISION, entry_type: parsed.kind });
    setHydrated(true);
  }, [search]);

  useEffect(() => {
    if (!hydrated || unavailable || sharedLanding) return;
    writePlanSession(session);
  }, [hydrated, session, sharedLanding, unavailable]);

  useEffect(() => {
    if (!hydrated || session.mode !== 'active') return;
    headingRef.current?.focus({ preventScroll: true });
  }, [hydrated, session.mode, session.stepIndex]);

  useEffect(() => {
    document.querySelector('.sg-page')?.classList.toggle('is-plan-active', hydrated && !unavailable && (session.mode === 'active' || session.mode === 'finished'));
  }, [hydrated, session.mode, unavailable]);

  function update(next: PlanSession) {
    setSharedLanding(false);
    setSession(next);
  }

  function start() {
    const next: PlanSession = { ...emptySession(), mode: 'active', stepIndex: 0, visited: ['edition'] };
    update(next);
    emitSongPlanEvent('song_plan_start', { plan_key: CURRENT_PLAN_KEY, revision: CURRENT_PLAN_REVISION });
    emitSongPlanEvent('song_plan_step_view', { plan_key: CURRENT_PLAN_KEY, step_id: 'edition' });
  }

  function goTo(index: number) {
    const stepIndex = clampStep(index);
    const stepId = PLAN_STEP_IDS[stepIndex];
    const visited = session.visited.includes(stepId) ? session.visited : [...session.visited, stepId];
    update({ ...session, mode: 'active', stepIndex, visited });
    emitSongPlanEvent('song_plan_step_view', { plan_key: CURRENT_PLAN_KEY, step_id: stepId });
  }

  function toggleCheck(stepId: PlanStepId, checked: boolean) {
    const selfChecked = checked ? Array.from(new Set([...session.selfChecked, stepId])) : session.selfChecked.filter((id) => id !== stepId);
    update({ ...session, selfChecked });
    emitSongPlanEvent('song_plan_self_check', { plan_key: CURRENT_PLAN_KEY, step_id: stepId, checked });
  }

  function finish() {
    update({ ...session, mode: 'finished' });
    emitSongPlanEvent('song_plan_finish', {
      plan_key: CURRENT_PLAN_KEY,
      visited_count: session.visited.length,
      self_checked_count: session.selfChecked.length,
    });
  }

  const active = hydrated && !unavailable && session.mode === 'active';
  const finished = hydrated && !unavailable && session.mode === 'finished';

  const step = copy.steps[session.stepIndex];
  const stepId = PLAN_STEP_IDS[session.stepIndex];
  const shareURL = planShareURL();

  return (
    <section className="pg-song-plan pg-plan-block" id="first-10-minutes" aria-labelledby={titleId}>
      {sharedLanding && !unavailable ? <div className="pg-shared-intro"><strong>{copy.shared.label}</strong><p>{copy.shared.body}</p></div> : null}
      <div className="pg-plan-head">
        <div>
          <h2 id={titleId}>{copy.title}</h2>
          <p>{copy.subtitle}<br /><span className="pg-small">{copy.editionCaption}</span></p>
        </div>
        <button ref={shareTrigger} className="am-button am-tertiary" type="button" onClick={() => { setShareOpen(true); emitSongPlanEvent('share_panel_open', { kind: 'plan', public_key: CURRENT_PLAN_KEY }); }}>{copy.shareLabel}</button>
      </div>

      {unavailable ? (
        <div className="pg-finished">
          <h3>{copy.expired.title}</h3>
          <p className="pg-muted">{copy.expired.body}</p>
          <button className="am-button am-primary" type="button" onClick={() => { setUnavailable(false); setSharedLanding(false); update(emptySession()); }}>{copy.expired.action}</button>
        </div>
      ) : null}

      {!unavailable && (!hydrated || session.mode === 'overview') ? (
        <div className="pg-plan-intro">
          <div>
            <h3>One version. One small goal.</h3>
            <p className="pg-muted">{copy.intro}</p>
            <div className="pg-actions">
              <button className="am-button am-primary" type="button" onClick={start} disabled={!hydrated}>{copy.primaryLabel}</button>
              {providerUrl ? <a className="am-button am-tertiary" href={providerUrl} target="_blank" rel="noopener noreferrer" onClick={() => emitSongPlanEvent('edition_open', { edition_public_key: CURRENT_PLAN_KEY, provider_id: 'hoffman-academy' })}>{copy.secondaryLabel} <span className="pg-sr">Opens Hoffman Academy in a new tab</span></a> : null}
            </div>
          </div>
          <aside className="pg-edition-aside">
            <p className="pg-caps">Before you begin</p>
            <p>Score and tutorial are on Hoffman Academy, not hosted here.</p>
            <p>Free access uses a form or sign-in.</p>
            <a href={sheetHref}>Check edition and access details</a>
          </aside>
        </div>
      ) : null}

      <Collapsible key={`steps-${!hydrated || session.mode === 'overview' ? 'open' : 'closed'}`} className="pg-all-steps" defaultOpen={!hydrated || session.mode === 'overview'}>
        <CollapsibleTrigger>Read all five steps</CollapsibleTrigger>
        <CollapsibleContent>
          <ol>
            {copy.steps.map((item) => (
              <li key={item.id}>
                <strong>{item.title}</strong> <span className="pg-small pg-muted">{item.timeLabel}</span>
                <p>{item.body}</p>
                {item.action === 'provider' && providerUrl ? <p><a href={providerUrl} target="_blank" rel="noopener noreferrer">{item.actionLabel}</a></p> : null}
              </li>
            ))}
          </ol>
        </CollapsibleContent>
      </Collapsible>

      {active && step ? (
        <div className="pg-plan-body">
          <aside className="pg-stepnav-wrap">
            <div className="pg-stepnav">
              {copy.steps.map((item, index) => (
                <button type="button" key={item.id} aria-current={index === session.stepIndex ? 'step' : undefined} onClick={() => goTo(index)}>
                  <span className="pg-num">{session.selfChecked.includes(item.id as PlanStepId) ? '✓' : String(index + 1).padStart(2, '0')}</span>
                  <span className="pg-name">{item.title}</span>
                  <span className="pg-when">{item.timeLabel}</span>
                </button>
              ))}
            </div>
          </aside>
          <div className="pg-step-panel">
            <Collapsible className="pg-mobile-steps pr-collapsible-plain" defaultOpen={false}>
              <CollapsibleTrigger>All five steps</CollapsibleTrigger>
              <CollapsibleContent>
                <div className="pg-stepnav">
                  {copy.steps.map((item, index) => (
                    <button type="button" key={`m-${item.id}`} aria-current={index === session.stepIndex ? 'step' : undefined} onClick={() => goTo(index)}>
                      <span className="pg-num">{String(index + 1).padStart(2, '0')}</span>
                      <span className="pg-name">{item.title}</span>
                    </button>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
            <div className="pg-stephead"><span>{copy.progressLabel.replace('{current}', String(session.stepIndex + 1))}</span><span>{step.timeLabel} · suggested</span></div>
            <div className="pg-progress" role="progressbar" aria-label="Current step" aria-valuenow={session.stepIndex + 1} aria-valuemin={1} aria-valuemax={5}><span style={{ width: `${(session.stepIndex + 1) * 20}%` }} /></div>
            <h3 id="pg-active-title" ref={headingRef} tabIndex={-1}>{step.title}</h3>
            <p className="pg-step-body">{step.body}</p>
            {step.action === 'provider' && providerUrl ? (
              <div className="pg-actions">
                <a className="am-button am-secondary" href={providerUrl} target="_blank" rel="noopener noreferrer" onClick={() => emitSongPlanEvent('edition_open', { edition_public_key: CURRENT_PLAN_KEY, provider_id: 'hoffman-academy' })}>{step.actionLabel} <span className="pg-sr">Opens Hoffman Academy in a new tab</span></a>
              </div>
            ) : null}
            {stepId === 'reflect' ? (
              <fieldset className="pg-focus">
                <legend>Next time, I want to focus on</legend>
                {copy.selfReportOptions.map((option) => (
                  <label key={option.value}>
                    <input type="radio" name="focus-choice" value={option.value} checked={session.focusChoice === option.value} onChange={() => update({ ...session, focusChoice: option.value as FocusChoice })} />
                    {option.label}
                  </label>
                ))}
              </fieldset>
            ) : null}
            <label className="pg-selfcheck">
              <input type="checkbox" checked={session.selfChecked.includes(stepId)} onChange={(event) => toggleCheck(stepId, event.target.checked)} />
              <span>{step.checkLabel}<br /><span className="pg-muted pg-small">Optional check-in. It does not grade your playing.</span></span>
            </label>
            <Collapsible key={stepId} className="pg-help" defaultOpen={false}>
              <CollapsibleTrigger>{step.helpTitle}</CollapsibleTrigger>
              <CollapsibleContent>
                <p>{step.helpBody}</p>
                {step.optionalLinks.length ? (
                  <div className="pg-option-links">
                    {step.optionalLinks.map((link) => <a href={link.href} key={link.href}>{link.label}</a>)}
                  </div>
                ) : null}
              </CollapsibleContent>
            </Collapsible>
            <div className="pg-nextrow">
              {session.stepIndex === 0 ? (
                confirmReset ? (
                  <span className="pg-reset-confirm">
                    Keep this session?
                    <button className="am-button am-tertiary" type="button" onClick={() => setConfirmReset(false)}>Keep this session</button>
                    <button className="am-button am-secondary" type="button" onClick={() => { setConfirmReset(false); update(emptySession()); }}>Reset</button>
                  </span>
                ) : (
                  <button className="am-button am-tertiary" type="button" onClick={() => session.selfChecked.length ? setConfirmReset(true) : update(emptySession())}>{copy.exit}</button>
                )
              ) : (
                <button className="am-button am-tertiary" type="button" onClick={() => goTo(session.stepIndex - 1)}>{copy.previous}</button>
              )}
              {session.stepIndex === PLAN_STEP_IDS.length - 1 ? (
                <button className="am-button am-primary" type="button" onClick={finish}>{copy.done}</button>
              ) : (
                <button className="am-button am-primary" type="button" onClick={() => goTo(session.stepIndex + 1)}>{copy.next}</button>
              )}
            </div>
          </div>
        </div>
      ) : null}

      {finished ? (
        <div className="pg-finished">
          <p className="pg-caps">Your check-in</p>
          <h3>{copy.result.title}</h3>
          <p>{copy.result.body}</p>
          <div className="pg-count">{session.selfChecked.length} of 5 steps marked by you.</div>
          <p className="pg-muted">Next focus: {copy.selfReportOptions.find((item) => item.value === session.focusChoice)?.label ?? 'Not sure yet'}</p>
          <div className="pg-actions">
            <button className="am-button am-primary" type="button" onClick={() => goTo(1)}>{copy.result.revisit}</button>
            <a className="am-button am-tertiary" href="/songs/easy">{copy.result.nextSong}</a>
          </div>
          <div className="pg-divider">
            <p className="pg-small pg-muted">{copy.result.shareBody}</p>
            <button className="am-button am-tertiary" type="button" onClick={() => { setShareOpen(true); emitSongPlanEvent('share_panel_open', { kind: 'plan', public_key: CURRENT_PLAN_KEY }); }}>{copy.result.share}</button>
          </div>
        </div>
      ) : null}

      <ShareDialog
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        returnFocusRef={shareTrigger}
        title={copy.shareLabel}
        description="Share the plan and edition details. Your check-ins stay with you."
        url={shareURL}
        shareTitle={copy.title}
        copyLabel="Copy link"
        shareLabel="More sharing options"
        preview={<p className="kn-share-preview-block">{shareURL}<span>The link does not include your check-ins.</span></p>}
        onCopied={() => emitSongPlanEvent('share_copy_completed', { kind: 'plan', public_key: CURRENT_PLAN_KEY })}
        onNative={() => emitSongPlanEvent('share_native_resolved', { kind: 'plan', public_key: CURRENT_PLAN_KEY })}
      />
    </section>
  );
}
