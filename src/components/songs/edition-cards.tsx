import Link from 'next/link';
import { getB05Copy } from '@/lib/b05-content';
import { getBeginnerEditionViews } from '@/lib/b05-editions';

export function BeginnerEditionCards({ withPlanAnchor = false }: { withPlanAnchor?: boolean }) {
  const copy = getB05Copy();
  const views = getBeginnerEditionViews();
  return (
    <section className="pg-song-plan pg-edition-select" aria-labelledby="pg-start-heading">
      <div className="pg-section-lead">
        <div>
          <h2 id="pg-start-heading">{copy.easy.selectionHeading}</h2>
          <p>{copy.easy.selectionNote}</p>
        </div>
      </div>
      <div className="pg-edition-grid">
        {copy.easy.cards.map((card, index) => {
          const mapped = views.find((item) => item.key === card.editionKey);
          const evidence = copy.editionEvidence[card.editionKey];
          if (!mapped || !evidence) throw new Error(`Missing beginner edition mapping: ${card.editionKey}`);
          const primaryHref = withPlanAnchor && index === 0 ? '#first-10-minutes' : mapped.sheetUrl;
          return (
            <article className="pg-edition-card" data-edition-key={card.editionKey} data-arrangement-id={mapped.arrangementId} key={card.editionKey}>
              <p className="pg-caps">{card.editorialLabel}</p>
              <h3>{evidence.workTitle}</h3>
              <p className="pg-version">{evidence.editionTitle}<br />{evidence.provider}</p>
              <p className="pg-reason">{card.reason}</p>
              <p className="pg-access">{evidence.accessLabel}</p>
              <div className="pg-card-actions">
                <a className={index === 0 ? 'am-button am-primary' : 'am-button am-secondary'} href={primaryHref}>{card.primaryLabel}</a>
                {card.secondaryLabel && card.secondaryHref ? <Link className="am-button am-tertiary" href={card.secondaryHref}>{card.secondaryLabel}</Link> : null}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function SongsBeginnerTeaser() {
  const copy = getB05Copy();
  return (
    <section className="pg-song-plan pg-songs-teaser" aria-labelledby="pg-songs-start-heading">
      <div className="pg-section-lead">
        <div>
          <h2 id="pg-songs-start-heading">{copy.songs.sectionTitle}</h2>
          <p>{copy.songs.sectionBody}</p>
        </div>
        <a className="am-button am-primary" href="/songs/easy">{copy.songs.primary}</a>
      </div>
      <BeginnerEditionCards />
      <p><a className="am-button am-tertiary" href="/songs/easy#first-10-minutes">Try a 10-minute starting plan</a></p>
    </section>
  );
}
