import type { LeadStatus } from "@/types/supabase";

export const leadStatusLabels: Array<{ value: LeadStatus; label: string }> = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified" },
  { value: "showing_scheduled", label: "Showing Scheduled" },
  { value: "offer_made", label: "Offer Made" },
  { value: "closed_won", label: "Closed Won" },
  { value: "closed_lost", label: "Closed Lost" },
  { value: "archived", label: "Archived" },
];

export const leadStatusColor: Record<LeadStatus, string> = {
  new: "#cd1935",
  contacted: "#3b82f6",
  qualified: "#c5a059",
  showing_scheduled: "#8b5cf6",
  offer_made: "#f59e0b",
  closed_won: "#10b981",
  closed_lost: "#6b6b66",
  archived: "#a3a3a0",
};

export function formatLeadStatus(status: LeadStatus): string {
  return leadStatusLabels.find((s) => s.value === status)?.label ?? status.replace("_", " ");
}
