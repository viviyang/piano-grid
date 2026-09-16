'use client';

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

type EventValue = string | number | boolean | null;

const allowed = new Set([
  'resource_id',
  'revision',
  'paper',
  'page_kind',
  'page_set',
  'ok',
]);

export function emitTeachingPackEvent(name: TeachingPackEventName, properties: Record<string, EventValue> = {}) {
  if (typeof window === 'undefined') return;
  const safe: Record<string, EventValue> = {};
  for (const [key, value] of Object.entries(properties)) if (allowed.has(key)) safe[key] = value;
  window.dispatchEvent(new CustomEvent('pianogrid:teaching-pack-event', {
    detail: { name, properties: safe, timestamp: Date.now(), externallySent: false },
  }));
}

export function getTeachingPackMeasurementConfiguration() {
  return { collector: 'INSTRUMENTED_NOT_COLLECTED' as const, channel: 'pianogrid:teaching-pack-event' };
}
