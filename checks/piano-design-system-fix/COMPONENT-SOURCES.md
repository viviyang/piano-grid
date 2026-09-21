# Components and dependency exception

User approved 2026-09-21: on-demand missing primitives / native controls; no global redesign.

Button adapted from https://ui.shadcn.com/r/styles/new-york/button.json (retrieved 2026-09-21, exact source archived in shadcn-button-source.json). MIT license retained in SHADCN-LICENSE.md. Source forwardRef, Slot, cva and native props retained. Default visual classes replaced with the existing project `.am-button` primary/secondary/tertiary variants. Unused size and destructive variants omitted, no new control visuals. Only class-variance-authority and @radix-ui/react-slot added with exact versions; framework versions unchanged.

Project-owned Collapsible/Trigger/Content, Dialog/Close, PrintActions, KeyboardViewport/Keyboard, ShareDialog and StaffDiagram reused. These pre-existing wrappers are not claimed to be shadcn installations. Native radio/range/checkbox used for simple selectors/settings, consistent with approved component rules; no new manual menu, modal, tab or slider focus management. Existing Icon rendering is retained via PrintActions/KeyboardViewport; no icon dependency needed.

Frozen UI definitions, theme, foundation, tokens, shared CSS and header/footer remain unchanged. New pilot CSS is `.cp-pilot` scoped. Keyboard depth uses existing piano tokens and transparency mixing; no palette additions. Hand SVG only explains established finger numbering and is optional on the existing FingeringGuide.
