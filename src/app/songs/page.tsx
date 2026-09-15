import { editorialMetadata } from '@/lib/seo-editorial';
import { SongsCenterPage } from '@/components/songs/pages';
import { getSongPage } from '@/lib/song-content';

const { metadata: meta } = getSongPage('/songs');
export const metadata = editorialMetadata({ title: meta.title, description: meta.description, alternates: { canonical: meta.canonicalPath }, robots: { index: true, follow: true } });
export default SongsCenterPage;
