"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { siteSettingsSchema, type SiteSettingsFormInput } from "@/lib/schemas";
import { logActivity } from "@/lib/activity";
import type { AdminActionResult } from "@/app/actions/admin-listings";

export async function updateSiteSettings(input: SiteSettingsFormInput): Promise<AdminActionResult> {
  const parsed = siteSettingsSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid settings." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("site_settings")
    .update({ ...parsed.data, updated_at: new Date().toISOString() })
    .eq("id", 1);

  if (error) {
    return { success: false, error: error.message };
  }
  await logActivity({ action: "updated", entityType: "setting", entityId: "1" });
  revalidatePath("/admin/settings");
  revalidatePath("/");
  return { success: true };
}
