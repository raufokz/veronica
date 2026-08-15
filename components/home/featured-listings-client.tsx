"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { dict, t } from "@/lib/dict";
import { ListingCard } from "@/components/listing-card";
import { buttonVariants } from "@/components/ui/button";
import type { Property } from "@/types/supabase";
import { cn } from "@/lib/utils";

import { Reveal } from "@/components/reveal";

type StatusTab = "all" | "active" | "pending" | "sold";

const tabs: Array<{ value: StatusTab; label: { en: string; es: string } }> = [
  { value: "all", label: { en: "All", es: "Todas" } },
  { value: "active", label: { en: "For Sale", es: "En Venta" } },
  { value: "pending", label: { en: "Pending", es: "Pendiente" } },
  { value: "sold", label: { en: "Sold", es: "Vendidas" } },
];

export function FeaturedListingsClient({ properties }: { properties: Property[] }) {
  const { lang } = useLanguage();
  const [tab, setTab] = useState<StatusTab>("all");

  const visible = useMemo(
    () => (tab === "all" ? properties : properties.filter((p) => p.status === tab)),
    [properties, tab]
  );

  if (properties.length === 0) return null;

  return (
    <section className="bg-white section-pad">
      <div className="container-app">
        <Reveal>
          <p className="eyebrow">{t(dict.listings.eyebrow, lang)}</p>
          <h2 className="mt-3 h-section max-w-xl">
            {t(dict.listings.h2, lang)}
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-8 flex gap-2 overflow-x-auto pb-1">
            {tabs.map((tabItem) => {
              const active = tab === tabItem.value;
              return (
                <button
                  key={tabItem.value}
                  type="button"
                  onClick={() => setTab(tabItem.value)}
                  className={cn(
                    "inline-flex min-h-11 shrink-0 items-center rounded-full px-4 text-sm font-medium transition-colors lg:min-h-9 cursor-pointer",
                    active
                      ? "bg-ink text-white animate-fade-in"
                      : "border border-black/10 text-ink/70 hover:border-ink"
                  )}
                >
                  {t(tabItem.label, lang)}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((property, i) => (
            <Reveal key={property.id} delay={i * 0.05} className="h-full">
              <ListingCard property={property} lang={lang} />
            </Reveal>
          ))}
        </div>

        {visible.length === 0 && (
          <Reveal delay={0.05}>
            <div className="mt-6 rounded-xl border border-dashed border-black/10 bg-sand/30 p-12 text-center">
              <p className="text-slate font-medium">
                {lang === "es" ? "No hay propiedades en este estado en este momento." : "No properties in this status right now."}
              </p>
            </div>
          </Reveal>
        )}

        <Reveal delay={0.1}>
          <div className="mt-8 text-center">
            <Link href="/listings" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full px-6")}>
              {t(dict.listings.browseAll, lang)}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
