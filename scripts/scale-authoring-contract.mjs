import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import { loadScaleFaqSupplement, validateScaleFaqsForPage } from './scale-faq-contract.mjs';

export const SCALE_URLS = [
  '/scales','/scales/modes','/scales/c-major','/scales/a-minor','/scales/blues','/scales/d-major','/scales/e-minor','/scales/f-major','/scales/g-major','/scales/pentatonic','/scales/a-major','/scales/c-minor','/scales/d-minor','/scales/e-major','/scales/b-minor','/scales/f-minor','/scales/harmonic-major','/scales/a-sharp-minor','/scales/b-major','/scales/b-flat-major','/scales/g-minor','/scales/chromatic','/scales/e-flat-major','/scales/f-sharp-minor','/scales/c-flat-major','/arpeggios','/guide/piano-scales',
];
const FAQ_REQUIRED_URLS = new Set(loadScaleFaqSupplement().routes.map((route) => route.url));
const FORM_IDS = ['natural_minor', 'harmonic_minor', 'melodic_minor_classical'];
const HAND_KEYS = ['right_hand', 'left_hand'];
const PITCH_CLASS = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

function fail(path, message) {
  throw new Error(`${path}: ${message}`);
}

function object(value, path) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) fail(path, 'must be an object');
  return value;
}

function nonempty(value, path) {
  if (typeof value !== 'string' || !value.trim()) fail(path, 'must be a non-empty string');
  return value;
}

function array(value, path, { min = 1, exact } = {}) {
  if (!Array.isArray(value)) fail(path, 'must be an array');
  if (exact !== undefined && value.length !== exact) fail(path, `must contain exactly ${exact} items`);
  if (value.length < min) fail(path, `must contain at least ${min} item(s)`);
  return value;
}

function uniqueStrings(value, path) {
  const values = array(value, path).map((item, index) => nonempty(item, `${path}[${index}]`));
  if (new Set(values).size !== values.length) fail(path, 'must not contain duplicates');
  return values;
}

