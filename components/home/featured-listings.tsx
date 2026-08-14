import { getFeaturedListings } from "@/lib/data/listings";
import { FeaturedListingsClient } from "@/components/home/featured-listings-client";

export async function FeaturedListings() {
  const properties = await getFeaturedListings(3);
  return <FeaturedListingsClient properties={properties} />;
}
