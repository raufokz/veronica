import { createClient } from "@/lib/supabase/server";
import { createStaticClient } from "@/lib/supabase/static";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";
import type { BlogCategory, BlogPost } from "@/types/supabase";

export type BlogFilters = {
  category?: BlogCategory;
  search?: string;
  limit?: number;
  offset?: number;
};

export async function getPublishedBlogPosts(filters: BlogFilters = {}): Promise<BlogPost[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();

  let query = supabase
    .from("blog_posts")
    .select("*")
    .in("status", ["published", "scheduled"])
    .lte("published_at", new Date().toISOString());

  if (filters.category) query = query.eq("category", filters.category);
  if (filters.search) query = query.ilike("title", `%${filters.search}%`);
  if (filters.limit && filters.offset) {
    query = query.range(filters.offset, filters.offset + filters.limit - 1);
  } else if (filters.limit) {
    query = query.limit(filters.limit);
  }

  const { data, error } = await query.order("published_at", { ascending: false });
  if (error) {
    console.error("[data] getPublishedBlogPosts failed", error.message);
    return [];
  }
  return data ?? [];
}

export async function getPublishedBlogPostsCount(
  filters: Pick<BlogFilters, "category" | "search"> = {}
): Promise<number> {
  if (!isSupabaseConfigured()) return 0;
  const supabase = await createClient();

  let query = supabase
    .from("blog_posts")
    .select("*", { count: "exact", head: true })
    .in("status", ["published", "scheduled"])
    .lte("published_at", new Date().toISOString());

  if (filters.category) query = query.eq("category", filters.category);
  if (filters.search) query = query.ilike("title", `%${filters.search}%`);

  const { count, error } = await query;
  if (error) {
    console.error("[data] getPublishedBlogPostsCount failed", error.message);
    return 0;
  }
  return count ?? 0;
}

export async function getRecentBlogPosts(limit = 3): Promise<BlogPost[]> {
  return getPublishedBlogPosts({ limit });
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .in("status", ["published", "scheduled"])
    .lte("published_at", new Date().toISOString())
    .maybeSingle();

  if (error) {
    console.error("[data] getBlogPostBySlug failed", error.message);
    return null;
  }
  return data;
}

export async function getAllBlogPostSlugs(): Promise<string[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = createStaticClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("slug")
    .in("status", ["published", "scheduled"]);
  if (error) return [];
  return (data ?? []).map((row) => row.slug);
}

export async function getRelatedBlogPosts(current: BlogPost, limit = 3): Promise<BlogPost[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .in("status", ["published", "scheduled"])
    .lte("published_at", new Date().toISOString())
    .neq("id", current.id)
    .eq("category", current.category ?? "market_trends")
    .limit(limit);

  if (error) {
    console.error("[data] getRelatedBlogPosts failed", error.message);
    return [];
  }
  return data ?? [];
}
