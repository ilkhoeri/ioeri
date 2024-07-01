import * as React from "react";
import { CopyToggle } from "./toggle";
import { twMerge } from "tailwind-merge";

type CodeCustomizer = {
  code?: string | null;
  setInnerHTML?: string | null;
  className?: string;
  title?: string;
};

export function Code(Text: CodeCustomizer) {
  const { code, setInnerHTML } = Text;
  if (!code) return null;
  if (setInnerHTML && !code) {
    throw new Error("because setInnerHTML is true, setInnerHTML and code must be defined");
  }
  return (
    <>
      <div data-rehype-pretty-code-fragment="" className="scrollbar">
        <pre className="p-4 rounded-lg" data-language="tsx" data-theme="default">
          <code
            className="relative white-space-pre-wrap w-max rounded bg-muted font-mono text-span"
            data-language="tsx"
            data-theme="default"
            dangerouslySetInnerHTML={Text.setInnerHTML ? { __html: Text.setInnerHTML } : undefined}
          >
            {Text.setInnerHTML ? null : Text.code}
          </code>
        </pre>
      </div>

      <CopyToggle text={Text.code} />
    </>
  );
}

export function Customizer(Text: CodeCustomizer) {
  if (!Text.code && !Text.setInnerHTML) return null;
  return (
    <div className={twMerge("mb-12", Text.className)} data-language="" data-theme="">
      {Text.title && <h4>{Text.title}</h4>}
      <div
        className="md_custom relative white-space-pre-wrap text-base"
        data-language="tsx"
        data-theme="default"
        dangerouslySetInnerHTML={Text.setInnerHTML ? { __html: Text.setInnerHTML } : undefined}
      >
        {Text.setInnerHTML ? null : Text.code}
      </div>
    </div>
  );
}

export function APIReference(Text: CodeCustomizer) {
  if (!Text.code && !Text.setInnerHTML) return null;
  return (
    <div data-theme="default" className="-mt-4">
      <h4 id="api-reference" className="">
        {Text.title || "API reference"}
      </h4>
      <div
        className="md_custom relative white-space-pre-wrap text-base mt-4 mb-12 flex flex-row items-center flex-wrap gap-6"
        data-language="tsx"
        data-theme="default"
        dangerouslySetInnerHTML={Text.setInnerHTML ? { __html: Text.setInnerHTML } : undefined}
      >
        {Text.setInnerHTML ? null : Text.code}
      </div>
    </div>
  );
}
