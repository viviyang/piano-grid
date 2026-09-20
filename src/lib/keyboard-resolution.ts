import type { Layout, PianoKey } from './keyboard-types';

export type KeyboardLayoutCode = '88' | '61';
export type SelectionSource = 'keyboard_click' | 'text_query' | 'staff_click' | 'practice' | 'share_restore';
export type RequestedSpelling = {
  letter: string;
  accidental: '#' | 'b' | null;
  writtenOctave: number;
  display: string;
};
export type PitchSelection = {
  midi: number;
  keyId: string;
  layoutId: KeyboardLayoutCode;
  source: SelectionSource;
  requestedSpelling: RequestedSpelling;
  physicalKeyLabel: string;
  staffSpelling: string;
  equivalentLabels: string[];
};
export type LookupCandidate = { display: string; midi: number; keyId: string };
export type LookupResolution = {
  rawInput: string;
  status: 'selected' | 'choose_octave' | 'outside_range' | 'invalid';
  normalizedPitchClass: string | null;
  displaySpelling: string | null;
  candidates: LookupCandidate[];
  selected: PitchSelection | null;
  messageKey: 'empty' | 'invalid' | 'compound' | 'choose_octave' | 'outside_range' | null;
};

const NATURAL_PITCH_CLASS: Record<string, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

export function layoutCode(layout: Layout): KeyboardLayoutCode {
  return layout.layout_id === '61-key-C2-C7' ? '61' : '88';
}

export function displayNote(note: string) {
  return note.replaceAll('#', '♯').replaceAll('b', '♭');
}

export function asciiNote(note: string) {
  return note.replaceAll('♯', '#').replaceAll('♭', 'b');
}

type Parsed = { letter: string; accidental: '#' | 'b' | null; octave: number | null; displayPitchClass: string };

