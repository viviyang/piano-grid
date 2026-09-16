# EVENT_STATUS — B07 T13

**Collector status:** `INSTRUMENTED_NOT_COLLECTED`

## Facts
- Song plan / edition / share events dispatch on `pianogrid:song-plan-event` via `src/lib/b05-events.ts`.
- Teaching pack events dispatch on `pianogrid:teaching-pack-event` via `src/lib/b06-events.ts`.
- Payload keys are allowlisted; `externallySent` stays `false`.
- No gtag / Plausible / dataLayer collector on in-scope pages in this worktree.
- No third-party analytics SDK installed for these events.

## Contract mapping (B07/04 → implemented names)
| Contract | Implemented |
| --- | --- |
| `song_plan_*`, `edition_open`, `share_*`, `valid_shared_landing` | B05 names unchanged |
| `resource_preview` | `teaching_pack_preview_page` |
| `resource_download_click` | `teaching_pack_download` |
| `resource_print_requested` | `teaching_pack_print_dialog` |

## Evidence
- `EVENT_STATUS.json` — localDispatchCount ≥ 1, sensitiveLeak=false, providers absent.
- Command: `PIANO_BASE_URL=http://localhost:3116 node scripts/check-b07-events.mjs`

## Not done (by design)
- Installing a collector or claiming `COLLECTED_VERIFIED`.
- User configuration of an analytics provider remains a separate follow-up.
