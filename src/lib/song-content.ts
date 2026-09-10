import { readAuthorizedPage } from './site-content';
import type { EasySongsData, SongBlock, SongCenterData, SongGoal, SongPageModel, SongResource, SongURL } from './song-types';

type Raw = Record<string, any>;
const knownBlocks: Record<SongURL, string[]> = {
  '/songs': ['start', 'section-0', 'section-1', 'section-2', 'section-3', 'section-4', 'section-5', 'resource-use'],
  '/songs/easy': ['start', 'kids', 'c-major', 'adults', 'beautiful', 'start-check'],
};

function requiredString(value: unknown, label: string) {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`Missing ${label}`);
  return value;
}

function toResource(raw: Raw): SongResource {
  const rights = raw.rights;
  if (!rights || rights.site_use !== 'external reference only' || rights.redistribute_score !== false || rights.redistribute_recording !== false) {
    throw new Error(`Unsupported rights for song resource: ${raw.id ?? 'unknown'}`);
  }
  const resourceURL = requiredString(raw.resource_url, `${raw.id}.resource_url`);
  if (!/^https:\/\//.test(resourceURL)) throw new Error(`Song resource must be an HTTPS external URL: ${raw.id}`);
  return {
    id: requiredString(raw.id, 'resource id'),
    workTitle: requiredString(raw.work_title, `${raw.id}.work_title`),
    creator: raw.creator ?? null,
    artist: raw.artist ?? null,
    arranger: raw.arranger ?? null,
    edition: requiredString(raw.edition, `${raw.id}.edition`),
    editionID: raw.edition_id ?? null,
    publisher: requiredString(raw.publisher, `${raw.id}.publisher`),
    format: requiredString(raw.format, `${raw.id}.format`),
    level: raw.level ?? null,
    levelBasis: requiredString(raw.level_basis, `${raw.id}.level_basis`),
    key: raw.key ?? null,
    technicalDemands: raw.technical_demands ?? null,
    whyChoose: raw.why_choose ?? null,
    firstCheck: raw.first_check ?? null,
    editionFeatures: raw.edition_features ?? null,
    access: requiredString(raw.access, `${raw.id}.access`),
    resourceURL,
    rights,
    sourceIDs: Array.isArray(raw.source_ids) ? raw.source_ids : [],
    selectionRole: raw.selection_role ?? null,
  };
}

function model(url: SongURL, page: Raw): SongPageModel {
  const expectedTemplate = url === '/songs' ? 'T15' : 'T16';
  if (page.template_id !== expectedTemplate) throw new Error(`Unexpected template for ${url}`);
  const ids = page.blocks.map((block: Raw) => block.id ?? block.block_id);
  if (JSON.stringify(ids) !== JSON.stringify(knownBlocks[url])) throw new Error(`Unknown or missing core block for ${url}`);
  return {
    url,
    templateID: expectedTemplate,
    title: requiredString(page.title, `${url}.title`),
    description: requiredString(page.description, `${url}.description`),
    userTask: requiredString(page.user_task, `${url}.user_task`),
    metadata: {
      title: requiredString(page.metadata?.title, `${url}.metadata.title`),
      description: requiredString(page.metadata?.description, `${url}.metadata.description`),
      canonicalPath: requiredString(page.metadata?.canonical_path, `${url}.metadata.canonical_path`),
    },
    blocks: page.blocks.map((block: Raw): SongBlock => ({
      id: block.id ?? block.block_id,
      heading: requiredString(block.heading, `${url}.block.heading`),
      body: requiredString(block.body, `${url}.block.body`),
      evidenceStatus: block.evidence_status ?? '',
      sourceIDs: block.source_ids ?? [],
    })),
    sourceGroups: page.source_groups.map((group: Raw) => requiredString(group.id, `${url}.source_group`)),
  };
}

function uniqueResources(raw: Raw[], label: string) {
  const resources = raw.map(toResource);
  if (new Set(resources.map((resource) => resource.id)).size !== resources.length) throw new Error(`Duplicate resource ID in ${label}`);
  return resources;
}

function checkedGoal(id: string, label: string, resourceIDs: string[], availableIDs: Set<string>): SongGoal {
  if (!resourceIDs.length || resourceIDs.some((resourceID) => !availableIDs.has(resourceID))) throw new Error(`Invalid or empty song group: ${id}`);
  return { id, label, resourceIDs };
}

export function getSongPage(url: SongURL) {
  const { page } = readAuthorizedPage(url);
  return model(url, page);
}

export function getSongCenter(): SongCenterData {
  const { page } = readAuthorizedPage('/songs');
  const resources = uniqueResources(page.data.resources, '/songs');
  const ids = new Set(resources.map((resource) => resource.id));
  const bySection = new Map<string, string[]>(page.data.sections.map((section: Raw) => [section.id, section.resource_ids as string[]]));
  const merge = (...sections: string[]) => [...new Set(sections.flatMap((section) => bySection.get(section) ?? []))];
  const goals = [
    checkedGoal('reflective', 'Reflective', merge('reflective'), ids),
    checkedGoal('cheerful', 'Cheerful or playful', merge('happy', 'fun'), ids),
    checkedGoal('beautiful', 'Spacious sound', merge('beautiful'), ids),
    checkedGoal('intermediate', 'Intermediate solo', merge('intermediate'), ids),
    checkedGoal('soundtrack', 'Soundtrack', merge('soundtrack'), ids),
    checkedGoal('sing-and-play', 'Sing and play', merge('sing-and-play'), ids),
  ];
  return {
    model: model('/songs', page),
    resources,
    goals,
    levels: [...new Set(resources.flatMap((resource) => resource.level ? [resource.level] : []))],
    easyURLAvailable: page.data.topic_links.includes('/songs/easy'),
  };
}

export function getEasySongs(): EasySongsData {
  const { page } = readAuthorizedPage('/songs/easy');
  const featuredResources = uniqueResources(page.data.featured_resources, '/songs/easy featured');
  const catalogResources = uniqueResources(page.data.additional_catalog_options, '/songs/easy catalog');
  if (new Set([...featuredResources, ...catalogResources].map((resource) => resource.id)).size !== featuredResources.length + catalogResources.length) throw new Error('Duplicate easy-song resource ID across collections');
  const ids = new Set(featuredResources.map((resource) => resource.id));
  const labels: Record<string, string> = { kids: 'First pieces for children', 'c-major': 'C-major versions', beautiful: 'Gentle choices', adults: 'Adult method', impress: 'Small performance' };
  const sections = Object.entries(page.data.sections).map(([id, resourceIDs]) => checkedGoal(id, labels[id] ?? id, resourceIDs as string[], ids));
  if (featuredResources.length !== page.data.counts.featured_versions || catalogResources.length !== page.data.counts.catalog_tracks) throw new Error('Easy-song counts do not match source data');
  return {
    model: model('/songs/easy', page),
    featuredResources,
    catalogResources,
    sections,
    counts: {
      featuredVersions: page.data.counts.featured_versions,
      catalogTracks: page.data.counts.catalog_tracks,
      individuallyPerformanceTested: page.data.counts.individually_performance_tested,
    },
    numberQueryPolicy: page.data.number_query_policy,
    sort: page.data.sort,
    audioPolicy: page.data.audio_policy,
  };
}
