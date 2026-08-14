import { getAllLeads } from "@/lib/data/admin";
import { LeadsView } from "@/components/admin/leads-view";
import { PageHeader } from "@/components/admin/page-header";

export default async function AdminLeadsPage() {
  const leads = await getAllLeads();

  return (
    <div>
      <PageHeader title="Leads" />
      <LeadsView leads={leads} />
    </div>
  );
}
