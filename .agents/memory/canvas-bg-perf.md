---
name: Canvas background animation performance
description: How the fixed-position canvas overlays (electric-pulses, cursor-illumination) map SVG coords to screen, and the per-frame reflow trap to avoid.
---

# Background canvas animation performance

The home page stacks several full-viewport background layers (see `client/src/pages/home.tsx`): a static image, aurora orbs (CSS), `CircuitBackground` (SVG, `data-testid="bg-circuit"`, `position: fixed`), and two `position: fixed` canvas RAF loops — `ElectricPulses` (moving "fireflies" along traces) and `CursorIllumination` (mouse-driven glow). `InteractiveBackground` (Three.js) exists but is NOT mounted on home.

## Rule: don't call getScreenCTM() inside the RAF loop
Both canvas components map the circuit SVG's 1920×1080 user coords → screen pixels using the SVG's `getScreenCTM()`. Calling `document.querySelector(...).getScreenCTM()` every frame forces a synchronous layout reflow; with two loops that's ~120 forced reflows/sec and is the main animation-jank source.

**Why:** `getScreenCTM()` triggers style/layout flush. The circuit SVG is `position: fixed` and full-viewport, so its screen matrix is invariant to scroll and only changes on window resize. Recompute the CTM only in the resize handler (and lazily retry once if null before the SVG mounts), then reuse the cached `DOMMatrix` every frame.

**How to apply:** If you add another coord-mapped canvas overlay tied to `bg-circuit`, cache the CTM the same way. If the SVG ever gains a CSS/SVG transform (rotate/skew/animated scale) or stops being `position: fixed`, the cache-on-resize assumption breaks — revalidate the CTM on `visibilitychange` or via a MutationObserver, and use the full affine mapping (a,b,c,d,e,f), not just a,d,e,f.

## Other idle savings in place
- Both loops early-return when `document.hidden`; ElectricPulses also resets its `lastTime` while hidden to avoid a huge dt jump on tab return.
- CursorIllumination skips redraws when the pointer is stationary (keeps last frame) or has left the window (clears once, then idles); any mousemove resumes drawing.

## Intro animation: never run one RAF+setState loop per element
The intro (`intro-animation.tsx`) once rendered 30 matrix columns where EACH column ran its own `requestAnimationFrame` loop calling React `setState` every frame — ~30 re-renders/frame, freezing the page for the whole intro on load. Continuous transform motion like this belongs in CSS `@keyframes` (compositor-driven), not per-frame JS state.

**Why:** N independent RAF loops each doing setState multiplies React reconciliation by N every frame and saturates the main thread; users perceive it as the whole site hanging on load.

**How to apply:** For purely decorative looping motion (scrolling columns, drifting orbs), use a CSS keyframe animation with per-element random duration + negative `animation-delay` for desync, and add `will-change: transform`. Reserve JS RAF for canvas drawing or motion that genuinely needs per-frame computed values.
