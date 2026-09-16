'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ShareDialog, buildShareURL } from '@/components/keyboard-notes/share-control';
import { KeyboardDiagram } from '@/components/keyboard-notes/keyboard-diagram';
import {
  findHearPair,
  hearCompareRoles,
  hearPairCount,
  hearPairIndex,
  hearShareParams,
  HEAR_PAIR_ORDER,
  HEAR_PATH,
  nextHearPairId,
  type HearPairData,
  type HearPairId,
  type HearRevealMethod,
  type HearVoice,
} from '@/lib/hear-the-difference-core';
import type { PianoKey } from '@/lib/keyboard-types';
import { emitHearEvent } from '@/lib/hear-the-difference-events';
import { useComparisonAudio } from './use-comparison-audio';
import '@/components/keyboard-notes/keyboard-notes.css';
import '@/components/keyboard-notes/share-dialog.css';
import './hear-the-difference.css';

const AUDIO_COPY = {
  loading: 'Preparing sound…',
  audio_error: 'Audio couldn’t finish. Try again, or read the explanation.',
  audio_unavailable: 'Audio couldn’t finish. Try again, or read the explanation.',
} as const;

type ChallengePhase = 'landing' | 'ready' | 'wrong' | 'hint' | 'reveal';

function syncURL(pair: HearPairId, extras: Record<string, string> = {}) {
  if (typeof window === 'undefined') return;
  const params = hearShareParams(pair, extras);
  const next = `${HEAR_PATH}?${params}`;
  window.history.replaceState(null, '', next);
}

