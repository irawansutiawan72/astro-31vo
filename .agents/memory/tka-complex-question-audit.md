---
name: TKA complex-question audit
description: Durable rules for checking complex multiple-choice and true-false TKA items.
---

For the Modul Pemantapan TKA data, a `pgk` item must contain exactly four statements and a `pgkbs` item exactly three statements with the same-length answer array. A question must include every table, price list, diagram input, or other data used by its explanation; do not rely on an implied or missing source.

**Why:** A repository-wide audit found several answer formats that rendered inconsistently and explanations that introduced price data not present in the question. Exact statement counts and self-contained prompts prevent invalid grading and unsupported explanations.

**How to apply:** When adding or auditing TKA items, validate statement/key lengths across all module files, then independently recompute each statement from only the prompt data. Reject “closest answer” or rounded substitutions for exact questions.