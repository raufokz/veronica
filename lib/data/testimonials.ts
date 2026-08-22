import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";
import type { Testimonial } from "@/types/supabase";

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  
  // First attempt: Order by display_order column
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_published", true)
    .order("display_order", { ascending: true });

  if (error) {
    // If display_order query fails because column does not exist, dynamic fallback to created_at
    if (error.message.includes("display_order") || error.message.includes("does not exist")) {
      const fallback = await supabase
        .from("testimonials")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: true });

      if (fallback.error) {
        console.error("[data] getFeaturedTestimonials fallback failed", fallback.error.message);
        return [];
      }
      return fallback.data ?? [];
    }
    console.error("[data] getFeaturedTestimonials failed", error.message);
    return [];
  }
  return data ?? [];
}
