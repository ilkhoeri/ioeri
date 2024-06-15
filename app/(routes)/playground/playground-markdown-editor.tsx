"use client";

import Element from "@/components/ui/element";
import { useState } from "react";
import { UnstyledButton } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { markdownHTML } from "@/lib/clean-html";
import { cnx, markdownText, useElementInfo } from "@/modules";

export function MarkdownEditor({ defaultText }: { defaultText: string }) {
  const [text, setText] = useState<string>(defaultText);
  const [preview, setPreview] = useState<boolean>(false);

  const initial = { initial: { height: 32, width: 48.4 } };
  const { ref: labelRef, rectElement: labelInfo } = useElementInfo(initial);
  const { ref: buttonRef, rectElement: buttonInfo } = useElementInfo(initial);

  const activeInfo = preview ? buttonInfo : labelInfo;

  const className = (n: boolean): string =>
    cnx(
      "relative z-4 flex items-center rounded-sm cursor-pointer py-1.5 px-3 min-h-8 text-sm leading-none",
      n ? "font-semibold text-background" : "font-medium",
    );

  return (
    <div className="space-y-2 relative">
      <Element className="flex flex-row items-center p-0 ml-1 mt-1 after:rounded-md bg-background w-max after:border after:border-color-muted overflow-hidden after:absolute after:-z-1 after:content-[''] after:h-10 after:w-full rounded-sm after:left-0 after:top-0 after:bg-[hsl(var(--highlight))]">
        <label
          ref={labelRef as React.LegacyRef<HTMLLabelElement>}
          htmlFor="playground"
          onClick={() => setPreview(false)}
          className={className(!preview)}
        >
          Edit
        </label>

        <UnstyledButton
          ref={buttonRef as React.LegacyRef<HTMLButtonElement>}
          aria-label="preview"
          role="button"
          onClick={() => setPreview(true)}
          className={className(preview)}
        >
          Preview
        </UnstyledButton>

        <Element
          el="span"
          className="absolute transition-transform bg-color rounded-sm"
          style={{
            transition: "transform 180ms, width 180ms",
            height: `${activeInfo.height}px`,
            width: `${activeInfo.width}px`,
            transform: `translateX(${activeInfo.x - labelInfo.left}px)`,
          }}
        />
      </Element>

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
