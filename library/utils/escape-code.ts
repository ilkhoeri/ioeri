// import fs from "fs-extra";
import { unified } from "unified";
import rehypeSlug from "rehype-slug";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

import { transformerCopyButton } from "@rehype-pretty/transformers";

import moonlightTheme from "./moonlight.json" with { type: "json" };

const behaviors = ["after", "append", "before", "prepend", "wrap"];

export async function highlightCode(code: string | null, { copy }: { copy?: boolean } = {}) {
  if (!code) return "";

  const file = await unified()
    .use(remarkParse, { fragment: true }) // Convert into markdown AST
    .use(remarkRehype) // Transform to HTML AST
    .use(rehypeSanitize) // Sanitize HTML input
    // @ts-ignore
    .use(rehypePrettyCode, {
      grid: true,
      keepBackground: false,
      theme: moonlightTheme,
      tokensMap: {
        fn: "entity.name.function",
      },
      transformers: copy && [
        transformerCopyButton({
          visibility: "always",
          feedbackDuration: 3_000,
        }),
      ],
      filterMetaString: (string) => string.replace(/filename="[^"]*"/, ""),
    })
    .use(rehypeSlug)
    // @ts-ignore
    .use(rehypeAutolinkHeadings, {
      behavior: "prepend",
      properties: {
        className: ["anchor_id"],
      },
      content: (node) => [
        {
          type: "element",
          tagName: "svg",
          properties: {
            xmlns: "http://www.w3.org/2000/svg",
            width: "26",
            height: "26",
            fill: "currentColor",
            viewBox: "0 0 24 24",
            className: "mr-2",
          },
          children: [
            {
              type: "element",
              tagName: "path",
              properties: {
                d: "M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z",
              },
            },
          ],
        },
      ],
    })
    .use(rehypeStringify) // Convert AST into serialized HTML
    .process(code);

  return String(file);
}

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

// Helper function to strip HTML tags
function stripHtml(text: string) {
  return text.replace(/<[^>]*>/g, "").trim();
}

export function escapeCode(text: string): string {
  text = escapeHtml(text);

  text = text.replace(/^(.*?)(\/\/\ .*)$/gm, (match, p1, p2) => {
    const beforeComment = p1.trim();
    const comment = p2.replace(/^\/\//, "").trim();

    if (beforeComment) {
      return `<p>${beforeComment} <i data-fragment="comment">// ${comment}</i></p>`;
    } else {
      return `<p data-fragment="comment"><i>// ${comment}</i></p>`;
    }
  });

  return text;
}

const regex = /\[([^\]]+)\]\(([^)]+)\)(?:\{([^}]+)\})?/g;

export function mdCustom(text: string | null): string | null | undefined {
  if (!text) return;
  text = text.replace(/___/g, "<hr>");

  // text = text.replace(/_(.*?)_/g, "<i>$1</i>");

  text = text.replace(/~(.*?)~/g, "<s>$1</s>");

  text = text.replace(/\*(.*?)\*/g, "<strong>$1</strong>");

  text = text.replace(/^### (.*$)/gim, "<h3>$1</h3>");
  text = text.replace(/^## (.*$)/gim, "<h2>$1</h2>");
  text = text.replace(/^# (.*$)/gim, "<h1>$1</h1>");

  // text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="linkbox">$1</a>');
  text = text.replace(regex, (match: string, text: string, url: string, props?: string) => {
    let attributes: { [key: string]: string } = {
      target: "_blank",
      class: "links",
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

  text = text.replace(/`(.*?)`/g, "<code>$1</code>");

  text = text.replace(/```(.*?)```/g, '<pre class="codeblock"><code>$1</code></pre>');

  return text;
}

const exampleTextLink = `
  This is a [default link](https://example.com).
  This is a [self-targeted link](https://example.com){target=_self}.
  This is a [custom class link](https://example.com){class="custom_class"}.
  This is a [fully customized link](https://example.com){target=_self class="custom_class"}.
  This is a [custom data attribute link](https://example.com){target=_self class="custom_class" data-client="links-to-href"}.
`;
