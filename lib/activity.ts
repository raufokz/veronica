import { createClient } from "@/lib/supabase/server";
import type { Json } from "@/types/supabase";

type ActivityInput = {
  action: string;
  entityType: string;
  entityId?: string | null;
  details?: Record<string, unknown> | null;
  ipAddress?: string | null;
};

// Best-effort audit trail — never blocks the caller on failure.
export async function logActivity(input: ActivityInput): Promise<void> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    await supabase.from("activity_logs").insert({
      user_id: user?.id ?? null,
      action: input.action,
      entity_type: input.entityType,
      entity_id: input.entityId ?? null,
      details: (input.details as Json) ?? undefined,
      ip_address: input.ipAddress ?? null,
    });
  } catch (err) {
    console.error("[activity] failed to log", err);
  }
}
