import Image from "next/image";
import { cn } from "@/lib/utils";

export type AgentPhotoVariant =
  | "primary"
  | "armchair"
  | "studio"
  | "stool"
  | "luxury"
  | "lobby"
  | "fireplace"
  | "home"
  | "headshot"
  | "closeup";

const PHOTO_MAP: Record<AgentPhotoVariant, { src: string; objectPosition: string; alt: string }> = {
  primary: {
    src: "/f45d3a61-9f71-448d-b22d-e04cc84ff976.jpg",
    objectPosition: "object-center",
    alt: "Veronica Medellin, REALTOR® in Houston, TX",
  },
  armchair: {
    src: "/f45d3a61-9f71-448d-b22d-e04cc84ff976.jpg",
    objectPosition: "object-center",
    alt: "Veronica Medellin seated in luxury studio portrait",
  },
  studio: {
    src: "/8b51d99d-8de1-4d39-ae32-8281a6b0b71d.jpg",
    objectPosition: "object-top",
    alt: "Veronica Medellin studio portrait",
  },
  stool: {
    src: "/8b51d99d-8de1-4d39-ae32-8281a6b0b71d.jpg",
    objectPosition: "object-top",
    alt: "Veronica Medellin seated studio portrait",
  },
  luxury: {
    src: "/88acb076-f9ae-479a-8516-963e2657ab2a.jpg",
    objectPosition: "object-top",
    alt: "Veronica Medellin in luxury foyer",
  },
  lobby: {
    src: "/88acb076-f9ae-479a-8516-963e2657ab2a.jpg",
    objectPosition: "object-top",
    alt: "Veronica Medellin in marble estate entry",
  },
  fireplace: {
    src: "/f9ee462d-788d-4714-82bb-c4ea73e57dbe.jpg",
    objectPosition: "object-top",
    alt: "Veronica Medellin inside luxury Houston residence",
  },
  home: {
    src: "/f9ee462d-788d-4714-82bb-c4ea73e57dbe.jpg",
    objectPosition: "object-top",
    alt: "Veronica Medellin home interior",
  },
  headshot: {
    src: "/veronica.jpg",
    objectPosition: "object-center",
    alt: "Veronica Medellin REALTOR® headshot",
  },
  closeup: {
    src: "/f91cd6f0-3ef8-4c6a-82e8-3a7ffd591cc2.jpg",
    objectPosition: "object-center",
    alt: "Veronica Medellin close-up portrait",
  },
};

export function AgentPhoto({
  variant = "primary",
  className,
  priority,
}: {
  variant?: AgentPhotoVariant;
  className?: string;
  priority?: boolean;
}) {
  const photo = PHOTO_MAP[variant] ?? PHOTO_MAP.primary;

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
        className={cn("object-cover", photo.objectPosition)}
        priority={priority}
      />
    </div>
  );
}
