import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { readAuthorizedPage } from './site-content';
import { isPublicRoute } from './site-routes';

export type SupportRoute = '/guide/piano-chords' | '/keyboard-notes/finger-numbers' | '/chords/by-key' | '/chord-progressions' | '/chords/finder';
export type SupportLink = { id: string; url: string; label: string; placement: string };
export type SupportTable = { columns: string[]; rows: string[][] } | null;
export type SupportBlock = {
  id: string;
  heading: string;
  paragraphs: string[];
  steps: string[];
  table: SupportTable;
  sourceIDs: string[];
  originalBlocks: { heading: string; body: string }[];
};
type Raw = Record<string, any>;
type LinkEdge = { id: string; from: string; href: string; anchor: string; placement: string };

const packageRoot = resolve('docs/pianogrid-chords-content-next');
const modules = JSON.parse(readFileSync(resolve(packageRoot, '02_content/support.modules.json'), 'utf8')) as Record<SupportRoute, Raw>;
const seo = JSON.parse(readFileSync(resolve(packageRoot, '01_planning/url-seo-keywords.master.json'), 'utf8')) as { pages: Raw[] };
const linkPlan = JSON.parse(readFileSync(resolve(packageRoot, '01_planning/internal-links.json'), 'utf8')) as { edges: LinkEdge[] };

function requiredString(value: unknown, label: string) {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`Missing ${label}`);
  return value;
}

function pathOf(href: string) {
  const index = href.indexOf('#');
  return index < 0 ? href : href.slice(0, index);
}

export function plannedLinksFor(url: string, allowedIDs?: ReadonlySet<string>): SupportLink[] {
  return linkPlan.edges
    .filter(edge => edge.from === url && (!allowedIDs || allowedIDs.has(edge.id)) && isPublicRoute(pathOf(edge.href)))
    .map(edge => ({ id: edge.id, url: edge.href, label: edge.anchor, placement: edge.placement }));
}

function mergeBlocks(url: SupportRoute, page: Raw): SupportBlock[] {
  const prepared = modules[url];
  if (!prepared || prepared.runtime_status !== 'not_implemented_by_this_pack') throw new Error(`Missing prepared modules: ${url}`);
  const rawByTarget: Record<SupportRoute, Record<string, Raw[]>> = {
    '/guide/piano-chords': {
      'start-here': [page.blocks[0]],
      'read-a-symbol': [page.blocks[1]],
      'first-change': [page.blocks[2]],
    },
    '/keyboard-notes/finger-numbers': {
      'quick-answer': [page.blocks.find((block: Raw) => block.id === 'mapping')],
      'read-the-chart': [page.blocks.find((block: Raw) => block.id === 'orientation')],
      'not-key-numbers': [page.blocks.find((block: Raw) => block.id === 'not-keys')],
      'three-number-systems': [page.blocks.find((block: Raw) => block.id === 'degrees')],
      'self-check': [page.blocks.find((block: Raw) => block.id === 'check')],
    },
    '/chords/by-key': {
      'read-degrees': [page.blocks[0]],
      'minor-options': [page.blocks[1]],
      'build-a-row': [page.blocks[2]],
    },
    '/chord-progressions': {
      'start-with-c': [page.blocks[0]],
      'three-patterns': [page.blocks[1], page.blocks[2]],
    },
    '/chords/finder': {
      'how-to-enter': [page.blocks[0]],
      'multiple-names': [page.blocks[1]],
      'no-match': [page.blocks[2]],
    },
  };
  const seen = new Set<Raw>();
  const blocks = prepared.supplemental_blocks.map((block: Raw): SupportBlock => {
    const originals = (rawByTarget[url][block.block_id] || []).filter(Boolean);
    originals.forEach(original => seen.add(original));
    const content = block.content;
    return {
      id: requiredString(block.block_id, `${url}.block_id`),
      heading: requiredString(content.heading, `${url}.heading`),
      paragraphs: content.paragraphs.map((value: unknown) => requiredString(value, `${url}.paragraph`)),
      steps: content.steps.map((value: unknown) => requiredString(value, `${url}.step`)),
      table: content.table ? {
        columns: content.table.columns.map((value: unknown) => requiredString(value, `${url}.table.column`)),
        rows: content.table.rows.map((row: unknown[]) => row.map(value => requiredString(value, `${url}.table.cell`))),
      } : null,
      sourceIDs: [...block.source_ids],
      originalBlocks: originals.map(original => ({ heading: requiredString(original.heading, `${url}.original.heading`), body: requiredString(original.body, `${url}.original.body`) })),
    };
  });
  if (seen.size !== page.blocks.length) throw new Error(`Original support blocks were not merged exactly once: ${url}`);
  return blocks;
}

