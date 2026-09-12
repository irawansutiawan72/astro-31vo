---
name: Numatik typecheck baseline
description: Current distinction between the full TypeScript check and the production Vite build.
---

The full Numatik typecheck is not currently a clean repository-wide gate: existing locale-driven pages report readonly-array incompatibilities in component props. The production Vite build can still succeed, and a changed page should be checked separately for diagnostics.

**Why:** A content-only page change passed the production build and had no diagnostics in the changed file, while the broad typecheck failed in unrelated translation-heavy pages.

**How to apply:** For focused content changes, run the production build and filter typecheck output for the changed file; do not attribute unrelated baseline errors to the current change.