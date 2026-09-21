'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import type { Layout, PianoKey } from '@/lib/keyboard-types';
import { emitKeyboardPracticeEvent } from '@/lib/keyboard-events';
import {
  PRACTICE_ENTRY_HASH,
  PRACTICE_LENGTH,
  PRACTICE_OPTIONS,
  classifyPracticeAnswer,
  generatePresetPractice,
  isPracticeEntryHash,
  practiceEntryHref,
  practiceGeometryHint,
  practicePresetParams,
  practiceWrongFeedback,
  resolveStartPreset,
  restorePracticePreset,
  reviewPracticeTargets,
  summarizePractice,
  type ActiveRoundConfig,
  type PracticeAnswerKind,
  type PracticeAnswerRecord,
  type PracticeOption,
  type PracticePresetRestore,
  type PracticeTarget,
} from '@/lib/keyboard-practice';
import { keysInMidiRange, visibleMidiWindow, clampRangeStart } from '@/lib/keyboard-viewport';
import { blackKeyNeighborDescription, lookupHubMessage, lookupShareParams, resolveLookup, restoreLookup, selectCandidate, selectPianoKey, spokenPianoKeyName, type LookupResolution } from '@/lib/keyboard-resolution';
import { Icon } from '@/components/a-minor/icon';
import { Dialog, DialogClose } from '@/components/ui/dialog';
import { RollingText } from '@/components/ui/rolling-text';
import { KeyboardDiagram } from './keyboard-diagram';
import { ShareDialog, buildShareURL, copyShareURL } from './share-control';
import { useNoteAudio } from './use-note-audio';

type Mode = 'explore' | 'practice';
type PracticePhase = 'start' | 'question' | 'results';

function primaryLabel(key: PianoKey | undefined) {
  return key?.label_with_octave.split(' / ')[0] ?? '';
}

function noteDescription(key: PianoKey | undefined, layout: Layout) {
  if (!key) return 'Choose a piano key to inspect its note.';
  if (key.color === 'black') return blackKeyNeighborDescription(key, layout);
  if (key.midi === 60) return 'A starting point on the keyboard.';
  return 'White key · Natural note';
}

function selectedDisplay(resolution: LookupResolution, key: PianoKey | undefined) {
  const primary = resolution.selected?.requestedSpelling.display;
  if (!primary) return resolution.rawInput || '—';
  if (key?.color === 'black') {
    const others = (resolution.selected?.equivalentLabels ?? []).filter(label => label !== primary);
    return others.length ? `${primary} / ${others.join(' / ')}` : primary;
  }
  return primary;
}

const HUB_AUDIO = {
  loading: 'Loading sound…',
  error: 'Sound is unavailable. Try again.',
  unavailable: 'Sound is unavailable. Try again.',
} as const;

function ModeTabs({ value, onChange }: { value: Mode; onChange: (mode: Mode) => void }) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const modes: { id: Mode; label: string }[] = [{ id: 'explore', label: 'Explore notes' }, { id: 'practice', label: 'Practice notes' }];
  return <div className="kn-v2-tabs" role="tablist" aria-label="Piano keys and notes modes">
    {modes.map((item, index) => <button
      key={item.id}
      ref={element => { refs.current[index] = element; }}
      id={`kn-v2-${item.id}-tab`}
      type="button"
      role="tab"
      aria-selected={value === item.id}
      aria-controls={`kn-v2-${item.id}-panel`}
      tabIndex={value === item.id ? 0 : -1}
      onClick={() => onChange(item.id)}
      onKeyDown={event => {
        const next = event.key === 'ArrowRight' || event.key === 'ArrowLeft' ? (index + (event.key === 'ArrowRight' ? 1 : modes.length - 1)) % modes.length : event.key === 'Home' ? 0 : event.key === 'End' ? modes.length - 1 : null;
        if (next === null) return;
        event.preventDefault();
        onChange(modes[next].id);
        refs.current[next]?.focus();
      }}
    ><RollingText>{item.label}</RollingText></button>)}
  </div>;
}

