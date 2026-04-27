import { useRef, useState, useEffect, forwardRef, useImperativeHandle, useCallback, useMemo } from "react";
import { Loader2, Settings2, Check } from "lucide-react";
import { getNetworkQuality, getPreloadStrategy } from "@/hooks/use-network-quality";
import { useLanguage } from "@/lib/language-context";

export type QualityTier = "480p" | "720p" | "1080p";
export type QualityChoice = "auto" | QualityTier;

export type VideoSources = Partial<Record<QualityTier, string>>;

interface AdaptiveVideoProps {
  sources: VideoSources;
  className?: string;
  "data-testid"?: string;
}

export interface AdaptiveVideoHandle {
  pause: () => void;
  setCurrentTime: (t: number) => void;
}

const STORAGE_KEY = "video_quality";
const TIER_ORDER: QualityTier[] = ["1080p", "720p", "480p"];

function readStoredChoice(): QualityChoice {
  if (typeof window === "undefined") return "auto";
  const v = window.localStorage.getItem(STORAGE_KEY);
  if (v === "auto" || v === "480p" || v === "720p" || v === "1080p") return v;
  return "auto";
}

function pickAutoTier(sources: VideoSources): QualityTier {
  const available = TIER_ORDER.filter((t) => sources[t]);
  if (available.length === 0) return "720p";
  const net = getNetworkQuality();
  if (net === "fast") return available[0];
  if (net === "slow") return available[available.length - 1];
  // medium: prefer 720p, otherwise step down from the highest
  const has720 = available.find((t) => t === "720p");
  if (has720) return has720;
  return available.length > 1 ? available[1] : available[0];
}

function resolveTier(choice: QualityChoice, sources: VideoSources): QualityTier {
  if (choice !== "auto" && sources[choice]) return choice;
  return pickAutoTier(sources);
}

