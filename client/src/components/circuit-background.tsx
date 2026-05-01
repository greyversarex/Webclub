// Far-depth traces (most blurred — feel "behind" the page)
const FAR_TRACES = [
  "M 0 80 L 220 80 L 240 100 L 600 100 L 620 80 L 1100 80 L 1120 100 L 1920 100",
  "M 0 1000 L 320 1000 L 340 980 L 740 980 L 760 1000 L 1240 1000 L 1260 980 L 1920 980",
  "M 80 0 L 80 200 L 100 220 L 100 540 L 80 560 L 80 1080",
  "M 1840 0 L 1840 320 L 1860 340 L 1860 760 L 1840 780 L 1840 1080",
  "M 0 460 L 200 460 L 320 580 L 540 580 L 660 460 L 880 460",
  "M 1920 460 L 1720 460 L 1600 580 L 1380 580 L 1260 460 L 1040 460",
];

// Mid-depth traces (slight blur)
const MID_TRACES = [
  "M 0 240 L 380 240 L 400 260 L 760 260 L 780 240 L 1180 240 L 1200 260 L 1920 260",
  "M 0 700 L 460 700 L 480 720 L 880 720 L 900 700 L 1280 700 L 1300 720 L 1920 720",
  "M 380 0 L 380 180 L 400 200 L 400 460 L 380 480 L 380 880 L 400 900 L 400 1080",
  "M 1540 0 L 1540 200 L 1520 220 L 1520 600 L 1540 620 L 1540 920 L 1520 940 L 1520 1080",
  "M 0 880 L 280 880 L 380 780 L 600 780",
  "M 1920 200 L 1640 200 L 1540 300 L 1320 300",
];

// Near (sharp, in-focus) traces — the main schematic the eye lands on
const NEAR_TRACES = [
  "M 0 360 L 240 360 L 260 380 L 640 380 L 660 360 L 1080 360 L 1100 380 L 1520 380 L 1540 360 L 1920 360",
  "M 0 580 L 320 580 L 340 600 L 720 600 L 740 580 L 1160 580 L 1180 600 L 1620 600 L 1640 580 L 1920 580",
  "M 0 820 L 320 820 L 340 800 L 720 800 L 740 820 L 1180 820 L 1200 800 L 1620 800 L 1640 820 L 1920 820",
  "M 200 0 L 200 280 L 220 300 L 220 700 L 200 720 L 200 1080",
  "M 720 0 L 720 220 L 740 240 L 740 540 L 720 560 L 720 920 L 740 940 L 740 1080",
  "M 1180 0 L 1180 460 L 1200 480 L 1200 760 L 1180 780 L 1180 1080",
  "M 1700 0 L 1700 320 L 1680 340 L 1680 660 L 1700 680 L 1700 1080",
  // Diagonals
  "M 0 980 L 240 980 L 380 840 L 540 840 L 660 720 L 980 720",
  "M 1920 980 L 1680 980 L 1540 840 L 1380 840 L 1260 720 L 940 720",
  "M 0 60 L 200 60 L 320 180 L 540 180",
  "M 1920 60 L 1720 60 L 1600 180 L 1380 180",
];

// Junction nodes laid out near intersections of NEAR_TRACES
const NODES = [
  [220, 360], [740, 380], [1180, 360], [1700, 360],
  [220, 580], [740, 600], [1180, 580], [1640, 580],
  [220, 820], [740, 820], [1180, 800], [1640, 820],
  [200, 300], [720, 240], [1200, 480], [1680, 340],
  [380, 840], [1540, 840], [660, 720], [1260, 720],
  [320, 180], [1600, 180],
];

const PULSING_NODE_INDICES = [0, 2, 5, 7, 9, 11, 14, 17, 19];

