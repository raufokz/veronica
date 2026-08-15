"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { GripVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { reorderTestimonials } from "@/app/actions/admin-testimonials";
import type { Testimonial } from "@/types/supabase";
import { cn } from "@/lib/utils";

export function TestimonialsTable({ testimonials: initial }: { testimonials: Testimonial[] }) {
  const [testimonials, setTestimonials] = useState(initial);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  function onDrop(targetId: string) {
    if (!draggingId || draggingId === targetId) {
      setDraggingId(null);
      return;
    }
    setTestimonials((prev) => {
      const fromIndex = prev.findIndex((t) => t.id === draggingId);
      const toIndex = prev.findIndex((t) => t.id === targetId);
      if (fromIndex === -1 || toIndex === -1) return prev;
      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);

      startTransition(() => {
        reorderTestimonials(next.map((t) => t.id)).then((res) => {
          if (!res.success) toast.error(res.error);
        });
      });

      return next;
    });
    setDraggingId(null);
  }

  return (
    <div className="mt-6 overflow-x-auto rounded-xl border border-black/10 bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-black/10 text-left text-xs uppercase tracking-wide text-slate">
            <th className="p-4 w-8"></th>
            <th className="p-4">Client</th>
            <th className="p-4">Content</th>
            <th className="p-4">Rating</th>
            <th className="p-4">Featured</th>
            <th className="p-4">Published</th>
            <th className="p-4"></th>
          </tr>
        </thead>
        <tbody>
          {testimonials.map((testimonial) => (
            <tr
              key={testimonial.id}
              draggable
              onDragStart={() => setDraggingId(testimonial.id)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => onDrop(testimonial.id)}
              className={cn(
                "border-b border-black/5 last:border-0 transition-colors",
                draggingId === testimonial.id ? "opacity-40" : ""
              )}
            >
              <td className="p-4 cursor-grab text-slate/60">
                <GripVertical className="size-4" />
              </td>
              <td className="p-4">
                <p className="font-medium">{testimonial.client_name}</p>
                <p className="text-slate">{testimonial.transaction_type}</p>
              </td>
              <td className="p-4 max-w-sm text-slate">{testimonial.content}</td>
              <td className="p-4">{testimonial.rating ?? "—"}</td>
              <td className="p-4">{testimonial.is_featured ? <Badge>Featured</Badge> : "—"}</td>
              <td className="p-4">{testimonial.is_published ? "Yes" : "No"}</td>
              <td className="p-4 text-right">
                <Link
                  href={`/admin/testimonials/${testimonial.id}/edit`}
                  className="inline-flex min-h-[36px] items-center justify-center rounded-lg border border-black/10 px-3 text-xs font-semibold text-ink transition-colors hover:bg-black/5 cursor-pointer"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
          {testimonials.length === 0 && (
            <tr>
              <td colSpan={7} className="p-8 text-center text-slate">
                No testimonials yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
