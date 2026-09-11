import type { CSSProperties } from 'react';

export function RollingText({ children }: { children: string }) {
  const characters = Array.from(children);

  return <span className="pr-rolling-text">
    <span className="pr-sr-only">{children}</span>
    <span className="pr-rolling-text-track pr-rolling-text-current" aria-hidden="true">
      {characters.map((character, index) => <span key={`${character}-${index}`} style={{ '--pr-rolling-index': index } as CSSProperties}>{character === ' ' ? '\u00a0' : character}</span>)}
    </span>
    <span className="pr-rolling-text-track pr-rolling-text-next" aria-hidden="true">
      {characters.map((character, index) => <span key={`${character}-${index}`} style={{ '--pr-rolling-index': index } as CSSProperties}>{character === ' ' ? '\u00a0' : character}</span>)}
    </span>
  </span>;
}
