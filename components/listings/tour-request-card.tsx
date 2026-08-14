"use client";

import { useLanguage } from "@/lib/language-context";
import { ContactForm } from "@/components/contact-form";
import { AgentPhoto } from "@/components/agent-photo";

const copy = {
  title: { en: "Schedule a tour", es: "Agenda un recorrido" },
  body: {
    en: "See it in person — I'll set up a time that works for you.",
    es: "Míralo en persona — coordino un horario que te funcione.",
  },
};

export function TourRequestCard({ propertyId, sourcePage }: { propertyId: string; sourcePage: string }) {
  const { lang } = useLanguage();

  return (
    <div className="sticky top-24 rounded-xl border border-black/10 bg-white p-6">
      <AgentPhoto variant="closeup" className="aspect-square w-16 rounded-full" />
      <h3 className="mt-4 font-display text-lg">{copy.title[lang]}</h3>
      <p className="mt-1 text-sm text-slate">{copy.body[lang]}</p>
      <ContactForm
        sourcePage={sourcePage}
        propertyId={propertyId}
        defaultInterest="buying"
        submitLabel={copy.title[lang]}
        className="mt-5"
      />
    </div>
  );
}
