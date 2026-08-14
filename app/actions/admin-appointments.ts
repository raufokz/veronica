"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { appointmentSchema, type AppointmentFormInput } from "@/lib/schemas";
import { logActivity } from "@/lib/activity";
import type { AppointmentStatus } from "@/types/supabase";
import type { AdminActionResult } from "@/app/actions/admin-listings";

export async function createAppointment(input: AppointmentFormInput): Promise<AdminActionResult> {
  const parsed = appointmentSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid appointment." };
  }
  const { property_id, ...rest } = parsed.data;

  const supabase = await createClient();
  const { error } = await supabase.from("appointments").insert({
    ...rest,
    property_id: property_id || null,
  });

  if (error) {
    return { success: false, error: error.message };
  }
  await logActivity({ action: "created", entityType: "appointment", details: { name: parsed.data.client_name } });
  revalidatePath("/admin/appointments");
  return { success: true };
}

export async function updateAppointmentStatus(
  id: string,
  status: AppointmentStatus
): Promise<AdminActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.from("appointments").update({ status }).eq("id", id);
  if (error) {
    return { success: false, error: error.message };
  }
  await logActivity({ action: "status_changed", entityType: "appointment", entityId: id, details: { to: status } });
  revalidatePath("/admin/appointments");
  return { success: true };
}

export async function deleteAppointment(id: string): Promise<AdminActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.from("appointments").delete().eq("id", id);
  if (error) {
    return { success: false, error: error.message };
  }
  await logActivity({ action: "deleted", entityType: "appointment", entityId: id });
  revalidatePath("/admin/appointments");
  return { success: true };
}
