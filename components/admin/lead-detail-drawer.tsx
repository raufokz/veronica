"use client";

import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { Loader2, Plus, Phone, Mail } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
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
import {
  addLeadNote,
  getLeadActivityAction,
  getLeadNotesAction,
  updateLeadContact,
  updateLeadStatus,
} from "@/app/actions/admin-leads";
import type { ActivityLog, Lead, LeadNote, LeadStatus } from "@/types/supabase";
import { leadStatusLabels, leadStatusColor, formatLeadStatus } from "@/lib/lead-status";
import { cn } from "@/lib/utils";

export function LeadDetailDrawer({
  lead,
  open,
  onOpenChange,
  onStatusChanged,
}: {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStatusChanged?: (leadId: string, newStatus: LeadStatus) => void;
}) {
  const [notes, setNotes] = useState<LeadNote[]>([]);
  const [loadingNotes, setLoadingNotes] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [addingNote, startNoteTransition] = useTransition();
  const [savingStatus, startStatusTransition] = useTransition();
  const [activity, setActivity] = useState<ActivityLog[]>([]);
  const [loadingActivity, setLoadingActivity] = useState(false);

  const status = lead?.status ?? "new";

  useEffect(() => {
    if (open && lead) {
      setLoadingNotes(true);
      setNoteText("");
      getLeadNotesAction(lead.id)
        .then(setNotes)
        .finally(() => setLoadingNotes(false));

      setLoadingActivity(true);
      getLeadActivityAction(lead.id)
        .then(setActivity)
        .finally(() => setLoadingActivity(false));
    }
  }, [open, lead]);

  if (!lead) return null;

  function onStatusChange(next: string | null) {
    if (!lead || !next || next === lead.status) return;
    startStatusTransition(() => {
      updateLeadStatus(lead.id, next as LeadStatus).then((res) => {
        if (!res.success) toast.error(res.error);
        else {
          onStatusChanged?.(lead.id, next as LeadStatus);
          getLeadActivityAction(lead.id).then(setActivity);
        }
      });
    });
  }

  function onSubmitNote(e: React.FormEvent) {
    e.preventDefault();
    if (!lead || !noteText.trim()) return;
    startNoteTransition(() => {
          addLeadNote(lead.id, noteText).then((res) => {
            if (!res.success) {
              toast.error(res.error);
            } else {
              toast.success("Note added.");
              setNoteText("");
              getLeadNotesAction(lead.id).then(setNotes);
              getLeadActivityAction(lead.id).then(setActivity);
            }
          });
    });
  }

  function onSaveContact(e: React.FormEvent) {
    e.preventDefault();
    if (!lead) return;
    const form = new FormData(e.currentTarget as HTMLFormElement);
    startNoteTransition(() => {
      updateLeadContact(lead.id, {
        full_name: String(form.get("full_name") ?? lead.full_name),
        phone: String(form.get("phone") ?? ""),
        message: String(form.get("message") ?? ""),
      }).then((res) => {
        if (!res.success) toast.error(res.error);
        else toast.success("Contact saved.");
      });
    });
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="font-display flex items-center gap-2">
            <span className="inline-block size-2 rounded-full" style={{ backgroundColor: leadStatusColor[status] }} />
            {lead.full_name}
          </SheetTitle>
        </SheetHeader>

        <div className="mt-4 flex items-center gap-2">
          <span className="text-xs uppercase tracking-wide text-slate">Status</span>
          <Select value={status} onValueChange={onStatusChange} disabled={savingStatus}>
            <SelectTrigger className="h-8 w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {leadStatusLabels.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mt-4 space-y-1.5 text-sm">
          {lead.email && (
            <a href={`mailto:${lead.email}`} className="flex items-center gap-2 text-brand hover:underline">
              <Mail className="size-4" /> {lead.email}
            </a>
          )}
          {lead.phone && (
            <a href={`tel:${lead.phone}`} className="flex items-center gap-2 text-brand hover:underline">
              <Phone className="size-4" /> {lead.phone}
            </a>
          )}
          <p className="text-slate">
            Received {new Date(lead.created_at).toLocaleString()}
            {lead.source_page ? ` · ${lead.source_page}` : ""}
          </p>
          <p className="text-slate capitalize">
            {lead.interest_type ? `Interest: ${lead.interest_type.replace("_", " ")}` : ""}
          </p>
        </div>

        <form onSubmit={onSaveContact} className="mt-6 space-y-4 border-t border-black/10 pt-5">
          <p className="text-sm font-semibold">Contact details</p>
          <div className="space-y-1.5">
            <Label htmlFor="full_name">Name</Label>
            <Input id="full_name" name="full_name" defaultValue={lead.full_name} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" type="tel" defaultValue={lead.phone ?? ""} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" name="message" rows={3} defaultValue={lead.message ?? ""} />
          </div>
          <button
            type="submit"
            className={cn(
              "rounded-full border border-ink/20 px-4 py-2 text-sm font-medium hover:bg-ink hover:text-white transition-colors"
            )}
          >
            Save contact
          </button>
        </form>

        <div className="mt-8 border-t border-black/10 pt-5">
          <p className="text-sm font-semibold">Notes</p>
          <form onSubmit={onSubmitNote} className="mt-3 flex gap-2">
            <Input
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Add a note…"
            />
            <Button
              type="submit"
              disabled={addingNote || !noteText.trim()}
              size="icon"
              className="shrink-0 rounded-full bg-brand hover:bg-brand/90 text-white"
              aria-label="Add note"
            >
              {addingNote ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
            </Button>
          </form>

          <div className="mt-4 space-y-3">
            {loadingNotes && <p className="text-sm text-slate">Loading…</p>}
            {!loadingNotes && notes.length === 0 && <p className="text-sm text-slate">No notes yet.</p>}
            {notes.map((note) => (
              <div key={note.id} className="rounded-lg border border-black/10 bg-sand/60 p-3">
                <p className="text-sm">{note.note}</p>
                <p className="mt-1.5 text-xs text-slate">
                  {new Date(note.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-black/10 pt-5">
          <p className="text-sm font-semibold">Activity</p>
          <div className="mt-4 space-y-3">
            {loadingActivity && <p className="text-sm text-slate">Loading…</p>}
            {!loadingActivity && activity.length === 0 && (
              <p className="text-sm text-slate">No activity yet.</p>
            )}
            {activity.map((log) => (
              <div key={log.id} className="flex items-start justify-between gap-4 text-sm">
                <div>
                  <span className="font-medium capitalize">{log.action.replace("_", " ")}</span>
                  {log.details && typeof log.details === "object" && "to" in log.details && (
                    <span className="text-slate"> → {formatLeadStatus((log.details as { to: LeadStatus }).to)}</span>
                  )}
                </div>
                <time className="shrink-0 text-xs text-slate">
                  {new Date(log.created_at).toLocaleString()}
                </time>
              </div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
