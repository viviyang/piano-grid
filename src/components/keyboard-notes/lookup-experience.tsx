import type { Layout } from '@/lib/keyboard-types';
import { KeyboardNotesWorkspace } from './keyboard-notes-workspace';

export function LookupExperience({ layouts }: { layouts: Layout[] }) {
  return <KeyboardNotesWorkspace layouts={layouts} />;
}
