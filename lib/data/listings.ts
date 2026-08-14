import { createClient } from "@/lib/supabase/server";
import { createStaticClient } from "@/lib/supabase/static";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";
import type { Property, PropertyType, PropertyStatus } from "@/types/supabase";

export async function getFeaturedListings(limit = 3): Promise<Property[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("published", true)
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[data] getFeaturedListings failed", error.message);
    return [];
  }
  return data ?? [];
}

export type ListingFilters = {
  propertyType?: PropertyType;
  minPrice?: number;
  maxPrice?: number;
  beds?: number;
  baths?: number;
  neighborhood?: string;
  status?: PropertyStatus;
};

export async function getListings(filters: ListingFilters = {}): Promise<Property[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  let query = supabase.from("properties").select("*").eq("published", true);

  if (filters.propertyType) query = query.eq("property_type", filters.propertyType);
  if (filters.neighborhood) query = query.eq("neighborhood", filters.neighborhood);
  if (filters.status) query = query.eq("status", filters.status);
  if (filters.minPrice) query = query.gte("price", filters.minPrice);
  if (filters.maxPrice) query = query.lte("price", filters.maxPrice);
  if (filters.beds) query = query.gte("bedrooms", filters.beds);
  if (filters.baths) query = query.gte("bathrooms", filters.baths);

  const { data, error } = await query.order("created_at", { ascending: false });

  if (error) {
    console.error("[data] getListings failed", error.message);
    return [];
  }
  return data ?? [];
}

export async function getListingBySlug(slug: string): Promise<Property | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) {
    console.error("[data] getListingBySlug failed", error.message);
    return null;
  }
  return data;
}

export async function getSimilarListings(current: Property, limit = 3): Promise<Property[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("published", true)
    .neq("id", current.id)
    .eq("neighborhood", current.neighborhood ?? "")
    .limit(limit);

  if (error) {
    console.error("[data] getSimilarListings failed", error.message);
    return [];
  }
  return data ?? [];
}

export async function getAllListingSlugs(): Promise<string[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = createStaticClient();
  const { data, error } = await supabase.from("properties").select("slug").eq("published", true);
  if (error) return [];
  return (data ?? []).map((row) => row.slug);
}
