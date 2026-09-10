import type { ReactNode } from 'react';
export function SiteHeader({search,current='Chords'}:{search:ReactNode;current?:string}) {
  const sections=[['Keyboard Notes','/keyboard-notes'],['Chords','/chords'],['Scales','/scales'],['Songs','/songs'],['Guide','/guide'],['Tools','/tools']];
  return <header className="am-site-header am-screen"><div className="pr-container am-header-inner"><a className="am-brand" href="/" aria-current={current==='Home'?'page':undefined}>Piano Reference</a><div className="am-header-right"><nav className="am-site-nav" aria-label="Site sections">{sections.map(([name,url])=><a key={name} href={url} aria-current={name===current?'page':undefined}>{name}</a>)}</nav>{search}</div></div></header>;
}
export function SiteFooter({url}:{url:string}) {return <footer className="am-site-footer am-screen"><div className="pr-container am-footer-inner"><a className="am-footer-brand" href="/">Piano Reference</a><span className="am-footer-note">Local page preview · {url}</span><a href="#main">Back to top ↑</a></div></footer>;}
