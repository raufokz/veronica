import { getListings } from "@/lib/data/listings";
import { FeaturedListingsClient } from "@/components/home/featured-listings-client";

export async function FeaturedListings() {
  const properties = await getListings({ limit: 9 });
  return <FeaturedListingsClient properties={properties} />;
}