const PULSES = [
  { i: 0,  c: "#0891b2", dur: 7,  delay: 0,   trail: true  },
  { i: 1,  c: "#0e7490", dur: 9,  delay: 1.5, trail: true  },
  { i: 2,  c: "#7c3aed", dur: 8,  delay: 0.8, trail: true  },
  { i: 3,  c: "#0891b2", dur: 10, delay: 2.2, trail: true  },
  { i: 4,  c: "#7c3aed", dur: 8,  delay: 0.4, trail: true  },
  { i: 5,  c: "#0e7490", dur: 9,  delay: 1.2, trail: true  },
  { i: 6,  c: "#0891b2", dur: 7,  delay: 0,   trail: false },
  { i: 7,  c: "#db2777", dur: 8,  delay: 0.6, trail: true  },
  { i: 8,  c: "#7c3aed", dur: 9,  delay: 0.5, trail: true  },
  { i: 9,  c: "#0891b2", dur: 8,  delay: 1.8, trail: true  },
  { i: 10, c: "#0e7490", dur: 5,  delay: 1.0, trail: false },
  { i: 1,  c: "#7c3aed", dur: 11, delay: 5.5, trail: true  },
  { i: 3,  c: "#0e7490", dur: 9,  delay: 4.5, trail: true  },
  { i: 5,  c: "#0891b2", dur: 10, delay: 3.5, trail: true  },
];

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
        {/* Glow filters of varying intensity for depth */}
        <filter id="glow-soft" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="glow-strong" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Depth-of-field blurs for far/mid layers */}
        <filter id="blur-far" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.5" />
        </filter>
        <filter id="blur-mid" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.2" />
        </filter>
        <filter id="blur-bokeh" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="14" />
        </filter>

        {/* Faint dot grid backdrop — tuned for light bg */}
        <pattern id="dot-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="0.8" fill="#0e7490" opacity="0.18" />
        </pattern>

        {/* Comet-trail gradients */}
        <linearGradient id="trail-cyan" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0891b2" stopOpacity="0" />
          <stop offset="100%" stopColor="#0891b2" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="trail-teal" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0e7490" stopOpacity="0" />
          <stop offset="100%" stopColor="#0e7490" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="trail-violet" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="trail-pink" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#db2777" stopOpacity="0" />
          <stop offset="100%" stopColor="#db2777" stopOpacity="0.95" />
        </linearGradient>

        {/* Soft corner washes — light, atmospheric */}
        <radialGradient id="glow-tl" cx="0%" cy="0%" r="55%">
          <stop offset="0%" stopColor="#0891b2" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="glow-br" cx="100%" cy="100%" r="55%">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="vignette" cx="50%" cy="50%" r="75%">
          <stop offset="60%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#0c1628" stopOpacity="0.08" />
        </radialGradient>

        {/* Bokeh circle gradient — soft glowing orb */}
        <radialGradient id="bokeh-cyan" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#22d3ee" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="bokeh-violet" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.50" />
          <stop offset="60%" stopColor="#a78bfa" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="bokeh-pink" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f472b6" stopOpacity="0.45" />
          <stop offset="60%" stopColor="#f472b6" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#f472b6" stopOpacity="0" />
        </radialGradient>

        {/* Path defs so pulses can reference them via mpath */}
        {NEAR_TRACES.map((d, i) => (
          <path key={i} id={`near-${i}`} d={d} />
        ))}
      </defs>

      {/* Backdrop */}
      <rect width="100%" height="100%" fill="url(#dot-grid)" />
      <rect width="100%" height="100%" fill="url(#glow-tl)" />
      <rect width="100%" height="100%" fill="url(#glow-br)" />

      {/* Bokeh light-orbs floating in the deep background — depth of field */}
      <g filter="url(#blur-bokeh)" opacity="0.85">
        <circle cx="320" cy="240" r="180" fill="url(#bokeh-cyan)">
          <animate attributeName="cx" values="320;360;320" dur="22s" repeatCount="indefinite" />
          <animate attributeName="cy" values="240;220;240" dur="18s" repeatCount="indefinite" />
        </circle>
        <circle cx="1620" cy="800" r="220" fill="url(#bokeh-violet)">
          <animate attributeName="cx" values="1620;1580;1620" dur="26s" repeatCount="indefinite" />
          <animate attributeName="cy" values="800;820;800" dur="20s" repeatCount="indefinite" />
        </circle>
        <circle cx="960" cy="540" r="260" fill="url(#bokeh-cyan)">
          <animate attributeName="r" values="260;300;260" dur="14s" repeatCount="indefinite" />
        </circle>
        <circle cx="1380" cy="200" r="140" fill="url(#bokeh-pink)">
          <animate attributeName="cx" values="1380;1340;1380" dur="19s" repeatCount="indefinite" />
        </circle>
        <circle cx="540" cy="900" r="160" fill="url(#bokeh-violet)">
          <animate attributeName="cy" values="900;880;900" dur="17s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Slow rotating concentric rings — holographic dial in the deep mid */}
      <g filter="url(#blur-mid)" opacity="0.22" fill="none" stroke="#0e7490">
        <circle cx="960" cy="540" r="420" strokeDasharray="3 16" strokeWidth="1">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 960 540"
            to="360 960 540"
            dur="90s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="960" cy="540" r="280" strokeDasharray="2 12" strokeWidth="0.9">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="360 960 540"
            to="0 960 540"
            dur="60s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="960" cy="540" r="150" strokeDasharray="1 10" strokeWidth="0.8">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 960 540"
            to="360 960 540"
            dur="40s"
            repeatCount="indefinite"
          />
        </circle>
      </g>

      {/* ─── FAR LAYER (heavily blurred, very faint) ───────────── */}
      <g filter="url(#blur-far)" opacity="0.35">
        <g stroke="#0e7490" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {FAR_TRACES.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
      </g>

      {/* ─── MID LAYER (slight blur, medium opacity) ──────────── */}
      <g filter="url(#blur-mid)" opacity="0.55">
        <g stroke="#0e7490" strokeWidth="1.1" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {MID_TRACES.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
      </g>

      {/* ─── NEAR LAYER (sharp, in-focus) ─────────────────────── */}
      <g
        stroke="#155e75"
        strokeWidth="1.1"
        fill="none"
        opacity="0.55"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {NEAR_TRACES.map((_, i) => (
          <use key={i} href={`#near-${i}`} />
        ))}
      </g>

      {/* Dashed flowing data streams on a few key buses */}
      <g fill="none" strokeWidth="1.6" opacity="0.7">
        <use href="#near-0" stroke="#0891b2" strokeDasharray="6 18">
          <animate attributeName="stroke-dashoffset" from="0" to="-240" dur="6s" repeatCount="indefinite" />
        </use>
        <use href="#near-2" stroke="#7c3aed" strokeDasharray="4 22">
          <animate attributeName="stroke-dashoffset" from="0" to="-260" dur="7s" repeatCount="indefinite" />
        </use>
        <use href="#near-5" stroke="#0e7490" strokeDasharray="5 18">
          <animate attributeName="stroke-dashoffset" from="0" to="240" dur="5s" repeatCount="indefinite" />
        </use>
      </g>

      {/* Junction dots */}
      <g fill="#155e75" opacity="0.7">
        {NODES.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2.6" />
        ))}
      </g>

      {/* Throbbing nodes */}
      <g filter="url(#glow-soft)">
        {PULSING_NODE_INDICES.map((idx, i) => {
          const [x, y] = NODES[idx];
          return (
            <circle key={i} cx={x} cy={y} r="3" fill="#0891b2" opacity="0">
              <animate
                attributeName="opacity"
                values="0;0.95;0"
                dur="2.6s"
                begin={`${(i * 0.32) % 2.6}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="r"
                values="2;7;2"
                dur="2.6s"
                begin={`${(i * 0.32) % 2.6}s`}
                repeatCount="indefinite"
              />
            </circle>
          );
        })}
      </g>

      {/* Energy pulses + comet trails on near layer */}
      <g filter="url(#glow-soft)">
        {PULSES.map((p, i) => {
          const trailGrad =
            p.c === "#0891b2" ? "trail-cyan"
            : p.c === "#0e7490" ? "trail-teal"
            : p.c === "#7c3aed" ? "trail-violet"
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
                    <mpath href={`#near-${p.i}`} />
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
                  <mpath href={`#near-${p.i}`} />
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

      {/* Two extra-bright "supercharge" pulses */}
      <g filter="url(#glow-strong)">
        <circle r="5" fill="#22d3ee">
          <animateMotion dur="14s" repeatCount="indefinite" rotate="auto">
            <mpath href="#near-0" />
          </animateMotion>
        </circle>
        <circle r="5" fill="#a78bfa">
          <animateMotion dur="16s" begin="3s" repeatCount="indefinite" rotate="auto">
            <mpath href="#near-4" />
          </animateMotion>
        </circle>
      </g>

      {/* Subtle vignette to add overall depth */}
      <rect width="100%" height="100%" fill="url(#vignette)" />
    </svg>
  );
}
