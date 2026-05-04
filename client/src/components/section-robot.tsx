import { useScrollAnimation } from "@/hooks/use-scroll-animation";

interface SectionRobotProps {
  message: string;
  side?: "left" | "right";
}

export function SectionRobot({ message, side = "left" }: SectionRobotProps) {
  const { ref, isVisible } = useScrollAnimation();
  const isLeft = side === "left";

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
        <div style={{ animation: isVisible ? "robot-float 3s ease-in-out infinite" : "none" }}>
        <svg width="52" height="62" viewBox="0 0 52 62" fill="none">
          <line x1="26" y1="10" x2="26" y2="3" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" />
          <circle cx="26" cy="3" r="3" fill="#a78bfa" opacity="0.8">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
          </circle>
          <rect x="6" y="10" width="40" height="26" rx="10" fill="#0f172a" stroke="#06b6d4" strokeWidth="1.5" />
          <circle cx="18" cy="22" r="4" fill="#06b6d4" opacity="0.9" />
          <circle cx="17.5" cy="21" r="1.5" fill="#fff" opacity="0.8" />
          <circle cx="34" cy="22" r="4" fill="#06b6d4" opacity="0.9" />
          <circle cx="33.5" cy="21" r="1.5" fill="#fff" opacity="0.8" />
          <path d="M20,30 Q26,34 32,30" stroke="#06b6d4" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <rect x="12" y="40" width="28" height="16" rx="6" fill="#0f172a" stroke="#a78bfa" strokeWidth="1.5" />
          <circle cx="26" cy="48" r="2.5" fill="#06b6d4" opacity="0.3" />
          <path d="M12,44 Q7,40 4,44" stroke="#06b6d4" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M40,43 Q45,37 48,41" stroke="#06b6d4" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
        </div>
      </div>

      <div className="relative mt-1">
        <div
          className={`absolute top-4 w-2.5 h-2.5 rotate-45 bg-slate-900/80 ${
            isLeft
              ? "-left-[5px] border-l border-b border-cyan-500/30"
              : "-right-[5px] border-r border-t border-cyan-500/30"
          }`}
        />
        <div className="bg-slate-900/80 backdrop-blur-md rounded-xl px-3.5 py-2.5 text-[11px] leading-relaxed text-cyan-100/90 shadow-[0_0_20px_rgba(6,182,212,0.08)] border border-cyan-500/30 max-w-[210px]">
          {message}
        </div>
      </div>
    </div>
  );
}
