export function CircuitBackground() {
  const traces = [
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

  const nodes = [
    [180, 140], [540, 360], [980, 580], [1340, 800], [1720, 160],
    [400, 160], [780, 140], [1200, 160], [260, 380], [660, 360],
    [1100, 380], [1540, 360], [480, 600], [900, 580], [1300, 600],
    [340, 800], [740, 820], [1200, 800], [1640, 820],
    [200, 300], [560, 240], [1000, 480], [1360, 340], [1700, 260],
  ];

  // pulses: { traceIndex, color, duration, delay }
  const pulses = [
    { i: 0, color: "#06b6d4", dur: 7,  delay: 0   },
    { i: 1, color: "#22d3ee", dur: 9,  delay: 1.5 },
    { i: 2, color: "#a78bfa", dur: 8,  delay: 0.8 },
    { i: 3, color: "#06b6d4", dur: 10, delay: 2.2 },
    { i: 4, color: "#22d3ee", dur: 6,  delay: 0.4 },
    { i: 5, color: "#a78bfa", dur: 8,  delay: 1.2 },
    { i: 6, color: "#06b6d4", dur: 7,  delay: 0   },
    { i: 7, color: "#22d3ee", dur: 9,  delay: 2.0 },
    { i: 8, color: "#a78bfa", dur: 8,  delay: 0.6 },
    { i: 1, color: "#06b6d4", dur: 11, delay: 5.5 },
    { i: 3, color: "#22d3ee", dur: 9,  delay: 4.5 },
    { i: 6, color: "#a78bfa", dur: 10, delay: 3.5 },
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
        <filter id="circuit-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Static circuit traces — faint cyan lines */}
      <g
        stroke="#0891b2"
        strokeWidth="1"
        fill="none"
        opacity="0.28"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {traces.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>

      {/* Junction dots */}
      <g fill="#0891b2" opacity="0.45">
        {nodes.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2.5" />
        ))}
      </g>

      {/* Energy pulses traveling along the traces */}
      <g filter="url(#circuit-glow)">
        {pulses.map((p, i) => (
          <circle key={i} r="3.5" fill={p.color}>
            <animateMotion
              dur={`${p.dur}s`}
              begin={`${p.delay}s`}
              repeatCount="indefinite"
              path={traces[p.i]}
              rotate="auto"
            />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;0.05;0.95;1"
              dur={`${p.dur}s`}
              begin={`${p.delay}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </g>
    </svg>
  );
}
