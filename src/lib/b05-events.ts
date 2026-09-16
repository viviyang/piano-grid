'use client';

import { getAnalyticsConfiguration, sendAnalyticsEvent, type AnalyticsEventValue } from '@/lib/analytics';

export type SongPlanEventName =
  | 'song_plan_open'
  | 'song_plan_start'
  | 'song_plan_step_view'
  | 'song_plan_self_check'
  | 'song_plan_finish'
  | 'edition_open'
  | 'share_panel_open'
  | 'share_copy_completed'
  | 'share_native_resolved'
  | 'valid_shared_landing';

const allowed = new Set([
  'plan_key',
  'revision',
  'entry_type',
  'step_id',
  'checked',
  'visited_count',
  'self_checked_count',
  'edition_public_key',
  'provider_id',
  'kind',
  'public_key',
]);

export function emitSongPlanEvent(name: SongPlanEventName, properties: Record<string, AnalyticsEventValue> = {}) {
  if (typeof window === 'undefined') return;
  const safe: Record<string, AnalyticsEventValue> = {};
  for (const [key, value] of Object.entries(properties)) if (allowed.has(key)) safe[key] = value;
  const externallySent = sendAnalyticsEvent(name, safe);
  window.dispatchEvent(new CustomEvent('pianogrid:song-plan-event', {
    detail: { name, properties: safe, timestamp: Date.now(), externallySent },
  }));
}

export function getSongPlanMeasurementConfiguration() {
  const config = getAnalyticsConfiguration();
  return {
    provider: config.provider,
    externalTransportEnabled: config.externalTransportEnabled,
    status: config.status,
  } as const;
}
