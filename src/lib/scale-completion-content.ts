import { getLayouts } from './keyboard-content';
import { readAuthorizedPage } from './site-content';
import { PUBLIC_ROUTES } from './site-routes';
// The validator is authored as portable ESM so the CLI and server renderer execute the same invariants.
// @ts-expect-error JavaScript module intentionally has no separate declaration file.
import { validateScaleAuthoringBundle } from '../../scripts/scale-authoring-contract.mjs';
import type { PianoKey, StaffNote } from './keyboard-types';
import type { ArpeggioPageData, ScaleFamilyPageData } from './scale-completion-types';
import type {
  ScaleDetailRoute,
  ScaleFamilyRoute,
  ScaleFingering,
  ScaleFingeringNote,
  ScaleFormID,
  ScaleHand,
  ScaleOption,
  ScalePageModel,
  ScalePitch,
  ScaleSourceReference,
} from './scale-types';

type UnknownRecord = Record<string, any>;
type SourceRecord = {
  source_id: string;
  title?: string;
  publisher?: string;
  url?: string;
  locator?: string;
  supports?: string | string[];
};

const naturalPitch: Record<string, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
const blackPitchClasses = new Set([1, 3, 6, 8, 10]);
const notesOnly = 'Notes only - fingering is not available for this form, hand, direction and one-octave range.';

