'use client';
import { useState } from 'react';

export function buildShareURL(path: string, params: URLSearchParams) {
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

export async function openNativeShare(title: string, url: string) {
  if (!navigator.share) return 'unavailable' as const;
  try {
    await navigator.share({ title, url });
    return 'opened' as const;
  } catch (error) {
    if ((error as DOMException).name === 'AbortError') return 'cancelled' as const;
    return 'unavailable' as const;
  }
}

export function ShareControl({ path, params, label = 'Share this note' }: { path: string; params: URLSearchParams; label?: string }) {
  const [message, setMessage] = useState('');
  function url() { return buildShareURL(path, params); }
  async function copy() {
    setMessage(await copyShareURL(url()) ? 'Link copied. It will reopen this page with the same state.' : 'Copy failed. Copy the address from your browser.');
  }
  async function share() {
    const result = await openNativeShare(document.title, url());
    if (result === 'opened') { setMessage('Sharing options opened.'); return; }
    if (result === 'cancelled') return;
    await copy();
  }
  return <div className="kn-share"><div className="kn-actions"><button type="button" className="am-button am-secondary" onClick={share}>{label}</button><button type="button" className="am-button am-tertiary" onClick={copy}>Copy link</button></div><p className="kn-status" role="status">{message}</p></div>;
}
