"use client";

import { useState } from "react";
import { markdownHTML } from "@/lib/clean-html";

import Element from "@/components/ui/element";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { CopyToggle, GetCodeToggle } from "@/components/ui/toggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { cnx, markdownText, CodeIcon, CSSIcon, TailwindIcon, BracketsIcon } from "@/modules";

type RecordNested<U extends string, T extends string, P = Record<string, unknown>> = {
  [K in U]?: Partial<Record<T, P>>;
};
type MarkdownValue = "code" | "tailwind" | "css" | "usage";
type PlaygroundType = Partial<Record<"edit" | "linkCode", string | null>> &
  RecordNested<"childrens", MarkdownValue, React.ReactNode> & {
    defaultState?: "edit" | MarkdownValue;
  };

export function Playground(Play: PlaygroundType) {
  const { defaultState = "edit", edit, childrens, linkCode } = Play;
  const [text, setText] = useState<string>(edit || "");

  if (!childrens) {
    return null;
  }

  const classTrigger = cnx(
    "data-[state=active]:bg-color data-[state=active]:text-background data-[state=active]:font-semibold font-medium [&_svg]:sizer [--sz:20px] select-none",
  );

  return (
    <Tabs defaultValue={defaultState} className="w-full">
      <TabsList className="w-full flex justify-between bg-background-box border">
        {edit && (
          <Element className="w-max flex flex-row items-center rounded-sm">
            <TabsTrigger disabled={!edit} value="edit" title="edit" className={classTrigger}>
              Edit
            </TabsTrigger>

            <TabsTrigger disabled={!text} value="preview" title="preview" className={classTrigger}>
              Preview
            </TabsTrigger>
          </Element>
        )}

        <Element className="w-max flex flex-row items-center rounded-sm">
          {childrens?.code && (
            <TabsTrigger value="code" title="code" className={classTrigger}>
              <CodeIcon />
            </TabsTrigger>
          )}
          {childrens?.tailwind && (
            <TabsTrigger value="tailwind" title="tailwind" className={classTrigger}>
              <TailwindIcon />
            </TabsTrigger>
          )}
          {childrens?.css && (
            <TabsTrigger value="css" title="css" className={classTrigger}>
              <CSSIcon />
            </TabsTrigger>
          )}
          {childrens.usage && (
            <TabsTrigger value="usage" title="usage" className={classTrigger}>
              <BracketsIcon />
            </TabsTrigger>
          )}
        </Element>
      </TabsList>
      {edit && (
        <>
          <TabsContent value="edit">
            <Card className="min-h-[62px]">
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
              <CopyToggle text={text} />
            </Card>
          </TabsContent>

          <TabsContent value="preview">
            <Card className="min-h-[62px]">
              <div
                className="textarea_class !border-0 !bg-transparent text-preline flex-col markdown-body"
                dangerouslySetInnerHTML={markdownHTML(markdownText(text))}
              />
            </Card>
          </TabsContent>
        </>
      )}

      {childrens?.code && (
        <TabsContent value="code">
          <Card className="min-h-[62px]">
            {childrens?.code} {linkCode && <GetCodeToggle linkCode={linkCode} />}
          </Card>
        </TabsContent>
      )}

      {childrens?.tailwind && (
        <TabsContent value="tailwind">
          <Card className="min-h-[62px]">{childrens?.tailwind}</Card>
        </TabsContent>
      )}

      {childrens?.css && (
        <TabsContent value="css">
          <Card className="min-h-[62px]">{childrens?.css}</Card>
        </TabsContent>
      )}

      {childrens?.usage && (
        <TabsContent value="usage">
          <Card className="min-h-[62px]">{childrens?.usage}</Card>
        </TabsContent>
      )}
    </Tabs>
  );
}
