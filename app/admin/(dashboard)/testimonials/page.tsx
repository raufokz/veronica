import Link from "next/link";
import { getAllTestimonialsAdmin } from "@/lib/data/admin";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function AdminTestimonialsPage() {
  const testimonials = await getAllTestimonialsAdmin();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl">Testimonials</h1>
        <Link
          href="/admin/testimonials/new"
          className={cn(buttonVariants(), "rounded-full bg-brand hover:bg-brand/90 text-white px-5")}
        >
          New testimonial
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-black/10 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-black/10 text-left text-xs uppercase tracking-wide text-slate">
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
              <tr key={testimonial.id} className="border-b border-black/5 last:border-0">
                <td className="p-4">
                  <p className="font-medium">{testimonial.client_name}</p>
                  <p className="text-slate">{testimonial.transaction_type}</p>
                </td>
                <td className="p-4 max-w-sm text-slate">{testimonial.content}</td>
                <td className="p-4">{testimonial.rating ?? "—"}</td>
                <td className="p-4">{testimonial.is_featured ? <Badge>Featured</Badge> : "—"}</td>
                <td className="p-4">{testimonial.is_published ? "Yes" : "No"}</td>
                <td className="p-4 text-right">
                  <Link href={`/admin/testimonials/${testimonial.id}/edit`} className="text-brand hover:underline">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {testimonials.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate">
                  No testimonials yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
