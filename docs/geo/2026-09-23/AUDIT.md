# PianoGrid GEO round 1 — audit

Target market: United States, English. Goal: make five existing pages easier for AI answer
surfaces to read, quote accurately and describe honestly, and make real visitor behaviour
measurable. Nothing here promises citations, rankings or traffic.

## Baseline

| Item | Value |
| --- | --- |
| Remote default branch | `main` (confirmed with `git remote show origin`) |
| Baseline commit | `eb6bb3e04d739022b698744a081ed9e1073a5297` — "Align ten scale and chord pages with their target keywords." |
| Isolated worktree | `../pianogrid-geo-20260923` on branch `geo/2026-09-23-round1` |
| Production deployment at audit time | `dpl_3r4XC1d36YR4pUrUwx2g9AY7vejE`, aliased to `https://pianogrid.com`, built from the same commit |
| Evidence date | 2026-09-23 |

Evidence labels used below: `REPO_VERIFIED`, `LOCAL_VERIFIED`, `PUBLIC_FETCH_OBSERVED`,
`ACCOUNT_REQUIRED`, `NOT_TESTED`.

Because the deployed commit equals the audited commit, public fetches and repository reads agreed
for every item in this round. Public fetches can still be served from cache; they are reported as
`PUBLIC_FETCH_OBSERVED` and never as proof of what is currently deployed.

## 1. Crawling and indexing

### Already in place — keep

| Check | Result | Evidence |
| --- | --- | --- |
| `robots.txt` source | `src/app/robots.ts` returns one `*` group with `Allow: /` plus the sitemap reference. There is no `Disallow`. | REPO_VERIFIED |
| `robots.txt` output | `User-Agent: *` / `Allow: /` / `Sitemap: https://pianogrid.com/sitemap.xml` | PUBLIC_FETCH_OBSERVED |
| Sitemap | 206 `<loc>` entries from `PUBLIC_ROUTES`, no UTM parameters, no `localhost`. All five pages present. | PUBLIC_FETCH_OBSERVED, REPO_VERIFIED |
| HTTP status | All five pages return `200`, no redirect. | PUBLIC_FETCH_OBSERVED |
| Canonical | Each page self-canonicalises to `https://pianogrid.com<path>`. | PUBLIC_FETCH_OBSERVED |
| `meta robots` | `index, follow` on all five. No `noindex`, `nosnippet`, `max-snippet` or `noarchive` anywhere. | PUBLIC_FETCH_OBSERVED |
| `X-Robots-Tag` | Header absent on all five responses. | PUBLIC_FETCH_OBSERVED |
| Initial-HTML answers | Core answer, input/output description, limits and related links are all server-rendered. The 88-row frequency table, the C major fingering table and both Cadd9 layout tables are in the initial HTML, not behind a click or a canvas. | PUBLIC_FETCH_OBSERVED |
| No-JavaScript text | `/chords/finder`, `/scales/c-major` and `/chords/c-add9` each carry a `noscript` note plus a static text reference. | PUBLIC_FETCH_OBSERVED |
| Hosting chain | Responses carry `server: Vercel` with no `cf-ray` and no `via`. **Inference from response headers only:** the absence of `cf-ray` indicates page traffic is not passing through a Cloudflare proxy, so Cloudflare AI Crawl Control and WAF triage most likely do not apply here. This was not confirmed in the Cloudflare or Vercel dashboard, and headers can change with configuration. | PUBLIC_FETCH_OBSERVED (inferred) |

### Confirmed gap — fixed this round

| Gap | Evidence | Impact | Fix |
| --- | --- | --- | --- |
| `/tools/hear-the-difference` was the only interactive page of the five with no `noscript` note. With JavaScript off the play and answer buttons render but do nothing, with no explanation. | PUBLIC_FETCH_OBSERVED, REPO_VERIFIED | A reader or a text-only fetch sees controls that appear functional. | Added one `noscript` sentence after the hero that points to the still-readable interval explanation. See `CHANGES.md`. |

