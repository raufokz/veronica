"use client";

import Link from "next/link";
import { DollarSign, Camera, Handshake, Key } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { buttonVariants } from "@/components/ui/button";
import { FaqSection, type FaqItem } from "@/components/faq-section";
import { cn } from "@/lib/utils";

const copy = {
  eyebrow: { en: "SELL YOUR HOME", es: "VENDE TU CASA" },
  h1: { en: "Sell your Houston home for what it's actually worth", es: "Vende tu casa en Houston por lo que realmente vale" },
  sub: {
    en: "Real comps, photography that stops the scroll, and negotiation that protects your number — not a sign in the yard and a prayer.",
    es: "Comparables reales, fotografía que detiene el scroll, y negociación que protege tu número — no solo un letrero en el jardín y suerte.",
  },
  cta1: { en: "Get my home value", es: "Conoce el valor de mi casa" },
  cta2: { en: "Talk to Veronica", es: "Habla con Veronica" },
  stepsHeading: { en: "How a sale actually goes", es: "Cómo funciona una venta" },
};

const steps = [
  {
    icon: DollarSign,
    title: { en: "Price it right", es: "Precio correcto" },
    body: { en: "A comparative market analysis using real, recent sales in your zip code — not an algorithm's guess.", es: "Un análisis comparativo de mercado usando ventas reales y recientes en tu código postal — no la suposición de un algoritmo." },
  },
  {
    icon: Camera,
    title: { en: "Market it well", es: "Buen marketing" },
    body: { en: "Professional photography, a listing that reads like a story, and syndication everywhere buyers actually look.", es: "Fotografía profesional, una descripción que se lee como una historia, y distribución en todos los lugares donde los compradores realmente buscan." },
  },
  {
    icon: Handshake,
    title: { en: "Negotiate hard", es: "Negociar con firmeza" },
    body: { en: "Every offer gets read line by line. I tell you what's real leverage and what's a bluff.", es: "Cada oferta se lee línea por línea. Te digo qué es ventaja real y qué es un farol." },
  },
  {
    icon: Key,
    title: { en: "Close clean", es: "Cierre sin sorpresas" },
    body: { en: "Inspection, appraisal, title — I track every deadline so nothing surprises you at the closing table.", es: "Inspección, avalúo, título — sigo cada plazo para que nada te sorprenda en la mesa de cierre." },
  },
];

const faqs: FaqItem[] = [
  {
    q: { en: "How much does it cost to sell a house in Houston?", es: "¿Cuánto cuesta vender una casa en Houston?" },
    a: {
      en: "Typical costs include the agent commission (negotiated per listing), title fees, and any repairs a buyer requests after inspection. I'll walk through your specific numbers before you list, so there are no surprises at closing.",
      es: "Los costos típicos incluyen la comisión del agente (negociada por cada listado), tarifas de título, y cualquier reparación que el comprador solicite tras la inspección. Reviso tus números específicos antes de listar, para que no haya sorpresas en el cierre.",
    },
  },
  {
    q: { en: "How long does it take to sell a home in Clear Lake?", es: "¿Cuánto tiempo toma vender una casa en Clear Lake?" },
    a: {
      en: "It depends on price point and condition, but well-priced homes in Clear Lake typically go under contract within a few weeks. I'll give you a realistic timeline based on current comps when we meet.",
      es: "Depende del precio y la condición, pero las casas bien valoradas en Clear Lake típicamente reciben una oferta en unas pocas semanas. Te daré un cronograma realista basado en comparables actuales cuando nos reunamos.",
    },
  },
  {
    q: { en: "Do I need to make repairs before listing?", es: "¿Necesito hacer reparaciones antes de listar?" },
    a: {
      en: "Not always. Some repairs pay for themselves in a higher sale price; others don't. I'll walk the house with you and tell you honestly which is which before you spend a dollar.",
      es: "No siempre. Algunas reparaciones se pagan solas con un precio de venta más alto; otras no. Recorro la casa contigo y te digo honestamente cuáles son cuáles antes de que gastes un dólar.",
    },
  },
];

import { AgentPhoto } from "@/components/agent-photo";

export function SellContent() {
  const { lang } = useLanguage();

  return (
    <>
      <section className="container-app pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <p className="eyebrow">{copy.eyebrow[lang]}</p>
            <h1 className="mt-4 text-[clamp(2.5rem,5vw,4.25rem)] font-semibold leading-[1.05]">{copy.h1[lang]}</h1>
            <p className="mt-6 text-[1.0625rem] leading-[1.7] text-slate">{copy.sub[lang]}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/home-value" className={cn(buttonVariants({ size: "lg" }), "rounded-full bg-brand hover:bg-brand/90 text-white px-6")}>
                {copy.cta1[lang]}
              </Link>
              <Link href="/contact" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full px-6 border-ink/20")}>
                {copy.cta2[lang]}
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <AgentPhoto variant="luxury" priority className="aspect-[4/5] w-full rounded-xl border border-black/5 shadow-md" />
          </div>
        </div>
      </section>

      <section className="bg-sand section-pad">
        <div className="container-app">
          <h2 className="font-display text-2xl">{copy.stepsHeading[lang]}</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.title.en} className="rounded-xl border border-black/10 bg-white p-6">
                <step.icon className="size-6 text-brand" />
                <h3 className="mt-4 font-display text-lg">{step.title[lang]}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{step.body[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FaqSection items={faqs} />
    </>
  );
}
