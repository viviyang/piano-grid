import type { ReactNode } from 'react';
import { SiteNavigation } from '@/components/site-navigation';
import { SiteBrand } from '@/components/ui/site-brand';
export function SiteHeader({search,current='Chords'}:{search:ReactNode;current?:string}) {
  return <header className="am-site-header am-screen"><div className="pr-container am-header-inner"><SiteBrand className="am-brand" current={current==='Home'}/><div className="am-header-right"><SiteNavigation variant="content"/>{search}</div></div></header>;
}
export function SiteFooter({url: _url}:{url:string}) {return <footer className="am-site-footer am-screen"><div className="pr-container am-footer-inner"><SiteBrand className="am-footer-brand"/><span className="am-footer-note">Clear piano references for focused practice.</span><a href="#main">Back to top ↑</a></div></footer>;}
