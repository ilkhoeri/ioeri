'use client';

import { markdownHTML } from "@/lib/clean-html";
import { markdownText } from "@/modules";

export function ResultMarkDown({text}:{text:string}) {
  return (
    <div
      className="textarea_class text-preline flex-col markdown-body"
      dangerouslySetInnerHTML={markdownHTML(markdownText(text))}
    />
  );
}