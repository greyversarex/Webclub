import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 65;
const MAX_DIST = 155;
// Single cool steel-blue color — no pink, no violet
const NODE_COLOR = "56,115,179";   // #3873b3 — steel blue
const LINE_COLOR = "56,115,179";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  pulse: number;
}

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
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        r: Math.random() * 1.4 + 0.7,
        pulse: Math.random() * Math.PI * 2,
      }));
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      const t = performance.now() / 1000;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) { p.x = 0; p.vx *= -1; }
        if (p.x > w) { p.x = w; p.vx *= -1; }
        if (p.y < 0) { p.y = 0; p.vy *= -1; }
        if (p.y > h) { p.y = h; p.vy *= -1; }
      }

      // Connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.hypot(dx, dy);
          if (d < MAX_DIST) {
            const a = (1 - d / MAX_DIST) * 0.18;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${LINE_COLOR},${a})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Nodes with soft glow
      for (const p of particles) {
        const breathe = 0.85 + 0.15 * Math.sin(t * 1.6 + p.pulse);
        const alpha   = 0.38 + 0.22 * Math.sin(t * 1.6 + p.pulse);

        // Outer glow
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * breathe * 5);
        glow.addColorStop(0,   `rgba(${NODE_COLOR},${alpha * 0.7})`);
        glow.addColorStop(0.5, `rgba(${NODE_COLOR},${alpha * 0.15})`);
        glow.addColorStop(1,   `rgba(${NODE_COLOR},0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * breathe * 5, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * breathe, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${NODE_COLOR},${alpha + 0.25})`;
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
      {/* Particle network canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 1, opacity: 0.6 }}
      />

      {/* Background outline typography */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden select-none"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      >
        <span
          style={{
            position: "absolute",
            top: "8%",
            right: "-4%",
            fontSize: "clamp(120px, 18vw, 280px)",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(30,58,138,0.07)",
            fontFamily: "inherit",
            userSelect: "none",
            whiteSpace: "nowrap",
            transform: "rotate(-8deg)",
          }}
        >
          DIGITAL
        </span>
        <span
          style={{
            position: "absolute",
            bottom: "22%",
            left: "-3%",
            fontSize: "clamp(100px, 16vw, 260px)",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(30,58,138,0.055)",
            fontFamily: "inherit",
            userSelect: "none",
            whiteSpace: "nowrap",
            transform: "rotate(6deg)",
          }}
        >
          SOLUTIONS
        </span>
      </div>

      {/* Grain / noise overlay */}
      <svg
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 2, opacity: 0.045, width: "100%", height: "100%" }}
        aria-hidden="true"
      >
        <filter id="grain-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.72"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-noise)" />
      </svg>
    </>
  );
}
