import { createClient } from "@/lib/supabase/server";
import type { ActivityLog, Appointment, LeadNote, SiteSetting } from "@/types/supabase";

export async function getLeadNotes(leadId: string): Promise<LeadNote[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("lead_notes")
    .select("*")
    .eq("lead_id", leadId)
    .order("created_at", { ascending: false });
  if (error) {
    console.error("[crm] getLeadNotes failed", error.message);
    return [];
  }
  return data ?? [];
}

export async function getRecentActivityLogs(limit = 10): Promise<ActivityLog[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("activity_logs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) {
    console.error("[crm] getRecentActivityLogs failed", error.message);
    return [];
  }
  return data ?? [];
}

export async function getAllAppointments(): Promise<Appointment[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .order("appointment_date", { ascending: false })
    .order("appointment_time", { ascending: false });
  if (error) {
    console.error("[crm] getAllAppointments failed", error.message);
    return [];
  }
  return data ?? [];
}

export async function getUpcomingAppointments(limit = 5): Promise<Appointment[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .gte("appointment_date", new Date().toISOString().slice(0, 10))
    .in("status", ["scheduled", "confirmed"])
    .order("appointment_date", { ascending: true })
    .limit(limit);
  if (error) {
    console.error("[crm] getUpcomingAppointments failed", error.message);
    return [];
  }
  return data ?? [];
}

export async function getSiteSettings(): Promise<SiteSetting | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
  if (error) {
    console.error("[crm] getSiteSettings failed", error.message);
    return null;
  }
  return data;
}
