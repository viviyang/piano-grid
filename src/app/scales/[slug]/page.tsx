import { editorialMetadata } from '@/lib/seo-editorial';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ScaleDetailPage, ScaleFamilyPage } from '@/components/scales/pages';
import { getCompletionScaleDetail, getScaleFamily } from '@/lib/scale-completion-content';
import type { ScaleDetailRoute, ScaleFamilyRoute } from '@/lib/scale-types';

const detailSlugs = ['d-major','e-minor','f-major','g-major','a-major','c-minor','d-minor','e-major','b-minor','f-minor','a-sharp-minor','b-major','b-flat-major','g-minor','e-flat-major','f-sharp-minor','c-flat-major'] as const;
const familySlugs = ['modes','blues','pentatonic','harmonic-major','chromatic'] as const;
const detailSet = new Set<string>(detailSlugs);
const familySet = new Set<string>(familySlugs);

export function generateStaticParams() {
  return [...detailSlugs, ...familySlugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (detailSet.has(slug)) {
    const page = getCompletionScaleDetail(`/scales/${slug}` as ScaleDetailRoute).model.metadata;
    return editorialMetadata({ title: page.title, description: page.description, alternates: { canonical: page.canonical_path }, robots: { index: true, follow: true } });
  }
  if (familySet.has(slug)) {
    const page = getScaleFamily(`/scales/${slug}` as ScaleFamilyRoute).model.metadata;
    return editorialMetadata({ title: page.title, description: page.description, alternates: { canonical: page.canonical_path }, robots: { index: true, follow: true } });
  }
  return {};
}

export default async function ScaleCompletionRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (detailSet.has(slug)) return <ScaleDetailPage url={`/scales/${slug}` as ScaleDetailRoute}/>;
  if (familySet.has(slug)) return <ScaleFamilyPage url={`/scales/${slug}` as ScaleFamilyRoute}/>;
  notFound();
}
