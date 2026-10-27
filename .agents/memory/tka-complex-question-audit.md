---
name: TKA complex-question audit
description: Durable rules for checking complex multiple-choice and true-false TKA items.
---

For Modul Pemantapan TKA, use four statements for `pgk` and three for `pgkbs` by default, unless the user specifies a different count for a particular item; keep the answer array the same length as its statement list. A question must include every table, price list, diagram input, or other data used by its explanation; do not rely on an implied or missing source.

**Why:** A repository-wide audit found several answer formats that rendered inconsistently and explanations that introduced price data not present in the question. Exact statement counts and self-contained prompts prevent invalid grading and unsupported explanations.

**How to apply:** When adding or auditing TKA items, honor explicit question-specific formats, validate statement/key lengths, then independently recompute each statement from only the prompt data. Reject “closest answer” or rounded substitutions for exact questions.