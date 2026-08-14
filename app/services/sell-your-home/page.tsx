import type { Metadata } from "next";
import { SellContent } from "@/components/services/sell-content";

export const metadata: Metadata = {
  title: "Sell My House in Houston",
  description:
    "Sell your Houston or Clear Lake home with real comps, professional marketing, and negotiation that protects your number. Free home valuation.",
  alternates: { canonical: "/services/sell-your-home" },
};

export default function SellYourHomePage() {
  return <SellContent />;
}
