import { getChartData, getLayouts } from './keyboard-content';
import { readAuthorizedPage } from './site-content';
import type { ExerciseBar, GuideBlock, GuideCenterData, GuideModel, GuideURL, ReadingExercise, ReadingGuideData } from './guide-types';

type Raw = Record<string, any>;
const blockHeadings: Record<GuideURL, string[]> = {
  '/guide': ['Start with three keys', 'Try a four-count pattern', 'Choose the next step'],
  '/guide/read-sheet-music': ['Read in a useful order', 'Use anchors, then count steps', 'FACE has a specific job', 'Check yourself'],
};
const blockIDs: Record<GuideURL, string[]> = {
  '/guide': ['three-keys', 'four-count-pattern', 'next-step'],
  '/guide/read-sheet-music': ['reading-order', 'anchors', 'face', 'check-yourself'],
};
const printableURL = '/assets/guides/piano-starter-and-reading.pdf';

function requiredString(value: unknown, label: string) {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`Missing ${label}`);
  return value;
}

function model(url: GuideURL, page: Raw): GuideModel {
  const expectedTemplate = url === '/guide' ? 'T21' : 'T22';
  if (page.template_id !== expectedTemplate) throw new Error(`Unexpected template for ${url}`);
  const headings = page.blocks.map((block: Raw) => block.heading);
  if (headings.join('\n') !== blockHeadings[url].join('\n')) throw new Error(`Unknown or missing guide block for ${url}`);
  return {
    url,
    title: requiredString(page.title, `${url}.title`),
    description: requiredString(page.description, `${url}.description`),
    blocks: page.blocks.map((block: Raw, index: number): GuideBlock => ({
      id: blockIDs[url][index],
      heading: requiredString(block.heading, `${url}.block.heading`),
      body: requiredString(block.body, `${url}.block.body`),
      sourceIDs: Array.isArray(block.source_ids) ? block.source_ids : [],
    })),
    metadata: {
      title: requiredString(page.metadata?.title, `${url}.metadata.title`),
      description: requiredString(page.metadata?.description, `${url}.metadata.description`),
      canonicalPath: requiredString(page.metadata?.canonical_path, `${url}.metadata.canonical_path`),
    },
    sourceGroups: page.source_groups.map((group: Raw) => requiredString(group.id, `${url}.source_group`)),
  };
}

function asset(raw: Raw) {
  if (raw.path !== 'assets/piano-starter-and-reading.pdf' || raw.format !== 'PDF' || raw.pages !== 4) throw new Error('Unexpected guide printable');
  if (raw.rights?.site_use !== 'original Piano Reference material; distributable') throw new Error('Guide printable is not distributable');
  return printableURL;
}

function event(raw: Raw) {
  if (raw.kind !== 'note' || raw.finger !== null) throw new Error('Unsupported guide exercise event');
  return { pitch: requiredString(raw.pitch, 'exercise pitch'), kind: 'note' as const, onsetQuarters: raw.onset_quarters, durationQuarters: raw.duration_quarters, finger: null };
}

function bar(raw: Raw): ExerciseBar {
  const events = raw.events.map(event);
  const total = events.reduce((sum: number, item: ReturnType<typeof event>) => sum + item.durationQuarters, 0);
  if (total !== raw.total_quarters || raw.total_quarters !== 4) throw new Error(`Invalid four-count bar ${raw.number}`);
  return { number: raw.number, events, totalQuarters: raw.total_quarters };
}

export function getGuidePage(url: GuideURL) {
  const { page } = readAuthorizedPage(url);
  return model(url, page);
}

export function getGuideCenter(): GuideCenterData {
  const { page } = readAuthorizedPage('/guide');
  const assets = page.data.assets;
  if (!Array.isArray(assets) || assets.length !== 1) throw new Error('Guide center requires one checked printable');
  return {
    model: model('/guide', page),
    path: page.data.path.map((step: Raw) => ({ ...step, available: ['/keyboard-notes/chart', '/guide/read-sheet-music'].includes(step.url) })),
    firstExample: bar(page.data.first_example),
    keyboardKeys: getLayouts('/keyboard-notes')[0].keys.filter((key) => key.midi >= 60 && key.midi <= 64),
    printableURL: asset(assets[0]),
  };
}

export function getReadingGuide(): ReadingGuideData {
  const { page } = readAuthorizedPage('/guide/read-sheet-music');
  const chart = getChartData();
  const anchors = page.data.anchor_map.map((anchor: Raw) => {
    const midi = chart.notes.find((note) => note.staff_spellings.some((spelling) => spelling.name === anchor.pitch))?.midi;
    const spelling = chart.notes.find((note) => note.midi === midi)?.staff_spellings.find((item) => item.name === anchor.pitch);
    if (!spelling || !['treble', 'bass'].includes(anchor.clef)) throw new Error(`Missing checked staff position: ${anchor.clef} ${anchor.pitch}`);
    return { clef: anchor.clef as 'treble' | 'bass', pitch: anchor.pitch, position: anchor.position, staff: spelling[anchor.clef as 'treble' | 'bass'] };
  });
  const source = page.data.exercise;
  const exercise: ReadingExercise = {
    id: requiredString(source.id, 'exercise id'),
    title: requiredString(source.title, 'exercise title'),
    clef: source.clef,
    meter: requiredString(source.meter, 'exercise meter'),
    keySignature: requiredString(source.key_signature, 'exercise key signature'),
    quarterUnitsPerBar: source.quarter_units_per_bar,
    bars: source.bars.map(bar),
    goal: requiredString(source.goal, 'exercise goal'),
    difficultyLabel: requiredString(source.difficulty?.label, 'exercise difficulty'),
    fingeringStatus: requiredString(source.fingering_status, 'exercise fingering status'),
  };
  if (exercise.clef !== 'treble' || exercise.quarterUnitsPerBar !== 4 || exercise.bars.length !== 4) throw new Error('Unexpected reading exercise scope');
  return {
    model: model('/guide/read-sheet-music', page),
    anchors,
    trebleSpaces: page.data.treble_spaces,
    bassSpaces: page.data.bass_spaces,
    exercise,
    printableURL: asset(page.data.assets[0]),
    chartURL: page.data.chart_url,
  };
}
