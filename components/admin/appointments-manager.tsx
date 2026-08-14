"use client";

import { useEffect, useState, useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Plus, Trash2, LayoutGrid, List, Pencil } from "lucide-react";
import { appointmentSchema, type AppointmentFormInput } from "@/lib/schemas";
import {
  createAppointment,
  updateAppointment,
  deleteAppointment,
  updateAppointmentStatus,
} from "@/app/actions/admin-appointments";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { buttonVariants } from "@/components/ui/button";
import { AppointmentsCalendar } from "@/components/admin/appointments-calendar";
import type { Appointment, AppointmentStatus, Lead, Property } from "@/types/supabase";
import { cn } from "@/lib/utils";

const statusStyles: Record<AppointmentStatus, string> = {
  scheduled: "bg-blue-100 text-blue-700",
  confirmed: "bg-gold/20 text-ink",
  completed: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-black/10 text-slate",
  no_show: "bg-brand/10 text-brand",
};

const typeLabels: Record<string, string> = {
  showing: "Showing",
  open_house: "Open house",
  consultation: "Consultation",
  closing: "Closing",
};

function toFormValues(appt?: Appointment | null): AppointmentFormInput {
  if (!appt) {
    return {
      client_name: "",
      appointment_type: "showing",
      duration_minutes: 60,
      appointment_date: new Date().toISOString().slice(0, 10),
      appointment_time: "10:00",
      property_id: "",
      lead_id: "",
    };
  }
  return {
    client_name: appt.client_name,
    client_email: appt.client_email ?? "",
    client_phone: appt.client_phone ?? "",
    appointment_date: appt.appointment_date,
    appointment_time: appt.appointment_time,
    duration_minutes: appt.duration_minutes,
    appointment_type: appt.appointment_type ?? "showing",
    notes: appt.notes ?? "",
    property_id: appt.property_id ?? "",
    lead_id: appt.lead_id ?? "",
  };
}

