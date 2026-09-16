# B04 Token Map

Production must use PianoGrid tokens / existing component classes. Prototype colors are reference only.

| Prototype token | Production mapping |
| --- | --- |
| `--blue` / primary CTA | Existing `am-button am-primary` / `--pr-*` brand blue already used by Tools/Chords |
| `--blueSoft` feedback | Soft info panels via existing surface + border patterns (`am-*` / page CSS variables) |
| `--ink` / `--muted` / `--line` | `--pr-ink`, muted text, hairline borders already in `globals` / `a-minor.css` / integration CSS |
| `--err` / `--errSoft` | Existing wrong-state treatment from Keyboard Notes (`kn-selected-wrong`) + soft error panel |
| Inter / system font in prototype | Keep project system stack (`--pr-font-sans`); do not add Inter |
| Primary min-height 48 | Existing control min sizes (`--pr-control-min-size`) |
| Keyboard compare old/new | Extend `KeyboardDiagram` role classes; style in B04 CSS using existing key radii/borders |
| Modal / bottom sheet | B04 share panel CSS; desktop dialog, mobile bottom sheet; no new dialog library |
| OG preview | `public/assets/tools/hear-the-difference-og.png` from pack `og/hear-the-difference-preview.png` |

## Non-goals

- Do not change global theme tokens.
- Do not introduce a second design system for B04.
- Visual variance vs prototype screens is allowed when caused by real tokens; hierarchy/state must match.
