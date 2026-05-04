import { useEffect, useRef } from "react";

const NEAR_TRACES = [
  "M 0 500 L 310 500 L 330 520 L 720 520 L 740 500 L 1160 500",
  "M 610 0 L 610 390 L 630 410 L 630 810 L 610 830 L 610 1080",
  "M 1210 0 L 1210 290 L 1230 310 L 1230 720 L 1210 740 L 1210 1080",
];

const PULSES = [
  { pathIdx: 0, color: "#06b6d4", speed: 160, phase: 0.00 },
  { pathIdx: 1, color: "#a78bfa", speed: 140, phase: 0.40 },
  { pathIdx: 2, color: "#22d3ee", speed: 150, phase: 0.70 },
  { pathIdx: 0, color: "#a78bfa", speed: 160, phase: 0.55 },
  { pathIdx: 1, color: "#22d3ee", speed: 140, phase: 0.85 },
  { pathIdx: 2, color: "#06b6d4", speed: 150, phase: 0.20 },
];

const TAIL_LEN = 90;

function getSvgToCanvas(cw: number, ch: number, vbW = 1920, vbH = 1080) {
  const scale = Math.max(cw / vbW, ch / vbH);
  const ox = (cw - vbW * scale) / 2;
  const oy = (ch - vbH * scale) / 2;
  return (x: number, y: number) => ({ x: x * scale + ox, y: y * scale + oy });
}

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

function drawSpark(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  angle: number, len: number,
  color: string, depth: number
) {
  if (depth <= 0 || len < 2) return;
  const ex = x + Math.cos(angle) * len;
  const ey = y + Math.sin(angle) * len;
  const mx = (x + ex) / 2 + (Math.random() - 0.5) * len * 0.6;
  const my = (y + ey) / 2 + (Math.random() - 0.5) * len * 0.6;

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.quadraticCurveTo(mx, my, ex, ey);
  ctx.strokeStyle = `rgba(${hexToRgb(color)},${0.6 * depth})`;
  ctx.lineWidth = depth * 0.8;
  ctx.stroke();

  if (Math.random() < 0.45) {
    drawSpark(ctx, mx, my, angle + (Math.random() - 0.5) * 1.4, len * 0.55, color, depth - 1);
  }
}

export function ElectricPulses() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgEl.setAttribute("viewBox", "0 0 1920 1080");
    Object.assign(svgEl.style, {
      position: "absolute", left: "-9999px",
      width: "1920px", height: "1080px", visibility: "hidden",
    });
    document.body.appendChild(svgEl);

    const pathEls = NEAR_TRACES.map((d) => {
      const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
      p.setAttribute("d", d);
      svgEl.appendChild(p);
      return p;
    });
    const pathLens = pathEls.map((p) => p.getTotalLength());

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const progresses = PULSES.map((p) => p.phase * pathLens[p.pathIdx]);
    const histories: { x: number; y: number }[][] = PULSES.map(() => []);
    const jitterSeeds = PULSES.map(() => Math.random() * 100);

    let lastTime = performance.now();
    let animId: number;

    const animate = (now: number) => {
      animId = requestAnimationFrame(animate);
      const dt = Math.min(now - lastTime, 50);
      lastTime = now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const toCanvas = getSvgToCanvas(canvas.width, canvas.height);

      PULSES.forEach((pulse, pi) => {
        const pathEl = pathEls[pulse.pathIdx];
        const len = pathLens[pulse.pathIdx];

        progresses[pi] = (progresses[pi] + pulse.speed * dt / 1000) % len;
        const svgPt = pathEl.getPointAtLength(progresses[pi]);
        const { x, y } = toCanvas(svgPt.x, svgPt.y);

        histories[pi].push({ x, y });
        if (histories[pi].length > TAIL_LEN) histories[pi].shift();

        const hist = histories[pi];
        if (hist.length < 4) return;

        if (Math.random() < 0.04) jitterSeeds[pi] = Math.random() * 100;
        const seed = jitterSeeds[pi];

        ctx.save();
        ctx.globalCompositeOperation = "lighter";

        // ── Outer halo glow (wide, very faint) ──────────────────────────
        for (let i = 2; i < hist.length; i++) {
          const t = i / hist.length;
          const a = t * t * 0.18;
          ctx.beginPath();
          ctx.moveTo(hist[i - 1].x, hist[i - 1].y);
          ctx.lineTo(hist[i].x, hist[i].y);
          ctx.strokeStyle = `rgba(${hexToRgb(pulse.color)},${a})`;
          ctx.lineWidth = t * 14;
          ctx.lineCap = "round";
          ctx.stroke();
        }

        // ── Electric jagged core ─────────────────────────────────────────
        for (let i = 2; i < hist.length; i++) {
          const t = i / hist.length;
          const a = Math.pow(t, 1.5) * 0.9;

          const dx = hist[i].x - hist[i - 2].x;
          const dy = hist[i].y - hist[i - 2].y;
          const segLen = Math.sqrt(dx * dx + dy * dy) || 1;
          const nx = -dy / segLen;
          const ny = dx / segLen;

          // Sinusoidal jitter that gives an electric/lightning look
          const jitterAmt = (1 - t) * 7 * Math.sin(i * 5.7 + seed);
          const mx = (hist[i - 1].x + hist[i].x) / 2 + nx * jitterAmt;
          const my = (hist[i - 1].y + hist[i].y) / 2 + ny * jitterAmt;

          ctx.beginPath();
          ctx.moveTo(hist[i - 1].x, hist[i - 1].y);
          ctx.quadraticCurveTo(mx, my, hist[i].x, hist[i].y);
          ctx.strokeStyle = `rgba(${hexToRgb(pulse.color)},${a})`;
          ctx.lineWidth = t * 3;
          ctx.lineCap = "round";
          ctx.stroke();
        }

        // ── Head corona ──────────────────────────────────────────────────
        const head = hist[hist.length - 1];
        const corona = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 28);
        corona.addColorStop(0,   `rgba(${hexToRgb(pulse.color)},0.9)`);
        corona.addColorStop(0.3, `rgba(${hexToRgb(pulse.color)},0.4)`);
        corona.addColorStop(1,   `rgba(${hexToRgb(pulse.color)},0)`);
        ctx.beginPath();
        ctx.arc(head.x, head.y, 28, 0, Math.PI * 2);
        ctx.fillStyle = corona;
        ctx.fill();

        // ── Head core (bright white-hot dot) ────────────────────────────
        ctx.shadowColor = pulse.color;
        ctx.shadowBlur = 18;
        ctx.beginPath();
        ctx.arc(head.x, head.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        ctx.shadowBlur = 0;

        // ── Random electric sparks shooting from head ────────────────────
        if (Math.random() < 0.25) {
          ctx.shadowColor = pulse.color;
          ctx.shadowBlur = 8;
          const sparkCount = 2 + Math.floor(Math.random() * 3);
          for (let s = 0; s < sparkCount; s++) {
            const angle = Math.random() * Math.PI * 2;
            const sparkLen = 10 + Math.random() * 20;
            drawSpark(ctx, head.x, head.y, angle, sparkLen, pulse.color, 2);
          }
          ctx.shadowBlur = 0;
        }

        ctx.restore();
      });
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      if (svgEl.parentNode) document.body.removeChild(svgEl);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 5 }}
      aria-hidden="true"
      data-testid="bg-electric-pulses"
    />
  );
}
