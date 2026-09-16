# TEST_REPORT — B06

## Commands run (real)

| Command | Exit | Notes |
| --- | --- | --- |
| `npm run typecheck` | 0 | After teaching-pack wiring |
| `npm run check:foundation` | 0 | 565 passed (after removing public `.tmp-*` PDFs) |
| `npm run check:css` | 0 | Includes teaching-pack.css |
| `node scripts/check-b06-plan.mjs` | 0 | Copy/ID/wiring assertions |
| `node scripts/export-teaching-pack-pdfs.mjs` | 0 | Requires `PIANO_BASE_URL=http://localhost:3116` |
| `node scripts/check-b06-browser.mjs` | 0 | 15 passed, 0 failed |
| `npm run build` | 0 | Full production build |

## PDF facts (measured)

| Asset | Pages | Bytes | SHA256 |
| --- | ---: | ---: | --- |
| piano-key-names-c4-c5-letter.pdf | 3 | 50896 | CB2B39BA2BC2A2031C6B602A559108751C94CA5B3CB0E2AE88D0A17A72BD76EA |
| piano-key-names-c4-c5-a4.pdf | 3 | 50949 | 5C0F34E5F129F194361DAD3A8EF5D5E69223B60A11F079140F175CA389CA78FF |
| piano-key-names-c4-c5-letter-worksheet.pdf | 1 | 32011 | 69065DCFAB5547C393AB146522142D76F047BD96FEFD833E7CFDF8CBB8CF998C |
| piano-key-names-c4-c5-a4-worksheet.pdf | 1 | 31995 | C4CDF82E9D85DE7E0AE3760249AFDB47D4E0DC9F94B07E430ADD923983579B0F |

Text extract checks (pypdf): full pack contains Meet/Your turn/Check + C4–C5 answers + look-again F4/C5/D4; worksheet-only lacks answer row and “Use page 3”, uses resource-page footer.

## Not claimed PASS
- Physical paper print
- True device share sheets
- Screen-reader session
- Live outreach send
- pdf-parse automated extract in `check-b06-pdfs.mjs` (module unavailable; header/size + pypdf manual extract used instead)
