"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { dict, t } from "@/lib/dict";
import { buttonVariants } from "@/components/ui/button";
import { AgentPhoto } from "@/components/agent-photo";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const ticks = [
  { en: `Licensed Texas REALTOR® — TREC #${siteConfig.trecLicense}`, es: `REALTOR® con licencia en Texas — TREC #${siteConfig.trecLicense}` },
  { en: "Houston Association of REALTORS® member", es: "Miembro de la Asociación de REALTORES® de Houston" },
  { en: "Bilingual — English & Español", es: "Bilingüe — Inglés y Español" },
  { en: "Houston, Clear Lake & Bay Area specialist", es: "Especialista en Houston, Clear Lake y Bay Area" },
  { en: "10+ years, buyers · sellers · investors", es: "10+ años, compradores · vendedores · inversionistas" },
];

const body = {
  en: "Ten years, hundreds of closings, and a licence I take seriously. I've sat at the table when a first-time buyer got outbid twice and won on the third. What I do isn't magic — it's local knowledge, honest math, and answering the phone.",
  es: "Diez años, cientos de cierres, y una licencia que tomo en serio. He estado en la mesa cuando un comprador primerizo perdió dos ofertas y ganó en la tercera. Lo que hago no es magia — es conocimiento local, matemáticas honestas, y contestar el teléfono.",
};

export function AboutPreview() {
  const { lang } = useLanguage();

  return (
    <section className="section-pad bg-white">
      <div className="container-app grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <AgentPhoto variant="luxury" className="aspect-[4/5] w-full rounded-xl border border-black/5 shadow-md order-2 lg:order-1" />

        <div className="order-1 lg:order-2">
          <p className="eyebrow">{t(dict.about.eyebrow, lang)}</p>
          <h2 className="mt-3 text-[clamp(2rem,3.5vw,3rem)] font-semibold">{t(dict.about.h2, lang)}</h2>
          <p className="mt-5 text-[1.0625rem] leading-[1.7] text-slate">{t(body, lang)}</p>

          <ul className="mt-6 space-y-3">
            {ticks.map((tick) => (
              <li key={tick.en} className="flex items-start gap-3 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-gold" />
                <span>{t(tick, lang)}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/about"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "mt-8 rounded-full px-6 border-ink/20")}
          >
            {t(dict.about.cta, lang)}
          </Link>
        </div>
      </div>
    </section>
  );
}
