import { displayNote } from '@/lib/keyboard-resolution';
import type { Layout } from '@/lib/keyboard-types';
import { ShowMiddleCButton } from './show-middle-c-button';

const CHART_SRC = '/images/keyboard-notes/piano-keys-notes-chart.svg';
const CHART_ALT = 'Piano keys from C4 to C5, with white-key letters, black-key sharp and flat names, and middle C highlighted.';

const FAQ = [
  { q: 'What are the notes on piano keys?', a: 'White keys repeat A, B, C, D, E, F and G. Black keys are commonly named with sharps or flats.' },
  { q: 'Why are there several C keys?', a: 'The note names repeat in each octave. C3, C4 and C5 are different pitches with the same letter name.' },
  { q: 'Is C♯ the same piano key as D♭?', a: 'Yes. On a piano, C♯ and D♭ name the same key. The spelling depends on the musical context.' },
] as const;

function blackKeyPairs(layout: Layout) {
  return layout.keys
    .filter(key => key.midi >= 60 && key.midi < 72 && key.color === 'black')
    .map(key => displayNote(key.label_with_octave.replace(' / ', '/')));
}

export function HubIntro() {
  return (
    <div className="kn-hub-intro">
      <p className="kn-hub-lede">Find any piano note, hear its sound, and learn the keyboard pattern.</p>
      <p className="kn-hub-summary">The white keys repeat A, B, C, D, E, F and G. The black keys form groups of two and three. Start with middle C, or enter a note to find its key.</p>
      <p className="kn-hub-quick-links">
        <a href="#note-chart">Note chart</a>
        <span aria-hidden="true">|</span>
        <a href="/keyboard-notes/labeled">Printable labels</a>
      </p>
    </div>
  );
}

export function HubReference({ layout, links }: { layout: Layout; links: { url: string; label: string }[] }) {
  const pairs = blackKeyPairs(layout);
  const related = links.filter(link => link.url !== '/keyboard-notes');
  return (
    <div className="kn-hub-reference kn-screen">
      <section className="kn-hub-section" id="note-chart">
        <div className="kn-hub-section-head">
          <h2>Piano keys notes chart</h2>
          <p>Use this one-octave chart to learn the repeating pattern. C sits just before a group of two black keys. F sits just before a group of three.</p>
        </div>
        <figure className="kn-hub-chart">
          <img src={CHART_SRC} alt={CHART_ALT} width={1200} height={440} loading="lazy" />
          <figcaption>One octave from C4 to C5. Middle C is C4.</figcaption>
        </figure>
        <div className="kn-hub-chart-legend">
          <p>Black-key names in this octave:</p>
          <ul>{pairs.map(pair => <li key={pair}>{pair}</li>)}</ul>
        </div>
        <p className="kn-hub-resource-links">
          <a href="/keyboard-notes/labeled">View printable labels</a>
          <a href="/keyboard-notes/chart">Match notes to the staff</a>
        </p>
      </section>

      <section className="kn-hub-section kn-hub-article" id="learn-note-names">
        <h2>How to read piano key names</h2>
        <h3>White keys: seven letters, repeated</h3>
        <p>The white keys use the letters A through G. Starting on C, the sequence is C, D, E, F, G, A, B, then C again. The octave number tells you which version of a note to play.</p>
        <h3>Black keys: sharps and flats</h3>
        <p>A black key usually has two familiar names. The key between C and D is C-sharp (C♯) or D-flat (D♭). The five pairs are C♯/D♭, D♯/E♭, F♯/G♭, G♯/A♭ and A♯/B♭. There is no black key between E and F or between B and C. Sharps and flats can also name white keys.</p>
        <h3>Find middle C</h3>
        <p>This guide calls middle C C4. Find the C immediately to the left of a two-black-key group near the middle of your keyboard. Select C4 above to see and hear it.</p>
        <p><ShowMiddleCButton /></p>
        <h3>88-key and 61-key keyboards</h3>
        <p>A standard 88-key piano runs from A0 to C8, with 52 white keys and 36 black keys. A common 61-key layout runs from C2 to C7, spanning five octaves. Check the endpoints of your own instrument; not every keyboard uses the same range.</p>
      </section>

      <aside className="kn-hub-practice-cta">
        <div>
          <h2>Ready to test yourself?</h2>
          <p>Find notes on the keyboard, then review the ones you missed.</p>
        </div>
        <a className="am-button am-secondary" href="#note-trainer">Practice notes</a>
      </aside>

      <section className="kn-hub-section kn-hub-article" aria-labelledby="kn-hub-faq-heading">
        <h2 id="kn-hub-faq-heading">Questions about piano keys notes</h2>
        {FAQ.map(item => (
          <details key={item.q} className="kn-hub-faq">
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
        <details className="kn-hub-faq">
          <summary>Where can I get printable labels?</summary>
          <p>Open our <a href="/keyboard-notes/labeled">labeled keyboard reference</a> for printable learning resources.</p>
        </details>
      </section>

      {related.length > 0 && (
        <nav className="kn-hub-related" aria-label="Related keyboard references">
          {related.map(link => <a key={link.url} href={link.url}>{link.label}</a>)}
          {related.some(link => link.url === '/keyboard-notes/frequencies') ? null : <a href="/keyboard-notes/frequencies">Piano note frequencies</a>}
          {related.some(link => link.url === '/keyboard-notes/finger-numbers') ? null : <a href="/keyboard-notes/finger-numbers">Piano finger numbers</a>}
        </nav>
      )}
    </div>
  );
}
