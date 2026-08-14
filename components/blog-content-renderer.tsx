import { isHtmlContent, renderBlogContent, sanitizeBlogHtml } from "@/lib/blog-content";

export function BlogContent({ content }: { content: string }) {
  if (isHtmlContent(content)) {
    return (
      <div
        className="blog-html"
        dangerouslySetInnerHTML={{ __html: sanitizeBlogHtml(content) }}
      />
    );
  }

  const blocks = renderBlogContent(content);

  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2 key={i} className="pt-2 font-display text-2xl font-semibold tracking-[-0.02em]">
                {block.text}
              </h2>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="border-l-4 border-brand bg-sand/60 px-5 py-4 text-ink/90 italic"
              >
                {block.text}
              </blockquote>
            );
          case "ul":
            return (
              <ul key={i} className="list-disc pl-6 space-y-2 marker:text-brand">
                {block.items?.map((item, j) => <li key={j}>{item}</li>)}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="list-decimal pl-6 space-y-2 marker:font-semibold">
                {block.items?.map((item, j) => <li key={j}>{item}</li>)}
              </ol>
            );
          default:
            return (
              <p key={i} className="text-ink/85 leading-relaxed">
                {block.text}
              </p>
            );
        }
      })}
    </div>
  );
}
