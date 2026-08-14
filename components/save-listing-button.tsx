"use client";

import { Heart } from "lucide-react";
import { useSavedListings } from "@/lib/use-saved-listings";
import { cn } from "@/lib/utils";

export function SaveListingButton({
  propertyId,
  className,
}: {
  propertyId: string;
  className?: string;
}) {
  const { isSaved, toggle } = useSavedListings();
  const saved = isSaved(propertyId);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(propertyId);
      }}
      aria-label={saved ? "Remove from saved properties" : "Save property"}
      aria-pressed={saved}
      className={cn(
        "flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm size-8 shadow-sm transition-colors hover:bg-white",
        className
      )}
    >
      <Heart className={cn("size-4 transition-colors", saved ? "fill-brand text-brand" : "text-ink/60")} />
    </button>
  );
}
