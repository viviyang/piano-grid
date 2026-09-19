import { getChordFamilyBrowse, type ChordFamilyBrowseCard } from '@/lib/chord-family-browse';

function FamilyCard({ card }: { card: ChordFamilyBrowseCard }) {
  const countLabel = card.countKind === 'embedded_references'
    ? `${card.count} ${card.count === 1 ? 'embedded reference' : 'embedded references'}`
    : `${card.count} ${card.count === 1 ? 'independent chord page' : 'independent chord pages'}`;
  return (
    <article className="ch-family-card">
      <h4>{card.name}</h4>
      <p>{card.blurb}</p>
      <p className="ch-family-card-count">{countLabel}</p>
      <a className="am-button am-tertiary" href={card.url}>{card.cta}</a>
    </article>
  );
}

export function ChordFamilyBrowse() {
  const model = getChordFamilyBrowse();
  return (
    <section className="ch-family-browse" id="browse-by-type" aria-labelledby="browse-by-type-heading">
      <header>
        <p className="sp-overline">Browse by chord type</p>
        <h2 id="browse-by-type-heading">Browse piano chords</h2>
        <p>Choose a chord family first, then open a specific chord. The chart below stays as a compact major and minor starting set.</p>
      </header>
      <div className="ch-family-browse-group" aria-labelledby="common-chords-heading">
        <h3 id="common-chords-heading">Common chords</h3>
        <div className="ch-family-browse-grid">
          {model.common.map(card => <FamilyCard card={card} key={card.url} />)}
        </div>
      </div>
      <div className="ch-family-browse-group" aria-labelledby="more-chord-types-heading">
        <h3 id="more-chord-types-heading">More chord types</h3>
        <div className="ch-family-browse-grid">
          {model.more.map(card => <FamilyCard card={card} key={card.url} />)}
        </div>
      </div>
    </section>
  );
}
