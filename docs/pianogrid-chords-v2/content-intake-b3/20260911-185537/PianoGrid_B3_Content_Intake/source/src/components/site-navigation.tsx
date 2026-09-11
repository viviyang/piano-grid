'use client';

import { useEffect, useId, useRef, useState, type CSSProperties } from 'react';
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
  const desktopNav = useRef<HTMLElement>(null);
  const mobileButton = useRef<HTMLButtonElement>(null);
  const triggerRefs = useRef(new Map<string, HTMLButtonElement>());
  const closeTimer = useRef<number | null>(null);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false });
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
      if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    };
  }, [mobileOpen, openSection]);

  function cancelPendingClose() {
    if (closeTimer.current === null) return;
    window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  }

  function closeAfterPointerExit() {
    cancelPendingClose();
    closeTimer.current = window.setTimeout(() => {
      setOpenSection(null);
      closeTimer.current = null;
    }, 360);
  }

  function positionIndicator(link: HTMLAnchorElement | null) {
    const nav = desktopNav.current;
    if (!nav || !link) return;
    const navBox = nav.getBoundingClientRect();
    const linkBox = link.getBoundingClientRect();
    setIndicator({ left: linkBox.left - navBox.left, width: linkBox.width, visible: true });
  }

  useEffect(() => {
    const updateActiveIndicator = () => positionIndicator(desktopNav.current?.querySelector<HTMLAnchorElement>('.site-nav-group[data-active] .site-nav-parent-link') ?? null);
    updateActiveIndicator();
    window.addEventListener('resize', updateActiveIndicator);
    return () => window.removeEventListener('resize', updateActiveIndicator);
  }, [pathname]);

  function closeMenus() {
    setOpenSection(null);
    setMobileOpen(false);
  }

  return <div className={`site-navigation site-navigation-${variant}`} ref={root}>
    <nav className={`${desktopClass} site-nav-desktop`} aria-label="Site sections" ref={desktopNav} onPointerEnter={cancelPendingClose} onPointerLeave={closeAfterPointerExit}>
      <span className="site-nav-indicator" aria-hidden="true" style={{ '--site-nav-indicator-left': `${indicator.left}px`, '--site-nav-indicator-width': `${indicator.width}px`, opacity: indicator.visible ? 1 : 0 } as CSSProperties}/>
      {SITE_NAVIGATION.map(section => {
        const panelId = `${id}-${section.href.slice(1).replaceAll('/', '-') || 'home'}-menu`;
        const sectionActive = pathname === section.href || section.children.some(item => pathname === item.href);
        const expanded = openSection === section.href;
        return <div
          className="site-nav-group"
          data-active={sectionActive || undefined}
          data-open={expanded || undefined}
          key={section.href}
          onPointerEnter={event => { cancelPendingClose(); positionIndicator(event.currentTarget.querySelector<HTMLAnchorElement>('.site-nav-parent-link')); setOpenSection(section.href); }}
          onFocus={event => { positionIndicator(event.currentTarget.querySelector<HTMLAnchorElement>('.site-nav-parent-link')); setOpenSection(section.href); }}
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
              onClick={event => { positionIndicator(event.currentTarget.parentElement?.querySelector<HTMLAnchorElement>('.site-nav-parent-link') ?? null); setOpenSection(current => current === section.href ? null : section.href); }}
            ><Chevron/></button>
          </div>
          <div className="site-nav-panel" id={panelId} hidden={!expanded}>
            <div className="site-nav-panel-intro"><a className="site-nav-overview-link" href={section.href} onClick={closeMenus} aria-current={pathname === section.href ? 'page' : undefined}><strong>{section.label}</strong><span>View overview →</span></a></div>
            <div className="site-nav-panel-links">{section.children.map(item => <a className="site-nav-child-link" href={item.href} key={item.href} onClick={closeMenus} aria-current={pathname === item.href ? 'page' : undefined}>{item.label}<span aria-hidden="true">↗</span></a>)}</div>
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
