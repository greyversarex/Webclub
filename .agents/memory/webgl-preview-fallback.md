---
name: WebGL unavailable in Replit preview
description: Any WebGL/3D feature must ship a non-WebGL fallback because the dev preview iframe cannot create a GL context.
---

# WebGL is unavailable in the Replit dev preview iframe

The Replit preview iframe runs in a GPU sandbox that cannot create a WebGL
context — the console shows `unable to create webgl context`. This affects every
WebGL feature in this project (the site-wide galaxy background via `ogl`, and the
hero's React Three Fiber glass cube). WebGL works normally in a real/deployed
browser; it just never renders inside the preview iframe.

**Rule:** every WebGL/3D feature must ship a graceful non-WebGL fallback so the
preview (and any GL-less environment) still looks intentional and never blanks or
crashes.

**How to apply (pattern proven for the hero cube):**
- Feature-detect before mounting: `canvas.getContext('webgl2'|'webgl')` in a
  `useEffect`; render a CSS fallback when it returns null.
- Lazy-load the heavy 3D module (`React.lazy`) so its libs aren't bundled/parsed
  when the fallback is used, and wrap it in `Suspense` + an error boundary whose
  fallback is the same CSS version — that catches post-detection init failures.
- Build the CSS fallback to look premium on its own (e.g. CSS `preserve-3d` cube
  with a glowing core), since that is what every preview screenshot will show.

**Verifying visuals in preview:** the site plays a ~3s intro overlay
(`IntroAnimation`, `App.tsx` `showIntro` starts `true`) on every fresh load, so
screenshots keep catching the intro. To screenshot a section behind it,
temporarily flip `showIntro` to `false`, capture, then restore it.
