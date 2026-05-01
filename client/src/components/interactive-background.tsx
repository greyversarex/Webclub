import { useEffect, useRef } from "react";

interface Square {
  x: number;
  y: number;
  size: number;
  angle: number;
  speed: number;
  rotSpeed: number;
  opacity: number;
  hue: number;
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

    const COUNT = 18;
    let squares: Square[] = [];

    const initSquares = () => {
      squares = Array.from({ length: COUNT }, () => makeSquare(true));
    };

    const makeSquare = (randomY = false): Square => ({
      x: Math.random() * width,
      y: randomY ? Math.random() * height : height + 100,
      size: 140 + Math.random() * 280,
      angle: (Math.random() * 40 - 20) * (Math.PI / 180),
      speed: 0.15 + Math.random() * 0.25,
      rotSpeed: (Math.random() - 0.5) * 0.0008,
      opacity: 0.05 + Math.random() * 0.10,
      hue: Math.random(),
    });

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
      initSquares();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, "#141416");
      grad.addColorStop(0.5, "#1c1c20");
      grad.addColorStop(1, "#111113");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      for (const sq of squares) {
        ctx.save();
        ctx.translate(sq.x, sq.y);
        ctx.rotate(sq.angle);

        const t = sq.x / width;
        const base = Math.round(90 + t * 60);
        const r = base;
        const g = base;
        const b = Math.round(base + 8);
        ctx.fillStyle = `rgba(${r},${g},${b},${sq.opacity})`;
        ctx.fillRect(-sq.size / 2, -sq.size / 2, sq.size, sq.size);

        ctx.strokeStyle = `rgba(${r + 40},${g + 30},${b + 40},${sq.opacity * 0.6})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(-sq.size / 2, -sq.size / 2, sq.size, sq.size);

        ctx.restore();

        sq.y -= sq.speed;
        sq.x += sq.speed * 0.3;
        sq.angle += sq.rotSpeed;

        if (sq.y < -sq.size) {
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
