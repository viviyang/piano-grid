export const SITE_NAME = "PianoGrid";
export const SITE_ALTERNATE_NAME = "Piano Grid";
export const SITE_ORIGIN = "https://pianogrid.com";

export const HOME_TITLE = "Piano Chords, Scales & Practice Tools | PianoGrid";
export const HOME_DESCRIPTION =
  "Learn piano with clear chord and scale references, labeled keyboard notes, beginner songs, sheet music, and practical tools for focused practice.";
export const HOME_OPEN_GRAPH_TITLE = "PianoGrid — Piano Reference & Practice Tools";
export const HOME_OPEN_GRAPH_DESCRIPTION =
  "Clear visual guides and practical tools for chords, scales, notes, songs, sheet music, and everyday piano practice.";

export const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: `${SITE_ORIGIN}/`,
  name: SITE_NAME,
  alternateName: SITE_ALTERNATE_NAME,
} as const;
