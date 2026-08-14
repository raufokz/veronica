"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Renders the real HomeSmart logo if public/homesmart-logo.svg exists,
 * otherwise falls back to the text name. Drop the real asset in place
 * and it activates automatically — no code change needed.
 */
export function BrokerageLogo({ name, className }: { name: string; className?: string }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return <span className={className}>{name}</span>;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- fallback probe, size unknown ahead of time
    <img
      src="/homesmart-logo.svg"
      alt={name}
      onError={() => setErrored(true)}
      className={cn("h-6 w-auto object-contain", className)}
    />
  );
}
