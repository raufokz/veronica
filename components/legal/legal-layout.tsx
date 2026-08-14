import type { ReactNode } from "react";

export function LegalLayout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="container-app section-pad max-w-3xl">
      <h1 className="font-display text-3xl md:text-4xl">{title}</h1>
      <div className="mt-8 space-y-5 text-[15px] leading-[1.75] text-slate [&_h2]:font-display [&_h2]:text-xl [&_h2]:text-ink [&_h2]:mt-8 [&_h2]:mb-2 [&_a]:text-brand [&_a]:underline [&_a]:underline-offset-2 [&_strong]:text-ink">
        {children}
      </div>
    </div>
  );
}