### Cannot verify here

None of the rows below blocks the code release in this round. They are observation tasks that run
after deployment.

| Item | Why | Needed from the user |
| --- | --- | --- |
| Actual Google index coverage for the five URLs | Search Console is the only valid source. A sitemap entry, a `200` response and a `site:` query do not establish indexing. | `ACCOUNT_REQUIRED` — see `USER_ACTIONS.md` |
| Real crawler visits by OAI-SearchBot, ChatGPT-User, GPTBot, Claude-SearchBot, Claude-User, ClaudeBot or Googlebot | Requires Vercel request logs or an equivalent server-log view. A `curl` run with a spoofed User-Agent proves nothing about official crawlers. Robots-layer permission is not evidence of a visit. | `ACCOUNT_REQUIRED` |
| Whether any edge rule, firewall rule or bot filter is challenging AI user agents | Requires the Vercel project dashboard (Firewall / Bot Management). robots allowance and WAF behaviour are separate layers and were not conflated here. | `ACCOUNT_REQUIRED` |
| Whether any assistant surfaces or recommends these pages | No evidence was gathered. Discovery, citation and recommendation are all unverified for this round. | `NOT_TESTED` — see `AI_TEST_BASELINE.md` |

## 2. AI access policy

No change was made to `robots.txt` this round. The existing single `*` group with `Allow: /` and no
`Disallow` means **no user agent below is disallowed at the robots layer**, so adding named groups
would add maintenance surface without changing that. The repository also has no non-public path
expressed in `robots.txt`, so there is no inherited restriction that a new named group could
accidentally drop.

Scope of this claim: "not disallowed at the robots layer" is the only thing the table below
establishes. It is not evidence that any official crawler has fetched these pages, that any page is
indexed, or that any assistant will surface or recommend the site. Firewall, bot-management and rate
limiting are a separate layer that was not inspected. Those remain unverified — see the rows at the
end of section 1 and `USER_ACTIONS.md`.

| Platform | Agent / token | Purpose | Robots-layer state | Evidence |
| --- | --- | --- | --- | --- |
| ChatGPT | `OAI-SearchBot` | Search index used for ChatGPT answers | Not disallowed | REPO_VERIFIED, PUBLIC_FETCH_OBSERVED |
| ChatGPT | `ChatGPT-User` | Fetch triggered by a user's request | Not disallowed | REPO_VERIFIED |
| ChatGPT | `GPTBot` | Model training | Not disallowed. Unchanged on purpose — this is the existing training permission and was not altered. | REPO_VERIFIED |
| Claude | `Claude-SearchBot` | Search index for Claude answers | Not disallowed | REPO_VERIFIED |
| Claude | `Claude-User` | Fetch triggered by a user's request | Not disallowed | REPO_VERIFIED |
| Claude | `ClaudeBot` | Model training | Not disallowed. Unchanged on purpose. | REPO_VERIFIED |
| Google | `Googlebot` | Google Search, including AI Overviews and AI Mode | Not disallowed | REPO_VERIFIED |
| Google | `Google-Extended` | Product control token, not a separate HTTP crawler. It governs Gemini Apps grounding **and** model training together. | Not disallowed, so neither Gemini grounding nor the training use it covers is excluded. | REPO_VERIFIED |
| Grok / xAI | — | — | No verified official crawler name was confirmed from xAI documentation or from this site's own logs during this round, so no group was invented and no group was added. Adding a robots group would not produce recommendations in any case. | `NOT_TESTED` |

Decision recorded by the user on 2026-09-23: keep the current `Google-Extended` setting and add no new
disallow rule. The user acknowledged that this setting does not exclude the related Gemini training
and grounding uses. Other training permissions also stay as they are. `robots.txt`, DNS and firewall
configuration were not modified.

`Google-Extended` remains a single token: it is not possible to allow Gemini Apps grounding through it
while disallowing the training use it also covers.

