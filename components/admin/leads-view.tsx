"use client";

import { useState } from "react";
import { LayoutGrid, List } from "lucide-react";
import { LeadKanban } from "@/components/admin/lead-kanban";
import { LeadsTable } from "@/components/admin/leads-table";
import type { Lead } from "@/types/supabase";
import { cn } from "@/lib/utils";

export function LeadsView({ leads }: { leads: Lead[] }) {
  const [view, setView] = useState<"kanban" | "table">("kanban");

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate">{leads.length} total</p>
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

      <div className="mt-6">
        {view === "kanban" ? <LeadKanban leads={leads} /> : <LeadsTable leads={leads} />}
      </div>
    </div>
  );
}
