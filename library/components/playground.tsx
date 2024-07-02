"use client";

import { useState } from "react";

import { TabsContent, TabsList, TabsTrigger } from "@/library/components/tabs";
import { Button } from "@/library/components/button";
import { cvx } from "@/modules/utility";

enum MarkdownValue {
  Edit = "edit",
  Preview = "preview",
  Code = "code",
  Tailwind = "tailwind",
  Css = "css",
  Usage = "usage",
}
type RecordNested<U extends string, T extends string, P = Record<string, unknown>> = {
  [K in U]?: Partial<Record<T, P>>;
};
type PlaygroundType = RecordNested<"childrens", MarkdownValue, React.ReactNode> & {
  defaultState?: MarkdownValue;
};

const classes = cvx({
  variants: {
    card: {
      default: "relative rounded-lg border shadow-sm min-h-[62px] bg-background-code-body",
      resize: "relative rounded-lg border shadow-sm min-h-max bg-background-code-body transition-all overflow-hidden",
    },
    statecard: {
      open: "h-max max-h-[32rem] [&_[data-rehype-pretty-code-fragment]]:overflow-auto [&_[data-rehype-pretty-code-fragment]]:max-h-[calc(32rem-3rem)]",
      closed:
        "h-[20rem] max-h-[20rem] text-muted-foreground before:content-[''] before:absolute before:bottom-0 before:inset-x-0 before:size-full before:bg-gradient-to-t before:from-background/60 before:z-4",
    },
    button: {
      resizer:
        "absolute bottom-4 inset-x-[calc(50%-3rem)] z-[99] px-3 min-w-24 w-max transition-[bottom,color,opacity]",
      tabs: "h-9 font-semibold rounded-none data-[state=active]:[box-shadow:0_2px_0_0_hsl(var(--color))] [&_svg]:sizer [--sz:20px] select-none",
    },
  },
});

function Resizer({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  return (
    <Button variant="outline" className={classes({ button: "resizer" })} onClick={() => setOpen(!open)}>
      {open ? "Collapse" : "Expand"}
    </Button>
  );
}

export function Playground(_Play: PlaygroundType) {
  const { childrens } = _Play;
  const [open, setOpen] = useState<boolean>(false);

  if (!childrens) {
    return null;
  }

  const tabs = Object.values(MarkdownValue);
  const omitTab = (key: MarkdownValue) => key === "edit" || key === "preview";

  return (
    <>
      <TabsList className="w-full flex justify-start bg-background border-b rounded-none p-0 pb-px">
        {tabs.map(
          (key) =>
            childrens[key] && (
              <TabsTrigger key={key} value={key} title={key} className={classes({ button: "tabs" })}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </TabsTrigger>
            ),
        )}
      </TabsList>

      {tabs.map(
        (key) =>
          childrens[key] && (
            <TabsContent
              key={key}
              value={key}
              className={classes({
                card: "default",
                ...(!omitTab(key) ? { statecard: open ? "open" : "closed", card: "resize" } : {}),
              })}
            >
              {childrens[key]}
              {!omitTab(key) && <Resizer open={open} setOpen={setOpen} />}
            </TabsContent>
          ),
      )}
    </>
  );
}
