"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { dict, t } from "@/lib/dict";
import { ListingCard } from "@/components/listing-card";
import { buttonVariants } from "@/components/ui/button";
import type { Property } from "@/types/supabase";
import { cn } from "@/lib/utils";

export function FeaturedListingsClient({ properties }: { properties: Property[] }) {
  const { lang } = useLanguage();

  if (properties.length === 0) return null;

  return (
    <section className="bg-white section-pad">
      <div className="container-app">
        <p className="eyebrow">{t(dict.listings.eyebrow, lang)}</p>
        <h2 className="mt-3 text-[clamp(2rem,3.5vw,3rem)] font-semibold max-w-xl">
          {t(dict.listings.h2, lang)}
        </h2>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <ListingCard key={property.id} property={property} lang={lang} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/listings" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full px-6")}>
            {t(dict.listings.browseAll, lang)}
          </Link>
        </div>
      </div>
    </section>
  );
}
