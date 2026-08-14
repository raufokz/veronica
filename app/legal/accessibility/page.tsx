import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/legal-layout";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description: "Accessibility commitment for veronicasellshouston.com.",
  alternates: { canonical: "/legal/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <LegalLayout title="Accessibility Statement">
      <p>
        {siteConfig.name} is committed to making this website usable by everyone, including
        people who use assistive technology.
      </p>

      <h2>Our standard</h2>
      <p>
        This site is built to conform to the Web Content Accessibility Guidelines (WCAG) 2.1
        Level AA, including sufficient color contrast, visible keyboard focus indicators, full
        keyboard navigation, labelled form fields, and descriptive alt text on images.
      </p>

      <h2>Ongoing work</h2>
      <p>
        Accessibility is an ongoing effort. If you encounter a barrier using this site — with a
        screen reader, keyboard-only navigation, or any other assistive technology — please let
        us know so we can fix it.
      </p>

      <h2>Contact</h2>
      <p>
        Report an accessibility issue to{" "}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or{" "}
        <a href={`tel:${siteConfig.phone}`}>{siteConfig.phoneDisplay}</a>. We&apos;ll do our best
        to respond within one business day.
      </p>
    </LegalLayout>
  );
}