function ExploreNotes({ layout, layouts, active, compact, onLayoutChange }: {
  layout: Layout;
  layouts: Layout[];
  active: boolean;
  compact: boolean;
  onLayoutChange: (layoutID: string) => void;
}) {
  const audio = useNoteAudio(HUB_AUDIO);
  const [query, setQuery] = useState('C4');
  const [resolution, setResolution] = useState<LookupResolution>(() => resolveLookup('C4', layout));
  const [rangeStart, setRangeStart] = useState(compact ? 60 : 48);
  const [copyMessage, setCopyMessage] = useState('');
  const [manualURL, setManualURL] = useState('');
  const [liveMessage, setLiveMessage] = useState('');
  const [shareHint, setShareHint] = useState('');
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const selected = resolution.selected ? layout.keys.find(key => key.midi === resolution.selected?.midi) : undefined;
  const whiteSpan = compact ? 12 : 24;
  const { rangeMin, rangeMax, keys: visibleKeys } = useMemo(() => visibleMidiWindow(layout, rangeStart, whiteSpan), [layout, rangeStart, whiteSpan]);
  const accessibleLabels = useMemo(() => Object.fromEntries(visibleKeys.map(key => [key.midi, spokenPianoKeyName(key)])), [visibleKeys]);
  const heading = selectedDisplay(resolution, selected);
  const selectedOutOfView = Boolean(selected && (selected.midi < rangeMin || selected.midi > rangeMax));
  const queryHelpId = 'kn-v2-note-query-help';
  const queryError = resolution.status === 'invalid' || resolution.status === 'outside_range';
  const queryPrompt = resolution.status !== 'selected';

  useEffect(() => {
    const restored = restoreLookup(new URLSearchParams(window.location.search), layouts);
    if (restored.invalidNote) setShareHint('That note link was not valid, so middle C is shown.');
    if (!restored.resolution) return;
    onLayoutChange(restored.layout.layout_id);
    setResolution(restored.resolution);
    setQuery(restored.resolution.selected?.requestedSpelling.display ?? '');
    if (restored.resolution.selected) bringIntoView(restored.resolution.selected.midi, restored.layout);
  }, [layouts]);
  useEffect(() => {
    const selectedMidi = resolution.selected?.midi;
    const span = compact ? 12 : 24;
    if (typeof selectedMidi === 'number') {
      const raw = compact ? selectedMidi - 5 : selectedMidi - 11;
      setRangeStart(clampRangeStart(layout, raw, span));
      return;
    }
    setRangeStart(compact ? 60 : 48);
  }, [compact]);
  useEffect(() => { if (!active) audio.cancel(); }, [active]);
  useEffect(() => () => { if (copyTimer.current) clearTimeout(copyTimer.current); }, []);
  useEffect(() => {
    const showMiddleC = () => {
      const next = resolveLookup('C4', layout);
      setResolution(next);
      setQuery('C4');
      setShareHint('');
      if (next.selected) bringIntoView(next.selected.midi);
      queueMicrotask(() => {
        document.getElementById('explore')?.scrollIntoView({ block: 'start' });
        document.getElementById('kn-v2-explore-tab')?.focus();
      });
    };
    window.addEventListener('pianogrid:show-middle-c', showMiddleC);
    return () => window.removeEventListener('pianogrid:show-middle-c', showMiddleC);
  }, [layout]);

  function bringIntoView(midi: number, activeLayout = layout) {
    const span = compact ? 12 : 24;
    if (activeLayout.layout_id === layout.layout_id && midi >= rangeMin && midi <= rangeMax) return;
    const raw = compact ? midi - 5 : midi - 11;
    setRangeStart(clampRangeStart(activeLayout, raw, span));
  }

  function selectKey(key: PianoKey) {
    audio.cancel();
    const next = selectPianoKey(key, layout);
    setResolution({ rawInput: next.requestedSpelling.display, status: 'selected', normalizedPitchClass: next.requestedSpelling.letter + (next.requestedSpelling.accidental ?? ''), displaySpelling: next.requestedSpelling.display, candidates: [], selected: next, messageKey: null });
    setQuery(next.requestedSpelling.display);
    bringIntoView(key.midi);
  }

  function findNote() {
    audio.cancel();
    const next = resolveLookup(query, layout);
    if (next.status === 'selected' && next.selected) {
      setResolution(next);
      setQuery(next.selected.requestedSpelling.display);
      setLiveMessage(`${next.selected.requestedSpelling.display} selected.`);
      setShareHint('');
      bringIntoView(next.selected.midi);
      return;
    }
    setLiveMessage('');
    setResolution(current => ({ ...next, selected: current.selected }));
  }

  function chooseCandidate(midi: number, display: string) {
    audio.cancel();
    const candidate = resolution.candidates.find(item => item.midi === midi && item.display === display);
    if (!candidate) return;
    const next = selectCandidate(candidate, query, layout);
    setQuery(candidate.display);
    setResolution(next);
    bringIntoView(candidate.midi);
  }

  function changeLayout(layoutID: string) {
    audio.cancel();
    const nextLayout = layouts.find(item => item.layout_id === layoutID) ?? layouts[0];
    onLayoutChange(nextLayout.layout_id);
    const next = resolveLookup(query || resolution.selected?.requestedSpelling.display || 'C4', nextLayout, resolution.selected?.source === 'text_query' ? 'text_query' : 'share_restore');
    setResolution(next);
    if (next.selected) bringIntoView(next.selected.midi, nextLayout);
  }

  async function copyNoteLink() {
    if (!resolution.selected) return;
    const url = buildShareURL('/keyboard-notes', lookupShareParams(layout, resolution.selected));
    const ok = await copyShareURL(url);
    setManualURL(ok ? '' : url);
    if (copyTimer.current) clearTimeout(copyTimer.current);
    if (ok) {
      setCopyMessage('Link copied');
      copyTimer.current = setTimeout(() => setCopyMessage(''), 2000);
      return;
    }
    setCopyMessage('Copy isn’t available here. Select the link below.');
  }

  function toggleHear() {
    if (!selected) return;
    if (audio.state === 'playing') {
      audio.cancel();
      return;
    }
    audio.play(selected.midi);
  }

  const rangeStep = 12;
  const canLower = rangeStart > layout.keys[0].midi;
  const canHigher = rangeMax < layout.keys.at(-1)!.midi;
  const helpText = queryPrompt ? lookupHubMessage(resolution, layout) : 'Use a note name and octave to find one exact key.';
  return <section id="kn-v2-explore-panel" role="tabpanel" aria-labelledby="kn-v2-explore-tab" hidden={!active} className="kn-v2-panel kn-v2-explore" data-selected-midi={selected?.midi ?? ''}>
    <p className="kn-hub-live" aria-live="polite">{liveMessage}</p>
    <div className="kn-v2-explore-head">
      <div className="kn-v2-note-id">
        <h2>{heading}</h2>
      </div>
      <div className="kn-v2-note-copy">
        <h3>{selected?.midi === 60 ? 'Middle C' : selected ? heading : 'Choose a note'}</h3>
        <p>{noteDescription(selected, layout)}</p>
        <button className="am-button am-primary kn-v2-hear" type="button" onClick={toggleHear} disabled={!audio.ready || !selected} aria-busy={audio.state === 'loading'} aria-label={audio.state === 'playing' ? 'Stop note' : selected ? `Hear ${primaryLabel(selected)}` : 'Hear note'}>
          <Icon name={audio.state === 'playing' ? 'stop' : 'play'}/><RollingText>{audio.state === 'playing' ? 'Stop' : selected ? `Hear ${primaryLabel(selected)}` : 'Hear note'}</RollingText>
        </button>
        <p className="kn-v2-audio-status" role="status">{audio.message}</p>
      </div>
      <form className="kn-v2-search" action="/keyboard-notes" method="get" onSubmit={event => { event.preventDefault(); findNote(); }}>
        <label htmlFor="kn-v2-note-query">Find another note</label>
        <div><input id="kn-v2-note-query" name="note" value={query} onChange={event => setQuery(event.target.value)} placeholder="Try F3, A4 or A-flat" aria-invalid={queryError} aria-describedby={queryHelpId}/><button className="am-button am-secondary" type="submit"><Icon name="search"/><RollingText>Find</RollingText></button></div>
        <p id={queryHelpId} className={queryError ? 'kn-v2-form-error' : 'kn-v2-form-help'} role={queryError ? 'alert' : undefined}>{helpText}</p>
        {shareHint ? <p className="kn-hub-share-hint" role="status">{shareHint}</p> : null}
        {resolution.candidates.length > 0 && <div className="kn-v2-search-candidates" aria-label="Choose an octave">{resolution.candidates.map(candidate => <button type="button" key={`${candidate.midi}-${candidate.display}`} onClick={() => chooseCandidate(candidate.midi, candidate.display)}>{candidate.display}</button>)}</div>}
      </form>
    </div>
    <div className="kn-v2-keyboard-stage kn-v2-explore-keyboard">
      <KeyboardDiagram keys={visibleKeys} selected={selected?.midi ?? null} sounding={audio.sounding} onSelect={selectKey} ready={audio.ready} fit={!compact} autoCenter={false} accessibleLabels={accessibleLabels} label={`Explore ${primaryLabel(visibleKeys[0])} to ${primaryLabel(visibleKeys.at(-1))}`}/>
      <div className="kn-v2-range-row">
        <button type="button" className="kn-v2-text-button" disabled={!canLower} onClick={() => setRangeStart(value => Math.max(layout.keys[0].midi, value - rangeStep))}><Icon name="left"/><RollingText>Lower notes</RollingText></button>
        <p>{primaryLabel(visibleKeys[0])}–{primaryLabel(visibleKeys.at(-1))}</p>
        <button type="button" className="kn-v2-text-button" disabled={!canHigher} onClick={() => setRangeStart(value => Math.min(layout.keys.at(-1)!.midi - whiteSpan, value + rangeStep))}><RollingText>Higher notes</RollingText><Icon name="right"/></button>
      </div>
      {selectedOutOfView && selected ? <p className="kn-hub-show-selected"><button type="button" className="kn-v2-text-button" onClick={() => bringIntoView(selected.midi)}>Show selected note</button></p> : null}
      <div className="kn-v2-overview" aria-label={`${layout.label} overview. Current visible range is marked.`}>
        <KeyboardDiagram keys={layout.keys} marked={visibleKeys.map(key => key.midi)} octaves={false} showVisualLabels={false} fit autoCenter={false}/>
      </div>
    </div>
    <div className="kn-v2-explore-secondary">
      <details>
        <summary>Choose by note name</summary>
        <div className="kn-v2-layout-choice"><label htmlFor="kn-v2-layout">Keyboard size</label><select id="kn-v2-layout" value={layout.layout_id} onChange={event => changeLayout(event.target.value)}>{layouts.map(item => <option key={item.layout_id} value={item.layout_id}>{item.label}</option>)}</select></div>
        <div className="kn-v2-note-choices">{visibleKeys.map(key => <button type="button" key={key.midi} className={key.midi === selected?.midi ? 'is-current' : ''} onClick={() => selectKey(key)}><RollingText>{primaryLabel(key)}</RollingText></button>)}</div>
      </details>
      <button type="button" className="kn-v2-copy-link" onClick={() => void copyNoteLink()}><RollingText>Copy link</RollingText></button>
      <span className="kn-v2-copy-status" role="status">{copyMessage}</span>
      {manualURL ? <label className="kn-v2-manual-link">Note link<textarea value={manualURL} readOnly rows={2} onFocus={event => event.currentTarget.select()}/></label> : null}
    </div>
  </section>;
}

