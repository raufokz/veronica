"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { siteSettingsSchema, type SiteSettingsFormInput } from "@/lib/schemas";
import { updateSiteSettings } from "@/app/actions/admin-settings";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { buttonVariants } from "@/components/ui/button";
import type { SiteSetting } from "@/types/supabase";
import { cn } from "@/lib/utils";

function toFormValues(settings?: SiteSetting | null): Partial<SiteSettingsFormInput> {
  if (!settings) return {};
  return {
    site_title: settings.site_title ?? "",
    site_description: settings.site_description ?? "",
    contact_phone: settings.contact_phone ?? "",
    contact_email: settings.contact_email ?? "",
    contact_address: settings.contact_address ?? "",
    facebook_url: settings.facebook_url ?? "",
    instagram_url: settings.instagram_url ?? "",
    pinterest_url: settings.pinterest_url ?? "",
    youtube_url: settings.youtube_url ?? "",
    hero_headline: settings.hero_headline ?? "",
    hero_subtitle: settings.hero_subtitle ?? "",
    hero_cta_primary: settings.hero_cta_primary ?? "",
    hero_cta_secondary: settings.hero_cta_secondary ?? "",
    license_number: settings.license_number ?? "",
    mls_id: settings.mls_id ?? "",
    brokerage_name: settings.brokerage_name ?? "",
  };
}

export function SettingsForm({ settings }: { settings?: SiteSetting | null }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SiteSettingsFormInput>({
    resolver: zodResolver(siteSettingsSchema),
    defaultValues: toFormValues(settings),
  });

  async function onSubmit(values: SiteSettingsFormInput) {
    const result = await updateSiteSettings(values);
    if (!result.success) {
      toast.error(result.error);
    } else {
      toast.success("Settings saved.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-3xl" noValidate>
      <Section title="General">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Site title">
            <Input {...register("site_title")} />
          </Field>
          <Field label="Brokerage name">
            <Input {...register("brokerage_name")} />
          </Field>
        </div>
        <Field label="Site description">
          <Textarea rows={3} {...register("site_description")} />
        </Field>
        <div className="grid grid-cols-3 gap-4">
          <Field label="Phone">
            <Input {...register("contact_phone")} />
          </Field>
          <Field label="Email" error={errors.contact_email?.message}>
            <Input type="email" {...register("contact_email")} />
          </Field>
          <Field label="License #">
            <Input {...register("license_number")} />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="MLS ID">
            <Input {...register("mls_id")} />
          </Field>
          <Field label="Office address">
            <Input {...register("contact_address")} />
          </Field>
        </div>
      </Section>

      <Section title="Hero section">
        <Field label="Headline">
          <Input {...register("hero_headline")} />
        </Field>
        <Field label="Subtitle">
          <Textarea rows={3} {...register("hero_subtitle")} />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Primary CTA">
            <Input {...register("hero_cta_primary")} />
          </Field>
          <Field label="Secondary CTA">
            <Input {...register("hero_cta_secondary")} />
          </Field>
        </div>
      </Section>

      <Section title="Social links">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Facebook" error={errors.facebook_url?.message}>
            <Input type="url" {...register("facebook_url")} />
          </Field>
          <Field label="Instagram" error={errors.instagram_url?.message}>
            <Input type="url" {...register("instagram_url")} />
          </Field>
          <Field label="Pinterest" error={errors.pinterest_url?.message}>
            <Input type="url" {...register("pinterest_url")} />
          </Field>
          <Field label="YouTube" error={errors.youtube_url?.message}>
            <Input type="url" {...register("youtube_url")} />
          </Field>
        </div>
      </Section>

      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(buttonVariants(), "rounded-full bg-brand hover:bg-brand/90 text-white px-6")}
      >
        {isSubmitting ? "Saving…" : "Save settings"}
      </button>
    </form>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-black/10 bg-white p-6">
      <h2 className="font-display text-lg font-semibold">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-xs text-brand">{error}</p>}
    </div>
  );
}
