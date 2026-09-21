'use client';

import { type ReactNode } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

/** Labeled-page card using the shared Collapsible contract and labeled spacing. */
export function LabeledFullReferenceCollapsible({
  title = 'View the full reference',
  defaultOpen = true,
  children,
}: {
  title?: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  return (
    <Collapsible className="kn-labeled-full-card" defaultOpen={defaultOpen}>
      <CollapsibleTrigger>{title}</CollapsibleTrigger>
      <CollapsibleContent aria-label={title}>
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}