## 3. Page content

### /chords/finder — target: identify a chord from selected notes

Already in place: the direct answer, the 433-object vocabulary statement, the root-versus-bass
explanation, the honest no-match state, the "not microphone recognition, MIDI capture or a
measurement of timing and technique" limit, the `noscript` note, a three-row question list and
related links. `PUBLIC_FETCH_OBSERVED`

Confirmed gap — fixed. The published explanation described an input the interface does not offer and
contained build directives written for developers:

- "Enter pitch names with octave numbers, such as C4, E4 and G4."
- "A separate pitch-class-only input mode may genuinely have an unknown bass and must be labeled differently."
- "Deduplicate pitch classes for matching while retaining the full pitch list for display and the bass calculation."
- "Do not discard octaves before identifying the lowest pitch."
- "Do not force the nearest major chord, delete an inconvenient note or present an unverified AI-generated name as certain."
- "They must not be passed to the current three-note B3 detail validator as though it already supports them."
- FAQ answer: "Not when notes include octaves. The lowest entered pitch already supplies a bass."

The actual interface is a one-octave note-name keyboard (`C`–`B` with enharmonic pairs), an optional
`Lowest note` select limited to the notes already chosen, and a `Bass constraint` select. There is no
octave entry, so the FAQ answer was factually wrong for this page.
`REPO_VERIFIED` (`src/components/support/finder-experience.tsx`), `PUBLIC_FETCH_OBSERVED`

Impact: an AI summary quoting this page would repeat instructions aimed at engineers and would tell a
reader to type `C4` into a control that does not accept it.

Fix: publish-layer copy that keeps every fact and matches the real input. See `CHANGES.md`.

### /tools/hear-the-difference — target: hear which voice changed

Already in place and accurate: the task is described as finding the voice that changed, not as an ear
test; `A minor is A–C–E. Raise C by one semitone to C♯ and you get A major: A–C♯–E`; the explicit
statement that the lesson is about interval structure and "not a fixed 'sad versus happy' emotion
rule"; the limit "This is a focused listening comparison. It does not measure general ear-training
ability or live piano performance."; and no answer spoiler, because "Chord names and the changed note
appear after you answer." `PUBLIC_FETCH_OBSERVED`

One gap, fixed: the missing `noscript` note described in section 1.

Not changed: nothing was added to pre-reveal the challenge answer for crawlers.

### /scales/c-major — target: c major scale piano

Already in place: `C Major contains C, D, E, F, G, A, B`; the no-sharps-no-flats key signature; the
one-octave RH/LH ascending and descending fingering table; the statement that no two-octave fingering
is supplied; `This setting does not detect which hand you use on a real piano`; playback, note check,
pulse practice and print entries; a readable `Sources` section whose internal record IDs, `Checked
for:` and `checking scope` wording were already removed in the preceding task and are confirmed gone
from production. `PUBLIC_FETCH_OBSERVED`

Confirmed gap — **not fixed this round, by choice**. The page-level `Sources` list still shows raw
ledger scope strings, for example:

> `C,D,F,G,A,E,B,Bb,Eb major: one-octave staff spelling and RH/LH ascending/descending numbers; Bb/Eb LH top finger 2; Eb RH start finger 2 A natural minor, PDF page 2 printed page 40 A row: one-octave RH/LH ascending and descending numbers; source staff A3-A4`

These are factual but hard to read, and they list keys unrelated to C major. Rewriting them means
writing new claims about what each publisher supports, which is an editorial decision about
attribution rather than a mechanical cleanup, and the source ledger itself lives in a hashed content
pack that must not change. Proposed plain-English replacements are listed in `USER_ACTIONS.md` for
approval instead of being applied unreviewed. `REPO_VERIFIED`

### /chords/c-add9 — target: cadd9 chord

