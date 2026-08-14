"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { leadSchema, type LeadInput } from "@/lib/schemas";
import { submitLead } from "@/app/actions/leads";
import { useLanguage } from "@/lib/language-context";
import { dict, t } from "@/lib/dict";
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
import { cn } from "@/lib/utils";

type ContactFormProps = {
  sourcePage: string;
  propertyId?: string;
  defaultInterest?: LeadInput["interest_type"];
  submitLabel?: string;
  className?: string;
};

export function ContactForm({
  sourcePage,
  propertyId,
  defaultInterest = "buying",
  submitLabel,
  className,
}: ContactFormProps) {
  const { lang } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      interest_type: defaultInterest,
      message: "",
      preferred_language: lang,
      property_id: propertyId ?? "",
      source_page: sourcePage,
      website: "",
    },
  });

  async function onSubmit(values: LeadInput) {
    const result = await submitLead({ ...values, preferred_language: lang, source_page: sourcePage });
    if (result.success) {
      setSubmitted(true);
      reset();
      toast.success(t(dict.contact.success, lang));
    } else {
      toast.error(result.error);
    }
  }

  if (submitted) {
    return (
      <div className={cn("rounded-xl border border-black/10 bg-sand p-8 text-center", className)}>
        <p className="font-display text-xl">{t(dict.contact.success, lang)}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("space-y-4", className)} noValidate>
      {/* Honeypot — hidden from real users, bots will fill it */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="full_name">{t(dict.contact.fullName, lang)} *</Label>
          <Input id="full_name" {...register("full_name")} aria-invalid={!!errors.full_name} />
          {errors.full_name && <p className="text-xs text-brand">{errors.full_name.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">{t(dict.contact.email, lang)} *</Label>
          <Input id="email" type="email" {...register("email")} aria-invalid={!!errors.email} />
          {errors.email && <p className="text-xs text-brand">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="phone">{t(dict.contact.phone, lang)}</Label>
          <Input id="phone" type="tel" {...register("phone")} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="interest_type">{t(dict.contact.interest, lang)}</Label>
          <Controller
            control={control}
            name="interest_type"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="interest_type" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buying">{t(dict.contact.interestOptions.buying, lang)}</SelectItem>
                  <SelectItem value="selling">{t(dict.contact.interestOptions.selling, lang)}</SelectItem>
                  <SelectItem value="investing">{t(dict.contact.interestOptions.investing, lang)}</SelectItem>
                  <SelectItem value="other">{t(dict.contact.interestOptions.other, lang)}</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="message">{t(dict.contact.message, lang)}</Label>
        <Textarea id="message" rows={4} {...register("message")} />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(buttonVariants(), "w-full rounded-full bg-brand hover:bg-brand/90 text-white h-11")}
      >
        {isSubmitting ? "…" : submitLabel ?? t(dict.contact.send, lang)}
      </button>
    </form>
  );
}
