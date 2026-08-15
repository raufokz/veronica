"use client";

import Link from "next/link";
import { MapPin, PhoneCall, CheckCircle2, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { dict, t } from "@/lib/dict";
import { buttonVariants } from "@/components/ui/button";
import { AgentPhoto } from "@/components/agent-photo";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export type HeroOverrides = {
  headline?: string;
  subtitle?: string;
  cta1Label?: string;
  cta2Label?: string;
};

export function HeroClient({ overrides }: { overrides?: HeroOverrides }) {
  const { lang } = useLanguage();
  const useOverride = lang === "en";

  const headline = (useOverride && overrides?.headline) || t(dict.hero.h1, lang);
  const subtitle = (useOverride && overrides?.subtitle) || t(dict.hero.sub, lang);
  const cta1Label = (useOverride && overrides?.cta1Label) || t(dict.hero.cta1, lang);
  const cta2Label = (useOverride && overrides?.cta2Label) || t(dict.hero.cta2, lang);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sand/50 via-paper to-paper pt-12 pb-16 md:pt-20 md:pb-24">
      <div className="container-app">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text, Zip Code Chips & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand border border-brand/20">
              <MapPin className="size-3.5 text-brand" />
              <span>{t(dict.hero.eyebrow, lang)}</span>
            </div>

            {/* Headline */}
            <h1 className="mt-5 max-w-[15ch] text-balance font-display text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.05] tracking-[-0.03em] text-ink">
              {headline}
            </h1>

            {/* Subtitle */}
            <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-slate md:text-lg">
              {subtitle}
            </p>

            {/* Target Zip Codes & Areas Chips */}
            <div className="mt-6 w-full max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate/80 mb-2.5">
                {t(dict.hero.zipCodesTitle, lang)}
              </p>
              <div className="flex flex-wrap gap-2">
                {dict.hero.zips.map((item) => (
                  <Link
                    key={item.zip}
                    href={`/listings?neighborhood=${encodeURIComponent(item.name)}`}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-black/10 bg-white px-4 text-xs font-medium text-ink shadow-xs transition-colors duration-200 hover:border-brand hover:text-brand lg:min-h-9"
                  >
                    <span className="font-semibold">{item.name}</span>
                    <span className="tabular-nums text-slate">{item.zip}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={siteConfig.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "rounded-full bg-brand hover:bg-brand/90 text-white px-7 h-12 text-sm font-semibold shadow-md transition-all hover:scale-[1.02] flex items-center gap-2"
                )}
              >
                <span>{cta1Label}</span>
                <ArrowRight className="size-4" />
              </a>

              <Link
                href="/home-value"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "rounded-full px-7 h-12 text-sm font-semibold border-ink/20 hover:bg-sand text-ink transition-all"
                )}
              >
                {cta2Label}
              </Link>
            </div>

            {/* Key Stats Bar */}
            <div className="mt-10 pt-6 border-t border-black/10 w-full max-w-2xl grid grid-cols-3 gap-4">
              <div className="flex flex-col">
                <span className="font-display text-xl md:text-2xl font-bold text-ink">10+</span>
                <span className="text-xs text-slate font-medium">{t(dict.hero.stat1, lang)}</span>
              </div>
              <div className="flex flex-col border-l border-black/10 pl-4">
                <span className="font-display text-xl md:text-2xl font-bold text-ink">100+</span>
                <span className="text-xs text-slate font-medium">{t(dict.hero.stat2, lang)}</span>
              </div>
              <div className="flex flex-col border-l border-black/10 pl-4">
                <span className="font-display text-xl md:text-2xl font-bold text-brand">EN / ES</span>
                <span className="text-xs text-slate font-medium">{t(dict.hero.stat3, lang)}</span>
              </div>
            </div>

            {/* Trust Line */}
            <p className="mt-5 text-xs text-slate flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5 text-brand shrink-0" />
              <span>{t(dict.hero.trust, lang)}</span>
            </p>

          </div>

          {/* Right Column: Veronica's Official Portrait Card (`veronica.jpg`) */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[420px]">
              
              {/* Decorative Sand Backdrop Card */}
              <div className="absolute -z-10 -bottom-4 -right-4 h-full w-full rounded-2xl bg-sand border border-black/5" />
              
              {/* Main Photo Container */}
              <div className="relative rounded-2xl overflow-hidden border border-black/10 bg-white shadow-xl aspect-[4/5] group">
                <AgentPhoto
                  variant="headshot"
                  priority
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
                
                {/* Floating Top Badge */}
                <div className="absolute top-4 right-4 rounded-full bg-white/90 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold text-ink shadow-md border border-black/5 flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-emerald-500" />
                  <span>Bilingual REALTOR®</span>
                </div>

                {/* Floating Bottom Zipcode Card */}
                <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-ink/90 backdrop-blur-md p-3.5 text-white shadow-lg border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-brand text-white shrink-0">
                      <PhoneCall className="size-4" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-semibold text-white/90">Veronica Medellin</span>
                      <span className="text-[11px] tabular-nums text-white/60">
                        {siteConfig.serviceZips.join(" · ")}
                      </span>
                    </div>
                  </div>
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="inline-flex min-h-11 items-center rounded-full px-3 text-xs font-bold text-brand transition-colors hover:bg-white/10 hover:underline lg:min-h-9"
                    aria-label={`Call Veronica at ${siteConfig.phoneDisplay}`}
                  >
                    Call
                  </a>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