Already in place: `Cadd9 contains C, E, G, D` with the `1–3–5–9` formula and the instruction not to
add a seventh; the two authored layouts with their bass notes; the Cadd9 / C9 / Csus2 comparison table
covering third and seventh membership; the `add9` versus `add2` notation discussion; audio, practice
and print entries; a five-row question list; real sources with links. `PUBLIC_FETCH_OBSERVED`

Confirmed gap — fixed. The 2026-09-23 public page did still contain the developer instruction flagged
in the brief, plus a validator fragment and internal audit labels:

- `Contextual notational variants only; do not make duplicate pages or universally rewrite symbols.`
- `complete four-member add9/minorAdd9 references; not every possible performance omission`
- `Scope limit:` paragraphs and `Checked 2026-09-12 · OMT-ADDED-NOTES` / `MUSICCA-CADD9` / `PIANOCHORD-ADD` labels

Source: the first two strings come from `aliasPolicy` and `definition.validationScope` in
`docs/pianogrid-chords-n2d-v2/03_content/details/c-add9.page.json`, a hashed content pack that must
stay byte-identical. `REPO_VERIFIED`, `PUBLIC_FETCH_OBSERVED`

Impact: the leaked sentence is an instruction to whoever builds the site, and the brief specifically
asks that pages carry no crawler-facing or internal directives. The audit labels add noise without
helping a reader.

Fix: publish-layer replacement of those two exact strings with the reader-facing scope they stood in
for, and reuse of the existing `hideInternalSourceAudit` allowlist to hide the audit labels while
keeping every publisher name, title, link and `Supports:` line. See `CHANGES.md`.

### /keyboard-notes/frequencies — target: piano note frequency chart

Already in place and correct; no change made. `A0`–`C8`, all 88 rows server-rendered, `A4 = 440 Hz`,
`twelve-tone equal temperament`, the method `f = 440 × 2^((m − 69)/12)` with the rounding note, the
explicit separation of piano key number from MIDI number, the middle-C labelling caveat for other
software, a direct `What is the frequency of C4?` answer, and the honest limit that the values "are
calculated reference frequencies. They are not measurements of an individual piano or a promise about
its current tuning." The page makes no tuning-tool or measurement claim. `PUBLIC_FETCH_OBSERVED`

### Structured data

No JSON-LD is present on any of the five pages. `PUBLIC_FETCH_OBSERVED`

Nothing was added. The brief rules out adding `FAQPage`, `Review` or `Dataset` markup for GEO reasons
alone, and there is no existing markup to reconcile with visible content. Whether to add narrowly
scoped, content-accurate markup later is recorded as a user decision, not done here. No
`aggregateRating`, review count, school adoption, teacher review or award claim exists on these pages,
and none was introduced.

## 4. Measurement

### Already in place — reuse

