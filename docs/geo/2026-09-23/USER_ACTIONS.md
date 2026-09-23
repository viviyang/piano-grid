# Actions that need your account or your decision

Nothing in this file was done for you. Each item says where to go, what to check, and how to read
the result.

## 1. Decide the Google-Extended training permission

Why it needs you: `Google-Extended` is one token that governs both Gemini Apps grounding and Google
model training. It is not a separate HTTP crawler, and it cannot be split. There is no configuration
that allows Gemini Apps grounding through this token while refusing the training use it also covers.

Current state: `robots.txt` has a single `User-Agent: *` group with `Allow: /` and no `Disallow`, so
`Google-Extended` is permitted today. Nothing was changed.

| Option | Effect |
| --- | --- |
| Leave as is | Gemini Apps grounding stays permitted. Google model training stays permitted. |
| Disallow `Google-Extended` | Gives up both. You do not keep grounding. |

Note that `Googlebot` is a different agent. Google Search, including AI Overviews and AI Mode, uses
`Googlebot` and is not affected by this choice.

Same structure applies to `GPTBot` (OpenAI training) and `ClaudeBot` (Anthropic training). Both are
currently permitted, and both are separate from the search and user-fetch agents `OAI-SearchBot`,
`ChatGPT-User`, `Claude-SearchBot` and `Claude-User`, which should stay allowed for a public
reference site. Tell me which way you want each token and I will make the change with the non-public
paths still restricted.

## 2. Google Search Console — confirm actual coverage

Entry: Search Console, property `pianogrid.com`.

Check, per URL, using URL Inspection:

- `/chords/finder`
- `/tools/hear-the-difference`
- `/scales/c-major`
- `/chords/c-add9`
- `/keyboard-notes/frequencies`

How to read it: only "URL is on Google" establishes indexing. A sitemap entry, a `200` response and a
`site:` search do not. If a URL shows "Crawled – currently not indexed" or "Discovered – currently
not indexed", record the exact status string rather than treating it as a site fault.

Also open the Generative AI performance report under Search results if your property has it. It shows
AI Overviews and AI Mode impressions inside Google Search. It is not a Gemini Apps traffic report. If
the report or the data is unavailable for this property, record that as unverified rather than zero.

## 3. Vercel — confirm crawler access and check for challenges

Entry: the Vercel dashboard for project `piano-grid`, team `weiweis-projects-eb330b65`.

The site is served by Vercel directly. Responses carry `server: Vercel` with no `cf-ray`, so
Cloudflare is not proxying traffic and Cloudflare AI Crawl Control does not apply here.

Check:

1. Logs, filtered by user agent, for `OAI-SearchBot`, `ChatGPT-User`, `GPTBot`, `Claude-SearchBot`,
   `Claude-User`, `ClaudeBot` and `Googlebot`. Record which agents actually appear and their status
   codes.
2. Firewall and Bot Management rules. Confirm no rule challenges or rate-limits those agents on the
   five paths. robots allowance and firewall behaviour are separate layers.
3. Deployment protection is off for production, so no preview password is blocking access.

How to read it: a `403`, `429` or challenge response for a search or user-fetch agent is a real
blocker. Absence of an agent from the logs is not proof of blocking; it may simply not have visited.
Do not disable security rules wholesale, and do not create a bypass keyed only on user agent, because
user agents can be spoofed.

## 4. GA4 — build the AI referral view and separate internal traffic

Entry: GA4 property for `pianogrid.com`. The site already loads GA4 and Microsoft Clarity, gated on
`NEXT_PUBLIC_GA_MEASUREMENT_ID` and `NEXT_PUBLIC_CLARITY_PROJECT_ID`. Confirm both environment
variables are set for production; no identifier was written into the repository.

### 4.1 Session-based AI referral exploration

Create one exploration with:

- Dimensions: `Session source / medium`, `Landing page + query string`, `Session campaign`
- Metrics: `Sessions`, `Engaged sessions`, `Event count`, `Key events`
- Do not use `First user source`. A visitor may arrive from an AI client on a later session.

