---
name: Imported API workflow
description: Runtime setup caveat for the separate API artifact after importing this project
---

A GitHub import can retain the API artifact metadata and source while registering only the frontend workflow in the workspace; the separate API workflow may need explicit setup before live backend testing.

**Why:** The frontend can build and preview cleanly while `/api` is not running as a managed service.

**How to apply:** Check the configured workflow list before end-to-end API testing; do not assume the API artifact metadata created a running workflow.

For frontend-only verification after import, a full workspace install may be blocked by the API codegen dependency `orval`; installing the frontend filter and its local dependencies is sufficient for Numatik preview work.

**Why:** The imported lockfile can resolve all packages but the package firewall may reject the archived API-only dependency, while the frontend remains independently runnable.

**How to apply:** Use the Numatik workspace filter for UI changes, and reserve a separate API dependency/setup pass for backend work.