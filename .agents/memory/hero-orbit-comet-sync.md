---
name: Hero showcase comet/switch sync
description: How the orbiting comet and the featured-service switch stay in sync in hero-showcase.tsx
---

The hero showcase comet must visually land on an icon at the exact moment that service becomes active.

The rule: drive the comet angle from React state (`rotation`, 60° per service, continuous/never wraps), and switch `active` on the comet's `onTransitionEnd` (transform only) — never on an independent timer.

**Why:** Originally the comet spun on a standalone CSS keyframe loop while the card switched on its own setTimeout. The two periods differed, so the dot floated past icons with no relation to the switch — the user's complaint.

**How to apply:**
- Key the auto-advance `setTimeout` on `rotation` (not `active`). Any rotation change — auto-advance or a manual click via `goTo` — then clears+re-arms the timer, so a stale flight can't fire and overshoot the clicked icon (the race the architect flagged).
- Guard the transitionend handler with `e.target === e.currentTarget && e.propertyName === 'transform'` so bubbled/unrelated transitions don't trigger a spurious switch.
- Comet sits at top (9.6%, 50%) = icon 0; `rotate(active*60deg)` lands it on each icon because ORBIT points are 6 evenly-spaced clockwise positions.
