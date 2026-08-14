import { getAllLeads } from "@/lib/data/admin";
import { LeadsView } from "@/components/admin/leads-view";

export default async function AdminLeadsPage() {
  const leads = await getAllLeads();

  return (
    <div>
      <h1 className="font-display text-2xl">Leads</h1>
      <div className="mt-6">
        <LeadsView leads={leads} />
      </div>
    </div>
  );
}
