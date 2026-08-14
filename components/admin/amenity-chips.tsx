"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";

const SUGGESTIONS = [
  "Swimming Pool",
  "Garage",
  "Fireplace",
  "Hardwood Floors",
  "Granite Countertops",
  "Smart Home",
  "Energy Efficient",
  "Gated Community",
  "Waterfront",
  "Updated Kitchen",
];

/** Stores amenities as a comma-separated string on the form, edited here as chips. */
export function AmenityChips({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const chips = value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const [draft, setDraft] = useState("");

  function addChip(raw: string) {
    const chip = raw.trim();
    if (!chip || chips.includes(chip)) return;
    onChange([...chips, chip].join(", "));
    setDraft("");
  }

  function removeChip(chip: string) {
    onChange(chips.filter((c) => c !== chip).join(", "));
  }

  const unusedSuggestions = SUGGESTIONS.filter((s) => !chips.includes(s));

  return (
    <div>
      <div className="flex flex-wrap items-center gap-1.5 rounded-lg border border-input p-2">
        {chips.map((chip) => (
          <span
            key={chip}
            className="flex items-center gap-1 rounded-full bg-sand px-2.5 py-1 text-xs font-medium text-ink"
          >
            {chip}
            <button type="button" onClick={() => removeChip(chip)} aria-label={`Remove ${chip}`}>
              <X className="size-3" />
            </button>
          </span>
        ))}
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              addChip(draft);
            } else if (e.key === "Backspace" && !draft && chips.length > 0) {
              removeChip(chips[chips.length - 1]);
            }
          }}
          placeholder={chips.length === 0 ? "Type an amenity and press Enter…" : "Add another…"}
          className="h-7 flex-1 min-w-32 border-0 shadow-none focus-visible:ring-0 px-1"
        />
      </div>
      {unusedSuggestions.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {unusedSuggestions.slice(0, 6).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => addChip(s)}
              className="rounded-full border border-black/10 px-2.5 py-1 text-xs text-slate hover:border-ink hover:text-ink"
            >
              + {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
