# PianoGrid GEO round 1 — result

## Decision recorded

The user chose on 2026-09-23 to keep the current `Google-Extended` setting and add no new disallow
rule, acknowledging that this does not exclude the related Gemini training and grounding uses. Other
training permissions stay as they are. `robots.txt`, DNS and firewall configuration were not modified.

## Commits and integration

| Item | Value |
| --- | --- |
| Remote default branch | `main` |
| Starting baseline | `eb6bb3e04d739022b698744a081ed9e1073a5297` |
| Working branch | `geo/2026-09-23-round1` in worktree `../pianogrid-geo-20260923` |
| Round commit | `638e76d72d71ea328e7698ccbc75d87d4a33bdc7` — "Replace internal build directives on five public pages with reader-facing copy." |
| Integrated commit | `638e76d` — identical to the round commit |
| Parallel commits to reconcile | None. `origin/main` was re-fetched immediately before commit and again before push; it was still `eb6bb3e` both times, so the integration was a fast-forward with nothing to merge. |
| `main` after push | `eb6bb3e..638e76d`, fast-forward, no force push |

No other worktree was reset, stashed, overwritten or switched. The dirty files and untracked
leftovers in `pianogrid-final-integration` were left exactly as they were.

## Changed files in the round commit

| File | Change |
| --- | --- |
| `src/lib/seo-editorial.ts` | `publicAddedNoteCopy` with two exact-string replacements; new `PUBLIC_SOURCE_CODE_CLEANUP` / `hideInternalSourceCodes` for `/chords/c-add9`. |
| `src/lib/chord-n2d-content.ts` | Added-note intro paragraphs pass through `publicAddedNoteCopy`. |
| `src/components/chords/detail-page.tsx` | `compactSources` also honours `hideInternalSourceCodes`. |
| `src/lib/support-content.ts` | `FINDER_READER_COPY` plus one FAQ answer correction for `/chords/finder`. |
| `src/components/hear-the-difference/experience.tsx` | One `noscript` sentence. |
| `scripts/check-geo-round1.mjs` | New acceptance check. |
| `docs/geo/2026-09-23/` | Deliverables, validation JSON, 10 screenshots. |

`checks/batches/07-site-integration/*` was deliberately **not** committed; those files only change
because `npm run check` rewrites its own timestamped reports.

## Correction made during this closeout

The first draft of this round added `/chords/c-add9` to `PUBLIC_SOURCE_CLEANUP`, which hides the
`Scope limit:` paragraph together with the review identifier. That would have removed two limitations
a reader needs: "All transposed examples in this package are calculated reference examples, not
individually transcribed from this source" and "Reference only: no copied prose, diagrams, recordings
or PDF files". It was changed to a codes-only allowlist before release.

One acceptance assertion changed as a result. The blanket rule "the string `Scope limit:` must not
appear" was wrong once that label was required to stay, so it was replaced with a rule that blocks a
review identifier trailing the checked date, `Checked <date> ·`. This narrowed an incorrect assertion;
it did not relax a real check. The total rose from 51 to 54 because four new assertions were added for
the retained limitations, the add9/add2 and ninth-placement caveats, and a wider family regression.

## Tests on the final integrated version

| Test | Result |
| --- | --- |
| `npm run typecheck` | Pass |
| `npm run check` — Foundation, typecheck, Tailwind compile | Pass, 568 Foundation assertions |
| `npm run build` | Pass, 211 static pages |
| `scripts/check-geo-round1.mjs`, local `next start` | **54/54 pass** |
| `scripts/check-10-page-keyword.mjs`, local | **136/136 pass** |
| `scripts/check-scales-modes-seo.mjs`, local | **29/29 pass** |

The page count and assertion totals are reported as measured. Nothing was adjusted to match a
previous run.

Family regression for the shared added-note fix covers `/chords/g-add9`, `/chords/c-madd9`,
`/chords/f-sharp-add9` and `/chords/e-flat-madd9` — both subtypes, a sharp key and a flat key. Each is
checked for its own note data rather than C's, for the label and voicing caveats, and for the
`Scope limit:` text still being present since they are not on the codes-only allowlist. The remaining
20 pages in the family were not opened individually.

## Deployment

Production was updated by the project's existing GitHub integration when `main` was pushed. No
deployment configuration was changed.

| Item | Value |
| --- | --- |
| Project | `weiweis-projects-eb330b65/piano-grid` |
| Deployment | `dpl_4cKRB6CryVQpGmAhNvU5BKZHfkYG` |
| URL | `https://piano-grid-as7ktr3lt-weiweis-projects-eb330b65.vercel.app` |
| Aliases | `https://pianogrid.com`, `https://www.pianogrid.com`, `https://piano-grid-git-main-weiweis-projects-eb330b65.vercel.app` |
| State | `READY`, Production, created 2026-09-23 19:54:57 +0800 |

Commit attribution: the CLI `inspect` output for this deployment does not print a commit SHA, so the
mapping to `638e76d` is an inference rather than a direct reading. It rests on three facts: the
deployment carries the `piano-grid-git-main` alias, so it was built from branch `main`, whose head is
`638e76d`; it was created about one minute after the push; and the served HTML satisfies all 54
assertions that are specific to this commit. If an exact SHA is required, read it from the deployment
page in the Vercel dashboard.

### Unintended side effect to clean up

The first `vercel deploy --prod` was run from this worktree, which had no `.vercel` link. The CLI
therefore created a **new** Vercel project rather than deploying to `piano-grid`:

- Project `weiweis-projects-eb330b65/pianogrid-geo-20260923`
- Deployment `dpl_7kHtDKdDnuTr3wQCtuUhCHb3DeBL`, aliased to `https://pianogrid-geo-20260923.vercel.app`

It never touched `pianogrid.com`, and `pianogrid.com` was confirmed healthy afterwards. This stray
project and its public preview alias were not deleted, because removing a platform resource is your
call. Say the word and I will remove it. The worktree is now linked to `piano-grid` via a gitignored
`.vercel/project.json` copied from the main integration worktree, so a repeat is not possible from
here.

## Production verification on pianogrid.com

`scripts/check-geo-round1.mjs` against `https://pianogrid.com`: **54/54 pass**. Covered by HTTP and
HTML inspection:

| Check | Result |
| --- | --- |
| Round copy live on the five pages | Pass. Cadd9 shows "On this page, add9 and add2 label the same added note in different notation rather than two separate chords."; the finder shows the one-octave note-name explanation. |
| Developer directives gone | Pass. `do not make duplicate pages`, `universally rewrite symbols`, `must be labeled differently`, `Deduplicate pitch classes`, `Do not force the nearest major chord` and the three-note-validator sentence are all absent from visible text. |
| Review identifiers gone on Cadd9 | Pass. No `OMT-ADDED-NOTES`, `MUSICCA-CADD9` or `PIANOCHORD-ADD` in visible text. |
| Source links and limits kept | Pass. Open Music Theory, Musicca and PianoChord.org still named, linked, with `Supports:` and `Scope limit:` intact, including the transposition-provenance and rights sentences. |
| Voicing, fingering and label caveats kept | Pass. "not a complete inversion catalogue", "this is not a claim that added-note chords cannot be inverted", "Fingerings are not supplied", "not a claim that every player uses the labels identically", "not a universal position rule". |
| HTTP, canonical, robots | Pass, no regression. All five return `200`, self-canonical to `https://pianogrid.com<path>`, `index, follow`, no `X-Robots-Tag`. |
| `robots.txt` and sitemap | Pass, unchanged. One `*` group with `Allow: /`, sitemap reference intact, no UTM, all five URLs listed. |
| Shared family pages | Pass on the four sampled add9 / minor-add9 pages, each with its own note data. |
| Out-of-scope pages | Pass. `/chords/c-7`, `/chords/by-key`, `/chord-progressions`, `/scales/d-major` unchanged. |

### Local versus production versus human

| Evidence class | What it covers |
| --- | --- |
| Local build | typecheck, `npm run check`, `npm run build`, 54/54 acceptance, 136/136 and 29/29 regressions, 1440 and 390 layout with zero horizontal overflow, keyboard reachability, no-JavaScript text, no runtime page errors |
| Production HTTP and HTML | The 54 assertions above, run against `https://pianogrid.com` |
| Production interaction | Not re-driven on the live domain this round. Interaction was exercised on the local production build: the finder reached a `matches` state from keyboard input, Play comparison and Play chord were focusable and activatable, and `/scales/c-major` reported `Playing scale…`. |
| Needs a human | Actually hearing audio on the live domain. A play event or a status string means playback was requested and reported as started; it is not evidence that a human heard sound. Screen-reader review, real-device review and print output were also not run. |

## Still NOT_TESTED

| Item | Status |
| --- | --- |
| AI answer baseline, 5 questions × 4 platforms | `NOT_TESTED`. Not asked in any real client. No API answer was substituted, and no cell was filled with `0` or "success". See `AI_TEST_BASELINE.md`. |
| Google index coverage for the five URLs | `ACCOUNT_REQUIRED` |
| Real visits by official AI or search crawlers | `ACCOUNT_REQUIRED`. Robots-layer permission is not evidence of a visit. |
| Firewall or bot-rule behaviour toward those agents | `ACCOUNT_REQUIRED` |
| GA4 AI-referral rows and the real source strings | `ACCOUNT_REQUIRED`. The candidate strings in `AUDIT.md` are candidates, not observed sources. |
| Google Generative AI performance report | `ACCOUNT_REQUIRED`, availability unknown |
| Official xAI or Grok crawler name | Unconfirmed, so no robots group was invented |
| Live-domain audio actually heard, screen reader, real device, print output | Not run |

A successful technical release does not mean AI referral performance has been verified. Nothing in
this round establishes discovery, citation or recommendation by any assistant.

## Residual risks

1. The shared added-note correction reaches 24 pages; 4 were asserted, 20 were not opened.
2. The finder copy is a publish-layer override. If the content pack changes those block bodies, the
   override still replaces them; the acceptance script fails loudly if a block ID disappears.
3. `/scales/c-major` page-level source scope text is still terse ledger language. Proposed plain
   wording awaits approval in `USER_ACTIONS.md` item 5.
4. No structured data on any of the five pages, left as is on purpose.
5. Training permissions remain permissive by the user's explicit decision this round.
6. The stray `pianogrid-geo-20260923` Vercel project and its public alias still exist.

## Next actions for the user

1. Decide whether to delete the stray `pianogrid-geo-20260923` Vercel project and alias.
2. GA4: build the session-source AI referral exploration, correct the candidate source strings against
   real rows, and exclude internal traffic. `USER_ACTIONS.md` item 4.
3. Search Console: confirm coverage for the five URLs and check the Generative AI performance report.
   `USER_ACTIONS.md` item 2.
4. Run the four-platform baseline in real clients and fill `AI_TEST_BASELINE.md`.
5. Optional: approve the plain-English source wording in `USER_ACTIONS.md` item 5.
