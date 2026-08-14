import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";
import type { Testimonial } from "@/types/supabase";

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_published", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("[data] getFeaturedTestimonials failed", error.message);
    return [];
  }
  return data ?? [];
}
