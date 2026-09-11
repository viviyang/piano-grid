import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Block, ChordDetailData, ChordDetailModel, ChordPractice, ChordQuality, Voicing } from './a-minor-types';
import { finalizeChordDetailModel, type ChordDetailRoute } from './chord-detail-model';
import { readMaster } from './site-content';
import { isPublicRoute } from './site-routes';

const packageRoot = resolve('docs/pianogrid-chords-next-expansion');
const detailRoot = resolve(packageRoot, '04_details_next');

type RawVoicing = {
  id: string; label: string; notes: string[]; midi: number[]; bass: string; symbol: string;
  keyboard_highlights: { midi: number; spelling: string }[];
  fingering: { right: null; left: null };
  playback: { simultaneous_midi: number[]; ascending_midi: number[]; descending_midi: number[]; user_initiated: boolean; audio_asset: null };
};
type RawDetail = {
  schema_version: string; url: ChordDetailRoute; release_batch: 'N1'; release_status: string; provenance: 'current_hub' | 'new_derived';
  title: string; description: string; h1: string; main_keyword: string; secondary_keywords: string[]; user_task: string;
  data: { root: string; quality: ChordQuality; symbol: string; aliases: string[]; pitch_classes: string[]; formula_degrees: string[]; semitones_from_root: number[]; voicings: RawVoicing[]; default_voicing: string; fingering_policy: string };
  content: { direct_answer: string; blocks: { id: string; heading: string; body: string }[]; faq: { q: string; a: string }[] };
  related_routes: string[];
};
type LinkPlan = { from: string; to: string; anchor: string }[];

export const EXPANSION_DETAIL_ROUTES = [
  '/chords/f-major','/chords/d-minor','/chords/e-minor','/chords/d-major','/chords/b-minor',
  '/chords/f-sharp-minor','/chords/c-sharp-minor','/chords/g-sharp-minor','/chords/b-flat-major','/chords/g-minor',
  '/chords/d-flat-major','/chords/e-flat-major','/chords/f-sharp-major','/chords/f-minor','/chords/b-flat-minor','/chords/e-flat-minor',
] as const satisfies readonly ChordDetailRoute[];

const expansionSet = new Set<string>(EXPANSION_DETAIL_ROUTES);
const rawDetails = new Map<string, RawDetail>();
for (const filename of readdirSync(detailRoot).filter(name => name.endsWith('.page.json'))) {
  const raw = JSON.parse(readFileSync(resolve(detailRoot, filename), 'utf8')) as RawDetail;
  rawDetails.set(raw.url, raw);
}
if (rawDetails.size !== EXPANSION_DETAIL_ROUTES.length || EXPANSION_DETAIL_ROUTES.some(url => !rawDetails.has(url))) throw new Error('Incomplete N1 chord detail package');
const linkPlan = JSON.parse(readFileSync(resolve(packageRoot, '06_internal_links/internal-links.N1.json'), 'utf8')) as LinkPlan;

export function isExpansionChordDetailRoute(url: string): url is (typeof EXPANSION_DETAIL_ROUTES)[number] { return expansionSet.has(url); }
export function getRawExpansionDetails() { return EXPANSION_DETAIL_ROUTES.map(url => rawDetails.get(url)!); }

const empty = (heading: string): Block['content'] => ({ heading, paragraphs: [], steps: [], table: null, links: [] });
const normalizeFormula = (value: string) => value.replace('♭', 'b');
const frequency = (midi: number) => 440 * 2 ** ((midi - 69) / 12);

function labelFor(url: string) {
  if (url === '/chords') return 'Browse the piano chord chart';
  if (url === '/chords/major') return 'Browse all major chords';
  if (url === '/chords/minor') return 'Browse all minor chords';
  if (url === '/chords/by-key') return 'See this chord in key context';
  if (url === '/chord-progressions') return 'Practice chord progressions';
  if (url === '/guide/piano-chords') return 'Learn how piano chords are built';
  return url;
}

