'use client';

import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { emitScaleEvent } from '@/lib/scale-events';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  event: 'resource' | 'related';
  assetID?: string;
  paperSize?: 'Letter' | 'A4';
};

export function ScaleTrackedLink({ children, event, assetID, paperSize, href = '', ...props }: Props) {
  return <a {...props} href={href} onClick={() => {
    if (event === 'resource') emitScaleEvent('scale_resource_requested', { asset_id: assetID ?? String(href), paper_size: paperSize ?? null, target: String(href) });
    else emitScaleEvent('scale_related_reference_opened', { target: String(href) });
  }}>{children}</a>;
}
