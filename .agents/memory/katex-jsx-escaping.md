---
name: KaTeX strings in JSX
description: Backslash handling for KaTeX source passed through JSX attributes and JavaScript expressions.
---

In quoted JSX attributes, backslashes are passed through literally; do not double them as if the value were an ordinary JavaScript string. A doubled slash can be read by KaTeX as a line-break command and break the formula.

**Why:** A lesson preview showed malformed formulas and KaTeX warnings even though the TypeScript/Vite build succeeded.

**How to apply:** Use one backslash per LaTeX command in static JSX math props. In JavaScript strings and template expressions, use the normal JavaScript escaping rules. Verify rendered math in the browser, not only in the build.