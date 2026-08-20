import type { Metadata } from "next";
import { BuyContent } from "@/components/services/buy-content";

export const metadata: Metadata = {
  title: "Buy a Home in Galleria & Sugar Land",
  description:
    "Buy a home in Galleria, Sugar Land, or University areas with a bilingual REALTOR® who explains every step — offers, inspections, and financing, in English or Spanish.",
  alternates: { canonical: "/services/buy-a-home" },
};

export default function BuyAHomePage() {
  return <BuyContent />;
}
