"use client";

import Link from "next/link";
import { GraduationCap, Car, MapPin } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { buttonVariants } from "@/components/ui/button";
import { ListingCard } from "@/components/listing-card";
import { FaqSection, type FaqItem } from "@/components/faq-section";
import type { NeighborhoodContent } from "@/lib/content/neighborhoods";
import type { Property } from "@/types/supabase";
import { cn } from "@/lib/utils";

const copy = {
  eyebrow: { en: "NEIGHBORHOOD GUIDE", es: "GUÍA DEL VECINDARIO" },
  medianPrice: { en: "Median price", es: "Precio medio" },
  schools: { en: "Schools", es: "Escuelas" },
  commute: { en: "Commute times", es: "Tiempos de traslado" },
  nasa: { en: "NASA / Clear Lake", es: "NASA / Clear Lake" },
  downtown: { en: "Downtown Houston", es: "Centro de Houston" },
  medicalCenter: { en: "Texas Medical Center", es: "Texas Medical Center" },
  listingsHeading: { en: "Homes for sale here now", es: "Casas en venta ahora mismo" },
  noListings: { en: "No active listings here right now — tell me what you're looking for and I'll reach out the moment one hits the market.", es: "No hay propiedades activas aquí en este momento — dime qué buscas y te contacto en cuanto una salga al mercado." },
  cta: { en: "Ask about this area", es: "Pregunta sobre esta área" },
};

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function NeighborhoodDetailContent({
  neighborhood,
  listings,
}: {
  neighborhood: NeighborhoodContent;
  listings: Property[];
}) {
  const { lang } = useLanguage();

  const faqs: FaqItem[] = [
    {
      q: {
        en: `What is the median home price in ${neighborhood.name}?`,
        es: `¿Cuál es el precio medio de una casa en ${neighborhood.name}?`,
      },
      a: {
        en: `As of 2026, the median home price in ${neighborhood.name} is around ${currency.format(neighborhood.medianPrice)}. That shifts with inventory and season — I'll pull current comps for the exact street you're considering.`,
        es: `A partir de 2026, el precio medio de una casa en ${neighborhood.name} es de alrededor de ${currency.format(neighborhood.medianPrice)}. Esto cambia según el inventario y la temporada — puedo obtener comparables actuales para la calle exacta que estés considerando.`,
      },
    },
    {
      q: {
        en: `What's the commute like from ${neighborhood.name} to the Texas Medical Center?`,
        es: `¿Cómo es el traslado desde ${neighborhood.name} hasta el Texas Medical Center?`,
      },
      a: {
        en: `Expect around ${neighborhood.commute.medicalCenter} without heavy traffic. It's one of the reasons ${neighborhood.name} is popular with Medical Center and NASA-area professionals.`,
        es: `Espera alrededor de ${neighborhood.commute.medicalCenter} sin tráfico pesado. Es una de las razones por las que ${neighborhood.name} es popular entre profesionales del Medical Center y del área de NASA.`,
      },
    },
  ];

  return (
    <>
      <div className="bg-sand">
        <div className="container-app section-pad">
          <p className="eyebrow">{copy.eyebrow[lang]}</p>
          <h1 className="mt-4 text-[clamp(2.5rem,5vw,4.25rem)] font-semibold leading-[1.05] max-w-2xl">
            {neighborhood.name}
          </h1>
          <p className="mt-2 text-lg text-slate">{neighborhood.headline[lang]}</p>
          <p className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.7] text-slate">{neighborhood.whoFor[lang]}</p>
        </div>
      </div>

      <div className="container-app py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-xl border border-black/10 p-6">
            <MapPin className="size-5 text-brand" />
            <p className="mt-3 text-sm text-slate">{copy.medianPrice[lang]}</p>
            <p className="text-2xl font-semibold tabular-nums">{currency.format(neighborhood.medianPrice)}</p>
          </div>
          <div className="rounded-xl border border-black/10 p-6">
            <GraduationCap className="size-5 text-brand" />
            <p className="mt-3 text-sm text-slate">{copy.schools[lang]}</p>
            <ul className="mt-1 text-sm">
              {neighborhood.schools.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-black/10 p-6">
            <Car className="size-5 text-brand" />
            <p className="mt-3 text-sm text-slate">{copy.commute[lang]}</p>
            <ul className="mt-1 text-sm space-y-1">
              <li>
                {copy.nasa[lang]}: <span className="font-medium tabular-nums">{neighborhood.commute.nasa}</span>
              </li>
              <li>
                {copy.downtown[lang]}: <span className="font-medium tabular-nums">{neighborhood.commute.downtown}</span>
              </li>
              <li>
                {copy.medicalCenter[lang]}:{" "}
                <span className="font-medium tabular-nums">{neighborhood.commute.medicalCenter}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="font-display text-2xl">{copy.listingsHeading[lang]}</h2>
          {listings.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((property) => (
                <ListingCard key={property.id} property={property} lang={lang} />
              ))}
            </div>
          ) : (
            <p className="mt-4 text-slate">{copy.noListings[lang]}</p>
          )}
        </div>

        <div className="mt-12">
          <Link
            href="/contact"
            className={cn(buttonVariants({ size: "lg" }), "rounded-full bg-brand hover:bg-brand/90 text-white px-6")}
          >
            {copy.cta[lang]}
          </Link>
        </div>
      </div>

      <FaqSection items={faqs} />
    </>
  );
}
