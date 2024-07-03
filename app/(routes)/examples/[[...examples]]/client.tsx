"use client";

import { useState } from "react";
import { Textarea } from "@/library/components/textarea";
import { CopyToggle } from "@/library/components/toggle";

import { markdownText } from "@/resource/docs/playground";
import { Tabs } from "@/library/components/tabs";
import { Playground } from "@/library/components/playground";

export function EditableContent({
  edit: textEdit,
  childrens,
}: {
  edit: string | null;
  childrens?: Partial<Record<"code" | "css" | "usage", React.ReactNode>>;
}) {
  const [text, setText] = useState<string>(textEdit || "");

  const edit = (
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
      <CopyToggle className="absolute right-4 top-4 z-9" text={text} />
    </>
  );

  const preview = (
    <div
      data-rehype-pretty-code-fragment=""
      className="textarea_class !border-0 !bg-transparent white-space-pre-line flex-col scrollbar markdown-body"
      dangerouslySetInnerHTML={{ __html: markdownText(text) }}
    />
  );

  return (
    <Tabs defaultValue="code" id="code" className="w-full scroll-m-20">
      <Playground childrens={{ edit, preview, ...childrens }} />
    </Tabs>
  );
}
