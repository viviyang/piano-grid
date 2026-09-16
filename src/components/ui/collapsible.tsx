'use client';

import {
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  useState,
  type ComponentProps,
  type ReactNode,
} from 'react';
import { cn } from '@/lib/utils';
import './collapsible.css';

type CollapsibleContextValue = {
  open: boolean;
  setOpen: (next: boolean) => void;
  panelId: string;
};

const CollapsibleContext = createContext<CollapsibleContextValue | null>(null);

function useCollapsibleContext(component: string) {
  const context = useContext(CollapsibleContext);
  if (!context) throw new Error(`${component} must be used within Collapsible`);
  return context;
}

type CollapsibleProps = {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  children: ReactNode;
};

function Collapsible({ defaultOpen = false, open: openProp, onOpenChange, className, children }: CollapsibleProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultOpen);
  const open = openProp ?? uncontrolled;
  const panelId = useId();
  const setOpen = useCallback((next: boolean) => {
    if (openProp === undefined) setUncontrolled(next);
    onOpenChange?.(next);
  }, [onOpenChange, openProp]);
  const value = useMemo(() => ({ open, setOpen, panelId }), [open, panelId, setOpen]);
  return (
    <CollapsibleContext.Provider value={value}>
      <div data-slot="collapsible" data-state={open ? 'open' : 'closed'} className={cn('pr-collapsible', className)}>
        {children}
      </div>
    </CollapsibleContext.Provider>
  );
}

function CollapsibleTrigger({ className, children, onClick, ...props }: ComponentProps<'button'>) {
  const { open, setOpen, panelId } = useCollapsibleContext('CollapsibleTrigger');
  return (
    <button
      type="button"
      data-slot="collapsible-trigger"
      className={cn('pr-collapsible-trigger', className)}
      aria-expanded={open}
      aria-controls={panelId}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) setOpen(!open);
      }}
    >
      <span className="pr-collapsible-trigger-label">{children}</span>
      <svg className="pr-collapsible-chevron" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>
  );
}

function CollapsibleContent({ className, children, ...props }: ComponentProps<'div'>) {
  const { open, panelId } = useCollapsibleContext('CollapsibleContent');
  return (
    <div
      id={panelId}
      data-slot="collapsible-content"
      role="region"
      hidden={!open}
      className={cn('pr-collapsible-content', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
