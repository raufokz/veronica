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
        "flex size-11 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition-colors hover:bg-white lg:size-9",
        className
      )}
    >
      <Heart className={cn("size-4 transition-colors", saved ? "fill-brand text-brand" : "text-ink/60")} />
    </button>
  );
}
