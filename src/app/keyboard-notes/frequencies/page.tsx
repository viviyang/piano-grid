import { editorialMetadata } from '@/lib/seo-editorial';
import { KeyboardFrequencyPage } from '@/components/keyboard-notes/pages';
import { getKeyboardPage } from '@/lib/keyboard-content';

const { metadata: meta } = getKeyboardPage('/keyboard-notes/frequencies').model;
export const metadata = editorialMetadata({ title: meta.title, description: meta.description, alternates: { canonical: meta.canonical_path }, robots: { index: true, follow: true } });
export default KeyboardFrequencyPage;
