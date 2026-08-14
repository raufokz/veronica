"use client";

import { Check } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { AgentPhoto } from "@/components/agent-photo";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const copy = {
  eyebrow: { en: "VERONICA MEDELLIN, REALTOR®", es: "VERONICA MEDELLIN, REALTOR®" },
  h1: { en: "You've got the goal. I've got the map.", es: "Tú tienes la meta. Yo tengo el mapa." },
  intro: {
    en: "I've been a Houston REALTOR® for over 10 years, working the Clear Lake and Bay Area corridor from Webster to Friendswood. I grew up around this market, and I've spent a decade learning it block by block — which streets flood, which schools are zoned where, which sellers are motivated and which are testing the water.",
    es: "He sido REALTOR® en Houston por más de 10 años, trabajando en el corredor de Clear Lake y Bay Area desde Webster hasta Friendswood. Crecí cerca de este mercado, y he pasado una década aprendiéndolo cuadra por cuadra — qué calles se inundan, qué escuelas corresponden a qué zona, qué vendedores están motivados y cuáles solo están probando el agua.",
  },
  body2: {
    en: "I work with first-time buyers who've never seen a closing disclosure, with sellers who've lived in the same house for twenty years and don't know where to start, and with investors who want the math before the tour. Whichever one you are, you get the same thing: a straight answer, in the language you're most comfortable in.",
    es: "Trabajo con compradores primerizos que nunca han visto un formulario de cierre, con vendedores que han vivido en la misma casa por veinte años y no saben por dónde empezar, y con inversionistas que quieren los números antes del recorrido. Sea cual sea tu caso, obtienes lo mismo: una respuesta directa, en el idioma con el que te sientas más cómodo.",
  },
  credentialsHeading: { en: "Credentials", es: "Credenciales" },
  cta: { en: "Book a free 15-minute call", es: "Agenda una llamada gratis de 15 minutos" },
};

const ticks = [
  { en: `Licensed Texas REALTOR® — TREC #${siteConfig.trecLicense}`, es: `REALTOR® con licencia en Texas — TREC #${siteConfig.trecLicense}` },
  { en: "Houston Association of REALTORS® member", es: "Miembro de la Asociación de REALTORES® de Houston" },
  { en: "Bilingual — English & Español", es: "Bilingüe — Inglés y Español" },
  { en: "Houston, Clear Lake & Bay Area specialist", es: "Especialista en Houston, Clear Lake y Bay Area" },
  { en: "10+ years, buyers · sellers · investors", es: "10+ años, compradores · vendedores · inversionistas" },
  { en: `Affiliated with ${siteConfig.brokerage}`, es: `Afiliada con ${siteConfig.brokerage}` },
];

const galleryItems = [
  {
    variant: "armchair" as const,
    title: { en: "Consultations & Strategy", es: "Consultoría y Estrategia" },
    subtitle: { en: "Dedicated client guidance for buying and selling", es: "Guía dedicada para compra y venta" },
  },
  {
    variant: "luxury" as const,
    title: { en: "Luxury Listings", es: "Propiedades de Lujo" },
    subtitle: { en: "Houston & Clear Lake premium estates", es: "Residencias premium en Houston y Clear Lake" },
  },
  {
    variant: "fireplace" as const,
    title: { en: "Home Valuation", es: "Valuación Residencial" },
    subtitle: { en: "In-depth market comps and positioning", es: "Análisis profundo de comparables de mercado" },
  },
  {
    variant: "headshot" as const,
    title: { en: "Bilingual REALTOR®", es: "REALTOR® Bilingüe" },
    subtitle: { en: "Fluent service in English & Spanish", es: "Servicio fluido en inglés y español" },
  },
];

export function AboutContent() {
  const { lang } = useLanguage();

  return (
    <div className="container-app section-pad space-y-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7">
          <p className="eyebrow">{copy.eyebrow[lang]}</p>
          <h1 className="mt-4 text-[clamp(2.5rem,5vw,4.25rem)] font-semibold leading-[1.05]">
            {copy.h1[lang]}
          </h1>
          <p className="mt-6 text-[1.0625rem] leading-[1.7] text-slate">{copy.intro[lang]}</p>
          <p className="mt-4 text-[1.0625rem] leading-[1.7] text-slate">{copy.body2[lang]}</p>

          <h2 className="mt-10 font-display text-xl">{copy.credentialsHeading[lang]}</h2>
          <ul className="mt-4 space-y-3">
            {ticks.map((tick) => (
              <li key={tick.en} className="flex items-start gap-3 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-gold" />
                <span>{lang === "es" ? tick.es : tick.en}</span>
              </li>
            ))}
          </ul>

          <a
            href={siteConfig.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: "lg" }), "mt-8 rounded-full bg-brand hover:bg-brand/90 text-white px-6")}
          >
            {copy.cta[lang]}
          </a>
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <AgentPhoto variant="stool" priority className="aspect-[4/5] w-full rounded-xl border border-black/5 shadow-lg" />
        </div>
      </div>

      <div className="border-t border-black/10 pt-16">
        <div className="max-w-xl">
          <p className="eyebrow">{lang === "es" ? "GALERÍA Y PERFIL" : "PORTFOLIO & GALLERY"}</p>
          <h2 className="mt-3 font-display text-2xl md:text-3xl">
            {lang === "es"
              ? "Compromiso profesional en cada representación"
              : "Professional commitment across every transaction"}
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.variant}
              className="group overflow-hidden rounded-xl border border-black/10 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <AgentPhoto variant={item.variant} className="aspect-[4/5] w-full" />
              <div className="p-4 border-t border-black/5 bg-sand/40">
                <h3 className="font-display font-semibold text-base">{item.title[lang]}</h3>
                <p className="mt-1 text-xs text-slate">{item.subtitle[lang]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
