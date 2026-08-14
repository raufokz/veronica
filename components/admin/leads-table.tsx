"use client";

import { useState, useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateLeadStatus } from "@/app/actions/admin-leads";
import type { Lead, LeadStatus } from "@/types/supabase";

const statuses: LeadStatus[] = ["new", "contacted", "nurturing", "closed", "archived"];

const statusColor: Record<LeadStatus, string> = {
  new: "bg-brand/10 text-brand",
  contacted: "bg-blue-100 text-blue-700",
  nurturing: "bg-gold/20 text-ink",
  closed: "bg-green-100 text-green-700",
  archived: "bg-black/10 text-slate",
};

export function LeadsTable({ leads }: { leads: Lead[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-black/10 bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-black/10 text-left text-xs uppercase tracking-wide text-slate">
            <th className="p-4">Name</th>
            <th className="p-4">Contact</th>
            <th className="p-4">Interest</th>
            <th className="p-4">Message</th>
            <th className="p-4">Source</th>
            <th className="p-4">Lang</th>
            <th className="p-4">Received</th>
            <th className="p-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <LeadRow key={lead.id} lead={lead} />
          ))}
          {leads.length === 0 && (
            <tr>
              <td colSpan={8} className="p-8 text-center text-slate">
                No leads yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function LeadRow({ lead }: { lead: Lead }) {
  const [status, setStatus] = useState<LeadStatus>(lead.status);
  const [isPending, startTransition] = useTransition();

  function onStatusChange(value: string | null) {
    if (!value) return;
    const next = value as LeadStatus;
    setStatus(next);
    startTransition(() => {
      updateLeadStatus(lead.id, next);
    });
  }

  return (
    <tr className="border-b border-black/5 align-top last:border-0">
      <td className="p-4 font-medium">{lead.full_name}</td>
      <td className="p-4">
        <a href={`mailto:${lead.email}`} className="text-brand hover:underline">
          {lead.email}
        </a>
        {lead.phone && (
          <>
            <br />
            <a href={`tel:${lead.phone}`} className="text-brand hover:underline">
              {lead.phone}
            </a>
          </>
        )}
      </td>
      <td className="p-4 capitalize">{lead.interest_type}</td>
      <td className="p-4 max-w-xs text-slate">{lead.message ?? "—"}</td>
      <td className="p-4 text-slate">{lead.source_page ?? "—"}</td>
      <td className="p-4 uppercase text-xs text-slate">{lead.preferred_language}</td>
      <td className="p-4 text-slate whitespace-nowrap">
        {new Date(lead.created_at).toLocaleDateString()}
      </td>
      <td className="p-4">
        <Select value={status} onValueChange={onStatusChange} disabled={isPending}>
          <SelectTrigger className={`h-8 border-0 ${statusColor[status]}`}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {statuses.map((s) => (
              <SelectItem key={s} value={s} className="capitalize">
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </td>
    </tr>
  );
}
