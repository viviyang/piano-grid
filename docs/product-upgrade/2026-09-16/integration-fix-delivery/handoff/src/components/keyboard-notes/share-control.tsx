'use client';

import { useEffect, useId, useRef, useState, type ReactNode, type RefObject } from 'react';

export function buildShareURL(path: string, params: URLSearchParams) {
  if (typeof window === 'undefined') return `${path}${params.size ? `?${params}` : ''}`;
  return `${window.location.origin}${path}${params.size ? `?${params}` : ''}`;
}

export async function copyShareURL(url: string) {
  try {
    await navigator.clipboard.writeText(url);
    return true;
  } catch {
    return false;
  }
}

export async function openNativeShare(title: string, url: string, text?: string) {
  if (!navigator.share) return 'unavailable' as const;
  try {
    const payload = text ? { title, text, url } : { title, url };
    if (navigator.canShare && !navigator.canShare(payload)) return 'unavailable' as const;
    await navigator.share(payload);
    return 'opened' as const;
  } catch (error) {
    if ((error as DOMException).name === 'AbortError') return 'cancelled' as const;
    return 'unavailable' as const;
  }
}

export type SharePanelProps = {
  heading?: string;
  description: string;
  url: string;
  shareTitle?: string;
  shareText?: string;
  preview?: ReactNode;
  copyLabel?: string;
  shareLabel?: string;
  onCopied?: (url: string, ok: boolean) => void;
  onNative?: (status: 'opened' | 'cancelled' | 'unavailable') => void;
  className?: string;
};

export function SharePanel({
  heading,
  description,
  url,
  shareTitle,
  shareText,
  preview,
  copyLabel = 'Copy link',
  shareLabel = 'More sharing options',
  onCopied,
  onNative,
  className = '',
}: SharePanelProps) {
  const [message, setMessage] = useState('');
  const [manualURL, setManualURL] = useState('');
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    setCanShare(Boolean(typeof navigator !== 'undefined' && navigator.share));
  }, []);

  async function copy() {
    const ok = await copyShareURL(url);
    setManualURL(ok ? '' : url);
    setMessage(ok ? 'Link copied.' : 'Copy isn’t available here. Select the link below.');
    onCopied?.(url, ok);
  }

  async function share() {
    const result = await openNativeShare(shareTitle ?? heading ?? 'Share', url, shareText);
    onNative?.(result);
    if (result === 'opened' || result === 'cancelled') {
      setMessage('');
      return;
    }
    await copy();
  }

  return (
    <div className={`kn-share-panel ${className}`.trim()}>
      {heading ? <h3 className="kn-share-panel-heading">{heading}</h3> : null}
      <p className="kn-share-panel-desc">{description}</p>
      {preview}
      <div className="kn-share-panel-actions">
        <button type="button" className="am-button am-primary" onClick={() => void copy()}>{copyLabel}</button>
        {canShare ? <button type="button" className="am-button am-secondary" onClick={() => void share()}>{shareLabel}</button> : null}
      </div>
      <p className="kn-status kn-share-status" role="status">{message}</p>
      {manualURL ? (
        <label className="kn-v2-manual-link kn-share-manual">
          Share link
          <textarea value={manualURL} readOnly rows={2} onFocus={event => event.currentTarget.select()} />
        </label>
      ) : null}
    </div>
  );
}

export function ShareDialog({
  open,
  onClose,
  returnFocusRef,
  title,
  ...panel
}: SharePanelProps & {
  open: boolean;
  onClose: () => void;
  returnFocusRef?: RefObject<HTMLElement | null>;
  title: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const node = dialog.current;
    if (!node) return;
    if (open && !node.open) node.showModal();
    if (!open && node.open) node.close();
  }, [open]);

  return (
    <dialog
      ref={dialog}
      className="kn-share-dialog kn-v2-share-dialog"
      aria-labelledby={titleId}
      onClose={() => {
        onClose();
        queueMicrotask(() => returnFocusRef?.current?.focus());
      }}
    >
      <div className="am-dialog-head">
        <div>
          <p className="kn-v2-kicker">Share</p>
          <h2 id={titleId}>{title}</h2>
        </div>
        <button type="button" className="am-button am-tertiary" aria-label="Close" onClick={() => dialog.current?.close()}>×</button>
      </div>
      <SharePanel {...panel} />
    </dialog>
  );
}

/** Compatibility wrapper — same helpers, unified copy/fail messaging. */
export function ShareControl({ path, params, label = 'Share this note' }: { path: string; params: URLSearchParams; label?: string }) {
  const [open, setOpen] = useState(false);
  const [inlineStatus, setInlineStatus] = useState('');
  const [shareURL, setShareURL] = useState('');
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setShareURL(buildShareURL(path, params));
  }, [path, params]);

  return (
    <div className="kn-share">
      <div className="kn-actions">
        <button ref={trigger} type="button" className="am-button am-secondary" onClick={() => { setInlineStatus(''); setShareURL(buildShareURL(path, params)); setOpen(true); }}>{label}</button>
        <button
          type="button"
          className="am-button am-tertiary"
          onClick={async () => {
            const href = buildShareURL(path, params);
            setShareURL(href);
            const ok = await copyShareURL(href);
            if (ok) setInlineStatus('Link copied.');
            else {
              setInlineStatus('');
              setOpen(true);
            }
          }}
        >
          Copy link
        </button>
      </div>
      <p className="kn-status" role="status">{inlineStatus}</p>
      <ShareDialog
        open={open}
        onClose={() => setOpen(false)}
        returnFocusRef={trigger}
        title={label}
        description="The link reopens this page with the same reference settings. No personal data is included."
        url={shareURL || `${path}${params.size ? `?${params}` : ''}`}
        shareTitle={typeof document === 'undefined' ? label : document.title}
        copyLabel="Copy link"
        shareLabel="Share"
      />
    </div>
  );
}
