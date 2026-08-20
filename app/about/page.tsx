import type { Metadata } from "next";
import { AboutContent } from "@/components/about/about-content";

export const metadata: Metadata = {
  title: "About Veronica Medellin",
  description:
    "Meet Veronica Medellin — a bilingual Houston REALTOR® with 10+ years serving Galleria, Sugar Land, and the University Area.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <AboutContent />;
}