function PracticeNotes({ layout, active, sharedPreset, onExplore }: { layout: Layout; active: boolean; sharedPreset: PracticePresetRestore; onExplore: () => void }) {
  const audio = useNoteAudio();
  const exitTitleId = useId();
  const exitDescId = useId();
  const [phase, setPhase] = useState<PracticePhase>('start');
  const [draftOption, setDraftOption] = useState<PracticeOption>(sharedPreset.status === 'valid' ? sharedPreset.preset.option : 'natural-c4-c5');
  const [showLabels, setShowLabels] = useState(false);
  const [activeRound, setActiveRound] = useState<ActiveRoundConfig | null>(sharedPreset.status === 'valid' ? {
    preset: sharedPreset.preset,
    option: sharedPreset.preset.option,
    showLabels: false,
    isCustom: false,
    fromShared: true,
  } : null);
  const [questions, setQuestions] = useState<PracticeTarget[]>([]);
  const [index, setIndex] = useState(0);
  const [records, setRecords] = useState<PracticeAnswerRecord[]>([]);
  const [wrongMidi, setWrongMidi] = useState<number | null>(null);
  const [attemptedWrong, setAttemptedWrong] = useState(false);
  const [hinted, setHinted] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [resolved, setResolved] = useState<PracticeAnswerKind | null>(null);
  const [isReview, setIsReview] = useState(false);
  const [savedResult, setSavedResult] = useState<PracticeAnswerRecord[] | null>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [exitOpen, setExitOpen] = useState(false);
  const exitTrigger = useRef<HTMLButtonElement>(null);
  const keepPracticing = useRef<HTMLButtonElement>(null);
  const shareTrigger = useRef<HTMLButtonElement>(null);
  const advancing = useRef(false);

  const option = activeRound?.option ?? draftOption;
  const optionConfig = PRACTICE_OPTIONS[option];
  const labelsOn = activeRound?.showLabels ?? showLabels;
  const target = questions[index];
  const questionKeys = useMemo(() => keysInMidiRange(layout, Math.max(optionConfig.min, (target?.midi ?? optionConfig.min) - 12), Math.min(optionConfig.max, (target?.midi ?? optionConfig.max) + 12)), [layout, optionConfig, target]);
  const finalRecords = savedResult ?? records;
  const missed = useMemo(() => reviewPracticeTargets(finalRecords), [finalRecords]);
  const sharedUnedited = sharedPreset.status === 'valid' && draftOption === sharedPreset.preset.option && phase === 'start';
  const startPreviewKeys = useMemo(() => keysInMidiRange(layout, PRACTICE_OPTIONS[draftOption].min, Math.min(PRACTICE_OPTIONS[draftOption].max, PRACTICE_OPTIONS[draftOption].min + 12)), [layout, draftOption]);

  useEffect(() => { if (!active) audio.cancel(); }, [active]);
  useEffect(() => { advancing.current = false; }, [index, phase]);
  useEffect(() => {
    if (phase !== 'start') return;
    if (sharedPreset.status === 'valid') {
      setDraftOption(sharedPreset.preset.option);
      setActiveRound({
        preset: sharedPreset.preset,
        option: sharedPreset.preset.option,
        showLabels: false,
        isCustom: false,
        fromShared: true,
      });
    } else if (sharedPreset.status === 'invalid') {
      setActiveRound(null);
    }
  }, [sharedPreset, phase]);

  function resetQuestionState() {
    setWrongMidi(null);
    setAttemptedWrong(false);
    setHinted(false);
    setRevealed(false);
    setResolved(null);
  }

  function startPractice(reviewTargets?: PracticeTarget[]) {
    audio.cancel();
    let round = activeRound;
    if (!reviewTargets?.length) {
      const reuseShared = phase === 'start' && sharedPreset.status === 'valid' && draftOption === sharedPreset.preset.option;
      const resolved = reuseShared
        ? { preset: sharedPreset.preset, isCustom: false, fromShared: true }
        : resolveStartPreset({ status: 'none', preset: null }, phase === 'start' ? draftOption : (activeRound?.option ?? draftOption));
      if (!reuseShared && sharedPreset.status === 'valid' && phase === 'start' && draftOption !== sharedPreset.preset.option) {
        resolved.isCustom = true;
      }
      round = {
        preset: resolved.preset,
        option: resolved.preset.option,
        showLabels: phase === 'start' ? showLabels : (activeRound?.showLabels ?? showLabels),
        isCustom: resolved.isCustom,
        fromShared: resolved.fromShared,
      };
      setDraftOption(round.option);
      setActiveRound(round);
      setSavedResult(null);
    }
    const preset = round!.preset;
    const next = reviewTargets?.length ? reviewTargets : generatePresetPractice(layout, preset);
    setQuestions(next);
    setIndex(0);
    setRecords([]);
    setIsReview(Boolean(reviewTargets?.length));
    advancing.current = false;
    resetQuestionState();
    setPhase('question');
    emitKeyboardPracticeEvent(reviewTargets?.length ? 'keyboard_practice_review_started' : 'keyboard_practice_started', { option: round!.option, count: next.length });
  }

  function chooseAnswer(key: PianoKey) {
    if (!target || resolved || revealed) return;
    if (key.midi === target.midi) {
      const kind = classifyPracticeAnswer({ attemptedWrong, hinted, revealed: false });
      setWrongMidi(null);
      setResolved(kind);
      audio.play(key.midi);
      emitKeyboardPracticeEvent('keyboard_practice_answered', { question: index + 1, outcome: kind });
      return;
    }
    setAttemptedWrong(true);
    setWrongMidi(key.midi);
    audio.play(key.midi);
    emitKeyboardPracticeEvent('keyboard_practice_answered', { question: index + 1, outcome: 'wrong' });
  }

  function showHint() {
    setHinted(true);
    setWrongMidi(null);
    emitKeyboardPracticeEvent('keyboard_practice_hint_used', { question: index + 1 });
  }

  function showAnswer() {
    if (!target || resolved || revealed) return;
    setRevealed(true);
    setResolved('revealed');
    setWrongMidi(null);
    audio.play(target.midi);
    emitKeyboardPracticeEvent('keyboard_practice_answer_revealed', { question: index + 1 });
  }

  function nextQuestion() {
    if (!target || !resolved || advancing.current) return;
    advancing.current = true;
    audio.cancel();
    const nextRecords = [...records, { target, kind: resolved }];
    if (index + 1 >= questions.length) {
      setRecords(nextRecords);
      setPhase('results');
      const summary = summarizePractice(savedResult ?? nextRecords);
      if (!isReview) emitKeyboardPracticeEvent('keyboard_practice_completed', { count: summary.total, first: summary.independent, assisted: summary.assisted, revealed: summary.revealed });
      return;
    }
    setRecords(nextRecords);
    setIndex(value => value + 1);
    resetQuestionState();
  }

  function returnToResults() {
    audio.cancel();
    setPhase('results');
    setIsReview(false);
    setQuestions([]);
    setRecords(savedResult ?? records);
    resetQuestionState();
  }

  function discardRound() {
    audio.cancel();
    setPhase('start');
    setQuestions([]);
    setRecords([]);
    setSavedResult(null);
    setIsReview(false);
    resetQuestionState();
    if (sharedPreset.status === 'valid') {
      setDraftOption(sharedPreset.preset.option);
      setActiveRound({
        preset: sharedPreset.preset,
        option: sharedPreset.preset.option,
        showLabels: false,
        isCustom: false,
        fromShared: true,
      });
    } else {
      setActiveRound(null);
    }
  }

  function practiceShareURL() {
    const preset = activeRound?.preset ?? resolveStartPreset(sharedPreset, draftOption).preset;
    const path = practiceEntryHref(practicePresetParams(preset));
    if (typeof window === 'undefined') return path;
    return `${window.location.origin}${path}`;
  }

  function updateDraftOption(next: PracticeOption) {
    setDraftOption(next);
    if (sharedPreset.status === 'valid' && next === sharedPreset.preset.option) {
      setActiveRound({
        preset: sharedPreset.preset,
        option: next,
        showLabels,
        isCustom: false,
        fromShared: true,
      });
      return;
    }
    setActiveRound(current => current ? { ...current, option: next, isCustom: sharedPreset.status === 'valid', fromShared: false } : null);
  }

  const { independent, assisted, revealed: revealedCount } = summarizePractice(finalRecords);
  const wrongKey = layout.keys.find(key => key.midi === wrongMidi);
  const selectedState = revealed ? 'revealed' : resolved ? 'correct' : wrongMidi !== null ? 'wrong' : 'selected';
  const selectedMidi = revealed || resolved ? target?.midi ?? null : wrongMidi;
  const labels = labelsOn ? Object.fromEntries(questionKeys.map(key => [key.midi, primaryLabel(key)])) : {};
  const startMeta = PRACTICE_OPTIONS[draftOption];
  const receiverCustom = sharedPreset.status === 'valid' && draftOption !== sharedPreset.preset.option;

  return <section id="kn-v2-practice-panel" role="tabpanel" aria-labelledby="kn-v2-practice-tab" hidden={!active} className="kn-v2-panel kn-v2-practice" data-phase={phase}>
    {phase === 'start' && <div className="kn-v2-practice-start" id="note-trainer">
      {sharedPreset.status === 'valid' && !receiverCustom && <div className="kn-v2-receiver-note" role="status"><p className="kn-v2-kicker">Shared practice · 10 notes</p></div>}
      {receiverCustom && <div className="kn-v2-receiver-note" role="status"><p className="kn-v2-kicker">Custom practice · 10 notes</p></div>}
      {sharedPreset.status === 'invalid' && <div className="kn-v2-receiver-note kn-v2-receiver-invalid" role="alert"><p className="kn-v2-kicker">This practice link is no longer available</p><p>You can still start a new 10-note practice below.</p></div>}
      <div className="kn-v2-start-meta"><span>Piano note practice</span><span>{startMeta.label.replace('Natural notes · ', '').replace('Black keys · ', '')} · {draftOption === 'black-c4-c5' ? 'Black keys' : 'White keys'}</span></div>
      <div className="kn-v2-start-intro">
        <div className="kn-v2-start-copy">
          <p className="kn-v2-start-note">10-note round · Your pace</p>
          <h2>Find your way around the keys.</h2>
          <p>{startMeta.label.replace(' · ', ' · ')} · {showLabels ? 'With labels' : 'Without labels'}</p>
          <button className="am-button am-primary kn-v2-start-button" type="button" onClick={() => startPractice()}><RollingText>Start 10-note practice</RollingText></button>
          <p className="kn-v2-start-summary">{startMeta.label} · {showLabels ? 'With labels' : 'Without labels'}{sharedUnedited ? ' · Shared set' : receiverCustom ? ' · Custom set' : ''}</p>
        </div>
      </div>
      <div className="kn-v2-start-keyboard" aria-hidden="true"><KeyboardDiagram keys={startPreviewKeys} selected={startPreviewKeys[1]?.midi ?? null} fit autoCenter={false} showVisualLabels={false}/></div>
      <div className="kn-v2-start-keyboard-meta"><span>One small part of the piano.</span><span>{startMeta.label.split(' · ')[1]}</span></div>
      <details className="kn-v2-options" open>
        <summary>Practice options</summary>
        <div className="kn-v2-option-fields">
          <label>Notes and range<select value={draftOption} onChange={event => updateDraftOption(event.target.value as PracticeOption)}>{Object.entries(PRACTICE_OPTIONS).map(([value, copy]) => <option value={value} key={value}>{copy.label}</option>)}</select></label>
          <label className="kn-v2-checkbox"><input type="checkbox" checked={showLabels} onChange={event => setShowLabels(event.target.checked)}/><span>Show key labels during practice</span></label>
        </div>
      </details>
      <details className="kn-v2-how" open>
        <summary>How this practice works</summary>
        <ol>
          <li><strong>See your result</strong><span>First tries, helped answers, and revealed notes stay distinct.</span></li>
          <li><strong>Review missed notes</strong><span>Practice only the notes that need another look.</span></li>
          <li><strong>Share the practice</strong><span>Invite someone to start a fresh round without sharing your answers.</span></li>
        </ol>
      </details>
      <button type="button" className="kn-v2-text-button kn-v2-explore-return" onClick={onExplore}><RollingText>Explore with note names first</RollingText><Icon name="right"/></button>
    </div>}

    {phase === 'question' && target && <div className="kn-v2-question">
      <header className="kn-v2-question-head">
        <div className="kn-v2-progress-row">
          <div><p className="kn-v2-kicker">{isReview ? 'Missed-note review' : '10-note practice'}</p><p><strong>{isReview ? 'Review' : 'Question'} {index + 1}</strong><span> of {questions.length}</span></p></div>
          {isReview
            ? <button type="button" className="kn-v2-leave" onClick={returnToResults}><RollingText>Back to results</RollingText></button>
            : <button ref={exitTrigger} type="button" className="kn-v2-leave" onClick={() => setExitOpen(true)}><RollingText>Exit practice</RollingText></button>}
        </div>
        <div className="kn-v2-progress-track" role="progressbar" aria-label={`${isReview ? 'Review' : 'Question'} ${index + 1} of ${questions.length}`} aria-valuemin={1} aria-valuemax={questions.length} aria-valuenow={index + 1}>
          {questions.map((question, questionIndex) => <span key={`${question.midi}-${questionIndex}`} data-state={questionIndex < index ? 'complete' : questionIndex === index ? 'current' : 'upcoming'}/>) }
        </div>
        {!isReview && <p className="kn-v2-share-cue">Finish the round to review missed notes and share a fresh practice.</p>}
      </header>
      <div className="kn-v2-task"><p>Choose the matching key</p><h2><span>Find</span> {target.label}</h2><p>Use the groups of two and three black keys as your guide.</p></div>
      <div className="kn-v2-keyboard-stage kn-v2-question-keyboard">
        <KeyboardDiagram
          keys={questionKeys}
          selected={selectedMidi}
          selectedState={selectedState}
          selectedLabel={wrongKey ? `You chose ${primaryLabel(wrongKey)}` : target.label}
          sounding={audio.sounding}
          onSelect={chooseAnswer}
          fit
          autoCenter={false}
          showVisualLabels={labelsOn}
          keyLabels={labels}
          isKeyDisabled={key => option === 'black-c4-c5' ? key.color !== 'black' : key.color !== 'white'}
          label={`Question ${index + 1}. Find ${target.label}`}
        />
        <div className="kn-v2-question-keyboard-meta"><span>{labelsOn ? 'Note names shown' : 'Note names hidden'} · {optionConfig.label.split(' · ')[1]}</span><span>{option === 'black-c4-c5' ? 'Black keys only' : 'White keys only'}</span></div>
      </div>
      <div className="kn-v2-feedback" aria-live="polite" data-kind={revealed ? 'revealed' : resolved ? 'correct' : wrongMidi !== null ? 'wrong' : hinted ? 'hint' : 'idle'}>
        {wrongMidi === null && !hinted && !resolved && <p>Choose a {option === 'black-c4-c5' ? 'black' : 'white'} key. Take your time.</p>}
        {wrongMidi !== null && wrongKey && <p><strong>Not quite.</strong> {practiceWrongFeedback(primaryLabel(wrongKey), target.midi, wrongKey.midi).replace(/^Not quite\.\s*/, '')}</p>}
        {hinted && !resolved && <p><strong>Hint</strong> {practiceGeometryHint(target.label, target.midi)} This question will count as completed with help.</p>}
        {revealed && <p><strong>This is {target.label}.</strong> This answer was revealed and will be added to your review.</p>}
        {resolved && !revealed && <p><strong>{resolved === 'independent' ? 'That’s it.' : 'Found it.'}</strong> {target.label} is the right key.{resolved === 'assisted' ? ' This note will be added to your review.' : ''}</p>}
      </div>
      <div className="kn-v2-question-actions">
        {resolved ? <button className="am-button am-primary" type="button" onClick={nextQuestion}><RollingText>{index + 1 === questions.length ? 'See results' : 'Next note'}</RollingText><Icon name="right"/></button> : <>
          {wrongMidi !== null && <button className="am-button am-primary" type="button" onClick={() => setWrongMidi(null)}><RollingText>Try again</RollingText></button>}
          <button className="am-button am-secondary" type="button" onClick={showHint} disabled={hinted}><RollingText>Hint</RollingText></button>
          <button className="am-button am-tertiary" type="button" onClick={showAnswer}><RollingText>Show answer</RollingText></button>
        </>}
      </div>
      <p className="kn-v2-audio-status" role="status">{audio.message}</p>
      <Dialog open={exitOpen} onClose={() => setExitOpen(false)} returnFocusRef={exitTrigger} initialFocusRef={keepPracticing} labelledBy={exitTitleId} describedBy={exitDescId}>
        <div className="am-dialog-head"><h2 id={exitTitleId}>Leave this round?</h2><DialogClose><Icon name="close"/></DialogClose></div>
        <p id={exitDescId}>Your progress in this round will be lost.</p>
        <div className="kn-v2-dialog-actions">
          <button ref={keepPracticing} className="am-button am-primary" type="button" onClick={() => setExitOpen(false)}><RollingText>Keep practicing</RollingText></button>
          <button className="am-button am-secondary" type="button" onClick={() => { setExitOpen(false); discardRound(); }}><RollingText>Discard round</RollingText></button>
        </div>
      </Dialog>
    </div>}

    {phase === 'results' && <div className="kn-v2-results">
      <div className="kn-v2-results-meta"><span>Practice complete</span><span>{optionConfig.label}</span></div>
      <div className="kn-v2-result-grid">
        <section className="kn-v2-score" aria-labelledby="kn-v2-result-title">
          <p className="kn-v2-kicker">A little clearer, note by note.</p>
          <h2 id="kn-v2-result-title">Your round, at a glance.</h2>
          <p className="kn-v2-score-number"><strong>{independent}</strong><span>/ {finalRecords.length}</span></p>
          <p className="kn-v2-score-caption">correct on the first try</p>
          <p className="kn-v2-score-context">{labelsOn ? 'With labels' : 'Without labels'} · {optionConfig.label}</p>
          <div className="kn-v2-score-track" aria-label={`${independent} first try, ${assisted} with help, ${revealedCount} revealed`}>{finalRecords.map((record, answerIndex) => <span key={answerIndex} data-kind={record.kind}/>)}</div>
          {assisted > 0 && <p className="kn-v2-score-detail">{assisted} found after another try or a hint</p>}
          {revealedCount > 0 && <p className="kn-v2-score-detail">{revealedCount} {revealedCount === 1 ? 'answer' : 'answers'} revealed</p>}
        </section>
        <section className="kn-v2-review" aria-labelledby="kn-v2-review-title">
          <h2 id="kn-v2-review-title">{missed.length ? `Give ${missed.map(item => item.label).join(missed.length === 2 ? ' & ' : ', ')} another look.` : 'Nothing to review.'}</h2>
          <p>{missed.length ? 'A short review keeps the notes you needed help with in focus.' : 'Every note was found independently in this round.'}</p>
          {missed.length > 0 && <ul>{missed.map(item => <li key={item.midi}>{item.label}</li>)}</ul>}
          {missed.length > 0 && <button className="am-button am-primary kn-v2-review-button" type="button" onClick={() => { setSavedResult(finalRecords); startPractice(missed); }}><RollingText>{`Review ${missed.length} ${missed.length === 1 ? 'note' : 'notes'}`}</RollingText><Icon name="right"/></button>}
          <div className="kn-v2-result-actions">
            <button className="kn-v2-text-button" type="button" onClick={() => { setSavedResult(null); startPractice(); }}><RollingText>Practice again</RollingText></button>
            <button className="kn-v2-text-button" type="button" onClick={() => { discardRound(); onExplore(); }}><RollingText>Back to explore</RollingText></button>
          </div>
        </section>
      </div>
      {isReview && <p className="kn-v2-review-complete" role="status">Review complete. Your original result is unchanged.</p>}
      {isReview && <button className="am-button am-primary" type="button" onClick={returnToResults}><RollingText>Return to original results</RollingText></button>}
      <aside className="kn-v2-share-strip">
        <div><h3>Practice together</h3><p>Share a clean starting point for the same kind of note practice.</p></div>
        <button ref={shareTrigger} className="am-button am-secondary" type="button" onClick={() => setShareOpen(true)}><RollingText>Share practice</RollingText></button>
      </aside>
      <p className="kn-v2-result-note">This result describes the notes you recognized here, not your playing technique. Your score and answers are not included in the link.</p>
      <ShareDialog
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        returnFocusRef={shareTrigger}
        title="Invite someone to try it."
        description="The link opens a fresh 10-note round. Your answers and score stay private."
        url={practiceShareURL()}
        shareTitle="Piano note practice"
        copyLabel="Copy practice link"
        shareLabel="More sharing options"
        preview={<div className="kn-v2-share-preview"><span>{optionConfig.label}</span><span>{PRACTICE_LENGTH} notes</span></div>}
        onCopied={(_url, ok) => emitKeyboardPracticeEvent('keyboard_practice_share_copy', { status: ok ? 'copied' : 'unavailable' })}
        onNative={status => emitKeyboardPracticeEvent('keyboard_practice_share_native', { status })}
      />
    </div>}
  </section>;
}

