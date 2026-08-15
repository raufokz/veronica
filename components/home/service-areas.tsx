"use client";

import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { dict, t } from "@/lib/dict";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export function ServiceAreas() {
  const { lang } = useLanguage();

  return (
    <section className="section-pad bg-sand">
      <div className="container-app">
        <Reveal>
          <p className="eyebrow">{t(dict.areas.eyebrow, lang)}</p>
          <h2 className="mt-3 max-w-[20ch] text-balance h-section">
            {t(dict.areas.h2, lang)}
          </h2>
          <p className="mt-4 max-w-[58ch] leading-relaxed text-slate">{t(dict.areas.sub, lang)}</p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {dict.areas.groups.map((group, i) => (
            <Reveal key={group.zips} delay={i * 0.08}>
              <Link
                href={`/listings?neighborhood=${encodeURIComponent(group.name.en)}`}
                className="group flex h-full flex-col rounded-2xl border border-black/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-lg"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                  <MapPin className="size-5" />
                </span>

                <h3 className="mt-4 h-card">{group.name[lang]}</h3>

                <p className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-slate">
                  {t(dict.areas.zipLabel, lang)}
                </p>
                <p className="mt-1 tabular-nums text-sm font-semibold text-brand">{group.zips}</p>

                <p className="mt-4 flex-1 text-sm leading-relaxed text-slate">{group.blurb[lang]}</p>

                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                  {t(dict.areas.cta, lang)}
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-8">
            <Link
              href="/neighborhoods"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-full px-6"
              )}
            >
              {lang === "es" ? "Ver todos los vecindarios" : "Browse all neighborhoods"}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
