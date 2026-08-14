"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Star } from "lucide-react";
import { testimonialSchema, type TestimonialFormInput } from "@/lib/schemas";
import { createTestimonial, updateTestimonial, deleteTestimonial } from "@/app/actions/admin-testimonials";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { buttonVariants } from "@/components/ui/button";
import type { Testimonial } from "@/types/supabase";
import { cn } from "@/lib/utils";

function toFormValues(testimonial?: Testimonial | null): Partial<TestimonialFormInput> {
  if (!testimonial) {
    return { rating: 5, is_featured: false, is_published: true };
  }
  return {
    client_name: testimonial.client_name,
    client_location: testimonial.client_location ?? "",
    content: testimonial.content,
    rating: testimonial.rating ?? 5,
    transaction_type: testimonial.transaction_type ?? "",
    is_featured: testimonial.is_featured,
    is_published: testimonial.is_published,
  };
}

export function TestimonialForm({ testimonial }: { testimonial?: Testimonial | null }) {
  const isEdit = !!testimonial;
  const [deleting, setDeleting] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TestimonialFormInput>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: toFormValues(testimonial),
  });

  async function onSubmit(values: TestimonialFormInput) {
    const result = isEdit
      ? await updateTestimonial(testimonial!.id, values)
      : await createTestimonial(values);
    if (result && !result.success) {
      toast.error(result.error);
    }
  }

  async function onDelete() {
    if (!testimonial) return;
    if (!confirm(`Delete testimonial from "${testimonial.client_name}"?`)) return;
    setDeleting(true);
    const result = await deleteTestimonial(testimonial.id);
    if (!result.success) {
      toast.error(result.error);
      setDeleting(false);
    } else {
      toast.success("Testimonial deleted.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl" noValidate>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Client name *</Label>
          <Input {...register("client_name")} />
          {errors.client_name && <p className="text-xs text-brand">{errors.client_name.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Client location</Label>
          <Input {...register("client_location")} />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Testimonial content *</Label>
        <Textarea rows={4} {...register("content")} />
        {errors.content && <p className="text-xs text-brand">{errors.content.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Rating</Label>
          <Controller
            control={control}
            name="rating"
            render={({ field }) => (
              <div className="flex items-center gap-1 h-9">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => field.onChange(value)}
                    aria-label={`${value} star${value === 1 ? "" : "s"}`}
                    className="p-0.5"
                  >
                    <Star
                      className={cn(
                        "size-5 transition-colors",
                        Number(field.value ?? 0) >= value ? "fill-gold text-gold" : "text-black/20"
                      )}
                    />
                  </button>
                ))}
              </div>
            )}
          />
        </div>
        <div className="space-y-1.5">
          <Label>Transaction type</Label>
          <Input {...register("transaction_type")} placeholder="Home purchase" />
        </div>
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm">
          <Controller
            control={control}
            name="is_featured"
            render={({ field }) => <Checkbox checked={!!field.value} onCheckedChange={field.onChange} />}
          />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm">
          <Controller
            control={control}
            name="is_published"
            render={({ field }) => <Checkbox checked={!!field.value} onCheckedChange={field.onChange} />}
          />
          Published
        </label>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(buttonVariants(), "rounded-full bg-brand hover:bg-brand/90 text-white px-6")}
        >
          {isSubmitting ? "Saving…" : isEdit ? "Save changes" : "Create testimonial"}
        </button>
        {isEdit && (
          <button
            type="button"
            onClick={onDelete}
            disabled={deleting}
            className={cn(buttonVariants({ variant: "outline" }), "rounded-full px-6 border-brand text-brand")}
          >
            {deleting ? "Deleting…" : "Delete"}
          </button>
        )}
      </div>
    </form>
  );
}
