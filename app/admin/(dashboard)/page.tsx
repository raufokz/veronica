import Link from "next/link";
import { getAllLeads, getAllListingsAdmin, getAllTestimonialsAdmin } from "@/lib/data/admin";
import { getRecentActivityLogs, getUpcomingAppointments } from "@/lib/data/crm";
import { formatLeadStatus } from "@/lib/lead-status";
import type { LeadStatus } from "@/types/supabase";
import {
  PipelineChart,
  PropertyStatusChart,
  MonthlyLeadsChart,
} from "@/components/admin/dashboard-charts";

export const dynamic = "force-dynamic";

const pipelineLabels: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  showing_scheduled: "Showing",
  offer_made: "Offer",
  closed_won: "Won",
  closed_lost: "Lost",
  archived: "Archived",
};

export default async function AdminOverviewPage() {
  const [leads, listings, testimonials, activity, appointments] = await Promise.all([
    getAllLeads(),
    getAllListingsAdmin(),
    getAllTestimonialsAdmin(),
    getRecentActivityLogs(10),
    getUpcomingAppointments(5),
  ]);

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const pipelineData = (Object.keys(pipelineLabels) as LeadStatus[]).map((status) => ({
    name: pipelineLabels[status],
    value: leads.filter((l) => l.status === status).length,
  }));

  const statusCounts = ["active", "pending", "sold"].map((s) => ({
    name: s.charAt(0).toUpperCase() + s.slice(1),
    value: listings.filter((l) => l.status === s).length,
  }));

  const months: Array<{ month: string; leads: number }> = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const label = d.toLocaleDateString("en-US", { month: "short" });
    const count = leads.filter((l) => {
      const created = new Date(l.created_at);
      return created.getFullYear() === d.getFullYear() && created.getMonth() === d.getMonth();
    }).length;
    months.push({ month: label, leads: count });
  }

  const newThisMonth = leads.filter((l) => new Date(l.created_at) >= startOfMonth).length;

  const cards = [
    { label: "Listings", value: listings.length, href: "/admin/listings" },
    { label: "New leads this month", value: newThisMonth, href: "/admin/leads" },
    { label: "Total leads", value: leads.length, href: "/admin/leads" },
    { label: "Testimonials", value: testimonials.length, href: "/admin/testimonials" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl">Overview</h1>

      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-xl border border-black/10 bg-white p-6 hover:-translate-y-0.5 transition-transform"
          >
            <p className="text-3xl font-semibold tabular-nums">{card.value}</p>
            <p className="mt-1 text-sm text-slate">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard title="Lead pipeline">
          <PipelineChart data={pipelineData} />
        </ChartCard>
        <ChartCard title="Property status">
          <PropertyStatusChart data={statusCounts} />
        </ChartCard>
        <ChartCard title="Monthly leads">
          <MonthlyLeadsChart data={months} />
        </ChartCard>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
        <div className="rounded-xl border border-black/10 bg-white p-6">
          <h2 className="font-display text-lg font-semibold">Recent activity</h2>
          {activity.length === 0 ? (
            <p className="mt-3 text-sm text-slate">No activity yet.</p>
          ) : (
            <ul className="mt-4 space-y-3 text-sm">
              {activity.map((log) => (
                <li key={log.id} className="flex items-start justify-between gap-4 border-b border-black/5 pb-3 last:border-0">
                  <div>
                    <span className="font-medium capitalize">{log.action.replace("_", " ")}</span>
                    <span className="text-slate"> · {log.entity_type}</span>
                    {log.details && typeof log.details === "object" && "to" in log.details && (
                      <span className="text-slate"> → {formatLeadStatus((log.details as { to: LeadStatus }).to)}</span>
                    )}
                  </div>
                  <time className="shrink-0 text-xs text-slate">
                    {new Date(log.created_at).toLocaleString()}
                  </time>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-xl border border-black/10 bg-white p-6">
          <h2 className="font-display text-lg font-semibold">Upcoming appointments</h2>
          {appointments.length === 0 ? (
            <p className="mt-3 text-sm text-slate">
              None scheduled.{" "}
              <Link href="/admin/appointments" className="text-brand underline">
                Add one
              </Link>
              .
            </p>
          ) : (
            <ul className="mt-4 space-y-3 text-sm">
              {appointments.map((appt) => (
                <li key={appt.id} className="flex items-start justify-between gap-4 border-b border-black/5 pb-3 last:border-0">
                  <div>
                    <p className="font-medium">{appt.client_name}</p>
                    <p className="text-slate capitalize">{appt.appointment_type?.replace("_", " ")}</p>
                  </div>
                  <time className="shrink-0 text-xs text-slate">
                    {new Date(`${appt.appointment_date}T${appt.appointment_time}`).toLocaleString([], {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </time>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-black/10 bg-white p-6">
      <h2 className="font-display text-lg font-semibold">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}
