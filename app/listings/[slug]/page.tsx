import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Gallery } from "@/components/listings/gallery";
import { MortgageCalculator } from "@/components/listings/mortgage-calculator";
import { TourRequestCard } from "@/components/listings/tour-request-card";
import { SimilarListings } from "@/components/listings/similar-listings";
import {
  getListingBySlug,
  getSimilarListings,
  getAllListingSlugs,
} from "@/lib/data/listings";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllListingSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = await getListingBySlug(slug);
  if (!property) return {};

  const title = `${property.title} — ${property.address}, ${property.city}`;
  const description =
    property.description ?? `${property.bedrooms ?? "—"} bd, ${property.bathrooms ?? "—"} ba home in ${property.neighborhood ?? property.city}.`;

  return {
    title,
    description,
    alternates: { canonical: `/listings/${property.slug}` },
    openGraph: {
      title,
      description,
      images: property.images?.[0] ? [{ url: property.images[0] }] : undefined,
    },
  };
}

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const statusLabel: Record<string, string> = {
  active: "For Sale",
  pending: "Pending",
  sold: "Sold",
  coming_soon: "Coming Soon",
};

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = await getListingBySlug(slug);
  if (!property) notFound();

  const similar = await getSimilarListings(property);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description,
    url: `${siteConfig.siteUrl}/listings/${property.slug}`,
    image: property.images,
    datePosted: property.created_at,
    address: {
      "@type": "PostalAddress",
      streetAddress: property.address,
      addressLocality: property.city,
      addressRegion: property.state,
      postalCode: property.zip_code ?? undefined,
      addressCountry: "US",
    },
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "USD",
      availability:
        property.status === "active"
          ? "https://schema.org/InStock"
          : "https://schema.org/SoldOut",
    },
  };

  return (
    <div className="container-app section-pad">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-start">
        <div>
          <Gallery images={property.images ?? []} alt={`${property.address}, ${property.city}`} />

          <div className="mt-8 flex items-start justify-between gap-4 flex-wrap">
            <div>
              <Badge className="border-0 bg-brand text-white">{statusLabel[property.status]}</Badge>
              <h1 className="mt-3 font-display text-3xl">{property.address}</h1>
              <p className="text-slate">
                {property.neighborhood ? `${property.neighborhood}, ` : ""}
                {property.city}, {property.state} {property.zip_code}
              </p>
            </div>
            <p className="text-3xl font-semibold tabular-nums">{currency.format(property.price)}</p>
          </div>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 rounded-xl border border-black/10 p-5 text-sm">
            <div>
              <p className="text-slate">Beds</p>
              <p className="font-semibold tabular-nums">{property.bedrooms ?? "—"}</p>
            </div>
            <div>
              <p className="text-slate">Baths</p>
              <p className="font-semibold tabular-nums">{property.bathrooms ?? "—"}</p>
            </div>
            <div>
              <p className="text-slate">Sqft</p>
              <p className="font-semibold tabular-nums">{property.square_feet?.toLocaleString() ?? "—"}</p>
            </div>
            <div>
              <p className="text-slate">Year built</p>
              <p className="font-semibold tabular-nums">{property.year_built ?? "—"}</p>
            </div>
          </div>

          {property.description && (
            <p className="mt-8 text-[1.0625rem] leading-[1.7] text-slate">{property.description}</p>
          )}

          {property.amenities && property.amenities.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {property.amenities.map((a) => (
                <Badge key={a} variant="secondary">
                  {a}
                </Badge>
              ))}
            </div>
          )}

          {property.virtual_tour_url && (
            <div className="mt-8 aspect-video overflow-hidden rounded-xl border border-black/10">
              <iframe
                title="Virtual tour"
                src={property.virtual_tour_url}
                className="h-full w-full border-0"
                loading="lazy"
              />
            </div>
          )}

          <div className="mt-8 overflow-hidden rounded-xl border border-black/10 aspect-video">
            <iframe
              title={`Map — ${property.address}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(`${property.address}, ${property.city}, ${property.state}`)}&output=embed`}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="mt-8">
            <MortgageCalculator price={property.price} />
          </div>

          <SimilarListings properties={similar} />
        </div>

        <TourRequestCard propertyId={property.id} sourcePage={`/listings/${property.slug}`} />
      </div>
    </div>
  );
}