function base(url: SupportRoute) {
  const { page } = readAuthorizedPage(url);
  const planned = seo.pages.find(item => item.url === url);
  const prepared = modules[url];
  if (!planned || planned.canonical !== `https://pianogrid.com${url}`) throw new Error(`Missing planned SEO record: ${url}`);
  if (planned.title !== page.metadata?.title || planned.description !== page.metadata?.description || planned.h1 !== prepared.h1) throw new Error(`SEO/content mismatch: ${url}`);
  if (planned.meta_keywords !== null) throw new Error(`Unexpected meta keywords: ${url}`);
  return {
    url,
    title: requiredString(prepared.h1, `${url}.h1`),
    description: requiredString(page.description, `${url}.description`),
    scope: requiredString(prepared.scope, `${url}.scope`),
    metadata: { title: planned.title as string, description: planned.description as string, canonicalPath: url },
    blocks: mergeBlocks(url, page),
    links: plannedLinksFor(url),
    sourceIDs: [...page.source_ids] as string[],
    primaryKeyword: planned.primary_keyword_original as string,
  };
}

export function getPianoChordsGuide() {
  const { page } = readAuthorizedPage('/guide/piano-chords');
  const model = base('/guide/piano-chords');
  if (page.data.finger_diagram !== null || page.data.transition_fingering !== null) throw new Error('Unsupported guide asset or transition fingering');
  if (page.data.starter_chords.length !== 4 || page.data.transition_voicings.length !== 3) throw new Error('Incomplete piano-chords guide data');
  return { model, data: page.data as {
    starter_chords: { name: string; notes: string[] }[];
    verified_fingering_example: { hand: 'right'; notes: string[]; fingers: number[]; scope: string };
    transition_voicings: string[][];
    reference_url: string;
    professional_review: string;
  } };
}

export function getFingerNumbersReference() {
  const { page } = readAuthorizedPage('/keyboard-notes/finger-numbers');
  const model = base('/keyboard-notes/finger-numbers');
  if (page.data.diagram_contract.svg_or_image_asset !== null || page.data.print.pdf_asset !== null) throw new Error('Finger-number page must not expose a missing asset');
  if (page.data.hands.length !== 2 || page.data.hands.some((hand: Raw) => hand.fingers.length !== 5)) throw new Error('Incomplete hand mapping');
  const left = page.data.hands.find((hand: Raw) => hand.hand === 'left');
  const right = page.data.hands.find((hand: Raw) => hand.hand === 'right');
  if (left.diagram.fingertip_numbers_left_to_right.join() !== '5,4,3,2,1' || right.diagram.fingertip_numbers_left_to_right.join() !== '1,2,3,4,5') throw new Error('Invalid player-view hand ordering');
  return { model, data: page.data as {
    hands: { hand: 'left' | 'right'; abbreviation: 'LH' | 'RH'; label: string; fingers: { number: number; name: string; aliases: string[] }[]; diagram: { fingertip_numbers_left_to_right: number[]; view: string } }[];
    diagram_contract: { shared_caption: string; pair_geometry: string };
    number_system_comparison: { system: string; example: string; meaning: string }[];
    reading_examples: { instruction: string; answer: string }[];
  } };
}

