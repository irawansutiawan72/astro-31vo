---
name: Math Game Arena level separation
description: Product scope for the main SMP arena versus the separate SMA arena.
---

The main Math Game Arena opens directly to one combined list of SMP materials across grades 7–9. Do not add grade-selection cards or shortcuts to SMA or general games there. SMA has its own distinct Math Game Arena in the SMA route.

**Why:** The user explicitly said the SMP and SMA arenas are different and should remain separate.

**How to apply:** Keep the flat SMP topic list at `/math-game-arena` and SMA topic navigation under `/math-game-arena/sma` when changing arena pages or routes. Retain the grade-specific routes beneath the SMP topics so each game still loads.
