"use client";

import { useRef } from "react";
import { Bold, Italic, Heading2, List, ListOrdered, Quote } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type Wrap = { prefix: string; suffix?: string; block?: boolean };

const buttons: { icon: typeof Bold; label: string; wrap: Wrap }[] = [
  { icon: Bold, label: "Bold", wrap: { prefix: "**", suffix: "**" } },
  { icon: Italic, label: "Italic", wrap: { prefix: "_", suffix: "_" } },
  { icon: Heading2, label: "Heading", wrap: { prefix: "## ", block: true } },
  { icon: Quote, label: "Quote", wrap: { prefix: "> ", block: true } },
  { icon: List, label: "Bullet list", wrap: { prefix: "- ", block: true } },
  { icon: ListOrdered, label: "Numbered list", wrap: { prefix: "1. ", block: true } },
];

export function MarkdownTextarea({
  value,
  onChange,
  rows = 14,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  className?: string;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);

  function applyWrap(wrap: Wrap) {
    const el = ref.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = value.slice(start, end);

    let next: string;
    let cursorStart: number;
    let cursorEnd: number;

    if (wrap.block) {
      const lineStart = value.lastIndexOf("\n", start - 1) + 1;
      next = value.slice(0, lineStart) + wrap.prefix + value.slice(lineStart);
      cursorStart = start + wrap.prefix.length;
      cursorEnd = end + wrap.prefix.length;
    } else {
      const suffix = wrap.suffix ?? "";
      next = value.slice(0, start) + wrap.prefix + selected + suffix + value.slice(end);
      cursorStart = start + wrap.prefix.length;
      cursorEnd = cursorStart + selected.length;
    }

    onChange(next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(cursorStart, cursorEnd);
    });
  }

  return (
    <div>
      <div className="mb-1.5 flex items-center gap-1 rounded-t-lg border border-b-0 border-black/10 bg-sand/60 p-1.5">
        {buttons.map(({ icon: Icon, label, wrap }) => (
          <button
            key={label}
            type="button"
            onClick={() => applyWrap(wrap)}
            aria-label={label}
            title={label}
            className="rounded-md p-1.5 text-ink/70 hover:bg-white hover:text-ink"
          >
            <Icon className="size-4" />
          </button>
        ))}
      </div>
      <Textarea
        ref={ref}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn("rounded-t-none font-mono text-sm", className)}
      />
    </div>
  );
}
