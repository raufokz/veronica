"use client";

import { useMemo, useState } from "react";
import { LayoutGrid, List, Download } from "lucide-react";
import { LeadKanban } from "@/components/admin/lead-kanban";
import { LeadsTable } from "@/components/admin/leads-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { leadStatusLabels, formatLeadStatus } from "@/lib/lead-status";
import type { Lead, LeadStatus } from "@/types/supabase";
import { cn } from "@/lib/utils";

const interestTypes = ["buying", "selling", "investing", "valuation", "other"] as const;

function toCsv(leads: Lead[]): string {
  const headers = [
    "Name",
    "Email",
    "Phone",
    "Interest",
    "Status",
    "Source",
    "Language",
    "Message",
    "Received",
  ];
  const rows = leads.map((l) => [
    l.full_name,
    l.email,
    l.phone ?? "",
    l.interest_type ?? "",
    formatLeadStatus(l.status),
    l.source_page ?? "",
    l.preferred_language,
    (l.message ?? "").replace(/\r?\n/g, " "),
    new Date(l.created_at).toISOString(),
  ]);
  const escape = (v: string) => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);
  return [headers, ...rows].map((row) => row.map((c) => escape(String(c))).join(",")).join("\n");
}

function downloadCsv(csv: string, filename: string) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function LeadsView({ leads }: { leads: Lead[] }) {
  const [view, setView] = useState<"kanban" | "table">("kanban");
  const [status, setStatus] = useState<LeadStatus | "all">("all");
  const [interest, setInterest] = useState<(typeof interestTypes)[number] | "all">("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return leads.filter((lead) => {
      if (status !== "all" && lead.status !== status) return false;
      if (interest !== "all" && lead.interest_type !== interest) return false;
      if (dateFrom && new Date(lead.created_at) < new Date(dateFrom)) return false;
      if (dateTo && new Date(lead.created_at) > new Date(`${dateTo}T23:59:59`)) return false;
      if (query) {
        const q = query.toLowerCase();
        const haystack = `${lead.full_name} ${lead.email} ${lead.phone ?? ""}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [leads, status, interest, dateFrom, dateTo, query]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate">
          {filtered.length} of {leads.length}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => downloadCsv(toCsv(filtered), `leads-${new Date().toISOString().slice(0, 10)}.csv`)}
            className="flex items-center gap-1.5 rounded-full border border-black/10 px-3 py-1.5 text-sm font-medium text-ink/70 hover:text-ink hover:border-ink"
          >
            <Download className="size-4" />
            Export CSV
          </button>
          <div className="flex rounded-full border border-black/10 p-1">
            {(
              [
                { value: "kanban", label: "Board", icon: LayoutGrid },
                { value: "table", label: "Table", icon: List },
              ] as const
            ).map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                type="button"
                onClick={() => setView(value)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                  view === value ? "bg-ink text-white" : "text-ink/70 hover:text-ink"
                )}
              >
                <Icon className="size-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name, email, phone…"
          className="h-9 w-56"
        />
        <Select value={status} onValueChange={(v) => setStatus((v as LeadStatus | "all") ?? "all")}>
          <SelectTrigger className="h-9 w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {leadStatusLabels.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={interest}
          onValueChange={(v) => setInterest((v as (typeof interestTypes)[number] | "all") ?? "all")}
        >
          <SelectTrigger className="h-9 w-40">
            <SelectValue placeholder="Interest" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All interests</SelectItem>
            {interestTypes.map((i) => (
              <SelectItem key={i} value={i} className="capitalize">
                {i}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="h-9 w-36" />
        <span className="text-sm text-slate">to</span>
        <Input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="h-9 w-36" />
      </div>

      <div className="mt-6">
        {view === "kanban" ? <LeadKanban leads={filtered} /> : <LeadsTable leads={filtered} />}
      </div>
    </div>
  );
}
