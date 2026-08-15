"use client";

import { useLanguage } from "@/lib/language-context";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Reveal } from "@/components/reveal";

export type FaqItem = {
  q: { en: string; es: string };
  a: { en: string; es: string };
};

const heading = { en: "Frequently asked questions", es: "Preguntas frecuentes" };

export function FaqSection({ items, bg = "bg-sand" }: { items: FaqItem[]; bg?: string }) {
  const { lang } = useLanguage();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q.en,
      acceptedAnswer: { "@type": "Answer", text: item.a.en },
    })),
  };

  return (
    <section className={`section-pad ${bg}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container-app max-w-2xl">
        <Reveal>
          <h2 className="h-section">{heading[lang]}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <Accordion className="mt-6">
            {items.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left font-display text-lg font-semibold text-ink">
                  {item.q[lang]}
                </AccordionTrigger>
                <AccordionContent className="text-slate leading-relaxed pb-4">
                  {item.a[lang]}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
