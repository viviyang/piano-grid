'use client';

import { useState } from 'react';

export function ArrangementShare({ arrangementID }: { arrangementID: string }) {
  const [message, setMessage] = useState('');
  const [fallbackURL, setFallbackURL] = useState('');
  async function copy() {
    const url = new URL(window.location.href);
    url.search = '';
    url.hash = new URLSearchParams({ 'pg-arr': arrangementID, segment: 'all', speed: '100' }).toString();
    try {
      await navigator.clipboard.writeText(url.href);
      setFallbackURL('');
      setMessage('Link copied. It opens this exact version.');
    } catch {
      setFallbackURL(url.href);
      setMessage('Automatic copy failed. Select the exact version link below and copy it manually.');
    }
  }
  return <div className="ss-share"><button className="am-button am-tertiary" type="button" onClick={copy}>Copy this version link</button><span role="status">{message}</span>{fallbackURL && <label className="ss-share-fallback">Exact version link<input aria-label="Exact version link to copy" readOnly value={fallbackURL} onFocus={(event) => event.currentTarget.select()}/></label>}</div>;
}
