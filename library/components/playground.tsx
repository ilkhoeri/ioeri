"use client";
import { useState } from "react";
import { nextValue } from "../utils";
import { cvx } from "@/modules/utility";
import { capitalizeWords } from "@/modules/index";
import { Button } from "@/library/components/button";
import { TabsContent, TabsList, TabsTrigger } from "@/library/components/tabs";

enum MarkdownValue {
  Edit = "edit",
  Preview = "preview",
  Code = "code",
  Tailwind = "tailwind",
  Css = "css",
  Usage = "usage",
}
enum Expands {
  "expand" = "expand",
  "expand-full" = "expand-full",
  "collapse" = "collapse",
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
      expand:
        "h-[20rem] max-h-[20rem] text-muted-foreground before:content-[''] before:absolute before:bottom-0 before:inset-x-0 before:size-full before:bg-gradient-to-t before:from-background/60 before:z-4",
      "expand-full":
        "h-max max-h-[32rem] [&_[data-rehype-pretty-code-fragment]]:overflow-auto [&_[data-rehype-pretty-code-fragment]]:max-h-[calc(32rem-3rem)]",
      collapse:
        "h-max max-h-max [&_[data-rehype-pretty-code-fragment]]:pb-[2.5rem] [&_[data-rehype-pretty-code-fragment]]:overflow-auto [&_[data-rehype-pretty-code-fragment]]:max-h-max",
    },
    button: {
      resizer:
        "absolute bottom-4 inset-x-[calc(50%-3rem)] z-9 px-3 min-w-26 w-max transition-[bottom,color,opacity]",
      tabs: "h-9 font-semibold rounded-none data-[state=active]:[box-shadow:0_2px_0_0_hsl(var(--color))] [&_svg]:sizer [--sz:20px] select-none",
    },
  },
});

const EXPAND_VALUES: `${Expands}`[] = Object.values(Expands);

function Resizer({ expand, setExpand }: { expand: `${Expands}`; setExpand: (v: `${Expands}`) => void }) {
  return (
    <Button
      variant="outline"
      className={classes({ button: "resizer" })}
      onClick={() => setExpand(nextValue(expand, EXPAND_VALUES))}
    >
      {capitalizeWords(expand)}
    </Button>
  );
}

export function Playground(_Play: PlaygroundType) {
  const { childrens } = _Play;
  const [expand, setExpand] = useState<`${Expands}`>("expand");

  const tabs = Object.values(MarkdownValue);
  const omitTab = (key: MarkdownValue) => key === "edit" || key === "preview";

  if (!childrens) return null;

  return (
    <>
      <TabsList id={undefined} className="w-full flex justify-start bg-background border-b rounded-none p-0 pb-px">
        {tabs.map(
          (key) =>
            childrens[key] && (
              <TabsTrigger id={undefined} key={key} value={key} title={key} className={classes({ button: "tabs" })}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </TabsTrigger>
            ),
        )}
      </TabsList>

      {tabs.map(
        (key) =>
          childrens[key] && (
            <TabsContent
              id={undefined}
              key={key}
              value={key}
              className={classes({
                card: "default",
                ...(!omitTab(key) ? { statecard: expand, card: "resize" } : {}),
              })}
            >
              {childrens[key]}
              {!omitTab(key) && <Resizer expand={expand} setExpand={setExpand} />}
            </TabsContent>
          ),
      )}
    </>
  );
}
