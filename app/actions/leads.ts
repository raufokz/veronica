"use server";

import { headers } from "next/headers";
import { leadSchema, type LeadInput } from "@/lib/schemas";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";
import { sendLeadNotification, sendAutoResponder } from "@/lib/email";
import { isRateLimited } from "@/lib/rate-limit";

export type SubmitLeadResult = { success: true } | { success: false; error: string };

export async function submitLead(input: LeadInput): Promise<SubmitLeadResult> {
  if (!isSupabaseConfigured()) {
    console.error("[leads] Supabase is not configured — set NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY.");
    return { success: false, error: "This form isn't connected yet. Please call or email directly." };
  }

  const parsed = leadSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid submission." };
  }
  const lead = parsed.data;

  // Honeypot — bots fill every field, humans never see this one.
  if (lead.website) {
    return { success: true };
  }

  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return { success: false, error: "Too many submissions. Please try again later." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("leads").insert({
    full_name: lead.full_name,
    email: lead.email,
    phone: lead.phone || null,
    interest_type: lead.interest_type,
    message: lead.message || null,
    preferred_language: lead.preferred_language,
    property_id: lead.property_id || null,
    source_page: lead.source_page || null,
  });

  if (error) {
    console.error("[leads] Failed to insert lead", error);
    return { success: false, error: "Something went wrong. Please try again or call directly." };
  }

  // Fire-and-forget: the lead is already saved, email delivery is best-effort.
  await Promise.allSettled([sendLeadNotification(lead), sendAutoResponder(lead)]);

  return { success: true };
}
