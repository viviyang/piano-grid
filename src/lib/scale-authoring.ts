import type { ScaleFormID } from './scale-types';

type UnknownRecord = Record<string, unknown>;

function record(value: unknown, path: string): UnknownRecord {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`Invalid scale authoring object: ${path}`);
  return value as UnknownRecord;
}

function array(value: unknown, path: string): unknown[] {
  if (!Array.isArray(value)) throw new Error(`Invalid scale authoring array: ${path}`);
  return value;
}

function text(value: unknown, path: string): string {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`Missing scale authoring text: ${path}`);
  return value;
}

function fingerRow(value: unknown, path: string, expectedLength: number) {
  if (value === null) return;
  const row = array(value, path);
  if (row.length !== expectedLength || row.some((finger) => !Number.isInteger(finger) || Number(finger) < 1 || Number(finger) > 5)) {
    throw new Error(`Invalid scale fingering row: ${path}`);
  }
}

export function validateScaleAuthoringPage(url: string, pageValue: unknown) {
  const page = record(pageValue, url);
  text(page.title, `${url}.title`);
  text(page.description, `${url}.description`);
  const blocks = array(page.blocks, `${url}.blocks`);
  for (const [index, blockValue] of blocks.entries()) {
    const block = record(blockValue, `${url}.blocks[${index}]`);
    text(block.id, `${url}.blocks[${index}].id`);
    text(block.heading, `${url}.blocks[${index}].heading`);
    text(block.body, `${url}.blocks[${index}].body`);
  }
  const data = record(page.data, `${url}.data`);
  if (url === '/scales') {
    if (array(data.major_overview, `${url}.data.major_overview`).length !== 15) throw new Error('Scale center must retain fifteen major spellings.');
    if (array(data.minor_overview, `${url}.data.minor_overview`).length !== 15) throw new Error('Scale center must retain fifteen minor tonics.');
    return;
  }
  if (url === '/scales/c-major') {
    const sequences = record(data.pitch_sequences, `${url}.data.pitch_sequences`);
    const fingering = record(data.fingering, `${url}.data.fingering`);
    for (const hand of ['RH', 'LH']) for (const direction of ['ascending', 'descending']) {
      const pitches = array(record(sequences[hand], `${url}.data.pitch_sequences.${hand}`)[direction], `${url}.data.pitch_sequences.${hand}.${direction}`);
      fingerRow(record(fingering[hand], `${url}.data.fingering.${hand}`)[direction], `${url}.data.fingering.${hand}.${direction}`, pitches.length);
    }
    return;
  }
  if (url === '/scales/a-minor') {
    const forms = array(data.forms, `${url}.data.forms`).map((value, index) => record(value, `${url}.data.forms[${index}]`));
    const expected = new Set<ScaleFormID>(['natural_minor', 'harmonic_minor', 'melodic_minor_classical']);
    if (forms.length !== 3 || forms.some((form) => !expected.delete(text(form.id, `${url}.data.forms.id`) as ScaleFormID)) || expected.size) {
      throw new Error('A minor authoring input must contain the three approved forms exactly once.');
    }
    for (const form of forms) {
      const id = text(form.id, `${url}.data.forms.id`);
      const mapping = record(form.pitch_mapping, `${url}.data.forms.${id}.pitch_mapping`);
      const fingering = record(form.fingering, `${url}.data.forms.${id}.fingering`);
      for (const [handName, sourceHand] of [['right_hand', 'right_hand'], ['left_hand', 'left_hand']] as const) for (const direction of ['ascending', 'descending'] as const) {
        const pitches = array(mapping[`${sourceHand}_${direction}_example`], `${url}.data.forms.${id}.pitch_mapping.${sourceHand}_${direction}_example`);
        fingerRow(record(fingering[direction], `${url}.data.forms.${id}.fingering.${direction}`)[handName], `${url}.data.forms.${id}.fingering.${direction}.${handName}`, pitches.length);
      }
    }
  }
}
