'use client';

import { getAnalyticsConfiguration, sendAnalyticsEvent, type AnalyticsEventValue } from '@/lib/analytics';

export type TeachingPackEventName =
  | 'teaching_pack_view'
  | 'teaching_pack_format_change'
  | 'teaching_pack_preview_page'
  | 'teaching_pack_download'
  | 'teaching_pack_print_dialog'
  | 'teaching_pack_print_dialog_closed'
  | 'teaching_pack_share_open'
  | 'teaching_pack_share_copy'
  | 'teaching_pack_practice_open';

const allowed = new Set([
  'resource_id',
  'revision',
  'paper',
  'page_kind',
  'page_set',
  'ok',
]);

export function emitTeachingPackEvent(name: TeachingPackEventName, properties: Record<string, AnalyticsEventValue> = {}) {
  if (typeof window === 'undefined') return;
  const safe: Record<string, AnalyticsEventValue> = {};
  for (const [key, value] of Object.entries(properties)) if (allowed.has(key)) safe[key] = value;
  const externallySent = sendAnalyticsEvent(name, safe);
  window.dispatchEvent(new CustomEvent('pianogrid:teaching-pack-event', {
    detail: { name, properties: safe, timestamp: Date.now(), externallySent },
  }));
}

export function getTeachingPackMeasurementConfiguration() {
  const config = getAnalyticsConfiguration();
  return {
    collector: config.status,
    channel: 'pianogrid:teaching-pack-event' as const,
    externalTransportEnabled: config.externalTransportEnabled,
  };
}
