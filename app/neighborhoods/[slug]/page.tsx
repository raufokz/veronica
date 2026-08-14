import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NeighborhoodDetailContent } from "@/components/neighborhoods/neighborhood-detail-content";
import { neighborhoods, getNeighborhood } from "@/lib/content/neighborhoods";
import { getListings } from "@/lib/data/listings";

export const revalidate = 60;

export function generateStaticParams() {
  return neighborhoods.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const neighborhood = getNeighborhood(slug);
  if (!neighborhood) return {};

  return {
    title: `${neighborhood.name} Homes for Sale`,
    description: `${neighborhood.headline.en} Median price, schools, commute times, and current listings in ${neighborhood.name}, TX.`,
    alternates: { canonical: `/neighborhoods/${neighborhood.slug}` },
  };
}

export default async function NeighborhoodDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const neighborhood = getNeighborhood(slug);
  if (!neighborhood) notFound();

  const listings = await getListings({ neighborhood: neighborhood.name });

  return <NeighborhoodDetailContent neighborhood={neighborhood} listings={listings} />;
}
