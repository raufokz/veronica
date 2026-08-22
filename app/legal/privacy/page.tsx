import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/legal-layout";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for veronicasellshouston.com.",
  alternates: { canonical: "/legal/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy">
      <p>
        This policy explains what information {siteConfig.name} collects through this website
        and how it&apos;s used. Last updated: August 22, 2026.
      </p>

      <h2>Information we collect</h2>
      <p>
        When you submit a contact, home-valuation, or tour-request form, we collect your name,
        email address, phone number (if provided), the property or topic you&apos;re asking
        about, your message, and your preferred language. We also collect the page you submitted
        the form from, to help route your inquiry correctly.
      </p>

      <h2>How we use it</h2>
      <p>
        Your information is used solely to respond to your inquiry — by phone, email, or text —
        and, if you agree to ongoing communication, to send relevant market updates. We do not
        sell your information to third parties.
      </p>

<h2>Analytics</h2>
<p>
  This site uses Google Analytics (GA4) and Microsoft Clarity to understand how visitors
  use the site — for example, which pages are viewed and how visitors navigate — so we can
  improve content and user experience. These tools use cookies and similar technologies but
  do not collect your name, email, or phone number unless you submit one of our forms. They
  do not sell your data. You can opt out of Google Analytics using the{" "}
  <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
    Google Analytics Opt-out Browser Add-on
  </a>.
</p>

      <h2>Data storage</h2>
      <p>
        Form submissions are stored securely in a Supabase-hosted database with row-level access
        controls, and are only accessible to {siteConfig.name} and her brokerage,{" "}
        {siteConfig.brokerage}.
      </p>

      <h2>Your rights</h2>
      <p>
        You may request that your information be corrected or deleted at any time by contacting{" "}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy can be directed to{" "}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or{" "}
        <a href={`tel:${siteConfig.phone}`}>{siteConfig.phoneDisplay}</a>.
      </p>
    </LegalLayout>
  );
}
