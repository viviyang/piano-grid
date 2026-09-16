# COMPONENT_REUSE_MAP

| Concern | Shared owner | Consumers | Not shared |
| --- | --- | --- | --- |
| Keyboard geometry / roles | `KeyboardDiagram` + `keyboard-notes.css` role classes | Explore, Practice, Labeled, B04 reveal | Practice/B04 business state |
| Viewport range math | `keyboard-viewport.ts` | Explore, Labeled, print helpers | — |
| Note / comparison audio | `ReferenceAudio` via `use-note-audio` / `use-comparison-audio` | Explore/Practice; B04 | No second engine |
| Share helpers + panel | `share-control.tsx` (`copyShareURL`, `openNativeShare`, `SharePanel`, `ShareDialog`, `ShareControl`) | Practice, Labeled, Explore copy, B04 | Payload serialization stays with each owner |
| Practice presets / hints | `keyboard-practice.ts` | Practice workspace + unit checks | B04 pairs stay in hear-the-difference-core |
| Exit confirmation pattern | Practice dialog (Keep practicing / Discard round) | Practice only this round | B04 has no equivalent round discard |

Suggested names from the pack (`KeyboardViewport`, `ShareSheet`) were implemented as functions/components inside existing owners rather than a new mega-component.
