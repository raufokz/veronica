"use client";

import { useState } from "react";
import { Link2 } from "lucide-react";
import { toast } from "sonner";
import { FacebookIcon, LinkedInIcon, XIcon } from "@/components/social-icons";
import { siteConfig } from "@/lib/site-config";

export function BlogShareButtons({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);
  const url = `${siteConfig.siteUrl}/blog/${slug}`;
  const encoded = encodeURIComponent(url);
  const text = encodeURIComponent(title);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy the link");
    }
  }

  const buttons = [
    {
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`,
      icon: FacebookIcon,
    },
    {
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?url=${encoded}&text=${text}`,
      icon: XIcon,
    },
    {
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`,
      icon: LinkedInIcon,
    },
  ];

  return (
    <div className="flex items-center gap-2">
      {buttons.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="rounded-full border border-black/10 p-2 text-ink/70 transition-colors hover:border-brand hover:text-brand"
        >
          <Icon className="size-4" />
        </a>
      ))}
      <button
        type="button"
        onClick={copyLink}
        aria-label="Copy link"
        className="rounded-full border border-black/10 p-2 text-ink/70 transition-colors hover:border-brand hover:text-brand"
      >
        {copied ? <Link2 className="size-4 text-brand" /> : <Link2 className="size-4" />}
      </button>
    </div>
  );
}
