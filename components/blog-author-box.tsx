import Link from "next/link";
import { AgentPhoto } from "@/components/agent-photo";
import { siteConfig } from "@/lib/site-config";

export function BlogAuthorBox({ authorName }: { authorName: string }) {
  const isVeronica = authorName === siteConfig.name;

  return (
    <div className="mt-10 flex items-center gap-4 rounded-2xl border border-black/10 bg-sand/40 p-5">
      <AgentPhoto variant="headshot" className="size-16 shrink-0 rounded-full" />
      <div>
        <p className="text-sm font-semibold text-ink">
          Written by{" "}
          <Link href="/about" className="text-brand hover:underline">
            {authorName}
          </Link>
        </p>
        {isVeronica ? (
          <p className="mt-0.5 text-xs text-slate">
            REALTOR® · TREC #{siteConfig.trecLicense} · {siteConfig.brokerage} · 10+ years serving
            Houston, Sugar Land &amp; the University area
          </p>
        ) : null}
      </div>
    </div>
  );
}
