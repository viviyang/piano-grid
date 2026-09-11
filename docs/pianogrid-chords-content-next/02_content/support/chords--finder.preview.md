# Piano Chord Finder

> URL `/chords/finder`
> [已核实] 原规划已有此URL。
> 本文为新整理英文正文；不是已经上线的页面。数据源仍为原 page.json，modules.json 是明确需接入的增量。

**Title:** Piano Chord Finder: Identify Chords from Notes

**Description:** Enter piano notes to inspect possible chord names. Keep bass notes and enharmonic spelling visible, and see when the supported vocabulary has no match.

**Scope:** Requires a new bounded matching tool. B3’s pitch-class practice checker is not a general chord finder.

## Enter what you know, not a guessed chord name

Enter pitch names with octave numbers, such as C4, E4 and G4. Keep the original spelling visible. The matcher can compare sounding pitch classes, but the result should still explain its chosen note names.

With exact octaves, the lowest supplied pitch is known. An empty optional bass field does not erase that information. A separate pitch-class-only input mode may genuinely have an unknown bass and must be labeled differently.


## Read candidates, bass and scope together

C4–E4–G4 supports C major. E3–G3–C4 has the same chord-tone set but places E in the bass, so C/E describes that input more precisely.

The tool needs to distinguish a chord’s root from its lowest note. It also needs a stated vocabulary: not finding a name in the supported set does not prove that the selected notes are musically invalid.


## Some note sets have more than one useful name

The pitch classes C, E, G and A can be read as C6 or Am7. With the exact input C4–E4–G4–A4, the lowest note is C, so the alternate A-minor-seventh interpretation is Am7/C.

With A2–C4–E4–G4, A is lowest; Am7 and C6/A are candidate descriptions. Musical context can favor a reading, but the supplied notes alone do not establish a unique compositional intention.


## Repeated roots change spacing, not the note set

C4–C5–E5–G5 contains two Cs in different octaves. Deduplicate pitch classes for matching while retaining the full pitch list for display and the bass calculation.

Do not discard octaves before identifying the lowest pitch. Otherwise the tool can produce a valid chord class with an incorrect slash-bass label.


## Show an honest no-match state

C4–G4 lacks a third, so a major/minor-triad-only matcher cannot determine major versus minor. That is a scope limitation, not evidence that two notes cannot form a useful sonority.

For C4–C♯4–D4, report that no supported match was found. Do not force the nearest major chord, delete an inconvenient note or present an unverified AI-generated name as certain.


## This input does not identify a song key or assess playing

A chord candidate is not a song-key result. A written-note input is also not microphone recognition, MIDI capture or a measurement of timing and technique.

The prepared example set includes sixth and seventh candidates as well as triads. Those types require their own matching vocabulary. They must not be passed to the current three-note B3 detail validator as though it already supports them.


## Questions and answers



**Why are there multiple results?**

Different chord interpretations can share a pitch-class set. The bass and musical context help explain the alternatives.

**Does an empty bass field mean the bass is unknown?**

Not when notes include octaves. The lowest entered pitch already supplies a bass; only genuinely register-free input lacks that information.

**Does no match mean the notes are wrong?**

No. It means no match was found within the tool’s advertised vocabulary and rules.


## Prepared input/output fixtures

| Input | Bass | Supported candidate labels |
|---|---|---|
| C4, E4, G4 | C4 | C |
| E3, G3, C4 | E3 | C/E |
| C4, E♭4, G4 | C4 | Cm |
| C4, E4, G4, A4 | C4 | C6, Am7/C |
| A2, C4, E4, G4 | A2 | Am7, C6/A |
| C4, G4 | C4 | No supported match |
| C4, C5, E5, G5 | C4 | C |
| C4, C♯4, D4 | C4 | No supported match |

## Sources and delivery boundary

- Introduction to Triads — https://musictheory.pugetsound.edu/mt21c/TriadsIntroduction.html
- Triads — https://openmusictheory.github.io/triads.html
- American Standard Pitch Notation (ASPN) — https://viva.pressbooks.pub/openmusictheory/chapter/aspn/
- Chords — https://www.musicca.com/chords

All controls described here are publication requirements. This content delivery does not establish that a finder engine, sequencer, hand diagram or new PDF is already implemented. No production feature should be promised until it works.
