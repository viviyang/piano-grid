import type { ScaleAuthoringPage, ScaleFormID } from './scale-types';

type UnknownRecord = Record<string, unknown>;

const naturalPitch: Record<string, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

function record(value: unknown, path: string): UnknownRecord {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`Invalid scale authoring object: ${path}`);
  return value as UnknownRecord;
}

function array(value: unknown, path: string, allowEmpty = false): unknown[] {
  if (!Array.isArray(value)) throw new Error(`Invalid scale authoring array: ${path}`);
  if (!allowEmpty && value.length === 0) throw new Error(`Empty scale authoring array: ${path}`);
  return value;
}

function text(value: unknown, path: string): string {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`Missing scale authoring text: ${path}`);
  return value;
}

function stringArray(value: unknown, path: string, allowEmpty = false) {
  const values = array(value, path, allowEmpty);
  values.forEach((item, index) => text(item, `${path}[${index}]`));
  return values as string[];
}

function midiForWrittenPitch(spelling: string, octave: number) {
  const match = spelling.match(/^([A-G])(#{1,2}|b{1,2})?$/);
  if (!match) throw new Error(`Unsupported scale spelling: ${spelling}`);
  const alter = [...(match[2] ?? '')].reduce((sum, symbol) => sum + (symbol === '#' ? 1 : -1), 0);
  return 12 * (octave + 1) + naturalPitch[match[1]] + alter;
}

function pitchRow(value: unknown, path: string, direction: 'ascending' | 'descending') {
  const row = array(value, path);
  let previous = direction === 'ascending' ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
  row.forEach((pitchValue, index) => {
    const pitch = record(pitchValue, `${path}[${index}]`);
    const note = typeof pitch.note === 'string' ? pitch.note : undefined;
    const spelling = typeof pitch.spelling === 'string' ? pitch.spelling : note?.match(/^([A-G](?:#{1,2}|b{1,2})?)-?\d+$/)?.[1];
    const octave = Number.isInteger(pitch.written_octave) ? Number(pitch.written_octave) : Number.isInteger(pitch.octave) ? Number(pitch.octave) : Number(note?.match(/(-?\d+)$/)?.[1]);
    if (!spelling || !Number.isInteger(octave)) throw new Error(`Invalid written pitch: ${path}[${index}]`);
    if (!Number.isInteger(pitch.midi) || Number(pitch.midi) !== midiForWrittenPitch(spelling, octave)) throw new Error(`Scale pitch MIDI mismatch: ${path}[${index}].midi`);
    if (pitch.key_color !== 'white' && pitch.key_color !== 'black') throw new Error(`Invalid scale key color: ${path}[${index}].key_color`);
    const midi = Number(pitch.midi);
    if ((direction === 'ascending' && midi <= previous) || (direction === 'descending' && midi >= previous)) throw new Error(`Scale pitch order mismatch: ${path}[${index}].midi`);
    previous = midi;
  });
  return row;
}

function fingerRow(value: unknown, path: string, expectedLength: number) {
  if (value === null) return;
  if (value === undefined) throw new Error(`Missing scale fingering row: ${path}`);
  const row = array(value, path);
  if (row.length !== expectedLength || row.some((finger) => !Number.isInteger(finger) || Number(finger) < 1 || Number(finger) > 5)) throw new Error(`Invalid scale fingering row: ${path}`);
}

function validateBase(url: string, page: UnknownRecord) {
  if (text(page.url, `${url}.url`) !== url) throw new Error(`Scale authoring URL mismatch: ${url}.url`);
  text(page.title, `${url}.title`);
  text(page.description, `${url}.description`);
  const blocks = array(page.blocks, `${url}.blocks`);
  const ids = new Set<string>();
  for (const [index, blockValue] of blocks.entries()) {
    const block = record(blockValue, `${url}.blocks[${index}]`);
    const id = text(block.id, `${url}.blocks[${index}].id`);
    if (ids.has(id)) throw new Error(`Duplicate scale content block: ${url}.blocks[${index}].id`);
    ids.add(id);
    text(block.heading, `${url}.blocks[${index}].heading`);
    text(block.body, `${url}.blocks[${index}].body`);
  }
  stringArray(page.source_ids, `${url}.source_ids`);
  array(page.source_groups, `${url}.source_groups`).forEach((value, index) => text(record(value, `${url}.source_groups[${index}]`).id, `${url}.source_groups[${index}].id`));
  const metadata = record(page.metadata, `${url}.metadata`);
  if (text(metadata.canonical_path, `${url}.metadata.canonical_path`) !== url) throw new Error(`Scale canonical mismatch: ${url}.metadata.canonical_path`);
}

function validateCenter(url: string, data: UnknownRecord) {
  const major = array(data.major_overview, `${url}.data.major_overview`);
  const minor = array(data.minor_overview, `${url}.data.minor_overview`);
  if (major.length !== 15) throw new Error(`${url}.data.major_overview must retain fifteen major spellings.`);
  if (minor.length !== 15) throw new Error(`${url}.data.minor_overview must retain fifteen minor tonics.`);
  major.forEach((value, index) => {
    const entry = record(value, `${url}.data.major_overview[${index}]`);
    text(entry.tonic, `${url}.data.major_overview[${index}].tonic`);
    if (stringArray(entry.notes, `${url}.data.major_overview[${index}].notes`).length !== 7) throw new Error(`Major authoring row must contain seven distinct degrees: ${url}.data.major_overview[${index}].notes`);
    stringArray(entry.source_ids, `${url}.data.major_overview[${index}].source_ids`);
  });
  const fields = ['natural_ascending', 'natural_descending', 'harmonic_ascending', 'harmonic_descending', 'melodic_classical_ascending', 'melodic_classical_descending'] as const;
  minor.forEach((value, index) => {
    const entry = record(value, `${url}.data.minor_overview[${index}]`);
    const tonic = text(entry.tonic, `${url}.data.minor_overview[${index}].tonic`);
    for (const field of fields) {
      const notes = stringArray(entry[field], `${url}.data.minor_overview[${index}].${field}`);
      if (notes.length !== 8 || notes[0] !== tonic || notes.at(-1) !== tonic) throw new Error(`Invalid one-octave scale sequence: ${url}.data.minor_overview[${index}].${field}`);
    }
    if (entry.fingering !== null) throw new Error(`Center fingering must remain unverified/null: ${url}.data.minor_overview[${index}].fingering`);
    stringArray(entry.source_ids, `${url}.data.minor_overview[${index}].source_ids`);
  });
  if (array(data.form_comparison, `${url}.data.form_comparison`).length !== 4) throw new Error(`${url}.data.form_comparison must contain the four approved forms.`);
  array(data.scale_degrees, `${url}.data.scale_degrees`);
  array(data.jazz_examples, `${url}.data.jazz_examples`);
  if (data.print_assets !== null) {
    const assets = record(data.print_assets, `${url}.data.print_assets`);
    if (text(assets.status, `${url}.data.print_assets.status`) !== 'available') throw new Error(`Ready print assets must use status=available: ${url}.data.print_assets.status`);
    array(assets.items, `${url}.data.print_assets.items`).forEach((item, index) => {
      const resource = record(item, `${url}.data.print_assets.items[${index}]`);
      if (!text(resource.path, `${url}.data.print_assets.items[${index}].path`).startsWith('/downloads/scales/')) throw new Error(`Unapproved scale resource path: ${url}.data.print_assets.items[${index}].path`);
    });
  }
}

function validateCMajor(url: string, data: UnknownRecord) {
  if (text(data.tonic, `${url}.data.tonic`) !== 'C' || text(data.scale_type, `${url}.data.scale_type`) !== 'major') throw new Error(`Invalid fixed C-major identity: ${url}.data`);
  stringArray(data.notes_ascending, `${url}.data.notes_ascending`);
  stringArray(data.notes_descending, `${url}.data.notes_descending`);
  stringArray(data.note_source_ids, `${url}.data.note_source_ids`);
  const sequences = record(data.pitch_sequences, `${url}.data.pitch_sequences`);
  const fingering = record(data.fingering, `${url}.data.fingering`);
  for (const hand of ['RH', 'LH'] as const) for (const direction of ['ascending', 'descending'] as const) {
    const pitches = pitchRow(record(sequences[hand], `${url}.data.pitch_sequences.${hand}`)[direction], `${url}.data.pitch_sequences.${hand}.${direction}`, direction);
    fingerRow(record(fingering[hand], `${url}.data.fingering.${hand}`)[direction], `${url}.data.fingering.${hand}.${direction}`, pitches.length);
  }
}

function validateAMinor(url: string, data: UnknownRecord) {
  if (text(data.tonic, `${url}.data.tonic`) !== 'A') throw new Error(`Invalid fixed A-minor identity: ${url}.data.tonic`);
  if (JSON.stringify(data.approved_playback_octaves) !== '[1]') throw new Error(`Only one octave is approved: ${url}.data.approved_playback_octaves`);
  const forms = array(data.forms, `${url}.data.forms`).map((value, index) => record(value, `${url}.data.forms[${index}]`));
  const expected = new Set<ScaleFormID>(['natural_minor', 'harmonic_minor', 'melodic_minor_classical']);
  if (forms.length !== 3 || forms.some((form, index) => !expected.delete(text(form.id, `${url}.data.forms[${index}].id`) as ScaleFormID)) || expected.size) throw new Error(`${url}.data.forms must contain the three approved forms exactly once.`);
  for (const [formIndex, form] of forms.entries()) {
    const id = text(form.id, `${url}.data.forms[${formIndex}].id`);
    stringArray(form.notes_ascending, `${url}.data.forms.${id}.notes_ascending`);
    stringArray(form.notes_descending, `${url}.data.forms.${id}.notes_descending`);
    stringArray(form.source_ids, `${url}.data.forms.${id}.source_ids`);
    array(form.ascending_semitone_steps, `${url}.data.forms.${id}.ascending_semitone_steps`);
    const mapping = record(form.pitch_mapping, `${url}.data.forms.${id}.pitch_mapping`);
    const fingering = record(form.fingering, `${url}.data.forms.${id}.fingering`);
    for (const [handName, sourceHand] of [['right_hand', 'right_hand'], ['left_hand', 'left_hand']] as const) for (const direction of ['ascending', 'descending'] as const) {
      const pitches = pitchRow(mapping[`${sourceHand}_${direction}_example`], `${url}.data.forms.${id}.pitch_mapping.${sourceHand}_${direction}_example`, direction);
      fingerRow(record(fingering[direction], `${url}.data.forms.${id}.fingering.${direction}`)[handName], `${url}.data.forms.${id}.fingering.${direction}.${handName}`, pitches.length);
    }
    stringArray(fingering.source_ids, `${url}.data.forms.${id}.fingering.source_ids`);
  }
}

export function validateScaleAuthoringPage(url: string, pageValue: unknown): asserts pageValue is ScaleAuthoringPage {
  if (!['/scales', '/scales/c-major', '/scales/a-minor'].includes(url)) throw new Error(`Unapproved scale authoring URL: ${url}`);
  const page = record(pageValue, url);
  validateBase(url, page);
  const data = record(page.data, `${url}.data`);
  if (url === '/scales') validateCenter(url, data);
  else if (url === '/scales/c-major') validateCMajor(url, data);
  else validateAMinor(url, data);
}
