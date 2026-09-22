import { isPublicRoute } from '../site-routes.ts';

export type FeedbackContext = {
  pagePath: string;
  productArea: string;
  entityType?: string;
  entityId?: string;
};

const PILOT_CONTEXT: Record<string, Pick<FeedbackContext, 'productArea' | 'entityType' | 'entityId'>> = {
  '/chords/c-major': { productArea: 'chords', entityType: 'chord', entityId: 'c-major' },
  '/scales/c-major': { productArea: 'scales', entityType: 'scale', entityId: 'c-major' },
  '/keyboard-notes': { productArea: 'keyboard-notes' },
  '/tools/hear-the-difference': { productArea: 'tools' },
};

const AREAS: ReadonlyArray<[string, string]> = [
  ['/keyboard-notes', 'keyboard-notes'],
  ['/chord-progressions', 'chords'],
  ['/chords', 'chords'],
  ['/scales', 'scales'],
  ['/arpeggios', 'scales'],
  ['/tools', 'tools'],
  ['/songs', 'songs'],
  ['/sheet-music', 'sheet-music'],
  ['/guide', 'guide'],
];

export function resolveFeedbackContext(pagePath: string): FeedbackContext | null {
  if (!isPublicRoute(pagePath)) return null;
  const pilot = PILOT_CONTEXT[pagePath];
  if (pilot) return { pagePath, ...pilot };
  const area = AREAS.find(([prefix]) => pagePath === prefix || pagePath.startsWith(`${prefix}/`));
  return { pagePath, productArea: area?.[1] ?? 'general' };
}

export function isPageFeedbackPilot(pagePath: string) {
  return Object.hasOwn(PILOT_CONTEXT, pagePath);
}
