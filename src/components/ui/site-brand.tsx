import Link from 'next/link';
import { SITE_NAME } from '@/lib/site-config';
import './site-brand.css';

export function SiteBrand({ className, current = false }: { className?: string; current?: boolean }) {
  return <Link
    className={['site-brand', className].filter(Boolean).join(' ')}
    href="/"
    aria-current={current ? 'page' : undefined}
    data-slot="site-brand"
  >
    <svg className="site-brand-mark" viewBox="0 0 64 64" aria-hidden="true" data-slot="site-brand-mark">
      <path d="M10 36 34 11c3-3 7-4 10-2 4 2 4 6 2 10-2 5 0 8 5 10 3 1 4 4 3 8v7H10Z" fill="currentColor"/>
      <path d="M14 44h5v11h-5zm31 0h5v11h-5z" fill="currentColor"/>
      <path d="M13 36h38v4H13z" className="site-brand-cut"/>
    </svg>
    <span>{SITE_NAME}</span>
  </Link>;
}
