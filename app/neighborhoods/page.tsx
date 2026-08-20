import type { Metadata } from "next";
import { NeighborhoodsIndexContent } from "@/components/neighborhoods/neighborhoods-index-content";

export const metadata: Metadata = {
  title: "Houston Area Neighborhoods",
  description:
    "Explore Galleria, Sugar Land, and University Areas real estate with a REALTOR® who knows the schools, commutes, and market in each one.",
  alternates: { canonical: "/neighborhoods" },
};

export default function NeighborhoodsPage() {
  return <NeighborhoodsIndexContent />;
}
