import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export type B05Copy = {
  editionEvidence: Record<string, {
    workTitle: string;
    editionTitle: string;
    provider: string;
    providerUrl: string;
    sheetUrl: string;
    level: string;
    accessLabel: string;
    accessKind: string;
  }>;
  songs: { h1: string; intro: string; sectionTitle: string; sectionBody: string; primary: string; browseHeading: string };
  easy: {
    h1: string;
    intro: string;
    selectionHeading: string;
    selectionNote: string;
    cards: Array<{
      editionKey: string;
      editorialLabel: string;
      reason: string;
      primaryLabel: string;
      primaryHref: string;
      secondaryLabel: string | null;
      secondaryHref: string | null;
    }>;
    plan: {
      publicKey: string;
      revision: number;
      anchor: string;
      title: string;
      subtitle: string;
      editionCaption: string;
      intro: string;
      primaryLabel: string;
      secondaryLabel: string;
      shareLabel: string;
      progressLabel: string;
      next: string;
      previous: string;
      done: string;
      exit: string;
      steps: Array<{
        id: string;
        timeLabel: string;
        title: string;
        body: string;
        actionLabel: string | null;
        action: string | null;
        checkLabel: string;
        helpTitle: string;
        helpBody: string;
        optionalLinks: Array<{ label: string; href: string }>;
      }>;
      selfReportOptions: Array<{ value: string; label: string }>;
      result: { title: string; body: string; revisit: string; nextSong: string; share: string; shareBody: string };
      shared: { label: string; body: string };
      expired: { title: string; body: string; action: string };
    };
    learnSections: Array<{ h2: string; body: string }>;
  };
  sheet: {
    introTemplate: string;
    accessHeading: string;
    sourceHeading: string;
    practiceHeading: string;
    unverifiedField: string;
    providerButton: string;
    planButton: string;
    genericButton: string;
    noHostedAssets: string;
    publisherLevelLabel: string;
    technicalDetailsLabel: string;
  };
};

let cached: B05Copy | null = null;

export function getB05Copy(): B05Copy {
  if (!cached) {
    cached = JSON.parse(readFileSync(resolve('docs/product-upgrade/b05-b07-v2/data/content.en.json'), 'utf8')) as B05Copy;
  }
  return cached;
}
