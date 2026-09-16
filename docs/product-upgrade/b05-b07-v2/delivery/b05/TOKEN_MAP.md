# TOKEN_MAP — B05

B05 CSS uses existing production tokens only. No new palette or font dependency.

| Design intent | Production token / utility |
| --- | --- |
| Primary actions / active step | `var(--primary)`, `.am-button.am-primary` |
| Body / foreground | `var(--foreground)` |
| Muted labels | `var(--muted-foreground)` |
| Borders / dividers | `var(--border)` |
| Soft surfaces / active step bg | `var(--accent)` / `var(--surface)` |
| Control radius | `var(--pr-radius-control)`, `var(--pr-radius-panel)` |
| Focus ring | existing `:focus-visible` / `--pr-focus-width` |
| Spacing rhythm | `var(--pr-space-48)` and rem scales matching design |
| Font | system stack from foundation (no Inter download) |
| Share dialog | existing `.kn-share-dialog` + `@media print { display:none }` |

Prototype Inter/`#2c68c7` values were **not** copied as hard-coded production theme overrides.