function useCompactViewport() {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(max-width: 47.999rem)');
    const update = () => setCompact(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return compact;
}

function syncPracticeURL(next: Mode) {
  if (typeof window === 'undefined') return;
  const url = new URL(window.location.href);
  if (next === 'practice') {
    if (!isPracticeEntryHash(url.hash)) {
      url.hash = PRACTICE_ENTRY_HASH.slice(1);
      window.history.replaceState(null, '', `${url.pathname}${url.search}${PRACTICE_ENTRY_HASH}`);
    }
    return;
  }
  if (isPracticeEntryHash(url.hash)) {
    window.history.replaceState(null, '', `${url.pathname}${url.search}`);
  }
}

function readLocationMode(): { mode: Mode; sharedPreset: PracticePresetRestore; scrollPractice: boolean } {
  const restored = restorePracticePreset(new URLSearchParams(window.location.search));
  const hashPractice = isPracticeEntryHash(window.location.hash);
  if (restored.status !== 'none' || hashPractice) {
    return {
      mode: 'practice',
      sharedPreset: restored.status !== 'none' ? restored : { status: 'none', preset: null },
      scrollPractice: hashPractice && restored.status === 'none',
    };
  }
  return { mode: 'explore', sharedPreset: { status: 'none', preset: null }, scrollPractice: false };
}

export function KeyboardNotesWorkspace({ layouts }: { layouts: Layout[] }) {
  const [mode, setMode] = useState<Mode>('explore');
  const [hydrated, setHydrated] = useState(false);
  const [layoutID, setLayoutID] = useState(layouts.find(item => item.layout_id === '88-key-A0-C8')?.layout_id ?? layouts[0].layout_id);
  const [sharedPreset, setSharedPreset] = useState<PracticePresetRestore>({ status: 'none', preset: null });
  const layout = layouts.find(item => item.layout_id === layoutID) ?? layouts[0];
  const compact = useCompactViewport();

  useEffect(() => {
    const apply = (scroll = false) => {
      const next = readLocationMode();
      setSharedPreset(next.sharedPreset);
      setMode(next.mode);
      if (scroll || next.scrollPractice) {
        queueMicrotask(() => document.getElementById('note-trainer')?.scrollIntoView({ block: 'start' }));
      }
    };
    apply(true);
    setHydrated(true);
    const onHash = () => apply(true);
    const onPop = () => apply(false);
    const onShowMiddleC = () => {
      setMode('explore');
      syncPracticeURL('explore');
    };
    window.addEventListener('hashchange', onHash);
    window.addEventListener('popstate', onPop);
    window.addEventListener('pianogrid:show-middle-c', onShowMiddleC);
    return () => {
      window.removeEventListener('hashchange', onHash);
      window.removeEventListener('popstate', onPop);
      window.removeEventListener('pianogrid:show-middle-c', onShowMiddleC);
    };
  }, []);

  function changeMode(next: Mode) {
    setMode(next);
    syncPracticeURL(next);
  }

  return <div id="explore" className="kn-v2-shell" data-hydrated={hydrated ? 'true' : 'false'}>
    <noscript>
      <p className="kn-hub-noscript">Enable JavaScript to find and hear notes. You can still use the chart below.</p>
      <style>{`.kn-v2-shell button,.kn-v2-shell input,.kn-v2-shell select{pointer-events:none}`}</style>
    </noscript>
    <ModeTabs value={mode} onChange={changeMode} />
    <ExploreNotes layout={layout} layouts={layouts} active={mode === 'explore'} compact={compact} onLayoutChange={setLayoutID} />
    <PracticeNotes layout={layout} active={mode === 'practice'} sharedPreset={sharedPreset} onExplore={() => changeMode('explore')} />
  </div>;
}
