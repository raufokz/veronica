"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { siteSettingsSchema, type SiteSettingsFormInput } from "@/lib/schemas";
import { updateSiteSettings } from "@/app/actions/admin-settings";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl" noValidate>
      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="hero">Hero section</TabsTrigger>
          <TabsTrigger value="social">Social links</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4 rounded-xl border border-black/10 bg-white p-6">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Brokerage name">
              <Input {...register("brokerage_name")} />
            </Field>
            <Field label="Office address">
              <Input {...register("contact_address")} />
            </Field>
          </div>
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
          <Field label="MLS ID">
            <Input {...register("mls_id")} />
          </Field>
        </TabsContent>

        <TabsContent value="hero" className="space-y-4 rounded-xl border border-black/10 bg-white p-6">
          <p className="text-xs text-slate">
            English homepage headline only — the Spanish version keeps its own translation. Leave blank to use the
            default copy.
          </p>
          <Field label="Headline">
            <Input {...register("hero_headline")} />
          </Field>
          <Field label="Subtitle">
            <Textarea rows={3} {...register("hero_subtitle")} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Primary CTA label">
              <Input {...register("hero_cta_primary")} />
            </Field>
            <Field label="Secondary CTA label">
              <Input {...register("hero_cta_secondary")} />
            </Field>
          </div>
        </TabsContent>

        <TabsContent value="social" className="space-y-4 rounded-xl border border-black/10 bg-white p-6">
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
        </TabsContent>

        <TabsContent value="seo" className="space-y-4 rounded-xl border border-black/10 bg-white p-6">
          <p className="text-xs text-slate">
            Default title and description search engines show for the site. Individual listing, blog, and page
            titles override these.
          </p>
          <Field label="Default site title">
            <Input {...register("site_title")} placeholder="Veronica Medellin | Houston REALTOR®" />
          </Field>
          <Field label="Default meta description">
            <Textarea rows={3} {...register("site_description")} />
          </Field>
        </TabsContent>
      </Tabs>

      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(buttonVariants(), "mt-6 rounded-full bg-brand hover:bg-brand/90 text-white px-6")}
      >
        {isSubmitting ? "Saving…" : "Save settings"}
      </button>
    </form>
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