export function getExpansionChordDetail(url: (typeof EXPANSION_DETAIL_ROUTES)[number]): ChordDetailModel {
  const raw = rawDetails.get(url)!;
  if (raw.schema_version !== 'next-expansion-1.0' || raw.release_batch !== 'N1' || raw.release_status !== 'ready_for_codex_integration') throw new Error(`Blocked N1 detail: ${url}`);
  if (raw.data.voicings.some(voicing => voicing.fingering.right !== null || voicing.fingering.left !== null)) throw new Error(`Unexpected fingering in N1 detail: ${url}`);
  const expectedFormula = raw.data.quality === 'major' ? ['1','3','5'] : ['1','b3','5'];
  if (JSON.stringify(raw.data.formula_degrees.map(normalizeFormula)) !== JSON.stringify(expectedFormula)) throw new Error(`N1 formula mismatch: ${url}`);
  const master = readMaster();
  const slug = url.split('/').at(-1)!;
  const contract = master.legacy_chords_support.playback_contract;
  const voicings: Voicing[] = raw.data.voicings.map(voicing => {
    if (JSON.stringify(voicing.midi) !== JSON.stringify(voicing.keyboard_highlights.map(item => item.midi)) || JSON.stringify(voicing.notes) !== JSON.stringify(voicing.keyboard_highlights.map(item => item.spelling))) throw new Error(`N1 keyboard mismatch: ${url}/${voicing.id}`);
    const events = (midis: number[], mode: 'together' | 'ascending') => midis.map((midi, index) => ({ midi, frequency_hz: frequency(midi), onset_ms: mode === 'together' ? 0 : contract.ascending_onsets_ms[index], duration_ms: mode === 'together' ? contract.together_duration_ms : contract.ascending_duration_ms }));
    return {
      voicing_id: `${slug}--${voicing.id}`, inversion_label: voicing.label, chord_symbol: voicing.symbol, bass_spelling: voicing.bass,
      notes_low_to_high: voicing.notes.map((display_pitch, index) => ({ display_pitch, midi: voicing.midi[index] })),
      diagram: { keyboard_range_midi: [48, 76], highlight_midi: [...voicing.midi], alt_text: `${raw.h1}, ${voicing.label}: ${voicing.notes.join(', ')} from low to high. Marked keys are the notes to play.` },
      playback: { together: events(voicing.playback.simultaneous_midi, 'together'), ascending: events(voicing.playback.ascending_midi, 'ascending') },
      print_data: { spelled_pitches: [...voicing.notes], highlight_midi: [...voicing.midi] },
    };
  });
  const data: ChordDetailData = {
    url, namespace: slug, toolId: `${slug}-result`, rangeLabel: 'C3–E5',
    pdf: { url: `/reference/assets/chord-${slug}.pdf`, label: `Download ${raw.data.root} ${raw.data.quality} PDF` },
    defaultId: `${slug}--${raw.data.default_voicing}`, options: voicings.map(voicing => ({ value: voicing.voicing_id, label: voicing.inversion_label })),
    chord: { id: slug, slug, name_en: `${raw.data.root} ${raw.data.quality}`, symbol: raw.data.symbol, root_spelling: raw.data.root, quality: raw.data.quality, note_spellings: [...raw.data.pitch_classes], formula_degrees: expectedFormula },
    voicings, whitePitchClasses: master.legacy_chords_support.shared_data.conventions.white_pitch_classes,
    microcopy: master.pages['/chords/a-minor'].microcopy,
    heading: raw.h1, toolHeading: `${raw.data.root} ${raw.data.quality} keyboard and inversions`,
    printDisclaimer: 'The marked keys show pitches, not a hand shape or a required fingering.', fingeringStatus: 'not_provided',
  };
  const [notesBlock, formulaBlock, inversionBlock] = raw.content.blocks;
  if (raw.content.blocks.length !== 3 || notesBlock.id !== 'notes-and-keyboard' || formulaBlock.id !== 'formula' || inversionBlock.id !== 'inversions') throw new Error(`Unexpected N1 content blocks: ${url}`);
  const related = new Map<string, { label: string; url: string; published: boolean }>();
  for (const target of raw.related_routes) if (isPublicRoute(target)) related.set(target, { url: target, label: labelFor(target), published: true });
  for (const edge of linkPlan.filter(item => item.from === url)) if (isPublicRoute(edge.to)) related.set(edge.to, { url: edge.to, label: edge.anchor, published: true });
  const category = raw.data.quality === 'major' ? '/chords/major' : '/chords/minor';
  related.set(category, { url: category, label: raw.data.quality === 'major' ? 'Browse all major chords' : 'Browse all minor chords', published: true });
  const blocks: Block[] = [
    { block_id: `${slug}-intro`, content: { ...empty(raw.h1), paragraphs: [notesBlock.body] } },
    { block_id: data.toolId, content: { ...empty(data.toolHeading), paragraphs: ['Choose a position to keep the keyboard diagram, note order, bass note, playback and print reference synchronized.'] } },
    { block_id: `${slug}-formula`, content: { ...empty(formulaBlock.heading), paragraphs: [formulaBlock.body] } },
    { block_id: `${slug}-inversions`, content: { ...empty(inversionBlock.heading), paragraphs: [inversionBlock.body], table: { columns: ['Position','Symbol','Notes, low to high','Bass'], rows: voicings.map(voicing => [voicing.inversion_label, voicing.chord_symbol, voicing.notes_low_to_high.map(note => note.display_pitch).join('–'), voicing.bass_spelling]) } } },
    { block_id: `${slug}-fingering-example`, content: { ...empty('Fingering is not provided for this reference'), paragraphs: ['No verified hand-number examples are provided for this chord. The chord tones, written spelling, keyboard positions, playback and print reference remain available without assigning a fingering.'], links: isPublicRoute('/keyboard-notes/finger-numbers') ? [{ url: '/keyboard-notes/finger-numbers', label: 'Read left- and right-hand finger numbers', published: true }] : [] } },
    { block_id: `${slug}-questions`, content: { ...empty('Questions about this chord'), table: { columns: ['Question','Answer'], rows: raw.content.faq.map(item => [item.q, item.a]) } } },
  ];
  const practice: ChordPractice = { id: 'practice', heading: `Build ${raw.data.symbol} on the keyboard`, prompt: `Select the three pitch classes that make ${raw.data.root} ${raw.data.quality}, then check your answer.`, scope: 'This one-octave exercise checks pitch classes. Order and octave do not affect the result; fingering and live performance are not assessed.' };
  blocks.push({ block_id: practice.id, content: { ...empty(practice.heading), paragraphs: [practice.prompt, practice.scope] } });
  blocks.push({ block_id: `${slug}-print`, content: empty('Print this chord reference') });
  blocks.push({ block_id: `${slug}-related`, content: { ...empty('Related chord references'), links: [...related.values()] } });
  const byId = Object.fromEntries(blocks.map(block => [block.block_id, block]));
  return finalizeChordDetailModel({
    metadata: { title: raw.title, description: raw.description, canonical_path: url }, data, blocks, byId,
    answer: raw.content.direct_answer, introduction: [], fingeringExamples: [], sources: [], practice,
    searchSections: blocks.filter(block => block.block_id !== `${slug}-intro`).map(block => ({ id: block.block_id, heading: block.content.heading, text: JSON.stringify(block.content) })),
    tocItems: [{ id: data.toolId, label: 'Chord & positions' }, ...blocks.filter(block => ![`${slug}-intro`, data.toolId].includes(block.block_id)).map(block => ({ id: block.block_id, label: block.content.heading }))],
  });
}
