"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { neighborhoods } from "@/lib/content/neighborhoods";

const copy = {
  eyebrow: { en: "SERVICE AREAS", es: "ÁREAS DE SERVICIO" },
  h1: { en: "Neighborhoods I know block by block", es: "Vecindarios que conozco cuadra por cuadra" },
  medianPrice: { en: "Median price", es: "Precio medio" },
  view: { en: "Explore the area", es: "Explorar el área" },
};

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function NeighborhoodsIndexContent() {
  const { lang } = useLanguage();

  return (
    <div className="container-app section-pad">
      <p className="eyebrow">{copy.eyebrow[lang]}</p>
      <h1 className="mt-4 text-[clamp(2.5rem,5vw,4.25rem)] font-semibold leading-[1.05] max-w-2xl">
        {copy.h1[lang]}
      </h1>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {neighborhoods.map((n) => (
          <Link
            key={n.slug}
            href={`/neighborhoods/${n.slug}`}
            className="group block rounded-xl border border-black/10 bg-white overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_2px_12px_rgb(22_22_18_/_0.06)]"
          >
            <div className="aspect-[4/3] bg-sand" />
            <div className="p-5">
              <h2 className="font-display text-lg">{n.name}</h2>
              <p className="mt-1 text-sm text-slate">{n.headline[lang]}</p>
              <p className="mt-3 text-sm font-semibold tabular-nums">
                {copy.medianPrice[lang]}: {currency.format(n.medianPrice)}
              </p>
              <span className="mt-3 inline-block text-sm font-medium text-brand group-hover:underline">
                {copy.view[lang]}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
