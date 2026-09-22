'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { NavigationMenu as N } from '@base-ui/react/navigation-menu';
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
import { ChordTopicIcon } from '@/components/chords/page-toc';
import { FeedbackDialog } from '@/components/feedback/feedback-dialog';
import { useFeedbackAvailability } from '@/components/feedback/feedback-availability';
import { sendAnalyticsEvent } from '@/lib/analytics';
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

const navigationIcons: Record<string, string> = {
  '/keyboard-notes': 'keyboard', '/chords': 'inversions', '/scales': 'major',
  '/songs': 'intro', '/sheet-music': 'print', '/guide': 'read', '/tools': 'practice',
};

function NavigationIcon({ href }: { href: string }) {
  return <span className="site-nav-icon" aria-hidden="true"><ChordTopicIcon id={navigationIcons[href]}/></span>;
}

function isActiveSection(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
    || (href === '/chords' && pathname === '/chord-progressions')
    || (href === '/scales' && pathname === '/arpeggios');
}

function Chevron() {
  return <svg viewBox="0 0 12 12" aria-hidden="true"><path d="m2.5 4.25 3.5 3.5 3.5-3.5"/></svg>;
}

// shadcn Base UI Navigation Menu composition using the existing site tokens.
function MenuPopup() {
  return <N.Portal><N.Positioner className="site-nav-positioner" side="bottom" align="start" sideOffset={8} collisionPadding={16}>
    <N.Popup className="site-nav-popup"><N.Viewport className="site-nav-viewport"/></N.Popup>
  </N.Positioner></N.Portal>;
}

