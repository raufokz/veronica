"use client";

import { Home, TrendingUp, BarChart3, Users } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { dict, t } from "@/lib/dict";

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
    <section className="section-pad bg-sand">
      <div className="container-app">
        <p className="eyebrow">{t(dict.services.eyebrow, lang)}</p>
        <h2 className="mt-3 text-[clamp(2rem,3.5vw,3rem)] font-semibold max-w-xl">{t(dict.services.h2, lang)}</h2>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(({ icon: Icon, key }) => (
            <div
              key={key}
              className="rounded-xl border border-black/10 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_2px_12px_rgb(22_22_18_/_0.06)]"
            >
              <Icon className="size-6 text-brand" />
              <h3 className="mt-4 font-display text-lg">{t(dict.services[key].title, lang)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{t(dict.services[key].copy, lang)}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((key, i) => (
            <div key={key} className="relative">
              <div className="flex items-center gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ink text-white text-sm font-semibold tabular-nums">
                  {i + 1}
                </span>
                {i < processSteps.length - 1 && (
                  <span className="hidden lg:block h-px flex-1 bg-black/10" aria-hidden />
                )}
              </div>
              <h4 className="mt-3 font-display text-base">{t(dict.services.process[key].title, lang)}</h4>
              <p className="mt-1 text-sm leading-relaxed text-slate">{t(dict.services.process[key].copy, lang)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
