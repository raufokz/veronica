import type { Metadata } from "next";
import { ServicesIndexContent } from "@/components/services/services-index-content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Buy, sell, or invest in Galleria, Sugar Land, and University areas with Veronica Medellin, a bilingual REALTOR® with 10+ years of experience.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return <ServicesIndexContent />;
}
