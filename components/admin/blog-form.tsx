"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { blogPostSchema, type BlogPostFormInput } from "@/lib/schemas";
import {
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from "@/app/actions/admin-blog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ImageUploader } from "@/components/admin/image-uploader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { buttonVariants } from "@/components/ui/button";
import type { BlogPost } from "@/types/supabase";
import { blogCategoryLabels, blogCategorySlugs } from "@/lib/blog-content";
import { cn } from "@/lib/utils";

function toFormValues(post?: BlogPost | null): Partial<BlogPostFormInput> {
  if (!post) {
    return { status: "draft", category: "market_trends", author: "Veronica Medellin" };
  }
  return {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt ?? "",
    content: post.content,
    category: post.category ?? "market_trends",
    cover_image: post.cover_image ?? "",
    tags: (post.tags ?? []).join(", "),
    status: post.status,
    published_at: post.published_at ? post.published_at.slice(0, 16) : "",
    author: post.author ?? "Veronica Medellin",
    meta_description: post.meta_description ?? "",
  };
}

export function BlogForm({ post }: { post?: BlogPost | null }) {
  const isEdit = !!post;
  const [deleting, setDeleting] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BlogPostFormInput>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: toFormValues(post),
  });

  const status = watch("status");

  async function onSubmit(values: BlogPostFormInput) {
    const result = isEdit
      ? await updateBlogPost(post!.id, values)
      : await createBlogPost(values);
    if (result && !result.success) {
      toast.error(result.error);
    }
  }

  async function onDelete() {
    if (!post) return;
    if (!confirm(`Delete "${post.title}"? This can't be undone.`)) return;
    setDeleting(true);
    const result = await deleteBlogPost(post.id);
    if (!result.success) {
      toast.error(result.error);
      setDeleting(false);
    } else {
      toast.success("Post deleted.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-3xl" noValidate>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Title *" error={errors.title?.message}>
          <Input {...register("title")} />
        </Field>
        <Field label="Slug *" error={errors.slug?.message}>
          <Input {...register("slug")} placeholder="what-mortgage-rates-mean-2026" />
        </Field>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Field label="Category">
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {blogCategorySlugs.map((slug) => (
                    <SelectItem key={slug} value={slug}>
                      {blogCategoryLabels[slug]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>
        <Field label="Status">
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </Field>
        {(status === "published" || status === "scheduled") && (
          <Field label={status === "scheduled" ? "Publish date & time" : "Published at (optional)"}>
            <Input type="datetime-local" {...register("published_at")} />
          </Field>
        )}
        {(status === "draft" || status === "archived") && <div className="sm:block hidden" />}
      </div>

      <Field label="Excerpt" error={errors.excerpt?.message}>
        <Textarea rows={3} {...register("excerpt")} placeholder="2–3 sentence summary shown on cards" />
      </Field>

      <Field label="Cover image">
        <Controller
          control={control}
          name="cover_image"
          render={({ field }) => (
            <ImageUploader
              value={field.value ? [field.value] : []}
              onChange={(urls) => field.onChange(urls[0] ?? "")}
              bucket="blog-images"
              folder="posts"
              single
            />
          )}
        />
      </Field>

      <Field
        label="Content *"
        error={errors.content?.message}
        hint="Supports ## headings, > blockquotes, and - / 1. lists. Leave a blank line between blocks."
      >
        <Textarea rows={14} {...register("content")} className="font-mono text-sm" />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Tags (comma separated)">
          <Input {...register("tags")} placeholder="mortgage rates, Clear Lake" />
        </Field>
        <Field label="Author">
          <Input {...register("author")} />
        </Field>
      </div>

      <Field label="Meta description (SEO)">
        <Input {...register("meta_description")} placeholder="Optional — shown in Google results" />
      </Field>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(buttonVariants(), "rounded-full bg-brand hover:bg-brand/90 text-white px-6")}
        >
          {isSubmitting ? "Saving…" : isEdit ? "Save changes" : "Create post"}
        </button>
        {isEdit && (
          <button
            type="button"
            onClick={onDelete}
            disabled={deleting}
            className={cn(buttonVariants({ variant: "outline" }), "rounded-full px-6 border-brand text-brand")}
          >
            {deleting ? "Deleting…" : "Delete"}
          </button>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  hint,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
      {hint && !error && <p className="text-xs text-slate">{hint}</p>}
      {error && <p className="text-xs text-brand">{error}</p>}
    </div>
  );
}
