'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { SITE_NAVIGATION } from '@/lib/site-routes';
import './site-navigation.css';

type NavigationVariant = 'home' | 'content';

function Chevron() {
  return <svg viewBox="0 0 12 12" aria-hidden="true"><path d="m2.5 4.25 3.5 3.5 3.5-3.5"/></svg>;
}

export function SiteNavigation({ variant }: { variant: NavigationVariant }) {
  const pathname = usePathname();
  const id = useId().replaceAll(':', '');
  const root = useRef<HTMLDivElement>(null);
  const mobileButton = useRef<HTMLButtonElement>(null);
  const triggerRefs = useRef(new Map<string, HTMLButtonElement>());
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const desktopClass = variant === 'home' ? 'ph-desktop-nav' : 'am-site-nav';
  const menuButtonClass = variant === 'home' ? 'ph-menu-button' : 'am-menu-button';
  const mobileClass = variant === 'home' ? 'ph-mobile-nav' : 'am-mobile-nav';

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpenSection(null);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (openSection) {
        const trigger = triggerRefs.current.get(openSection);
        setOpenSection(null);
        trigger?.focus();
      } else if (mobileOpen) {
        setMobileOpen(false);
        mobileButton.current?.focus();
      }
    };
    const media = matchMedia('(min-width: 801px)');
    const closeMobile = () => { if (media.matches) setMobileOpen(false); };
    document.addEventListener('pointerdown', closeOutside);
    document.addEventListener('keydown', closeOnEscape);
    media.addEventListener('change', closeMobile);
    return () => {
      document.removeEventListener('pointerdown', closeOutside);
      document.removeEventListener('keydown', closeOnEscape);
      media.removeEventListener('change', closeMobile);
    };
  }, [mobileOpen, openSection]);

  function closeMenus() {
    setOpenSection(null);
    setMobileOpen(false);
  }

  return <div className={`site-navigation site-navigation-${variant}`} ref={root}>
    <nav className={`${desktopClass} site-nav-desktop`} aria-label="Site sections">
      {SITE_NAVIGATION.map(section => {
        const panelId = `${id}-${section.href.slice(1).replaceAll('/', '-') || 'home'}-menu`;
        const sectionActive = pathname === section.href || section.children.some(item => pathname === item.href);
        const expanded = openSection === section.href;
        return <div
          className="site-nav-group"
          data-active={sectionActive || undefined}
          data-open={expanded || undefined}
          key={section.href}
          onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpenSection(null); }}
        >
          <div className="site-nav-topline">
            <a className="site-nav-parent-link" href={section.href} aria-current={pathname === section.href ? 'page' : undefined}>{section.label}</a>
            <button
              ref={node => { if (node) triggerRefs.current.set(section.href, node); else triggerRefs.current.delete(section.href); }}
              className="site-nav-trigger"
              type="button"
              aria-label={`Open ${section.label} menu`}
              aria-expanded={expanded}
              aria-controls={panelId}
              onClick={() => setOpenSection(current => current === section.href ? null : section.href)}
            ><Chevron/></button>
          </div>
          <div className="site-nav-panel" id={panelId} hidden={!expanded}>
            <a className="site-nav-overview-link" href={section.href} onClick={closeMenus} aria-current={pathname === section.href ? 'page' : undefined}>
              <strong>{section.label}</strong><span>Overview</span>
            </a>
            {section.children.map(item => <a className="site-nav-child-link" href={item.href} key={item.href} onClick={closeMenus} aria-current={pathname === item.href ? 'page' : undefined}>{item.label}</a>)}
          </div>
        </div>;
      })}
    </nav>
    <button
      ref={mobileButton}
      type="button"
      className={`${menuButtonClass} site-menu-button`}
      aria-expanded={mobileOpen}
      aria-controls={`${id}-mobile-menu`}
      aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
      onClick={() => setMobileOpen(value => !value)}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">{mobileOpen ? <path d="m6 6 12 12M6 18 18 6"/> : <path d="M4 7h16M4 12h16M4 17h16"/>}</svg>
    </button>
    <nav id={`${id}-mobile-menu`} className={`${mobileClass} site-mobile-nav`} aria-label="Mobile site sections" hidden={!mobileOpen}>
      {SITE_NAVIGATION.map(section => <section className="site-mobile-section" key={section.href} aria-labelledby={`${id}-${section.href.slice(1).replaceAll('/', '-')}-mobile-heading`}>
        <a id={`${id}-${section.href.slice(1).replaceAll('/', '-')}-mobile-heading`} className="site-mobile-parent" href={section.href} onClick={closeMenus} aria-current={pathname === section.href ? 'page' : undefined}>{section.label}</a>
        <div className="site-mobile-children">{section.children.map(item => <a href={item.href} key={item.href} onClick={closeMenus} aria-current={pathname === item.href ? 'page' : undefined}>{item.label}</a>)}</div>
      </section>)}
    </nav>
  </div>;
}
