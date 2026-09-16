import { getArrangementView, getLaunchExternalViews, getSongsSheetCatalog } from './songs-sheet-content';
import { capabilities, publicDeploymentContext, safeProviderUrl } from './songs-sheet-contracts';
import type { ArrangementView } from './songs-sheet-types';

export type BeginnerEditionKey = 'twinkle' | 'hot-cross-buns' | 'ode-to-joy';

export const BEGINNER_EDITION_MAP: Record<BeginnerEditionKey, {
  publicKey: string;
  arrangementId: string;
  sheetUrl: `/sheet-music/${string}`;
}> = {
  twinkle: {
    publicKey: 'twinkle-early-elementary',
    arrangementId: 'arr-ext-c3a78b0c5cb213',
    sheetUrl: '/sheet-music/twinkle-twinkle-little-star',
  },
  'hot-cross-buns': {
    publicKey: 'hot-cross-buns-lesson-1',
    arrangementId: 'arr-ext-0a05b7954f5256',
    sheetUrl: '/sheet-music/hot-cross-buns',
  },
  'ode-to-joy': {
    publicKey: 'ode-to-joy-early-elementary',
    arrangementId: 'arr-ext-a60b8d92c5a325',
    sheetUrl: '/sheet-music/ode-to-joy',
  },
};

const HOFFMAN_HOSTS = new Set(['www.hoffmanacademy.com', 'hoffmanacademy.com']);

export function allowedProviderUrl(raw: string | null | undefined) {
  const safe = safeProviderUrl(raw);
  if (!safe) return null;
  try {
    const host = new URL(safe).hostname;
    if (!HOFFMAN_HOSTS.has(host)) return null;
    return safe;
  } catch {
    return null;
  }
}

export function getBeginnerEditionView(key: BeginnerEditionKey): ArrangementView {
  return getArrangementView(BEGINNER_EDITION_MAP[key].arrangementId);
}

export function getBeginnerEditionViews() {
  const order: BeginnerEditionKey[] = ['twinkle', 'hot-cross-buns', 'ode-to-joy'];
  const launch = new Map(getLaunchExternalViews().map((view) => [view.arrangement.arrangement_id, view]));
  return order.map((key) => {
    const mapped = BEGINNER_EDITION_MAP[key];
    const view = launch.get(mapped.arrangementId) ?? getBeginnerEditionView(key);
    return { key, ...mapped, view };
  });
}

export function inSiteCapabilitiesFor(arrangementId: string) {
  const catalog = getSongsSheetCatalog();
  const resource = catalog.resources.find((item) => item.arrangement_id === arrangementId);
  if (!resource) {
    return { hostedScore: false, playback: false, phraseLoop: false, tempoControl: false, handParts: false };
  }
  const caps = capabilities(catalog, resource.resource_id, publicDeploymentContext());
  return {
    hostedScore: caps.previewLocal,
    playback: caps.playLocal,
    phraseLoop: caps.tempoAndSegments,
    tempoControl: caps.tempoAndSegments,
    handParts: false,
  };
}
