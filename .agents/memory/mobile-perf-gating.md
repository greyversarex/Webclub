---
name: Mobile performance gating
description: Which decorative animations must be disabled on mobile, and why the partners marquee was stalling.
---

# Mobile performance gating

On this client-only SPA the home page ran several always-on animations that, stacked
together, saturated the mobile main thread / GPU. The fix pattern is: gate the heavy
decorative work behind `useIsMobile()` (768px) and show a static/lighter variant.

Heavy offenders that must stay OFF (or reduced) on mobile:
- Hero `CardSwap` auto-rotation → render a static vertical list of cards instead.
- WebGL galaxy background → lower density/glow/twinkle/speed, disable mouse interaction.
- Tech-stack per-icon pulse `setInterval` + animated `drop-shadow` filter → freeze (static icons).
- Portfolio rotating conic-gradient glow (`orbital-spin`, `blur(38px)`) → no animation, smaller blur.
- Testimonials per-character `TypewriterText` timers → show full text instantly on mobile.

**Why:** the partners LogoLoop marquee (RAF `transform`) appeared frozen ("just stands")
on mobile. Root cause was NOT a bug in LogoLoop — it was main-thread starvation from all
the above running at once. Freeing the thread let the RAF loop run again. Don't "fix"
LogoLoop first; cut the other animations and re-check.

**How to apply:** `useIsMobile` must initialize *synchronously* from `window.innerWidth`
(not `undefined`/`false` then correct in an effect), otherwise mobile devices first-paint
the heavy desktop path for a frame before switching — which defeats the optimization.
