import { ReadSheetMusicPage } from '@/components/guides/pages';
import { getGuidePage } from '@/lib/guide-content';

const { metadata: meta } = getGuidePage('/guide/read-sheet-music');
export const metadata = { title: meta.title, description: meta.description, alternates: { canonical: meta.canonicalPath }, robots: { index: true, follow: true } };
export default ReadSheetMusicPage;
