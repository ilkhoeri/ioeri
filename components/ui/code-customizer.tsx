"use client";

import * as React from "react";
import { CopyToggle } from "./toggle";

export function CodeCustomizer({ code }: { code: string }) {
  return (
    <div data-rehype-pretty-code-fragment="">
      <pre className="overflow-x-auto rounded-lg scrollbar" data-language="tsx" data-theme="default">
        <code
          className="relative text-pre-wrap w-max rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-paragraph"
          data-language="tsx"
          data-theme="default"
          // dangerouslySetInnerHTML={{ __html: code }}
        >
          {code}
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
      return `<p>${beforeComment} <i>// ${comment}</i></p>`;
    } else {
      return `<p><i>// ${comment}</i></p>`;
    }
  });

  return text;
}

// Helper function to strip HTML tags
function stripHtml(text: string) {
  return text.replace(/<[^>]*>/g, "").trim();
}
