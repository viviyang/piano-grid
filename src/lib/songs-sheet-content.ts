import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { readAuthorizedPage } from './site-content';
import { resolveFirstCheckFields } from './songs-sheet-contracts';
import type { SongBlock, SongResource } from './song-types';
import type { ArrangementView, FirstBatchURL, LearningCard, PagePatch, SheetMusicURL, SongsSheetCatalog } from './songs-sheet-types';

const root = resolve('docs/content/songs-sheet-v2/content-data');
let cached: { catalog: SongsSheetCatalog; patches: PagePatch[]; learning: LearningCard[]; labels: Record<string, string> } | null = null;

function readJSON<T>(relative: string): T {
  return JSON.parse(readFileSync(resolve(root, relative), 'utf8')) as T;
}

function data() {
  if (!cached) {
    const ui = readJSON<{ access_labels: Record<string, string> }>('english/ui-copy.json');
    cached = {
      catalog: readJSON<SongsSheetCatalog>('catalog.v2.json'),
      patches: readJSON<PagePatch[]>('english/pages.patch.json'),
      learning: readJSON<LearningCard[]>('english/learning-cards.v2.json'),
      labels: ui.access_labels,
    };
  }
  return cached;
}

export function getSongsSheetCatalog() {
  return data().catalog;
}

export function getPagePatch(url: FirstBatchURL) {
  const patch = data().patches.find((item) => item.url === url);
  if (!patch) throw new Error(`Missing Songs + Sheet page patch: ${url}`);
  if (patch.metadata.canonical_path !== url) throw new Error(`Canonical mismatch for ${url}`);
  return patch;
}

export function getArrangementView(arrangementId: string): ArrangementView {
  const { catalog, learning, labels } = data();
  const arrangement = catalog.arrangements.find((item) => item.arrangement_id === arrangementId);
  const resource = catalog.resources.find((item) => item.arrangement_id === arrangementId);
  const card = learning.find((item) => item.arrangement_id === arrangementId);
  if (!arrangement || !resource || !card) throw new Error(`Incomplete arrangement registry entry: ${arrangementId}`);
  if (!arrangement.resource_ids.includes(resource.resource_id)) throw new Error(`Arrangement/resource mismatch: ${arrangementId}`);
  if (arrangement.representation === 'external_reference') {
    if (resource.location !== 'external' || resource.site_use !== 'external_reference' || arrangement.score_asset_id || arrangement.audio_asset_id) {
      throw new Error(`Unsafe external arrangement record: ${arrangementId}`);
    }
    if (!/^https:\/\//.test(resource.provider_url ?? '')) throw new Error(`Unsafe provider URL: ${arrangementId}`);
  }
  return { arrangement, resource, learning: card, accessLabel: labels[arrangement.access_kind ?? 'UNKNOWN'] ?? labels.UNKNOWN };
}

export function getViewsForPage(url: FirstBatchURL, includeLockedLocal = false) {
  const ids = getPagePatch(url).sections.flatMap((section) => section.arrangement_ids ?? []);
  return [...new Set(ids)].map(getArrangementView).filter((view) => includeLockedLocal || view.arrangement.representation === 'external_reference');
}

export function getLaunchExternalViews() {
  return ['arr-ext-0a05b7954f5256', 'arr-ext-c3a78b0c5cb213', 'arr-ext-a60b8d92c5a325'].map(getArrangementView);
}

export function getLockedOriginalViews() {
  return ['arr-pg-step-and-hold-v1', 'arr-pg-left-hand-answer-v1', 'arr-pg-one-hand-at-a-time-v1'].map(getArrangementView);
}

export function getLegacySheetContent(url: SheetMusicURL): { blocks: SongBlock[]; resources: SongResource[]; sections: string[]; sourceGroups: string[] } {
  if (!url.startsWith('/sheet-music')) throw new Error(`Not a Sheet Music page: ${url}`);
  const { page } = readAuthorizedPage(url);
  if (!['T17', 'T18'].includes(page.template_id)) throw new Error(`Unexpected Sheet Music template: ${url}`);
  const { catalog } = data();
  const resources = page.data.resources.map((raw: Record<string, any>, index: number): SongResource => {
    if (raw.rights?.site_use !== 'external reference only' || raw.rights.redistribute_score !== false || raw.rights.redistribute_recording !== false) throw new Error(`Unsafe legacy resource: ${raw.id}`);
    const alias = catalog.aliases.find((item) => item.page_url === url && item.legacy_id === raw.id && item.location === `data/resources/${index}`);
    const arrangement = alias && catalog.arrangements.find((item) => item.arrangement_id === alias.arrangement_id);
    const resource = arrangement && catalog.resources.find((item) => item.arrangement_id === arrangement.arrangement_id);
    const work = arrangement && catalog.works.find((item) => item.work_id === arrangement.work_id);
    if (!alias || !arrangement || !resource || !work) throw new Error(`Catalog alias does not resolve: ${url} ${raw.id}`);
    if (resource.location !== 'external' || resource.site_use !== 'external_reference' || arrangement.representation !== 'external_reference') throw new Error(`Catalog resource is not an external reference: ${raw.id}`);
    if (typeof resource.provider_url !== 'string' || !resource.provider_url.startsWith('https://') || resource.provider_url !== raw.resource_url) throw new Error(`Catalog/provider URL mismatch: ${raw.id}`);
    const firstCheck = resolveFirstCheckFields(raw.first_check, raw.prerequisites_or_first_check);
    const variants = arrangement.field_variants ?? {};
    const verificationStatus = arrangement.verification_status ?? arrangement.release.metadata;
    return {
      id: raw.id,
      workTitle: work.title,
      creator: work.creator ?? variants.creator?.[0] ?? null,
      artist: raw.artist ?? null,
      arranger: raw.arranger ?? null,
      edition: arrangement.edition,
      editionID: raw.edition_id ?? null,
      publisher: resource.provider,
      format: variants.format?.join(' / ') ?? raw.format,
      level: arrangement.difficulty.publisher_label,
      levelBasis: arrangement.difficulty.basis,
      key: arrangement.music.key,
      technicalDemands: raw.technical_demands ?? null,
      whyChoose: raw.why_choose ?? null,
      firstCheck: firstCheck.value,
      firstCheckConflict: firstCheck.conflict,
      editionFeatures: arrangement.music.note_inventory?.length ? `Exact catalog note inventory: ${arrangement.music.note_inventory.join(', ')}.` : null,
      access: variants.access?.join(' / ') ?? resource.access.type,
      acquisitionFormat: variants.access?.join(' / ') ?? resource.access.type,
      resourceURL: resource.provider_url,
      rights: { ...raw.rights, reason: raw.rights.reason ?? 'No PianoGrid redistribution permission is established.' },
      sourceIDs: arrangement.source_ids ?? [],
      selectionRole: raw.selection_role ?? null,
      verificationStatus,
      editionKicker: verificationStatus === 'PROVIDER_PAGE_RECHECKED_METADATA_ONLY'
        ? 'Provider listing rechecked — metadata only'
        : 'Preserved external reference — recheck before new claims',
    };
  });
  return {
    blocks: page.blocks.map((block: Record<string, any>) => ({ id: block.id ?? block.block_id, heading: block.heading, body: block.body, evidenceStatus: block.evidence_status ?? '', sourceIDs: block.source_ids ?? [] })),
    resources,
    sections: page.data.sections ?? [],
    sourceGroups: page.source_groups.map((group: Record<string, any>) => group.id),
  };
}
