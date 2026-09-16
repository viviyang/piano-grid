'use client';

import type { Layout, ReadingBlock } from '@/lib/keyboard-types';
import { KeyboardNotesWorkspace } from './keyboard-notes-workspace';

export function LookupExperience({ layouts, blocks = [], links = [] }: { layouts: Layout[]; blocks?: ReadingBlock[]; links?: { url: string; label: string }[] }) {
  return <KeyboardNotesWorkspace layouts={layouts} blocks={blocks} links={links}/>;
}
