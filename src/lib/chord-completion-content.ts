import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { CenterItem } from './chord-content';
import { N2B_DETAIL_ROUTES, getN2BChordDetail } from './chord-n2b-content';
import { N2C_DETAIL_ROUTES, getN2CChordDetail } from './chord-n2c-content';
import { N2D_DETAIL_ROUTES, getN2DChordDetail } from './chord-n2d-content';

export type CompletionFamily = 'extended' | 'altered' | 'power' | 'sixth' | 'seventh' | 'suspended';
export type CompletionRealization = {
  id: string; label: string; purpose: string; symbol: string; displayNote: string;
  notes: string[]; midi: number[]; realizedDegrees: string[]; omittedDegrees: string[]; doubledDegrees: string[];
  bass: { spelling: string; midi: number; formulaDegree: string };
  keyboard: { minMidi: number; maxMidi: number };
  audio: { block: { midi: number; onsetMs: number; durationMs: number }[]; ascending: { midi: number; onsetMs: number; durationMs: number }[] };
};
export type CompletionReference = {
  id: string; family: string; subtype: string; name: string; root: string; rootPitchClass: number; symbol: string; aliases: string[];
  destination: string; detailURL: string | null;
  definition: { formulaDegrees: string[]; displayFormula: string[]; toneSpellings: string[]; pitchClassIntervals: number[]; uniquePitchClassCount: number };
  realizations: CompletionRealization[]; defaultRealizationId: string; content: { id: string; heading: string; paragraphs: string[] }[];
  practiceModes: string[]; sourceIDs: string[]; teacherReviewed: boolean;
};
type Raw = Record<string, any>;

const root = resolve('docs/pianogrid-chords-completion');
const read = (name: string) => JSON.parse(readFileSync(resolve(root, name), 'utf8')) as Raw[];
const rawNew = [...read('04_music/extended.objects.json'), ...read('04_music/altered.objects.json'), ...read('04_music/supplement.objects.json')];
const natural: Record<string, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
const accidental: Record<string, number> = { '': 0, '#': 1, 'b': -1, '##': 2, 'bb': -2 };
const ascii = (value: string) => value.replaceAll('𝄪', '##').replaceAll('𝄫', 'bb').replaceAll('♯', '#').replaceAll('♭', 'b');
export function completionPitchClass(value: string) {
  const match = /^([A-G])(##|bb|#|b)?/.exec(ascii(value));
  if (!match) throw new Error(`Invalid completion note: ${value}`);
  return (natural[match[1]] + accidental[match[2] || ''] + 24) % 12;
}
const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);
const sorted = (values: number[]) => [...new Set(values)].sort((a, b) => a - b);