function spellingParts(spelling: string) {
  const match = spelling.match(/^([A-G])(#{1,2}|b{1,2})?$/);
  if (!match) throw new Error(`Unsupported written pitch: ${spelling}`);
  const alter = [...(match[2] ?? '')].reduce((sum, symbol) => sum + (symbol === '#' ? 1 : -1), 0);
  return { letter: match[1], accidental: match[2] ?? '', alter };
}

export function completionMidiForPitch(spelling: string, octave: number) {
  const parsed = spellingParts(spelling);
  return 12 * (octave + 1) + naturalPitch[parsed.letter] + parsed.alter;
}

function staffFor(spelling: string, octave: number, midi: number, clef: 'treble' | 'bass'): StaffNote {
  const { letter, accidental } = spellingParts(spelling);
  const absoluteStep = octave * 7 + 'CDEFGAB'.indexOf(letter);
  const bottomLine = clef === 'treble' ? 4 * 7 + 2 : 2 * 7 + 4;
  const step = absoluteStep - bottomLine;
  const ledger: number[] = [];
  if (step < 0) for (let value = -2; value >= step; value -= 2) ledger.push(value);
  if (step > 8) for (let value = 10; value <= step; value += 2) ledger.push(value);
  return { note: `${spelling}${octave}`, midi, clef, accidental: accidental || null, staff_step_from_bottom_line: step, ledger_line_steps: ledger };
}

function pitch(spelling: string, octave: number, hand: ScaleHand): ScalePitch {
  const midi = completionMidiForPitch(spelling, octave);
  return {
    spelling,
    note: `${spelling}${octave}`,
    midi,
    key_color: blackPitchClasses.has(((midi % 12) + 12) % 12) ? 'black' : 'white',
    staff: staffFor(spelling, octave, midi, hand === 'RH' ? 'treble' : 'bass'),
  };
}

function pitchesFromNames(notes: string[], hand: ScaleHand, direction: 'ascending' | 'descending') {
  let octave = hand === 'RH' ? (direction === 'ascending' ? 4 : 5) : (direction === 'ascending' ? 3 : 4);
  let previous = direction === 'ascending' ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
  return notes.map((spelling) => {
    let midi = completionMidiForPitch(spelling, octave);
    while (direction === 'ascending' ? midi <= previous : midi >= previous) {
      octave += direction === 'ascending' ? 1 : -1;
      midi = completionMidiForPitch(spelling, octave);
    }
    previous = midi;
    return pitch(spelling, octave, hand);
  });
}

function pitchFromAuthored(value: UnknownRecord, hand: ScaleHand, path: string): ScalePitch {
  const spelling = value.spelling ?? value.pitch ?? value.note?.match(/^([A-G](?:#{1,2}|b{1,2})?)/)?.[1] ?? (value.step ? `${value.step}${Number(value.alter) === 2 ? '##' : Number(value.alter) === 1 ? '#' : Number(value.alter) === -2 ? 'bb' : Number(value.alter) === -1 ? 'b' : ''}` : '');
  const octave = Number.isInteger(value.written_octave) ? value.written_octave : Number.isInteger(value.octave) ? value.octave : Number(value.note?.match(/(-?\d+)$/)?.[1]);
  if (!spelling || !Number.isInteger(octave)) throw new Error(`Invalid authored pitch: ${path}`);
  const expectedMidi = completionMidiForPitch(spelling, octave);
  if (Number.isInteger(value.midi) && value.midi !== expectedMidi) throw new Error(`Pitch/MIDI mismatch: ${path}`);
  const result = pitch(spelling, octave, hand);
  if (value.key_color && value.key_color !== result.key_color) throw new Error(`Pitch/key-color mismatch: ${path}`);
  return result;
}

function sourcesFor(master: { sources: SourceRecord[] }, ids: string[]): ScaleSourceReference[] {
  const byID = new Map(master.sources.map((source) => [source.source_id, source]));
  return [...new Set(ids)].flatMap((sourceID) => {
    const source = byID.get(sourceID);
    if (!source?.title || !source.url?.startsWith('https://')) return [];
    const supportItems = Array.isArray(source.supports) ? source.supports : [source.supports];
    const supports = supportItems
      .filter((item) => item !== undefined && item !== null)
      .map((item) => typeof item === 'string' ? item : JSON.stringify(item))
      .join(' ');
    return [{
      sourceID,
      title: source.title,
      publisher: source.publisher || new URL(source.url).hostname,
      url: source.url,
      scope: supports || 'Supports the note, theory, or fingering fields that cite this source ID.',
      locator: publicLocator(source.locator),
    }];
  });
}

function publicLocator(locator?: string) {
  if (!locator) return 'See the cited source record.';
  const withoutInternalScreens = locator.split(/;?\s*Screenshots?:/i)[0].trim();
  return withoutInternalScreens.replace(/;?\s*turn\d+[a-z0-9_-]*/gi, '').trim() || 'See the cited publication location in the source record.';
}

const relativeMajorRoutes: Record<string, string> = {
  'C major': '/scales/c-major', 'G major': '/scales/g-major', 'F major': '/scales/f-major',
  'D major': '/scales/d-major', 'A major': '/scales/a-major', 'Eb major': '/scales/e-flat-major',
  'Bb major': '/scales/b-flat-major',
};

function relatedLinksFor(page: UnknownRecord, master: UnknownRecord) {
  const ready = new Set(PUBLIC_ROUTES as readonly string[]);
  const links = new Map<string, string>();
  const add = (href: unknown, label?: unknown) => {
    if (typeof href !== 'string' || !ready.has(href) || href === page.url) return;
    const target = master.pages?.[href];
    links.set(href, typeof label === 'string' && label.trim() ? label : target?.title?.replace(/:.*/, '') ?? href);
  };
  for (const link of page.data?.related_links ?? []) add(link.url, link.label);
  for (const href of page.data?.related_urls ?? []) add(href);
  const relative = page.data?.relative_major;
  if (relative?.name) add(relativeMajorRoutes[relative.name], `Compare with ${relative.name}`);
  if (page.url !== '/scales') add('/scales', 'Browse all supported scales');
  if (page.url !== '/guide/piano-scales') add('/guide/piano-scales', 'Use the piano scales practice guide');
  return [...links].map(([href, label]) => ({ href, label }));
}

function collectSourceIDs(value: unknown, path = '', found = new Set<string>()) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => collectSourceIDs(item, `${path}[${index}]`, found));
  } else if (value && typeof value === 'object') {
    for (const [key, item] of Object.entries(value as UnknownRecord)) {
      if (key === 'source_id' && typeof item === 'string') found.add(item);
      else if ((key === 'source_ids' || key.endsWith('_source_ids')) && Array.isArray(item)) item.forEach((id) => typeof id === 'string' && found.add(id));
      else collectSourceIDs(item, `${path}.${key}`, found);
    }
  }
  return found;
}

export function validateCompletionAuthoringPage(url: string) {
  const { page, master } = readAuthorizedPage(url);
  const sourceIDs = collectSourceIDs(page);
  const sources = master.sources.filter((source: SourceRecord) => sourceIDs.has(source.source_id));
  return validateScaleAuthoringBundle({ contract_version: '2026-09-14-SCALES-COMPLETION-1', pages: { [url]: page }, sources }, master);
}

function validateFingers(value: unknown, expected: number, path: string) {
  if (value === null || value === undefined) return;
  if (!Array.isArray(value) || value.length !== expected || value.some((finger) => !Number.isInteger(finger) || finger < 1 || finger > 5)) throw new Error(`Invalid fingering row: ${path}`);
}

function validatePageAndSources(page: UnknownRecord, master: { sources: SourceRecord[] }) {
  if (!page.url || !page.title || !page.description || !Array.isArray(page.blocks) || !page.blocks.length) throw new Error(`Incomplete Scales page: ${page.url || 'unknown'}`);
  if (page.metadata?.canonical_path !== page.url) throw new Error(`Canonical mismatch: ${page.url}`);
  const available = new Set(master.sources.map((source) => source.source_id));
  const missing = [...collectSourceIDs(page)].filter((id) => !available.has(id));
  if (missing.length) throw new Error(`Unresolved nested source IDs in ${page.url}: ${missing.join(', ')}`);
}

function modelFor(page: UnknownRecord, master: { sources: SourceRecord[] }): ScalePageModel {
  validatePageAndSources(page, master);
  const blocks = page.blocks.map((block: UnknownRecord) => ({ id: block.id, heading: block.heading, body: block.body }));
  const related = relatedLinksFor(page, master);
  const sections = blocks.map((block: { id: string; heading: string }) => ({ id: `sc-${block.id}`, legacyBlockID: block.id, heading: block.heading, paragraphs: [] }));
  if (related.length) sections.push({ id: 'related-references', heading: 'Related references', paragraphs: ['Continue with a source-backed reference that matches this task.'], links: related });
  const faqs = Array.isArray(page.faqs)
    ? page.faqs.map((faq: UnknownRecord) => ({ id: faq.id, question: faq.question, answer: faq.answer, sourceIDs: faq.source_ids }))
    : (page.questions ?? []).map((question: string, index: number) => ({ question, answer: blocks[index]?.body ?? page.description }));
  return {
    url: page.url,
    title: page.title,
    description: page.description,
    blocks,
    copy: {
      h1: page.title,
      intro: page.description,
      jumps: [...blocks.map((block: { id: string; heading: string }) => ({ label: block.heading, href: `#sc-${block.id}` })), ...(related.length ? [{ label: 'Related references', href: '#related-references' }] : [])],
      sections,
      faqs,
      sourceNote: 'Sources below are limited to the note, theory, fingering, or editorial scope recorded for this page. A source record is not the same as a teacher review.',
    },
    pageSources: sourcesFor(master, page.source_ids ?? []),
    metadata: page.metadata,
    provenance: {
      template_id: page.template_id,
      source_groups: (page.source_groups ?? []).map((group: UnknownRecord) => group.id),
      source_ids: page.source_ids ?? [],
      block_ids: blocks.map((block: { id: string }) => block.id),
    },
  };
}

function collectionForm(page: UnknownRecord, example: UnknownRecord) {
  if (page.url === '/scales/modes') return example.id.replace(/^c-/, '');
  if (page.url === '/scales/blues') return example.id.includes('minor') ? 'minor_blues' : 'major_blues';
  if (page.url === '/scales/pentatonic') return example.id.includes('minor') ? 'minor_pentatonic' : 'major_pentatonic';
  if (page.url === '/scales/harmonic-major') return 'harmonic_major';
  if (page.url === '/scales/chromatic') return 'chromatic';
  return 'major_arpeggio';
}

function labelWithoutTonic(label: string, tonic: string) {
  return label.replace(new RegExp(`^${tonic.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s+`, 'i'), '').replace(/^chord tones\s+[—-]\s*/i, 'Chord tones — ');
}

function emptyFingering(): ScaleFingering {
  return { RH: { ascending: null, descending: null }, LH: { ascending: null, descending: null } };
}

function emptyFingeringNote(): ScaleFingeringNote {
  return { RH: { ascending: notesOnly, descending: notesOnly }, LH: { ascending: notesOnly, descending: notesOnly } };
}

function normalizeMajor(page: UnknownRecord, master: { sources: SourceRecord[] }): ScaleOption[] {
  const data = page.data;
  const fingering: ScaleFingering = {
    RH: { ascending: data.fingering.RH.ascending, descending: data.fingering.RH.descending },
    LH: { ascending: data.fingering.LH.ascending, descending: data.fingering.LH.descending },
  };
  const sequences = Object.fromEntries((['RH', 'LH'] as const).map((hand) => [hand, Object.fromEntries((['ascending', 'descending'] as const).map((direction) => {
    const row = data.pitch_sequences[hand][direction].map((value: UnknownRecord, index: number) => pitchFromAuthored(value, hand, `${page.url}.${hand}.${direction}[${index}]`));
    validateFingers(fingering[hand][direction], row.length, `${page.url}.fingering.${hand}.${direction}`);
    return [direction, row];
  }))])) as ScaleOption['sequences'];
  const checked = 'Source-scoped one-octave fingering row.';
  return [{
    id: `major:${data.tonic}`,
    tonic: data.tonic,
    form: 'major',
    formLabel: 'Major',
    semitoneSteps: data.intervals.ascending_semitones,
    sequences,
    fingering,
    fingeringNote: { RH: { ascending: checked, descending: checked }, LH: { ascending: checked, descending: checked } },
    detailURL: page.url,
    sources: sourcesFor(master, [...new Set([...(data.note_source_ids ?? []), ...(data.fingering.source_ids ?? [])])]),
  }];
}

function normalizeMinor(page: UnknownRecord, master: { sources: SourceRecord[] }): ScaleOption[] {
  return page.data.forms.map((form: UnknownRecord) => {
    const fingering: ScaleFingering = {
      RH: { ascending: form.fingering.ascending.right_hand, descending: form.fingering.descending.right_hand },
      LH: { ascending: form.fingering.ascending.left_hand, descending: form.fingering.descending.left_hand },
    };
    const sequences = Object.fromEntries((['RH', 'LH'] as const).map((hand) => [hand, Object.fromEntries((['ascending', 'descending'] as const).map((direction) => {
      const key = `${hand === 'RH' ? 'right_hand' : 'left_hand'}_${direction}_example`;
      const row = form.pitch_mapping[key].map((value: UnknownRecord, index: number) => pitchFromAuthored(value, hand, `${page.url}.${form.id}.${key}[${index}]`));
      validateFingers(fingering[hand][direction], row.length, `${page.url}.${form.id}.fingering.${hand}.${direction}`);
      return [direction, row];
    }))])) as ScaleOption['sequences'];
    const fingeringNote = emptyFingeringNote();
    for (const hand of ['RH', 'LH'] as const) for (const direction of ['ascending', 'descending'] as const) if (fingering[hand][direction]) fingeringNote[hand][direction] = 'Source-scoped one-octave fingering row.';
    return {
      id: `${form.id}:${page.data.tonic}`,
      tonic: page.data.tonic,
      form: form.id as ScaleFormID,
      formLabel: form.label,
      semitoneSteps: form.ascending_semitone_steps,
      sequences,
      fingering,
      fingeringNote,
      detailURL: page.url,
      sources: sourcesFor(master, [...new Set([...(form.source_ids ?? []), ...(form.fingering.source_ids ?? [])])]),
    };
  });
}

function keySignatureLabel(data: UnknownRecord) {
  const key = data.key_signature ?? {};
  const accidentals = key.ordered_accidentals ?? key.accidentals ?? [];
  if (!key.count && accidentals.length === 0) return 'No sharps or flats';
  return accidentals.join(', ') || `${key.count} accidentals`;
}

export function getCompletionScaleDetail(url: ScaleDetailRoute) {
  const { page, master } = readAuthorizedPage(url);
  const options = page.data.scale_type === 'major' ? normalizeMajor(page, master) : normalizeMinor(page, master);
  return {
    model: modelFor(page, master),
    options,
    keyboardKeys: getLayouts('/keyboard-notes')[0].keys,
    defaultForm: (page.data.default_form ?? 'major') as ScaleFormID,
    tempoOptions: page.data.print_and_audio?.tempo_presets_bpm ?? [page.data.renderer_payload?.default_tempo_bpm ?? 60],
    keySignature: keySignatureLabel(page.data),
    chords: page.data.natural_scale_chords?.items ?? [],
  };
}

function optionFromEvents(example: UnknownRecord, page: UnknownRecord, master: { sources: SourceRecord[] }, preferredHand: ScaleHand = 'RH', selectedView: UnknownRecord | null = null): ScaleOption {
  let ascendingEvents = example.staff?.events_ascending;
  let descendingEvents = example.staff?.events_descending;
  if (selectedView || (example.views?.length && example.default_view_id)) {
    const view = selectedView ?? example.views.find((item: UnknownRecord) => item.view_id === example.default_view_id);
    ascendingEvents = view.staff.events_ascending;
    descendingEvents = view.staff.events_descending;
  }
  const build = (events: UnknownRecord[] | undefined, notes: string[], hand: ScaleHand, direction: 'ascending' | 'descending') => events
    ? events.map((event, index) => pitchFromAuthored(event, hand, `${page.url}.${example.id}.${direction}[${index}]`))
    : pitchesFromNames(notes, hand, direction);
  const sequences = Object.fromEntries((['RH', 'LH'] as const).map((hand) => [hand, {
    ascending: build(ascendingEvents, example.ascending_notes, hand, 'ascending'),
    descending: build(descendingEvents, example.descending_notes, hand, 'descending'),
  }])) as ScaleOption['sequences'];
  const fingering = emptyFingering();
  const sourceFingering = example.fingering ?? {};
  const full = selectedView ? selectedView.fingering : sourceFingering[preferredHand === 'RH' ? 'right_hand' : 'left_hand'];
  if (full?.fingers?.length) {
    const apex = sequences[preferredHand].ascending.length;
    fingering[preferredHand].ascending = full.fingers.slice(0, apex);
    fingering[preferredHand].descending = [full.fingers[apex - 1], ...full.fingers.slice(apex)].slice(0, sequences[preferredHand].descending.length);
  }
  const fingeringNote = emptyFingeringNote();
  if (fingering[preferredHand].ascending) fingeringNote[preferredHand].ascending = 'Source-scoped one-octave arpeggio row.';
  if (fingering[preferredHand].descending) fingeringNote[preferredHand].descending = 'Source-scoped one-octave arpeggio row.';
  return {
    id: `${page.url.slice(1)}:${example.id}${selectedView ? `:${selectedView.view_id}` : ''}`,
    tonic: example.root,
    form: collectionForm(page, example),
    formLabel: page.url === '/arpeggios' ? 'Major arpeggio' : labelWithoutTonic(example.label, example.root ?? example.label.split(' ')[0]),
    semitoneSteps: example.step_pattern_semitones,
    sequences,
    fingering,
    fingeringNote,
    detailURL: page.url,
    sources: sourcesFor(master, [...new Set([...(selectedView?.source_ids ?? example.source_ids ?? page.source_ids), ...(full?.source_ids ?? [])])]),
  };
}

export function getScaleFamily(url: ScaleFamilyRoute): ScaleFamilyPageData {
  const { page, master } = readAuthorizedPage(url);
  const examples = page.data.examples.map((example: UnknownRecord) => ({
    id: example.id,
    label: example.label,
    collectionLabel: page.title,
    option: optionFromEvents(example, page, master),
    summary: example.spelling_note ?? example.comparison ?? `${example.label}: ${example.ascending_notes.join(' - ')}.`,
    comparison: example.comparison ?? example.cross_check ?? 'Compare the written notes and interval pattern shown in the table.',
    family: page.url,
  }));
  return { model: modelFor(page, master), examples, defaultExampleID: examples[0].id, scope: page.data.scope, keyboardKeys: getLayouts('/keyboard-notes')[0].keys };
}

export function getArpeggios(): ArpeggioPageData {
  const { page, master } = readAuthorizedPage('/arpeggios');
  const examples = page.data.examples.flatMap((example: UnknownRecord) => {
    const views: Array<UnknownRecord | null> = example.views?.length ? example.views : [null];
    return views.map((view) => {
      const viewHand: ScaleHand | null = view?.hand === 'left_hand' ? 'LH' : view?.hand === 'right_hand' ? 'RH' : view ? null : 'RH';
      const renderHand: ScaleHand = viewHand ?? 'RH';
      return {
      id: view ? `${example.id}:${view.view_id}` : example.id,
      label: view?.label ?? example.label,
      collectionLabel: 'Major arpeggios',
      option: optionFromEvents(example, page, master, renderHand, view),
      summary: `${example.label}: ${example.ascending_notes.join(' - ')}. Root-position chord degrees 1-3-5-1.`,
      comparison: `The related ${example.root} major scale contains ${example.comparison_scale_notes.join(' - ')}; this arpeggio uses only the root, third, and fifth.`,
      defaultHand: renderHand,
      viewID: view?.view_id ?? null,
      viewHand,
      renderHand,
      handSelectable: !view,
    };});
  });
  return { model: modelFor(page, master), examples, defaultExampleID: examples[0].id, scope: page.data.scope, keyboardKeys: getLayouts('/keyboard-notes')[0].keys };
}

export function validateAllCompletionPages() {
  const detailRoutes: ScaleDetailRoute[] = ['/scales/d-major','/scales/e-minor','/scales/f-major','/scales/g-major','/scales/a-major','/scales/c-minor','/scales/d-minor','/scales/e-major','/scales/b-minor','/scales/f-minor','/scales/a-sharp-minor','/scales/b-major','/scales/b-flat-major','/scales/g-minor','/scales/e-flat-major','/scales/f-sharp-minor','/scales/c-flat-major'];
  const familyRoutes: ScaleFamilyRoute[] = ['/scales/modes','/scales/blues','/scales/pentatonic','/scales/harmonic-major','/scales/chromatic'];
  detailRoutes.forEach(getCompletionScaleDetail);
  familyRoutes.forEach(getScaleFamily);
  getArpeggios();
  return { details: detailRoutes.length, families: familyRoutes.length, familyExamples: familyRoutes.reduce((sum, url) => sum + getScaleFamily(url).examples.length, 0), arpeggios: getArpeggios().examples.length };
}
