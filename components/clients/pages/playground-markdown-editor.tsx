"use client";

import { Textarea } from "@/components/ui/textarea";
import { markdownHTML } from "@/lib/clean-html";
import { cnx, markdownText } from "@/modules";
import { useState } from "react";

// import fs from "fs-extra";
// const defaultText = fs.readFileSync("txt/markdown.md", "utf-8");

export function MarkdownEditor({ text: defaultText }: { text: string }) {
  const [text, setText] = useState<string>(defaultText);
  const [preview, setPreview] = useState<boolean>(false);

  const className = (n: boolean): string =>
    cnx(
      "relative z-4 flex items-center rounded-sm cursor-pointer py-1.5 px-3 min-h-8 text-sm leading-none border border-transparent",
      n ? "font-semibold bg-color text-background" : "font-medium",
    );

  return (
    <div className="space-y-2 relative">
      <div className="flex flex-row items-center p-1 gap-2 rounded-md relative w-full bg-[hsl(var(--highlight))] border overflow-hidden after:absolute after:z-0 after:content-[''] after:h-8 after:w-[134px] after:rounded-sm after:left-1 after:bg-background">
        <label htmlFor="playground" onClick={() => setPreview(false)} className={className(!preview)}>
          Edit
        </label>

        <button
          type="button"
          aria-label="preview"
          role="button"
          onClick={() => setPreview(true)}
          className={className(preview)}
        >
          Preview
        </button>
      </div>

      {preview ? (
        <div
          className="textarea_class text-preline flex-col markdown-body"
          dangerouslySetInnerHTML={markdownHTML(markdownText(text))}
        />
      ) : (
        <Textarea
          name="playground"
          id="playground"
          title="playground"
          aria-label="playground"
          cols={30}
          rows={10}
          className="bg-background z-4"
          spellCheck={false}
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
        />
      )}
    </div>
  );
}
