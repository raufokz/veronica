"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { LeadStatus } from "@/types/supabase";

export async function updateLeadStatus(id: string, status: LeadStatus) {
  const supabase = await createClient();
  const { error } = await supabase.from("leads").update({ status }).eq("id", id);
  if (error) {
    return { success: false as const, error: error.message };
  }
  revalidatePath("/admin/leads");
  return { success: true as const };
}

export async function updateLeadNotes(id: string, notes: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("leads").update({ notes }).eq("id", id);
  if (error) {
    return { success: false as const, error: error.message };
  }
  revalidatePath("/admin/leads");
  return { success: true as const };
}
