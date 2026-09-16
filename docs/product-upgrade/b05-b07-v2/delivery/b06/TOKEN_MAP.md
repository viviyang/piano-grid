# TOKEN_MAP — B06

Uses existing theme tokens (no new palette):

| UI | Token / rule |
| --- | --- |
| Accent / kicker | `var(--primary)` |
| Body / titles | `var(--foreground)` |
| Secondary copy | `var(--muted-foreground)` |
| Borders | `var(--border)` |
| Controls | existing `.am-button` + radio accent `var(--primary)` |
| Print sheet | forced black/white keyboard (`#111` blacks), white paper |
| Scope class | `.pg-teaching-pack*` only — no global `button`/`svg` overrides |

Prototype fallback blue `#2C68C7` was **not** copied into production CSS.
