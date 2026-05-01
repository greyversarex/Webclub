const TRACES = [
  // Horizontal bus lines with bends
  "M 0 140 L 380 140 L 400 160 L 760 160 L 780 140 L 1180 140 L 1200 160 L 1920 160",
  "M 0 360 L 240 360 L 260 380 L 640 380 L 660 360 L 1080 360 L 1100 380 L 1520 380 L 1540 360 L 1920 360",
  "M 0 580 L 460 580 L 480 600 L 880 600 L 900 580 L 1280 580 L 1300 600 L 1920 600",
  "M 0 820 L 320 820 L 340 800 L 720 800 L 740 820 L 1180 820 L 1200 800 L 1620 800 L 1640 820 L 1920 820",
  // Vertical traces
  "M 180 0 L 180 280 L 200 300 L 200 700 L 180 720 L 180 1080",
  "M 540 0 L 540 220 L 560 240 L 560 540 L 540 560 L 540 920 L 560 940 L 560 1080",
  "M 980 0 L 980 460 L 1000 480 L 1000 760 L 980 780 L 980 1080",
  "M 1340 0 L 1340 320 L 1360 340 L 1360 660 L 1340 680 L 1340 1080",
  "M 1720 0 L 1720 240 L 1700 260 L 1700 580 L 1720 600 L 1720 1080",
  // Diagonal "shortcut" traces (45°)
  "M 0 980 L 240 980 L 380 840 L 540 840 L 660 720 L 980 720",
  "M 1920 980 L 1680 980 L 1540 840 L 1380 840 L 1260 720 L 940 720",
  "M 0 60 L 200 60 L 320 180 L 540 180",
  "M 1920 60 L 1720 60 L 1600 180 L 1380 180",
  // Branch traces between chips
  "M 460 280 L 460 360",
  "M 1460 480 L 1460 580",
  "M 760 720 L 760 800",
];

const NODES = [
  [180, 140], [540, 360], [980, 580], [1340, 800], [1720, 160],
  [400, 160], [780, 140], [1200, 160], [260, 380], [660, 360],
  [1100, 380], [1540, 360], [480, 600], [900, 580], [1300, 600],
  [340, 800], [740, 820], [1200, 800], [1640, 820],
  [200, 300], [560, 240], [1000, 480], [1360, 340], [1700, 260],
  [320, 180], [1600, 180], [380, 840], [1540, 840], [660, 720], [1260, 720],
];

// Some nodes will throb in sync with energy passing them
const PULSING_NODE_INDICES = [0, 1, 2, 3, 4, 6, 9, 13, 16, 22];

const PULSES = [
  { i: 0,  c: "#06b6d4", dur: 7,  delay: 0,   trail: true  },
  { i: 1,  c: "#22d3ee", dur: 9,  delay: 1.5, trail: true  },
  { i: 2,  c: "#a78bfa", dur: 8,  delay: 0.8, trail: true  },
  { i: 3,  c: "#06b6d4", dur: 10, delay: 2.2, trail: true  },
  { i: 4,  c: "#22d3ee", dur: 6,  delay: 0.4, trail: false },
  { i: 5,  c: "#a78bfa", dur: 8,  delay: 1.2, trail: true  },
  { i: 6,  c: "#06b6d4", dur: 7,  delay: 0,   trail: false },
  { i: 7,  c: "#22d3ee", dur: 9,  delay: 2.0, trail: true  },
  { i: 8,  c: "#ec4899", dur: 8,  delay: 0.6, trail: true  },
  { i: 9,  c: "#a78bfa", dur: 9,  delay: 0.5, trail: true  },
  { i: 10, c: "#22d3ee", dur: 8,  delay: 1.8, trail: true  },
  { i: 11, c: "#06b6d4", dur: 5,  delay: 1.0, trail: false },
  { i: 12, c: "#ec4899", dur: 5,  delay: 2.5, trail: false },
  { i: 1,  c: "#06b6d4", dur: 11, delay: 5.5, trail: true  },
  { i: 3,  c: "#22d3ee", dur: 9,  delay: 4.5, trail: true  },
  { i: 6,  c: "#a78bfa", dur: 10, delay: 3.5, trail: true  },
];

interface ChipProps {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  color: string;
}

