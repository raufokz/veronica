"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { logActivity } from "@/lib/activity";
import type { LeadNote, LeadStatus } from "@/types/supabase";

export type CrmActionResult = { success: true } | { success: false; error: string };

export async function getLeadNotesAction(leadId: string): Promise<LeadNote[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("lead_notes")
    .select("*")
    .eq("lead_id", leadId)
    .order("created_at", { ascending: false });
  if (error) {
    console.error("[leads] getLeadNotesAction failed", error.message);
    return [];
  }
  return data ?? [];
}

export async function updateLeadStatus(id: string, status: LeadStatus): Promise<CrmActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.from("leads").update({ status }).eq("id", id);
  if (error) {
    return { success: false, error: error.message };
  }
  await logActivity({
    action: "status_changed",
    entityType: "lead",
    entityId: id,
    details: { to: status },
  });
  revalidatePath("/admin/leads");
  return { success: true };
}

export async function updateLeadNotes(id: string, notes: string): Promise<CrmActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.from("leads").update({ notes }).eq("id", id);
  if (error) {
    return { success: false, error: error.message };
  }
  await logActivity({ action: "updated", entityType: "lead", entityId: id, details: { field: "notes" } });
  revalidatePath("/admin/leads");
  return { success: true };
}

export async function updateLeadContact(
  id: string,
  patch: { full_name?: string; phone?: string | null; message?: string | null }
): Promise<CrmActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.from("leads").update(patch).eq("id", id);
  if (error) {
    return { success: false, error: error.message };
  }
  await logActivity({ action: "updated", entityType: "lead", entityId: id });
  revalidatePath("/admin/leads");
  return { success: true };
}

export async function addLeadNote(leadId: string, note: string): Promise<CrmActionResult> {
  if (!note.trim()) return { success: false, error: "Note can't be empty." };
  const supabase = await createClient();
  const { error } = await supabase.from("lead_notes").insert({ lead_id: leadId, note: note.trim() });
  if (error) {
    return { success: false, error: error.message };
  }
  await logActivity({ action: "note_added", entityType: "lead", entityId: leadId });
  revalidatePath("/admin/leads");
  return { success: true };
}
