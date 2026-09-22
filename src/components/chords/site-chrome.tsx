import type { ReactNode } from 'react';
import { SiteNavigation } from '@/components/site-navigation';
import { SiteBrand } from '@/components/ui/site-brand';
import { SITE_NAVIGATION } from '@/lib/site-routes';
import { FeedbackEntry } from '@/components/feedback/feedback-entry';
import { PageFeedback } from '@/components/feedback/page-feedback';
import { isPageFeedbackPilot } from '@/lib/feedback/context';
export function SiteHeader({search,current='Chords'}:{search:ReactNode;current?:string}) {
  return <header className="am-site-header am-screen"><div className="pr-container am-header-inner"><SiteBrand className="am-brand" current={current==='Home'}/><SiteNavigation variant="content"/><div className="am-header-right">{search}</div></div></header>;
}
export function SiteFooter({url}:{url:string}) {return <>{isPageFeedbackPilot(url)?<PageFeedback pagePath={url}/>:null}<footer className="am-site-footer am-screen"><div className="pr-container am-footer-inner"><SiteBrand className="am-footer-brand"/><span className="am-footer-note">Learn piano, one step at a time.</span><a href="#main">Back to top ↑</a><FeedbackEntry pagePath={url}/></div><nav className="pr-container am-footer-topics" aria-label="Footer navigation">{SITE_NAVIGATION.map(section=><a href={section.href} key={section.href}>{section.label}</a>)}</nav></footer></>;}
