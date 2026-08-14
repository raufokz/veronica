"use client";

import Link from "next/link";
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
  // Admin-configured overrides are English-only (site_settings has no ES column),
  // so only apply them for the English UI — Spanish always uses the dict.
  const useOverride = lang === "en";

  const headline = (useOverride && overrides?.headline) || t(dict.hero.h1, lang);
  const subtitle = (useOverride && overrides?.subtitle) || t(dict.hero.sub, lang);
  const cta1Label = (useOverride && overrides?.cta1Label) || t(dict.hero.cta1, lang);
  const cta2Label = (useOverride && overrides?.cta2Label) || t(dict.hero.cta2, lang);

  return (
    <section className="container-app pt-16 pb-20 md:pt-24 md:pb-28">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <p className="eyebrow">{t(dict.hero.eyebrow, lang)}</p>
          <h1 className="mt-4 text-[clamp(2.5rem,5vw,4.25rem)] font-semibold leading-[1.05] max-w-2xl">
            {headline}
          </h1>
          <p className="mt-6 max-w-xl text-[1.0625rem] leading-[1.7] text-slate">
            {subtitle}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={siteConfig.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: "lg" }), "rounded-full bg-brand hover:bg-brand/90 text-white px-6 h-11")}
            >
              {cta1Label}
            </a>
            <Link
              href="/home-value"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full px-6 h-11 border-ink/20")}
            >
              {cta2Label}
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            {[dict.hero.stat1, dict.hero.stat2, dict.hero.stat3].map((stat) => (
              <div
                key={stat.en}
                className="rounded-lg border border-black/10 px-4 py-2 text-sm font-medium tabular-nums"
              >
                {t(stat, lang)}
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs text-slate">{t(dict.hero.trust, lang)}</p>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="absolute -z-10 top-6 left-6 h-full w-full rounded-xl bg-sand" />
          <AgentPhoto variant="armchair" priority className="aspect-[4/5] w-full rounded-xl border border-black/5 shadow-lg" />
        </div>
      </div>
    </section>
  );
}
