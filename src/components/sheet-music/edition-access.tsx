import Link from 'next/link';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { getB05Copy } from '@/lib/b05-content';
import { allowedProviderUrl, type BeginnerEditionKey, getBeginnerEditionView } from '@/lib/b05-editions';
import { ProviderOpenLink } from './provider-open-link';
import '@/components/songs/song-plan.css';

function fact(value: string | null | undefined, fallback: string) {
  return value && value.trim() ? value : fallback;
}

export function SheetEditionAccess({ editionKey }: { editionKey: BeginnerEditionKey }) {
  const copy = getB05Copy();
  const evidence = copy.editionEvidence[editionKey];
  const view = getBeginnerEditionView(editionKey);
  const providerUrl = allowedProviderUrl(view.resource.provider_url) ?? allowedProviderUrl(evidence.providerUrl);
  const unverified = copy.sheet.unverifiedField;
  const music = view.arrangement.music;
  const isTwinkle = editionKey === 'twinkle';
  const practiceBody = isTwinkle
    ? 'Use the Early Elementary edition from Hoffman Academy. Its publisher page links to the matching tutorial and describes a hand-position graphic. Open those materials first, then use the short plan to organize a focused session.'
    : editionKey === 'hot-cross-buns'
      ? 'This link is for the Lesson 1 materials with the parent guide. Begin with the instructions and matching tracks supplied in that package. A different Hot Cross Buns arrangement may use a different starting setup.'
      : 'Check the publisher’s Early Elementary edition and access conditions before starting. Use that edition’s own instructions and available preview to decide what to practice first.';

  return (
    <section className="ss-primary pg-song-plan pg-sheet-block">
      <div className="pg-sheet-layout" id={view.arrangement.arrangement_id} data-arrangement-id={view.arrangement.arrangement_id}>
      <div className="pg-sheet-info">
        <h2 className="pg-caps">{copy.sheet.accessHeading}</h2>
        <h3>{evidence.editionTitle}</h3>
        <p className="pg-source">{evidence.provider} · {evidence.level}</p>
        <p className="pg-access">{evidence.accessLabel}</p>
        {providerUrl ? <ProviderOpenLink href={providerUrl} label={copy.sheet.providerButton} editionKey={editionKey} /> : null}
        <p className="pg-small pg-muted pg-sheet-note">{copy.sheet.noHostedAssets}</p>
        <Collapsible className="pg-sheet-details" defaultOpen={false}>
          <CollapsibleTrigger>{copy.sheet.technicalDetailsLabel}</CollapsibleTrigger>
          <CollapsibleContent>
            <dl className="pr-collapsible-facts">
              <div><dt>{copy.sheet.publisherLevelLabel}</dt><dd>{fact(view.arrangement.difficulty.publisher_label, unverified)}</dd></div>
              <div><dt>Key</dt><dd>{fact(music.key, unverified)}</dd></div>
              <div><dt>Meter</dt><dd>{music.meter ? music.meter.join('/') : unverified}</dd></div>
              <div><dt>Hands</dt><dd>{music.hands?.length ? music.hands.join(' and ') : unverified}</dd></div>
              <div><dt>Fingering</dt><dd>{music.fingering ? 'Edition-specific evidence available' : unverified}</dd></div>
            </dl>
          </CollapsibleContent>
        </Collapsible>
      </div>
      <aside className="pg-sheet-aside">
        <h2>{isTwinkle ? copy.sheet.practiceHeading : editionKey === 'hot-cross-buns' ? 'Begin with the Lesson 1 materials' : 'Check the edition before practicing'}</h2>
        <p>{practiceBody}</p>
        {isTwinkle
          ? <Link className="am-button am-primary" href="/songs/easy#first-10-minutes">{copy.sheet.planButton}</Link>
          : <Link className="am-button am-primary" href="/songs/easy">{copy.sheet.genericButton}</Link>}
        <p className="pg-small">{isTwinkle ? 'The plan does not listen to or grade your playing.' : 'Check the materials and choose a short section that suits your starting point.'}</p>
      </aside>
      </div>
    </section>
  );
}
