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
  const { error } = await supabase.from("testimonials").insert(parsed.data);

  if (error) {
    return { success: false, error: error.message };
  }
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  redirect("/admin/testimonials");
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
