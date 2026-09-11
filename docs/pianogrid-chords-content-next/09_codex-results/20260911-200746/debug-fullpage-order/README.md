# Rejected diagnostic run

[已核实] This directory preserves the first focused rerun and diagnostic screenshot. Its single A-flat 200% failure was caused by taking a Chrome `fullPage` screenshot before the reflow assertion, which changed scrollbar occupancy by 14px. It is not the acceptance result. The corrected acceptance report is `../new-pages/validation.json` (95/95).
