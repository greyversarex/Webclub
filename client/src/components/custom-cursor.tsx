import { useState, useEffect } from "react";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [ring, setRing] = useState({ x: -200, y: -200 });
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    let rafId: number;
    let target = { x: -200, y: -200 };

    const onMove = (e: MouseEvent) => {
      target = { x: e.clientX, y: e.clientY };
      setPos({ x: e.clientX, y: e.clientY });

      const el = e.target as Element;
      setHovered(!!el.closest("a, button, [role=button], input, textarea, select"));
    };

    // Smooth ring follows with slight lag via lerp
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    let cur = { x: -200, y: -200 };
    const animate = () => {
      cur.x = lerp(cur.x, target.x, 0.12);
      cur.y = lerp(cur.y, target.y, 0.12);
      setRing({ x: Math.round(cur.x * 10) / 10, y: Math.round(cur.y * 10) / 10 });
      rafId = requestAnimationFrame(animate);
    };

    const onDown = () => setClicked(true);
    const onUp   = () => setClicked(false);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const ringSize = hovered ? 52 : clicked ? 24 : 36;

  return (
    <>
      {/* Lagging outer ring */}
      <div
        style={{
          position: "fixed",
          left: ring.x,
          top: ring.y,
          width: ringSize,
          height: ringSize,
          borderRadius: "50%",
          border: `1.5px solid rgba(56,115,179,${hovered ? 0.75 : 0.5})`,
          transform: "translate(-50%, -50%)",
          transition: "width 0.22s cubic-bezier(0.22,1,0.36,1), height 0.22s cubic-bezier(0.22,1,0.36,1), border-color 0.2s",
          pointerEvents: "none",
          zIndex: 99999,
          mixBlendMode: "multiply",
        }}
      />
      {/* Instant inner dot */}
      <div
        style={{
          position: "fixed",
          left: pos.x,
          top: pos.y,
          width: clicked ? 3 : 5,
          height: clicked ? 3 : 5,
          borderRadius: "50%",
          background: "rgba(56,115,179,0.9)",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 99999,
          transition: "width 0.12s, height 0.12s",
        }}
      />
    </>
  );
}
