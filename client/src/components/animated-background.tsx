import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 72;
const MAX_DIST = 160;

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  pulse: number;
  color: number;
}

const COLORS = [
  "99,102,241",  // indigo
  "139,92,246",  // violet
  "59,130,246",  // blue
  "6,182,212",   // cyan
];

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    let particles: Particle[] = [];
    let w = 0, h = 0;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const init = () => {
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.38,
        vy: (Math.random() - 0.5) * 0.38,
        r: Math.random() * 1.6 + 0.6,
        pulse: Math.random() * Math.PI * 2,
        color: Math.floor(Math.random() * COLORS.length),
      }));
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      const t = performance.now() / 1000;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0)  { p.x = 0;  p.vx *= -1; }
        if (p.x > w)  { p.x = w;  p.vx *= -1; }
        if (p.y < 0)  { p.y = 0;  p.vy *= -1; }
        if (p.y > h)  { p.y = h;  p.vy *= -1; }
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.hypot(dx, dy);
          if (d < MAX_DIST) {
            const a = (1 - d / MAX_DIST) * 0.22;
            const g = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            );
            g.addColorStop(0, `rgba(${COLORS[particles[i].color]},${a})`);
            g.addColorStop(1, `rgba(${COLORS[particles[j].color]},${a})`);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = g;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        const breathe = 0.82 + 0.18 * Math.sin(t * 1.8 + p.pulse);
        const alpha   = 0.45 + 0.30 * Math.sin(t * 1.8 + p.pulse);
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * breathe * 4);
        glow.addColorStop(0,   `rgba(${COLORS[p.color]},${alpha})`);
        glow.addColorStop(0.4, `rgba(${COLORS[p.color]},${alpha * 0.4})`);
        glow.addColorStop(1,   `rgba(${COLORS[p.color]},0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * breathe * 4, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * breathe, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${COLORS[p.color]},${alpha + 0.2})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    resize();
    init();
    tick();

    const onResize = () => { resize(); init(); };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      {/* Aurora blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div className="aurora-blob aurora-blob-1" />
        <div className="aurora-blob aurora-blob-2" />
        <div className="aurora-blob aurora-blob-3" />
        <div className="aurora-blob aurora-blob-4" />
      </div>
      {/* Particle network */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 1, opacity: 0.55 }}
      />
    </>
  );
}
