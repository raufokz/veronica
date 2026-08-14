"use client";

import { useState } from "react";
import { useTransition } from "react";
import { toast } from "sonner";
import { updateLeadStatus } from "@/app/actions/admin-leads";
import { LeadDetailDrawer } from "@/components/admin/lead-detail-drawer";
import { leadStatusLabels, leadStatusColor } from "@/lib/lead-status";
import type { Lead, LeadStatus } from "@/types/supabase";
import { cn } from "@/lib/utils";

export function LeadKanban({ leads }: { leads: Lead[] }) {
  const [columns, setColumns] = useState<Record<LeadStatus, Lead[]>>(() => {
    const init = Object.fromEntries(leadStatusLabels.map(({ value }) => [value, [] as Lead[]])) as Record<LeadStatus, Lead[]>;
    for (const lead of leads) {
      (init[lead.status] ??= []).push(lead);
    }
    return init;
  });
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [overStatus, setOverStatus] = useState<LeadStatus | null>(null);
  const [selected, setSelected] = useState<Lead | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function onDrop(status: LeadStatus) {
    if (!draggingId) return;
    const lead = leads.find((l) => l.id === draggingId);
    setDraggingId(null);
    setOverStatus(null);
    if (!lead || lead.status === status) return;

    setColumns((prev) => {
      const next: Record<LeadStatus, Lead[]> = {
        ...prev,
        [lead.status]: prev[lead.status].filter((l) => l.id !== lead.id),
        [status]: [lead, ...prev[status]],
      };
      return next;
    });

    startTransition(() => {
      updateLeadStatus(lead.id, status).then((res) => {
        if (!res.success) toast.error(res.error);
      });
    });
  }

  return (
    <>
      <div className="flex gap-3 overflow-x-auto pb-4">
        {leadStatusLabels.map(({ value, label }) => {
          const items = columns[value];
          const isOver = overStatus === value;
          return (
            <div
              key={value}
              onDragOver={(e) => {
                e.preventDefault();
                setOverStatus(value);
              }}
              onDragLeave={() => setOverStatus((s) => (s === value ? null : s))}
              onDrop={() => onDrop(value)}
              className={cn(
                "flex w-60 shrink-0 flex-col rounded-xl border bg-white transition-colors",
                isOver ? "border-brand bg-brand/5" : "border-black/10"
              )}
            >
              <div
                className="flex items-center justify-between px-3 py-2.5 border-b border-black/5"
                style={{ backgroundColor: `${leadStatusColor[value]}14` }}
              >
                <span className="text-xs font-semibold uppercase tracking-wide">{label}</span>
                <span className="text-xs tabular-nums text-slate">{items.length}</span>
              </div>

              <div className="flex flex-col gap-2 p-2">
                {items.map((lead) => (
                  <button
                    key={lead.id}
                    type="button"
                    draggable
                    onDragStart={(e) => {
                      setDraggingId(lead.id);
                      e.dataTransfer.effectAllowed = "move";
                    }}
                    onDragEnd={() => {
                      setDraggingId(null);
                      setOverStatus(null);
                    }}
                    onClick={() => {
                      setSelected(lead);
                      setDrawerOpen(true);
                    }}
                    className={cn(
                      "cursor-grab rounded-lg border border-black/10 bg-white p-3 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md",
                      draggingId === lead.id && "opacity-50"
                    )}
                  >
                    <p className="text-sm font-medium">{lead.full_name}</p>
                    <p className="mt-0.5 text-xs text-slate truncate">{lead.email}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[11px] uppercase tracking-wide text-slate">
                        {lead.interest_type?.replace("_", " ") ?? "—"}
                      </span>
                      <span
                        className="text-[11px] text-slate"
                        title={new Date(lead.created_at).toLocaleString()}
                      >
                        {new Date(lead.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </button>
                ))}
                {items.length === 0 && (
                  <p className="px-2 py-4 text-center text-xs text-slate">Drop leads here</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {isPending && (
        <p className="text-xs text-slate">Saving status…</p>
      )}
      <p className="mt-2 text-xs text-slate">
        Drag a card to change its status, or click to open the full detail.
      </p>

      <LeadDetailDrawer
        lead={selected}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        onStatusChanged={(leadId, newStatus) => {
          setColumns((prev) => {
            const origin = leadStatusLabels.find(({ value }) => prev[value].some((l) => l.id === leadId));
            if (!origin) return prev;
            const lead = prev[origin.value].find((l) => l.id === leadId);
            if (!lead || origin.value === newStatus) return prev;
            return {
              ...prev,
              [origin.value]: prev[origin.value].filter((l) => l.id !== leadId),
              [newStatus]: [lead, ...prev[newStatus]],
            };
          });
        }}
      />
    </>
  );
}
