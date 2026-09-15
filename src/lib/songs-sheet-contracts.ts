import type { ArrangementRecord, DeploymentContext, PublicCapabilities, SongsSheetCatalog } from './songs-sheet-types';

// The package contract is the executable release authority. This wrapper keeps
// application callers typed and adds the repository's non-public storage gate.
// @ts-expect-error The supplied audited contract is JavaScript without a declaration file.
import * as packageGateModule from '../../docs/content/songs-sheet-v2/contracts/gates.mjs';

const packageGates = packageGateModule as {
  safeProviderUrl: (value: string | null | undefined) => string | null;
  validateCatalog: (catalog: SongsSheetCatalog) => { ok: boolean; errors: string[] };
  canPublishAsset: (catalog: SongsSheetCatalog, assetID: string, action: string, context: DeploymentContext) => { allowed: boolean; reason: string; grantId?: string };
  capabilities: (catalog: SongsSheetCatalog, resourceID: string, context: DeploymentContext) => PublicCapabilities;
  parsePracticeHash: (hash: string, arrangements: ArrangementRecord[], aliases?: Record<string, string>) => { ok: false; error: string } | { ok: true; arrangementId: string; segment: string; speed: number; autoplay: false };
  practiceUrl: (path: string, arrangement: ArrangementRecord, segment: string, speed: number, allowedPaths: string[]) => string;
};

export function publicDeploymentContext(now = new Date()): DeploymentContext {
  return Object.freeze({
    now: now.toISOString(),
    deploymentTerritories: ['WORLDWIDE'],
    commercialSite: true,
    eventSchedulerVerified: true,
  });
}

const LEGACY_EXERCISES: Record<string, string> = {
  'step-and-hold': 'arr-pg-step-and-hold-v1',
  'left-hand-answer': 'arr-pg-left-hand-answer-v1',
  'one-hand-at-a-time': 'arr-pg-one-hand-at-a-time-v1',
};
const ALLOWED_SHARE_DESTINATIONS = ['/songs/easy', '/sheet-music/beginner'];

export function safeProviderUrl(value: string | null | undefined) {
  return packageGates.safeProviderUrl(value);
}

export function resolveFirstCheckFields(firstCheck: unknown, prerequisitesOrFirstCheck: unknown) {
  const first = typeof firstCheck === 'string' && firstCheck.trim() ? firstCheck.trim() : null;
  const fallback = typeof prerequisitesOrFirstCheck === 'string' && prerequisitesOrFirstCheck.trim() ? prerequisitesOrFirstCheck.trim() : null;
  return { value: first ?? fallback, conflict: Boolean(first && fallback && first !== fallback) };
}

function storageHardened(catalog: SongsSheetCatalog): SongsSheetCatalog {
  return {
    ...catalog,
    assets: catalog.assets.map((asset) => asset.storage === 'public' ? asset : { ...asset, release_state: 'staging' }),
  };
}

export function validateCatalog(catalog: SongsSheetCatalog) {
  return packageGates.validateCatalog(catalog);
}

export function canPublishAsset(catalog: SongsSheetCatalog, assetID: string, action: 'display' | 'download' | 'print' | 'play', context: DeploymentContext = publicDeploymentContext()) {
  const asset = catalog.assets.find((item) => item.asset_id === assetID);
  if (!asset || asset.storage !== 'public') return { allowed: false, reason: 'asset_not_in_public_storage' };
  return packageGates.canPublishAsset(storageHardened(catalog), assetID, action, context);
}

export function capabilities(catalog: SongsSheetCatalog, resourceID: string, context: DeploymentContext = publicDeploymentContext()): PublicCapabilities {
  return packageGates.capabilities(storageHardened(catalog), resourceID, context);
}

export type PracticeSelection = { ok: true; arrangementId: string; segment: string; speed: 50 | 75 | 100; autoplay: false } | { ok: false; reason: string };

export function parsePracticeHash(hash: string, arrangements: ArrangementRecord[]): PracticeSelection {
  const parsed = packageGates.parsePracticeHash(hash, arrangements, LEGACY_EXERCISES);
  if (!parsed.ok) return { ok: false, reason: parsed.error };
  return { ok: true, arrangementId: parsed.arrangementId, segment: parsed.segment, speed: parsed.speed as 50 | 75 | 100, autoplay: false };
}

export function practiceUrl(path: string, arrangement: ArrangementRecord, segment = 'all', speed: 50 | 75 | 100 = 100) {
  return packageGates.practiceUrl(path, arrangement, segment, speed, ALLOWED_SHARE_DESTINATIONS);
}
