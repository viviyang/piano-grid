import { EasySongsPage } from '@/components/songs/pages';
import { getSongPage } from '@/lib/song-content';

const { metadata: meta } = getSongPage('/songs/easy');
export const metadata = { title: meta.title, description: meta.description, alternates: { canonical: meta.canonicalPath }, robots: { index: true, follow: true } };
export default EasySongsPage;
