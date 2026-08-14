"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { testimonialSchema, type TestimonialFormInput } from "@/lib/schemas";
import type { AdminActionResult } from "@/app/actions/admin-listings";

export async function createTestimonial(input: TestimonialFormInput): Promise<AdminActionResult> {
  const parsed = testimonialSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid testimonial." };
  }

  const supabase = await createClient();
  const { count } = await supabase.from("testimonials").select("*", { count: "exact", head: true });
  const { error } = await supabase.from("testimonials").insert({ ...parsed.data, display_order: count ?? 0 });

  if (error) {
    return { success: false, error: error.message };
  }
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  redirect("/admin/testimonials");
}

export async function reorderTestimonials(orderedIds: string[]): Promise<AdminActionResult> {
  const supabase = await createClient();
  const updates = orderedIds.map((id, index) =>
    supabase.from("testimonials").update({ display_order: index }).eq("id", id)
  );
  const results = await Promise.all(updates);
  const failed = results.find((r) => r.error);
  if (failed?.error) {
    return { success: false, error: failed.error.message };
  }
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  return { success: true };
}

export async function updateTestimonial(
  id: string,
  input: TestimonialFormInput
): Promise<AdminActionResult> {
  const parsed = testimonialSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid testimonial." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").update(parsed.data).eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(id: string): Promise<AdminActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) {
    return { success: false, error: error.message };
  }
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  return { success: true };
}