export function HearTheDifferenceExperience({
  pairs,
  keyboards,
  initialPair,
  sharedLanding = false,
  source = null,
}: {
  pairs: HearPairData[];
  keyboards: Record<HearPairId, PianoKey[]>;
  initialPair: HearPairId;
  sharedLanding?: boolean;
  source?: string | null;
}) {
  const challengeRef = useRef<HTMLElement>(null);
  const revealRef = useRef<HTMLElement>(null);
  const shareTrigger = useRef<HTMLButtonElement>(null);
  const learnRef = useRef<HTMLDetailsElement>(null);
  const explainRef = useRef<HTMLDetailsElement>(null);
  const runRef = useRef(0);
  const pairRef = useRef(initialPair);
  const audio = useComparisonAudio(AUDIO_COPY);
  const [pairId, setPairId] = useState<HearPairId>(initialPair);
  const [phase, setPhase] = useState<ChallengePhase>('landing');
  const [guess, setGuess] = useState<HearVoice | null>(null);
  const [revealMethod, setRevealMethod] = useState<HearRevealMethod | null>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [busy, setBusy] = useState(false);
  const [helpUsed, setHelpUsed] = useState(false);
  const viewed = useRef(false);

  const pair = useMemo(() => findHearPair(pairs, pairId), [pairs, pairId]);
  const keys = useMemo(() => keyboards[pairId], [keyboards, pairId]);
  const roles = useMemo(() => (phase === 'reveal' ? hearCompareRoles(pair) : {}), [pair, phase]);
  const keyLabels = useMemo(() => {
    if (phase !== 'reveal') return {};
    return {
      [pair.sourceThird.midi]: pair.sourceThird.display_pitch,
      [pair.targetThird.midi]: pair.targetThird.display_pitch,
    };
  }, [pair, phase]);
  const comparisonReady = phase === 'ready' || phase === 'wrong' || phase === 'hint' || phase === 'reveal';
  const canGuess = comparisonReady && phase !== 'reveal' && !busy && !audioError;
  const playingComparison = busy && (audio.phase === 'chord1' || audio.phase === 'gap' || audio.phase === 'chord2');
  pairRef.current = pairId;

  useEffect(() => {
    if (viewed.current) return;
    viewed.current = true;
    emitHearEvent('one_note_view', { pair: pairId, source: source ?? null });
    if (sharedLanding) emitHearEvent('one_note_shared_landing', { pair: pairId, from: 'share' });
  }, [pairId, sharedLanding, source]);

  useEffect(() => {
    if (audio.state === 'error' || audio.state === 'unavailable') setAudioError(true);
  }, [audio.state]);

  function markHelp() {
    setHelpUsed(true);
  }

  function closeExplanations() {
    if (learnRef.current) learnRef.current.open = false;
    if (explainRef.current) explainRef.current.open = false;
  }

  async function runComparison(kind: 'start' | 'replay' = 'start') {
    if (busy && !playingComparison) return;
    if (busy && playingComparison) audio.stop(false);
    const runId = ++runRef.current;
    const activePair = pairId;
    const startedInReveal = phase === 'reveal';
    setBusy(true);
    setAudioError(false);
    if (!startedInReveal) setGuess(null);
    if (!startedInReveal && phase !== 'wrong' && phase !== 'hint') setPhase('landing');
    emitHearEvent(kind === 'replay' ? 'one_note_replay' : 'one_note_compare_start', { pair: activePair, source: source ?? null });
    const result = await audio.playComparison(pair);
    if (runId !== runRef.current || pairRef.current !== activePair) return;
    setBusy(false);
    if (result.status === 'error' || result.status === 'unavailable') {
      setAudioError(true);
      emitHearEvent('one_note_audio_error', { pair: activePair, phase: result.failedSide ?? audio.phase });
      return;
    }
    if (result.status !== 'completed') return;
    emitHearEvent('one_note_compare_complete', { pair: activePair });
    if (startedInReveal) {
      setPhase('reveal');
      return;
    }
    setPhase(current => (current === 'reveal' ? 'reveal' : current === 'wrong' || current === 'hint' ? current : 'ready'));
  }

  async function playSide(side: 'minor' | 'major') {
    if (!comparisonReady || busy) return;
    const runId = ++runRef.current;
    const activePair = pairId;
    setBusy(true);
    emitHearEvent('one_note_single_replay', { pair: activePair, side });
    const result = await audio.playSide(pair, side);
    if (runId !== runRef.current || pairRef.current !== activePair) return;
    setBusy(false);
    if (result.status === 'error' || result.status === 'unavailable') {
      setAudioError(true);
      emitHearEvent('one_note_audio_error', { pair: activePair, phase: 'side' });
    }
  }

  function choose(voice: HearVoice) {
    if (!canGuess || busy) return;
    setGuess(voice);
    const correct = voice === pair.answer;
    emitHearEvent('one_note_guess', { pair: pairId, guess: voice, correct, helpUsed });
    if (correct) {
      setRevealMethod('correct');
      setPhase('reveal');
      emitHearEvent('one_note_reveal', { pair: pairId, method: helpUsed ? 'help' : 'correct' });
      queueMicrotask(() => revealRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
      return;
    }
    setPhase(current => (current === 'hint' ? 'hint' : 'wrong'));
  }

  function showHint() {
    if (busy) return;
    markHelp();
    emitHearEvent('one_note_hint', { pair: pairId });
    setPhase('hint');
  }

  function showAnswer() {
    if (busy) return;
    markHelp();
    setRevealMethod('show_answer');
    setPhase('reveal');
    emitHearEvent('one_note_reveal', { pair: pairId, method: 'show_answer' });
    queueMicrotask(() => revealRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  }

  function goToPair(next: HearPairId) {
    runRef.current += 1;
    audio.stop(false);
    emitHearEvent('one_note_try_pair', { fromPair: pairId, toPair: next });
    setPairId(next);
    setPhase('landing');
    setGuess(null);
    setRevealMethod(null);
    setShareOpen(false);
    setAudioError(false);
    setBusy(false);
    setHelpUsed(false);
    closeExplanations();
    audio.resetPhase();
    syncURL(next);
    queueMicrotask(() => challengeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  }

  function openShare() {
    setShareOpen(true);
    emitHearEvent('one_note_share_open', { pair: pairId });
  }

  const primaryLabel = playingComparison
    ? 'Stop comparison'
    : comparisonReady
      ? 'Replay comparison'
      : 'Play comparison';

  const revealEyebrow = revealMethod === 'show_answer' ? 'Answer revealed' : helpUsed ? 'Comparison explained' : 'You found it';
  const revealFeedback = helpUsed
    ? <><strong>That’s the changed voice.</strong> You used help on this comparison.</>
    : <><strong>Yes.</strong> That’s the changed voice.</>;

  return (
    <div className="hd-page" data-pair={pairId} data-phase={phase} data-audio={audio.state} data-help={helpUsed ? '1' : '0'}>
      {sharedLanding && (
        <aside className="hd-receiver" role="status">
          <strong>A quick listening challenge.</strong> Someone shared this comparison with you. No sign-in needed.
        </aside>
      )}

      <section className="hd-hero" aria-labelledby="hd-title">
        <p className="hd-kicker">Change one note.</p>
        <h1 id="hd-title">Hear the Difference Between Major and Minor Chords</h1>
        <p className="hd-lead">Two chords. One note moves. Listen to the comparison, then find the voice that changed.</p>
      </section>

      <section className="hd-challenge" id="challenge" ref={challengeRef} aria-labelledby="hd-challenge-title">
        <div className="hd-challenge-head">
          <div>
            <p className="hd-eyebrow">Listening challenge</p>
            <h2 id="hd-challenge-title">Which voice changed?</h2>
            <p className="hd-muted">Listen to both chords, then choose the voice that changed.</p>
          </div>
          <p className="hd-pair-chip">Pair {hearPairIndex(pairId)} of {hearPairCount()} · {pair.root}</p>
        </div>

        <div className="hd-play-stage">
          <div className="hd-play-copy">
            <strong>{playingComparison ? 'Listening…' : comparisonReady ? 'Comparison ready' : 'Hear both chords'}</strong>
            <p className="hd-muted">{comparisonReady ? 'Replay both chords, or hear Chord 1 and Chord 2 on their own.' : 'One tap plays Chord 1, then Chord 2.'}</p>
            <div className="hd-timeline" aria-hidden="true">
              <span className="hd-step"><i className={`hd-dot${audio.phase === 'chord1' || comparisonReady ? ' on' : ''}`} /> Chord 1</span>
              <span>→</span>
              <span className="hd-step"><i className={`hd-dot${audio.phase === 'chord2' || comparisonReady ? ' on' : ''}`} /> Chord 2</span>
            </div>
            {comparisonReady && (
              <div className="hd-sub-actions">
                <button type="button" className="am-button am-secondary" disabled={busy || audioError} onClick={() => void playSide('minor')}>Chord 1</button>
                <button type="button" className="am-button am-secondary" disabled={busy || audioError} onClick={() => void playSide('major')}>Chord 2</button>
              </div>
            )}
          </div>
          <button
            type="button"
            className="am-button am-primary hd-primary"
            disabled={(busy && !playingComparison) || audio.state === 'unavailable'}
            aria-busy={playingComparison}
            onClick={() => {
              if (playingComparison) {
                runRef.current += 1;
                audio.stop(true);
                setBusy(false);
                return;
              }
              void runComparison(comparisonReady ? 'replay' : 'start');
            }}
          >
            {primaryLabel}
          </button>
        </div>

        {audioError && (
          <div className="hd-audio-error" role="alert">
            <strong>Audio couldn’t finish.</strong>
            <p>Try again, or read the explanation.</p>
            <button type="button" className="am-button am-secondary" onClick={() => void runComparison(comparisonReady ? 'replay' : 'start')}>Retry audio</button>
          </div>
        )}

        <div className="hd-guess">
          <h3>Which part changed?</h3>
          <p className="hd-helper" id="hd-guess-help">{comparisonReady ? 'Now choose the part you heard change.' : 'Listen to the comparison first.'}</p>
          <div className="hd-choices" role="group" aria-describedby="hd-guess-help" aria-label="Which part changed?">
            {([
              ['low', 'Low note'],
              ['middle', 'Middle note'],
              ['high', 'High note'],
            ] as const).map(([value, label]) => (
              <button
                key={value}
                type="button"
                className={`hd-choice${guess === value ? (value === pair.answer && phase === 'reveal' ? ' correct' : value !== pair.answer ? ' wrong' : '') : ''}`}
                disabled={!canGuess}
                aria-pressed={guess === value}
                onClick={() => choose(value)}
              >
                {label}
              </button>
            ))}
          </div>

          {(phase === 'wrong' || phase === 'hint') && (
            <div className={`hd-feedback${phase === 'hint' ? ' info' : ''}`} role="status">
              {phase === 'hint'
                ? <><strong>Hint.</strong> Listen closely to the center voice in this root-position shape.</>
                : <><strong>Not quite.</strong> Listen to the comparison again.</>}
            </div>
          )}
          {phase === 'reveal' && revealMethod === 'correct' && (
            <div className="hd-feedback info" role="status">{revealFeedback}</div>
          )}

          {(phase === 'wrong' || phase === 'hint') && (
            <div className="hd-wrong-actions">
              <button type="button" className="am-button am-primary" disabled={busy} onClick={() => void runComparison('replay')}>Replay comparison</button>
              <button type="button" className="am-button am-secondary" disabled={busy} onClick={showHint}>Hint</button>
              <button type="button" className="am-button am-tertiary" disabled={busy} onClick={showAnswer}>Show answer</button>
            </div>
          )}
        </div>

        {phase === 'reveal' && (
          <section className="hd-reveal" ref={revealRef} aria-labelledby="hd-reveal-title">
            <div className="hd-reveal-grid">
              <div>
                <p className="hd-eyebrow">{revealEyebrow}</p>
                <h2 id="hd-reveal-title">The third moved up by one semitone.</h2>
                <p>{pair.revealCopy}</p>
                <p className="hd-change"><span>{pair.sourceThird.display_pitch}</span> → <span>{pair.targetThird.display_pitch}</span></p>
                <p><strong>In this root-position close voicing, the third is the middle note.</strong></p>
                <p className="hd-muted">Raising the third by one semitone changes the interval above the root from a minor third to a major third, changing the chord quality from minor to major.</p>
              </div>
              <div className="hd-keyboard-wrap">
                <KeyboardDiagram
                  keys={keys}
                  keyRoles={roles}
                  keyLabels={keyLabels}
                  sounding={audio.sounding}
                  octaves
                  fit
                  autoCenter={false}
                  showVisualLabels
                  label={`${pair.minorName} to ${pair.majorName} keyboard comparison`}
                  className="hd-keyboard"
                />
                <ul className="hd-role-legend" aria-label="Comparison key roles">
                  <li><span data-role="common" /> Unchanged</li>
                  <li><span data-role="source" /> Before</li>
                  <li><span data-role="target" /> After</li>
                </ul>
              </div>
            </div>
            <div className="hd-three">
              <div><p className="hd-eyebrow">01</p><h3>Same root</h3><p>{pair.rootExplain}</p></div>
              <div><p className="hd-eyebrow">02</p><h3>Raise the third</h3><p>{pair.thirdExplain}</p></div>
              <div><p className="hd-eyebrow">03</p><h3>Same fifth</h3><p>{pair.fifthExplain}</p></div>
            </div>
            <div className="hd-reveal-actions">
              <button type="button" className="am-button am-primary" onClick={() => goToPair(nextHearPairId(pairId))}>Try another pair</button>
              <button ref={shareTrigger} type="button" className="am-button am-secondary" onClick={openShare}>Share challenge</button>
              <div className="hd-refs">
                <a href={pair.minorURL} onClick={() => emitHearEvent('one_note_open_reference', { pair: pairId, target: pair.minorChordId })}>{`Open ${pair.minorName} reference →`}</a>
                <a href={pair.majorURL} onClick={() => emitHearEvent('one_note_open_reference', { pair: pairId, target: pair.majorChordId })}>{`Open ${pair.majorName} reference →`}</a>
                <a href="/guide/piano-chords" onClick={() => emitHearEvent('one_note_open_reference', { pair: pairId, target: 'piano-chords-guide' })}>Why the third matters →</a>
              </div>
            </div>
          </section>
        )}

        <details
          ref={learnRef}
          className="hd-learn"
          onToggle={event => {
            if ((event.currentTarget as HTMLDetailsElement).open) markHelp();
          }}
        >
          <summary>Explain the comparison</summary>
          <p>In a root-position major or minor triad, the root and fifth can stay the same while the third changes. Listen first, then use this explanation only if you want help.</p>
          <p className="hd-muted">Opening this section marks the round as completed with help.</p>
        </details>
      </section>

      <section className="hd-more" aria-labelledby="hd-more-title">
        <p className="hd-eyebrow">Keep listening</p>
        <h2 id="hd-more-title">Try the same change in another key</h2>
        <p className="hd-muted">Explore another curated pair. Chord names and the changed note appear after you answer.</p>
        <div className="hd-presets">
          {HEAR_PAIR_ORDER.map(id => {
            const item = findHearPair(pairs, id);
            return (
              <button key={id} type="button" className={`hd-preset${id === pairId ? ' current' : ''}`} aria-current={id === pairId ? 'true' : undefined} onClick={() => goToPair(id)}>
                <strong>{item.root}</strong>
                <span>Pair {hearPairIndex(id)}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="hd-content" aria-labelledby="hd-why-title">
        <div>
          <p className="hd-eyebrow">What you just heard</p>
          <h2 id="hd-why-title">Why one note matters</h2>
        </div>
        <div>
          <details
            ref={explainRef}
            onToggle={event => {
              if ((event.currentTarget as HTMLDetailsElement).open) markHelp();
            }}
          >
            <summary>Read the interval explanation</summary>
            <p>In a root-position major or minor triad, the root and fifth can stay the same while the third changes. A minor is A–C–E. Raise C by one semitone to C♯ and you get A major: A–C♯–E.</p>
            <p>That semitone changes the interval above A from a minor third to a major third. The lesson is about interval structure—not a fixed “sad versus happy” emotion rule.</p>
          </details>
          <p className="hd-outbound">
            <a href="/chords">Browse piano chords →</a>
            <a href="/chords/finder">Use Chord Finder →</a>
            <a href="/keyboard-notes">Find notes on the keyboard →</a>
          </p>
        </div>
      </section>

      <section className="hd-content" aria-labelledby="hd-how-title">
        <div>
          <p className="hd-eyebrow">At the piano</p>
          <h2 id="hd-how-title">How to use this at the piano</h2>
        </div>
        <div>
          <details
            onToggle={event => {
              if ((event.currentTarget as HTMLDetailsElement).open) markHelp();
            }}
          >
            <summary>Steps after you answer</summary>
            <ul>
              <li>Listen to the complete comparison before guessing.</li>
              <li>After the answer is revealed, play the two root-position shapes yourself.</li>
              <li>Watch the third move by one adjacent piano key while the root and fifth stay fixed.</li>
              <li>Open the chord references when you want notes, inversions, fingering examples, or printable material.</li>
            </ul>
          </details>
          <p className="hd-muted">This is a focused listening comparison. It does not measure general ear-training ability or live piano performance.</p>
        </div>
      </section>

      <ShareDialog
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        returnFocusRef={shareTrigger}
        title="Share the listening challenge"
        description="Send the same chord pair. The answer is not included."
        url={buildShareURL(HEAR_PATH, hearShareParams(pairId, { from: 'share' }))}
        shareTitle="Can you hear the one note that changed?"
        shareText="Two piano chords. One note moves. Listen to the comparison and choose which part changed."
        copyLabel="Copy challenge link"
        shareLabel="Share"
        preview={(
          <div className="hd-preview kn-share-preview-block">
            <strong>Can you hear the one note that changed?</strong>
            <span>Two piano chords. One note moves. Listen to the comparison and choose which part changed.</span>
          </div>
        )}
        onCopied={(_url, ok) => emitHearEvent('one_note_copy_link', { pair: pairId, ok })}
        onNative={status => { if (status === 'opened') emitHearEvent('one_note_share_native', { pair: pairId }); }}
      />
      <p className="pr-sr-only" role="status" aria-live="polite">{audio.message}</p>
    </div>
  );
}
