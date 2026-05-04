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

    // Hidden SVG used ONLY for getTotalLength / getPointAtLength
    const measureSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    measureSvg.setAttribute("viewBox", "0 0 1920 1080");
    Object.assign(measureSvg.style, {
      position: "absolute",
      left: "-9999px",
      width: "1920px",
      height: "1080px",
      visibility: "hidden",
    });
    document.body.appendChild(measureSvg);

    const pathEls = NEAR_TRACES.map((d) => {
      const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
      p.setAttribute("d", d);
      measureSvg.appendChild(p);
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

    let lastTime = performance.now();
    let animId: number;

    const animate = (now: number) => {
      animId = requestAnimationFrame(animate);
      const dt = Math.min(now - lastTime, 50);
      lastTime = now;

      // Ask the real circuit SVG for its current transform matrix.
      // getScreenCTM() converts SVG user coords → CSS pixels exactly as rendered.
      const circuitSvg = document.querySelector(
        '[data-testid="bg-circuit"]'
      ) as SVGSVGElement | null;
      const ctm = circuitSvg?.getScreenCTM();
      if (!ctm) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      PULSES.forEach((pulse, pi) => {
        const pathEl = pathEls[pulse.pathIdx];
        const len = pathLens[pulse.pathIdx];

        const rawProgress = progresses[pi] + (pulse.speed * dt) / 1000;
        const wrapped = rawProgress >= len;
        progresses[pi] = rawProgress % len;
        // Clear tail on wrap-around so the history doesn't jump across the screen
        if (wrapped) { histories[pi] = []; return; }
        const rawPt = pathEl.getPointAtLength(progresses[pi]);

        // Convert SVG user coords → screen CSS pixels via the SVG's own CTM
        const svgPt = measureSvg.createSVGPoint();
        svgPt.x = rawPt.x;
        svgPt.y = rawPt.y;
        const { x, y } = svgPt.matrixTransform(ctm);

        histories[pi].push({ x, y });
        if (histories[pi].length > TAIL_LEN) histories[pi].shift();

        const hist = histories[pi];
        if (hist.length < 3) return;

        const rgb = hexToRgb(pulse.color);

        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.lineCap = "round";

        // ── Wide outer glow halo ──────────────────────────────────────────
        for (let i = 1; i < hist.length; i++) {
          const t = i / hist.length;
          ctx.beginPath();
          ctx.moveTo(hist[i - 1].x, hist[i - 1].y);
          ctx.lineTo(hist[i].x, hist[i].y);
          ctx.strokeStyle = `rgba(${rgb},${t * t * 0.14})`;
          ctx.lineWidth = t * 16;
          ctx.stroke();
        }

        // ── Core bright line ──────────────────────────────────────────────
        for (let i = 1; i < hist.length; i++) {
          const t = i / hist.length;
          ctx.beginPath();
          ctx.moveTo(hist[i - 1].x, hist[i - 1].y);
          ctx.lineTo(hist[i].x, hist[i].y);
          ctx.strokeStyle = `rgba(${rgb},${Math.pow(t, 1.4) * 0.95})`;
          ctx.lineWidth = t * 3;
          ctx.stroke();
        }

        // ── Head corona ───────────────────────────────────────────────────
        const head = hist[hist.length - 1];
        const corona = ctx.createRadialGradient(
          head.x, head.y, 0,
          head.x, head.y, 28
        );
        corona.addColorStop(0,    `rgba(${rgb},0.85)`);
        corona.addColorStop(0.35, `rgba(${rgb},0.35)`);
        corona.addColorStop(1,    `rgba(${rgb},0)`);
        ctx.beginPath();
        ctx.arc(head.x, head.y, 28, 0, Math.PI * 2);
        ctx.fillStyle = corona;
        ctx.fill();

        // ── White-hot core dot ────────────────────────────────────────────
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
      if (measureSvg.parentNode) document.body.removeChild(measureSvg);
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