const pitchClasses: Record<string, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
function pitchClass(note: string) {
  const match = /^([A-G])([#b]?)$/.exec(note.replaceAll('♯', '#').replaceAll('♭', 'b'));
  if (!match) throw new Error(`Invalid note spelling in by-key data: ${note}`);
  return (pitchClasses[match[1]] + (match[2] === '#' ? 1 : match[2] === 'b' ? -1 : 0) + 12) % 12;
}
function noteSlug(note: string) { return note.replace('#', '-sharp').replace('b', '-flat').toLowerCase(); }
function detailURL(note: string, quality: string) {
  if (!['major', 'minor'].includes(quality)) return null;
  const url = `/chords/${noteSlug(note)}-${quality}`;
  return isPublicRoute(url) ? url : null;
}

export type ByKeyChord = { degree: number; roman: string; symbol: string; quality: 'major' | 'minor' | 'diminished'; notes: string[]; referenceVoicing: string[]; detailURL: string | null };
export type ByKeyTable = { key: string; scale: string[]; basis: string; evidenceStatus: string; chords: ByKeyChord[]; raisedLeadingToneOptions: { roman: string; symbol: string; notes: string[]; change: string; detailURL: string | null }[] };

export function getChordsByKey() {
  const { page } = readAuthorizedPage('/chords/by-key');
  const model = base('/chords/by-key');
  const expectedKeys = ['C major', 'G major', 'D major', 'E major', 'A major', 'F major', 'D minor'];
  if (page.data.default_key !== 'C major' || JSON.stringify(page.data.supported_keys) !== JSON.stringify(expectedKeys)) throw new Error('Unexpected by-key scope');
  if (page.data.keys.length !== 7 || page.data.keys.some((key: Raw) => key.chords.length !== 7 || key.scale.length !== 7)) throw new Error('By-key tables must contain exactly 49 prepared rows');
  const keys: ByKeyTable[] = page.data.keys.map((key: Raw): ByKeyTable => {
    if (!key.evidence_status.includes('formula crosscheck passed') || !expectedKeys.includes(key.key)) throw new Error(`Unverified by-key table: ${key.key}`);
    const chords = key.chords.map((chord: Raw, index: number): ByKeyChord => {
      const expectedNotes = [key.scale[index], key.scale[(index + 2) % 7], key.scale[(index + 4) % 7]];
      if (chord.degree !== index + 1 || JSON.stringify(chord.notes) !== JSON.stringify(expectedNotes) || chord.fingering !== null || chord.reference_voicing.length !== 3) throw new Error(`Invalid prepared chord row: ${key.key} ${chord.roman}`);
      const intervals = chord.notes.map((note: string) => (pitchClass(note) - pitchClass(chord.notes[0]) + 12) % 12);
      const expectedIntervals = chord.quality === 'major' ? [0, 4, 7] : chord.quality === 'minor' ? [0, 3, 7] : chord.quality === 'diminished' ? [0, 3, 6] : null;
      if (!expectedIntervals || JSON.stringify(intervals) !== JSON.stringify(expectedIntervals)) throw new Error(`Quality mismatch: ${key.key} ${chord.symbol}`);
      return { degree: chord.degree, roman: chord.roman, symbol: chord.symbol, quality: chord.quality, notes: [...chord.notes], referenceVoicing: [...chord.reference_voicing], detailURL: detailURL(chord.notes[0], chord.quality) };
    });
    const options = (key.raised_leading_tone_options || []).map((option: Raw) => ({ roman: option.roman, symbol: option.symbol, notes: [...option.notes], change: option.change, detailURL: detailURL(option.notes[0], option.symbol.endsWith('dim') ? 'diminished' : option.symbol.endsWith('m') ? 'minor' : 'major') }));
    return { key: key.key, scale: [...key.scale], basis: key.basis, evidenceStatus: key.evidence_status, chords, raisedLeadingToneOptions: options };
  });
  if (keys.reduce((sum, key) => sum + key.chords.length, 0) !== 49 || keys.some(key => key.chords.some(chord => chord.referenceVoicing.some((pitch, index) => !pitch.startsWith(chord.notes[index]))))) throw new Error('Incomplete by-key reference voicings');
  return { model, data: { keys, defaultKey: page.data.default_key as string, professionalReview: page.data.professional_review as string } };
}

export type ProgressionPattern = { id: string; title: string; romans: string[]; explanation: string; practice: string };

export function getChordProgressions() {
  const { page } = readAuthorizedPage('/chord-progressions');
  const source = getChordsByKey().data;
  const keys = source.keys.filter(key => key.key.endsWith('major'));
  const model = base('/chord-progressions');
  const requiredPatterns: ProgressionPattern[] = [
    { id: 'pop-loop', title: 'Common four-chord loop', romans: ['I', 'V', 'vi', 'IV'], explanation: 'Ends on IV, then returns to I when the pattern repeats.', practice: 'Keep one steady count for each chord and name the next Roman numeral before you move.' },
    { id: 'return-home', title: 'Clear return to the tonic', romans: ['I', 'IV', 'V', 'I'], explanation: 'Places the return to I inside the final position.', practice: 'Hold each chord evenly, then compare the opening I with the final I.' },
    { id: 'two-five-one', title: 'ii–V–I', romans: ['ii', 'V', 'I'], explanation: 'Moves from the second degree through V to the tonic.', practice: 'Pause on each chord, read all three tones, then join the three changes without adding a fingering rule.' },
    { id: 'six-four-one-five', title: 'vi–IV–I–V', romans: ['vi', 'IV', 'I', 'V'], explanation: 'Starts away from the tonic and places V at the end of the unit.', practice: 'Loop the four symbols slowly and listen for the return from V to vi.' },
    { id: 'fifties', title: 'I–vi–IV–V', romans: ['I', 'vi', 'IV', 'V'], explanation: 'Preserves the source-pack pattern that finishes on V.', practice: 'Read the four symbols first, then return from V to I on the next repeat.' },
  ];
  const byKey = new Map(keys.map(key => [key.key, key]));
  const sourcePatterns = new Set<string>();
  for (const progression of page.data.progressions as Raw[]) {
    const key = byKey.get(progression.key);
    if (!key || progression.bars.length !== progression.pattern.length) throw new Error(`Unsupported prepared progression: ${progression.id}`);
    sourcePatterns.add(progression.pattern.join('–'));
    progression.bars.forEach((bar: Raw, index: number) => {
      const chord = key.chords.find(item => item.roman === progression.pattern[index]);
      const noteNames = bar.notes.map((note: string) => note.replace(/-?\d+$/, ''));
      if (!chord || bar.roman !== chord.roman || bar.symbol !== chord.symbol || JSON.stringify(noteNames) !== JSON.stringify(chord.notes) || bar.fingering !== null) throw new Error(`Prepared progression diverges from by-key data: ${progression.id} bar ${index + 1}`);
    });
  }
  for (const expected of ['I–V–vi–IV', 'I–vi–IV–V', 'I–IV–V–I']) if (!sourcePatterns.has(expected)) throw new Error(`Missing preserved progression pattern: ${expected}`);
  for (const key of keys) for (const pattern of requiredPatterns) for (const roman of pattern.romans) if (!key.chords.some(chord => chord.roman === roman)) throw new Error(`Cannot map ${pattern.id} in ${key.key}`);
  const blocks = model.blocks.map(block => ({ ...block, paragraphs: [...block.paragraphs], originalBlocks: block.originalBlocks.map(original => ({ ...original })) }));
  const start = blocks.find(block => block.id === 'start-with-c');
  if (start) start.paragraphs[1] = 'The preserved source dataset contains three patterns in C, E and A major. This page also maps ii–V–I and vi–IV–I–V, then derives every displayed chord from the same six verified major-key tables used by Chords by Key.';
  const faq = blocks.find(block => block.id === 'questions')?.table;
  if (faq) faq.rows[0][1] = 'Five degree patterns are available in each of six verified major keys. The source package supplied three patterns in C, E and A; the page maps every pattern from the shared by-key chord rows.';
  for (const block of blocks) for (const original of block.originalBlocks) original.body = original.body.replace('The printable includes all three keys and every chord’s notes.', 'The preserved source data includes all three keys and every chord’s notes.');
  return {
    model: { ...model, scope: 'Five degree patterns mapped across six verified major keys. Every chord symbol and note list comes from the shared Chords by Key data.', blocks },
    data: { keys, patterns: requiredPatterns, defaultKey: 'C major', professionalReview: page.data.professional_review as string },
  };
}

export type FinderChordSource = { id: string; name: string; root: string; quality: string; url: string | null; tones: string[] };
export type FinderChord = { id: string; name: string; symbol: string; root: string; rootPitchClass: number; quality: 'major' | 'minor'; pitchClasses: number[]; tones: string[]; detailURL: string | null };

export function getChordFinder(sourceChords: FinderChordSource[]) {
  const { page } = readAuthorizedPage('/chords/finder');
  const baseModel = base('/chords/finder');
  if (page.data.runtime_engine !== null || page.data.professional_review !== 'pending') throw new Error('Unexpected finder preparation state');
  const chords: FinderChord[] = sourceChords.map(chord => {
    if (!['major', 'minor'].includes(chord.quality) || chord.tones.length !== 3) throw new Error(`Unsupported finder chord source: ${chord.id}`);
    const pcs = [...new Set(chord.tones.map(pitchClass))].sort((a, b) => a - b);
    if (pcs.length !== 3) throw new Error(`Finder source is not a triad: ${chord.id}`);
    const quality = chord.quality as 'major' | 'minor';
    const root = chord.root.replaceAll('♯', '#').replaceAll('♭', 'b');
    const symbol = `${root}${quality === 'minor' ? 'm' : ''}`;
    return { id: chord.id, name: chord.name, symbol, root, rootPitchClass: pitchClass(root), quality, pitchClasses: pcs, tones: [...chord.tones], detailURL: chord.url && isPublicRoute(chord.url) ? chord.url : null };
  });
  if (chords.length !== 19 || new Set(chords.map(chord => chord.id)).size !== 19) throw new Error('Finder must reuse the complete 19-chord centre catalogue');
  const exampleByInput = new Map((page.data.examples as Raw[]).map(example => [example.input.join(','), example]));
  for (const input of ['C4,E4,G4', 'E3,G3,C4', 'C4,Eb4,G4', 'C4,C5,E5,G5']) if (!exampleByInput.has(input)) throw new Error(`Missing prepared finder example: ${input}`);
  const planned = plannedLinksFor('/chords/finder');
  const links = planned.some(link => link.url === '/chords/by-key') ? planned : [...planned, { id: 'FINAL-FINDER-BY-KEY', url: '/chords/by-key', label: 'Browse chords by key', placement: 'after instructions' }];
  return {
    model: { ...baseModel, scope: 'Matches the shared 19-chord major/minor triad catalogue by sounding pitch class. It does not guess sixth, seventh, incomplete or extended chords.', links },
    data: { chords, labels: page.data.result_labels as { multiple: string; none: string; incomplete: string }, professionalReview: page.data.professional_review as string },
  };
}