function Chip({ x, y, w, h, label, color }: ChipProps) {
  const pinSpacing = 14;
  const pinsPerSide = Math.floor((h - 16) / pinSpacing);
  const horizPinsPerSide = Math.floor((w - 16) / pinSpacing);
  const startY = y + (h - (pinsPerSide - 1) * pinSpacing) / 2;
  const startX = x + (w - (horizPinsPerSide - 1) * pinSpacing) / 2;

  return (
    <g opacity="0.55">
      {/* Pins */}
      <g stroke={color} strokeWidth="1" opacity="0.6">
        {Array.from({ length: pinsPerSide }).map((_, i) => (
          <line key={`l${i}`} x1={x - 8} y1={startY + i * pinSpacing} x2={x} y2={startY + i * pinSpacing} />
        ))}
        {Array.from({ length: pinsPerSide }).map((_, i) => (
          <line key={`r${i}`} x1={x + w} y1={startY + i * pinSpacing} x2={x + w + 8} y2={startY + i * pinSpacing} />
        ))}
        {Array.from({ length: horizPinsPerSide }).map((_, i) => (
          <line key={`t${i}`} x1={startX + i * pinSpacing} y1={y - 8} x2={startX + i * pinSpacing} y2={y} />
        ))}
        {Array.from({ length: horizPinsPerSide }).map((_, i) => (
          <line key={`b${i}`} x1={startX + i * pinSpacing} y1={y + h} x2={startX + i * pinSpacing} y2={y + h + 8} />
        ))}
      </g>
      {/* Body */}
      <rect x={x} y={y} width={w} height={h} rx="3" fill="#0c1628" stroke={color} strokeWidth="1.5" opacity="0.9" />
      {/* Inner dot grid (chip die pattern) */}
      <g fill={color} opacity="0.35">
        {Array.from({ length: Math.floor((w - 20) / 8) }).map((_, ix) =>
          Array.from({ length: Math.floor((h - 20) / 8) }).map((_, iy) => (
            <circle key={`${ix}-${iy}`} cx={x + 12 + ix * 8} cy={y + 12 + iy * 8} r="0.7" />
          ))
        )}
      </g>
      {/* Soft inner glow pulse */}
      <rect x={x + 4} y={y + 4} width={w - 8} height={h - 8} rx="2" fill={color} opacity="0">
        <animate attributeName="opacity" values="0;0.15;0" dur="3s" repeatCount="indefinite" />
      </rect>
      {/* Label */}
      <text
        x={x + w / 2}
        y={y + h / 2 + 4}
        textAnchor="middle"
        fontSize="11"
        fontFamily="monospace"
        fill={color}
        opacity="0.9"
        letterSpacing="2"
      >
        {label}
      </text>
    </g>
  );
}

