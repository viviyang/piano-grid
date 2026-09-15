# Pending Manual Gates

Result: PASS_WITH_NOTES

The requested human/physical acceptance cannot be truthfully marked complete in this environment. On 2026-09-15, the product owner accepted the non-PDF areas for release and deferred the listed human sampling for a later consolidated review. These rows remain `NOT_RUN`; they are not recorded as completed tests.

| Required gate | Status | Evidence |
|---|---|---|
| iPhone physical device | NOT_RUN | No present iPhone or Apple Mobile USB device was detected. Browser emulation is not a physical-device result. |
| Human listening | NOT_RUN | Automated waveform and spectral checks passed, but an AI process cannot provide human auditory approval. |
| Physical printing | NOT_RUN | Only virtual PDF/XPS/OneNote/Fax printers are installed; the default is Microsoft Print to PDF. No physical printer is available. |
| Screen Reader | NOT_RUN | Chromium accessibility-tree checks passed on 8 representative pages with 0 unnamed interactive nodes, but Narrator/VoiceOver user interaction was not performed. |
| PDF accessibility/tagging | FAIL | 167 public PDFs inspected; 0 contain detected structure-tree plus marked-content tagging and 0 declare document language. |
| Songs/Sheet rights | PARTIAL / SAFE EXTERNAL-ONLY | The three named editions allow metadata description and external linking only. Local score display/download, local recording playback, and commercial asset reuse remain blocked. |
| Music professional spot-check | NOT_RUN | Automated independent-format checks passed for the three original exercises, but the ledger and checker both state that no independent human or teacher review occurred. |

## Songs and Sheet Music rights conclusion

The three named songs remain separate from the three original exercises.

- Hot Cross Buns, Twinkle Twinkle Little Star, and Ode to Joy: exact provider arrangements are external references only. No PianoGrid rehosting or local playback grant is documented.
- Step and Hold, Left-Hand Answer, and One Hand at a Time: locally generated original exercises with documented provenance; they are not arrangements or completion evidence for the named songs.
- Rights evidence does not establish a global legal conclusion or exclusive copyright in AI output.

## Evidence required to close

These are post-release follow-ups under the product owner's explicit release decision, not evidence already obtained.

1. A recorded iPhone Safari test with device/model, OS/browser version, tested URLs, tester, date, and observed audio/touch results.
2. A named listener’s pitch/timing/fallback assessment.
3. A physical Letter and A4 print record with printer model, scale setting, margins, page breaks, and legibility observations.
4. A named Narrator or VoiceOver session covering navigation, forms, dynamic timer/audio states, and error announcements.
5. Accessible tagged PDF replacements or an explicit product decision that removes/limits inaccessible downloads.
6. Written permission covering each intended third-party score/audio action, or continued external-only treatment.
7. A named piano educator or qualified musician’s notation, pitch, rhythm, fingering, and pedagogy sign-off.