export const AdaptiveVideo = forwardRef<AdaptiveVideoHandle, AdaptiveVideoProps>(
  ({ sources, className, "data-testid": testId }, ref) => {
    const { language } = useLanguage();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [choice, setChoice] = useState<QualityChoice>(() => readStoredChoice());
    const [menuOpen, setMenuOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const toggleBtnRef = useRef<HTMLButtonElement>(null);

    const activeTier = useMemo(() => resolveTier(choice, sources), [choice, sources]);
    const activeSrc = sources[activeTier];
    const preload = useMemo(() => getPreloadStrategy(getNetworkQuality()), []);

    // Pending state to restore after a manual quality switch.
    // Captured BEFORE setChoice so currentTime/paused are pre-swap values.
    const pendingRestoreRef = useRef<{ time: number; wasPlaying: boolean; token: number } | null>(null);
    const restoreTokenRef = useRef(0);

    useImperativeHandle(ref, () => ({
      pause: () => videoRef.current?.pause(),
      setCurrentTime: (t: number) => {
        if (videoRef.current) videoRef.current.currentTime = t;
      },
    }));

    const labels = useMemo(() => {
      if (language === "ru") return { auto: "Авто", quality: "Качество" };
      if (language === "tj") return { auto: "Худкор", quality: "Сифат" };
      return { auto: "Auto", quality: "Quality" };
    }, [language]);

    const handlePlay = useCallback(() => {
      const v = videoRef.current;
      if (!v) return;
      if (v.readyState < 2) setIsLoading(true);
    }, []);
    const handleCanPlay = useCallback(() => setIsLoading(false), []);
    const handleWaiting = useCallback(() => setIsLoading(true), []);
    const handlePlaying = useCallback(() => setIsLoading(false), []);

    // When the source actually changes, attach a one-shot listener that restores
    // pending state if any. Token guards against stale listeners from rapid switches.
    useEffect(() => {
      const v = videoRef.current;
      if (!v || !activeSrc) return;
      const pending = pendingRestoreRef.current;
      if (!pending) return;
      const myToken = pending.token;

      const restore = () => {
        if (myToken !== restoreTokenRef.current) return;
        v.currentTime = pending.time;
        if (pending.wasPlaying) {
          v.play().catch(() => {});
        }
        pendingRestoreRef.current = null;
      };

      v.addEventListener("loadedmetadata", restore, { once: true });
      return () => {
        v.removeEventListener("loadedmetadata", restore);
      };
    }, [activeSrc]);

    // Close menu on outside click or Escape; restore focus to toggle on close.
    useEffect(() => {
      if (!menuOpen) return;
      const onDoc = (e: MouseEvent) => {
        if (!containerRef.current?.contains(e.target as Node)) setMenuOpen(false);
      };
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setMenuOpen(false);
          toggleBtnRef.current?.focus();
        }
      };
      document.addEventListener("mousedown", onDoc);
      document.addEventListener("keydown", onKey);
      return () => {
        document.removeEventListener("mousedown", onDoc);
        document.removeEventListener("keydown", onKey);
      };
    }, [menuOpen]);

    const selectChoice = (c: QualityChoice) => {
      // Capture state BEFORE swap so we restore the pre-swap currentTime.
      const v = videoRef.current;
      const nextTier = resolveTier(c, sources);
      if (v && nextTier !== activeTier) {
        restoreTokenRef.current += 1;
        pendingRestoreRef.current = {
          time: v.currentTime,
          wasPlaying: !v.paused && !v.ended,
          token: restoreTokenRef.current,
        };
      }
      setChoice(c);
      try {
        window.localStorage.setItem(STORAGE_KEY, c);
      } catch {
        /* ignore quota */
      }
      setMenuOpen(false);
      toggleBtnRef.current?.focus();
    };

    const availableTiers = TIER_ORDER.filter((t) => sources[t]);
    const buttonLabel = choice === "auto" ? `${labels.auto} · ${activeTier}` : activeTier;

    return (
      <div ref={containerRef} className={`relative w-full h-full bg-black ${className ?? ""}`}>
        <video
          ref={videoRef}
          src={activeSrc}
          controls
          playsInline
          preload={preload}
          className="w-full h-full object-contain mt-[-14px] mb-[-14px]"
          data-testid={testId}
          onPlay={handlePlay}
          onCanPlay={handleCanPlay}
          onWaiting={handleWaiting}
          onPlaying={handlePlaying}
        />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-black/50 rounded-full p-3 backdrop-blur-sm">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
          </div>
        )}

        <div className="absolute bottom-14 right-3 flex items-center gap-2">
          {menuOpen && (
            <div
              className="bg-black/80 backdrop-blur-sm rounded-md py-1 text-xs text-white shadow-lg min-w-[120px]"
              data-testid="menu-video-quality"
            >
              <button
                type="button"
                onClick={() => selectChoice("auto")}
                className="w-full flex items-center justify-between gap-2 px-3 py-1.5 hover:bg-white/10 transition-colors focus:outline-none focus:bg-white/10"
                data-testid="button-quality-auto"
              >
                <span>{labels.auto}</span>
                {choice === "auto" && <Check className="w-3.5 h-3.5 text-violet-300" />}
              </button>
              {availableTiers.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => selectChoice(t)}
                  className="w-full flex items-center justify-between gap-2 px-3 py-1.5 hover:bg-white/10 transition-colors focus:outline-none focus:bg-white/10"
                  data-testid={`button-quality-${t}`}
                >
                  <span>{t}</span>
                  {choice === t && <Check className="w-3.5 h-3.5 text-violet-300" />}
                </button>
              ))}
            </div>
          )}
          <button
            ref={toggleBtnRef}
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="flex items-center gap-1.5 text-white text-xs px-2.5 py-1 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-sm transition-colors"
            aria-label={labels.quality}
            aria-haspopup="true"
            aria-expanded={menuOpen}
            data-testid="button-quality-toggle"
          >
            <Settings2 className="w-3 h-3" />
            <span>{buttonLabel}</span>
          </button>
        </div>
      </div>
    );
  }
);

AdaptiveVideo.displayName = "AdaptiveVideo";
