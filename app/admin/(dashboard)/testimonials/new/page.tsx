import { TestimonialForm } from "@/components/admin/testimonial-form";

export default function NewTestimonialPage() {
  return (
    <div>
      <h1 className="font-display text-2xl">New testimonial</h1>
      <div className="mt-6">
        <TestimonialForm />
      </div>
    </div>
  );
}
