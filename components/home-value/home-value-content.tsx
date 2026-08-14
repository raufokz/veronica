"use client";

import { Star } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { HomeValueBand } from "@/components/home/home-value-band";
import { AgentPhoto } from "@/components/agent-photo";

const factors = [
  {
    title: { en: "Recent comparable sales", es: "Ventas comparables recientes" },
    body: {
      en: "What homes like yours actually closed for in the last 90 days — not last year, not an estimate.",
      es: "Por cuánto se cerraron realmente casas como la tuya en los últimos 90 días — no el año pasado, no una estimación.",
    },
  },
  {
    title: { en: "Condition & updates", es: "Condición y actualizaciones" },
    body: {
      en: "A new roof or renovated kitchen can move your number more than square footage does.",
      es: "Un techo nuevo o una cocina renovada puede mover tu número más que los metros cuadrados.",
    },
  },
  {
    title: { en: "Current buyer demand", es: "Demanda actual de compradores" },
    body: {
      en: "How many buyers are actively looking in your neighborhood right now, and how fast homes are moving.",
      es: "Cuántos compradores están buscando activamente en tu vecindario ahora mismo, y qué tan rápido se venden las casas.",
    },
  },
];

const comparison = {
  heading: { en: "Automated estimate vs. a real CMA", es: "Estimación automática vs. un CMA real" },
  automated: {
    title: { en: "Automated estimate", es: "Estimación automática" },
    body: {
      en: "Pulls public records and recent sales through an algorithm that's never seen your house. Often off by 5–15%.",
      es: "Toma registros públicos y ventas recientes con un algoritmo que nunca ha visto tu casa. A menudo se equivoca por 5–15%.",
    },
  },
  cma: {
    title: { en: "Veronica's CMA", es: "El CMA de Veronica" },
    body: {
      en: "A licensed agent who's sold in your zip code walks your home, weighs condition and upgrades, and prices it to what buyers are actually paying.",
      es: "Una agente con licencia que ha vendido en tu código postal recorre tu casa, evalúa la condición y las mejoras, y la valora según lo que los compradores realmente están pagando.",
    },
  },
};

const testimonial = {
  quote: {
    en: "Veronica's professionalism and dedication were evident throughout the sale of our home. She exceeded our expectations in every way.",
    es: "El profesionalismo y la dedicación de Veronica fueron evidentes durante toda la venta de nuestra casa. Superó nuestras expectativas en todo sentido.",
  },
  author: "Michelle L.",
  type: { en: "Home sale", es: "Venta de casa" },
};

export function HomeValueContent() {
  const { lang } = useLanguage();

  return (
    <>
      <HomeValueBand sourcePage="/home-value" />

      <section className="section-pad bg-white">
        <div className="container-app">
          <h2 className="font-display text-2xl">
            {lang === "es" ? "Qué mueve realmente tu número" : "What actually moves your number"}
          </h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {factors.map((f) => (
              <div key={f.title.en} className="rounded-xl border border-black/10 p-6">
                <h3 className="font-display text-lg">{f.title[lang]}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{f.body[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-sand">
        <div className="container-app">
          <h2 className="font-display text-2xl">{comparison.heading[lang]}</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="rounded-xl border border-black/10 bg-white p-6">
              <h3 className="font-display text-lg text-slate">{comparison.automated.title[lang]}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{comparison.automated.body[lang]}</p>
            </div>
            <div className="rounded-xl border-2 border-brand bg-white p-6">
              <h3 className="font-display text-lg">{comparison.cma.title[lang]}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{comparison.cma.body[lang]}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink text-white py-16">
        <div className="container-app grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-gold text-gold" />
              ))}
            </div>
            <p className="mt-4 text-lg leading-relaxed text-white/90">&ldquo;{testimonial.quote[lang]}&rdquo;</p>
            <p className="mt-4 text-sm text-white/50">
              {testimonial.author} · {testimonial.type[lang]}
            </p>
          </div>
          <div className="lg:col-span-4 hidden lg:block">
            <AgentPhoto variant="headshot" className="aspect-square size-36 rounded-full border-2 border-gold/40 mx-auto" />
          </div>
        </div>
      </section>
    </>
  );
}
