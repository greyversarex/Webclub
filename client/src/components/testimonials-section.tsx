import { useRef, useState, useEffect } from "react";
import { Star, Quote } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useLanguage } from "@/lib/language-context";

const avatarColors = [
  "from-violet-500 to-purple-600",
  "from-cyan-500 to-blue-600",
  "from-emerald-500 to-teal-600",
  "from-rose-500 to-pink-600",
  "from-amber-500 to-orange-500",
];

function TypewriterText({
  text,
  start,
  startDelay = 0,
  baseSpeed = 20,
}: {
  text: string;
  start: boolean;
  startDelay?: number;
  baseSpeed?: number;
}) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  // Latch: begin once the section first scrolls into view, and stay started.
  useEffect(() => {
    if (start) setHasStarted(true);
  }, [start]);

  // Run the typing animation independently of later visibility toggles.
  // Re-runs (and resets) when the text changes, e.g. on language switch.
  useEffect(() => {
    if (!hasStarted) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setCount(text.length);
      return;
    }

    setCount(0);
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      i += 1;
      setCount(i);
      if (i < text.length) {
        const ch = text[i - 1];
        const delay = /[.,!?…—]/.test(ch)
          ? 160 + Math.random() * 220
          : baseSpeed + Math.random() * baseSpeed;
        timer = setTimeout(tick, delay);
      }
    };
    const initial = setTimeout(tick, startDelay);
    return () => {
      clearTimeout(initial);
      clearTimeout(timer);
    };
  }, [hasStarted, text, startDelay, baseSpeed]);

  const done = count >= text.length;
  return (
    <>
      {text.slice(0, count)}
      <span
        aria-hidden="true"
        className={`inline-block w-[2px] h-[0.95em] bg-violet-500 ml-px align-text-bottom ${
          start && !done ? "animate-pulse opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
}

export function TestimonialsSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);

  const reviews = t.testimonials.reviews;

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="testimonials"
      className="py-16 md:py-24 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-12 md:mb-16">
          <h2
            className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-800 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {t.testimonials.title}
          </h2>
          <p
            className={`text-slate-600 text-lg max-w-2xl mx-auto transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {t.testimonials.subtitle}
          </p>
        </div>

        <div
          ref={scrollRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {reviews.map((review, i) => (
            <div
              key={i}
              className={`relative flex flex-col bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/80 shadow-[0_2px_16px_rgba(0,0,0,0.06)] p-6 transition-all duration-700 hover:shadow-[0_8px_32px_rgba(139,92,246,0.14)] hover:-translate-y-1 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: isVisible ? `${i * 80}ms` : "0ms" }}
              data-testid={`card-testimonial-${i}`}
            >
              <Quote className="w-7 h-7 text-violet-200 mb-3 flex-shrink-0" />

              <div className="relative flex-1 mb-5">
                <p className="text-slate-700 text-sm leading-relaxed invisible" aria-hidden="true">
                  {review.text}
                </p>
                <p className="text-slate-700 text-sm leading-relaxed absolute inset-0">
                  <TypewriterText
                    text={review.text}
                    start={isVisible}
                    startDelay={i * 180}
                    baseSpeed={16 + (i % 3) * 6}
                  />
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarColors[i % avatarColors.length]} flex items-center justify-center flex-shrink-0 shadow-sm`}
                >
                  <span className="text-white font-bold text-sm select-none">
                    {review.initials}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 text-sm truncate">{review.name}</p>
                  <p className="text-slate-500 text-xs truncate">{review.company}</p>
                </div>
                <div className="flex items-center gap-0.5 flex-shrink-0" data-testid={`rating-testimonial-${i}`}>
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className="w-3.5 h-3.5"
                      fill={s < review.rating ? "#f59e0b" : "none"}
                      stroke={s < review.rating ? "#f59e0b" : "#d1d5db"}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {avatarColors.slice(0, 4).map((color, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full bg-gradient-to-br ${color} border-2 border-white flex items-center justify-center`}
                >
                  <span className="text-white font-bold text-[10px]">
                    {reviews[i]?.initials[0] ?? "?"}
                  </span>
                </div>
              ))}
            </div>
            <span className="text-slate-600 text-sm font-medium ml-1">
              {t.testimonials.totalClients}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
            ))}
            <span className="text-slate-700 font-semibold text-sm ml-1">{t.testimonials.avgRating}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