export function parseNoteInput(rawInput: string): Parsed | null {
  const raw = rawInput.trim();
  if (!raw) return null;
  const match = /^([A-Ga-g])(?:\s*[- ]?\s*(sharp|flat)|\s*([#♯b♭]))?\s*(-?\d+)?$/i.exec(raw);
  if (!match) return null;
  const letter = match[1].toUpperCase();
  const word = match[2]?.toLowerCase();
  const glyph = match[3];
  const accidental = word === 'sharp' || glyph === '#' || glyph === '♯' ? '#' : word === 'flat' || glyph === 'b' || glyph === '♭' ? 'b' : null;
  return { letter, accidental, octave: match[4] === undefined ? null : Number(match[4]), displayPitchClass: `${letter}${accidental ? displayNote(accidental) : ''}` };
}

export function midiForSpelling(letter: string, accidental: '#' | 'b' | null, writtenOctave: number) {
  return 12 * (writtenOctave + 1) + NATURAL_PITCH_CLASS[letter] + (accidental === '#' ? 1 : accidental === 'b' ? -1 : 0);
}

function requested(parsed: Parsed, octave: number): RequestedSpelling {
  return { letter: parsed.letter, accidental: parsed.accidental, writtenOctave: octave, display: `${parsed.displayPitchClass}${octave}` };
}

function selection(layout: Layout, key: PianoKey, spelling: RequestedSpelling, source: SelectionSource): PitchSelection {
  const wanted = asciiNote(spelling.display);
  return {
    midi: key.midi,
    keyId: key.key_id,
    layoutId: layoutCode(layout),
    source,
    requestedSpelling: spelling,
    physicalKeyLabel: displayNote(key.label_with_octave),
    staffSpelling: spelling.display,
    equivalentLabels: key.lookup_spellings.filter(label => label !== wanted).map(displayNote),
  };
}

export function resolveLookup(rawInput: string, layout: Layout, source: SelectionSource = 'text_query'): LookupResolution {
  const raw = rawInput.trim();
  if (!raw) return { rawInput, status: 'invalid', normalizedPitchClass: null, displaySpelling: null, candidates: [], selected: null, messageKey: 'empty' };
  if (/\b(?:major|minor|chord|scale|arpeggio)\b/i.test(raw)) return { rawInput, status: 'invalid', normalizedPitchClass: null, displaySpelling: null, candidates: [], selected: null, messageKey: 'compound' };
  const parsed = parseNoteInput(raw);
  if (!parsed || (parsed.octave !== null && !Number.isInteger(parsed.octave))) return { rawInput, status: 'invalid', normalizedPitchClass: null, displaySpelling: null, candidates: [], selected: null, messageKey: 'invalid' };
  if (parsed.octave === null) {
    const candidates: LookupCandidate[] = [];
    for (let octave = -1; octave <= 9; octave += 1) {
      const midi = midiForSpelling(parsed.letter, parsed.accidental, octave);
      const key = layout.keys.find(item => item.midi === midi);
      if (key) candidates.push({ display: `${parsed.displayPitchClass}${octave}`, midi, keyId: key.key_id });
    }
    return { rawInput, status: candidates.length ? 'choose_octave' : 'outside_range', normalizedPitchClass: asciiNote(parsed.displayPitchClass), displaySpelling: parsed.displayPitchClass, candidates, selected: null, messageKey: candidates.length ? 'choose_octave' : 'outside_range' };
  }
  const midi = midiForSpelling(parsed.letter, parsed.accidental, parsed.octave);
  const key = layout.keys.find(item => item.midi === midi);
  if (!key) return { rawInput, status: 'outside_range', normalizedPitchClass: asciiNote(parsed.displayPitchClass), displaySpelling: `${parsed.displayPitchClass}${parsed.octave}`, candidates: [], selected: null, messageKey: 'outside_range' };
  const selected = selection(layout, key, requested(parsed, parsed.octave), source);
  return { rawInput, status: 'selected', normalizedPitchClass: asciiNote(parsed.displayPitchClass), displaySpelling: selected.requestedSpelling.display, candidates: [], selected, messageKey: null };
}

export function selectCandidate(candidate: LookupCandidate, rawInput: string, layout: Layout, source: SelectionSource = 'text_query') {
  return resolveLookup(candidate.display, layout, source);
}

export function selectPianoKey(key: PianoKey, layout: Layout, preferFlat = false, source: SelectionSource = 'keyboard_click'): PitchSelection {
  const primary = key.label_with_octave.split(' / ');
  const name = primary[preferFlat ? primary.length - 1 : 0];
  const parsed = parseNoteInput(name);
  if (!parsed || parsed.octave === null) throw new Error(`Invalid canonical key spelling: ${name}`);
  return selection(layout, key, requested(parsed, parsed.octave), source);
}

export function lookupMessage(resolution: LookupResolution, layout: Layout) {
  if (resolution.messageKey === 'choose_octave') return `${resolution.displaySpelling} appears in more than one octave on this keyboard. Choose the pitch you want.`;
  if (resolution.messageKey === 'outside_range') return `${resolution.displaySpelling ?? resolution.rawInput.trim()} is outside this ${layout.label} reference (${layout.lowest_note}–${layout.highest_note}). Choose another note or switch keyboard range.`;
  if (resolution.messageKey === 'compound') return 'This finder locates one piano note at a time. For a chord or scale, use the Chords or Scales reference.';
  return 'Use a letter A–G, an optional sharp or flat, and an optional octave. Try C, F3, A-flat, or B♯3.';
}

export function lookupHubMessage(resolution: LookupResolution, layout: Layout) {
  if (resolution.messageKey === 'empty') return 'Enter a note, such as C4 or F♯3.';
  if (resolution.messageKey === 'choose_octave') return `Choose an octave for ${resolution.displaySpelling}.`;
  if (resolution.messageKey === 'outside_range') return `${resolution.displaySpelling ?? resolution.rawInput.trim()} is outside this keyboard’s ${layout.lowest_note}–${layout.highest_note} range.`;
  if (resolution.messageKey === 'invalid' || resolution.messageKey === 'compound') return 'Use a note from A to G, such as C4 or F♯3.';
  return 'Use a note name and octave to find one exact key.';
}

export function spokenPianoKeyName(key: PianoKey) {
  const names = key.label_with_octave.split(' / ').map(spellSpoken);
  const color = key.color === 'black' ? 'black key' : 'white key';
  return [names.join(', '), key.midi === 60 ? 'middle C' : null, color].filter(Boolean).join(', ');
}

function spellSpoken(label: string) {
  const parsed = parseNoteInput(label);
  if (!parsed || parsed.octave === null) return displayNote(label).replaceAll('♯', ' sharp ').replaceAll('♭', ' flat ');
  const accidental = parsed.accidental === '#' ? ' sharp' : parsed.accidental === 'b' ? ' flat' : '';
  return `${parsed.letter}${accidental} ${parsed.octave}`;
}

export function blackKeyNeighborDescription(key: PianoKey, layout: Layout) {
  const whites = layout.keys.filter(item => item.color === 'white');
  const left = [...whites].reverse().find(item => item.midi < key.midi);
  const right = whites.find(item => item.midi > key.midi);
  if (!left || !right) return 'Black key · A sharp or flat note';
  const leftName = displayNote(left.label_with_octave.split(' / ')[0]);
  const rightName = displayNote(right.label_with_octave.split(' / ')[0]);
  return `Black key between ${leftName} and ${rightName}.`;
}

export function lookupShareParams(layout: Layout, selected: PitchSelection | null) {
  const params = new URLSearchParams({ layout: layoutCode(layout) });
  if (selected) params.set('note', asciiNote(selected.requestedSpelling.display));
  return params;
}

export function restoreLookup(params: URLSearchParams, layouts: Layout[]) {
  const requestedLayout = params.get('layout') === '61' ? '61' : '88';
  const layout = layouts.find(item => layoutCode(item) === requestedLayout) ?? layouts[0];
  const note = params.get('note');
  const resolution = note ? resolveLookup(note, layout, 'share_restore') : null;
  return {
    layout,
    resolution: resolution?.status === 'selected' ? resolution : null,
    invalidNote: Boolean(note) && resolution?.status !== 'selected',
  };
}
