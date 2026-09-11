import { ChordFinderPage } from '@/components/support/support-pages';
import { getChordFinder } from '@/lib/support-content';
import { getChordCenter } from '@/lib/chord-content';

function model() {
  const centre = getChordCenter();
  return getChordFinder(centre.items.map(item => ({ id: item.id, name: item.name, root: item.root, quality: item.quality, url: item.url, tones: item.tones }))).model;
}

export function generateMetadata() {
  const { metadata } = model();
  return { title: metadata.title, description: metadata.description, alternates: { canonical: metadata.canonicalPath }, robots: { index: true, follow: true } };
}

export default function Page() { return <ChordFinderPage/>; }
