"use client";

import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/reveal";

export function NextStepSection() {
  return (
    <section className="bg-white py-16">
      <div className="container-app">
        {/* Banner Section Header */}
        <Reveal>
          <div className="flex justify-center mb-12">
            <h2 className="bg-[#2a2a2a] text-white px-8 py-2.5 font-display text-sm md:text-base font-semibold tracking-[0.2em] uppercase text-center shadow-sm">
              {"What's Your Next Step"}
            </h2>
          </div>
        </Reveal>

        {/* Side-by-Side Image Links Link Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto px-4 md:px-8">
          {/* Left Card: Buyer / Listings */}
          <Reveal delay={0.05}>
            <Link
              href="/listings"
              className="group block relative aspect-[4/3] w-full rounded-lg overflow-hidden border border-black/5 shadow-md transition-all duration-300 hover:scale-[1.01] hover:shadow-lg"
            >
              <Image
                src="/couple_laptop_home.png"
                alt="Find Homes (Couple with Laptop)"
                fill
                sizes="(max-width: 768px) 100vw, 450px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-all" />
              {/* Optional Subtle Text Overlay for Premium UX */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-xs px-4 py-2 rounded-full border border-black/5 shadow-sm transform translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="font-display text-xs font-bold tracking-wider uppercase text-ink">
                  Browse Listings
                </span>
              </div>
            </Link>
          </Reveal>

          {/* Right Card: Seller / Valuation */}
          <Reveal delay={0.1}>
            <Link
              href="/home-value"
              className="group block relative aspect-[4/3] w-full rounded-lg overflow-hidden border border-black/5 shadow-md transition-all duration-300 hover:scale-[1.01] hover:shadow-lg"
            >
              <Image
                src="/coffee_espresso_cup.png"
                alt="Get Valuation (Coffee & Consultation)"
                fill
                sizes="(max-width: 768px) 100vw, 450px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-all" />
              {/* Optional Subtle Text Overlay for Premium UX */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-xs px-4 py-2 rounded-full border border-black/5 shadow-sm transform translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="font-display text-xs font-bold tracking-wider uppercase text-ink">
                  Home Valuation
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
