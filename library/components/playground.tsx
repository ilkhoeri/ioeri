"use client";

import { useState } from "react";
import { markdownHTML } from "@/library/utils/clean-html";

import Element from "@/library/components/element";
import { Card } from "@/library/components/card";
import { Textarea } from "@/library/components/textarea";
import { CopyToggle, GetCodeToggle } from "@/library/components/toggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/library/components/tabs";

import { cnx, markdownText, CodeIcon, CSSIcon, TailwindIcon, BracketsIcon } from "@/modules";
import { Button, UnstyledButton } from "./button";

type RecordNested<U extends string, T extends string, P = Record<string, unknown>> = {
  [K in U]?: Partial<Record<T, P>>;
};
type MarkdownValue = "code" | "tailwind" | "css" | "usage";
type PlaygroundType = Partial<Record<"edit" | "repo", string | null>> &
  RecordNested<"childrens", MarkdownValue, React.ReactNode> & {
    defaultState?: "edit" | MarkdownValue;
  };

export function Playground(Play: PlaygroundType) {
  const { edit, childrens, repo } = Play;
  const [text, setText] = useState<string>(edit || "");

  if (!childrens) {
    return null;
  }

  const classTrigger = cnx(
    "data-[state=active]:bg-color data-[state=active]:text-background data-[state=active]:font-semibold font-medium [&_svg]:sizer [--sz:20px] select-none",
  );

  return (
    <>
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
            <Card className="min-h-[62px] bg-background-box">
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
            <Card className="min-h-[62px] bg-background-box">
              <div
                className="textarea_class !border-0 !bg-transparent white-space-pre-line flex-col markdown-body"
                dangerouslySetInnerHTML={markdownHTML(markdownText(text))}
              />
            </Card>
          </TabsContent>
        </>
      )}

      {childrens?.code && (
        <TabsContent value="code">
          <Card className="min-h-[62px] bg-background-box">
            {childrens?.code} {repo && <GetCodeToggle repo={repo} />}
          </Card>
        </TabsContent>
      )}

      {childrens?.tailwind && (
        <TabsContent value="tailwind">
          <Card className="min-h-[62px] bg-background-box">{childrens?.tailwind}</Card>
        </TabsContent>
      )}

      {childrens?.css && (
        <TabsContent value="css">
          <Card className="min-h-[62px] bg-background-box">{childrens?.css}</Card>
        </TabsContent>
      )}

      {childrens?.usage && (
        <TabsContent value="usage">
          <Card className="min-h-[62px] bg-background-box">{childrens?.usage}</Card>
        </TabsContent>
      )}
    </>
  );
}

function CardContent({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Card
      className={cnx(
        "min-h-[62px] bg-background-box relative transition-[width,height,color]",
        open
          ? "h-full max-h-full"
          : "h-[20rem] max-h-[20rem] overflow-hidden text-muted-foreground/50 before:content-[''] before:absolute before:bottom-0 before:inset-x-0 before:size-full before:bg-gradient-to-t before:from-background before:z-9",
      )}
    >
      {children}
      <Button
        variant="outline"
        className="absolute inset-x-[calc(50%-1.5rem)] bottom-4 z-[99] px-3 min-w-20 w-max"
        onClick={() => setOpen(!open)}
      >
        {open ? "Collapse" : "Expand"}
      </Button>
    </Card>
  );
}
