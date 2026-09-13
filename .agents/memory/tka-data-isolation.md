---
name: TKA data isolation
description: The independence rule for Modul Pemantapan TKA exercise content and neighboring menu pages.
---

Modul Pemantapan TKA exercise datasets should live in TKA-owned data modules rather than importing route-page data from another menu.

**Why:** The user explicitly wants each menu to stand alone; importing from another menu makes content changes cross-couple routes and obscures which product owns the questions.

**How to apply:** When separating a TKA topic, preserve the current question shape and visuals in a TKA data source, then make the TKA route import only its layout, TKA examples, and TKA-owned dataset.