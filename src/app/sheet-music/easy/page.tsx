import { editorialMetadata } from '@/lib/seo-editorial';
import { getPagePatch } from '@/lib/songs-sheet-content';
import { SheetMusicPage } from '@/components/sheet-music/pages';
const page = getPagePatch('/sheet-music/easy');
export const metadata = editorialMetadata({ title: page.metadata.title, description: page.metadata.description, alternates: { canonical: page.metadata.canonical_path }, robots: { index: true, follow: true } });
export default function Page(){ return <SheetMusicPage url="/sheet-music/easy"/>; }
