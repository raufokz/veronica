"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { blogPostSchema, type BlogPostFormInput } from "@/lib/schemas";
import type { AdminActionResult } from "@/app/actions/admin-listings";

function splitCommas(value?: string): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

function resolvePublishedAt(input: BlogPostFormInput): string | null {
  if (input.status !== "published" && input.status !== "scheduled") return null;
  if (input.published_at) return new Date(input.published_at).toISOString();
  return new Date().toISOString();
}

export async function createBlogPost(input: BlogPostFormInput): Promise<AdminActionResult> {
  const parsed = blogPostSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid post." };
  }
  const { tags, ...rest } = parsed.data;

  const supabase = await createClient();
  const { error } = await supabase.from("blog_posts").insert({
    ...rest,
    tags: splitCommas(tags),
    author: parsed.data.author || "Veronica Medellin",
    published_at: resolvePublishedAt(parsed.data),
  });

  if (error) {
    return { success: false, error: error.message };
  }
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath("/");
  redirect("/admin/blog");
}

export async function updateBlogPost(
  id: string,
  input: BlogPostFormInput
): Promise<AdminActionResult> {
  const parsed = blogPostSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid post." };
  }
  const { tags, ...rest } = parsed.data;

  const supabase = await createClient();
  const { error } = await supabase
    .from("blog_posts")
    .update({
      ...rest,
      tags: splitCommas(tags),
      author: parsed.data.author || "Veronica Medellin",
      published_at: resolvePublishedAt(parsed.data),
    })
    .eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath("/");
  redirect("/admin/blog");
}

export async function deleteBlogPost(id: string): Promise<AdminActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) {
    return { success: false, error: error.message };
  }
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath("/");
  return { success: true };
}

// Public-safe view counter — the SQL function is security definer and only bumps
// view_count, so this can be called from the browser without an auth session.
export async function incrementBlogViewCount(postId: string): Promise<void> {
  const supabase = await createClient();
  await supabase.rpc("increment_blog_view", { row_id: postId });
}
