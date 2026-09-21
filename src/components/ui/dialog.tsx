'use client';

import {
  useEffect,
  useRef,
  type ComponentProps,
  type ReactNode,
  type RefObject,
} from 'react';
import { cn } from '@/lib/utils';
import './dialog.css';

type DialogProps = {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  describedBy?: string;
  returnFocusRef?: RefObject<HTMLElement | null>;
  initialFocusRef?: RefObject<HTMLElement | null>;
  id?: string;
  className?: string;
  children: ReactNode;
};

function Dialog({
  open,
  onClose,
  labelledBy,
  describedBy,
  returnFocusRef,
  initialFocusRef,
  id,
  className,
  children,
}: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const node = dialogRef.current;
    if (!node) return;
    if (open && !node.open) {
      node.showModal();
      initialFocusRef?.current?.focus();
    }
    if (!open && node.open) node.close();
  }, [initialFocusRef, open]);

  return (
    <dialog
      ref={dialogRef}
      id={id}
      className={cn('pr-dialog', className)}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      onClose={() => {
        onClose();
        queueMicrotask(() => {
          const active = document.activeElement;
          if (active && active !== document.body && !dialogRef.current?.contains(active)) return;
          returnFocusRef?.current?.focus();
        });
      }}
      onCancel={(event) => {
        event.preventDefault();
        dialogRef.current?.close();
      }}
      onKeyDown={(event) => {
        if (event.key !== 'Escape') return;
        event.preventDefault();
        event.stopPropagation();
        dialogRef.current?.close();
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) dialogRef.current.close();
      }}
    >
      {children}
    </dialog>
  );
}

function DialogClose({ className, children, onClick, ...props }: ComponentProps<'button'>) {
  return (
    <button
      {...props}
      type="button"
      className={cn('am-button am-tertiary pr-dialog-close', className)}
      aria-label={props['aria-label'] ?? 'Close'}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) event.currentTarget.closest('dialog')?.close();
      }}
    >
      {children ?? (
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 6 12 12M6 18 18 6" />
        </svg>
      )}
    </button>
  );
}

export { Dialog, DialogClose };
