import { Suspense } from "react";
import type { Metadata } from "next";
import { getListings } from "@/lib/data/listings";
import { FilterRail } from "@/components/listings/filter-rail";
import { ListingsGrid } from "@/components/listings/listings-grid";
import type { PropertyType, PropertyStatus } from "@/types/supabase";

export const metadata: Metadata = {
  title: "Houston Real Estate Listings",
  description:
    "Browse current homes for sale in Galleria, Sugar Land, and University Area with Veronica Medellin, REALTOR®.",
  alternates: { canonical: "/listings" },
};

export const revalidate = 60;

type SearchParams = {
  type?: string;
  status?: string;
  neighborhood?: string;
  minPrice?: string;
  maxPrice?: string;
  beds?: string;
  baths?: string;
};

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const properties = await getListings({
    propertyType: params.type as PropertyType | undefined,
    status: params.status as PropertyStatus | undefined,
    neighborhood: params.neighborhood,
    minPrice: params.minPrice ? Number(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
    beds: params.beds ? Number(params.beds) : undefined,
    baths: params.baths ? Number(params.baths) : undefined,
  });

  return (
    <div className="container-app section-pad">
      <p className="eyebrow">GALLERIA · SUGAR LAND · UNIVERSITY AREA</p>
      <h1 className="mt-3 h-display">Current Listings</h1>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">
        <Suspense fallback={<div className="h-96 rounded-xl bg-sand" />}>
          <FilterRail />
        </Suspense>
        <ListingsGrid properties={properties} />
      </div>
    </div>
  );
}
