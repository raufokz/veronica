"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { dict, t } from "@/lib/dict";
import { ListingCard } from "@/components/listing-card";
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
    <section className="bg-[#fcfbf9] py-20 border-b border-black/5" id="currently-on-the-market">
      <div className="container-app max-w-5xl px-4 md:px-8">
        
        {/* Split Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Heading, Tabs, and CTA (4 Cols) */}
          <div className="md:col-span-4 flex flex-col items-start">
            <Reveal>
              <p className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#c5a059] uppercase mb-3">
                {t(dict.listings.eyebrow, lang)}
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-ink uppercase leading-snug">
                {t(dict.listings.h2, lang)}
              </h2>
            </Reveal>

            {/* Filter Pill Row */}
            <Reveal delay={0.05} className="w-full">
              <div className="mt-8 flex flex-wrap gap-2">
                {tabs.map((tabItem) => {
                  const active = tab === tabItem.value;
                  return (
                    <button
                      key={tabItem.value}
                      type="button"
                      onClick={() => setTab(tabItem.value)}
                      className={cn(
                        "inline-flex h-9 shrink-0 items-center justify-center rounded-full px-4 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer border",
                        active
                          ? "bg-ink text-white border-ink shadow-sm"
                          : "border-black/10 text-ink/75 hover:border-ink/40 bg-white"
                      )}
                    >
                      {t(tabItem.label, lang)}
                    </button>
                  );
                })}
              </div>
            </Reveal>

            {/* See All Listings link styled matching outline CTA */}
            <Reveal delay={0.1}>
              <Link
                href="/listings"
                className="mt-8 border border-black/15 text-ink bg-transparent hover:bg-black hover:text-white px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all inline-flex items-center gap-2 group shadow-xs self-start"
              >
                <span>{t(dict.listings.browseAll, lang)}</span>
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>

          {/* Right Column: Listing Cards (8 Cols) */}
          <div className="md:col-span-8 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {visible.slice(0, 4).map((property, i) => (
                <Reveal key={property.id} delay={i * 0.05} className="h-full">
                  <div className="bg-white border border-black/5 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                    <ListingCard property={property} lang={lang} />
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Empty State */}
            {visible.length === 0 && (
              <Reveal delay={0.05}>
                <div className="rounded-2xl border border-dashed border-black/10 bg-white p-12 text-center shadow-xs">
                  <p className="text-slate font-medium text-xs sm:text-sm">
                    {lang === "es"
                      ? "No hay propiedades en este estado en este momento."
                      : "No properties in this status right now."}
                  </p>
                </div>
              </Reveal>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
