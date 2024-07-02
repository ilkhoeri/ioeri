import * as React from "react";
import { CopyToggle, GetCodeToggle } from "./toggle";
import { CSSIcon, TypescriptIcon } from "@/modules";
import { twMerge } from "tailwind-merge";

type CodeCustomizer = {
  code?: string | null;
  setInnerHTML?: string | null;
  className?: string;
  title?: string;
  repo?: string | null;
};

type ExtIconsType = { ext?: string };
export function ExtIcons({ ext }: ExtIconsType) {
  if (!ext) return null;

  if (ext === ".ts") return <TypescriptIcon />;
  if (ext === ".tsx") return <TypescriptIcon />;
  if (ext === ".css") return <CSSIcon />;
}

export function Code(Text: CodeCustomizer & ExtIconsType) {
  const { code, setInnerHTML, title, repo, ...rest } = Text;
  if (!code) return null;
  if (setInnerHTML && !code) {
    throw new Error("because setInnerHTML is true, setInnerHTML and code must be defined");
  }
  return (
    <>
      <div className="w-full h-12 border-b rounded-t-[inherit] p-[0_12px_0_16px] to-background-code-header flex flex-row items-center">
        {title && (
          <div className="flex flex-row items-center gap-2 text-[13px] text-muted-foreground [&_svg]:size-4">
            <ExtIcons {...rest} /> <span className="font-normal">{title}</span>
          </div>
        )}
        <div className="flex flex-row items-center gap-1 ml-auto">
          {repo && <GetCodeToggle repo={repo} />} <CopyToggle text={Text.code} />
        </div>
      </div>

      <div data-rehype-pretty-code-fragment="" className="scrollbar">
        <pre className="p-4 rounded-lg" data-language="tsx" data-theme="default">
          <code
            data-language="tsx"
            data-theme="default"
            dangerouslySetInnerHTML={Text.setInnerHTML ? { __html: Text.setInnerHTML } : undefined}
          >
            {Text.setInnerHTML ? null : Text.code}
          </code>
        </pre>
      </div>
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