function DesktopNavigation({ className, pathname }: { className: string; pathname: string }) {
  const catalogId = useId();
  const [value, setValue] = useState<string | null>(null);
  const [catalog, setCatalog] = useState<string | null>(null);
  const closeTimer = useRef<number | null>(null);
  const cancelClose = () => {
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  const catalogHoverTimer = useRef<number | null>(null);
  const cancelCatalogHover = () => {
    if (catalogHoverTimer.current !== null) window.clearTimeout(catalogHoverTimer.current);
    catalogHoverTimer.current = null;
  };
  const selectCatalog = (next: string | null) => {
    cancelCatalogHover();
    setCatalog(next);
  };
  const queueCatalogHover = (next: string) => {
    cancelCatalogHover();
    // Wait for the pointer to settle, so diagonal travel to the details column
    // does not activate a different row on the way.
    catalogHoverTimer.current = window.setTimeout(() => {
      setCatalog(next);
      catalogHoverTimer.current = null;
    }, 180);
  };
  const openSection = (next: string | null) => {
    cancelClose();
    if (next !== value) selectCatalog(next === '/chords' || next === '/scales' ? 'major' : null);
    setValue(next);
  };
  const close = () => { cancelClose(); setValue(null); selectCatalog(null); };
  useEffect(() => {
    if (!value) return;
    // Use the pointer's actual position, not leave events bubbling through the
    // portalled popup. Include the gap so slow travel to a link stays inside.
    const trackPointer = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const inside = ['.site-nav-desktop', '.site-nav-positioner'].some(selector => {
        const rect = document.querySelector(selector)?.getBoundingClientRect();
        return rect && event.clientX >= rect.left - 12 && event.clientX <= rect.right + 12
          && event.clientY >= rect.top - 12 && event.clientY <= rect.bottom + 12;
      });
      if (inside) cancelClose();
      else if (closeTimer.current === null) closeTimer.current = window.setTimeout(close, 350);
    };
    document.addEventListener('pointermove', trackPointer, true);
    return () => { document.removeEventListener('pointermove', trackPointer, true); cancelClose(); };
  }, [value]);
  useEffect(() => {
    const media = matchMedia('(min-width: 1201px)');
    const reset = () => { setValue(null); selectCatalog(null); };
    media.addEventListener('change', reset);
    return () => { media.removeEventListener('change', reset); cancelCatalogHover(); cancelClose(); };
  }, []);
  return <N.Root className={`${className} site-nav-desktop`} aria-label="Site sections" value={value}
    onValueChange={(next, event) => {
      // Hover belongs to the complete split row, not just Base UI's button.
      // Keep the primitive's keyboard, focus-out and outside-click dismissal.
      if (event.reason !== 'trigger-hover') openSection(next);
    }} delay={120} closeDelay={200}>
    <N.List className="site-nav-list">{SITE_NAVIGATION.map(section => {
      const active = isActiveSection(pathname, section.href);
      const menus = section.href === '/chords' ? CHORD_MENUS : section.href === '/scales' ? SCALE_MENUS : null;
      return <N.Item className="site-nav-group" key={section.href} value={section.href} data-active={active || undefined}>
        <div className="site-nav-topline" onPointerEnter={event => {
          if (event.pointerType === 'mouse') openSection(section.href);
        }}>
          <N.Link className="site-nav-parent-link" href={section.href} active={pathname === section.href}
            onFocus={() => { openSection(section.href); }} onClick={close}><NavigationIcon href={section.href}/>{section.label}</N.Link>
          <N.Trigger className="site-nav-trigger"
            onMouseEnter={event => event.preventBaseUIHandler()}
            onClick={event => {
              event.preventBaseUIHandler();
              openSection(value === section.href ? null : section.href);
            }} aria-label={`${value === section.href ? 'Close' : 'Open'} ${section.label} menu`}><Chevron/></N.Trigger>
        </div>
        <N.Content className={`site-nav-panel${menus ? " site-nav-panel-catalog" : ""}`}>
          <N.Link className="site-nav-overview-link" onPointerEnter={() => selectCatalog(null)} onFocus={() => selectCatalog(null)} href={section.href} onClick={close}>Browse all {section.label}<span aria-hidden="true">→</span></N.Link>
          {menus ? <div className="site-nav-catalog-layout">
            <N.Root className="site-nav-catalog" orientation="vertical" value={catalog}
              onKeyDown={event => {
                if (event.key === 'Escape' && catalog) {
                  event.stopPropagation();
                  const trigger = event.currentTarget.querySelector<HTMLButtonElement>('[data-expanded] button');
                  selectCatalog(null);
                  trigger?.focus();
                }
              }} onValueChange={selectCatalog} delay={120} closeDelay={200}>
              <h3>Browse</h3>
              <N.List className="site-nav-catalog-list">{menus.map(menu => <N.Item className="site-nav-chord-item" key={menu.id} value={menu.id} data-expanded={catalog === menu.id || undefined}
                onPointerEnter={event => { if (event.pointerType === 'mouse' && catalog !== menu.id) queueCatalogHover(menu.id); }}
                onPointerMove={event => { if (event.pointerType === 'mouse' && catalog !== menu.id) queueCatalogHover(menu.id); }}
                onPointerLeave={cancelCatalogHover}>
                <div className="site-nav-chord-item-topline">
                  {menu.href ? <N.Link className="site-nav-chord-parent-link" href={menu.href} active={pathname === menu.href}
                    onFocus={() => selectCatalog(menu.id)} onClick={close}>{menu.label}</N.Link> : null}
                  <N.Trigger aria-controls={`${catalogId}-${section.href.slice(1)}`}
                    onMouseEnter={event => event.preventBaseUIHandler()}
                    onClick={event => {
                      event.preventBaseUIHandler();
                      cancelCatalogHover();
                      setCatalog(current => current === menu.id ? null : menu.id);
                    }} className={menu.href ? 'site-nav-chord-submenu-trigger' : 'site-nav-chord-group-button'} aria-label={`${catalog === menu.id ? 'Close' : 'Open'} ${menu.label} submenu`}>
                    {!menu.href ? <span>{menu.label}</span> : null}<Chevron/>
                  </N.Trigger>
                </div>
                <N.Content className="site-nav-third-panel" data-kind={menu.id}>
                  <h3>{menu.label}</h3>
                  {menu.href ? <N.Link className="site-nav-catalog-overview" href={menu.href} onClick={close}>{menu.viewAllLabel} →</N.Link> : null}
                  <div className="site-nav-third-links">{menu.children.map(item => <N.Link href={item.href} key={item.href} active={pathname === item.href} onClick={close}>{item.label}</N.Link>)}</div>
                </N.Content>
              </N.Item>)}</N.List>
              <N.Viewport id={`${catalogId}-${section.href.slice(1)}`} className="site-nav-catalog-viewport"/>
            </N.Root>
            <div className="site-nav-chord-direct-groups" onPointerEnter={() => selectCatalog(null)} onFocus={() => selectCatalog(null)}>{(['Explore', 'Learn'] as const).map(group => <section key={group}>
              <h3>{group}</h3>
              {section.children.filter(item => 'group' in item && item.group === group).map(item => <N.Link className="site-nav-child-link" href={item.href} key={item.href} active={pathname === item.href} onClick={close}>{item.label}</N.Link>)}
            </section>)}</div>
          </div> : <div className="site-nav-panel-links">{section.children.map(item => <N.Link className="site-nav-child-link" href={item.href} key={item.href} active={pathname === item.href} onClick={close}>{item.label}</N.Link>)}</div>}
        </N.Content>
      </N.Item>;
    })}</N.List>
    <MenuPopup/>
  </N.Root>;
}

