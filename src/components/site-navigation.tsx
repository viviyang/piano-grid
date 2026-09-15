'use client';

import { useEffect, useId, useRef, useState, type CSSProperties } from 'react';
import { usePathname } from 'next/navigation';
import {
  CHORD_MAJOR_NAVIGATION,
  CHORD_MINOR_NAVIGATION,
  CHORD_MORE_NAVIGATION,
  SCALE_MAJOR_NAVIGATION,
  SCALE_MINOR_NAVIGATION,
  SCALE_MORE_NAVIGATION,
  SITE_NAVIGATION,
  type PublicRoute,
} from '@/lib/site-routes';
import './site-navigation.css';

type NavigationVariant = 'home' | 'content';
type CatalogMenuId = 'major' | 'minor' | 'more';
type CatalogSectionHref = '/chords' | '/scales';
type CatalogHref = PublicRoute | `${PublicRoute}#${string}`;
type CatalogMenu = {
  id: CatalogMenuId;
  label: string;
  href?: CatalogHref;
  viewAllLabel?: string;
  children: ReadonlyArray<{ readonly label: string; readonly href: PublicRoute }>;
};

const CHORD_MENUS: readonly CatalogMenu[] = [
  {
    id: 'major',
    label: 'Major Chords',
    href: '/chords/major',
    viewAllLabel: 'View all Major Chords',
    children: CHORD_MAJOR_NAVIGATION,
  },
  {
    id: 'minor',
    label: 'Minor Chords',
    href: '/chords/minor',
    viewAllLabel: 'View all Minor Chords',
    children: CHORD_MINOR_NAVIGATION,
  },
  {
    id: 'more',
    label: 'More Chords',
    children: CHORD_MORE_NAVIGATION,
  },
];

const SCALE_MENUS: readonly CatalogMenu[] = [
  {
    id: 'major',
    label: 'Major Scales',
    href: '/scales#chart',
    viewAllLabel: 'View all Major Scales',
    children: SCALE_MAJOR_NAVIGATION,
  },
  {
    id: 'minor',
    label: 'Minor Scales',
    href: '/scales#chart',
    viewAllLabel: 'View all Minor Scales',
    children: SCALE_MINOR_NAVIGATION,
  },
  {
    id: 'more',
    label: 'More Scales',
    children: SCALE_MORE_NAVIGATION,
  },
];

function Chevron() {
  return <svg viewBox="0 0 12 12" aria-hidden="true"><path d="m2.5 4.25 3.5 3.5 3.5-3.5"/></svg>;
}

function containsEventTarget(container: HTMLElement, target: EventTarget | null) {
  return target instanceof Node && container.contains(target);
}

