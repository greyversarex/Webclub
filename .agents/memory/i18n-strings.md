---
name: i18n string convention
description: How user-facing text must be added on this multilingual site
---

All user-facing copy lives in `client/src/lib/translations.ts` under three top-level
locales: `ru` (primary), `en`, `tj`. Components read via `useLanguage()` -> `t.*`.

**Rule:** Never hardcode user-visible strings in components — add them to all three
locales in translations.ts, even decorative ones (e.g. section "eyebrow" kicker labels).

**Why:** Hardcoded English kickers produced mixed-language UI in RU/TJ modes — flagged
as a product regression in code review. Decorative ≠ exempt from localization here.

**How to apply:** Add a key to each of ru/en/tj, then reference `t.<group>.<key>`.
Shared cross-section labels were grouped under a single `eyebrows` object per locale.
