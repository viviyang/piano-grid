import type { Metadata } from 'next';
import { HomePage } from '@/components/integration/pages';
import {
  HOME_DESCRIPTION,
  HOME_OPEN_GRAPH_DESCRIPTION,
  HOME_OPEN_GRAPH_TITLE,
  HOME_TITLE,
  SITE_NAME,
  WEBSITE_JSON_LD,
} from '@/lib/site-config';

export const metadata: Metadata = {
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  alternates: { canonical: '/' },
  robots: { index: false, follow: false },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: SITE_NAME,
    title: HOME_OPEN_GRAPH_TITLE,
    description: HOME_OPEN_GRAPH_DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: HOME_OPEN_GRAPH_TITLE,
    description: HOME_OPEN_GRAPH_DESCRIPTION,
  },
};

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSON_LD) }} /><HomePage /></>;
}
