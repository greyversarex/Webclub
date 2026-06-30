---
name: Cloudflare cruft in exported HTML
description: HTML saved/exported from Cloudflare-fronted sites carries an injected challenge-platform snippet that must be stripped when self-hosting.
---

# Cloudflare cruft in exported / "save-as" HTML

When a user provides standalone HTML files that were saved or exported from a live
site sitting behind Cloudflare, each file usually contains an injected snippet near
`</body>`:

```
<script>(function(){...window.__CF$cv$params...a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js'...})();</script>
```

It builds a hidden 1x1 iframe and loads `/cdn-cgi/challenge-platform/...`.

**Why it matters:** on any origin that is NOT the original Cloudflare-fronted one,
that path 404s and the hidden iframe is pure noise. Strip it before serving the
files yourself.

**How to apply:** grep the batch for `cdn-cgi` / `challenge-platform`; remove the
single-line IIFE with e.g.
`perl -0777 -i -pe "s/<script>\(function\(\)\{function c\(\).*?\}\)\(\);<\/script>//s"`.
Also expect external `images.unsplash.com` URLs in such files — those are legitimate
content images, leave them.

**Embedding such files:** when showing them as live previews via `<iframe>`, use
`sandbox="allow-scripts"` (NO `allow-same-origin`) so their scripts run in an opaque
origin and can't touch the parent app's storage/cookies. For performance on a page
that also runs a WebGL background, lazy-mount the iframe via IntersectionObserver and
unmount it once scrolled offscreen; disable iframes entirely on mobile.
