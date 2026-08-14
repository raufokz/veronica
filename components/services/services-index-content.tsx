"use client";

import Link from "next/link";
import { Home, TrendingUp, BarChart3 } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const copy = {
  eyebrow: { en: "HOW I HELP", es: "CÓMO AYUDO" },
  h1: { en: "Buy, sell, or invest — with a plan built for it", es: "Comprar, vender o invertir — con un plan hecho para eso" },
  buying: {
    title: { en: "Buying a home", es: "Comprar una casa" },
    body: {
      en: "From the first Saturday of showings to the day you get the keys — offers, inspections, financing, all of it explained before you sign it.",
      es: "Desde el primer sábado de recorridos hasta el día que recibes las llaves — ofertas, inspecciones, financiamiento, todo explicado antes de firmar.",
    },
    cta: { en: "See the buyer's guide", es: "Ver la guía del comprador" },
    href: "/services/buy-a-home",
  },
  selling: {
    title: { en: "Selling a home", es: "Vender una casa" },
    body: {
      en: "Pricing backed by real comps, photography that makes people stop scrolling, and negotiation that protects your number.",
      es: "Precios respaldados por comparables reales, fotografía que detiene el scroll, y negociación que protege tu número.",
    },
    cta: { en: "See the seller's guide", es: "Ver la guía del vendedor" },
    href: "/services/sell-your-home",
  },
  investing: {
    title: { en: "Investing", es: "Invertir" },
    body: {
      en: "Rental math, neighbourhood trajectory, and honest answers about which properties aren't worth your capital. I'll run the numbers with you before you make an offer — cash flow, cap rate, and what the neighborhood looks like in five years.",
      es: "Números de renta, la trayectoria del vecindario, y respuestas honestas sobre qué propiedades no valen tu capital. Reviso los números contigo antes de hacer una oferta — flujo de caja, tasa de capitalización, y cómo se ve el vecindario en cinco años.",
    },
    cta: { en: "Talk investing strategy", es: "Hablar de estrategia de inversión" },
    href: "/contact",
  },
};

export function ServicesIndexContent() {
  const { lang } = useLanguage();
  const sections = [copy.buying, copy.selling, copy.investing];
  const icons = [Home, TrendingUp, BarChart3];

  return (
    <div className="container-app section-pad space-y-20">
      <div className="max-w-2xl">
        <p className="eyebrow">{copy.eyebrow[lang]}</p>
        <h1 className="mt-4 text-[clamp(2.5rem,5vw,4.25rem)] font-semibold leading-[1.05]">{copy.h1[lang]}</h1>
      </div>

      {sections.map((section, i) => {
        const Icon = icons[i];
        return (
          <div key={section.title.en} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start border-t border-black/10 pt-12">
            <div className="md:col-span-1">
              <Icon className="size-7 text-brand" />
            </div>
            <div className="md:col-span-7">
              <h2 className="font-display text-2xl">{section.title[lang]}</h2>
              <p className="mt-3 text-slate leading-relaxed">{section.body[lang]}</p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <Link
                href={section.href}
                className={cn(buttonVariants({ variant: "outline" }), "rounded-full px-5 border-ink/20")}
              >
                {section.cta[lang]}
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
