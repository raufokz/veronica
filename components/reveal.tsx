"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Fades content in as it scrolls into view.
 *
 * Server-rendered markup carries no hiding styles, so the content is fully
 * visible if JavaScript never runs. The hidden state is only applied after
 * mount, and not at all when the visitor has asked for reduced motion.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = ref.current;
    if (!el) return;

    setArmed(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);

    // Safety net: if the observer never reports (some embedded and headless
    // browsers never fire it), reveal anyway rather than leave content hidden.
    const failsafe = window.setTimeout(() => setShown(true), 2000);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(className, armed && (shown ? "reveal-in" : "reveal-hidden"))}
      style={shown && delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