export function SiteNavigation({ variant }: { variant: NavigationVariant }) {
  const { enabled: feedbackEnabled } = useFeedbackAvailability();
  const pathname = usePathname();
  const id = useId().replaceAll(':', '');
  const mobileButton = useRef<HTMLButtonElement>(null);
  const mobileTriggerRefs = useRef(new Map<string, HTMLButtonElement>());
  const catalogMobileTriggerRefs = useRef(new Map<string, HTMLButtonElement>());
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);
  const [openCatalogMobileMenu, setOpenCatalogMobileMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const desktopClass = variant === 'home' ? 'ph-desktop-nav' : 'am-site-nav';
  const menuButtonClass = variant === 'home' ? 'ph-menu-button' : 'am-menu-button';
  const mobileClass = variant === 'home' ? 'ph-mobile-nav' : 'am-mobile-nav';
  function closeMenus() { setOpenMobileSection(null); setOpenCatalogMobileMenu(null); setMobileOpen(false); }
  useEffect(() => {
    const media = matchMedia('(min-width: 1201px)');
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || !mobileOpen) return;
      if (openCatalogMobileMenu) { setOpenCatalogMobileMenu(null); catalogMobileTriggerRefs.current.get(openCatalogMobileMenu)?.focus(); }
      else if (openMobileSection) { setOpenMobileSection(null); mobileTriggerRefs.current.get(openMobileSection)?.focus(); }
      else { setMobileOpen(false); mobileButton.current?.focus(); }
    };
    document.addEventListener('keydown', closeOnEscape);
    media.addEventListener('change', closeMenus);
    return () => { document.removeEventListener('keydown', closeOnEscape); media.removeEventListener('change', closeMenus); };
  }, [mobileOpen, openMobileSection, openCatalogMobileMenu]);

  function renderCatalogMobileChildren(sectionHref: CatalogSectionHref, menus: readonly CatalogMenu[]) {
    const catalogSection = SITE_NAVIGATION.find(section => section.href === sectionHref);
    if (!catalogSection) return null;
    return <div className="site-mobile-children site-mobile-children-chords">
      {menus.map(menu => {
        const menuKey = `${sectionHref}:${menu.id}`;
        const expanded = openCatalogMobileMenu === menuKey;
        const panelId = `${id}-${sectionHref.slice(1)}-${menu.id}-mobile`;
        return <div className="site-mobile-accordion" key={menu.id} data-open={expanded || undefined}>
          <div className="site-mobile-topline">
          {menu.href ? <a className="site-mobile-catalog-parent" href={menu.href} onClick={closeMenus} aria-current={pathname === menu.href ? 'page' : undefined}>{menu.label}</a> : null}
          <button
            ref={node => { if (node) catalogMobileTriggerRefs.current.set(menuKey, node); else catalogMobileTriggerRefs.current.delete(menuKey); }}
            className={`site-mobile-accordion-trigger${menu.href ? ' site-mobile-split-trigger' : ''}`}
            type="button"
            aria-label={menu.href ? `${expanded ? 'Close' : 'Open'} ${menu.label} submenu` : undefined}
            aria-expanded={expanded}
            aria-controls={panelId}
            onClick={() => setOpenCatalogMobileMenu(current => current === menuKey ? null : menuKey)}
          >{!menu.href ? <span>{menu.label}</span> : null}<Chevron/></button>
          </div>
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

  return <div className={`site-navigation site-navigation-${variant}`}>
    <DesktopNavigation className={desktopClass} pathname={pathname}/>
    <button
      ref={mobileButton}
      type="button"
      className={`${menuButtonClass} site-menu-button`}
      aria-expanded={mobileOpen}
      aria-controls={`${id}-mobile-menu`}
      aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
      onClick={() => {
        setMobileOpen(value => !value);
        setOpenMobileSection(null);
        setOpenCatalogMobileMenu(null);
      }}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">{mobileOpen ? <path d="m6 6 12 12M6 18 18 6"/> : <path d="M4 7h16M4 12h16M4 17h16"/>}</svg>
    </button>
    <nav id={`${id}-mobile-menu`} className={`${mobileClass} site-mobile-nav`} aria-label="Mobile site sections" hidden={!mobileOpen}>
      {SITE_NAVIGATION.map(section => {
        const expanded = openMobileSection === section.href;
        const panelId = `${id}-${section.href.slice(1)}-mobile-children`;
        return <section className="site-mobile-section" data-active={isActiveSection(pathname, section.href) || undefined} key={section.href} aria-labelledby={`${id}-${section.href.slice(1).replaceAll('/', '-')}-mobile-heading`}>
        <div className="site-mobile-topline">
        <a id={`${id}-${section.href.slice(1).replaceAll('/', '-')}-mobile-heading`} className="site-mobile-parent" href={section.href} onClick={closeMenus} aria-current={pathname === section.href ? 'page' : undefined}><NavigationIcon href={section.href}/>{section.label}</a>
        <button
          ref={node => { if (node) mobileTriggerRefs.current.set(section.href, node); else mobileTriggerRefs.current.delete(section.href); }}
          className="site-nav-trigger site-mobile-section-trigger"
          type="button"
          aria-label={`${expanded ? 'Close' : 'Open'} ${section.label} menu`}
          aria-expanded={expanded}
          aria-controls={panelId}
          onClick={() => { setOpenMobileSection(current => current === section.href ? null : section.href); setOpenCatalogMobileMenu(null); }}
        ><Chevron/></button>
        </div>
        <div id={panelId} className="site-mobile-section-panel" hidden={!expanded}>
        <a className="site-mobile-overview" href={section.href} onClick={closeMenus}>Browse all {section.label} →</a>
        {section.href === '/chords' || section.href === '/scales'
          ? renderCatalogMobileChildren(section.href, section.href === '/chords' ? CHORD_MENUS : SCALE_MENUS)
          : <div className="site-mobile-children">{section.children.map(item => <a href={item.href} key={item.href} onClick={closeMenus} aria-current={pathname === item.href ? 'page' : undefined}>{item.label}</a>)}</div>}
        </div>
      </section>;
      })}
      {feedbackEnabled && <button type="button" className="site-mobile-feedback" onClick={() => { closeMenus(); setFeedbackOpen(true); sendAnalyticsEvent('feedback_opened', { source: 'global_feedback' }); }}>Feedback</button>}
    </nav>
    {feedbackEnabled && <FeedbackDialog open={feedbackOpen} onClose={() => setFeedbackOpen(false)} pagePath={pathname} returnFocusRef={mobileButton}/>}
  </div>;
}