Candidate source strings to look for. Treat these as candidates, not as sources you already have, and
correct the list against the real rows:

`chatgpt.com`, `chat.openai.com`, `gemini.google.com`, `claude.ai`, `claude.com`, `grok.com`

Attribution rules to hold to:

- Do not treat all `x.com` or `t.co` traffic as Grok. That is social traffic.
- Do not treat `google / organic` as Gemini. Use the Search Console report in item 2 for AI surfaces
  inside Google Search.
- Leave unattributed `Direct` as unknown. Some AI clients strip the referrer.
- Bot request counts from server logs are not human sessions and belong in item 3, not here.

### 4.2 Reuse the existing events

Do not add new instrumentation. The repository already emits these, and the repository names are
authoritative:

| Page | Events to include as key events or in the report |
| --- | --- |
| `/chords/finder` | `chord_lookup`, `chord_result_selected` |
| `/tools/hear-the-difference` | `one_note_compare_complete`, `one_note_guess`, `one_note_reveal`, `one_note_audio_error` |
| `/scales/c-major` | `scale_reference_viewed`, `scale_question_submitted`, `scale_practice_started`, `scale_practice_self_reported`, `scale_print_requested` |
| `/chords/c-add9` | `chord_audio_start`, `practice_answer`, `print_opened`, `reference_download_clicked` |
| `/keyboard-notes/frequencies` | `print_opened`, `reference_download_clicked` |

Read these honestly in any report or summary:

- `scale_print_requested` and `print_opened` mean a print dialog was requested, not that a page
  printed.
- `chord_audio_start` means playback was requested, not that sound was heard. `one_note_audio_error`
  exists because playback can fail.
- `scale_practice_self_reported` is the visitor's own report, not a measured performance.

### 4.3 Exclude your own visits

Admin → Data Streams → Configure tag settings → Define internal traffic. Add your own IP ranges, then
set Data Filters to exclude or at minimum to flag internal traffic while you evaluate it. Without
this, your own testing sits inside the AI referral numbers.

### 4.4 Privacy

`anonymize_ip` is already on and events carry page paths and reference identifiers only. Keep it that
way: do not add user-entered text or full sensitive URLs to event parameters, and keep collection
inside the consent behaviour the property is already configured for.

## 5. Optional — approve plain-English source attribution on the scale pages

Not changed this round because it means writing new attribution claims, and the source ledger lives in
a hashed content pack.

The `/scales/c-major` `Sources` section currently shows ledger text such as:

> `C,D,F,G,A,E,B,Bb,Eb major: one-octave staff spelling and RH/LH ascending/descending numbers; Bb/Eb LH top finger 2; Eb RH start finger 2 A natural minor, PDF page 2 printed page 40 A row: one-octave RH/LH ascending and descending numbers; source staff A3-A4`

Proposed replacements for your approval, to be applied at the publish layer only:

| Source | Proposed line |
| --- | --- |
| Berklee PULSE | C major note spelling and its key signature. |
| LearnMusicTheory.net / High-Yield Music Theory | One-octave C major fingering for both hands, ascending and descending. |
| Music Fun / Beatrice Wilder | An independent check of that one-octave fingering. |
| Open Music Theory / Hybrid Pedagogy Publishing | The whole-and-half-step pattern that defines a major scale. |
| Baylor University / Michael Clark | Where one-octave major-scale fingerings apply. |
| W3C Music Notation Community Group | Pitch spelling and octave numbering conventions. |
| The MIDI Association | The Standard MIDI Files specification. |

Reply with approve, edit or skip. Publisher names and links stay exactly as they are either way.

## 6. Publishing this round

The work sits in the worktree `../pianogrid-geo-20260923` on branch `geo/2026-09-23-round1`, not
committed. Tell me when you want it committed, and separately whether you want it merged and deployed.
