'use client';

import { useId, useState, type ReactNode } from 'react';

/** Labeled-page-only card collapsible. Isolated from shared details/accordions. */
export function LabeledFullReferenceCollapsible({
  title = 'View the full reference',
  defaultOpen = true,
  children,
}: {
  title?: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <div className={`kn-labeled-full-card${open ? ' is-open' : ''}`} data-state={open ? 'open' : 'closed'}>
      <button
        type="button"
        className="kn-labeled-full-card-trigger"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(value => !value)}
      >
        <span>{title}</span>
        <svg className="kn-labeled-full-card-chevron" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <div id={panelId} className="kn-labeled-full-card-panel" hidden={!open} role="region" aria-label={title}>
        {children}
      </div>
    </div>
  );
}
