---
name: Bank Soal practice collection
description: How Bank Soal reuses the JSX-based Tugas-Latihan Mandiri pages without duplicating their math and diagram content.
---

The Kelas 7 Tugas-Latihan Mandiri pages are authored as React/KaTeX JSX cards rather than normalized question records. Bank Soal pages for topics with that structure should compose the existing subtopic page components instead of attempting to flatten prose, tables, diagrams, and translated strings into a second dataset.

**Why:** Flattening these pages loses interactive math presentation and risks omitting nested prompts; component composition keeps the displayed questions identical to their source.

**How to apply:** Use the shared collection wrapper and suppress nested `PageNavigation` instances through the visibility context, while keeping one Bank Soal menu/back navigation for the aggregate page.