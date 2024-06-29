import * as React from "react";
import { CopyToggle } from "./toggle";

export function CodeCustomizer({ code, setInnerHTML = false }: { code: string; setInnerHTML?: boolean }) {
  return (
    <>
      <div data-rehype-pretty-code-fragment="" className="scrollbar">
        <pre className="p-4 rounded-lg" data-language="tsx" data-theme="default">
          <code
            className="relative white-space-pre-wrap w-max rounded bg-muted font-mono text-span"
            data-language="tsx"
            data-theme="default"
            dangerouslySetInnerHTML={setInnerHTML ? { __html: code } : undefined}
          >
            {setInnerHTML ? null : code}
          </code>
        </pre>
      </div>

      <CopyToggle text={code} />
    </>
  );
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
