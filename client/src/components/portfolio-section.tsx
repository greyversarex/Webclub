import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useLanguage } from "@/lib/language-context";
import { AdaptiveVideo, type AdaptiveVideoHandle, type VideoSources } from "@/components/adaptive-video";

import ecommercePlatform from "@assets/generated_images/e-commerce_platform_mockup.png";
import bankingApp from "@assets/generated_images/banking_mobile_app_interface.png";
import corporatePortal from "@assets/generated_images/corporate_portal_dashboard.png";
import educationPlatform from "@assets/generated_images/education_platform_interface.png";
import govServices from "@assets/generated_images/government_services_portal.png";
import logisticsSystem from "@assets/generated_images/logistics_system_dashboard.png";

import tourism480 from "@assets/encoded/tourism_480p.mp4";
import tourism720 from "@assets/encoded/tourism_720p.mp4";
import tourism1080 from "@assets/encoded/tourism_1080p.mp4";
import crm480 from "@assets/encoded/crm_480p.mp4";
import crm720 from "@assets/encoded/crm_720p.mp4";
import crm1080 from "@assets/encoded/crm_1080p.mp4";
import analytics480 from "@assets/encoded/analytics_480p.mp4";
import analytics720 from "@assets/encoded/analytics_720p.mp4";
import analytics1080 from "@assets/encoded/analytics_1080p.mp4";
import landing480 from "@assets/encoded/landing_480p.mp4";
import landing720 from "@assets/encoded/landing_720p.mp4";
import landing1080 from "@assets/encoded/landing_1080p.mp4";
import govDoc480 from "@assets/encoded/gov_docflow_480p.mp4";
import govDoc720 from "@assets/encoded/gov_docflow_720p.mp4";
import govDoc1080 from "@assets/encoded/gov_docflow_1080p.mp4";
import logistics480 from "@assets/encoded/logistics_480p.mp4";
import logistics720 from "@assets/encoded/logistics_720p.mp4";
import logistics1080 from "@assets/encoded/logistics_1080p.mp4";
import corporate480 from "@assets/encoded/corporate_480p.mp4";
import corporate720 from "@assets/encoded/corporate_720p.mp4";
import corporate1080 from "@assets/encoded/corporate_1080p.mp4";
import finance480 from "@assets/encoded/finance_480p.mp4";
import finance720 from "@assets/encoded/finance_720p.mp4";
import finance1080 from "@assets/encoded/finance_1080p.mp4";

const projectPosters = [
  ecommercePlatform, bankingApp, corporatePortal,
  educationPlatform, govServices, logisticsSystem,
  corporatePortal, bankingApp,
];

const projectVideoSources: (VideoSources | null)[] = [
  { "480p": tourism480, "720p": tourism720, "1080p": tourism1080 },
  { "480p": crm480, "720p": crm720, "1080p": crm1080 },
  { "480p": analytics480, "720p": analytics720, "1080p": analytics1080 },
  { "480p": landing480, "720p": landing720, "1080p": landing1080 },
  { "480p": govDoc480, "720p": govDoc720, "1080p": govDoc1080 },
  { "480p": logistics480, "720p": logistics720, "1080p": logistics1080 },
  { "480p": corporate480, "720p": corporate720, "1080p": corporate1080 },
  { "480p": finance480, "720p": finance720, "1080p": finance1080 },
];

const accentColors = [
  "bg-violet-100 text-violet-700 border-violet-200",
  "bg-emerald-100 text-emerald-700 border-emerald-200",
  "bg-violet-100 text-violet-700 border-violet-200",
  "bg-emerald-100 text-emerald-700 border-emerald-200",
  "bg-violet-100 text-violet-700 border-violet-200",
  "bg-emerald-100 text-emerald-700 border-emerald-200",
  "bg-violet-100 text-violet-700 border-violet-200",
  "bg-emerald-100 text-emerald-700 border-emerald-200",
];

interface ProjectCardProps {
  index: number;
  title: string;
  category: string;
  description: string;
  sources: VideoSources | null;
  poster: string;
  accentColor: string;
  isVisible: boolean;
  delay: string;
}

function ProjectCard({
  index, title, category, description,
  sources, poster, accentColor, isVisible, delay,
}: ProjectCardProps) {
  const videoRef = useRef<AdaptiveVideoHandle>(null);

  return (
    <div
      className={`group flex flex-col gap-1.5 transition-all duration-500 hover:-translate-y-1 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: delay }}
      data-testid={`card-portfolio-${index}`}
    >
      <h3 className="font-display font-bold text-sm md:text-base text-slate-800 leading-snug px-1 truncate">
        {title}
      </h3>

      <div className="relative rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-500 aspect-video bg-slate-900 flex-shrink-0">
        {sources ? (
          <AdaptiveVideo
            ref={videoRef}
            sources={sources}
            className="w-full h-full"
            data-testid={`video-portfolio-${index}`}
          />
        ) : (
          <img
            src={poster}
            alt={title}
            className="w-full h-full object-cover"
            data-testid={`img-portfolio-${index}`}
          />
        )}
        <div className="absolute top-2 left-2 pointer-events-none z-10">
          <Badge variant="secondary" className={`text-xs border backdrop-blur-sm ${accentColor}`}>
            {category}
          </Badge>
        </div>
      </div>

      <p className="text-xs md:text-sm text-slate-500 leading-snug line-clamp-2 px-1">
        {description}
      </p>
    </div>
  );
}

export function PortfolioSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useLanguage();
  const projects = t.portfolio.projects;

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
            {t.portfolio.subtitle}
          </h2>
          <p
            className={`text-slate-500 text-lg max-w-2xl mx-auto transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {t.portfolio.title}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard
              key={i}
              index={i}
              title={project.title}
              category={project.category}
              description={project.description}
              sources={projectVideoSources[i]}
              poster={projectPosters[i]}
              accentColor={accentColors[i]}
              isVisible={isVisible}
              delay={`${200 + i * 80}ms`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
