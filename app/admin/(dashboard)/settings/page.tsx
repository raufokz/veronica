import { getSiteSettings } from "@/lib/data/crm";
import { SettingsForm } from "@/components/admin/settings-form";
import { PageHeader } from "@/components/admin/page-header";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <PageHeader
        title="Site settings"
        description="Contact details, socials, hero copy, and license info used across the site."
      />
      <SettingsForm settings={settings} />
    </div>
  );
}
