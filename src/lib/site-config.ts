export const SITE_NAME = "PianoGrid";
export const SITE_ALTERNATE_NAME = "Piano Grid";
export const SITE_ORIGIN = "https://pianogrid.com";

export const HOME_TITLE = "Learn Piano: Chords, Scales & Practice Tools | PianoGrid";
export const HOME_DESCRIPTION =
  "Find piano notes, explore chords and scales, choose songs, and follow beginner guides—with blank staff paper and practical tools to help you play.";
export const HOME_OPEN_GRAPH_TITLE = HOME_TITLE;
export const HOME_OPEN_GRAPH_DESCRIPTION =
  HOME_DESCRIPTION;

export const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: `${SITE_ORIGIN}/`,
  name: SITE_NAME,
  alternateName: SITE_ALTERNATE_NAME,
} as const;
