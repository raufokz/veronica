"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Appointment } from "@/types/supabase";
import { cn } from "@/lib/utils";

function toDateKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function AppointmentsCalendar({
  appointments,
  onSelectDay,
  selectedDay,
}: {
  appointments: Appointment[];
  onSelectDay: (day: string | null) => void;
  selectedDay: string | null;
}) {
  const [cursor, setCursor] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const byDay = useMemo(() => {
    const map = new Map<string, Appointment[]>();
    for (const appt of appointments) {
      const list = map.get(appt.appointment_date) ?? [];
      list.push(appt);
      map.set(appt.appointment_date, list);
    }
    return map;
  }, [appointments]);

  const days = useMemo(() => {
    const firstOfMonth = cursor;
    const startWeekday = firstOfMonth.getDay();
    const gridStart = new Date(firstOfMonth);
    gridStart.setDate(gridStart.getDate() - startWeekday);

    return Array.from({ length: 42 }, (_, i) => {
      const d = new Date(gridStart);
      d.setDate(gridStart.getDate() + i);
      return d;
    });
  }, [cursor]);

  const monthLabel = cursor.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <div className="rounded-xl border border-black/10 bg-white p-4">
      <div className="flex items-center justify-between px-1">
        <h3 className="font-display text-lg">{monthLabel}</h3>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setCursor((c) => new Date(c.getFullYear(), c.getMonth() - 1, 1))}
            aria-label="Previous month"
            className="rounded-full p-1.5 hover:bg-sand"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => setCursor((c) => new Date(c.getFullYear(), c.getMonth() + 1, 1))}
            aria-label="Next month"
            className="rounded-full p-1.5 hover:bg-sand"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs font-medium uppercase tracking-wide text-slate">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const key = toDateKey(day);
          const inMonth = day.getMonth() === cursor.getMonth();
          const dayAppointments = byDay.get(key) ?? [];
          const isSelected = selectedDay === key;

          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelectDay(isSelected ? null : key)}
              className={cn(
                "flex min-h-16 flex-col items-start gap-1 rounded-lg border p-1.5 text-left transition-colors",
                inMonth ? "border-black/5" : "border-transparent opacity-40",
                isSelected ? "border-brand bg-brand/5" : "hover:border-black/15"
              )}
            >
              <span className="text-xs tabular-nums text-slate">{day.getDate()}</span>
              {dayAppointments.slice(0, 2).map((a) => (
                <span
                  key={a.id}
                  className="w-full truncate rounded bg-sand px-1 text-[10px] font-medium text-ink"
                >
                  {a.appointment_time.slice(0, 5)} {a.client_name}
                </span>
              ))}
              {dayAppointments.length > 2 && (
                <span className="text-[10px] text-slate">+{dayAppointments.length - 2} more</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
