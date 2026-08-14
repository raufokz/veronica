import type { Metadata } from "next";
import { ContactSection } from "@/components/home/contact-section";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Veronica Medellin, a bilingual Houston REALTOR® serving Clear Lake, League City and the Bay Area.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="pt-8">
      <ContactSection headingLevel="h1" sourcePage="/contact" />
    </div>
  );
}
