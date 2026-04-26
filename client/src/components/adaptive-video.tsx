import { useRef, useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Loader2, Wifi, WifiOff, Gauge } from "lucide-react";
import { getNetworkQuality, getPreloadStrategy, getQualityLabel } from "@/hooks/use-network-quality";

interface AdaptiveVideoProps {
  src: string;
  className?: string;
  "data-testid"?: string;
}

export interface AdaptiveVideoHandle {
  pause: () => void;
  setCurrentTime: (t: number) => void;
}

export const AdaptiveVideo = forwardRef<AdaptiveVideoHandle, AdaptiveVideoProps>(
  ({ src, className, "data-testid": testId }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [quality] = useState(() => getNetworkQuality());
    const [preload] = useState(() => getPreloadStrategy(getNetworkQuality()));
    const [showQualityBadge, setShowQualityBadge] = useState(false);

    useImperativeHandle(ref, () => ({
      pause: () => videoRef.current?.pause(),
      setCurrentTime: (t: number) => {
        if (videoRef.current) videoRef.current.currentTime = t;
      },
    }));

    useEffect(() => {
      setShowQualityBadge(true);
      const timer = setTimeout(() => setShowQualityBadge(false), 3000);
      return () => clearTimeout(timer);
    }, []);

    const handlePlay = () => {
      const video = videoRef.current;
      if (!video) return;
      if (video.readyState < 2) setIsLoading(true);
    };

    const handleCanPlay = () => setIsLoading(false);
    const handleWaiting = () => setIsLoading(true);
    const handlePlaying = () => setIsLoading(false);

    const qualityIcon = quality === "fast"
      ? <Wifi className="w-3 h-3" />
      : quality === "medium"
      ? <Gauge className="w-3 h-3" />
      : <WifiOff className="w-3 h-3" />;

    const qualityColor = quality === "fast"
      ? "bg-emerald-500/80"
      : quality === "medium"
      ? "bg-amber-500/80"
      : "bg-slate-500/80";

    return (
      <div className="relative w-full h-full bg-black">
        <video
          ref={videoRef}
          src={src}
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
        <div
          className={`absolute bottom-14 right-3 flex items-center gap-1.5 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm transition-all duration-500 ${qualityColor} ${
            showQualityBadge ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
          }`}
          aria-label={`Network quality: ${getQualityLabel(quality)}`}
        >
          {qualityIcon}
          <span>{getQualityLabel(quality)}</span>
        </div>
      </div>
    );
  }
);

AdaptiveVideo.displayName = "AdaptiveVideo";
