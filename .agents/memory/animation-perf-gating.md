---
name: Animation performance gating
description: Which animated components are actually mounted (worth optimizing) vs dead code, and the convention for pausing them when offscreen/hidden.
---

# Animation performance gating

The site has many "background"/animation components but only some are mounted in the live tree. Before optimizing any animated component, confirm it is actually rendered — grep for its usage outside its own file.

**Live (worth optimizing):**
- GalaxyBackground (WebGL, `position: fixed`, full-screen, mounted once in `home.tsx`) — renders at dpr=1 (ogl default), always "visible" so it can't be IntersectionObserver-gated; instead it honors prefers-reduced-motion (one static frame) and pauses on tab `visibilitychange`.
- The auto-playing device mockups: `EcomInteractive`/`BusinessInteractive`/`BankInteractive` (what-we-build) and `InteractivePhone`/`InteractiveLaptop` (apps-showcase, desktop-only behind `!isMobile`).
- LogoLoop marquee (partners strip, bottom), MagicRings (contact), ProcessSection autoplay.

**Dead code — do NOT spend time optimizing (not mounted anywhere):**
- ElectricPulses, CircuitBackground, CursorIllumination, InteractiveBackground, MiniRunnerGame.
- **Why:** these look expensive but never render, so optimizing them is wasted effort. This can go stale — re-verify the mount before trusting it.

**Convention for pausing offscreen work:**
- Use `client/src/hooks/use-in-view.tsx` (`useInView<T>()` → `[ref, inView]`, IntersectionObserver, 200px rootMargin, falls back to `inView=true` when IO is unavailable).
- For React auto-play timers: gate the effect with `if (hovered || !inView) return;` and add `inView` to the deps so it cleanly clears the timer offscreen and resumes from current state on re-entry.
- For imperative rAF loops: keep an `isVisible` flag toggled by an IntersectionObserver; when offscreen, stop scheduling and null the raf ref; the IO callback restarts the loop (resetting the last-timestamp) on re-entry. Already-running browser tabs throttle rAF in background, but an explicit `visibilitychange` pause is still added for the WebGL galaxy.
- **How to apply:** any new continuously-animating component (rAF or setTimeout loop) must pause when offscreen or when the tab is hidden, and respect prefers-reduced-motion.
