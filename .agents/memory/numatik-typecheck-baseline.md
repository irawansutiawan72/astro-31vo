---
name: Numatik typecheck baseline
description: Current distinction between the full TypeScript check and the production Vite build.
---

The full Numatik typecheck is not currently a clean repository-wide gate: existing diagnostics span unrelated components and page types, including library typings, React refs, JSX types, animation variants, and locale-driven props. The production Vite build can still succeed, and a changed page should be checked separately for diagnostics.

**Why:** Focused page changes have passed the production build without diagnostics in changed files, while the broad typecheck can fail across unrelated parts of the project.

**How to apply:** For focused changes, run the production build and filter typecheck output for changed files; do not attribute unrelated baseline errors to the current change.