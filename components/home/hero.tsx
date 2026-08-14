import { getSiteSettings } from "@/lib/data/crm";
import { HeroClient } from "@/components/home/hero-client";

export async function Hero() {
  const settings = await getSiteSettings();

  return (
    <HeroClient
      overrides={{
        headline: settings?.hero_headline ?? undefined,
        subtitle: settings?.hero_subtitle ?? undefined,
        cta1Label: settings?.hero_cta_primary ?? undefined,
        cta2Label: settings?.hero_cta_secondary ?? undefined,
      }}
    />
  );
}
