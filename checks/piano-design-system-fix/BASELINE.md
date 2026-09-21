# C-major design-system correction — baseline

2026-09-21. Base: origin/main `f58a4ab9b979a803d7aaf6fc65e58e6408f7a0fe` (remote checked and fetched). Branch: `codex/c-major-design-correction`. Isolated worktree: `piano-cfix`. Original `piano` worktree left untouched. New worktree had no existing source changes. Baseline hashes are in baseline-hashes.json; baseline-status.txt includes only this new evidence directory.

Rules read: original workspace `docs/design/COMPONENT-RULES.md`, version 2026-09-21 (not yet tracked on main), both workspace and main AGENTS.md, ../docs/page-rules.md, main docs/seo/TDH-RULES.md, design-system.md and inspection.md (foundation-1.1.0-new-project), tokens.json, product plan, F-Homepage content/source/issues and read-only reference provenance. Historical 17-route limits do not describe current main; public route set stays unchanged.

## Approved corrections

The user approved the review findings and implementation. Interactive held notes, sustain, same-keyboard pitch-class practice, hints/help history/resume and C-major staff integration are explicit additions. Keep global independent/assisted/revealed classification; retain separate reasons in this pilot. Allow operational copy updates that reflect the actual keyboard range. Missing primitives may be added on demand; native radio/range/checkbox and existing wrappers remain acceptable. No automatic commit, push or deployment.

## Design and component inventory

- Theme/type/space/radius: src/styles/tokens.css; mapping src/app/globals.css; layout/focus src/styles/foundation.css. Freeze these, components.json, existing ui visual definitions, header/footer/navigation and read-only assets.
- Existing chord controls: src/app/chords/a-minor/a-minor.css, `.am-button` primary/secondary/tertiary and native `.am-positions` radio labels. Keep their actual visual definitions. No Button component exists at baseline.
- Existing reusable UI: src/components/ui/collapsible.tsx (controlled open, hidden content stays mounted), dialog.tsx (native dialog and focus restoration), breadcrumb.tsx, rolling-text.tsx. These are project wrappers, not verified shadcn installations.
- New Button: adapt shadcn new-york Button to existing `.am-button` variants; source https://ui.shadcn.com/r/styles/new-york/button.json, fetched 2026-09-21. Only cva and Slot dependencies if needed; retain license and source record. No shadcn init or theme regeneration.
- Position/hand: native radio semantics already meet needs. Sound settings: existing Dialog; native labeled range/checkbox meet simple volume/names/sustain needs. No custom Tabs/menu/slider focus implementation.
- Share: reuse src/components/keyboard-notes/share-control.tsx and its safe copy fallback. Staff: reuse staff-diagram.tsx with authored getChartData mapping; scope staff CSS to pilot to avoid importing page-wide keyboard CSS.

## Business/source inventory

- Route src/app/chords/c-major/page.tsx → chords/detail-page.tsx → a-minor/experience.tsx. Opt-in only at C-major route.
- Main keyboard a-minor/keyboard.tsx uses shared keyboard-geometry.ts; currently static spans. Extend with optional input props, preserving static and print output.
- Audio src/lib/a-minor-audio.ts: cancellable ReferenceAudio scheduler, together/ascending. Add held-note ownership to this engine, preserve existing callers.
- Practice chords/chord-builder-practice.tsx: C-major is three pitch classes, octave/order independent. Keep other routes unchanged. Use keyboard-practice.ts classifier in pilot with explicit help/retry reasons.
- Fingering chords/fingering-guide.tsx and chord-learning-content.ts: root-position examples only, source-verified with octave adaptation. No new inversion assignments.
- Print PrintActions + PrintVoicing and data.pdf. Preserve authored downloads and print selected voicing. Main C-major has no own Share, sustain or staff controls yet.
- Content and metadata retain getChordDetail, editorialMetadata, original IDs (including practice), sources, related links and canonical https://pianogrid.com/chords/c-major. Browser baseline records actual title/description/H1/canonical and IDs.

## Practice/content contract

Default reference stays fully server rendered, including collapsed content. In practice hide direct answer, table of contents, current target/voicing summary, fingering/staff/reference reading and reference playback/print/share controls from both sight and accessibility tree. Keep H1 and breadcrumbs. Viewing reference or a reference anchor while a session exists sets the help flag; returning uses the same mounted session, no redirect or URL parameter protocol. Clear and Retry retain help history for this fixed question. Only a fresh page starts a new session; no claim of an independent result after a reveal.

## Validation plan

Before/after same browser 1440×900 and 390×844, 320px and zoom/reflow, computed control styles, pointer/keyboard/cleanup/audio-failure paths, assisted results and anchor/SSR/print/PDF/share, representative other chord/scales/keyboard/home regression. Run existing check, integration data, build and applicable integration browser scripts; save outputs here instead of overwriting historical reports. Real touch/speaker quality/screen-reader/manual print remain separately labeled.
