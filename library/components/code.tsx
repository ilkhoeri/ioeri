import * as React from "react";
import { twMerge } from "tailwind-merge";
import { sanitizedToParams } from "@/modules/index";
import { CopyToggle, GetCodeToggle } from "./toggle";
import { CSSIcon, TypescriptIcon } from "@/modules/icons";

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

  return (
    <>
      <div className="w-full h-12 border-b rounded-t-[inherit] p-[0_12px_0_16px] to-background-code-header flex flex-row items-center">
        {title && (
          <div className="flex flex-row items-center gap-2 text-[13px] text-muted-foreground [&_svg]:size-4">
            <ExtIcons {...rest} /> <span className="font-normal">{title}</span>
          </div>
        )}
        <div className="flex flex-row items-center gap-1 ml-auto">
          {repo && <GetCodeToggle repo={repo} />} {code && <CopyToggle text={code} />}
        </div>
      </div>

      <div data-rehype-pretty-code-fragment="" data-code-fragment="" className="scrollbar">
        <pre className="p-4 rounded-lg [&>code>[data-rehype-pretty-code-figure]]:pr-8" data-language="tsx" data-theme="default">
          <code
            data-language="tsx"
            data-theme="default"
            dangerouslySetInnerHTML={setInnerHTML ? { __html: setInnerHTML } : undefined}
          >
            {setInnerHTML ? null : code}
          </code>
        </pre>
      </div>
    </>
  );
}

export function Customizer(Text: CodeCustomizer) {
  if (!Text.code && !Text.setInnerHTML) return null;
  return (
    <div className={twMerge("mb-12 text-base", Text.className)} data-rehype-customizer="" data-code-fragment="">
      {Text.title && <h4>{Text.title}</h4>}
      <div
        className="md_custom relative white-space-pre-wrap"
        data-language="tsx"
        data-theme="default"
        dangerouslySetInnerHTML={Text.setInnerHTML ? { __html: Text.setInnerHTML } : undefined}
      >
        {Text.setInnerHTML ? null : Text.code}
      </div>
    </div>
  );
}

export function Reference(Text: CodeCustomizer) {
  if (!Text.code && !Text.setInnerHTML) return null;
  return (
    <div data-block="reference" className={twMerge("-mt-4 text-base", Text.className)}>
      {Text.title && (
        <h4 id={sanitizedToParams(Text.title)} data-block="title">
          {Text.title}
        </h4>
      )}

      <div
        className="relative white-space-pre-wrap mt-4 mb-12 flex flex-col gap-6"
        data-block="body"
        dangerouslySetInnerHTML={Text.setInnerHTML ? { __html: Text.setInnerHTML } : undefined}
      >
        {Text.setInnerHTML ? null : Text.code}
      </div>
    </div>
  );
}
