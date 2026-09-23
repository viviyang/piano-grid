# PianoGrid GEO round 1 — result

## Branch and baseline

| Item | Value |
| --- | --- |
| Remote default branch | `main` |
| Baseline commit | `eb6bb3e04d739022b698744a081ed9e1073a5297` |
| Working branch | `geo/2026-09-23-round1` |
| Worktree | `C:\Users\Admin\Documents\viviyang_github\pianogrid-geo-20260923` |
| Re-fetch before delivery | `origin/main` still at `eb6bb3e`. No parallel commit landed during this round, so no overlap to reconcile. |
| Committed | No |
| Pushed | No |
| Deployed | No |

No other worktree was reset, stashed or modified. The four dirty files and the untracked leftovers in
the main integration worktree were left untouched; this round worked only inside its own worktree.

## Changed files

| File | Change |
| --- | --- |
| `src/lib/seo-editorial.ts` | Added `publicAddedNoteCopy` with two exact-string replacements; added `/chords/c-add9` to `PUBLIC_SOURCE_CLEANUP`. |
| `src/lib/chord-n2d-content.ts` | Intro paragraphs pass through `publicAddedNoteCopy`. |
| `src/lib/support-content.ts` | Added `FINDER_READER_COPY` and one FAQ answer correction for `/chords/finder`. |
| `src/components/hear-the-difference/experience.tsx` | Added one `noscript` sentence. |
| `scripts/check-geo-round1.mjs` | New acceptance check (not shipped in the page bundle). |
| `docs/geo/2026-09-23/` | Deliverables, validation JSON, screenshots. |

`checks/batches/07-site-integration/*` shows as modified only because `npm run check` rewrote its own
timestamped report files.

## Tests executed

| Test | Result |
| --- | --- |
| `npm run typecheck` | Pass |
| `npm run check` — Foundation, typecheck, Tailwind CSS compile | Pass, 568 Foundation assertions |
| `npm run build` | Pass, 211 static pages |
| `node scripts/check-geo-round1.mjs` against `next start` on port 3026 | **51/51 pass** |
| Responsive check at 1440 and 390 on all five pages | Pass, zero page-level horizontal overflow |
| Keyboard reachability | Pass. Finder keys selectable by Enter and reaching `matches`; Play comparison focusable and activatable; Play scale reports `Playing scale…`; Play chord focusable. |
| Runtime page errors across the five pages | None |
| No-JavaScript text reference | Pass. Main text still present with JavaScript disabled: finder 4864 chars, Hear the Difference 1177, C major 8461, Cadd9 5756, frequencies 4496. |
| Frequency table server-rendered | Pass, 89 table rows including the header |
| Out-of-scope regression | Pass. `/chords/g-add9` and `/chords/c-madd9` receive the shared added-note correction with their own note data intact; `/chords/c-7`, `/chords/by-key`, `/chord-progressions` and `/scales/d-major` unchanged. |
| `robots.txt`, sitemap, canonicals | Pass and unchanged. No UTM in the sitemap, no site-wide `Disallow`, all five URLs present. |

Evidence: `docs/geo/2026-09-23/geo-round1-validation.json` and `docs/geo/2026-09-23/screenshots/`.

## NOT_TESTED and unverifiable

| Item | Reason |
| --- | --- |
| AI answer baseline, all 5 questions × 4 platforms | Not asked in any real client this round. An API answer was not substituted. See `AI_TEST_BASELINE.md`. |
| Google index coverage for the five URLs | Search Console access required. A sitemap entry and a `200` response do not establish indexing. |
| Real visits by OAI-SearchBot, ChatGPT-User, GPTBot, Claude-SearchBot, Claude-User, ClaudeBot, Googlebot | Vercel request logs required. A spoofed-User-Agent `curl` proves nothing about official crawlers. |
| Whether any firewall or bot rule challenges those agents | Vercel dashboard access required. |
| GA4 AI-referral rows and the actual source strings | Property access required. The candidate strings in `AUDIT.md` are candidates, not observed sources. |
| Google Generative AI performance report | Property access required; availability and data presence unknown. |
| Any official xAI or Grok crawler name | Not confirmed from documentation or from this site's own logs, so no robots group was invented. |
| Screen reader, real-device and print-output review | Not run this round. |

## Residual risks

1. **Shared added-note correction reaches 24 pages.** The replacement is one exact-string map applied
   where the family renders its intro. Two of those pages are covered by regression checks, but the
   other 21 were not individually opened.
2. **Finder copy is a publish-layer override.** If the content pack later changes those block bodies,
   the override still replaces them. The check script fails loudly if the expected block IDs disappear.
3. **`/scales/c-major` source scope text is still terse ledger language.** Factual, but hard to read
   and it lists keys unrelated to C major. Proposed wording awaits approval in `USER_ACTIONS.md`.
4. **No structured data on any of the five pages.** Left as is on purpose. Whether to add narrow,
   content-accurate markup is an open decision.
5. **Training-permission posture is unchanged and permissive.** `GPTBot`, `ClaudeBot` and
   `Google-Extended` are all currently allowed. That is the pre-existing state, not a new choice.
6. **Local verification is not production verification.** Production currently runs the same commit,
   but these four changes are not deployed, so nothing in this round is live yet.

## Next single priority

Answer the `Google-Extended` question in `USER_ACTIONS.md` item 1, then say whether to commit and
deploy this round. That token controls Gemini Apps grounding and Google model training together, so it
is the one decision that cannot be made for you and the one that changes what the robots file should
say before anything ships.
