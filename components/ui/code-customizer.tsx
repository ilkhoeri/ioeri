"use client";

import * as React from "react";
import { ClipboardCheckIcon, ClipboardCopyIcon, useClipboard } from "@/modules";
import { UnstyledButton } from "./button";

export function CodeCustomizer({ code }: { code: string }) {
  const clipboard = useClipboard({ timeout: 500 });
  return (
    <div data-rehype-pretty-code-fragment="">
      <pre className="overflow-x-auto rounded-lg" data-language="tsx" data-theme="default">
        <code
          className="relative text-pre-wrap rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm"
          data-language="tsx"
          data-theme="default"
          // dangerouslySetInnerHTML={{ __html: code }}
        >
          {code}
        </code>
      </pre>
      {/* button copy */}
      <UnstyledButton
        tabIndex={-1}
        onClick={() => clipboard.copy(code)}
        className="centered rounded-sm size-6 border bg-background-box absolute right-3 top-3 [&_svg]:size-4"
      >
        {clipboard.copied ? <ClipboardCopyIcon /> : <ClipboardCheckIcon />}
      </UnstyledButton>
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
