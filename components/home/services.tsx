"use client";

import { Home, TrendingUp, BarChart3, Users } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { dict, t } from "@/lib/dict";
import { Reveal } from "@/components/reveal";

const services = [
  { icon: Home, key: "buying" as const },
  { icon: TrendingUp, key: "selling" as const },
  { icon: BarChart3, key: "investing" as const },
  { icon: Users, key: "guidance" as const },
];

const processSteps = ["step1", "step2", "step3", "step4"] as const;

export function Services() {
  const { lang } = useLanguage();

  return (
    <section className="py-20 bg-[#faf9f6] border-b border-black/5" id="services-section">
      <div className="container-app max-w-5xl px-4 md:px-8">
        
        {/* Header Block */}
        <Reveal>
          <div className="max-w-xl mb-12">
            <p className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#c5a059] uppercase mb-3">
              {t(dict.services.eyebrow, lang)}
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-ink uppercase leading-tight">
              {t(dict.services.h2, lang)}
            </h2>
          </div>
        </Reveal>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(({ icon: Icon, key }, i) => (
            <Reveal key={key} delay={i * 0.05} className="h-full">
              <div className="group h-full rounded-2xl border border-black/5 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#c5a059]/30 hover:shadow-md flex flex-col">
                <div className="flex size-11 items-center justify-center rounded-xl bg-[#faf9f6]/80 text-[#c5a059] transition-transform duration-300 group-hover:scale-105 mb-4">
                  <Icon className="size-5" />
                </div>
                <h3 className="font-display text-base font-bold text-ink uppercase tracking-wider mb-2">
                  {t(dict.services[key].title, lang)}
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-slate font-medium">
                  {t(dict.services[key].copy, lang)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* 4 Steps Section */}
        <Reveal delay={0.1}>
          <div className="mt-16 pt-12 border-t border-black/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((key, i) => (
              <div key={key} className="relative flex flex-col items-start">
                <div className="flex items-center gap-3 w-full">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-ink text-white text-xs font-bold tabular-nums">
                    {i + 1}
                  </span>
                  {i < processSteps.length - 1 && (
                    <span className="hidden lg:block h-px flex-1 bg-black/10" aria-hidden />
                  )}
                </div>
                <h4 className="mt-4 font-display text-xs sm:text-sm font-bold text-ink uppercase tracking-wider mb-1.5">
                  {t(dict.services.process[key].title, lang)}
                </h4>
                <p className="text-xs sm:text-sm leading-relaxed text-slate font-medium max-w-[24ch]">
                  {t(dict.services.process[key].copy, lang)}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

      </div>
    </section>
  );
}
