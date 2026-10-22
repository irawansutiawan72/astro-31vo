---
name: Numatik Strike scope
description: Original-art direction, staged delivery, and runtime/performance constraints for Numatik Strike.
---

Numatik Strike may take inspiration from the modern military FPS genre, but its names, visual design, and assets must remain original. Keep changes limited to the Numatik Strike game page unless the user asks otherwise. Do not add runtime dependencies beyond Three.js.

Deliver one reviewed phase at a time and stop at its boundary:
- A: large arena and atmosphere
- B: soldier enemies and AI
- C: weapons, ADS, and HUD
- D: waves, math supply drops, game over, and high scores

Across phases, retain the mobile performance requirements: instance repeated walls/crates, reuse materials, disable real-time shadows, cap pixel ratio at 2, keep active enemies to about 10 or fewer, dispose scene resources on unmount, and offer Low / Medium / High quality settings.

**Why:** These are the user's explicit product and delivery constraints for the game.

**How to apply:** Only implement the next phase after review of the previous one; do not proceed into later phases in the same delivery.
