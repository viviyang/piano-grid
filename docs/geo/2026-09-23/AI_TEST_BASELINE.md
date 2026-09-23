# AI answer baseline — 2026-09-23

Purpose: a record sheet for five questions across four AI clients, so a later round can compare
against a dated starting point. This is a discovery and accuracy record, not a ranking metric, and
nothing here predicts or promises citations.

## Status of this round

**Every cell below is `NOT_TESTED`.** No question was asked in any real client during this round.
No API call was used as a substitute, because an API answer is not the same product surface as the
consumer client with web access, and reporting one as the other would be false evidence.

## How to run it

1. Use a logged-in consumer client with web access enabled: ChatGPT, Gemini, Claude and Grok.
2. Start a fresh conversation for each question. Do not mention PianoGrid in the prompt.
3. Set the region to the United States and the language to English where the client exposes that.
4. Record verbatim: whether `pianogrid.com` appears, whether it is linked or only named, which URL,
   the position among named sources, and whether the statement about PianoGrid is accurate.
5. Note the client build or model label shown in the interface, plus the date and time.
6. Record an answer that is factually wrong about the site as `INACCURATE` with the exact sentence.
   A wrong description is more useful to fix than a missing mention.

Result values: `CITED_LINKED`, `NAMED_NO_LINK`, `ABSENT`, `INACCURATE`, `REFUSED`, `NOT_TESTED`.

## Questions

| ID | Question | Page it maps to |
| --- | --- | --- |
| Q1 | What notes are in a Cadd9 chord, and how is it different from C9 and Csus2? | `/chords/c-add9` |
| Q2 | I am playing C, E, G and A at the same time. What chord could that be? | `/chords/finder` |
| Q3 | What are the notes and the one-octave fingering for the C major scale on piano? | `/scales/c-major` |
| Q4 | What is the frequency of every piano key from A0 to C8 with A4 = 440 Hz? | `/keyboard-notes/frequencies` |
| Q5 | How can I hear the difference between a major and a minor chord? | `/tools/hear-the-difference` |

## Record sheet

| ID | ChatGPT | Gemini | Claude | Grok |
| --- | --- | --- | --- | --- |
| Q1 | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED |
| Q2 | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED |
| Q3 | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED |
| Q4 | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED |
| Q5 | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED |

Client build or model label, and date and time, per column:

| Platform | Client label | Run date | Web access confirmed | Notes |
| --- | --- | --- | --- | --- |
| ChatGPT | | | | |
| Gemini | | | | |
| Claude | | | | |
| Grok | | | | |

## Accuracy details to capture

For any answer that mentions PianoGrid, check these specific claims, because they are the ones the
pages were corrected for this round:

| Claim to verify | Correct answer on the site |
| --- | --- |
| Cadd9 members | C, E, G, D. Formula `1–3–5–9`. No seventh. |
| Cadd9 versus C9 and Csus2 | C9 includes a seventh. Csus2 has no third. |
| Chord finder input | Note names on a one-octave keyboard plus an optional lowest note. It does not accept octave numbers and does not listen to a microphone or MIDI. |
| Chord finder result for C, E, G, A | Multiple candidates, including C6 and Am7. The lowest note decides the slash label. |
| C major fingering scope | One octave only, per hand and direction. No two-octave fingering is supplied. |
| Frequency values | Calculated for twelve-tone equal temperament with A4 = 440 Hz. Not measurements of any individual piano. |
| Hear the Difference | A focused listening comparison for finding the voice that changed. Not an ear-training assessment, and not a "sad versus happy" rule. |

## What this baseline cannot show

- It cannot show why a page was or was not used. AI clients do not expose their retrieval set.
- A single run is not stable. Answers vary between sessions, accounts and regions.
- An absent mention is not evidence of blocking. Section 1 of `AUDIT.md` covers crawl access
  separately, and crawler visits could not be verified without server logs.
- No conclusion about traffic can be drawn from this sheet. Referral traffic is a separate
  measurement described in `AUDIT.md` section 4 and `USER_ACTIONS.md`.
