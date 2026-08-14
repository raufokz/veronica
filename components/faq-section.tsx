"use client";

import { useLanguage } from "@/lib/language-context";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export type FaqItem = {
  q: { en: string; es: string };
  a: { en: string; es: string };
};

const heading = { en: "Frequently asked questions", es: "Preguntas frecuentes" };

export function FaqSection({ items }: { items: FaqItem[] }) {
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
    <section className="section-pad bg-sand">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container-app max-w-2xl">
        <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-semibold">{heading[lang]}</h2>
        <Accordion className="mt-6">
          {items.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left font-display text-lg">
                {item.q[lang]}
              </AccordionTrigger>
              <AccordionContent className="text-slate leading-relaxed">
                {item.a[lang]}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
