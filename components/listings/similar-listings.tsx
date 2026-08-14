"use client";

import { useLanguage } from "@/lib/language-context";
import { ListingCard } from "@/components/listing-card";
import type { Property } from "@/types/supabase";

const copy = { en: "Similar homes", es: "Casas similares" };

export function SimilarListings({ properties }: { properties: Property[] }) {
  const { lang } = useLanguage();
  if (properties.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="font-display text-2xl">{copy[lang]}</h2>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <ListingCard key={property.id} property={property} lang={lang} />
        ))}
      </div>
    </div>
  );
}
