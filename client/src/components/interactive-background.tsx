import { useEffect, useRef } from "react";

interface Square {
  x: number;
  y: number;
  size: number;
  angle: number;
  speed: number;
  rotSpeed: number;
  opacity: number;
}

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animId = 0;
    let squares: Square[] = [];

    const COUNT = 22;

    const makeSquare = (randomY = false): Square => ({
      x: Math.random() * width,
      y: randomY ? Math.random() * height : height + 200,
      size: 160 + Math.random() * 300,
      angle: (Math.random() * 50 - 25) * (Math.PI / 180),
      speed: 0.18 + Math.random() * 0.28,
      rotSpeed: (Math.random() - 0.5) * 0.0006,
      opacity: 0.07 + Math.random() * 0.13,
    });

    const initSquares = () => {
      squares = Array.from({ length: COUNT }, () => makeSquare(true));
    };

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
      initSquares();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Strong diagonal gradient: deep violet → indigo → dark teal
      const bg = ctx.createLinearGradient(0, 0, width, height);
      bg.addColorStop(0,    "#1a0533");
      bg.addColorStop(0.35, "#1e1040");
      bg.addColorStop(0.65, "#0d1f3c");
      bg.addColorStop(1,    "#041e22");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      // Radial "glow" blobs for depth
      const addGlow = (cx: number, cy: number, r: number, color: string) => {
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0, color);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, width, height);
      };
      addGlow(width * 0.15, height * 0.4, width * 0.45, "rgba(120,30,180,0.22)");
      addGlow(width * 0.85, height * 0.55, width * 0.42, "rgba(0,140,160,0.20)");
      addGlow(width * 0.5,  height * 0.2,  width * 0.35, "rgba(80,20,140,0.12)");

      // Floating squares — colour lerped across horizontal position
      for (const sq of squares) {
        const t = Math.max(0, Math.min(1, sq.x / width));

        // Left side: vivid purple-magenta  →  Right side: dark teal-cyan
        const r = Math.round(140 - t * 100);   // 140 → 40
        const g = Math.round(10  + t * 110);   // 10  → 120
        const b = Math.round(200 - t * 50);    // 200 → 150

        ctx.save();
        ctx.translate(sq.x, sq.y);
        ctx.rotate(sq.angle);

        ctx.fillStyle = `rgba(${r},${g},${b},${sq.opacity})`;
        ctx.fillRect(-sq.size / 2, -sq.size / 2, sq.size, sq.size);

        ctx.strokeStyle = `rgba(${Math.min(255, r + 60)},${Math.min(255, g + 50)},${Math.min(255, b + 30)},${sq.opacity * 0.7})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(-sq.size / 2, -sq.size / 2, sq.size, sq.size);

        ctx.restore();

        sq.y -= sq.speed;
        sq.x += sq.speed * 0.25;
        sq.angle += sq.rotSpeed;

        if (sq.y < -sq.size - 50) {
          Object.assign(sq, makeSquare(false));
        }
      }
    };

    const loop = () => {
      draw();
      animId = requestAnimationFrame(loop);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    loop();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
      data-testid="interactive-background"
    />
  );
}
