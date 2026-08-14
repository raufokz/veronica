import Link from "next/link";
import { getAllLeads, getAllListingsAdmin, getAllTestimonialsAdmin } from "@/lib/data/admin";

export default async function AdminOverviewPage() {
  const [leads, listings, testimonials] = await Promise.all([
    getAllLeads(),
    getAllListingsAdmin(),
    getAllTestimonialsAdmin(),
  ]);

  const newLeads = leads.filter((l) => l.status === "new").length;

  const cards = [
    { label: "New leads", value: newLeads, href: "/admin/leads" },
    { label: "Total leads", value: leads.length, href: "/admin/leads" },
    { label: "Listings", value: listings.length, href: "/admin/listings" },
    { label: "Testimonials", value: testimonials.length, href: "/admin/testimonials" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl">Overview</h1>
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-xl border border-black/10 bg-white p-6 hover:-translate-y-0.5 transition-transform"
          >
            <p className="text-3xl font-semibold tabular-nums">{card.value}</p>
            <p className="mt-1 text-sm text-slate">{card.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
