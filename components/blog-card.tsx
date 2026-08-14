import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import type { BlogPost } from "@/types/supabase";
import { blogCategoryLabels, estimateReadTime, formatBlogDate } from "@/lib/blog-content";

export function BlogCard({ post }: { post: BlogPost }) {
  const published = post.published_at ?? post.created_at;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-xl border border-black/10 bg-white overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_2px_12px_rgb(22_22_18_/_0.08)]"
    >
      <div className="relative aspect-video bg-sand overflow-hidden">
        {post.cover_image ? (
          <Image
            src={post.cover_image}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : null}
        {post.category ? (
          <span className="absolute top-3 left-3 rounded-full bg-brand px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
            {blogCategoryLabels[post.category]}
          </span>
        ) : null}
      </div>
      <div className="flex flex-col flex-1 p-5">
        <p className="flex items-center gap-2 text-xs text-slate">
          <span>{formatBlogDate(published)}</span>
          <span className="text-black/20">·</span>
          <span className="flex items-center gap-1">
            <Clock className="size-3" />
            {estimateReadTime(post.content)} min read
          </span>
        </p>
        <h3 className="mt-2 font-display text-lg leading-snug line-clamp-2 group-hover:text-brand transition-colors">
          {post.title}
        </h3>
        {post.excerpt ? <p className="mt-2 text-sm text-slate line-clamp-3">{post.excerpt}</p> : null}
        <span className="mt-4 inline-block text-sm font-medium text-brand group-hover:underline">
          Read more
        </span>
      </div>
    </Link>
  );
}
