import * as React from "react";
import { CopyToggle } from "./toggle";

export function CodeCustomizer({ code, setInnerHTML = false }: { code: string; setInnerHTML?: boolean }) {
  return (
    <div data-rehype-pretty-code-fragment="">
      <pre className="p-4 overflow-x-auto rounded-lg scrollbar" data-language="tsx" data-theme="default">
        <code
          className="relative text-pre-wrap w-max rounded bg-muted font-mono text-span"
          data-language="tsx"
          data-theme="default"
          dangerouslySetInnerHTML={setInnerHTML ? { __html: code } : undefined}
        >
          {setInnerHTML ? null : code}
        </code>
      </pre>
      <CopyToggle text={code} />
    </div>
  );
}

export function markdownCustomizer(text: string): string {
  text = text.replace(/^(.*?)(\/\/.*)$/gm, (match, p1, p2) => {
    const beforeComment = p1.trim();
    const comment = p2.replace(/^\/\//, "").trim();

    if (beforeComment) {
      return `<p class="text-muted-foreground" style="margin-bottom: -12px;">${beforeComment} <i>// ${comment}</i></p>`;
    } else {
      return `<p class="text-muted-foreground" style="margin-bottom: -12px;"><i>// ${comment}</i></p>`;
    }
  });

  text = text.replace(/```(.*?)```/g, "<code>$1</code>");

  return text;
}

// Helper function to strip HTML tags
function stripHtml(text: string) {
  return text.replace(/<[^>]*>/g, "").trim();
}
