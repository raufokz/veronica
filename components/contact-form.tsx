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
  variant?: "default" | "minimalist";
};

export function ContactForm({
  sourcePage,
  propertyId,
  defaultInterest = "buying",
  submitLabel,
  className,
  variant = "default",
}: ContactFormProps) {
  const { lang } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [consent, setConsent] = useState(false);

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

  if (variant === "minimalist") {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className={cn("space-y-6 max-w-xl mx-auto", className)} noValidate>
        {/* Honeypot */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </div>

        <div className="space-y-1.5 text-left">
          <Label htmlFor="full_name" className="text-sm font-semibold uppercase tracking-wider text-[#222]">
            {lang === "es" ? "Nombre Completo" : "Full Name"}
          </Label>
          <input
            id="full_name"
            placeholder={lang === "es" ? "Ingresa tu nombre completo" : "Enter your name"}
            className={cn(
              "block w-full border-b border-black/20 focus:border-black bg-transparent outline-none py-2 text-sm transition-colors rounded-none border-x-0 border-t-0 placeholder:text-black/35",
              errors.full_name && "border-red-500"
            )}
            {...register("full_name")}
            aria-invalid={!!errors.full_name}
          />
          {errors.full_name && <p className="text-xs text-red-500 mt-1">{errors.full_name.message}</p>}
        </div>

        <div className="space-y-1.5 text-left">
          <Label htmlFor="email" className="text-sm font-semibold uppercase tracking-wider text-[#222]">
            {lang === "es" ? "Correo Electrónico" : "Email"}
          </Label>
          <input
            id="email"
            type="email"
            placeholder={lang === "es" ? "Ingresa tu correo electrónico" : "Enter a valid email address"}
            className={cn(
              "block w-full border-b border-black/20 focus:border-black bg-transparent outline-none py-2 text-sm transition-colors rounded-none border-x-0 border-t-0 placeholder:text-black/35",
              errors.email && "border-red-500"
            )}
            {...register("email")}
            aria-invalid={!!errors.email}
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
        </div>

        <div className="space-y-1.5 text-left">
          <Label htmlFor="phone" className="text-sm font-semibold uppercase tracking-wider text-[#222]">
            {lang === "es" ? "Número de Teléfono" : "Phone Number"}
          </Label>
          <input
            id="phone"
            type="tel"
            placeholder={lang === "es" ? "Ingresa tu número de teléfono" : "Enter your phone number"}
            className="block w-full border-b border-black/20 focus:border-black bg-transparent outline-none py-2 text-sm transition-colors rounded-none border-x-0 border-t-0 placeholder:text-black/35"
            {...register("phone")}
          />
        </div>

        {/* Consent Checkbox */}
        <div className="flex items-start gap-3 text-left mt-2">
          <input
            id="consent_checkbox"
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 flex-shrink-0 accent-[#2a2a2a] size-4 rounded border-black/20 cursor-pointer"
          />
          <Label htmlFor="consent_checkbox" className="text-xs text-slate/85 font-medium leading-relaxed cursor-pointer select-none">
            {lang === "es"
              ? "Doy mi consentimiento para recibir correos electrónicos automatizados con actualizaciones, promociones y notificaciones sobre oportunidades inmobiliarias. Reconozco que puedo optar por no participar en cualquier momento."
              : "I consent to receive automated emails with updates, promotions, and notifications about real estate opportunities. I acknowledge that I can opt out at any time."
            }
          </Label>
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            disabled={isSubmitting || !consent}
            className={cn(
              buttonVariants(),
              "rounded-none bg-[#2a2a2a] hover:bg-[#1a1a1a] text-white py-2 px-8 h-auto cursor-pointer font-display text-xs font-semibold uppercase tracking-wider transition-all disabled:opacity-40"
            )}
          >
            {isSubmitting ? "…" : submitLabel ?? (lang === "es" ? "Enviar" : "Submit")}
          </button>
        </div>
      </form>
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
