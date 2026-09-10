import type { ReactNode } from 'react';
import { SITE_NAME } from '@/lib/site-config';
import { SiteNavigation } from '@/components/site-navigation';
export function SiteHeader({search,current='Chords'}:{search:ReactNode;current?:string}) {
  return <header className="am-site-header am-screen"><div className="pr-container am-header-inner"><a className="am-brand" href="/" aria-current={current==='Home'?'page':undefined}>{SITE_NAME}</a><div className="am-header-right"><SiteNavigation variant="content"/>{search}</div></div></header>;
}
export function SiteFooter({url: _url}:{url:string}) {return <footer className="am-site-footer am-screen"><div className="pr-container am-footer-inner"><a className="am-footer-brand" href="/">{SITE_NAME}</a><span className="am-footer-note">Clear piano references for focused practice.</span><a href="#main">Back to top ↑</a></div></footer>;}
