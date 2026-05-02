export function CircuitBackground() {
  // ─── PERSPECTIVE GRID FLOOR (vanishing point at 960, 690) ────────────────
  const VP_X = 960, VP_Y = 690;
  const perspV = [-1100, -650, -350, -170, -75, 0, 75, 170, 350, 650, 1100].map(
    (off) => `M ${VP_X} ${VP_Y} L ${VP_X + off} 1090`
  );
  const perspH: { y: number; xL: number; xR: number }[] = [];
  for (let i = 1; i <= 8; i++) {
    const t = (i / 8) ** 2.2;
    const y = VP_Y + (1090 - VP_Y) * t;
    perspH.push({ y, xL: VP_X - 960 * t, xR: VP_X + 960 * t });
  }

  // ─── FAR LAYER — thin, many, low opacity ─────────────────────────────────
  const farTraces = [
    "M 0 75 L 290 75 L 310 95 L 650 95 L 670 75 L 1010 75 L 1030 95 L 1420 95 L 1440 75 L 1920 75",
    "M 0 235 L 175 235 L 195 255 L 510 255 L 530 235 L 910 235 L 930 255 L 1260 255 L 1280 235 L 1920 235",
    "M 0 455 L 345 455 L 365 475 L 730 475 L 750 455 L 1110 455 L 1130 475 L 1530 475 L 1550 455 L 1920 455",
    "M 0 675 L 215 675 L 235 695 L 630 695 L 650 675 L 990 675 L 1010 695 L 1370 695 L 1390 675 L 1920 675",
    "M 95 0 L 95 175 L 115 195 L 115 445 L 95 465 L 95 1080",
    "M 375 0 L 375 295 L 395 315 L 395 625 L 375 645 L 375 1080",
    "M 755 0 L 755 195 L 775 215 L 775 505 L 755 525 L 755 1080",
    "M 1165 0 L 1165 345 L 1185 365 L 1185 655 L 1165 675 L 1165 1080",
    "M 1605 0 L 1605 245 L 1585 265 L 1585 555 L 1605 575 L 1605 1080",
    "M 0 0 L 220 220 L 440 220 L 640 420",
    "M 1920 0 L 1700 200 L 1480 200 L 1280 400",
    "M 0 1080 L 260 820 L 500 820",
    "M 1920 1080 L 1660 820 L 1420 820",
  ];
  const farNodes: [number, number][] = [
    [95, 75], [375, 95], [670, 75], [1030, 95], [1440, 75],
    [195, 255], [530, 235], [930, 255], [1280, 235],
    [365, 475], [750, 455], [1130, 475], [1550, 455],
    [235, 695], [650, 675], [1010, 695], [1390, 675],
    [115, 195], [395, 315], [775, 215], [1185, 365], [1585, 265],
  ];

  // ─── MID LAYER — the original traces ────────────────────────────────────
  const midTraces = [
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
  const midNodes: [number, number][] = [
    [180, 140], [540, 360], [980, 580], [1340, 800], [1720, 160],
    [400, 160], [780, 140], [1200, 160], [260, 380], [660, 360],
    [1100, 380], [1540, 360], [480, 600], [900, 580], [1300, 600],
    [340, 800], [740, 820], [1200, 800], [1640, 820],
    [200, 300], [560, 240], [1000, 480], [1360, 340], [1700, 260],
  ];

  // ─── NEAR LAYER — thick, bright, prominent ──────────────────────────────
  const nearTraces = [
    "M 0 500 L 310 500 L 330 520 L 720 520 L 740 500 L 1160 500",
    "M 610 0 L 610 390 L 630 410 L 630 810 L 610 830 L 610 1080",
    "M 1210 0 L 1210 290 L 1230 310 L 1230 720 L 1210 740 L 1210 1080",
  ];
  const nearNodes: [number, number][] = [
    [330, 520], [720, 520], [630, 410], [630, 810], [1230, 310], [1230, 720],
  ];

  // ─── Hexagon helper ──────────────────────────────────────────────────────
  const hex = (cx: number, cy: number, r: number) => {
    const pts = Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i - Math.PI / 6;
      return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
    });
    return `M ${pts.join(" L ")} Z`;
  };

  // ─── ALL TRACES (for animateMotion paths) ────────────────────────────────
  const allTraces = [...farTraces, ...midTraces, ...nearTraces];

  // ─── PULSES ──────────────────────────────────────────────────────────────
  type Layer = "far" | "mid" | "near";
  const pulses: { i: number; color: string; dur: number; delay: number; r: number; layer: Layer }[] = [
    // Far pulses — small, faster
    { i: 0, color: "#06b6d4", dur: 5.2, delay: 0,   r: 2,   layer: "far" },
    { i: 1, color: "#22d3ee", dur: 6.4, delay: 1.1, r: 2,   layer: "far" },
    { i: 4, color: "#a78bfa", dur: 4.8, delay: 0.6, r: 2,   layer: "far" },
    { i: 6, color: "#06b6d4", dur: 7.1, delay: 2.3, r: 2,   layer: "far" },
    { i: 9, color: "#22d3ee", dur: 5.6, delay: 1.8, r: 2,   layer: "far" },
    // Mid pulses — standard
    { i: farTraces.length + 0, color: "#06b6d4", dur: 7,  delay: 0,   r: 3.5, layer: "mid" },
    { i: farTraces.length + 1, color: "#22d3ee", dur: 9,  delay: 1.5, r: 3.5, layer: "mid" },
    { i: farTraces.length + 2, color: "#a78bfa", dur: 8,  delay: 0.8, r: 3.5, layer: "mid" },
    { i: farTraces.length + 3, color: "#06b6d4", dur: 10, delay: 2.2, r: 3.5, layer: "mid" },
    { i: farTraces.length + 4, color: "#22d3ee", dur: 6,  delay: 0.4, r: 3.5, layer: "mid" },
    { i: farTraces.length + 5, color: "#a78bfa", dur: 8,  delay: 1.2, r: 3.5, layer: "mid" },
    { i: farTraces.length + 6, color: "#06b6d4", dur: 7,  delay: 0,   r: 3.5, layer: "mid" },
    // Near pulses — large, slow, blazing
    { i: farTraces.length + midTraces.length + 0, color: "#06b6d4", dur: 13, delay: 0,   r: 5.5, layer: "near" },
    { i: farTraces.length + midTraces.length + 1, color: "#a78bfa", dur: 15, delay: 3.5, r: 5.5, layer: "near" },
    { i: farTraces.length + midTraces.length + 2, color: "#22d3ee", dur: 12, delay: 7,   r: 5.5, layer: "near" },
  ];

  return (
    <svg
      className="fixed inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1920 1080"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      data-testid="bg-circuit"
    >
      <defs>
        {/* Glow filters — three intensities for depth */}
        <filter id="glow-far" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="glow-mid" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="5" result="b1" />
          <feMerge>
            <feMergeNode in="b1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="glow-near" x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="3"  result="b1" />
          <feGaussianBlur stdDeviation="10" result="b2" />
          <feGaussianBlur stdDeviation="20" result="b3" />
          <feMerge>
            <feMergeNode in="b3" />
            <feMergeNode in="b2" />
            <feMergeNode in="b1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="glow-ambient" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="55" result="b" />
        </filter>

        {/* Radial gradient for node halos */}
        <radialGradient id="node-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="node-halo-v" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ── AMBIENT DEPTH GLOWS ─────────────────────────────────────────── */}
      <g filter="url(#glow-ambient)" opacity="1">
        <circle cx="260"  cy="210"  r="220" fill="rgba(6,182,212,0.07)"  />
        <circle cx="1660" cy="380"  r="270" fill="rgba(139,92,246,0.07)" />
        <circle cx="960"  cy="820"  r="240" fill="rgba(34,211,238,0.06)" />
        <circle cx="80"   cy="780"  r="170" fill="rgba(139,92,246,0.05)" />
        <circle cx="1840" cy="860"  r="190" fill="rgba(6,182,212,0.05)"  />
        <circle cx="480"  cy="960"  r="160" fill="rgba(34,211,238,0.04)" />
        <circle cx="1440" cy="120"  r="180" fill="rgba(139,92,246,0.05)" />
      </g>

      {/* ── PERSPECTIVE GRID FLOOR ──────────────────────────────────────── */}
      <g stroke="#0891b2" fill="none" opacity="0.10">
        <g strokeWidth="0.5">
          {perspV.map((d, i) => <path key={i} d={d} />)}
        </g>
        <g strokeWidth="0.4">
          {perspH.map(({ y, xL, xR }, i) => (
            <line key={i} x1={xL} y1={y} x2={xR} y2={y} />
          ))}
        </g>
        {/* Vanishing-point glow */}
        <circle cx={VP_X} cy={VP_Y} r="6" fill="rgba(6,182,212,0.25)" stroke="none" />
        <circle cx={VP_X} cy={VP_Y} r="20" fill="url(#node-halo)" stroke="none" opacity="0.6" />
      </g>

      {/* ── FAR LAYER ───────────────────────────────────────────────────── */}
      <g stroke="#0891b2" strokeWidth="0.5" fill="none" opacity="0.14"
         strokeLinecap="round" strokeLinejoin="round">
        {farTraces.map((d, i) => <path key={i} d={d} />)}
      </g>
      <g fill="#0891b2" opacity="0.22">
        {farNodes.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.5" />)}
      </g>

      {/* ── MID LAYER ───────────────────────────────────────────────────── */}
      <g stroke="#0891b2" strokeWidth="1" fill="none" opacity="0.28"
         strokeLinecap="round" strokeLinejoin="round">
        {midTraces.map((d, i) => <path key={i} d={d} />)}
      </g>
      {/* Mid node halos */}
      <g opacity="0.18">
        {midNodes.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="14" fill="url(#node-halo)" />
        ))}
      </g>
      <g fill="#0891b2" opacity="0.48">
        {midNodes.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2.5" />)}
      </g>

      {/* ── NEAR LAYER ──────────────────────────────────────────────────── */}
      <g stroke="#06b6d4" strokeWidth="1.6" fill="none" opacity="0.45"
         strokeLinecap="round" filter="url(#glow-mid)">
        {nearTraces.map((d, i) => <path key={i} d={d} />)}
      </g>
      {/* Near node halos */}
      <g opacity="0.35">
        {nearNodes.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="22"
            fill={i % 2 === 0 ? "url(#node-halo)" : "url(#node-halo-v)"} />
        ))}
      </g>
      {/* Hexagonal near nodes */}
      <g filter="url(#glow-mid)" opacity="0.85">
        {nearNodes.map(([x, y], i) => (
          <path key={i} d={hex(x, y, 5)}
            fill={i % 2 === 0 ? "#06b6d4" : "#a78bfa"}
            stroke={i % 2 === 0 ? "#06b6d4" : "#a78bfa"}
            strokeWidth="0.6" />
        ))}
      </g>

      {/* ── ENERGY PULSES — FAR ─────────────────────────────────────────── */}
      <g filter="url(#glow-far)">
        {pulses.filter(p => p.layer === "far").map((p, i) => (
          <circle key={i} r={p.r} fill={p.color}>
            <animateMotion
              dur={`${p.dur}s`} begin={`${p.delay}s`}
              repeatCount="indefinite" path={allTraces[p.i]} rotate="auto"
            />
            <animate attributeName="opacity"
              values="0;0.55;0.55;0" keyTimes="0;0.06;0.94;1"
              dur={`${p.dur}s`} begin={`${p.delay}s`} repeatCount="indefinite"
            />
          </circle>
        ))}
      </g>

      {/* ── ENERGY PULSES — MID ─────────────────────────────────────────── */}
      <g filter="url(#glow-mid)">
        {pulses.filter(p => p.layer === "mid").map((p, i) => (
          <circle key={i} r={p.r} fill={p.color}>
            <animateMotion
              dur={`${p.dur}s`} begin={`${p.delay}s`}
              repeatCount="indefinite" path={allTraces[p.i]} rotate="auto"
            />
            <animate attributeName="opacity"
              values="0;1;1;0" keyTimes="0;0.05;0.95;1"
              dur={`${p.dur}s`} begin={`${p.delay}s`} repeatCount="indefinite"
            />
          </circle>
        ))}
      </g>

      {/* ── ENERGY PULSES — NEAR (with corona) ──────────────────────────── */}
      <g filter="url(#glow-near)">
        {pulses.filter(p => p.layer === "near").map((p, i) => (
          <g key={i}>
            {/* outer corona */}
            <circle r={p.r * 2.8} fill={p.color} opacity="0.18">
              <animateMotion
                dur={`${p.dur}s`} begin={`${p.delay}s`}
                repeatCount="indefinite" path={allTraces[p.i]} rotate="auto"
              />
              <animate attributeName="opacity"
                values="0;0.18;0.18;0" keyTimes="0;0.05;0.95;1"
                dur={`${p.dur}s`} begin={`${p.delay}s`} repeatCount="indefinite"
              />
            </circle>
            {/* core */}
            <circle r={p.r} fill={p.color}>
              <animateMotion
                dur={`${p.dur}s`} begin={`${p.delay}s`}
                repeatCount="indefinite" path={allTraces[p.i]} rotate="auto"
              />
              <animate attributeName="opacity"
                values="0;1;1;0" keyTimes="0;0.05;0.95;1"
                dur={`${p.dur}s`} begin={`${p.delay}s`} repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}
      </g>
    </svg>
  );
}
