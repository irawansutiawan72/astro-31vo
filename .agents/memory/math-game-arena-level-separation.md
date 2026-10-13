---
name: Math Game Arena level separation
description: Product scope for the main SMP arena versus the separate SMA arena.
---

The main menu and main Math Game Arena must identify the SMP arena as “MATH GAME ARENA SMP” and open one combined list of SMP materials across grades 7–9. Do not add grade-selection cards or shortcuts to SMA or general games there. The SMA section must identify its distinct arena as “MATH GAME ARENA SMA” and link to its own route.

**Why:** The user explicitly asked that the names and routes clearly distinguish SMP from SMA so the two arenas do not get merged again.

**How to apply:** Keep the SMP home and flat topic list at `/math-game-arena`; keep SMA cards, topic navigation, and back links under `/math-game-arena/sma`. Retain the grade-specific game routes beneath SMP topics so each game still loads.
