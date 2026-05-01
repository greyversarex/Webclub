import { useEffect, useRef } from "react";

interface Square {
  x: number;
  y: number;
  size: number;
  angle: number;
  speed: number;
  rotSpeed: number;
  opacity: number;
  colorIndex: number;
}

const NEON_COLORS = [
  { r: 124, g: 58,  b: 237 },
  { r: 6,   g: 182, b: 212 },
  { r: 236, g: 72,  b: 153 },
  { r: 16,  g: 185, b: 129 },
  { r: 59,  g: 130, b: 246 },
  { r: 251, g: 146, b: 60  },
];

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
    const COUNT = 16;

    const makeSquare = (randomY = false): Square => ({
      x: Math.random() * width,
      y: randomY ? Math.random() * height : height + 200,
      size: 120 + Math.random() * 260,
      angle: (Math.random() * 50 - 25) * (Math.PI / 180),
      speed: 0.18 + Math.random() * 0.28,
      rotSpeed: (Math.random() - 0.5) * 0.001,
      opacity: 0.12 + Math.random() * 0.18,
      colorIndex: Math.floor(Math.random() * NEON_COLORS.length),
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

      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, "#f8f9ff");
      grad.addColorStop(0.5, "#f3f4f8");
      grad.addColorStop(1, "#eef0f8");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      for (const sq of squares) {
        const col = NEON_COLORS[sq.colorIndex];
        const { r, g, b } = col;

        ctx.save();
        ctx.translate(sq.x, sq.y);
        ctx.rotate(sq.angle);

        ctx.shadowColor = `rgba(${r},${g},${b},0.7)`;
        ctx.shadowBlur = 24;
        ctx.fillStyle = `rgba(${r},${g},${b},${sq.opacity * 0.25})`;
        ctx.fillRect(-sq.size / 2, -sq.size / 2, sq.size, sq.size);

        ctx.shadowBlur = 16;
        ctx.strokeStyle = `rgba(${r},${g},${b},${sq.opacity * 1.4})`;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(-sq.size / 2, -sq.size / 2, sq.size, sq.size);

        ctx.restore();

        sq.y -= sq.speed;
        sq.x += sq.speed * 0.25;
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
