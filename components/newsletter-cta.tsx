"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Mail } from "lucide-react";
import { leadSchema, type LeadInput } from "@/lib/schemas";
import { submitLead } from "@/app/actions/leads";
import { useLanguage } from "@/lib/language-context";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const copy = {
  eyebrow: { en: "STAY IN THE LOOP", es: "MANTENTE AL TANTO" },
  heading: { en: "Get market updates in your inbox", es: "Recibe actualizaciones del mercado" },
  sub: {
    en: "New listings, price trends, and buying/selling tips for Galleria, Sugar Land, and University areas — no spam.",
    es: "Nuevas propiedades, tendencias de precios y consejos para comprar o vender en Galleria, Sugar Land y University Areas — sin spam.",
  },
  namePlaceholder: { en: "Your name", es: "Tu nombre" },
  emailPlaceholder: { en: "Your email", es: "Tu correo" },
  submit: { en: "Subscribe", es: "Suscribirme" },
  success: { en: "You're on the list — thank you!", es: "¡Ya estás en la lista, gracias!" },
};

export function NewsletterCta({ sourcePage }: { sourcePage: string }) {
  const { lang } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const c = (key: keyof typeof copy) => copy[key][lang];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      full_name: "",
      email: "",
      interest_type: "other",
      message: "Newsletter signup",
      preferred_language: lang,
      source_page: sourcePage,
      website: "",
    },
  });

  async function onSubmit(values: LeadInput) {
    const result = await submitLead({ ...values, preferred_language: lang, source_page: sourcePage });
    if (result.success) {
      setSubmitted(true);
      reset();
      toast.success(c("success"));
    } else {
      toast.error(result.error);
    }
  }

  return (
    <div className="rounded-xl border border-black/10 bg-sand p-6 sm:p-8">
      <div className="flex items-center gap-2 text-brand">
        <Mail className="size-4" />
        <p className="eyebrow">{c("eyebrow")}</p>
      </div>
      <h3 className="mt-2 font-display text-xl">{c("heading")}</h3>
      <p className="mt-1.5 text-sm text-slate">{c("sub")}</p>

      {submitted ? (
        <p className="mt-4 text-sm font-medium text-ink">{c("success")}</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-2 sm:flex-row" noValidate>
          <div className="hidden" aria-hidden="true">
            <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
          </div>
          <Input
            {...register("full_name")}
            placeholder={c("namePlaceholder")}
            aria-invalid={!!errors.full_name}
            className="bg-white"
          />
          <Input
            type="email"
            {...register("email")}
            placeholder={c("emailPlaceholder")}
            aria-invalid={!!errors.email}
            className="bg-white"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(buttonVariants(), "shrink-0 rounded-full bg-brand hover:bg-brand/90 text-white px-6")}
          >
            {isSubmitting ? "…" : c("submit")}
          </button>
        </form>
      )}
      {(errors.full_name || errors.email) && (
        <p className="mt-2 text-xs text-brand">{errors.full_name?.message ?? errors.email?.message}</p>
      )}
    </div>
  );
}
