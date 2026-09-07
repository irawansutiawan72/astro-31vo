---
name: Production diagnostic logs
description: Which browser console methods survive the Numatik production frontend build
---

Critical browser diagnostics must not rely on `console.log`, `console.info`, `console.debug`, or `console.warn` in this project’s production build; the Vite minifier is configured to remove them.

**Why:** A required security or submission audit log can disappear from the deployed bundle even though it is visible during development.

**How to apply:** Use a deliberate non-stripped logging path for must-retain diagnostics, and keep normal development-only noise out of production.