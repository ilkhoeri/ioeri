"use client";

import { useState } from "react";
import { markdownHTML } from "@/library/utils/clean-html";

import { Card } from "@/library/components/card";
import { Textarea } from "@/library/components/textarea";
import { CopyToggle, GetCodeToggle } from "@/library/components/toggle";
import { TabsContent, TabsList, TabsTrigger } from "@/library/components/tabs";
import { Button } from "@/library/components/button";

import Element from "@/modules/components/web/element/element";
import { markdownText } from "@/modules/playground";
import { cnx } from "@/modules/ondevelopment/utils/cnx";

type RecordNested<U extends string, T extends string, P = Record<string, unknown>> = {
  [K in U]?: Partial<Record<T, P>>;
};
type MarkdownValue = "edit" | "preview" | "code" | "tailwind" | "css" | "usage";
type PlaygroundType = Partial<Record<"edit" | "repo", string | null>> &
  RecordNested<"childrens", MarkdownValue, React.ReactNode> & {
    defaultState?: MarkdownValue;
  };

export function Playground(Play: PlaygroundType) {
  const { edit, childrens, repo } = Play;
  const [text, setText] = useState<string>(edit || "");
  const [open, setOpen] = useState<boolean>(false);

  if (!childrens) {
    return null;
  }

  const classTrigger = cnx(
    "h-9 font-semibold rounded-none data-[state=active]:[box-shadow:0_2px_0_0_hsl(var(--color))] [&_svg]:sizer [--sz:20px] select-none",
  );

  const rest = { open, setOpen };

  return (
    <>
      <TabsList className="w-full flex justify-start bg-background border-b rounded-none p-0 pb-px">
        {edit && (
          <TabsTrigger disabled={!edit} value="edit" title="edit" className={classTrigger}>
            Edit
          </TabsTrigger>
        )}

        {(childrens?.preview || edit) && (
          <TabsTrigger disabled={!childrens?.preview && !text} value="preview" title="preview" className={classTrigger}>
            Preview
          </TabsTrigger>
        )}

        {childrens?.code && (
          <TabsTrigger value="code" title="code" className={classTrigger}>
            Code
          </TabsTrigger>
        )}
        {childrens?.tailwind && (
          <TabsTrigger value="tailwind" title="tailwind" className={classTrigger}>
            Tailwind
          </TabsTrigger>
        )}
        {childrens?.css && (
          <TabsTrigger value="css" title="css" className={classTrigger}>
            Css3
          </TabsTrigger>
        )}
        {childrens.usage && (
          <TabsTrigger value="usage" title="usage" className={classTrigger}>
            Usage
          </TabsTrigger>
        )}
      </TabsList>

      {edit && (
        <TabsContent value="edit">
          <CardContent {...rest}>
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
          </CardContent>
        </TabsContent>
      )}

      {(childrens?.preview || edit) && (
        <TabsContent value="preview">
          <Card className="min-h-[62px] bg-background-box">
            {childrens?.preview || (
              <div
                data-rehype-pretty-code-fragment=""
                className="textarea_class !border-0 !bg-transparent white-space-pre-line flex-col scrollbar markdown-body"
                dangerouslySetInnerHTML={{ __html: markdownText(text) }}
              />
            )}
          </Card>
        </TabsContent>
      )}

      {childrens?.code && (
        <TabsContent value="code">
          <CardContent {...rest}>
            {childrens?.code} {repo && <GetCodeToggle repo={repo} />}
          </CardContent>
        </TabsContent>
      )}

      {childrens?.tailwind && (
        <TabsContent value="tailwind">
          <CardContent {...rest}>{childrens?.tailwind}</CardContent>
        </TabsContent>
      )}

      {childrens?.css && (
        <TabsContent value="css">
          <CardContent {...rest}>{childrens?.css}</CardContent>
        </TabsContent>
      )}

      {childrens?.usage && (
        <TabsContent value="usage">
          <CardContent {...rest}>{childrens?.usage}</CardContent>
        </TabsContent>
      )}
    </>
  );
}

function CardContent({
  children,
  open,
  setOpen,
}: {
  children?: React.ReactNode;
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  return (
    <Card
      className={cnx(
        "min-h-max bg-background-box relative transition-all overflow-hidden",
        open
          ? "h-max [&_[data-rehype-pretty-code-fragment]]:overflow-auto [&_[data-rehype-pretty-code-fragment]]:max-h-[32rem] max-h-[32rem]"
          : "h-[20rem] max-h-[20rem] text-muted-foreground before:content-[''] before:absolute before:bottom-0 before:inset-x-0 before:size-full before:bg-gradient-to-t before:from-background/60 before:z-9",
      )}
    >
      {children}
      <Button
        variant="outline"
        className="absolute bottom-4 inset-x-[calc(50%-3rem)] z-[99] px-3 min-w-24 w-max transition-[bottom,color,opacity]"
        onClick={() => setOpen(!open)}
      >
        {open ? "Collapse" : "Expand"}
      </Button>
    </Card>
  );
}
