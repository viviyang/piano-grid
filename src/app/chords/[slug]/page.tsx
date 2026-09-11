import { notFound } from 'next/navigation';
import { ChordDetailPage } from '@/components/chords/detail-page';
import { getChordDetail } from '@/lib/chord-content';
import { EXPANSION_DETAIL_ROUTES, isExpansionChordDetailRoute } from '@/lib/chord-expansion-content';

export function generateStaticParams() {
  return EXPANSION_DETAIL_ROUTES.map(url => ({ slug: url.split('/').at(-1)! }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const url = `/chords/${slug}`;
  if (!isExpansionChordDetailRoute(url)) notFound();
  const { metadata } = getChordDetail(url);
  return { title: metadata.title, description: metadata.description, alternates: { canonical: metadata.canonical_path }, robots: { index: true, follow: true } };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const url = `/chords/${slug}`;
  if (!isExpansionChordDetailRoute(url)) notFound();
  return <ChordDetailPage model={getChordDetail(url)}/>;
}
