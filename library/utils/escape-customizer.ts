import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";

export function escapeHtml(html: string): string {
  return html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/{/g, "&#123;")
    .replace(/}/g, "&#125;");
}
export function recallHtml(html: string): string {
  return html
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#123;/g, "{")
    .replace(/&#125;/g, "}");
}

export async function highlightCode(code: string) {
  const file = await unified()
    .use(remarkParse) // Convert into markdown AST
    .use(remarkRehype) // Transform to HTML AST
    .use(rehypeSanitize) // Sanitize HTML input
    .use(rehypePrettyCode, {
      keepBackground: false,
    })
    .use(rehypeStringify) // Convert AST into serialized HTML
    .process(code);

  return String(file);
}

// Helper function to strip HTML tags
function stripHtml(text: string) {
  return text.replace(/<[^>]*>/g, "").trim();
}

export function escapeCode(text: string): string {
  text = escapeHtml(text);

  text = text.replace(/^(.*?)(\/\/.*)$/gm, (match, p1, p2) => {
    const beforeComment = p1.trim();
    const comment = p2.replace(/^\/\//, "").trim();

    if (beforeComment) {
      return `<p>${beforeComment} <i data-fragment="comment">// ${comment}</i></p>`;
    } else {
      return `<p data-fragment="comment"><i>// ${comment}</i></p>`;
    }
  });

  // text = text.replace(/```(.*?)```/g, "<code>$1</code>");

  return text;
}

const regex = /\[([^\]]+)\]\(([^)]+)\)(?:\{([^}]+)\})?/g;

export function mdCustom(text: string | null): string | null | undefined {
  if (!text) return;
  text = text.replace(/___/g, "<hr>");

  text = text.replace(/_(.*?)_/g, "<i>$1</i>");

  text = text.replace(/~(.*?)~/g, "<s>$1</s>");

  text = text.replace(/\*(.*?)\*/g, "<strong>$1</strong>");

  text = text.replace(/^### (.*$)/gim, "<h3>$1</h3>");
  text = text.replace(/^## (.*$)/gim, "<h2>$1</h2>");
  text = text.replace(/^# (.*$)/gim, "<h1>$1</h1>");

  // text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="linkbox">$1</a>');
  text = text.replace(regex, (match: string, text: string, url: string, props?: string) => {
    let attributes: { [key: string]: string } = {
      target: "_blank",
      class: "link_block",
    };

    if (props) {
      const propPairs = props.split(" ");
      propPairs.forEach((pair: string) => {
        const [key, value] = pair.split("=");
        if (key && value) {
          attributes[key] = value.replace(/"/g, ""); // Remove quotes if any
        }
      });
    }

    // Convert attributes object to HTML attributes string
    const attributesString = Object.entries(attributes)
      .map(([key, value]) => `${key}="${value}"`)
      .join(" ");

    return `<a href="${url}" ${attributesString}>${text}</a>`;
  });

  text = text.replace(/<([^>]+@[^>]+)>/g, '<a href="mailto:$1">$1</a>');
  text = text.replace(/^(.*?<a href="mailto:[^>]+>[^<]+<\/a>.*)$/gm, "<p>$1</p>");

  text = text.replace(/^> (.*$)/gim, '<blockquote><p dir="auto">$1</p></blockquote>');
  text = text.replace(/^< (.*$)/gim, "$1");

  text = text.replace(/^\d+ (.*)$/gm, "<li>$1</li>");
  text = text.replace(/(<li>.*<\/li>)(?!(<\/ol>|<\/ul>))/gim, '<ol dir="auto">$1</ol>');

  text = text.replace(/^- (.*)$/gm, "<li>$1</li>");
  text = text.replace(/(<li>.*<\/li>)(?!(<\/ul>|<\/ol>))/gim, '<ul dir="auto">$1</ul>');

  text = text.replace(/<\/ol>\s*<ol dir="auto">/gim, "");
  text = text.replace(/<\/ul>\s*<ul dir="auto">/gim, "");

  // Replace `...` with <code>...</code>
  text = text.replace(/`(.*?)`/g, "<code>$1</code>");

  // Replace ```...``` with <code>...</code>
  text = text.replace(/```(.*?)```/g, "<code>$1</code>");

  return text;
}

const exampleTextLink = `
  This is a [default link](https://example.com).
  This is a [self-targeted link](https://example.com){target=_self}.
  This is a [custom class link](https://example.com){class="custom_class"}.
  This is a [fully customized link](https://example.com){target=_self class="custom_class"}.
  This is a [custom data attribute link](https://example.com){target=_self class="custom_class" data-client="links-to-href"}.
`;
