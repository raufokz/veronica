"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { propertySchema, type PropertyFormInput } from "@/lib/schemas";

export type AdminActionResult = { success: true } | { success: false; error: string };

function splitCommas(value?: string): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

export async function createListing(input: PropertyFormInput): Promise<AdminActionResult> {
  const parsed = propertySchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid listing." };
  }
  const { amenities, ...rest } = parsed.data;

  const supabase = await createClient();
  const { error } = await supabase.from("properties").insert({
    ...rest,
    amenities: splitCommas(amenities),
  });

  if (error) {
    return { success: false, error: error.message };
  }
  revalidatePath("/admin/listings");
  revalidatePath("/listings");
  redirect("/admin/listings");
}

export async function updateListing(id: string, input: PropertyFormInput): Promise<AdminActionResult> {
  const parsed = propertySchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid listing." };
  }
  const { amenities, ...rest } = parsed.data;

  const supabase = await createClient();
  const { error } = await supabase
    .from("properties")
    .update({
      ...rest,
      amenities: splitCommas(amenities),
    })
    .eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }
  revalidatePath("/admin/listings");
  revalidatePath("/listings");
  redirect("/admin/listings");
}

export async function deleteListing(id: string): Promise<AdminActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.from("properties").delete().eq("id", id);
  if (error) {
    return { success: false, error: error.message };
  }
  revalidatePath("/admin/listings");
  revalidatePath("/listings");
  return { success: true };
}
