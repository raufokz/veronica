import type { BlogCategory } from "@/types/supabase";

export const blogCategoryLabels: Record<BlogCategory, string> = {
  market_trends: "Market Trends",
  buying_tips: "Buying Tips",
  selling_guide: "Selling Guide",
  investment: "Investment",
  community: "Community",
};

export const blogCategorySlugs = Object.keys(blogCategoryLabels) as BlogCategory[];

export function formatBlogDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

export function estimateReadTime(content: string): number {
  const text = isHtmlContent(content) ? content.replace(/<[^>]*>/g, " ") : content;
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

// Posts can be written either as the lightweight markdown below or as a block of
// HTML pasted straight in. A leading block-level tag is what tells them apart.
const HTML_START = /^\s*<(article|section|div|h[1-6]|p|ul|ol|table|figure|header|blockquote|hr)\b/i;

export function isHtmlContent(content: string): boolean {
  return HTML_START.test(content);
}

/**
 * Defence in depth for pasted HTML. Only signed-in admins can publish posts, so
 * this is a guard against a bad paste rather than the primary control: it drops
 * executable and embedding tags, inline event handlers, and javascript: URLs.
 */
export function sanitizeBlogHtml(html: string): string {
  return html
    .replace(/<\s*(script|style|iframe|object|embed|form|input|button)\b[\s\S]*?<\s*\/\s*\1\s*>/gi, "")
    .replace(/<\s*(script|style|iframe|object|embed|form|input|button)\b[^>]*\/?\s*>/gi, "")
    .replace(/\son[a-z]+\s*=\s*"[^"]*"/gi, "")
    .replace(/\son[a-z]+\s*=\s*'[^']*'/gi, "")
    .replace(/\son[a-z]+\s*=\s*[^\s>]+/gi, "")
    .replace(/(href|src)\s*=\s*"\s*javascript:[^"]*"/gi, '$1="#"')
    .replace(/(href|src)\s*=\s*'\s*javascript:[^']*'/gi, "$1='#'");
}

// Lightweight markdown renderer for post content. Supports paragraphs,
// ## H2, > blockquote, and - / 1. lists — the same markup the admin editor allows.
export function renderBlogContent(content: string) {
  const lines = content.split(/\r?\n/);
  const blocks: Array<{ type: "h2" | "p" | "quote" | "ul" | "ol"; text: string; items?: string[] }> = [];

  let list: { type: "ul" | "ol"; items: string[] } | null = null;

  const flushList = () => {
    if (list) {
      blocks.push({ type: list.type, text: "", items: list.items });
      list = null;
    }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) {
      flushList();
      continue;
    }
    const heading = line.match(/^##\s+(.+)$/);
    if (heading) {
      flushList();
      blocks.push({ type: "h2", text: heading[1] });
      continue;
    }
    const quote = line.match(/^>\s?(.+)$/);
    if (quote) {
      flushList();
      blocks.push({ type: "quote", text: quote[1] });
      continue;
    }
    const ulItem = line.match(/^[-*]\s+(.+)$/);
    if (ulItem) {
      if (!list || list.type !== "ul") {
        flushList();
        list = { type: "ul", items: [] };
      }
      list.items.push(ulItem[1]);
      continue;
    }
    const olItem = line.match(/^\d+\.\s+(.+)$/);
    if (olItem) {
      if (!list || list.type !== "ol") {
        flushList();
        list = { type: "ol", items: [] };
      }
      list.items.push(olItem[1]);
      continue;
    }
    flushList();
    blocks.push({ type: "p", text: line });
  }
  flushList();

  return blocks;
}
