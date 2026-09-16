'use client';

import { emitSongPlanEvent } from '@/lib/b05-events';
import type { BeginnerEditionKey } from '@/lib/b05-editions';

const PUBLIC_KEYS: Record<BeginnerEditionKey, string> = {
  twinkle: 'twinkle-early-elementary',
  'hot-cross-buns': 'hot-cross-buns-lesson-1',
  'ode-to-joy': 'ode-to-joy-early-elementary',
};

export function ProviderOpenLink({ href, label, editionKey }: { href: string; label: string; editionKey: BeginnerEditionKey }) {
  return (
    <a
      className="am-button am-primary"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => emitSongPlanEvent('edition_open', { edition_public_key: PUBLIC_KEYS[editionKey], provider_id: 'hoffman-academy' })}
    >
      {label} <span className="pg-sr">Opens Hoffman Academy in a new tab</span>
    </a>
  );
}
