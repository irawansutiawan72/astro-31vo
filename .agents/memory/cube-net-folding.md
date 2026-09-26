---
name: Cube net folding
description: The interactive cube-net gallery needs validated hexomino patterns and 3D face frames for reliable assembly.
---

Use one validated set of 11 cube-net patterns and derive each face's center, local axes, and normal from a root face before rendering the assembled state. For the first user-facing patterns, use nested edge hinges when the interaction must visibly fold toward the viewer; a flat 2D tree with independent hinge angles can make some valid-looking patterns overlap or finish as a non-cube.

**Why:** Different net branches can fold around different axes, so the final geometry must preserve each face's unique cube normal and center.

**How to apply:** When changing the gallery in the cube material page, validate all six face normals and centers for every pattern, then verify the net and assembled states in the preview. Match the front-facing fold direction and staged hinge motion to the reference interaction before extending the specialized renderer to more patterns.