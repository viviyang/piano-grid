# Homepage Hero background QA

## Source and state

- [已核实] Background source: `C:/Users/Admin/AppData/Local/Temp/codex-clipboard-f5b372fd-f19a-4a80-a443-c740e77cc47f.png`, 1024 × 572. The copied production asset has the same SHA-256 hash.
- [已核实] Effect reference: `C:/Users/Admin/AppData/Local/Temp/codex-clipboard-de7b4688-535b-4f2d-87da-a54d605fc0b3.png`, 1551 × 801.
- [已核实] Implementation: `http://localhost:3000/`, production build, normal theme, animation settled.
- [已核实] Verification browser: Codex in-app Browser. Requested viewport overrides were 1440 × 900 and 390 × 844 CSS pixels at device scale factor 1. Browser screenshots contain 1425 × 891 and 375 × 812 raster pixels because the browser surface excludes its scrollbar/chrome area.
- [已核实] Screenshots: `checks/home-hero-background/hero-1440.png` and `checks/home-hero-background/hero-390.png`.
- [已核实] Normalized focused comparison: `checks/home-hero-background/comparison-1440.png`. The reference effect is on the left and the implementation Hero is on the right; both Hero crops are normalized to 1425 × 720.

## Findings

- [已核实] No P0, P1, or in-scope P2 mismatch remained in the final Hero comparison.
- [已核实] Layout: the supplied East Lake photograph fills the complete Hero. Copy remains in the left reading zone while the pavilion, grand piano, hands, reflection, and keyboard remain visible toward the center/right.
- [已核实] Gradient: the left side uses the existing `--background` token at stepped opacity and fades to transparent before the right piano body. A lighter vertical wash keeps the top and bottom transition controlled. No new brand color was introduced.
- [已核实] Typography and copy: the existing 61px desktop/40px mobile headline, serif italic emphasis, copy, buttons, and live routes are unchanged.
- [已核实] Mobile: at 390px the text remains centered and readable above the hands/keyboard crop. The document has no horizontal overflow (`scrollWidth` 375 within `innerWidth` 390).
- [已核实] Motion: the image has a 1.15s reveal followed by a 16s scale from 1 to 1.018; the copy enters over 0.72s. `prefers-reduced-motion` removes both animations.
- [已核实] Interaction: the Hero primary CTA navigated to `/tools` and browser Back returned to `/`. The 390px menu opened and closed correctly. The in-app Browser error console was empty.
- [已核实] Scope: only the Hero DOM, its dedicated stylesheet, its supplied image asset, and the matching asset/test allowlists changed. The independent keyboard and every section below it were left intact.

## Fidelity surfaces

- [已核实] Fonts: the existing homepage system sans and Georgia italic roles are retained, with the original weight, line height, letter spacing, and line wrapping.
- [已核实] Spacing: desktop Hero is 721px tall and the text aligns within the existing 1120px page container. The mobile Hero grows to 845px to keep all copy, buttons, quick links, hands, and keys visible.
- [已核实] Colors: all overlay colors derive from `--background` or `--foreground`; global token files remain byte-for-byte unchanged from the recorded baseline.
- [已核实] Image quality: the supplied PNG is used directly without regeneration, replacement, or lossy conversion. `object-fit: cover` preserves the intended full-bleed treatment.
- [已核实] Copy: brand, H1, description, CTA labels, quick links, routes, metadata, and indexing state are unchanged.

## Verification

- [已核实] `npm run check`: Foundation 560 passed, 0 failed; TypeScript and CSS checks passed.
- [已核实] `npm run build`: passed; the existing routes were statically generated.
- [已核实] In-app Browser: 1440px and 390px visual capture, primary CTA, mobile navigation, horizontal overflow, and console errors checked.

## Comparison history

- [已核实] Initial capture occurred at the first animation frame, leaving the copy nearly invisible. The entry animation was changed from zero opacity with delay to 18% initial opacity with no delay, shortened to 0.72s, and recaptured after the final build.
- [已核实] The final settled-state desktop and mobile captures show readable copy and the intended full-bleed image treatment.

**Final result: passed**
