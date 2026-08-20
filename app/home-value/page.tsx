import type { Metadata } from "next";
import { HomeValueContent } from "@/components/home-value/home-value-content";

export const metadata: Metadata = {
  title: "What Is My Home Worth in Houston?",
  description:
    "Get a real comparative market analysis for your home in Galleria, Sugar Land, or University areas from a licensed REALTOR® — not an algorithm's guess.",
  alternates: { canonical: "/home-value" },
};

export default function HomeValuePage() {
  return <HomeValueContent />;
}
