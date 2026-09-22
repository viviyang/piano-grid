# P1 implementation boundary — 2026-09-22

[已核实] User instruction: “继续P1”. Latest origin/main fetched at stage start: d15c0142cc6d00b01d060ba17092000a5bf060ca. Branch codex/product-system-p1 inherits uncommitted P0 implementation; no commit/push/merge/deploy. Original piano worktree untouched.

The P0 audio/visual timing failure remains open; starting P1 does not turn it into a pass. New P1 work follows protocol -> controlled receivers -> nine-page continuation -> existing source/asset review. No new routes, indexing, TDH, navigation, theme, dependencies or music engine.

Components: reuse native anchors with am-button/am-section-actions, existing select/radio controls, ScaleTrackedLink and current domain keyboards/practice/print. New product-continuation.tsx is a small bounded relation presenter, not a design system replacement. Component rules snapshot 2026-09-21; actual Button/Dialog/Collapsible implementations already exist.

Protocol: pg-object and optional pg-bass (integer pitch class 0..11) on five pilot details and /chords/extended; existing ref-* fragment selects category object. Detail restores only published voicing. pg-notes and pg-mode retain Finder's actual pitch classes/filter, never octave. pg-context=c-major and existing by-key/progression fragments retain named context. Query/hash do not add canonical routes or sitemap entries. No localStorage or identifiers.

Receivers outside these destinations keep their existing safe links; no claim of fixing all families. Invalid supported state falls back with explanatory text. Finder restoration does not fabricate tool_start. Next-step events remain intents; optional bounded relation/context_id augment the existing P0 event, not a second event.

Sources: only two legacy core registry entries receive IDs from the existing detail source binding; the other three pilot details already have resolvable IDs. teacherReviewed remains false. C-major scale keeps existing source/hand/direction data. New screen/HTML-print edition/scope note does not rewrite PDF metadata or source ledgers.

Existing PDF review: Letter and A4 text matches all four current hand/direction note+finger rows (8 comparisons). Protected originals remain unchanged. Poppler rendering found Letter RH top keyboard lacks three black keys, and A4 cover subtitle overlaps body; parser warns about xref/stream structure. This is a P1-3 failure, not a passed asset update. Regeneration/replacement requires the exact protected-asset authorization specified in 07.

Legacy check-support-pages/check-chords-completion scripts hard-code 173 sitemap routes, while this baseline has 206; their native Chrome launcher also differs from the required available Tabbit browser. Targeted assertions are ported to browser-owned scripts and route manifests compare against current PUBLIC_ROUTES. Original scripts are not silently loosened or claimed as run unchanged.
