import { notFound } from "next/navigation";
import { getTestimonialByIdAdmin } from "@/lib/data/admin";
import { TestimonialForm } from "@/components/admin/testimonial-form";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const testimonial = await getTestimonialByIdAdmin(id);
  if (!testimonial) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl">Edit testimonial</h1>
      <div className="mt-6">
        <TestimonialForm testimonial={testimonial} />
      </div>
    </div>
  );
}
