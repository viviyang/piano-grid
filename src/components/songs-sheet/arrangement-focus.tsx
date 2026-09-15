'use client';

import { useEffect, useState } from 'react';

export function ArrangementFocus({ arrangementIDs }: { arrangementIDs: string[] }) {
  const [message, setMessage] = useState('');
  useEffect(() => {
    function restore() {
      if (!window.location.hash) { setMessage(''); return; }
      if (window.location.hash.length > 350) { setMessage('That saved version selection is unavailable. Choose a version below.'); return; }
      const params = new URLSearchParams(window.location.hash.slice(1));
      const keys = [...params.keys()];
      if (keys.some((key, index) => keys.indexOf(key) !== index) || keys.some((key) => !['pg-arr', 'segment', 'speed'].includes(key)) || (params.get('segment') ?? 'all') !== 'all' || (params.get('speed') ?? '100') !== '100') {
        setMessage('That saved version selection is unavailable. Choose a version below.');
        return;
      }
      const id = params.get('pg-arr');
      if (!id || !arrangementIDs.includes(id)) {
        setMessage('That saved version selection is unavailable. Choose a version below.');
        return;
      }
      const target = document.getElementById(id);
      target?.scrollIntoView({ block: 'center' });
      target?.focus({ preventScroll: true });
      setMessage('Saved version selected.');
    }
    restore();
    window.addEventListener('hashchange', restore);
    return () => window.removeEventListener('hashchange', restore);
  }, [arrangementIDs]);
  return <p className="ss-restore-status" role="status">{message}</p>;
}