function adapt(raw: Raw): CompletionReference {
  if (raw.schemaVersion !== 'chords-completion-1.0' || raw.publication !== 'embedded_reference_no_new_detail_URL' || raw.navigation.detailUrl !== null) throw new Error(`Blocked completion object: ${raw.id}`);
  const d = raw.definition;
  const definitionPcs = d.toneSpellings.map((note: string) => completionPitchClass(note));
  const expectedPcs = d.pitchClassIntervals.map((interval: number) => (raw.rootPitchClass + interval) % 12);
  if (!same(definitionPcs, expectedPcs) || new Set(definitionPcs).size !== d.uniquePitchClassCount || d.formulaDegrees.length !== d.toneSpellings.length) throw new Error(`Definition mismatch: ${raw.id}`);
  const realizations: CompletionRealization[] = raw.realizations.map((item: Raw): CompletionRealization => {
    const noteMidis = [...item.midiLowToHigh] as number[];
    if(item.notesLowToHigh.some((note:string,index:number)=>!/-?\d+$/.test(note)||completionPitchClass(note)!==((noteMidis[index]%12)+12)%12))throw new Error(`Written pitch/MIDI mismatch: ${raw.id}/${item.id}`);
    const keyboardMidi = item.keyboard.highlights.map((x: Raw) => x.midi);
    if (!same(noteMidis, item.midiLowToHigh) || !same(noteMidis, keyboardMidi) || !same(noteMidis, item.audio.block.map((x: Raw) => x.midi)) || !same(noteMidis, item.audio.ascending.map((x: Raw) => x.midi)) || !same(item.notesLowToHigh, item.printPitches)) throw new Error(`Output drift: ${raw.id}/${item.id}`);
    const realizedPcs = sorted(noteMidis.map((midi: number) => midi % 12));
    const declaredPcs = sorted(item.realizedDegrees.map((degree: string) => definitionPcs[d.formulaDegrees.indexOf(degree)]));
    if (!same(realizedPcs, declaredPcs) || item.omittedDegrees.some((degree: string) => !d.formulaDegrees.includes(degree)) || item.fingering.status !== 'not_provided') throw new Error(`Realization mismatch: ${raw.id}/${item.id}`);
    if (item.bass.midi !== noteMidis[0] || item.bass.spelling !== item.notesLowToHigh[0].replace(/-?\d+$/, '') || noteMidis.some((midi: number) => midi < item.keyboard.minMidi || midi > item.keyboard.maxMidi)) throw new Error(`Bass/range mismatch: ${raw.id}/${item.id}`);
    return { id: item.id, label: item.label, purpose: item.purpose, symbol: item.symbol, displayNote: item.displayNote, notes: [...item.notesLowToHigh], midi: [...item.midiLowToHigh], realizedDegrees: [...item.realizedDegrees], omittedDegrees: [...item.omittedDegrees], doubledDegrees: [...item.doubledDegrees], bass: { spelling: item.bass.spelling, midi: item.bass.midi, formulaDegree: item.bass.formulaDegree }, keyboard: { minMidi: item.keyboard.minMidi, maxMidi: item.keyboard.maxMidi }, audio: { block: item.audio.block.map((x: Raw) => ({ ...x })), ascending: item.audio.ascending.map((x: Raw) => ({ ...x })) } };
  });
  if (!realizations.some(item => item.id === raw.realizationPolicy.default)) throw new Error(`Missing default realization: ${raw.id}`);
  return { id: raw.id, family: raw.family, subtype: raw.subtype, name: raw.name, root: raw.rootSpelling, rootPitchClass: raw.rootPitchClass, symbol: raw.symbol, aliases: [...raw.aliases], destination: raw.navigation.destination, detailURL: null, definition: { formulaDegrees: [...d.formulaDegrees], displayFormula: [...d.displayFormula], toneSpellings: [...d.toneSpellings], pitchClassIntervals: [...d.pitchClassIntervals], uniquePitchClassCount: d.uniquePitchClassCount }, realizations, defaultRealizationId: raw.realizationPolicy.default, content: raw.content.map((x: Raw) => ({ id: x.id, heading: x.heading, paragraphs: [...x.paragraphs] })), practiceModes: [...raw.practice.modes], sourceIDs: [...raw.sources], teacherReviewed: raw.review.independentTeacherReviewed };
}

export const COMPLETION_REFERENCES = rawNew.map(adapt);
if (COMPLETION_REFERENCES.length !== 288 || new Set(COMPLETION_REFERENCES.map(item => item.id)).size !== 288) throw new Error('Completion reference count/identity mismatch');
export const EXTENDED_REFERENCES = COMPLETION_REFERENCES.filter(item => item.family === 'extended');
export const ALTERED_REFERENCES = COMPLETION_REFERENCES.filter(item => item.family === 'altered');
export const SUPPLEMENT_REFERENCES = COMPLETION_REFERENCES.filter(item => !['extended', 'altered'].includes(item.family));
if (EXTENDED_REFERENCES.length !== 108 || ALTERED_REFERENCES.length !== 96 || SUPPLEMENT_REFERENCES.length !== 84) throw new Error('Completion family count mismatch');

function legacyFromModel(model: ReturnType<typeof getN2BChordDetail> | ReturnType<typeof getN2CChordDetail> | ReturnType<typeof getN2DChordDetail>): CompletionReference {
  const data = model.data, voicings = data.voicings;
  return { id: data.chord.id, family: data.chord.definition.family, subtype: data.chord.quality, name: data.chord.name_en, root: data.chord.root_spelling, rootPitchClass: completionPitchClass(data.chord.root_spelling), symbol: data.chord.symbol, aliases: [data.chord.symbol, data.chord.name_en], destination: data.url, detailURL: data.url, definition: { formulaDegrees: [...data.chord.formula_degrees], displayFormula: data.chord.formula_degrees.map(value => value.replace('b', '♭').replace('#', '♯')), toneSpellings: [...data.chord.note_spellings], pitchClassIntervals: data.chord.note_spellings.map(note => (completionPitchClass(note) - completionPitchClass(data.chord.root_spelling) + 12) % 12), uniquePitchClassCount: data.chord.note_spellings.length }, realizations: voicings.map(voicing => ({ id: voicing.voicing_id, label: voicing.inversion_label, purpose: 'published_detail_example', symbol: voicing.chord_symbol, displayNote: '', notes: voicing.notes_low_to_high.map(note => note.display_pitch), midi: voicing.notes_low_to_high.map(note => note.midi), realizedDegrees: [...data.chord.formula_degrees], omittedDegrees: [], doubledDegrees: [], bass: { spelling: voicing.bass_spelling.replace(/-?\d+$/, ''), midi: voicing.notes_low_to_high[0].midi, formulaDegree: voicing.position.bassDegree }, keyboard: { minMidi: voicing.diagram.keyboard_range_midi[0], maxMidi: voicing.diagram.keyboard_range_midi[1] }, audio: { block: voicing.playback.together.map(event => ({ midi: event.midi, onsetMs: event.onset_ms, durationMs: event.duration_ms })), ascending: voicing.playback.ascending.map(event => ({ midi: event.midi, onsetMs: event.onset_ms, durationMs: event.duration_ms })) } })), defaultRealizationId: data.defaultId, content: [], practiceModes: ['formula_pitch_classes'], sourceIDs: model.sources.map(source => source.id), teacherReviewed: false };
}

