"use client";

import { useLanguage } from "@/lib/language-context";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/lib/site-config";
import { Phone, Mail, MessageSquare } from "lucide-react";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ContactSectionProps = {
  sourcePage?: string;
  headingLevel?: "h1" | "h2";
  variant?: "default" | "luxury";
};

export function ContactSection({
  sourcePage = "/",
  headingLevel: Heading = "h2",
  variant = "luxury",
}: ContactSectionProps) {
  const { lang } = useLanguage();

  if (variant === "luxury") {
    return (
      <section id="contact" className="relative py-24 overflow-hidden bg-ink text-white">
        {/* Background Image with Dark Contrast Backdrop */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/home_valuation_interior_luxury.png"
            alt="Premium Interior Lounge"
            fill
            sizes="100vw"
            className="object-cover object-center brightness-[0.35]"
          />
          <div className="absolute inset-0 bg-black/60 z-10" />
        </div>

        <div className="container-app max-w-5xl px-4 md:px-8 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left side: Premium credentials info content (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-start text-left">
              <Reveal>
                <div className="inline-block bg-[#b4934c]/20 border border-[#c5a059]/40 text-[#c5a059] text-[10px] font-bold tracking-[0.25em] px-3.5 py-1.5 rounded-sm mb-6 uppercase">
                  {lang === "es" ? "CONTACTO DIRECTO" : "EXECUTIVE GUIDANCE"}
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <Heading className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight uppercase mb-6">
                  {lang === "es" 
                    ? "Hablemos sobre tus metas de bienes raíces" 
                    : "Let's discuss your real estate goals"}
                </Heading>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="text-xs sm:text-sm leading-relaxed text-white/80 font-medium mb-8 max-w-[40ch]">
                  {lang === "es"
                    ? "Asesoría bilingüe experta y directa sobre compra, venta e inversiones en las zonas más cotizadas de Houston."
                    : "Expert, bi-lingual guidance tailored to buyers, sellers, and investors in Houston's premier neighborhoods."}
                </p>
              </Reveal>

              {/* Direct Details */}
              <Reveal delay={0.15} className="w-full">
                <div className="space-y-4 border-t border-white/10 pt-6 w-full mb-8">
                  <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-3.5 hover:text-[#c5a059] transition-colors group">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-white/10 border border-white/5 group-hover:bg-[#c5a059]/20 transition-all text-[#c5a059]">
                      <Phone className="size-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest leading-none mb-1">
                        {lang === "es" ? "LLAMAR" : "DIRECT CALL"}
                      </p>
                      <p className="text-sm font-semibold">{siteConfig.phoneDisplay}</p>
                    </div>
                  </a>

                  <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3.5 hover:text-[#c5a059] transition-colors group">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-white/10 border border-white/5 group-hover:bg-[#c5a059]/20 transition-all text-[#c5a059]">
                      <Mail className="size-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest leading-none mb-1">
                        {lang === "es" ? "CORREO" : "EMAIL ADDRESS"}
                      </p>
                      <p className="text-sm font-semibold truncate max-w-[240px] md:max-w-none">{siteConfig.email}</p>
                    </div>
                  </a>
                </div>
              </Reveal>

              {/* Quick WhatsApp Action button */}
              <Reveal delay={0.2} className="w-full">
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "w-full sm:w-auto rounded-none border-white/20 text-white bg-transparent hover:bg-[#b4934c] hover:border-[#b4934c] hover:text-white px-6 h-11 text-xs font-semibold uppercase tracking-widest transition-all inline-flex items-center justify-center gap-2.5 cursor-pointer"
                  )}
                >
                  <MessageSquare className="size-4 text-[#c5a059]" />
                  <span>{lang === "es" ? "Enviar mensaje por WhatsApp" : "Connect via WhatsApp"}</span>
                </a>
              </Reveal>
            </div>

            {/* Right side: Translucent Glass Card Form (7 cols) */}
            <div className="lg:col-span-7 w-full bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl border border-white/20 text-ink">
              <Reveal delay={0.1}>
                <div>
                  <div className="mb-6">
                    <span className="text-[10px] font-bold tracking-[0.25em] text-[#c5a059] uppercase block mb-1">
                      {lang === "es" ? "ENVÍA TU CONSULTA" : "SEND AN INQUIRY"}
                    </span>
                    <p className="text-xs text-slate font-medium">
                      {lang === "es" 
                        ? "Por favor, completa los siguientes datos para recibir una respuesta en un día hábil." 
                        : "Fill out the form below to receive a response within one business day."}
                    </p>
                  </div>
                  <ContactForm sourcePage={sourcePage} variant="minimalist" defaultInterest="other" className="space-y-5" />
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>
    );
  }

  // Standalone Default Flat Mode (for Standalone Route alternate variant)
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container-app max-w-xl px-4 md:px-8 text-center">
        <Reveal>
          <Heading className="font-display text-2xl md:text-3xl font-bold tracking-widest text-[#222] uppercase mb-10">
            {lang === "es" ? "Contáctanos" : "Get In Touch"}
          </Heading>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="bg-[#faf9f6]/40 border border-black/5 p-8 rounded-3xl shadow-sm text-ink">
            <ContactForm sourcePage={sourcePage} variant="minimalist" defaultInterest="other" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
