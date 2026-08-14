import Link from "next/link";
import { getAllTestimonialsAdmin } from "@/lib/data/admin";
import { buttonVariants } from "@/components/ui/button";
import { TestimonialsTable } from "@/components/admin/testimonials-table";
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
      <p className="mt-2 text-sm text-slate">Drag rows by the handle to change display order on the site.</p>

      <TestimonialsTable testimonials={testimonials} />
    </div>
  );
}
