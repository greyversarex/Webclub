---
name: Cosmic site background
description: How the WEBCLUB/WEBCOREX site-wide background works and how it affects section styling + screenshots
---

# Cosmic / Galaxy background

The site renders one site-wide animated background (Galaxy WebGL via Three.js, with a matrix number-rain fallback) behind ALL page sections.

## Rule: sections stay transparent
Page section components (hero, process, portfolio, etc.) must NOT paint an opaque background. Keep them transparent so the global Galaxy/matrix background shows through.

**Why:** the background lives once at the page level; an opaque section background would punch a hole in the cosmic effect and break visual continuity.

**How to apply:** when graduating a mockup or building a new section, drop any `bg-<dark>` / `min-h-screen` full-bleed background the mockup used. Translate the mockup's palette to the app's existing tailwind tokens — violet (`violet-500/400/300`) + cyan (`cyan-400/300`) accents, white / `white/60` / `white/40` text, glass panels (`bg-white/5 border-white/10 backdrop-blur`). Glass panels themselves may use semi-transparent fills so the bg still peeks through.

## Gotcha: screenshots can't render WebGL
`type=app_preview` screenshots log `unable to create webgl context` and show only the matrix-rain fallback (or the intro splash). This is a headless-environment limitation, NOT a bug in the Galaxy background. Don't chase it. Scroll-revealed sections (IntersectionObserver via `useScrollAnimation`) also won't appear in a top-of-page screenshot because they stay `opacity-0` until scrolled into view — verify those via clean compile + LSP instead.
