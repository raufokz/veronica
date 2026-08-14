import { getAllAppointments } from "@/lib/data/crm";
import { getAllListingsAdmin, getAllLeads } from "@/lib/data/admin";
import { AppointmentsManager } from "@/components/admin/appointments-manager";
import { PageHeader } from "@/components/admin/page-header";

export default async function AdminAppointmentsPage() {
  const [appointments, listings, leads] = await Promise.all([
    getAllAppointments(),
    getAllListingsAdmin(),
    getAllLeads(),
  ]);

  return (
    <div>
      <PageHeader title="Appointments" description="Showings, consultations, and closings." />
      <AppointmentsManager appointments={appointments} listings={listings} leads={leads} />
    </div>
  );
}
