import { useEffect, useRef } from "react";

// ─── ALL TRACE PATHS (mirrored from circuit-background.tsx) ──────────────────

const FAR_TRACES = [
  "M 0 75 L 290 75 L 310 95 L 650 95 L 670 75 L 1010 75 L 1030 95 L 1420 95 L 1440 75 L 1920 75",
  "M 0 235 L 175 235 L 195 255 L 510 255 L 530 235 L 910 235 L 930 255 L 1260 255 L 1280 235 L 1920 235",
  "M 0 455 L 345 455 L 365 475 L 730 475 L 750 455 L 1110 455 L 1130 475 L 1530 475 L 1550 455 L 1920 455",
  "M 0 675 L 215 675 L 235 695 L 630 695 L 650 675 L 990 675 L 1010 695 L 1370 695 L 1390 675 L 1920 675",
  "M 95 0 L 95 175 L 115 195 L 115 445 L 95 465 L 95 1080",
  "M 375 0 L 375 295 L 395 315 L 395 625 L 375 645 L 375 1080",
  "M 755 0 L 755 195 L 775 215 L 775 505 L 755 525 L 755 1080",
  "M 1165 0 L 1165 345 L 1185 365 L 1185 655 L 1165 675 L 1165 1080",
  "M 1605 0 L 1605 245 L 1585 265 L 1585 555 L 1605 575 L 1605 1080",
];

const FAR_NODES: [number, number][] = [
  [95, 75], [375, 95], [670, 75], [1030, 95], [1440, 75],
  [195, 255], [530, 235], [930, 255], [1280, 235],
  [365, 475], [750, 455], [1130, 475], [1550, 455],
  [235, 695], [650, 675], [1010, 695], [1390, 675],
  [115, 195], [395, 315], [775, 215], [1185, 365], [1585, 265],
];

const MID_TRACES = [
  "M 0 140 L 380 140 L 400 160 L 760 160 L 780 140 L 1180 140 L 1200 160 L 1920 160",
  "M 0 360 L 240 360 L 260 380 L 640 380 L 660 360 L 1080 360 L 1100 380 L 1520 380 L 1540 360 L 1920 360",
  "M 0 580 L 460 580 L 480 600 L 880 600 L 900 580 L 1280 580 L 1300 600 L 1920 600",
  "M 0 820 L 320 820 L 340 800 L 720 800 L 740 820 L 1180 820 L 1200 800 L 1620 800 L 1640 820 L 1920 820",
  "M 180 0 L 180 280 L 200 300 L 200 700 L 180 720 L 180 1080",
  "M 540 0 L 540 220 L 560 240 L 560 540 L 540 560 L 540 920 L 560 940 L 560 1080",
  "M 980 0 L 980 460 L 1000 480 L 1000 760 L 980 780 L 980 1080",
  "M 1340 0 L 1340 320 L 1360 340 L 1360 660 L 1340 680 L 1340 1080",
  "M 1720 0 L 1720 240 L 1700 260 L 1700 580 L 1720 600 L 1720 1080",
];

const MID_NODES: [number, number][] = [
  [180, 140], [540, 360], [980, 580], [1340, 800], [1720, 160],
  [400, 160], [780, 140], [1200, 160], [260, 380], [660, 360],
  [1100, 380], [1540, 360], [480, 600], [900, 580], [1300, 600],
  [340, 800], [740, 820], [1200, 800], [1640, 820],
  [200, 300], [560, 240], [1000, 480], [1360, 340], [1700, 260],
];

const NEAR_TRACES = [
  "M 0 500 L 310 500 L 330 520 L 720 520 L 740 500 L 1160 500",
  "M 610 0 L 610 390 L 630 410 L 630 810 L 610 830 L 610 1080",
  "M 1210 0 L 1210 290 L 1230 310 L 1230 720 L 1210 740 L 1210 1080",
];

const NEAR_NODES: [number, number][] = [
  [330, 520], [720, 520], [630, 410], [630, 810], [1230, 310], [1230, 720],
];

// ─── PATH PARSER ─────────────────────────────────────────────────────────────

function parsePath(d: string): { x: number; y: number }[] {
  const pts: { x: number; y: number }[] = [];
  const tokens = d.trim().split(/[\s,]+/);
  let i = 0;
  while (i < tokens.length) {
    const t = tokens[i];
    if (t === "M" || t === "L") {
      i++;
      const x = parseFloat(tokens[i++]);
      const y = parseFloat(tokens[i++]);
      pts.push({ x, y });
    } else {
      i++;
    }
  }
  return pts;
}

// ─── GEOMETRY HELPERS ─────────────────────────────────────────────────────────

