# Final Integration Result

Result: PASS_WITH_NOTES

## Candidate identity

- Accepted baseline: `37a88125389d0eaeb3b4e8adcbcea4e009674420`.
- Practical Tools source commit: `7f9fca7d704ebf4c8741963338ae9e7d4df5d914`.
- Final integration branch: `codex/final-integration`.
- Committed candidate HEAD: `b80e39c36268738ef0b9497514fb7b3c6a4af276`.
- At the time of the integration audit, no push or deployment had been performed. On 2026-09-15, the product owner explicitly authorized publishing this candidate to `main` with the unresolved PDF accessibility item retained as a known release note and the remaining human sampling deferred.

## Regression-contract reconciliation

The following QA-only scripts were updated without changing product code or URL scope:

- `scripts/check-chords-final.mjs`
- `scripts/check-chords-n2d-v2.mjs`
- `scripts/check-integration-production.mjs`
- `scripts/check-release-seo.mjs`
- `scripts/check-scale-final.mjs`
- `scripts/check-scale-completion-contract.mjs`

Chords, integration, and SEO checks now obtain final metadata through the same `editorialMetadata` / `editorialHeading` contract used by the application. Sitemap assertions now compare with `PUBLIC_ROUTES` rather than a historical 173-route literal. The homepage illustration assertion now reflects the existing seven task cards, including the already-integrated Sheet Music task.

Scale checks no longer require an absent non-versioned launch file. They reproducibly export the current 27-page authoring bundle from the committed master using `scripts/export-scale-authoring.mjs`; an explicit `PIANO_SCALE_AUTHORING_BUNDLE` remains available for auditing another bundle.

## Verification

- Chords final: PASS, 369/0.
- Chords N2D: PASS, 188/0.
- Integration production: PASS, 186/0.
- Release SEO: PASS, 17/17 pages; 0 blocking findings; 0 runtime errors.
- Scale final data/contract: PASS, 670/0.
- Scale completion contract: PASS, 9/0.
- Product-specific, build, browser, route/sitemap, and PDF structural/render checks from the prior final integration run remain recorded in `TEST_RESULTS.md`.

## Scope and cleanliness

No `src/`, `public/`, route, dependency, or lockfile working-tree changes were introduced by this reconciliation. Regression outputs, screenshots, generated authoring bundles, temporary Python packages, and temporary PDFs were removed after verification. The four requested final reports were retained.

The integration and release-candidate result is `PASS_WITH_NOTES`. The product owner accepted the non-PDF areas for release and deferred physical/human sampling. PDF accessibility remains unresolved: every public PDF currently lacks a detected tag structure; see `PENDING_MANUAL.md` and `RELEASE_CANDIDATE.md`.