export function AppointmentsManager({
  appointments,
  listings,
  leads,
}: {
  appointments: Appointment[];
  listings: Property[];
  leads: Lead[];
}) {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Appointment | null>(null);
  const [view, setView] = useState<"list" | "calendar">("list");
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentFormInput>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: toFormValues(null),
  });

  useEffect(() => {
    reset(toFormValues(editing));
  }, [editing, reset]);

  async function onSubmit(values: AppointmentFormInput) {
    const result = editing
      ? await updateAppointment(editing.id, values)
      : await createAppointment(values);
    if (!result.success) {
      toast.error(result.error);
    } else {
      toast.success(editing ? "Appointment updated." : "Appointment scheduled.");
      setShowForm(false);
      setEditing(null);
      reset(toFormValues(null));
    }
  }

  function onEdit(appt: Appointment) {
    setEditing(appt);
    setShowForm(true);
  }

  function onCancelForm() {
    setShowForm(false);
    setEditing(null);
    reset(toFormValues(null));
  }

  function onStatusChange(id: string, value: string | null) {
    if (!value) return;
    startTransition(() => {
      updateAppointmentStatus(id, value as AppointmentStatus).then((res) => {
        if (!res.success) toast.error(res.error);
      });
    });
  }

  function onDelete(id: string, name: string) {
    if (!confirm(`Delete the appointment for ${name}?`)) return;
    startTransition(() => {
      deleteAppointment(id).then((res) => {
        if (!res.success) toast.error(res.error);
        else toast.success("Appointment deleted.");
      });
    });
  }

  const dayFiltered = selectedDay ? appointments.filter((a) => a.appointment_date === selectedDay) : appointments;
  const upcoming = dayFiltered
    .filter((a) => a.status === "scheduled" || a.status === "confirmed")
    .sort((a, b) => (a.appointment_date + a.appointment_time).localeCompare(b.appointment_date + b.appointment_time));
  const past = dayFiltered.filter((a) => !upcoming.includes(a));

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate">{appointments.length} total</p>
        <div className="flex items-center gap-2">
          <div className="flex rounded-full border border-black/10 p-1">
            {(
              [
                { value: "list", label: "List", icon: List },
                { value: "calendar", label: "Calendar", icon: LayoutGrid },
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
          <button
            type="button"
            onClick={() => (showForm && !editing ? onCancelForm() : setShowForm(true))}
            className={cn(buttonVariants(), "rounded-full bg-brand hover:bg-brand/90 text-white px-5")}
          >
            <Plus className="size-4 mr-1" />
            New appointment
          </button>
        </div>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 rounded-xl border border-black/10 bg-white p-6"
          noValidate
        >
          {editing && (
            <p className="lg:col-span-3 text-sm font-medium text-brand">Editing appointment for {editing.client_name}</p>
          )}
          <Field label="Client name *" error={errors.client_name?.message}>
            <Input {...register("client_name")} />
          </Field>
          <Field label="Email">
            <Input type="email" {...register("client_email")} />
          </Field>
          <Field label="Phone">
            <Input type="tel" {...register("client_phone")} />
          </Field>
          <Field label="Date *" error={errors.appointment_date?.message}>
            <Input type="date" {...register("appointment_date")} />
          </Field>
          <Field label="Time *" error={errors.appointment_time?.message}>
            <Input type="time" {...register("appointment_time")} />
          </Field>
          <Field label="Duration (min)">
            <Input type="number" {...register("duration_minutes")} />
          </Field>
          <Field label="Type">
            <Controller
              control={control}
              name="appointment_type"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="showing">Showing</SelectItem>
                    <SelectItem value="open_house">Open house</SelectItem>
                    <SelectItem value="consultation">Consultation</SelectItem>
                    <SelectItem value="closing">Closing</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </Field>
          <Field label="Property (optional)">
            <Controller
              control={control}
              name="property_id"
              render={({ field }) => (
                <Select value={field.value || "none"} onValueChange={(v) => field.onChange(v === "none" ? "" : v)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="No property" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No property</SelectItem>
                    {listings.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </Field>
          <Field label="Lead (optional)">
            <Controller
              control={control}
              name="lead_id"
              render={({ field }) => (
                <Select value={field.value || "none"} onValueChange={(v) => field.onChange(v === "none" ? "" : v)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="No linked lead" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No linked lead</SelectItem>
                    {leads.map((l) => (
                      <SelectItem key={l.id} value={l.id}>
                        {l.full_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </Field>
          <Field label="Notes">
            <Textarea rows={1} {...register("notes")} />
          </Field>
          <div className="flex items-end gap-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(buttonVariants(), "rounded-full bg-brand hover:bg-brand/90 text-white px-6")}
            >
              {isSubmitting ? "Saving…" : editing ? "Save changes" : "Schedule"}
            </button>
            <button
              type="button"
              onClick={onCancelForm}
              className={cn(buttonVariants({ variant: "outline" }), "rounded-full px-6")}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {view === "calendar" && (
        <div className="mt-6">
          <AppointmentsCalendar appointments={appointments} onSelectDay={setSelectedDay} selectedDay={selectedDay} />
          {selectedDay && (
            <p className="mt-3 text-sm text-slate">
              Showing {dayFiltered.length} appointment{dayFiltered.length === 1 ? "" : "s"} on{" "}
              {new Date(`${selectedDay}T00:00:00`).toLocaleDateString(undefined, { month: "long", day: "numeric" })} —{" "}
              <button onClick={() => setSelectedDay(null)} className="text-brand underline">
                clear
              </button>
            </p>
          )}
        </div>
      )}

      <AppointmentSection
        title="Upcoming"
        appointments={upcoming}
        isPending={isPending}
        onStatusChange={onStatusChange}
        onDelete={onDelete}
        onEdit={onEdit}
      />
      <AppointmentSection
        title="Past"
        appointments={past}
        isPending={isPending}
        onStatusChange={onStatusChange}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </div>
  );
}

function AppointmentSection({
  title,
  appointments,
  isPending,
  onStatusChange,
  onDelete,
  onEdit,
}: {
  title: string;
  appointments: Appointment[];
  isPending: boolean;
  onStatusChange: (id: string, value: string | null) => void;
  onDelete: (id: string, name: string) => void;
  onEdit: (appt: Appointment) => void;
}) {
  return (
    <div className="mt-8">
      <h2 className="font-display text-lg font-semibold">{title}</h2>
      {appointments.length === 0 ? (
        <p className="mt-3 text-sm text-slate">None.</p>
      ) : (
        <div className="mt-3 overflow-x-auto rounded-xl border border-black/10 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/10 text-left text-xs uppercase tracking-wide text-slate">
                <th className="p-4">Date</th>
                <th className="p-4">Time</th>
                <th className="p-4">Client</th>
                <th className="p-4">Type</th>
                <th className="p-4">Status</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt.id} className="border-b border-black/5 align-top last:border-0">
                  <td className="p-4 whitespace-nowrap">{appt.appointment_date}</td>
                  <td className="p-4 whitespace-nowrap">{appt.appointment_time}</td>
                  <td className="p-4">
                    <p className="font-medium">{appt.client_name}</p>
                    {appt.client_phone && <p className="text-slate">{appt.client_phone}</p>}
                  </td>
                  <td className="p-4 capitalize">{appt.appointment_type ? typeLabels[appt.appointment_type] : "—"}</td>
                  <td className="p-4">
                    <Select
                      value={appt.status}
                      onValueChange={(v) => onStatusChange(appt.id, v)}
                      disabled={isPending}
                    >
                      <SelectTrigger className={cn("h-8 w-36 border-0 capitalize", statusStyles[appt.status])}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(statusStyles).map((s) => (
                          <SelectItem key={s} value={s} className="capitalize">
                            {s.replace("_", " ")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => onEdit(appt)}
                        aria-label="Edit appointment"
                        className="text-slate hover:text-ink"
                      >
                        <Pencil className="size-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(appt.id, appt.client_name)}
                        aria-label="Delete appointment"
                        className="text-slate hover:text-brand"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-xs text-brand">{error}</p>}
    </div>
  );
}