function distToSegmentSq(
  px: number, py: number,
  ax: number, ay: number,
  bx: number, by: number
): number {
  const dx = bx - ax, dy = by - ay;
  const len2 = dx * dx + dy * dy;
  if (len2 === 0) return (px - ax) ** 2 + (py - ay) ** 2;
  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / len2));
  const cx = ax + t * dx - px;
  const cy = ay + t * dy - py;
  return cx * cx + cy * cy;
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export function CursorIllumination() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    // Mouse tracking
    const rawMouse = { x: -9999, y: -9999, active: false };
    const smoothMouse = { x: -9999, y: -9999 };

    const onMove = (e: MouseEvent) => {
      rawMouse.x = e.clientX;
      rawMouse.y = e.clientY;
      rawMouse.active = true;
    };
    const onLeave = () => { rawMouse.active = false; };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Pre-parse traces
    const farParsed = FAR_TRACES.map(parsePath);
    const midParsed = MID_TRACES.map(parsePath);
    const nearParsed = NEAR_TRACES.map(parsePath);

    const INFLUENCE = 320; // screen-space pixels radius
    const INFLUENCE_SQ = INFLUENCE * INFLUENCE;
    const LERP = 0.09;

    let animId: number;

    // Hex node helper
    const hexPath = (cx: number, cy: number, r: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i - Math.PI / 6;
        const x = cx + r * Math.cos(a);
        const y = cy + r * Math.sin(a);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
    };

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Smooth mouse
      const lerp = rawMouse.active ? LERP : 0.03;
      smoothMouse.x += (rawMouse.x - smoothMouse.x) * lerp;
      smoothMouse.y += (rawMouse.y - smoothMouse.y) * lerp;

      // Get CTM from the circuit SVG to transform 1920×1080 coords → screen coords
      const circuitSvg = document.querySelector(
        '[data-testid="bg-circuit"]'
      ) as SVGSVGElement | null;
      const ctm = circuitSvg?.getScreenCTM();
      if (!ctm) return;

      // Transform SVG user coord → screen pixel
      const toScreen = (x: number, y: number) => ({
        x: ctm.a * x + ctm.e,
        y: ctm.d * y + ctm.f,
      });

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";

      const mx = smoothMouse.x;
      const my = smoothMouse.y;

      // ── Draw a single group of traces ──────────────────────────────────────
      const drawGroup = (
        parsedTraces: { x: number; y: number }[][],
        nodes: [number, number][],
        baseW: number,
        nodeR: number,
        isHex: boolean
      ) => {
        for (const pts of parsedTraces) {
          const sp = pts.map((p) => toScreen(p.x, p.y));

          for (let i = 0; i < sp.length - 1; i++) {
            const a = sp[i], b = sp[i + 1];
            const dSq = distToSegmentSq(mx, my, a.x, a.y, b.x, b.y);
            if (dSq > INFLUENCE_SQ) continue;

            const d = Math.sqrt(dSq);
            const t = Math.pow(1 - d / INFLUENCE, 1.4); // sharper falloff

            ctx.lineCap = "round";

            // Outer soft halo
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(6,182,212,${t * 0.12})`;
            ctx.lineWidth = baseW + t * 20;
            ctx.stroke();

            // Inner medium glow
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(6,182,212,${t * 0.35})`;
            ctx.lineWidth = baseW + t * 5;
            ctx.stroke();

            // Bright core
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(180,240,255,${t * 0.85})`;
            ctx.lineWidth = baseW * 0.6;
            ctx.stroke();
          }
        }

        // Nodes
        for (const [nx, ny] of nodes) {
          const sp = toScreen(nx, ny);
          const dSq = (sp.x - mx) ** 2 + (sp.y - my) ** 2;
          if (dSq > INFLUENCE_SQ * 1.5) continue;
          const d = Math.sqrt(dSq);
          const t = Math.pow(Math.max(0, 1 - d / (INFLUENCE * 1.2)), 1.2);

          // Halo glow
          const grad = ctx.createRadialGradient(sp.x, sp.y, 0, sp.x, sp.y, nodeR * 5);
          grad.addColorStop(0, `rgba(6,182,212,${t * 0.5})`);
          grad.addColorStop(1, `rgba(6,182,212,0)`);
          ctx.beginPath();
          ctx.arc(sp.x, sp.y, nodeR * 5, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();

          // Node core
          ctx.globalAlpha = Math.min(1, t * 1.2);
          if (isHex) {
            hexPath(sp.x, sp.y, nodeR);
            ctx.fillStyle = `rgba(180,240,255,${t})`;
            ctx.fill();
            ctx.strokeStyle = `rgba(6,182,212,${t})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          } else {
            ctx.beginPath();
            ctx.arc(sp.x, sp.y, nodeR, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(180,240,255,${t})`;
            ctx.fill();
          }
          ctx.globalAlpha = 1;
        }
      };

      drawGroup(farParsed,  FAR_NODES,  0.8, 2,   false);
      drawGroup(midParsed,  MID_NODES,  1.5, 3.5, false);
      drawGroup(nearParsed, NEAR_NODES, 2.5, 5,   true);

      ctx.globalCompositeOperation = "source-over";
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 6 }}
      aria-hidden="true"
      data-testid="bg-cursor-illumination"
    />
  );
}
