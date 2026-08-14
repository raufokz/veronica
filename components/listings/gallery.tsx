"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (!lightboxOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [lightboxOpen]);

  if (images.length === 0) {
    return <div className="aspect-[16/10] rounded-xl bg-sand" />;
  }

  function prev() {
    setIndex((i) => (i - 1 + images.length) % images.length);
  }
  function next() {
    setIndex((i) => (i + 1) % images.length);
  }

  function onKeyDown(e: React.KeyboardEvent | KeyboardEvent) {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
    if (e.key === "Escape") setLightboxOpen(false);
  }

  return (
    <div
      role="group"
      aria-label="Property photos"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="outline-none"
    >
      <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-sand">
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          aria-label="View photo fullscreen"
          className="absolute inset-0 cursor-zoom-in"
        >
          <Image
            src={images[index]}
            alt={`${alt} — photo ${index + 1} of ${images.length}`}
            fill
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover"
            priority
          />
        </button>
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 hover:bg-white"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 hover:bg-white"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2">
          {images.map((src, i) => (
            <button
              key={src + i}
              onClick={() => setIndex(i)}
              aria-label={`Show photo ${i + 1}`}
              aria-current={i === index}
              className={cn(
                "relative aspect-[4/3] rounded-md overflow-hidden ring-2 transition-all",
                i === index ? "ring-brand" : "ring-transparent opacity-70 hover:opacity-100"
              )}
            >
              <Image src={src} alt="" fill sizes="120px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${alt} — fullscreen photo viewer`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 sm:p-10"
          onClick={() => setLightboxOpen(false)}
          onKeyDown={onKeyDown}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            aria-label="Close fullscreen photo viewer"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
          >
            <X className="size-6" />
          </button>

          <div className="relative h-full w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[index]}
              alt={`${alt} — photo ${index + 1} of ${images.length}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:left-6"
              >
                <ChevronLeft className="size-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:right-6"
              >
                <ChevronRight className="size-6" />
              </button>
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/70 tabular-nums">
                {index + 1} / {images.length}
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
