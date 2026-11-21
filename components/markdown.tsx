import { renderMarkdown } from "@/lib/markdown";

export function Markdown({ source }: { source: string }) {
  return <div className="prose-site" dangerouslySetInnerHTML={{ __html: renderMarkdown(source) }} />;
}
