import { getSiteSettings } from "@/lib/data/crm";
import { FooterClient } from "@/components/footer-client";

export async function Footer() {
  const settings = await getSiteSettings();

  return (
    <FooterClient
      overrides={{
        phone: settings?.contact_phone ?? undefined,
        email: settings?.contact_email ?? undefined,
        brokerageName: settings?.brokerage_name ?? undefined,
        licenseNumber: settings?.license_number ?? undefined,
        facebookUrl: settings?.facebook_url ?? undefined,
        instagramUrl: settings?.instagram_url ?? undefined,
        pinterestUrl: settings?.pinterest_url ?? undefined,
        youtubeUrl: settings?.youtube_url ?? undefined,
      }}
    />
  );
}
