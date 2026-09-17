# Chord Discovery Audit

Date: 2026-09-17. Worktree: `pianogrid-final-integration` (`codex/final-integration`). Scope: visible user paths for Chord hub, family, and detail pages. This is a product-discovery audit, not a crawler-only link graph.

## User questions

| Question | After this round |
|---|---|
| Where do I find all chords? | Header **Chords → Browse all chords**, mobile **Browse all chords**, and the `/chords` heading **Browse by chord type**. |
| Where do I find Seventh / Diminished / Add9? | Hub **Common chords** / **More chord types** cards, or Header **More Chords**. |
| Where do I find C7 / Cm7 / Cadd9? | Open the family page, then a visible card. One click from family. |

## Path contract

From `/chords`:

1. One visible click to a family page.
2. One further visible click to a chord detail, for families that have detail URLs.

Users do not need a typed URL, site search, sitemap, or a hidden link list.

Extended and Altered have no per-chord detail URLs. Those cards open the family page, which already contains the 108 / 96 embedded references.

## Hub IA

`/chords` now has a first-class **Browse piano chords** block (`#browse-by-type`) above the 25-triad chart.

### Common chords

- Major Chords — 12 chord references
- Minor Chords — 12 chord references
- Seventh Chords — 48 chord references

### More chord types

- Diminished Chords — 12
- Augmented Chords — 12
- Suspended Chords — 24
- Add9 Chords — 24
- Extended Chords — 108 embedded references
- Altered Dominant Chords — 96 embedded references

Counts come from `CHORD_MAJOR_NAVIGATION`, `CHORD_MINOR_NAVIGATION`, `N2C_DETAIL_ROUTES`, `N2B_DETAIL_ROUTES`, `N2D_DETAIL_ROUTES`, `EXTENDED_REFERENCES`, and `ALTERED_REFERENCES`. They are not handwritten constants.

C-flat major remains a published written-spelling page linked from Major; it is not one of the 12 Major grid cards, so the Major card count stays 12.

The 25-card chart, later explanations, and the supported-library index remain. They are no longer the only way to reach Seventh / Diminished / Add9 / Extended / Altered.

## Header / mobile navigation

Kept manageable. Detail URLs are not dumped into the header.

Desktop Chords panel:

- Overview link label is now **Browse all chords →**
- Major / Minor still open family pages, with root lists in the submenu
- **More Chords** stays a compact family list (no 100+ detail URLs)
- **Add** renamed to **Add9**

Mobile Chords section:

- Explicit **Browse all chords**
- Same family accordions as before
- **Add9** label

## Visible vs merely linked

Before this round, family pages were technically linked from:

- Header More Chords
- Hub “Details & practice” buttons
- The large library index

That is enough for a crawler. It was not a clear answer for a normal user asking “where are all the chords?”. The new hub cards are the product entry.

No SEO link farm was added. Cards are ordinary visible UI.

## Click depth

Shortest visible path from the homepage:

| Page type | Depth | Path |
|---|---|---|
| `/chords` | 1 | Header Chords / Browse all chords |
| Family | 1 | Header family link, or 2 via hub card |
| Detail | 2 | Family page card. From the hub: `/chords` → family → detail |

## Browser verification (2026-09-17, production build on localhost:3120)

Desktop hub: **Browse by chord type** is above the 25-card chart. Common cards show Major 12 / Minor 12 / Seventh 48. More cards show Diminished 12 / Augmented 12 / Suspended 24 / Add9 24 / Extended 108 / Altered 96.

Path checked: `/chords` → **Browse diminished chords** → C Diminished detail. Keyboard, inversions, Play chord, and Print this position were present. Title/H1 on the family page were the new Diminished Chords strings.

Seventh family still lists C7 / Cmaj7 / Cm7 / Cm7♭5 as visible cards. Family Title/H1 were not changed this round.

Mobile: hamburger opens Chords with a visible **Browse all chords** link, then Major / Minor / More Chords. More Chords expands to Seventh, Diminished, Augmented, Suspended, Add9 (Extended / Altered remain in the same list).

Existing `check-chord-navigation.mjs` passed the compact panel, twelve-root submenus, More Chords button-only group, and mobile accordions. Its one failure is a stale expected top-nav label list (`Keyboard Notes` / `Guide`), not this round.
