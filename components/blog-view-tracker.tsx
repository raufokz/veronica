"use client";

import { useEffect } from "react";
import { incrementBlogViewCount } from "@/app/actions/admin-blog";

export function BlogViewTracker({ postId }: { postId: string }) {
  useEffect(() => {
    void incrementBlogViewCount(postId);
  }, [postId]);
  return null;
}
