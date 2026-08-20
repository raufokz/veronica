"use client";

import { MapPin, UserCheck, TrendingUp, Heart } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { Reveal } from "@/components/reveal";

const content = {
  eyebrow: {
    en: "WHY WORK WITH ME?",
    es: "¿POR QUÉ TRABAJAR CONMIGO?",
  },
  heading: {
    en: "Local expertise. Personal service. Results that move you forward.",
    es: "Experiencia local. Servicio personalizado. Resultados que te impulsan.",
  },
  cards: [
    {
      icon: MapPin,
      title: { en: "Local Expertise", es: "Experiencia Local" },
      description: {
        en: "Deep knowledge of Houston and Sugar Land neighborhoods and market trends.",
        es: "Conocimiento profundo de los vecindarios y tendencias del mercado de Houston y Sugar Land.",
      },
    },
    {
      icon: UserCheck,
      title: { en: "Personalized Service", es: "Servicio Personalizado" },
      description: {
        en: "I listen, guide and negotiate for your best outcome.",
        es: "Escucho, guío y negocio para lograr el mejor acuerdo para ti.",
      },
    },
    {
      icon: TrendingUp,
      title: { en: "Proven Results", es: "Resultados Probados" },
      description: {
        en: "Skilled marketing and styling negotiate for the maximum value.",
        es: "Marketing hábil y decoración para negociar por el máximo valor.",
      },
    },
    {
      icon: Heart,
      title: { en: "Always Available", es: "Siempre Disponible" },
      description: {
        en: "I'm here when you need me, before, during and after your transaction.",
        es: "Estoy aquí cuando me necesitas, antes, durante y después de la transacción.",
      },
    },
  ],
};

export function WhyVeronica() {
  const { lang } = useLanguage();

  return (
    <section className="py-20 bg-white border-b border-black/5" id="why-work-with-me">
      <div className="container-app max-w-5xl px-4 md:px-8">
        
        {/* Title Block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Reveal>
            <p className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#c5a059] uppercase mb-3">
              {lang === "es" ? content.eyebrow.es : content.eyebrow.en}
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-ink uppercase leading-tight">
              {lang === "es" ? content.heading.es : content.heading.en}
            </h2>
          </Reveal>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <Reveal key={i} delay={i * 0.05}>
                <div className="flex flex-col items-center text-center group">
                  {/* Circular Gold Icon Badge */}
                  <div className="flex size-14 items-center justify-center rounded-full border border-[#c5a059]/40 bg-[#fefdfa] text-[#c5a059] transition-transform duration-300 group-hover:scale-105 mb-5 shadow-sm">
                    <Icon className="size-6" />
                  </div>

                  {/* Card Title */}
                  <h3 className="font-display text-base font-bold text-ink uppercase tracking-wider mb-2.5">
                    {lang === "es" ? card.title.es : card.title.en}
                  </h3>

                  {/* Card Description */}
                  <p className="text-xs sm:text-sm leading-relaxed text-slate font-medium max-w-[28ch]">
                    {lang === "es" ? card.description.es : card.description.en}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