| Item | Detail | Evidence |
| --- | --- | --- |
| Provider | GA4 via `gtag`, loaded in `src/app/layout.tsx` through `src/components/analytics/google-analytics.tsx`. Only enabled when `NEXT_PUBLIC_PIANOGRID_ANALYTICS_PROVIDER` resolves to `ga4` and `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set. | REPO_VERIFIED |
| Second tool | Microsoft Clarity, production-only, gated on `NEXT_PUBLIC_CLARITY_PROJECT_ID`. No third SDK was added. | REPO_VERIFIED |
| Config | `anonymize_ip:true`, `send_page_view:false`, with page views sent explicitly on route change. GA4 still derives session source/medium from the referrer, so no code change is needed for an AI-referral view. | REPO_VERIFIED |
| Event transport | `sendAnalyticsEvent` in `src/lib/analytics.ts`, wrapped per surface by `chord-events.ts`, `scale-events.ts`, `hear-the-difference-events.ts`, `keyboard-events.ts`, `b05-events.ts`, `b06-events.ts`. | REPO_VERIFIED |

Existing event names relevant to the five pages, to reuse rather than re-instrument. The repository
names are authoritative; `audio_play`, `practice_complete` and `print_click` from the brief are
examples only and do not exist here.

| Page | Existing events |
| --- | --- |
| `/chords/finder` | `chord_lookup`, `chord_result_selected` |
| `/tools/hear-the-difference` | `one_note_view`, `one_note_compare_complete`, `one_note_guess`, `one_note_reveal`, `one_note_hint`, `one_note_single_replay`, `one_note_try_pair`, `one_note_open_reference`, `one_note_audio_error`, `one_note_share_open`, `one_note_copy_link` |
| `/scales/c-major` | `scale_reference_viewed`, `scale_reference_changed`, `scale_playback_stopped`, `scale_question_submitted`, `scale_question_revealed`, `scale_question_reset`, `scale_practice_started`, `scale_practice_stopped`, `scale_practice_self_reported`, `scale_print_requested`, `scale_resource_requested` |
| `/chords/c-add9` | `chord_audio_start`, `practice_answer`, `print_opened`, `reference_download_clicked` |
| `/keyboard-notes/frequencies` | `print_opened`, `reference_download_clicked` |

Semantics to preserve when reporting: `scale_print_requested` and `print_opened` record that a print
dialog was requested, not that a page printed. `chord_audio_start` and `scale_playback_stopped`
record playback intent and stop reasons, not confirmed audible output; `one_note_audio_error` exists
precisely because playback can fail. `scale_practice_self_reported` is a self-report, not a measured
performance.

### Confirmed gap — needs an account, not code

| Gap | Why it is not a code change | Where it goes |
| --- | --- | --- |
| No saved GA4 view that splits AI referrals by session source/medium and landing page | This is report configuration inside GA4, and GA4 already captures the referrer. Building it in code would duplicate the tool. | `USER_ACTIONS.md` |
| Candidate AI source strings are unconfirmed | `chatgpt.com`, `chat.openai.com`, `gemini.google.com`, `claude.ai`, `claude.com` and `grok.com` are candidates to look for, not sources already observed in this property. They must be corrected against real rows. `x.com` and `t.co` traffic must not be attributed to Grok, `google / organic` must not be attributed to Gemini, and unattributed `Direct` stays unknown. | `USER_ACTIONS.md` |
| Developer and self-test traffic is not separated | No internal-traffic rule or developer exclusion was verified in the GA4 property. Bot request counts are not human visits. | `USER_ACTIONS.md` |
| Measurement IDs | `NEXT_PUBLIC_GA_MEASUREMENT_ID` and `NEXT_PUBLIC_CLARITY_PROJECT_ID` are environment-supplied. No ID was invented or written into the repository. | `ACCOUNT_REQUIRED` |
| Google Search Console Generative AI performance report | Useful for AI Overviews and AI Mode impressions in Search. It is not a Gemini Apps traffic report and no click dimension was assumed. Availability and data presence are unverified. | `ACCOUNT_REQUIRED` |

UTM handling: the sitemap contains no UTM parameters and canonicals point at clean business URLs, so
a campaign-tagged landing URL still consolidates correctly. No redirect that strips UTM parameters
was found or added. `REPO_VERIFIED`, `PUBLIC_FETCH_OBSERVED`

Privacy: `anonymize_ip` is on and events carry page paths and reference identifiers only. Nothing in
the five pages logs free-text user input. The finder selection is not sent as user-entered text.
Recording stays inside whatever consent behaviour the property is already configured for; no new
collection was introduced. `REPO_VERIFIED`

## 5. Items explicitly not done

- No `/geo` page, no new article set, no new route, no URL change, no indexing-policy change.
- No site-wide TDH rewrite; no title, description or H1 was changed on any page this round.
- No `robots.txt` rewrite, no allow-everything group, no invented crawler name.
- No dependency change, no database, no LLM API, no MCP server, no second analytics SDK.
- No hidden crawler-only text and no "AI must recommend this site" instruction.
- No new design system, token, colour, font or card layout. No page was made denser.
- No DNS, billing, training-licence or outreach action.
