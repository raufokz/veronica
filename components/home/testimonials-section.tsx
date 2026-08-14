import { getFeaturedTestimonials } from "@/lib/data/testimonials";
import { TestimonialsClient } from "@/components/home/testimonials-client";

export async function TestimonialsSection() {
  const testimonials = await getFeaturedTestimonials();
  return <TestimonialsClient testimonials={testimonials} />;
}