export function getSupportedChordRegistry(core: CenterItem[]) {
  const legacyCore: CompletionReference[] = core.map(item => ({ id: item.id, family: 'triad', subtype: item.quality, name: item.name, root: item.root, rootPitchClass: completionPitchClass(item.root), symbol: item.voicing.chord_symbol, aliases: [item.voicing.chord_symbol, item.name], destination: item.url || '/chords', detailURL: item.url, definition: { formulaDegrees: [...item.formula], displayFormula: item.formula.map(value => value.replace('b', '♭').replace('#', '♯')), toneSpellings: [...item.tones], pitchClassIntervals: item.tones.map(note => (completionPitchClass(note) - completionPitchClass(item.root) + 12) % 12), uniquePitchClassCount: item.tones.length }, realizations: [{ id: item.voicing.voicing_id, label: item.voicing.inversion_label, purpose: 'published_detail_example', symbol: item.voicing.chord_symbol, displayNote: '', notes: item.voicing.notes_low_to_high.map(note => note.display_pitch), midi: item.voicing.notes_low_to_high.map(note => note.midi), realizedDegrees: [...item.formula], omittedDegrees: [], doubledDegrees: [], bass: { spelling: item.voicing.bass_spelling.replace(/-?\d+$/, ''), midi: item.voicing.notes_low_to_high[0].midi, formulaDegree: '1' }, keyboard: { minMidi: item.voicing.diagram.keyboard_range_midi[0], maxMidi: item.voicing.diagram.keyboard_range_midi[1] }, audio: { block: item.voicing.playback.together.map(event => ({ midi: event.midi, onsetMs: event.onset_ms, durationMs: event.duration_ms })), ascending: item.voicing.playback.ascending.map(event => ({ midi: event.midi, onsetMs: event.onset_ms, durationMs: event.duration_ms })) } }], defaultRealizationId: item.voicing.voicing_id, content: [], practiceModes: ['formula_pitch_classes'], sourceIDs: [], teacherReviewed: false }));
  const legacy = [...N2B_DETAIL_ROUTES.map(route => legacyFromModel(getN2BChordDetail(route))), ...N2C_DETAIL_ROUTES.map(route => legacyFromModel(getN2CChordDetail(route))), ...N2D_DETAIL_ROUTES.map(route => legacyFromModel(getN2DChordDetail(route)))];
  const map = new Map([...legacyCore, ...legacy, ...COMPLETION_REFERENCES].map(item => [item.id, item]));
  if (map.size !== 433) throw new Error(`Supported chord registry expected 433 objects, received ${map.size}`);
  return [...map.values()];
}

type PageRaw = { url: '/chords/extended' | '/chords/altered'; title: string; description: string; h1: string; defaultObjectId: string; sections: { id: string; heading: string; paragraphs: string[] }[]; sourceIds: string[] };
export function getCompletionCategory(family: 'extended' | 'altered') {
  const page = JSON.parse(readFileSync(resolve(root, `03_content/${family}.page.json`), 'utf8')) as PageRaw;
  const items = family === 'extended' ? EXTENDED_REFERENCES : ALTERED_REFERENCES;
  if (page.url !== `/chords/${family}` || !items.some(item => item.id === page.defaultObjectId)) throw new Error(`Invalid ${family} category page`);
  return { ...page, items, canonicalPath: page.url, roots: [...new Set(items.map(item => item.root))], subtypes: [...new Set(items.map(item => item.subtype))], pdf: `/reference/assets/chords-${family}-starter-reference.pdf` };
}
