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

export function ElectricPulses() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    // Hidden SVG for path measurement only
    const svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgEl.setAttribute("viewBox", "0 0 1920 1080");
    Object.assign(svgEl.style, {
      position: "absolute",
      left: "-9999px",
      width: "1920px",
      height: "1080px",
      visibility: "hidden",
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

    // Initialise progress along path (in SVG units)
    const progresses = PULSES.map((p) => p.phase * pathLens[p.pathIdx]);
    // Position history in SCREEN coords
    const histories: { x: number; y: number }[][] = PULSES.map(() => []);

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

        // Advance position
        progresses[pi] = (progresses[pi] + pulse.speed * dt / 1000) % len;
        const svgPt = pathEl.getPointAtLength(progresses[pi]);
        const { x, y } = toCanvas(svgPt.x, svgPt.y);

        // Record exact screen position — NO jitter here so tail stays on the line
        histories[pi].push({ x, y });
        if (histories[pi].length > TAIL_LEN) histories[pi].shift();

        const hist = histories[pi];
        if (hist.length < 3) return;

        const rgb = hexToRgb(pulse.color);

        ctx.save();
        ctx.globalCompositeOperation = "lighter";

        // ── Wide outer glow (halo) ────────────────────────────────────────
        ctx.lineCap = "round";
        for (let i = 1; i < hist.length; i++) {
          const t = i / hist.length;
          const a = t * t * 0.15;
          ctx.beginPath();
          ctx.moveTo(hist[i - 1].x, hist[i - 1].y);
          ctx.lineTo(hist[i].x, hist[i].y);
          ctx.strokeStyle = `rgba(${rgb},${a})`;
          ctx.lineWidth = t * 16;
          ctx.stroke();
        }

        // ── Core bright line — follows path exactly ───────────────────────
        for (let i = 1; i < hist.length; i++) {
          const t = i / hist.length;
          const a = Math.pow(t, 1.4) * 0.95;
          ctx.beginPath();
          ctx.moveTo(hist[i - 1].x, hist[i - 1].y);
          ctx.lineTo(hist[i].x, hist[i].y);
          ctx.strokeStyle = `rgba(${rgb},${a})`;
          ctx.lineWidth = t * 3;
          ctx.stroke();
        }

        // ── Head corona ───────────────────────────────────────────────────
        const head = hist[hist.length - 1];
        const corona = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 30);
        corona.addColorStop(0,   `rgba(${rgb},0.85)`);
        corona.addColorStop(0.35, `rgba(${rgb},0.35)`);
        corona.addColorStop(1,   `rgba(${rgb},0)`);
        ctx.beginPath();
        ctx.arc(head.x, head.y, 30, 0, Math.PI * 2);
        ctx.fillStyle = corona;
        ctx.fill();

        // ── Head core dot (white-hot) ─────────────────────────────────────
        ctx.shadowColor = pulse.color;
        ctx.shadowBlur = 16;
        ctx.beginPath();
        ctx.arc(head.x, head.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        ctx.shadowBlur = 0;

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