export function SiteNavigation({ variant }: { variant: NavigationVariant }) {
  const pathname = usePathname();
  const id = useId().replaceAll(':', '');
  const root = useRef<HTMLDivElement>(null);
  const desktopNav = useRef<HTMLElement>(null);
  const mobileButton = useRef<HTMLButtonElement>(null);
  const triggerRefs = useRef(new Map<string, HTMLButtonElement>());
  const catalogDesktopTriggerRefs = useRef(new Map<string, HTMLButtonElement>());
  const catalogMobileTriggerRefs = useRef(new Map<string, HTMLButtonElement>());
  const closeTimer = useRef<number | null>(null);
  const suppressDesktopFocusOpen = useRef(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [openCatalogDesktopMenu, setOpenCatalogDesktopMenu] = useState<string | null>(null);
  const [openCatalogMobileMenu, setOpenCatalogMobileMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false });
  const desktopClass = variant === 'home' ? 'ph-desktop-nav' : 'am-site-nav';
  const menuButtonClass = variant === 'home' ? 'ph-menu-button' : 'am-menu-button';
  const mobileClass = variant === 'home' ? 'ph-mobile-nav' : 'am-mobile-nav';

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) {
        setOpenSection(null);
        setOpenCatalogDesktopMenu(null);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (openCatalogDesktopMenu) {
        const trigger = catalogDesktopTriggerRefs.current.get(openCatalogDesktopMenu);
        suppressDesktopFocusOpen.current = true;
        setOpenCatalogDesktopMenu(null);
        trigger?.focus();
        queueMicrotask(() => { suppressDesktopFocusOpen.current = false; });
      } else if (openCatalogMobileMenu) {
        const trigger = catalogMobileTriggerRefs.current.get(openCatalogMobileMenu);
        setOpenCatalogMobileMenu(null);
        trigger?.focus();
      } else if (openSection) {
        const trigger = triggerRefs.current.get(openSection);
        suppressDesktopFocusOpen.current = true;
        setOpenSection(null);
        trigger?.focus();
        queueMicrotask(() => { suppressDesktopFocusOpen.current = false; });
      } else if (mobileOpen) {
        setMobileOpen(false);
        mobileButton.current?.focus();
      }
    };
    const media = matchMedia('(min-width: 801px)');
    const closeMobile = () => {
      if (media.matches) {
        setMobileOpen(false);
        setOpenCatalogMobileMenu(null);
      }
    };
    document.addEventListener('pointerdown', closeOutside);
    document.addEventListener('keydown', closeOnEscape);
    media.addEventListener('change', closeMobile);
    return () => {
      document.removeEventListener('pointerdown', closeOutside);
      document.removeEventListener('keydown', closeOnEscape);
      media.removeEventListener('change', closeMobile);
      if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    };
  }, [mobileOpen, openCatalogDesktopMenu, openCatalogMobileMenu, openSection]);

  function cancelPendingClose() {
    if (closeTimer.current === null) return;
    window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  }

  function closeAfterPointerExit() {
    cancelPendingClose();
    closeTimer.current = window.setTimeout(() => {
      setOpenSection(null);
      setOpenCatalogDesktopMenu(null);
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
    setOpenCatalogDesktopMenu(null);
    setOpenCatalogMobileMenu(null);
    setMobileOpen(false);
  }

  function renderCatalogDesktopPanel(sectionHref: CatalogSectionHref, menus: readonly CatalogMenu[]) {
    const catalogSection = SITE_NAVIGATION.find(section => section.href === sectionHref);
    if (!catalogSection) return null;
    const directGroups = ['Explore', 'Learn'] as const;

    return <div className="site-nav-panel-links site-nav-panel-links-chords">
      <section className="site-nav-link-group site-nav-chord-browse" aria-label="Browse">
        <h3>Browse</h3>
        {menus.map(menu => {
          const menuKey = `${sectionHref}:${menu.id}`;
          const expanded = openCatalogDesktopMenu === menuKey;
          const submenuId = `${id}-${sectionHref.slice(1)}-${menu.id}-desktop`;
          return <div
            className="site-nav-chord-item"
            data-open={expanded || undefined}
            key={menu.id}
            onPointerEnter={() => { cancelPendingClose(); setOpenCatalogDesktopMenu(menuKey); }}
            onPointerMove={() => { cancelPendingClose(); setOpenCatalogDesktopMenu(menuKey); }}
            onPointerLeave={event => {
              if (!containsEventTarget(event.currentTarget, event.relatedTarget)) setOpenCatalogDesktopMenu(null);
            }}
            onFocus={() => { if (!suppressDesktopFocusOpen.current) setOpenCatalogDesktopMenu(menuKey); }}
            onBlur={event => {
              if (!containsEventTarget(event.currentTarget, event.relatedTarget)) setOpenCatalogDesktopMenu(null);
            }}
          >
            <div className="site-nav-chord-item-topline">
              {menu.href
                ? <a className="site-nav-child-link site-nav-chord-parent-link" href={menu.href} onClick={closeMenus} aria-current={pathname === menu.href ? 'page' : undefined}>{menu.label}<span aria-hidden="true">↗</span></a>
                : <button
                    ref={node => { if (node) catalogDesktopTriggerRefs.current.set(menuKey, node); else catalogDesktopTriggerRefs.current.delete(menuKey); }}
                    className="site-nav-chord-group-button"
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={submenuId}
                    onClick={() => setOpenCatalogDesktopMenu(menuKey)}
                  ><span>{menu.label}</span><Chevron/></button>}
              {menu.href ? <button
                  ref={node => { if (node) catalogDesktopTriggerRefs.current.set(menuKey, node); else catalogDesktopTriggerRefs.current.delete(menuKey); }}
                  className="site-nav-chord-submenu-trigger"
                  type="button"
                  aria-label={`Open ${menu.label} submenu`}
                  aria-expanded={expanded}
                  aria-controls={submenuId}
                  onClick={() => setOpenCatalogDesktopMenu(menuKey)}
                ><Chevron/></button> : null}
            </div>
            <div className="site-nav-third-panel" data-kind={menu.id} id={submenuId} hidden={!expanded}>
              <strong className="site-nav-third-heading">{menu.label}</strong>
              <div className="site-nav-third-links">
                {menu.children.map(item => <a className="site-nav-third-link" href={item.href} key={item.href} onClick={closeMenus} aria-current={pathname === item.href ? 'page' : undefined}>{item.label}</a>)}
              </div>
            </div>
          </div>;
        })}
      </section>
      <div className="site-nav-chord-direct-groups" onPointerEnter={() => setOpenCatalogDesktopMenu(null)} onPointerMove={() => setOpenCatalogDesktopMenu(null)}>
        {directGroups.map(group => <section className="site-nav-link-group" key={group} aria-label={group}>
          <h3>{group}</h3>
          {catalogSection.children.filter(item => 'group' in item && item.group === group).map(item => <a className="site-nav-child-link" href={item.href} key={item.href} onClick={closeMenus} aria-current={pathname === item.href ? 'page' : undefined}>{item.label}<span aria-hidden="true">↗</span></a>)}
        </section>)}
      </div>
    </div>;
  }

  function renderCatalogMobileChildren(sectionHref: CatalogSectionHref, menus: readonly CatalogMenu[]) {
    const catalogSection = SITE_NAVIGATION.find(section => section.href === sectionHref);
    if (!catalogSection) return null;
    return <div className="site-mobile-children site-mobile-children-chords">
      {menus.map(menu => {
        const menuKey = `${sectionHref}:${menu.id}`;
        const expanded = openCatalogMobileMenu === menuKey;
        const panelId = `${id}-${sectionHref.slice(1)}-${menu.id}-mobile`;
        return <div className="site-mobile-accordion" key={menu.id} data-open={expanded || undefined}>
          <button
            ref={node => { if (node) catalogMobileTriggerRefs.current.set(menuKey, node); else catalogMobileTriggerRefs.current.delete(menuKey); }}
            className="site-mobile-accordion-trigger"
            type="button"
            aria-expanded={expanded}
            aria-controls={panelId}
            onClick={() => setOpenCatalogMobileMenu(current => current === menuKey ? null : menuKey)}
          ><span>{menu.label}</span><Chevron/></button>
          <div className="site-mobile-accordion-panel" data-kind={menu.id} id={panelId} hidden={!expanded}>
            {menu.href && menu.viewAllLabel ? <a className="site-mobile-view-all" href={menu.href} onClick={closeMenus} aria-current={pathname === menu.href ? 'page' : undefined}>{menu.viewAllLabel}</a> : null}
            {menu.children.map(item => <a href={item.href} key={item.href} onClick={closeMenus} aria-current={pathname === item.href ? 'page' : undefined}>{item.label}</a>)}
          </div>
        </div>;
      })}
      <div className="site-mobile-chord-direct">
        {catalogSection.children.filter(item => 'group' in item && (item.group === 'Explore' || item.group === 'Learn')).map(item => <a href={item.href} key={item.href} onClick={closeMenus} aria-current={pathname === item.href ? 'page' : undefined}>{item.label}</a>)}
      </div>
    </div>;
  }

  return <div className={`site-navigation site-navigation-${variant}`} ref={root}>
    <nav className={`${desktopClass} site-nav-desktop`} aria-label="Site sections" ref={desktopNav} onPointerEnter={cancelPendingClose} onPointerLeave={closeAfterPointerExit}>
      <span className="site-nav-indicator" aria-hidden="true" style={{ '--site-nav-indicator-left': `${indicator.left}px`, '--site-nav-indicator-width': `${indicator.width}px`, opacity: indicator.visible ? 1 : 0 } as CSSProperties}/>
      {SITE_NAVIGATION.map(section => {
        const panelId = `${id}-${section.href.slice(1).replaceAll('/', '-') || 'home'}-menu`;
        const sectionActive = pathname === section.href || pathname.startsWith(`${section.href}/`)
          || (section.href === '/chords' && pathname === '/chord-progressions')
          || (section.href === '/scales' && pathname === '/arpeggios');
        const expanded = openSection === section.href;
        return <div
          className="site-nav-group"
          data-active={sectionActive || undefined}
          data-open={expanded || undefined}
          key={section.href}
          onPointerEnter={event => { cancelPendingClose(); positionIndicator(event.currentTarget.querySelector<HTMLAnchorElement>('.site-nav-parent-link')); setOpenSection(section.href); }}
          onPointerMove={event => { cancelPendingClose(); positionIndicator(event.currentTarget.querySelector<HTMLAnchorElement>('.site-nav-parent-link')); setOpenSection(section.href); }}
          onFocus={event => {
            positionIndicator(event.currentTarget.querySelector<HTMLAnchorElement>('.site-nav-parent-link'));
            if (!suppressDesktopFocusOpen.current) setOpenSection(section.href);
          }}
          onBlur={event => {
            if (!containsEventTarget(event.currentTarget, event.relatedTarget)) {
              setOpenSection(null);
              setOpenCatalogDesktopMenu(null);
            }
          }}
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
              onClick={event => {
                positionIndicator(event.currentTarget.parentElement?.querySelector<HTMLAnchorElement>('.site-nav-parent-link') ?? null);
                setOpenSection(current => current === section.href ? null : section.href);
                setOpenCatalogDesktopMenu(null);
              }}
            ><Chevron/></button>
          </div>
          <div className={`site-nav-panel${section.href === '/chords' || section.href === '/scales' ? ` site-nav-panel-chords${openCatalogDesktopMenu?.startsWith(`${section.href}:`) ? ' site-nav-panel-chords-expanded' : ''}` : ''}`} id={panelId} hidden={!expanded}>
            <div className="site-nav-panel-intro"><a className="site-nav-overview-link" href={section.href} onClick={closeMenus} aria-current={pathname === section.href ? 'page' : undefined}><strong>{section.label}</strong><span>View overview →</span></a></div>
            {section.href === '/chords' || section.href === '/scales'
              ? renderCatalogDesktopPanel(section.href, section.href === '/chords' ? CHORD_MENUS : SCALE_MENUS)
              : <div className="site-nav-panel-links">{section.children.map(item => <a className="site-nav-child-link" href={item.href} key={item.href} onClick={closeMenus} aria-current={pathname === item.href ? 'page' : undefined}>{item.label}<span aria-hidden="true">↗</span></a>)}</div>}
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
      onClick={() => {
        setMobileOpen(value => !value);
        setOpenCatalogMobileMenu(null);
      }}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">{mobileOpen ? <path d="m6 6 12 12M6 18 18 6"/> : <path d="M4 7h16M4 12h16M4 17h16"/>}</svg>
    </button>
    <nav id={`${id}-mobile-menu`} className={`${mobileClass} site-mobile-nav`} aria-label="Mobile site sections" hidden={!mobileOpen}>
      {SITE_NAVIGATION.map(section => <section className="site-mobile-section" key={section.href} aria-labelledby={`${id}-${section.href.slice(1).replaceAll('/', '-')}-mobile-heading`}>
        <a id={`${id}-${section.href.slice(1).replaceAll('/', '-')}-mobile-heading`} className="site-mobile-parent" href={section.href} onClick={closeMenus} aria-current={pathname === section.href ? 'page' : undefined}>{section.label}</a>
        {section.href === '/chords' || section.href === '/scales'
          ? renderCatalogMobileChildren(section.href, section.href === '/chords' ? CHORD_MENUS : SCALE_MENUS)
          : <div className="site-mobile-children">{section.children.map(item => <a href={item.href} key={item.href} onClick={closeMenus} aria-current={pathname === item.href ? 'page' : undefined}>{item.label}</a>)}</div>}
      </section>)}
    </nav>
  </div>;
}