export function CircuitBackground() {
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
        <filter id="circuit-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="strong-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Faint dot grid backdrop */}
        <pattern id="dot-grid" width="36" height="36" patternUnits="userSpaceOnUse">
          <circle cx="18" cy="18" r="0.7" fill="#0891b2" opacity="0.35" />
        </pattern>

        {/* Comet-trail gradients (one per pulse colour) */}
        <linearGradient id="trail-cyan" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="trail-sky" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="trail-violet" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#a78bfa" stopOpacity="0" />
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="trail-pink" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ec4899" stopOpacity="0" />
          <stop offset="100%" stopColor="#ec4899" stopOpacity="0.95" />
        </linearGradient>

        {/* Corner radial glows */}
        <radialGradient id="glow-tl" cx="0%" cy="0%" r="60%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="glow-br" cx="100%" cy="100%" r="60%">
          <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
        </radialGradient>

        {/* Reusable trace path defs (so chips/labels can reference) */}
        {TRACES.map((d, i) => (
          <path key={i} id={`trace-${i}`} d={d} />
        ))}
      </defs>

      {/* Backdrop layers */}
      <rect width="100%" height="100%" fill="url(#dot-grid)" />
      <rect width="100%" height="100%" fill="url(#glow-tl)" />
      <rect width="100%" height="100%" fill="url(#glow-br)" />

      {/* Slowly rotating concentric rings — like a holographic dial */}
      <g opacity="0.18" fill="none" stroke="#22d3ee">
        <circle cx="960" cy="540" r="380" strokeDasharray="3 14" strokeWidth="1">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 960 540"
            to="360 960 540"
            dur="80s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="960" cy="540" r="260" strokeDasharray="2 10" strokeWidth="0.8">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="360 960 540"
            to="0 960 540"
            dur="55s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="960" cy="540" r="140" strokeDasharray="1 8" strokeWidth="0.7">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 960 540"
            to="360 960 540"
            dur="35s"
            repeatCount="indefinite"
          />
        </circle>
      </g>

      {/* Static circuit traces */}
      <g
        stroke="#0891b2"
        strokeWidth="1"
        fill="none"
        opacity="0.32"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {TRACES.map((_, i) => (
          <use key={i} href={`#trace-${i}`} />
        ))}
      </g>

      {/* Dashed flowing data streams on a few key buses */}
      <g fill="none" strokeWidth="1.4" opacity="0.55">
        <use href="#trace-1" stroke="#06b6d4" strokeDasharray="6 18">
          <animate attributeName="stroke-dashoffset" from="0" to="-240" dur="6s" repeatCount="indefinite" />
        </use>
        <use href="#trace-3" stroke="#a78bfa" strokeDasharray="4 22">
          <animate attributeName="stroke-dashoffset" from="0" to="-260" dur="7s" repeatCount="indefinite" />
        </use>
        <use href="#trace-6" stroke="#22d3ee" strokeDasharray="5 18">
          <animate attributeName="stroke-dashoffset" from="0" to="240" dur="5s" repeatCount="indefinite" />
        </use>
      </g>

      {/* Chips — three CPU/MCU blocks anchored on traces */}
      <Chip x={420} y={250} w={80} h={70} label="CPU" color="#22d3ee" />
      <Chip x={1420} y={420} w={80} h={70} label="MCU" color="#a78bfa" />
      <Chip x={720} y={680} w={80} h={70} label="GPU" color="#06b6d4" />

      {/* Junction dots */}
      <g fill="#0891b2" opacity="0.5">
        {NODES.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2.5" />
        ))}
      </g>

      {/* A subset of nodes that throb */}
      <g filter="url(#circuit-glow)">
        {PULSING_NODE_INDICES.map((idx, i) => {
          const [x, y] = NODES[idx];
          return (
            <circle key={i} cx={x} cy={y} r="3" fill="#22d3ee" opacity="0">
              <animate
                attributeName="opacity"
                values="0;0.9;0"
                dur="2.4s"
                begin={`${(i * 0.35) % 2.4}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="r"
                values="2;6;2"
                dur="2.4s"
                begin={`${(i * 0.35) % 2.4}s`}
                repeatCount="indefinite"
              />
            </circle>
          );
        })}
      </g>

      {/* Energy pulses + comet trails */}
      <g filter="url(#circuit-glow)">
        {PULSES.map((p, i) => {
          const trailGrad =
            p.c === "#06b6d4" ? "trail-cyan"
            : p.c === "#22d3ee" ? "trail-sky"
            : p.c === "#a78bfa" ? "trail-violet"
            : "trail-pink";
          return (
            <g key={i}>
              {p.trail && (
                <ellipse cx="-14" cy="0" rx="14" ry="1.6" fill={`url(#${trailGrad})`}>
                  <animateMotion
                    dur={`${p.dur}s`}
                    begin={`${p.delay}s`}
                    repeatCount="indefinite"
                    rotate="auto"
                  >
                    <mpath href={`#trace-${p.i}`} />
                  </animateMotion>
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    keyTimes="0;0.05;0.95;1"
                    dur={`${p.dur}s`}
                    begin={`${p.delay}s`}
                    repeatCount="indefinite"
                  />
                </ellipse>
              )}
              <circle r="3.5" fill={p.c}>
                <animateMotion
                  dur={`${p.dur}s`}
                  begin={`${p.delay}s`}
                  repeatCount="indefinite"
                  rotate="auto"
                >
                  <mpath href={`#trace-${p.i}`} />
                </animateMotion>
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.05;0.95;1"
                  dur={`${p.dur}s`}
                  begin={`${p.delay}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          );
        })}
      </g>

      {/* A few extra-bright "supercharge" pulses with strong glow */}
      <g filter="url(#strong-glow)">
        <circle r="5" fill="#22d3ee">
          <animateMotion dur="14s" repeatCount="indefinite" rotate="auto">
            <mpath href="#trace-1" />
          </animateMotion>
        </circle>
        <circle r="5" fill="#a78bfa">
          <animateMotion dur="16s" begin="3s" repeatCount="indefinite" rotate="auto">
            <mpath href="#trace-6" />
          </animateMotion>
        </circle>
      </g>
    </svg>
  );
}
