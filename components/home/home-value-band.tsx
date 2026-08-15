"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useLanguage } from "@/lib/language-context";
import { dict, t } from "@/lib/dict";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { buttonVariants } from "@/components/ui/button";
import { submitLead } from "@/app/actions/leads";
import { cn } from "@/lib/utils";

import { Reveal } from "@/components/reveal";

type Step2Values = {
  full_name: string;
  email: string;
  phone: string;
};

export function HomeValueBand({
  sourcePage = "/",
  headingLevel: Heading = "h2",
}: {
  sourcePage?: string;
  headingLevel?: "h1" | "h2";
}) {
  const { lang } = useLanguage();
  const [address, setAddress] = useState("");
  const [step, setStep] = useState<1 | 2 | "done">(1);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Step2Values>();

  function handleAddressSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!address.trim()) return;
    setStep(2);
  }

  async function onDetailsSubmit(values: Step2Values) {
    const result = await submitLead({
      full_name: values.full_name,
      email: values.email,
      phone: values.phone,
      interest_type: "valuation",
      message: `Property address: ${address}`,
      preferred_language: lang,
      source_page: sourcePage,
      website: "",
    });
    if (result.success) {
      setStep("done");
      toast.success(t(dict.contact.success, lang));
    } else {
      toast.error(result.error);
    }
  }

  const stepLabels = { 1: "Enter address", 2: "Submit details", done: "Complete" };
  const stepLabel = stepLabels[step as keyof typeof stepLabels];

  return (
    <section className="bg-ink text-white">
      <div className="container-app section-pad">
        <Reveal>
          <div className="max-w-2xl">
            <Heading className="h-section text-white">{t(dict.homeValue.h2, lang)}</Heading>
            <p className="mt-4 text-white/70 text-[1.0625rem] leading-[1.7] max-w-[58ch]">{t(dict.homeValue.sub, lang)}</p>

            <div className="mt-6 flex items-center gap-2">
              <span className="text-white/60 text-xs uppercase tracking-wider">{stepLabel}</span>
              <svg
                className="w-6 h-6 text-white/40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>

            {step === "done" ? (
              <p className="mt-8 rounded-lg border border-white/15 bg-white/5 p-6 font-display text-xl animate-fade-in">
                {t(dict.contact.success, lang)}
              </p>
            ) : step === 1 ? (
              <form onSubmit={handleAddressSubmit} className="mt-8 flex flex-col sm:flex-row gap-3">
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  aria-label={t(dict.homeValue.placeholder, lang)}
                  placeholder={t(dict.homeValue.placeholder, lang)}
                  className="h-12 bg-white text-ink border-0 sm:flex-1"
                  required
                />
                <button
                  type="submit"
                  className={cn(buttonVariants({ size: "lg" }), "rounded-full bg-brand hover:bg-brand/90 text-white h-12 px-6 cursor-pointer")}
                >
                  {t(dict.homeValue.cta, lang)}
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmit(onDetailsSubmit)} className="mt-8 space-y-4 max-w-md" noValidate>
                <div className="space-y-1.5">
                  <Label htmlFor="hv_full_name" className="text-white/80">
                    {t(dict.contact.fullName, lang)}
                  </Label>
                  <Input
                    id="hv_full_name"
                    className="h-11 bg-white text-ink border-0"
                    {...register("full_name", { required: true })}
                  />
                  {errors.full_name && <p className="text-xs text-red-300">Required</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="hv_email" className="text-white/80">
                    {t(dict.contact.email, lang)}
                  </Label>
                  <Input
                    id="hv_email"
                    type="email"
                    className="h-11 bg-white text-ink border-0"
                    {...register("email", { required: true })}
                  />
                  {errors.email && <p className="text-xs text-red-300">Required</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="hv_phone" className="text-white/80">
                    {t(dict.contact.phone, lang)}
                  </Label>
                  <Input id="hv_phone" type="tel" className="h-11 bg-white text-ink border-0" {...register("phone")} />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(buttonVariants({ size: "lg" }), "rounded-full bg-brand hover:bg-brand/90 text-white h-11 px-6 w-full sm:w-auto cursor-pointer inline-flex items-center justify-center min-w-[120px]")}
                >
                  {isSubmitting ? (
                    <span className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-label="Loading" />
                  ) : t(dict.homeValue.cta, lang)}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
