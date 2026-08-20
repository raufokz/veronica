"use client";

import { FileCheck, Search, FileSignature, Key } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { buttonVariants } from "@/components/ui/button";
import { FaqSection, type FaqItem } from "@/components/faq-section";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const copy = {
  eyebrow: { en: "BUY A HOME", es: "COMPRA UNA CASA" },
  h1: { en: "Buy a home in Galleria & Sugar Land without the guesswork", es: "Compra una casa en Galleria y Sugar Land sin adivinar" },
  sub: {
    en: "Offers, inspections, financing — all explained before you sign anything. In English or in Spanish.",
    es: "Ofertas, inspecciones, financiamiento — todo explicado antes de firmar. En inglés o en español.",
  },
  cta1: { en: "Book a free 15-minute call", es: "Agenda una llamada gratis de 15 minutos" },
  stepsHeading: { en: "How a purchase actually goes", es: "Cómo funciona una compra" },
};

const steps = [
  {
    icon: FileCheck,
    title: { en: "Get pre-approved", es: "Obtén pre-aprobación" },
    body: { en: "I'll connect you with lenders I trust so you know your real budget before we start touring.", es: "Te conecto con prestamistas de confianza para que sepas tu presupuesto real antes de empezar a recorrer casas." },
  },
  {
    icon: Search,
    title: { en: "Tour with a plan", es: "Recorre con un plan" },
    body: { en: "We'll narrow it to neighborhoods that fit your commute, schools, and budget — not an endless Saturday.", es: "Reducimos la búsqueda a vecindarios que se ajusten a tu traslado, escuelas y presupuesto — no un sábado interminable." },
  },
  {
    icon: FileSignature,
    title: { en: "Make a strong offer", es: "Haz una oferta sólida" },
    body: { en: "I'll tell you what the comps actually support, so you don't overpay or lose the house on price alone.", es: "Te digo lo que realmente respaldan los comparables, para que no pagues de más ni pierdas la casa solo por el precio." },
  },
  {
    icon: Key,
    title: { en: "Close with confidence", es: "Cierre de confianza" },
    body: { en: "Inspection, appraisal, final walkthrough — I'm with you at every step until the keys are in your hand.", es: "Inspección, avalúo, recorrido final — te acompaño en cada paso hasta que las llaves estén en tu mano." },
  },
];

const faqs: FaqItem[] = [
  {
    q: { en: "Do I need a realtor to buy a new-construction home in Texas?", es: "¿Necesito un agente para comprar una casa nueva en Texas?" },
    a: {
      en: "You're not required to have one, but the builder's on-site agent represents the builder, not you. Bringing your own REALTOR® — at no cost to you, since the builder typically pays the commission — means someone is reviewing the contract for your interests.",
      es: "No es obligatorio, pero el agente del constructor en el sitio representa al constructor, no a ti. Traer tu propia REALTORA® — sin costo para ti, ya que el constructor generalmente paga la comisión — significa que alguien revisa el contrato para proteger tus intereses.",
    },
  },
  {
    q: { en: "¿Necesito hablar inglés para comprar una casa en Houston?", es: "¿Necesito hablar inglés para comprar una casa en Houston?" },
    a: {
      en: "No. I handle the entire process — showings, offers, inspections, closing — in Spanish if that's what's most comfortable for you. You shouldn't have to guess at what you're signing.",
      es: "No. Manejo todo el proceso — recorridos, ofertas, inspecciones, cierre — en español si es lo más cómodo para ti. No deberías tener que adivinar qué estás firmando.",
    },
  },
  {
    q: { en: "How much do I need for a down payment?", es: "¿Cuánto necesito para el enganche?" },
    a: {
      en: "It varies by loan type — some programs allow as little as 3% down, others require more. I'll connect you with a lender who can walk through exact numbers for your situation before we start touring homes.",
      es: "Varía según el tipo de préstamo — algunos programas permiten tan solo 3% de enganche, otros requieren más. Te conecto con un prestamista que puede revisar los números exactos para tu situación antes de empezar a ver casas.",
    },
  },
];

import { AgentPhoto } from "@/components/agent-photo";

export function BuyContent() {
  const { lang } = useLanguage();

  return (
    <>
      <section className="container-app pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <p className="eyebrow">{copy.eyebrow[lang]}</p>
            <h1 className="mt-4 h-display">{copy.h1[lang]}</h1>
            <p className="mt-6 text-[1.0625rem] leading-[1.7] text-slate max-w-[58ch]">{copy.sub[lang]}</p>
            <div className="mt-8">
              <a
                href={siteConfig.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ size: "lg" }), "rounded-full bg-brand hover:bg-brand/90 text-white px-6")}
              >
                {copy.cta1[lang]}
              </a>
            </div>
          </div>
          <div className="lg:col-span-5">
            <AgentPhoto variant="fireplace" priority className="aspect-[4/5] w-full rounded-xl border border-black/5 shadow-md" />
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
