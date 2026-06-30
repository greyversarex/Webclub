import { useEffect, useRef, useState } from "react";

/**
 * Returns a ref and whether the referenced element is in (or near) the
 * viewport. Use it to pause expensive work — auto-play timers, animation
 * loops — while a component is scrolled off screen.
 *
 * Defaults to a 200px rootMargin so animations resume just before the
 * element actually becomes visible. Falls back to "always visible" when
 * IntersectionObserver is unavailable.
 */
export function useInView<T extends HTMLElement = HTMLElement>(
  options?: IntersectionObserverInit & { once?: boolean },
): [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const { once, ...observerInit } = options ?? {};
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && once) observer.disconnect();
      },
      { rootMargin: "200px", threshold: 0, ...observerInit },
    );

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, inView];
}
