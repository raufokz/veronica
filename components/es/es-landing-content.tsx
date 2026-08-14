"use client";

import Link from "next/link";
import { Check, Home, TrendingUp, BarChart3 } from "lucide-react";
import { ForceSpanishDefault } from "@/components/es/force-spanish-default";
import { ContactForm } from "@/components/contact-form";
import { AgentPhoto } from "@/components/agent-photo";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const ticks = [
  "Licencia de Texas — TREC #" + siteConfig.trecLicense,
  "Miembro de la Asociación de REALTORES® de Houston",
  "10+ años sirviendo a familias hispanas en Houston",
  "Todo el proceso — recorridos, ofertas, cierre — en español",
];

const services = [
  { icon: Home, title: "Comprar una casa", body: "Te explico cada paso — ofertas, inspecciones, financiamiento — antes de que firmes nada." },
  { icon: TrendingUp, title: "Vender una casa", body: "Precios respaldados por comparables reales y negociación que protege tu número." },
  { icon: BarChart3, title: "Invertir", body: "Números claros de renta y respuestas honestas sobre qué propiedades valen tu capital." },
];

export function EsLandingContent() {
  return (
    <div>
      <ForceSpanishDefault />

      <section className="container-app pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <p className="eyebrow">HOUSTON · CLEAR LAKE · BAY AREA</p>
            <h1 className="mt-4 text-[clamp(2.5rem,5vw,4.25rem)] font-semibold leading-[1.05] max-w-2xl">
              La REALTOR® de Houston que habla tu idioma — literalmente.
            </h1>
            <p className="mt-6 max-w-xl text-[1.0625rem] leading-[1.7] text-slate">
              Soy Veronica Medellin, agente bilingüe con más de 10 años ayudando a familias
              hispanas en Houston y Clear Lake a comprar, vender e invertir en bienes raíces —
              sin traducciones a medias ni sorpresas en el contrato.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={siteConfig.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ size: "lg" }), "rounded-full bg-brand hover:bg-brand/90 text-white px-6")}
              >
                Agenda una llamada gratis
              </a>
              <Link href="/home-value" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full px-6 border-ink/20")}>
                Descubre el valor de mi casa
              </Link>
            </div>

            <ul className="mt-10 space-y-3">
              {ticks.map((tick) => (
                <li key={tick} className="flex items-start gap-3 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-gold" />
                  <span>{tick}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="absolute -z-10 top-6 left-6 h-full w-full rounded-xl bg-sand" />
            <AgentPhoto priority className="aspect-[4/5] w-full rounded-xl border border-black/5" />
          </div>
        </div>
      </section>

      <section className="bg-sand section-pad">
        <div className="container-app">
          <p className="eyebrow">CÓMO AYUDO</p>
          <h2 className="mt-3 text-[clamp(2rem,3.5vw,3rem)] font-semibold max-w-xl">
            Sea cual sea tu meta, hay un plan para lograrla
          </h2>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.title} className="rounded-xl border border-black/10 bg-white p-6">
                <s.icon className="size-6 text-brand" />
                <h3 className="mt-4 font-display text-lg">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-app grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <p className="eyebrow">HABLEMOS</p>
            <h2 className="mt-3 text-[clamp(2rem,3.5vw,3rem)] font-semibold">
              Cuéntame qué quieres lograr. Yo te digo cómo llegar.
            </h2>
            <ContactForm sourcePage="/es" className="mt-8" />
          </div>
          <div className="space-y-3 text-sm">
            <p>
              <a href={`tel:${siteConfig.phone}`} className="font-medium hover:text-brand">
                {siteConfig.phoneDisplay}
              </a>
            </p>
            <p>
              <a href={`mailto:${siteConfig.email}`} className="font-medium hover:text-brand">
                {siteConfig.email}
              </a>
            </p>
            <p className="text-slate">{siteConfig.brokerage}</p>
            <p className="text-slate">Licencia TREC #{siteConfig.trecLicense}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
