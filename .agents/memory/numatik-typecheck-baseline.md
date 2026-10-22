---
name: Numatik typecheck baseline
description: Current distinction between the full TypeScript check and the production Vite build.
---

The full Numatik typecheck is not currently a clean repository-wide gate: existing diagnostics span unrelated components and page types, including library typings, React refs, JSX types, animation variants, and locale-driven props. It can also exceed a normal command timeout; with a 4 GB heap it previously completed and reported 291 errors across 86 files. A newly created lazy-loaded TSX page may briefly show a stale “Cannot find module” diagnostic even when the file exists and TypeScript resolves it; an explicit `.tsx` suffix cleared that diagnostic in a focused page change.

**Why:** Focused page changes can be sound even when the broad project check is blocked by unrelated diagnostics or runtime limits, and the editor's module cache can lag behind newly created files.

**How to apply:** For focused changes, check the changed file with LSP and confirm new import paths resolve; if a new TSX import stays unresolved, add its `.tsx` suffix when `allowImportingTsExtensions` is enabled. Use the production build as a separate check, and do not attribute unrelated baseline errors to the current change.