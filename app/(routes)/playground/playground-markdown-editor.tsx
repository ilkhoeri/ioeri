"use client";

import Element from "@/components/ui/element";
import { useState } from "react";
import { UnstyledButton } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { markdownHTML, markdownInsertHTML } from "@/lib/clean-html";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cnx, markdownText, useElementInfo, CodeIcon, CSSIcon, TailwindIcon } from "@/modules";
import { Code } from "@/components/ui/code";
import { CodeCustomizer } from "@/components/ui/code-customizer";

export function MarkdownEditor({ edit, code, css }: Record<"edit" | "code" | "css", string>) {
  const [text, setText] = useState<string>(edit);

  const classTrigger = cnx(
    "data-[state=active]:bg-color data-[state=active]:text-background data-[state=active]:font-semibold font-medium [&_svg]:sizer [--sz:20px] select-none",
  );

  return (
    <Tabs defaultValue="edit" className="w-full">
      <TabsList className="w-full flex justify-between bg-background-box border">
        <Element className="w-max flex flex-row items-center rounded-sm">
          <TabsTrigger value="edit" className={classTrigger}>
            Edit
          </TabsTrigger>
          <TabsTrigger value="preview" className={classTrigger}>
            Preview
          </TabsTrigger>
        </Element>

        <Element className="w-max flex flex-row items-center rounded-sm">
          <TabsTrigger value="code" className={classTrigger}>
            <CodeIcon />
          </TabsTrigger>
          <TabsTrigger value="css" className={classTrigger}>
            <CSSIcon />
          </TabsTrigger>
        </Element>
      </TabsList>
      <TabsContent value="edit">
        <Card>
          <Textarea
            name="playground"
            id="playground"
            title="playground"
            aria-label="playground"
            cols={30}
            rows={10}
            className="!border-0 !bg-transparent"
            spellCheck={false}
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
          />
        </Card>
      </TabsContent>

      <TabsContent value="preview">
        <Card>
          <div
            className="textarea_class !border-0 !bg-transparent text-preline flex-col markdown-body"
            dangerouslySetInnerHTML={markdownHTML(markdownText(text))}
          />
        </Card>
      </TabsContent>

      <TabsContent value="code">
        <Card className="p-4">
          <CodeCustomizer code={String(code)} />
          {/* <Code code={code} /> */}
        </Card>
      </TabsContent>

      <TabsContent value="css">
        <Card className="p-4">
          <CodeCustomizer code={String(css)} />
          {/* <Code code={css} /> */}
        </Card>
      </TabsContent>
    </Tabs>
  );
}

/**
export function TabsDemo() {
  return (
    <div className="space-y-2 relative">
      <Element className="flex flex-row items-center justify-between p-0 ml-1 mt-1 after:rounded-md w-[calc(100%-8px)] after:border after: overflow-hidden after:absolute after:-z-1 after:content-[''] after:h-10 after:w-full rounded-sm after:left-0 after:top-0 after:">
        <Element className="w-max flex flex-row items-center bg-background rounded-sm">
          <label
            // ref={labelRef as React.LegacyRef<HTMLLabelElement>}
            htmlFor="playground"
            onClick={() => setPreview(false)}
            className={className(!preview)}
          >
            Edit
          </label>

          <UnstyledButton
            // ref={buttonRef as React.LegacyRef<HTMLButtonElement>}
            aria-label="preview"
            role="button"
            onClick={() => setPreview(true)}
            className={className(preview)}
          >
            Preview
          </UnstyledButton>
        </Element>

        <Element className="w-max flex flex-row items-center bg-background rounded-sm">
          <UnstyledButton aria-label="code" role="button" onClick={() => setPreview(true)} className={className(false)}>
            <CodeIcon />
          </UnstyledButton>

          <UnstyledButton aria-label="css" role="button" onClick={() => setPreview(true)} className={className(false)}>
            <TailwindIcon />
          </UnstyledButton>
        </Element>
      </Element>

      {preview ? (
        
      ) : (
        
      )}
    </div>
  );
}
 */
