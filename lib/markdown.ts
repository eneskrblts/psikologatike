/**
 * Küçük ve bağımlılıksız Markdown → HTML dönüştürücü.
 * Önce kaçış yapılır, sonra biçimlendirme uygulanır (güvenli).
 */

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function inline(input: string): string {
  let out = input;

  // kod
  out = out.replace(/`([^`]+)`/g, (_m, code: string) => `<code>${code}</code>`);
  // link
  out = out.replace(
    /\[([^\]]+)\]\((https?:\/\/[^)\s]+|\/[^)\s]*)\)/g,
    (_m, text: string, href: string) =>
      `<a href="${href}"${href.startsWith("http") ? ' target="_blank" rel="noopener noreferrer"' : ""}>${text}</a>`,
  );
  // kalın
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/__([^_]+)__/g, "<strong>$1</strong>");
  // italik
  out = out.replace(/(^|[\s(])\*([^*\n]+)\*/g, "$1<em>$2</em>");
  out = out.replace(/(^|[\s(])_([^_\n]+)_/g, "$1<em>$2</em>");

  return out;
}

export function renderMarkdown(markdown: string): string {
  const lines = escapeHtml(markdown ?? "").split(/\r?\n/);
  const html: string[] = [];

  let paragraph: string[] = [];
  let list: "ul" | "ol" | null = null;
  let quote: string[] = [];
  let inCode = false;
  let code: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      html.push(`<p>${inline(paragraph.join(" "))}</p>`);
      paragraph = [];
    }
  };

  const flushList = () => {
    if (list) {
      html.push(`</${list}>`);
      list = null;
    }
  };

  const flushQuote = () => {
    if (quote.length) {
      html.push(`<blockquote>${inline(quote.join(" "))}</blockquote>`);
      quote = [];
    }
  };

  const flushAll = () => {
    flushParagraph();
    flushList();
    flushQuote();
  };

  for (const raw of lines) {
    const line = raw.trimEnd();

    if (line.startsWith("```")) {
      if (inCode) {
        html.push(`<pre><code>${code.join("\n")}</code></pre>`);
        code = [];
        inCode = false;
      } else {
        flushAll();
        inCode = true;
      }
      continue;
    }

    if (inCode) {
      code.push(line);
      continue;
    }

    if (!line.trim()) {
      flushAll();
      continue;
    }

    if (/^---+$/.test(line.trim())) {
      flushAll();
      html.push("<hr />");
      continue;
    }

    const heading = /^(#{1,4})\s+(.*)$/.exec(line);
    if (heading) {
      flushAll();
      const level = heading[1].length;
      html.push(`<h${level}>${inline(heading[2].trim())}</h${level}>`);
      continue;
    }

    if (line.startsWith("&gt;") || line.startsWith(">")) {
      flushParagraph();
      flushList();
      quote.push(line.replace(/^&gt;\s?/, "").replace(/^>\s?/, ""));
      continue;
    }

    const unordered = /^[-*]\s+(.*)$/.exec(line.trim());
    if (unordered) {
      flushParagraph();
      flushQuote();
      if (list !== "ul") {
        flushList();
        html.push("<ul>");
        list = "ul";
      }
      html.push(`<li>${inline(unordered[1])}</li>`);
      continue;
    }

    const ordered = /^\d+\.\s+(.*)$/.exec(line.trim());
    if (ordered) {
      flushParagraph();
      flushQuote();
      if (list !== "ol") {
        flushList();
        html.push("<ol>");
        list = "ol";
      }
      html.push(`<li>${inline(ordered[1])}</li>`);
      continue;
    }

    flushList();
    flushQuote();
    paragraph.push(line.trim());
  }

  if (inCode && code.length) {
    html.push(`<pre><code>${code.join("\n")}</code></pre>`);
  }
  flushAll();

  return html.join("\n");
}
