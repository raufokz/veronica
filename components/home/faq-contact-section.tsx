"use client";

import { useLanguage } from "@/lib/language-context";
import { dict, t } from "@/lib/dict";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import Image from "next/image";

export function FaqContactSection() {
  const { lang } = useLanguage();

  return (
    <section className="py-20 bg-[#faf9f6]/40 border-b border-black/5" id="faq-contact">
      <div className="container-app max-w-5xl px-4 md:px-8">
        
        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: FAQ Accordion (5 Cols) */}
          <div className="lg:col-span-5 w-full">
            <Reveal>
              <h3 className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#c5a059] uppercase mb-4">
                {lang === "es" ? "PREGUNTAS FRECUENTES" : "FREQUENTLY ASKED QUESTIONS"}
              </h3>
            </Reveal>
            
            <Reveal delay={0.05}>
              <Accordion className="w-full mt-6 divide-y divide-black/5">
                {dict.homeFaq.items.map((item, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border-none py-2">
                    <AccordionTrigger className="text-left font-display text-sm sm:text-base font-bold text-ink hover:no-underline py-3">
                      {item.q[lang]}
                    </AccordionTrigger>
                    <AccordionContent className="text-xs sm:text-sm leading-relaxed text-slate font-medium pb-4">
                      {item.a[lang]}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>

          {/* Right Column: Contact form with images (7 Cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-black/5">
            <Reveal delay={0.08}>
              <div className="mb-6">
                <p className="text-[10px] sm:text-xs font-bold tracking-[0.22em] text-[#c5a059] uppercase mb-1">
                  {lang === "es" ? "CONTACTAR" : "GET IN TOUCH"}
                </p>
                <p className="text-xs sm:text-sm font-semibold text-slate">
                  {lang === "es" ? "Hablemos sobre tus metas de bienes raíces." : "Let's talk about your real estate goals."}
                </p>
              </div>

              {/* Grid split for Form inputs + Room image */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                
                {/* Form Elements on the Left (7 Cols) */}
                <div className="md:col-span-7 w-full">
                  <ContactForm sourcePage="/" variant="minimalist" defaultInterest="other" className="space-y-4" />
                </div>

                {/* Interior Image on the Right (5 Cols) */}
                <div className="md:col-span-5 relative w-full aspect-[5/6] md:aspect-auto md:h-[350px] rounded-2xl overflow-hidden border border-black/5 bg-[#faf9f6]">
                  <Image
                    src="/home_valuation_interior_luxury.png"
                    alt="Luxury Interior lounge view"
                    fill
                    sizes="(max-w-768px) 100vw, 400px"
                    className="object-cover"
                  />
                </div>

              </div>
            </Reveal>
          </div>

        </div>

      </div>
    </section>
  );
}
