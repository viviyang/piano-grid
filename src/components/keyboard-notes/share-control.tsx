'use client';
import { useState } from 'react';

export function ShareControl({ path, params, label = 'Share this note' }: { path: string; params: URLSearchParams; label?: string }) {
  const [message, setMessage] = useState('');
  function url() { return `${window.location.origin}${path}${params.size ? `?${params}` : ''}`; }
  async function copy() {
    try { await navigator.clipboard.writeText(url()); setMessage('Link copied. It will reopen this page with the same state.'); }
    catch { setMessage('Copy failed. Copy the address from your browser.'); }
  }
  async function share() {
    if (navigator.share) {
      try { await navigator.share({ title: document.title, url: url() }); setMessage('Share sheet opened.'); return; }
      catch (error) { if ((error as DOMException).name === 'AbortError') return; }
    }
    await copy();
  }
  return <div className="kn-share"><div className="kn-actions"><button type="button" className="am-button am-secondary" onClick={share}>{label}</button><button type="button" className="am-button am-tertiary" onClick={copy}>Copy link</button></div><p className="kn-status" role="status">{message}</p></div>;
}
