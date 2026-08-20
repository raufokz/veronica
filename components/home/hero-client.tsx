"use client";

import { useEffect, useState } from "react";
import { Phone, Mail, ArrowRight, MapPin, MessageSquare } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";
import { dict, t } from "@/lib/dict";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type HeroOverrides = {
  headline?: string;
  subtitle?: string;
  cta1Label?: string;
  cta2Label?: string;
};

const bgImages = [
  "/hero_luxury_lounge.png",
  "/hero_lounge_2.png",
  "/hero_lounge_3.png",
  "/hero_lounge_4.png",
];

export function HeroClient({ overrides: _overrides }: { overrides?: HeroOverrides } = {}) {
  const { lang } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Background slider loop every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bgImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full relative pb-10">
      {/* Background Image Carousel Container */}
      <div className="relative w-full h-[550px] sm:h-[650px] md:h-[700px] lg:h-[750px] overflow-hidden bg-ink">
        {bgImages.map((src, index) => (
          <div
            key={src}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-in-out",
              index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
            )}
          >
            <Image
              src={src}
              alt={`Luxury Room View ${index + 1}`}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover object-center transition-transform duration-[5s] ease-linear"
            />
          </div>
        ))}

        {/* Backdrop overlay for dark contrast */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Content Card Overlay */}
        <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6">
          <div className="w-full max-w-4xl bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-10 text-center text-white shadow-2xl animate-fade-in">
            {/* Tagline / Eyebrow */}
            <p className="font-display text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#c5a059] uppercase mb-4">
              {t(dict.hero.eyebrow, lang)}
            </p>

            {/* Headline */}
            <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight uppercase max-w-[28ch] mx-auto">
              {t(dict.hero.h1, lang)}
            </h1>

            {/* Description Subtitle */}
            <p className="mt-4 text-xs sm:text-sm md:text-base leading-relaxed text-white/80 max-w-[55ch] mx-auto">
              {t(dict.hero.sub, lang)}
            </p>

            {/* CTA Option Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4">
              <a
                href={siteConfig.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "w-full sm:w-auto rounded-none bg-[#b4934c] hover:bg-[#a3823b] text-white px-8 h-11 text-xs font-semibold uppercase tracking-widest transition-all inline-flex items-center justify-center gap-2"
                )}
              >
                <span>{t(dict.hero.cta1, lang)}</span>
                <ArrowRight className="size-3.5" />
              </a>

              <Link
                href="/home-value"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "w-full sm:w-auto rounded-none border-white/40 text-white bg-transparent hover:bg-white hover:text-ink px-8 h-11 text-xs font-semibold uppercase tracking-widest transition-all inline-flex items-center justify-center"
                )}
              >
                {t(dict.hero.cta2, lang)}
              </Link>
            </div>

            {/* Map Pin Served Zipcodes Badge matching mockup */}
            <div className="mt-8 mx-auto max-w-2xl bg-black/55 backdrop-blur-md rounded-xl p-4 border border-white/10 flex items-start gap-4 text-left">
              <div className="bg-[#b4934c] p-2 rounded-lg text-white shrink-0 mt-0.5">
                <MapPin className="size-5" />
              </div>
              <div>
                <p className="text-[10px] tracking-[0.15em] font-bold text-white/40 uppercase leading-none mb-1.5">
                  {lang === "es" ? "ÁREAS Y CÓDIGOS POSTALES SERVIDOS" : "AREAS & ZIP CODES SERVED"}
                </p>
                <p className="text-xs font-semibold text-white/90 leading-relaxed uppercase tracking-wider">
                  <span className="text-[#c5a059] font-bold">Galleria:</span> 77056, 77057
                  <span className="text-white/20 px-2">|</span>
                  <span className="text-[#c5a059] font-bold">Sugar Land:</span> 77478, 77479, 77096, 77098
                  <span className="text-white/20 px-2">|</span>
                  <span className="text-[#c5a059] font-bold">University:</span> 77030, 77025, 77005, 77401
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Floating Action Bar (Call, Text, Email) overlapping page.tsx transition */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[90%] max-w-4xl bg-white shadow-xl rounded-xl border border-black/5 py-4 px-6 z-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-black/10 gap-4 text-center">
          {/* Call Column */}
          <a
            href={`tel:${siteConfig.phone}`}
            className="flex flex-row items-center justify-center gap-3 py-2 sm:py-0 hover:opacity-75 transition-opacity cursor-pointer text-ink"
          >
            <Phone className="size-5 text-[#c5a059] shrink-0" />
            <div className="text-left">
              <p className="text-[10px] font-bold tracking-widest text-slate uppercase leading-none mb-1">Call</p>
              <p className="text-xs sm:text-sm font-semibold text-ink leading-tight">{siteConfig.phoneDisplay}</p>
            </div>
          </a>

          {/* Text Column */}
          <a
            href={`sms:${siteConfig.phone}`}
            className="flex flex-row items-center justify-center gap-3 py-2 sm:py-0 hover:opacity-75 transition-opacity cursor-pointer text-ink"
          >
            <MessageSquare className="size-5 text-[#c5a059] shrink-0" />
            <div className="text-left">
              <p className="text-[10px] font-bold tracking-widest text-slate uppercase leading-none mb-1">Text</p>
              <p className="text-xs sm:text-sm font-semibold text-ink leading-tight">{siteConfig.phoneDisplay}</p>
            </div>
          </a>

          {/* Email Column */}
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex flex-row items-center justify-center gap-3 py-2 sm:py-0 hover:opacity-75 transition-opacity cursor-pointer text-ink"
          >
            <Mail className="size-5 text-[#c5a059] shrink-0" />
            <div className="text-left">
              <p className="text-[10px] font-bold tracking-widest text-slate uppercase leading-none mb-1">Email</p>
              <p className="text-xs sm:text-sm font-semibold text-ink leading-tight truncate max-w-[200px] sm:max-w-none">{siteConfig.email}</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
