import { getAllLeads } from "@/lib/data/admin";
import { LeadsTable } from "@/components/admin/leads-table";

export default async function AdminLeadsPage() {
  const leads = await getAllLeads();

  return (
    <div>
      <h1 className="font-display text-2xl">Leads</h1>
      <p className="mt-1 text-sm text-slate">{leads.length} total</p>
      <div className="mt-6">
        <LeadsTable leads={leads} />
      </div>
    </div>
  );
}
