# B04 SCREENSHOT DIFF

Captured against production build (`next start`) and compared to B04 v2 `screens/` hierarchy.

## Desktop (1440)

| State | Artifact |
| --- | --- |
| landing | `checks/.../screenshots/desktop/landing.png` |
| ready | `checks/.../screenshots/desktop/ready.png` |
| wrong | `checks/.../screenshots/desktop/wrong.png` |
| hint | `checks/.../screenshots/desktop/hint.png` |
| reveal | `checks/.../screenshots/desktop/reveal.png` |
| share | `checks/.../screenshots/desktop/share.png` |
| audio-error | `checks/.../screenshots/desktop/audio-error.png` |

## Mobile (390)

| State | Artifact |
| --- | --- |
| landing | `checks/.../screenshots/mobile/landing.png` |
| wrong | `checks/.../screenshots/mobile/wrong.png` |
| reveal | `checks/.../screenshots/mobile/reveal.png` |
| share | `checks/.../screenshots/mobile/share.png` |

## Notes

- Production uses site tokens/fonts; prototype Inter/blue values are not copied.
- Information hierarchy and interactive states match the v2 design pack.
- `audio-error` desktop capture injects the error panel for visual parity when the live AudioContext path succeeds in Chromium.
