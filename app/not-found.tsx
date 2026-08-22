import Link from "next/link";
import { Home, Search, MapPin, Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="container-app flex flex-1 flex-col items-center justify-center gap-6 py-24 text-center">
      <span className="font-display text-6xl font-semibold text-brand">404</span>
      <div className="space-y-2">
        <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          We couldn&apos;t find that page
        </h1>
        <p className="mx-auto max-w-md text-sm text-slate sm:text-base">
          The page you&apos;re looking for may have moved or no longer exists. Here are a few
          places to pick back up — or reach out and I&apos;ll help you find what you need.
        </p>
        <p className="mx-auto max-w-md text-xs text-slate/80">
          No pudimos encontrar esa página. Aquí tienes algunos lugares para continuar, o
          contáctame y con gusto te ayudo.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link href="/" className={cn(buttonVariants(), "rounded-full bg-brand hover:bg-brand/90")}>
          <Home className="size-4" />
          Back to home
        </Link>
        <Link href="/listings" className={cn(buttonVariants({ variant: "outline" }), "rounded-full")}>
          <Search className="size-4" />
          Browse listings
        </Link>
        <Link href="/neighborhoods" className={cn(buttonVariants({ variant: "outline" }), "rounded-full")}>
          <MapPin className="size-4" />
          Explore neighborhoods
        </Link>
      </div>

      <a
        href={`tel:${siteConfig.phone}`}
        className="flex items-center gap-2 text-sm font-medium text-ink/70 hover:text-ink"
      >
        <Phone className="size-4" />
        Or call {siteConfig.phoneDisplay}
      </a>
    </div>
  );
}
