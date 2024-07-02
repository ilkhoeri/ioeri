"use client";

import { useState } from "react";
import { Textarea } from "@/library/components/textarea";
import { CopyToggle } from "@/library/components/toggle";

import { markdownText } from "@/modules/playground";

export function EditableContent({ edit, content }: { edit: string | null; content: "edit" | "preview" }) {
  const [text, setText] = useState<string>(edit || "");

  const Edit = (
    <>
      <Textarea
        name="playground"
        data-rehype-pretty-code-fragment=""
        id="playground"
        title="playground"
        aria-label="playground"
        cols={30}
        rows={10}
        className="!border-0 !bg-transparent scrollbar"
        spellCheck={false}
        value={text}
        onChange={(e) => setText(e.currentTarget.value)}
      />
      <CopyToggle text={text} />
    </>
  );

  const Preview = (
    <div
      data-rehype-pretty-code-fragment=""
      className="textarea_class !border-0 !bg-transparent white-space-pre-line flex-col scrollbar markdown-body"
      dangerouslySetInnerHTML={{ __html: markdownText(text) }}
    />
  );

  let Content: React.JSX.Element = <></>;

  switch (content) {
    case "edit":
      Content = Edit;
      break;

    case "preview":
      Content = Preview;
      break;

    default:
      break;
  }

  return Content;
}
