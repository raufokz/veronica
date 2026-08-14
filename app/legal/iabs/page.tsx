import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/legal-layout";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Information About Brokerage Services (IABS)",
  description: "Information About Brokerage Services notice for Veronica Medellin, REALTOR® at HomeSmart.",
  alternates: { canonical: "/legal/iabs" },
};

export default function IabsPage() {
  return (
    <LegalLayout title="Information About Brokerage Services">
      <p>
        Texas law requires all real estate licensees to give the following Information About
        Brokerage Services notice to prospective buyers, tenants, sellers, and landlords at the
        first substantive contact.
      </p>

      <h2>What this notice covers</h2>
      <p>
        The Texas Real Estate Commission (TREC) requires every licensed brokerage — including{" "}
        {siteConfig.brokerage}, the brokerage {siteConfig.name} is affiliated with — to disclose
        the types of representation available (buyer&apos;s agent, seller&apos;s agent, or
        intermediary) and each party&apos;s duties under Texas law.
      </p>

<div className="rounded-xl border border-gold/40 bg-gold/10 p-5 text-sm text-ink">
  The brokerage-completed TREC IABS form (with HomeSmart&apos;s license number, the designated
  broker&apos;s name, and Veronica Medellin&apos;s license and supervisor information) needs to be
  reviewed and provided by HomeSmart&apos;s compliance team, then embedded or linked on this
  page as a downloadable PDF before launch.
</div>

      <h2>Official TREC form</h2>
      <p>
        The current, blank Information About Brokerage Services form is published by the Texas
        Real Estate Commission at{" "}
        <a href="https://www.trec.texas.gov/forms" target="_blank" rel="noopener noreferrer">
          trec.texas.gov/forms
        </a>{" "}
        (form OP-K).
      </p>

      <h2>Questions</h2>
      <p>
        Contact {siteConfig.name} directly at{" "}
        <a href={`tel:${siteConfig.phone}`}>{siteConfig.phoneDisplay}</a> or{" "}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> with any questions about
        brokerage representation.
      </p>
    </LegalLayout>
  );
}
