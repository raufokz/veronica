import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/legal-layout";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "TREC Consumer Protection Notice",
  description: "Texas Real Estate Commission Consumer Protection Notice for Veronica Medellin, REALTOR®.",
  alternates: { canonical: "/legal/consumer-protection" },
};

export default function ConsumerProtectionPage() {
  return (
    <LegalLayout title="Texas Real Estate Commission Consumer Protection Notice">
      <p>
        {siteConfig.name} is a real estate license holder regulated by the Texas Real Estate
        Commission (TREC). TREC requires this notice to be readily accessible on a license
        holder&apos;s website.
      </p>

      <h2>Filing a complaint</h2>
      <p>
        If you have a question or complaint regarding a real estate license holder in Texas, you
        may contact TREC directly to file a complaint or verify a license.
      </p>

<div className="rounded-xl border border-gold/40 bg-gold/10 p-5 text-sm text-ink">
  Veronica Medellin is a real estate license holder regulated by the Texas Real Estate
  Commission (TREC). TREC requires this notice to be readily accessible on a license
  holder's website. For questions or complaints, contact TREC at the addresses and phone
  numbers below.
</div>

      <p>
        The Texas Real Estate Commission can be reached at{" "}
        <a href="https://www.trec.texas.gov" target="_blank" rel="noopener noreferrer">
          trec.texas.gov
        </a>
        . TREC administers a Real Estate Recovery Trust Account that may be available to reimburse
        certain actual damages sustained by consumers caused by a license holder&apos;s violation
        of the Texas Real Estate License Act, subject to conditions set by TREC.
      </p>

      <h2>License lookup</h2>
      <p>
        You can verify {siteConfig.name}&apos;s license (TREC #{siteConfig.trecLicense}) using
        TREC&apos;s public license holder search.
      </p>
    </LegalLayout>
  );
}
