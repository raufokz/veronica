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
import { Reveal } from "@/components/reveal";

const AUTOPLAY_INTERVAL_MS = 6000;

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
    <section id="testimonials" className="bg-[#161612] text-white py-20 border-b border-black/5">
      <div className="container-app max-w-5xl px-4 md:px-8">
        
        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading and Rating Summary (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Reveal>
              <p className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#c5a059] uppercase mb-3">
                {lang === "es" ? "LO QUE DICEN LOS CLIENTES" : "WHAT CLIENTS SAY"}
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white uppercase leading-snug mb-6">
                {lang === "es" ? "Historias reales de clientes reales." : "Real stories from real clients."}
              </h2>
            </Reveal>

            {/* Stars Summary */}
            <Reveal delay={0.05}>
              <div className="flex flex-col gap-2">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4.5 fill-[#c5a059] text-[#c5a059]" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm font-semibold tracking-wider text-white/70 uppercase">
                  {lang === "es" ? "Calificación promedio de 5.0" : "5.0 average rating"}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Cards Carousel (8 Cols) */}
          <div className="lg:col-span-8 w-full">
            <Reveal delay={0.1}>
              <Carousel
                className="w-full"
                opts={{ loop: true, align: "start" }}
                setApi={setApi}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >
                <CarouselContent className="-ml-4">
                  {testimonials.map((testimonial) => (
                    <CarouselItem key={testimonial.id} className="pl-4 basis-full sm:basis-1/2">
                      <div className="h-full rounded-2xl bg-white p-6 sm:p-8 flex flex-col justify-between text-ink border border-black/5 shadow-md">
                        <div>
                          {/* 5 Stars */}
                          <div className="flex gap-1 mb-4">
                            {Array.from({ length: testimonial.rating ?? 5 }).map((_, i) => (
                              <Star key={i} className="size-3.5 fill-[#c5a059] text-[#c5a059]" />
                            ))}
                          </div>
                          {/* Content */}
                          <p className="text-xs sm:text-sm leading-relaxed text-ink/90 font-medium italic">
                            &ldquo;{testimonial.content}&rdquo;
                          </p>
                        </div>
                        {/* Author */}
                        <p className="mt-5 text-xs font-bold text-slate uppercase tracking-wider border-t border-black/5 pt-3.5">
                          {testimonial.client_name}
                          {testimonial.transaction_type ? ` · ${testimonial.transaction_type}` : ""}
                        </p>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                
                {/* Carousel Controls */}
                <div className="mt-8 flex gap-3 justify-end">
                  <CarouselPrevious className="static translate-y-0 h-9 w-9 bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white" />
                  <CarouselNext className="static translate-y-0 h-9 w-9 bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white" />
                </div>
              </Carousel>
            </Reveal>
          </div>

        </div>

      </div>
    </section>
  );
}
