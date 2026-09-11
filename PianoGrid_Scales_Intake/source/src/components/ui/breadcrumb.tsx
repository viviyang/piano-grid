import Link from 'next/link';
import type { ComponentProps } from 'react';
import { Fragment } from 'react';
import { cn } from '@/lib/utils';
import './breadcrumb.css';

function Breadcrumb({ className, ...props }: ComponentProps<'nav'>) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" className={cn('pr-breadcrumb', className)} {...props}/>;
}

function BreadcrumbList({ className, ...props }: ComponentProps<'ol'>) {
  return <ol data-slot="breadcrumb-list" className={cn('pr-breadcrumb-list', className)} {...props}/>;
}

function BreadcrumbItem({ className, ...props }: ComponentProps<'li'>) {
  return <li data-slot="breadcrumb-item" className={cn('pr-breadcrumb-item', className)} {...props}/>;
}

function BreadcrumbLink({ className, ...props }: ComponentProps<typeof Link>) {
  return <Link data-slot="breadcrumb-link" className={cn('pr-breadcrumb-link', className)} {...props}/>;
}

function BreadcrumbPage({ className, ...props }: ComponentProps<'span'>) {
  return <span data-slot="breadcrumb-page" role="link" aria-disabled="true" aria-current="page" className={cn('pr-breadcrumb-page', className)} {...props}/>;
}

function BreadcrumbSeparator({ children, className, ...props }: ComponentProps<'li'>) {
  return <li data-slot="breadcrumb-separator" role="presentation" aria-hidden="true" className={cn('pr-breadcrumb-separator', className)} {...props}>
    {children ?? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>}
  </li>;
}

function BreadcrumbEllipsis({ className, ...props }: ComponentProps<'span'>) {
  return <span data-slot="breadcrumb-ellipsis" role="presentation" aria-hidden="true" className={cn('pr-breadcrumb-ellipsis', className)} {...props}>•••</span>;
}

export type BreadcrumbEntry = { label: string; href?: string };

function PageBreadcrumb({ items, className }: { items: BreadcrumbEntry[]; className?: string }) {
  return <Breadcrumb className={className}><BreadcrumbList>{items.map((item, index) => {
    const current = index === items.length - 1;
    return <Fragment key={`${item.href ?? 'current'}-${item.label}`}>
      {index > 0 && <BreadcrumbSeparator/>}
      <BreadcrumbItem>{current ? <BreadcrumbPage>{item.label}</BreadcrumbPage> : <BreadcrumbLink href={item.href!}>{item.label}</BreadcrumbLink>}</BreadcrumbItem>
    </Fragment>;
  })}</BreadcrumbList></Breadcrumb>;
}

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  PageBreadcrumb,
};
