import { useState, useEffect, useRef } from "react";
import { Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useLanguage } from "@/lib/language-context";

import ecommercePlatform from "@assets/generated_images/e-commerce_platform_mockup.png";
import bankingApp from "@assets/generated_images/banking_mobile_app_interface.png";
import corporatePortal from "@assets/generated_images/corporate_portal_dashboard.png";
import educationPlatform from "@assets/generated_images/education_platform_interface.png";
import govServices from "@assets/generated_images/government_services_portal.png";
import logisticsSystem from "@assets/generated_images/logistics_system_dashboard.png";

const projectPosters = [
  ecommercePlatform, bankingApp, corporatePortal,
  educationPlatform, govServices, logisticsSystem,
];

// Video files for each project. Set to `null` while a video isn't ready —
// the poster image will be shown instead. To add a real video:
//   1. Drop the .mp4 file into attached_assets/
//   2. import myVideo from "@assets/my_video.mp4";
//   3. Replace the corresponding `null` below with `myVideo`.
const projectVideos: (string | null)[] = [
  null, null, null, null, null, null,
];

const projectTags = [
  ["React", "Node.js", "PostgreSQL"],
  ["React Native", "TypeScript", "AWS"],
  ["Vue.js", "Python", "Docker"],
  ["Next.js", "WebRTC", "MongoDB"],
  ["Angular", "Java", "Oracle"],
  ["React", "Go", "Redis"],
];
const accentColors = [
  "bg-violet-100 text-violet-700 border-violet-200",
  "bg-emerald-100 text-emerald-700 border-emerald-200",
  "bg-violet-100 text-violet-700 border-violet-200",
  "bg-emerald-100 text-emerald-700 border-emerald-200",
  "bg-violet-100 text-violet-700 border-violet-200",
  "bg-emerald-100 text-emerald-700 border-emerald-200",
];

const TOTAL_PROJECTS = 6;
const AUTO_INTERVAL = 6000;
const FADE_MS = 380;

export function PortfolioSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useLanguage();
  const projects = t.portfolio.projects;

  const [shown, setShown] = useState(0);
  const [fading, setFading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const shownRef = useRef(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const goTo = (idx: number) => {
    if (idx === shownRef.current) return;
    // Pause current video before switching
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setFading(true);
    setTimeout(() => {
      shownRef.current = idx;
      setShown(idx);
      setFading(false);
    }, FADE_MS);
  };

  // Auto-advance, but only when no video is currently playing
  useEffect(() => {
    const id = setInterval(() => {
      if (isPlaying) return;
      goTo((shownRef.current + 1) % TOTAL_PROJECTS);
    }, AUTO_INTERVAL);
    return () => clearInterval(id);
  }, [isPlaying]);

  const project = projects[shown];
  const currentVideo = projectVideos[shown];

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="portfolio"
      className="py-16 md:py-24 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative">

        <div className="text-center mb-10 md:mb-14">
          <h2
            className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-800 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {t.portfolio.title}
          </h2>
          <p
            className={`text-slate-900 text-lg max-w-2xl mx-auto transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {t.portfolio.subtitle}
          </p>
        </div>

        <div
          className={`transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="mb-4 h-10 overflow-hidden">
            <h3
              key={shown}
              className="slide-text-in font-display font-bold text-2xl md:text-3xl text-slate-800"
              data-testid="text-portfolio-slide-title"
            >
              {project.title}
            </h3>
          </div>

          <div
            className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/60 bg-slate-900"
            style={{ height: "620px" }}
          >
            {/* Video / poster — fades on transition */}
            <div
              className="absolute inset-0 transition-opacity"
              style={{
                opacity: fading ? 0 : 1,
                transitionDuration: `${FADE_MS}ms`,
                zIndex: 1,
              }}
              key={shown}
            >
              {currentVideo ? (
                <video
                  ref={videoRef}
                  src={currentVideo}
                  poster={projectPosters[shown]}
                  controls
                  playsInline
                  preload="metadata"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                  className="w-full h-full object-cover"
                  data-testid={`video-portfolio-${shown}`}
                />
              ) : (
                <>
                  <img
                    src={projectPosters[shown]}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    data-testid={`img-portfolio-slide-${shown}`}
                  />
                  {/* Play button overlay (placeholder — disabled when no video) */}
                  <button
                    onClick={handlePlay}
                    disabled
                    className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors group cursor-not-allowed"
                    aria-label="Play video"
                    data-testid={`button-play-${shown}`}
                  >
                    <span className="w-20 h-20 rounded-full bg-white/85 flex items-center justify-center shadow-2xl backdrop-blur-sm transition-transform group-hover:scale-105">
                      <Play className="w-9 h-9 text-slate-800 ml-1.5" fill="currentColor" />
                    </span>
                  </button>
                </>
              )}
            </div>

            {/* Bottom-left badge & counter — hidden during video playback */}
            {!isPlaying && (
              <>
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none"
                  style={{ zIndex: 3 }}
                />
                <div className="absolute bottom-4 left-4 pointer-events-none" style={{ zIndex: 4 }}>
                  <Badge
                    variant="secondary"
                    className={`text-xs border backdrop-blur-sm ${accentColors[shown]}`}
                  >
                    {project.category}
                  </Badge>
                </div>
                <div
                  className="absolute bottom-4 right-4 bg-black/40 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm pointer-events-none"
                  style={{ zIndex: 4 }}
                >
                  {shown + 1} / {projects.length}
                </div>
              </>
            )}
          </div>

          <div key={shown} className="slide-text-in mt-5" style={{ animationDelay: "0.08s", minHeight: "100px" }}>
            <p className="text-slate-700 text-base leading-relaxed mb-3 max-w-3xl">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {projectTags[shown].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm rounded-full bg-slate-200/80 text-slate-700 border border-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 mt-6">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === shown
                    ? "w-8 h-2.5 bg-violet-600"
                    : "w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400"
                }`}
                data-testid={`button-portfolio-dot-${i}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
