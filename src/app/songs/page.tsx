import { SongsCenterPage } from '@/components/songs/pages';
import { getSongPage } from '@/lib/song-content';

const { metadata: meta } = getSongPage('/songs');
export const metadata = { title: meta.title, description: meta.description, alternates: { canonical: meta.canonicalPath }, robots: { index: false, follow: false } };
export default SongsCenterPage;
