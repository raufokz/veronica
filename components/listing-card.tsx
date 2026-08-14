import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { Property } from "@/types/supabase";
import { cn } from "@/lib/utils";
import type { Lang } from "@/lib/dict";
import { t, dict } from "@/lib/dict";

const statusStyles: Record<string, string> = {
  active: "bg-brand text-white",
  pending: "bg-gold text-ink",
  sold: "bg-slate text-white",
  coming_soon: "bg-ink text-white",
};

const statusLabel: Record<string, { en: string; es: string }> = {
  active: { en: "For Sale", es: "En Venta" },
  pending: { en: "Pending", es: "Pendiente" },
  sold: { en: "Sold", es: "Vendida" },
  coming_soon: { en: "Coming Soon", es: "Próximamente" },
};

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function ListingCard({ property, lang = "en" }: { property: Property; lang?: Lang }) {
  const image = property.images?.[0];

  return (
    <Link
      href={`/listings/${property.slug}`}
      className="group block rounded-xl border border-black/10 bg-white overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_2px_12px_rgb(22_22_18_/_0.06)]"
    >
      <div className="relative aspect-[4/3] bg-sand">
        {image ? (
          <Image
            src={image}
            alt={`Front exterior of ${property.address}${property.neighborhood ? `, ${property.neighborhood}` : ``}${property.city ? `, ${property.city}` : ``}`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        ) : null}
        <Badge className={cn("absolute top-3 left-3 border-0", statusStyles[property.status])}>
          {t(statusLabel[property.status], lang)}
        </Badge>
      </div>
      <div className="p-5">
        <p className="font-sans font-semibold tabular-nums text-lg">{currency.format(property.price)}</p>
        <h3 className="mt-1 font-display text-lg leading-snug">{property.address}</h3>
        <div className="mt-3 flex items-center gap-2 text-sm text-slate border-t border-black/5 pt-3">
          {property.bedrooms != null && <span>{property.bedrooms} bd</span>}
          {property.bathrooms != null && (
            <>
              <span className="text-black/20">·</span>
              <span>{property.bathrooms} ba</span>
            </>
          )}
          {property.square_feet != null && (
            <>
              <span className="text-black/20">·</span>
              <span className="tabular-nums">{property.square_feet.toLocaleString()} sqft</span>
            </>
          )}
        </div>
        <span className="mt-3 inline-block text-sm font-medium text-brand group-hover:underline">
          {t(dict.listings.seeFull, lang)}
        </span>
      </div>
    </Link>
  );
}
