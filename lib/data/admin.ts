import { createClient } from "@/lib/supabase/server";
import type { BlogPost, Lead, Property, Testimonial } from "@/types/supabase";

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
  const { data, error } = await supabase.from("testimonials").select("*").order("display_order", { ascending: true });
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

export async function getAllBlogPostsAdmin(): Promise<BlogPost[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("[admin] getAllBlogPostsAdmin failed", error.message);
    return [];
  }
  return data ?? [];
}

export async function getBlogPostByIdAdmin(id: string): Promise<BlogPost | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("blog_posts").select("*").eq("id", id).maybeSingle();
  if (error) {
    console.error("[admin] getBlogPostByIdAdmin failed", error.message);
    return null;
  }
  return data;
}

export type AdminNavCounts = {
  newLeads: number;
  upcomingAppointments: number;
};

export async function getAdminNavCounts(): Promise<AdminNavCounts> {
  const supabase = await createClient();
  const today = new Date().toISOString().slice(0, 10);

  const [leads, appointments] = await Promise.all([
    supabase.from("leads").select("id", { count: "exact", head: true }).eq("status", "new"),
    supabase
      .from("appointments")
      .select("id", { count: "exact", head: true })
      .eq("status", "scheduled")
      .gte("appointment_date", today),
  ]);

  if (leads.error) console.error("[admin] getAdminNavCounts leads failed", leads.error.message);
  if (appointments.error) {
    console.error("[admin] getAdminNavCounts appointments failed", appointments.error.message);
  }

  return {
    newLeads: leads.count ?? 0,
    upcomingAppointments: appointments.count ?? 0,
  };
}
