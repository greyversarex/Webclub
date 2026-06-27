---
name: Centered float/animation transform conflict
description: Why a CSS keyframe animation on an absolutely-centered element must re-include the centering translate
---

When an element is centered with Tailwind utilities `left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2` AND also has a CSS keyframe animation that sets `transform` (e.g. a float/bob), the animation's `transform` fully overrides the Tailwind translate during the animation.

**Rule:** every keyframe of such an animation must itself include `translate(-50%, -50%)`, e.g.
`50% { transform: translate(-50%, calc(-50% - 10px)); }`. Otherwise the element jumps off-center the moment the animation runs.

**Why:** `transform` is a single property; the animated value replaces the static Tailwind one rather than composing with it.

**How to apply:** keep the Tailwind `-translate-x-1/2 -translate-y-1/2` for the reduced-motion / no-animation fallback, and gate the float class behind `!reduced`. Used by the hero product showcase center card (`hero-float` keyframe in index.css).
