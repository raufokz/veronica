"use client";

import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { dict, t } from "@/lib/dict";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import type { Testimonial } from "@/types/supabase";

const AUTOPLAY_INTERVAL_MS = 5000;

export function TestimonialsClient({ testimonials }: { testimonials: Testimonial[] }) {
  const { lang } = useLanguage();
  const [api, setApi] = useState<CarouselApi>();
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  useEffect(() => {
    if (!api || testimonials.length <= 1) return;
    const id = window.setInterval(() => {
      if (!pausedRef.current) api.scrollNext();
    }, AUTOPLAY_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [api, testimonials.length]);

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="bg-ink text-white section-pad">
      <div className="container-app">
        <p className="eyebrow text-white/50">{t(dict.testimonials.eyebrow, lang)}</p>
        <h2 className="mt-3 text-[clamp(2rem,3.5vw,3rem)] font-semibold max-w-xl">
          {t(dict.testimonials.h2, lang)}
        </h2>

        <Carousel
          className="mt-10 w-full max-w-3xl"
          opts={{ loop: true }}
          setApi={setApi}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id}>
                <div className="rounded-xl border border-white/10 bg-white/5 p-8">
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating ?? 5 }).map((_, i) => (
                      <Star key={i} className="size-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="mt-4 text-lg leading-relaxed text-white/90">&ldquo;{testimonial.content}&rdquo;</p>
                  <p className="mt-4 text-sm text-white/50">
                    {testimonial.client_name}
                    {testimonial.transaction_type ? ` · ${testimonial.transaction_type}` : ""}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-6 flex gap-3">
            <CarouselPrevious className="static translate-y-0 bg-transparent border-white/20 text-white hover:bg-white/10" />
            <CarouselNext className="static translate-y-0 bg-transparent border-white/20 text-white hover:bg-white/10" />
          </div>
        </Carousel>

        <p className="mt-6 text-sm text-white/50">{t(dict.testimonials.readMore, lang)}</p>
      </div>
    </section>
  );
}
