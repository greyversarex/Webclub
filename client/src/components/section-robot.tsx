import { useEffect, useId, useRef, useState } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

interface SectionRobotProps {
  message: string;
  side?: "left" | "right";
}

export function SectionRobot({ message, side = "left" }: SectionRobotProps) {
  const { ref, isVisible } = useScrollAnimation();
  const isLeft = side === "left";
  const uid = useId().replace(/:/g, "");
  const bodyId = `rb-body-${uid}`;
  const accentId = `rb-accent-${uid}`;
  const eyeId = `rb-eye-${uid}`;
  const [typed, setTyped] = useState("");
  const startedRef = useRef(false);

  useEffect(() => {
    if (!isVisible || startedRef.current) return;
    startedRef.current = true;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTyped(message.slice(0, i));
      if (i >= message.length) clearInterval(interval);
    }, 32);
    return () => clearInterval(interval);
  }, [isVisible, message]);

  const isTyping = typed.length < message.length;

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`absolute top-16 md:top-24 z-30 hidden xl:flex items-start gap-3 pointer-events-none ${
        isLeft ? "left-4 2xl:left-10" : "right-4 2xl:right-10"
      } ${!isLeft ? "flex-row-reverse" : "flex-row"} transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      data-testid={`section-robot-${side}`}
    >
      <div
        className="flex-shrink-0"
        style={{ transform: isLeft ? "none" : "scaleX(-1)" }}
      >
        <div className="robot-bob">
          <svg width="64" height="78" viewBox="0 0 64 78" fill="none">
            <defs>
              <linearGradient id={`${bodyId}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e0f2fe" />
                <stop offset="100%" stopColor="#a5f3fc" />
              </linearGradient>
              <linearGradient id={`${accentId}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#a78bfa" />
              </linearGradient>
              <radialGradient id={`${eyeId}`} cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="60%" stopColor="#0891b2" />
                <stop offset="100%" stopColor="#155e75" />
              </radialGradient>
            </defs>

            {/* Antenna */}
            <line x1="32" y1="14" x2="32" y2="5" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" />
            <circle cx="32" cy="4" r="3.5" fill="#a78bfa">
              <animate attributeName="r" values="3;4;3" dur="1.4s" repeatCount="indefinite" />
              <animate attributeName="fill" values="#a78bfa;#f0abfc;#a78bfa" dur="1.4s" repeatCount="indefinite" />
            </circle>
            <circle cx="32" cy="4" r="6" fill="#a78bfa" opacity="0.25">
              <animate attributeName="opacity" values="0.1;0.45;0.1" dur="1.4s" repeatCount="indefinite" />
            </circle>

            {/* Head */}
            <rect x="10" y="14" width="44" height="30" rx="12" fill={`url(#${bodyId})`} stroke="#06b6d4" strokeWidth="1.5" />
            <rect x="10" y="14" width="44" height="14" rx="12" fill="#67e8f9" opacity="0.35" />

            {/* Eyes */}
            <circle cx="22" cy="28" r="5" fill={`url(#${eyeId})`} />
            <circle cx="22" cy="27" r="1.6" fill="#fff">
              <animate attributeName="opacity" values="1;0.3;1" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="42" cy="28" r="5" fill={`url(#${eyeId})`} />
            <circle cx="42" cy="27" r="1.6" fill="#fff">
              <animate attributeName="opacity" values="1;0.3;1" dur="3s" repeatCount="indefinite" />
            </circle>

            {/* Mouth - animated when typing */}
            {isTyping ? (
              <g>
                <ellipse cx="32" cy="38" rx="4" ry="1.6" fill="#0891b2">
                  <animate attributeName="ry" values="1;2.4;1" dur="0.35s" repeatCount="indefinite" />
                </ellipse>
              </g>
            ) : (
              <path d="M26,37 Q32,41 38,37" stroke="#0891b2" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            )}

            {/* Cheek blush */}
            <circle cx="16" cy="35" r="2" fill="#f0abfc" opacity="0.5" />
            <circle cx="48" cy="35" r="2" fill="#f0abfc" opacity="0.5" />

            {/* Neck */}
            <rect x="28" y="44" width="8" height="3" fill="#0891b2" />

            {/* Body */}
            <rect x="14" y="47" width="36" height="22" rx="8" fill={`url(#${bodyId})`} stroke={`url(#${accentId})`} strokeWidth="1.5" />
            <rect x="14" y="47" width="36" height="10" rx="8" fill="#67e8f9" opacity="0.35" />

            {/* Body chest light */}
            <circle cx="32" cy="58" r="3.5" fill="#a78bfa">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="32" cy="58" r="1.5" fill="#fff" opacity="0.9" />

            {/* Left arm - resting */}
            <g>
              <line x1="14" y1="52" x2="6" y2="60" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="6" cy="60" r="2.5" fill={`url(#${accentId})`} stroke="#06b6d4" strokeWidth="1" />
            </g>

            {/* Right arm - WAVING with rotation animation */}
            <g style={{ transformOrigin: "50px 52px", transformBox: "fill-box" }}>
              <g className="robot-wave">
                <line x1="50" y1="52" x2="60" y2="44" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="60" cy="44" r="2.5" fill={`url(#${accentId})`} stroke="#06b6d4" strokeWidth="1" />
              </g>
            </g>

            {/* Feet */}
            <rect x="18" y="69" width="8" height="4" rx="2" fill="#0891b2" />
            <rect x="38" y="69" width="8" height="4" rx="2" fill="#0891b2" />
          </svg>
        </div>
      </div>

      <div className="relative mt-2">
        <div
          className={`absolute top-4 w-3 h-3 rotate-45 bg-white ${
            isLeft
              ? "-left-[6px] border-l border-b border-cyan-200"
              : "-right-[6px] border-r border-t border-cyan-200"
          }`}
        />
        <div className="bg-white rounded-2xl px-4 py-3 text-[12px] leading-relaxed text-slate-700 shadow-[0_8px_24px_rgba(6,182,212,0.18),0_0_0_1px_rgba(6,182,212,0.15)] border border-cyan-100 max-w-[230px] min-h-[60px]">
          <span>{typed}</span>
          {isTyping && (
            <span className="inline-block w-[2px] h-[12px] bg-cyan-500 ml-0.5 align-middle robot-cursor" />
          )}
        </div>
      </div>
    </div>
  );
}
