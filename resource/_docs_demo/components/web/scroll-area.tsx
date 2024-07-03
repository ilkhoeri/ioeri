"use client";
import { ScrollArea, FileIcon } from "@/modules/components/web";
import { SetProps, SetPropsRadio, useSetProps } from "../../__set_props";

export function Demo() {
  const { str: overflow, ...rest } = useSetProps({ Str: "y" });
  return (
    <div>
      <section className="relative rounded-md border bg-background">
        <ScrollArea
          overflow={overflow as "x" | "y"}
          classNames={{
            content:
              "max-h-full gap-4 p-4 flex data-[overflow=y]:flex-col data-[overflow=x]:flex-row data-[overflow=y]:h-80 data-[overflow=y]:w-64 data-[overflow=y]:overflow-y-auto data-[overflow=x]:h-max data-[overflow=x]:w-80 data-[overflow=x]:overflow-x-auto",
            thumb:
              "hover:bg-muted-foreground peer-hover:bg-muted-foreground data-[scroll=active]:bg-color data-[overflow=x]:bottom-1 data-[overflow=y]:right-1",
          }}
        >
          <h1 className="mb-4 text-xs font-medium leading-none">Scrollbar area</h1>
          {[...Array(30)].map((_, index) => (
            <p key={index} className="text-sm pt-3 pb-1.5 border-b gap-2 flex items-center min-w-max">
              <FileIcon /> Lorem ipsum...
            </p>
          ))}
        </ScrollArea>
      </section>
      {/* prettier-ignore */}
      <SetProps.Wrapper><SetPropsRadio str={overflow} label="overflow" values={["x", "y"]} {...rest} /></SetProps.Wrapper>
    </div>
  );
}
