import * as React from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";

import { CopyToggle } from "./toggle";

export async function Code({ code }: { code: string }) {
  const highlightedCode = await highlightCode(code);
  return (
    <div data-rehype-pretty-code-fragment="">
      <pre className="overflow-x-auto rounded-lg scrollbar" data-language="tsx" data-theme="default">
        <code
          className="relative text-pre-wrap [&_*]:text-pre-wrap w-max rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-paragraph"
          data-language="tsx"
          data-theme="github-dark-dimmed github-light"
          dangerouslySetInnerHTML={{
            __html: highlightedCode,
          }}
        />
      </pre>
      <CopyToggle text={code} />
    </div>
  );
}

async function highlightCode(code: string) {
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
