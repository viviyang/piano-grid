import { readAuthorizedPage } from './site-content';
import type { BlankSheetAsset, BlankSheetModel, PaperID } from './blank-sheet-types';

type Raw = Record<string, any>;
const url = '/tools/blank-sheet-music' as const;
const assetURLs: Record<string, { id: PaperID; label: string; dimensions: string; url: string }> = {
  'assets/blank-piano-staff-letter.pdf': { id: 'letter', label: 'US Letter', dimensions: '8.5 × 11 in', url: '/reference/assets/blank-piano-staff-letter.pdf' },
  'assets/blank-piano-staff-a4.pdf': { id: 'a4', label: 'A4', dimensions: '210 × 297 mm', url: '/reference/assets/blank-piano-staff-a4.pdf' },
};

function requiredString(value: unknown, label: string) {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`Missing ${label}`);
  return value;
}

function toAsset(raw: Raw): BlankSheetAsset {
  const mapped = assetURLs[raw.path];
  if (!mapped || raw.format !== 'PDF' || raw.pages !== 1 || raw.grand_staff_systems !== 6) throw new Error(`Unsupported blank sheet asset: ${raw.path}`);
  if (raw.rights?.site_use !== 'original Piano Reference worksheet; distributable') throw new Error(`Blank sheet asset is not distributable: ${raw.path}`);
  return { ...mapped, pages: raw.pages, grandStaffSystems: raw.grand_staff_systems, access: requiredString(raw.access, `${raw.path}.access`) };
}

export function getBlankSheetModel(): BlankSheetModel {
  const { page } = readAuthorizedPage(url);
  if (page.template_id !== 'T19' || page.blocks.map((block: Raw) => block.id).join() !== 'get,use') throw new Error('Unexpected blank sheet template or blocks');
  if (page.data.preview_asset !== 'assets/blank-piano-staff-preview.svg') throw new Error('Unexpected blank sheet preview');
  if (page.data.account_required !== false) throw new Error('Blank sheet must not require an account');
  if (page.data.notation?.staff_lines !== 5 || page.data.notation?.system_count !== 6 || page.data.notation?.music_content !== 'blank') throw new Error('Unexpected blank sheet notation');
  const assets = page.data.assets.map(toAsset);
  if (assets.length !== 2 || new Set(assets.map((asset: BlankSheetAsset) => asset.id)).size !== 2) throw new Error('Blank sheet requires Letter and A4');
  return {
    url,
    title: requiredString(page.title, 'blank sheet title'),
    description: requiredString(page.description, 'blank sheet description'),
    blocks: page.blocks.map((block: Raw) => ({ id: block.id, heading: requiredString(block.heading, `${block.id}.heading`), body: requiredString(block.body, `${block.id}.body`) })),
    metadata: { title: page.metadata.title, description: page.metadata.description, canonicalPath: page.metadata.canonical_path },
    assets,
    previewURL: '/reference/assets/blank-piano-staff-preview.svg',
    notation: { staffLines: page.data.notation.staff_lines, clefs: page.data.notation.clefs, systemCount: page.data.notation.system_count, musicContent: page.data.notation.music_content },
    accountRequired: false,
    sourceGroups: page.source_groups.map((group: Raw) => group.id),
  };
}
