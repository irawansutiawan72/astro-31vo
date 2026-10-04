---
name: Cube net folding
description: The interactive cube-net gallery needs validated hexomino patterns and 3D face frames for reliable assembly.
---

Use one validated set of 11 cube-net patterns and derive each face's center, local axes, and normal from a root face before rendering the assembled state. For the first user-facing patterns, use nested edge hinges when the interaction must visibly fold toward the viewer; a flat 2D tree with independent hinge angles can make some valid-looking patterns overlap or finish as a non-cube.

**Why:** Different net branches can fold around different axes, so the final geometry must preserve each face's unique cube normal and center.

**How to apply:** When changing the gallery in the cube material page, validate all six face normals and centers for every pattern, then verify the net and assembled states in the preview. Match the front-facing fold direction and staged hinge motion to the reference interaction before extending the specialized renderer to more patterns. Keep all six net pieces rendered during folding; do not add state-based hiding or opacity rules.

## Reverse-side visibility
When a labeled face rotates away from the viewer, render the same readable label on its reverse surface as well; otherwise the square appears to disappear during folding.

**Why:** Backface culling hides the front label as a panel turns, so a blank or translucent reverse side makes a still-present face look missing.

**How to apply:** Keep the reverse face opaque and mirror-correct its label before rotation. Check the animation while faces pass edge-on, not only the final cube.