function parsePitch(note, path) {
  const match = nonempty(note, path).match(/^([A-G])(#{1,2}|b{1,2})?(-?\d+)$/);
  if (!match) fail(path, 'must be a written pitch such as C4, Bb3 or F##4');
  const accidental = [...(match[2] ?? '')].reduce((sum, token) => sum + (token === '#' ? 1 : -1), 0);
  return { midi: (Number(match[3]) + 1) * 12 + PITCH_CLASS[match[1]] + accidental, spelling: `${match[1]}${match[2] ?? ''}` };
}

function pitchClass(spelling, path) {
  return ((parsePitch(`${nonempty(spelling, path)}4`, path).midi % 12) + 12) % 12;
}

function intervalSteps(notes, path, direction = 'ascending') {
  return array(notes, path).slice(1).map((note, index) => {
    const previous = pitchClass(notes[index], `${path}[${index}]`);
    const current = pitchClass(note, `${path}[${index + 1}]`);
    return direction === 'ascending' ? (current - previous + 12) % 12 : (previous - current + 12) % 12;
  });
}

function assertSteps(actual, expected, path) {
  if (actual.join() !== expected.join()) fail(path, `must follow ${expected.join('-')} semitone steps; received ${actual.join('-')}`);
}

function assertTonicCycle(notes, tonic, path) {
  const row = array(notes, path);
  if (row[0] !== tonic || row.at(-1) !== tonic) fail(path, `must start and end on ${tonic}`);
}

function validateFingering(value, path, eventCount) {
  if (value === null) return;
  array(value, path, { exact: eventCount }).forEach((finger, index) => {
    if (!Number.isInteger(finger) || finger < 1 || finger > 5) fail(`${path}[${index}]`, 'must be an integer from 1 to 5');
  });
}

function validatePitchRow(row, path, direction) {
  let previous = direction === 'descending' ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
  return array(row, path).map((pitch, index) => {
    const item = object(pitch, `${path}[${index}]`);
    const note = item.note ?? `${item.spelling}${item.written_octave}`;
    const parsed = parsePitch(note, `${path}[${index}]`);
    if (parsed.midi < 21 || parsed.midi > 108) fail(`${path}[${index}]`, 'must remain inside the supported 88-key piano range A0-C8');
    if (item.midi !== parsed.midi) fail(`${path}[${index}].midi`, `must be ${parsed.midi} for ${note}`);
    if (!['white', 'black'].includes(item.key_color)) fail(`${path}[${index}].key_color`, 'must be white or black');
    const expectedColor = [1,3,6,8,10].includes(((parsed.midi % 12) + 12) % 12) ? 'black' : 'white';
    if (item.key_color !== expectedColor) fail(`${path}[${index}].key_color`, `must be ${expectedColor} for MIDI ${parsed.midi}`);
    if (direction === 'ascending' && parsed.midi <= previous) fail(`${path}[${index}].midi`, 'must be strictly ascending');
    if (direction === 'descending' && parsed.midi >= previous) fail(`${path}[${index}].midi`, 'must be strictly descending');
    previous = parsed.midi;
    return parsed.spelling;
  });
}

function nestedSourceIDs(value, found = new Set()) {
  if (Array.isArray(value)) value.forEach((item) => nestedSourceIDs(item, found));
  else if (value && typeof value === 'object') for (const [key, item] of Object.entries(value)) {
    if (key === 'source_id' && typeof item === 'string') found.add(item);
    else if ((key === 'source_ids' || key.endsWith('_source_ids')) && Array.isArray(item)) item.forEach((id) => typeof id === 'string' && found.add(id));
    else nestedSourceIDs(item, found);
  }
  return found;
}

function validatePageBase(url, page, sourceIDs) {
  const path = `pages.${url}`;
  object(page, path);
  if (page.url !== url) fail(`${path}.url`, `must equal ${url}`);
  if (page.metadata?.canonical_path !== url) fail(`${path}.metadata.canonical_path`, `must equal ${url}`);
  nonempty(page.title, `${path}.title`);
  nonempty(page.description, `${path}.description`);
  const blocks = array(page.blocks, `${path}.blocks`);
  const blockIDs = blocks.map((block, index) => {
    object(block, `${path}.blocks[${index}]`);
    nonempty(block.heading, `${path}.blocks[${index}].heading`);
    nonempty(block.body, `${path}.blocks[${index}].body`);
    return block.id ? nonempty(block.id, `${path}.blocks[${index}].id`) : `section-${index + 1}`;
  });
  if (new Set(blockIDs).size !== blockIDs.length) fail(`${path}.blocks`, 'block ids must be unique');
  uniqueStrings(page.source_ids, `${path}.source_ids`).forEach((sourceID) => {
    if (!sourceIDs.has(sourceID)) fail(`${path}.source_ids`, `unknown source id ${sourceID}`);
  });
  array(page.source_groups, `${path}.source_groups`).forEach((group, index) => {
    nonempty(object(group, `${path}.source_groups[${index}]`).id, `${path}.source_groups[${index}].id`);
  });
  for (const sourceID of nestedSourceIDs(page)) if (!sourceIDs.has(sourceID)) fail(path, `unknown nested source id ${sourceID}`);
  const faqResult = validateScaleFaqsForPage(page, sourceIDs);
  if (FAQ_REQUIRED_URLS.has(url) && !faqResult.explicit) fail(`${path}.faqs`, 'must provide explicit keyed answers for every authored question');
}

function validateAssets(value, path) {
  if (value === null) return;
  const assets = object(value, path);
  if (!['planned', 'available'].includes(assets.status)) fail(`${path}.status`, 'must be planned or available');
  if (assets.status === 'available') {
    array(assets.items, `${path}.items`).forEach((item, index) => {
      const asset = object(item, `${path}.items[${index}]`);
      nonempty(asset.path, `${path}.items[${index}].path`);
      nonempty(asset.coverage, `${path}.items[${index}].coverage`);
    });
  }
}

function validateCenter(page) {
  const path = 'pages./scales.data';
  const data = object(page.data, path);
  const expectedDefault = { tonic: 'C', form: 'major', range_octaves: 1, hand: 'right', direction: 'ascending' };
  if (JSON.stringify(data.default_selection) !== JSON.stringify(expectedDefault)) fail(`${path}.default_selection`, 'must preserve the approved C-major RH ascending one-octave default');
  array(data.major_overview, `${path}.major_overview`, { exact: 15 }).forEach((entry, index) => {
    const row = object(entry, `${path}.major_overview[${index}]`);
    nonempty(row.tonic, `${path}.major_overview[${index}].tonic`);
    array(row.notes, `${path}.major_overview[${index}].notes`);
  });
  array(data.minor_overview, `${path}.minor_overview`, { exact: 15 }).forEach((entry, index) => {
    const row = object(entry, `${path}.minor_overview[${index}]`);
    for (const key of ['natural_ascending', 'natural_descending', 'harmonic_ascending', 'harmonic_descending', 'melodic_classical_ascending', 'melodic_classical_descending']) array(row[key], `${path}.minor_overview[${index}].${key}`);
    if (row.fingering !== null) fail(`${path}.minor_overview[${index}].fingering`, 'must remain null; the center catalog has no source-scoped fingering row');
  });
  array(data.form_comparison, `${path}.form_comparison`, { exact: 4 });
  validateAssets(data.print_assets, `${path}.print_assets`);
  validateAssets(data.audio_assets, `${path}.audio_assets`);
}

function validateCMajor(page) {
  const path = 'pages./scales/c-major.data';
  const data = object(page.data, path);
  if (data.tonic !== 'C' || data.scale_type !== 'major') fail(path, 'must preserve the approved C major identity');
  assertTonicCycle(data.notes_ascending, 'C', `${path}.notes_ascending`);
  assertSteps(intervalSteps(data.notes_ascending, `${path}.notes_ascending`), [2,2,1,2,2,2,1], `${path}.notes_ascending`);
  assertSteps(intervalSteps(data.notes_descending, `${path}.notes_descending`, 'descending'), [1,2,2,2,1,2,2], `${path}.notes_descending`);
  for (const hand of ['RH', 'LH']) for (const direction of ['ascending', 'descending']) {
    const rowPath = `${path}.pitch_sequences.${hand}.${direction}`;
    const row = data.pitch_sequences?.[hand]?.[direction];
    const spellings = validatePitchRow(row, rowPath, direction);
    const expected = direction === 'ascending' ? data.notes_ascending : data.notes_descending;
    if (spellings.join() !== expected.join()) fail(rowPath, 'written pitches must match the scale definition');
    validateFingering(data.fingering?.[hand]?.[direction], `${path}.fingering.${hand}.${direction}`, row.length);
  }
}

function validateAMinor(page) {
  const path = 'pages./scales/a-minor.data';
  const data = object(page.data, path);
  if (data.tonic !== 'A') fail(`${path}.tonic`, 'must be A');
  if (JSON.stringify(data.approved_playback_octaves) !== '[1]') fail(`${path}.approved_playback_octaves`, 'must contain only one octave');
  const forms = array(data.forms, `${path}.forms`, { exact: 3 });
  if (forms.map((form) => form.id).join() !== FORM_IDS.join()) fail(`${path}.forms`, `must preserve ${FORM_IDS.join(', ')}`);
  forms.forEach((form, formIndex) => {
    const formPath = `${path}.forms[${formIndex}]`;
    array(form.notes_ascending, `${formPath}.notes_ascending`);
    array(form.notes_descending, `${formPath}.notes_descending`);
    const expectedAscending = {
      natural_minor: [2,1,2,2,1,2,2],
      harmonic_minor: [2,1,2,2,1,3,1],
      melodic_minor_classical: [2,1,2,2,2,2,1],
    }[form.id];
    assertTonicCycle(form.notes_ascending, 'A', `${formPath}.notes_ascending`);
    assertTonicCycle(form.notes_descending, 'A', `${formPath}.notes_descending`);
    assertSteps(intervalSteps(form.notes_ascending, `${formPath}.notes_ascending`), expectedAscending, `${formPath}.notes_ascending`);
    const expectedDescending = form.id === 'melodic_minor_classical' ? [2,2,1,2,2,1,2] : [...expectedAscending].reverse();
    assertSteps(intervalSteps(form.notes_descending, `${formPath}.notes_descending`, 'descending'), expectedDescending, `${formPath}.notes_descending`);
    for (const hand of HAND_KEYS) for (const direction of ['ascending', 'descending']) {
      const key = `${hand}_${direction}_example`;
      const rowPath = `${formPath}.pitch_mapping.${key}`;
      const row = form.pitch_mapping?.[key];
      const spellings = validatePitchRow(row, rowPath, direction);
      const expected = direction === 'ascending' ? form.notes_ascending : form.notes_descending;
      if (spellings.join() !== expected.join()) fail(rowPath, 'written pitches must match the selected minor form and direction');
      validateFingering(form.fingering?.[direction]?.[hand], `${formPath}.fingering.${direction}.${hand}`, row.length);
    }
    const descendingScoped = form.fingering?.descending_source_scope || /both .*ascending and descending|separate .*ascending and descending/i.test(form.fingering?.review_scope ?? '');
    if ((form.fingering?.descending?.right_hand || form.fingering?.descending?.left_hand) && !descendingScoped) fail(`${formPath}.fingering.descending`, 'non-null descending fingering requires exact descending source scope');
  });
}

function validateMajorDetail(page) {
  const data = object(page.data, `pages.${page.url}.data`);
  if (data.scale_type !== 'major') fail(`pages.${page.url}.data.scale_type`, 'must be major');
  const tonicFromURL = page.url.slice('/scales/'.length).replace(/-major$/, '').replace(/-flat$/, 'b').replace(/-sharp$/, '#').replace(/^([a-g])/, (letter) => letter.toUpperCase());
  if (data.tonic !== tonicFromURL) fail(`pages.${page.url}.data.tonic`, `must match URL tonic ${tonicFromURL}`);
  if (array(data.notes_ascending, `pages.${page.url}.data.notes_ascending`).length !== 8) fail(`pages.${page.url}.data.notes_ascending`, 'must contain 8 one-octave events');
  assertTonicCycle(data.notes_ascending, data.tonic, `pages.${page.url}.data.notes_ascending`);
  assertSteps(intervalSteps(data.notes_ascending, `pages.${page.url}.data.notes_ascending`), [2,2,1,2,2,2,1], `pages.${page.url}.data.notes_ascending`);
  assertSteps(intervalSteps(data.notes_descending, `pages.${page.url}.data.notes_descending`, 'descending'), [1,2,2,2,1,2,2], `pages.${page.url}.data.notes_descending`);
  if (Object.values(data.fingering ?? {}).some((row) => row && typeof row === 'object' && !Array.isArray(row) && Object.values(row).some(Array.isArray)) && !data.fingering?.source_ids?.length) fail(`pages.${page.url}.data.fingering.source_ids`, 'non-null fingering rows require scoped source ids');
  for (const hand of ['RH', 'LH']) for (const direction of ['ascending', 'descending']) {
    const path = `pages.${page.url}.data.pitch_sequences.${hand}.${direction}`;
    const row = data.pitch_sequences?.[hand]?.[direction];
    const spellings = validatePitchRow(row, path, direction);
    const expected = direction === 'ascending' ? data.notes_ascending : data.notes_descending;
    if (spellings.join() !== expected.join()) fail(path, 'written pitches must match the scale definition');
    validateFingering(data.fingering?.[hand]?.[direction], `pages.${page.url}.data.fingering.${hand}.${direction}`, row.length);
  }
}

function validateMinorDetail(page) {
  const data = object(page.data, `pages.${page.url}.data`);
  const tonicFromURL = page.url.slice('/scales/'.length).replace(/-minor$/, '').replace(/-flat$/, 'b').replace(/-sharp$/, '#').replace(/^([a-g])/, (letter) => letter.toUpperCase());
  if (data.tonic !== tonicFromURL) fail(`pages.${page.url}.data.tonic`, `must match URL tonic ${tonicFromURL}`);
  if (JSON.stringify(data.approved_playback_octaves) !== '[1]') fail(`pages.${page.url}.data.approved_playback_octaves`, 'must contain only one octave');
  const forms = array(data.forms, `pages.${page.url}.data.forms`, { exact: 3 });
  if (forms.map((form) => form.id).join() !== FORM_IDS.join()) fail(`pages.${page.url}.data.forms`, `must preserve ${FORM_IDS.join(', ')}`);
  forms.forEach((form, formIndex) => {
    const expectedAscending = {
      natural_minor: [2,1,2,2,1,2,2],
      harmonic_minor: [2,1,2,2,1,3,1],
      melodic_minor_classical: [2,1,2,2,2,2,1],
    }[form.id];
    assertTonicCycle(form.notes_ascending, data.tonic, `pages.${page.url}.data.forms[${formIndex}].notes_ascending`);
    assertTonicCycle(form.notes_descending, data.tonic, `pages.${page.url}.data.forms[${formIndex}].notes_descending`);
    assertSteps(intervalSteps(form.notes_ascending, `pages.${page.url}.data.forms[${formIndex}].notes_ascending`), expectedAscending, `pages.${page.url}.data.forms[${formIndex}].notes_ascending`);
    const expectedDescending = form.id === 'melodic_minor_classical' ? [2,2,1,2,2,1,2] : [...expectedAscending].reverse();
    assertSteps(intervalSteps(form.notes_descending, `pages.${page.url}.data.forms[${formIndex}].notes_descending`, 'descending'), expectedDescending, `pages.${page.url}.data.forms[${formIndex}].notes_descending`);
    for (const hand of HAND_KEYS) for (const direction of ['ascending', 'descending']) {
      const key = `${hand}_${direction}_example`, path = `pages.${page.url}.data.forms[${formIndex}].pitch_mapping.${key}`;
      const row = form.pitch_mapping?.[key];
      const spellings = validatePitchRow(row, path, direction);
      const expected = direction === 'ascending' ? form.notes_ascending : form.notes_descending;
      if (spellings.join() !== expected.join()) fail(path, 'written pitches must match the selected minor form and direction');
      validateFingering(form.fingering?.[direction]?.[hand], `pages.${page.url}.data.forms[${formIndex}].fingering.${direction}.${hand}`, row.length);
    }
    const descendingScoped = form.fingering?.descending_source_scope || /both .*ascending and descending|separate .*ascending and descending/i.test(form.fingering?.review_scope ?? '');
    if ((form.fingering?.descending?.right_hand || form.fingering?.descending?.left_hand) && !descendingScoped) fail(`pages.${page.url}.data.forms[${formIndex}].fingering.descending`, 'non-null descending fingering requires exact descending source scope');
  });
}

function validateFamily(page) {
  const examples = array(page.data?.examples, `pages.${page.url}.data.examples`);
  for (const [index, example] of examples.entries()) {
    const path = `pages.${page.url}.data.examples[${index}]`;
    nonempty(example.id, `${path}.id`); nonempty(example.label, `${path}.label`);
    const asc = array(example.ascending_notes, `${path}.ascending_notes`), desc = array(example.descending_notes, `${path}.descending_notes`);
    if (asc.length !== desc.length || asc[0] !== desc.at(-1) || asc.at(-1) !== desc[0]) fail(path, 'ascending/descending endpoints and lengths must agree');
    if (array(example.step_pattern_semitones, `${path}.step_pattern_semitones`).length !== asc.length - 1) fail(`${path}.step_pattern_semitones`, 'must match event count minus one');
    assertSteps(intervalSteps(asc, `${path}.ascending_notes`), example.step_pattern_semitones, `${path}.step_pattern_semitones`);
    if (example.staff?.events_ascending) validateStaffEvents(example.staff.events_ascending, asc, `${path}.staff.events_ascending`, 'ascending');
    if (example.staff?.events_descending) validateStaffEvents(example.staff.events_descending, desc, `${path}.staff.events_descending`, 'descending');
  }
}

function validateStaffEvents(events, expectedSpellings, path, direction) {
  const spellings = validatePitchRow(events.map((event) => ({ note: `${event.pitch}${event.octave}`, midi: parsePitch(`${event.pitch}${event.octave}`, path).midi, key_color: event.key_color })), path, direction);
  if (spellings.join() !== expectedSpellings.join()) fail(path, 'staff spellings must match the authored note sequence');
  return events.map((event) => `${event.pitch}${event.octave}`);
}

function validateArpeggios(page) {
  validateFamily(page);
  for (const [index, example] of page.data.examples.entries()) {
    if (example.ascending_notes.length !== 4 || example.descending_notes.length !== 4) fail(`pages.${page.url}.data.examples[${index}]`, 'arpeggio must contain four one-way events');
    for (const side of ['right_hand','left_hand']) if (example.fingering?.[side]) {
      validateFingering(example.fingering[side].fingers, `pages.${page.url}.data.examples[${index}].fingering.${side}.fingers`, 7);
      if (!example.fingering[side].source_ids?.length) fail(`pages.${page.url}.data.examples[${index}].fingering.${side}`, 'non-null fingering must cite a scoped source');
    }
    for (const [viewIndex, view] of (example.views ?? []).entries()) {
      const path = `pages.${page.url}.data.examples[${index}].views[${viewIndex}]`;
      nonempty(view.view_id, `${path}.view_id`);
      const ascending = validateStaffEvents(view.staff?.events_ascending, example.ascending_notes, `${path}.staff.events_ascending`, 'ascending');
      const descending = validateStaffEvents(view.staff?.events_descending, example.descending_notes, `${path}.staff.events_descending`, 'descending');
      const joined = [...ascending, ...descending.slice(1)];
      if (view.playback?.absolute_pitch_sequence?.join() !== joined.join()) fail(`${path}.playback.absolute_pitch_sequence`, 'must match the selected staff view without a repeated apex');
      if (view.keyboard?.highlighted_pitch_sequence && view.keyboard.highlighted_pitch_sequence.join() !== joined.join()) fail(`${path}.keyboard.highlighted_pitch_sequence`, 'must match the selected staff view');
      if (view.hand === null) {
        if (view.fingering !== null || view.staff?.show_fingering !== false) fail(`${path}.fingering`, 'notes-only hand-neutral views must keep fingering null');
      } else if (view.fingering) {
        if (!view.fingering.source_ids?.length) fail(`${path}.fingering.source_ids`, 'view fingering must cite a scoped source');
        validateFingering(view.fingering.fingers, `${path}.fingering.fingers`, joined.length);
      }
    }
  }
}

export function validateScaleAuthoringBundle(bundle, master) {
  object(bundle, 'bundle');
  const pages = object(bundle.pages, 'pages');
  const suppliedURLs = Object.keys(pages);
  if (!suppliedURLs.length) fail('pages', 'must contain at least one approved Scales page');
  const rejected = suppliedURLs.filter((url) => !SCALE_URLS.includes(url));
  if (rejected.length) fail('pages', `contains unapproved URL(s): ${rejected.join(', ')}`);
  const sourceRows = Array.isArray(bundle.sources) ? bundle.sources : [];
  const sourceIDs = new Set([...(master?.sources ?? []), ...sourceRows].map((source) => source.source_id));
  for (const url of suppliedURLs) {
    validatePageBase(url, pages[url], sourceIDs);
    if (url === '/scales') validateCenter(pages[url]);
    else if (url === '/scales/c-major') validateCMajor(pages[url]);
    else if (url === '/scales/a-minor') validateAMinor(pages[url]);
    else if (pages[url].template_id === 'T12' && pages[url].data.scale_type === 'major') validateMajorDetail(pages[url]);
    else if (pages[url].template_id === 'T12') validateMinorDetail(pages[url]);
    else if (pages[url].template_id === 'T13') validateFamily(pages[url]);
    else if (pages[url].template_id === 'T14') validateArpeggios(pages[url]);
    else if (pages[url].template_id !== 'T22') fail(`pages.${url}.template_id`, 'unsupported fixed Scales template');
  }
  sourceRows.forEach((source, index) => {
    const path = `sources[${index}]`;
    nonempty(object(source, path).source_id, `${path}.source_id`);
    nonempty(source.title, `${path}.title`);
    if (!nonempty(source.url, `${path}.url`).startsWith('https://')) fail(`${path}.url`, 'must use https');
    nonempty(source.locator, `${path}.locator`);
    const supports = source.supports;
    if (!(typeof supports === 'string' && supports.trim()) && !(Array.isArray(supports) && supports.length && supports.every((item) => typeof item === 'string' && item.trim()))) fail(`${path}.supports`, 'must state the supported claim scope');
  });
  return { approved_urls: suppliedURLs, pages_validated: suppliedURLs.length, sources_validated: sourceRows.length };
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  const inputIndex = process.argv.indexOf('--input');
  const masterIndex = process.argv.indexOf('--master');
  if (inputIndex < 0 || !process.argv[inputIndex + 1]) throw new Error('Usage: node scripts/scale-authoring-contract.mjs --input <bundle.json> [--master <master.json>]');
  const masterPath = masterIndex >= 0 ? process.argv[masterIndex + 1] : 'docs/content/site-master/page-content.master.json';
  const bundle = JSON.parse(fs.readFileSync(process.argv[inputIndex + 1], 'utf8'));
  const master = JSON.parse(fs.readFileSync(masterPath, 'utf8'));
  console.log(JSON.stringify(validateScaleAuthoringBundle(bundle, master), null, 2));
}
