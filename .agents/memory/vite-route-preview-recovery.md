---
name: Vite route preview recovery
description: Recovery pattern for a blank lazy-loaded route after Vite dependency optimization in the managed preview workflow.
---

When a lazy-loaded route becomes blank immediately after adding or changing a dependency, first inspect browser logs for a failed dynamic import or invalid hook error, then restart the managed frontend workflow once before changing application logic.

**Why:** Vite may optimize a newly imported dependency and reload the module graph while the preview browser still holds an incompatible lazy route module, producing a misleading runtime failure even when the source and production build are valid.

**How to apply:** Confirm the workflow is listening and the root route works, restart the exact artifact-owned frontend workflow, then re-open the affected route and check the browser console.