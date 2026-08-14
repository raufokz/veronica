import { createClient } from "@/lib/supabase/server";
import type { Lead, Property, Testimonial } from "@/types/supabase";

export async function getAllLeads(): Promise<Lead[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
  if (error) {
    console.error("[admin] getAllLeads failed", error.message);
    return [];
  }
  return data ?? [];
}

export async function getAllListingsAdmin(): Promise<Property[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("properties").select("*").order("created_at", { ascending: false });
  if (error) {
    console.error("[admin] getAllListingsAdmin failed", error.message);
    return [];
  }
  return data ?? [];
}

export async function getListingByIdAdmin(id: string): Promise<Property | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("properties").select("*").eq("id", id).maybeSingle();
  if (error) {
    console.error("[admin] getListingByIdAdmin failed", error.message);
    return null;
  }
  return data;
}

export async function getAllTestimonialsAdmin(): Promise<Testimonial[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
  if (error) {
    console.error("[admin] getAllTestimonialsAdmin failed", error.message);
    return [];
  }
  return data ?? [];
}

export async function getTestimonialByIdAdmin(id: string): Promise<Testimonial | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("testimonials").select("*").eq("id", id).maybeSingle();
  if (error) {
    console.error("[admin] getTestimonialByIdAdmin failed", error.message);
    return null;
  }
  return data;
}
