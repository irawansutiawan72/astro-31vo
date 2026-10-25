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

For the current Numatik Strike scope, preserve the existing visuals, lighting, enemy AI, and fixed roster of 10 enemies without respawns. Do not change other pages or add dependencies.

**Why:** The user restated these boundaries in the tower-ramp handoff.

**How to apply:** Treat these as constraints for Numatik Strike changes unless the user explicitly changes the scope.

## Preview limitation

The automated app-preview browser cannot create a WebGL context for Numatik Strike, so it shows the app's graceful 3D-unavailable fallback instead of live gameplay.

**Why:** The capture browser reported that it could not create a WebGL context, even though the Vite workflow and production build succeeded.

**How to apply:** Treat this screenshot limitation as inconclusive for gameplay. Verify the build and code, and use a WebGL-capable device/browser to confirm live 3D behavior.
