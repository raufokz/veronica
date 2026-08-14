"use client";

import { useLanguage } from "@/lib/language-context";
import { ListingCard } from "@/components/listing-card";
import { ContactForm } from "@/components/contact-form";
import type { Property } from "@/types/supabase";

const emptyCopy = {
  en: "Nothing matches those filters yet. Tell me what you're looking for and I'll send new listings the day they hit the market.",
  es: "Nada coincide con esos filtros todavía. Dime qué buscas y te enviaré nuevas propiedades el día que salgan al mercado.",
};

export function ListingsGrid({ properties }: { properties: Property[] }) {
  const { lang } = useLanguage();

  if (properties.length === 0) {
    return (
      <div className="rounded-xl border border-black/10 bg-sand p-8">
        <p className="text-slate">{emptyCopy[lang]}</p>
        <ContactForm sourcePage="/listings" defaultInterest="buying" className="mt-6 max-w-md" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {properties.map((property) => (
        <ListingCard key={property.id} property={property} lang={lang} />
      ))}
    </div>
  );
}
