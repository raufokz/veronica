import { getAllAppointments } from "@/lib/data/crm";
import { AppointmentsManager } from "@/components/admin/appointments-manager";

export default async function AdminAppointmentsPage() {
  const appointments = await getAllAppointments();

  return (
    <div>
      <h1 className="font-display text-2xl">Appointments</h1>
      <p className="mt-1 text-sm text-slate">Showings, consultations, and closings.</p>
      <div className="mt-6">
        <AppointmentsManager appointments={appointments} />
      </div>
    </div>
  );
}
