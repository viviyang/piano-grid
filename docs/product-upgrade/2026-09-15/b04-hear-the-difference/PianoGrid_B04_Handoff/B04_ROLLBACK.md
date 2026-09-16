# B04 ROLLBACK

Branch work is uncommitted on `codex/final-integration`.

## Soft rollback (discard B04 only)

1. Remove route `src/app/tools/hear-the-difference/`
2. Remove components `src/components/hear-the-difference/`
3. Remove libs `src/lib/hear-the-difference*.ts`
4. Revert touched files:
   - `src/lib/site-routes.ts`
   - `src/lib/seo-editorial.ts`
   - `src/lib/integration-content.ts`
   - `src/lib/chord-content.ts`
   - `src/lib/chord-detail-model.ts`
   - `src/lib/support-content.ts`
   - `src/components/integration/pages.tsx`
   - `src/components/integration/home-color-repair.css`
   - `src/components/keyboard-notes/keyboard-diagram.tsx`
   - `src/components/keyboard-notes/share-control.tsx`
   - `docs/content/.../tools-content-data.json`
   - `scripts/check-foundation.mjs`
   - `scripts/check-integration-batch.mjs`
   - `scripts/check-integration-production.mjs`
5. Remove `public/assets/tools/hear-the-difference-og.png`
6. Remove B04 check scripts / docs / checks folder

Or, if committed later: `git revert <b04-commit>`.

## Do not

- Do not reset past B02/B03 Keyboard Notes commit `c9651ba`.
- Do not force-push.
- Do not redeploy until explicit approval.
