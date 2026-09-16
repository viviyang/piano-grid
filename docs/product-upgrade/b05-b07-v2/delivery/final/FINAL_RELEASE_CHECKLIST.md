# FINAL_RELEASE_CHECKLIST — B04–B07 CLOSEOUT

Use after `FINAL_MANUAL_CHECKS.md` is fully PASS. This checklist does **not** authorize commit/push/deploy by itself.

## Pre-authorization (automated — done)

- [x] PUBLIC_ROUTES delta = 0 (206)
- [x] `npm run check` = 0
- [x] Specialized B05/B06/B07 checks = 0
- [x] `npm run build` = 0
- [x] `git diff --check` = 0
- [x] Live SEO title/description/H1/canonical/robots = PASS
- [x] Internal links L01–L18 = PASS
- [x] OG + teaching-pack PDF HEAD = 200
- [x] Desktop/Mobile screenshots captured
- [x] Clean scoped diff produced (`clean-diff/`)
- [x] Suggested commit message drafted

## Human gates (required)

- [ ] Share round-trip Windows ↔ iPhone
- [ ] Physical print (Letter or A4) + other size PDF preview
- [ ] Screen reader smoke
- [ ] Hear-the-difference listen smoke on a real device
- [ ] Sheet edition access wording clarity

## Release authorization (only after human PASS)

Paste the authorization prompt from `docs/product-upgrade/b05-b07-v2/90_TEST_RELEASE.md` (user must explicitly authorize). Then:

1. Commit **only** scoped release files (see `clean-diff/STATUS_scoped.txt` + `UNTRACKED_files.txt`).
2. Exclude debug scripts, `.next*`, deploy logs, unrelated dirt.
3. Push and deploy per existing Vercel flow.
4. Post-deploy verify: `/songs/easy`, three sheets, labeled teaching-pack, `/tools`, `/tools/hear-the-difference`, B03 share, PDFs, canonical, sitemap.
5. On P0: execute `FINAL_ROLLBACK.md`.

## Suggested commit message

```text
Ship B05–B07 practice plan, teaching pack, and SEO closeout.

Adds beginner edition cards and Twinkle plan, labeled-key teacher PDFs with share/print, B07 TDH/OG/internal links, and local Collapsible styling—no new public routes.
```

Also saved at `SUGGESTED_COMMIT_MESSAGE.txt`.

## Final automatic status

**READY_FOR_MANUAL_ACCEPTANCE**
