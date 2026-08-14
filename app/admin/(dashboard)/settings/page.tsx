import { getSiteSettings } from "@/lib/data/crm";
import { SettingsForm } from "@/components/admin/settings-form";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <h1 className="font-display text-2xl">Site settings</h1>
      <p className="mt-1 text-sm text-slate">
        Contact details, socials, hero copy, and license info used across the site.
      </p>
      <div className="mt-6">
        <SettingsForm settings={settings} />
      </div>
    </div>
  );
}
