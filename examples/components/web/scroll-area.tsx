"use client";

import { ScrollArea, FileIcon } from "@/modules/components/web";

export function Example() {
  return (
    <section className="relative h-80 w-64 rounded-md border bg-background">
      <ScrollArea
        overflow="y"
        classNames={{
          content: "max-h-full p-4",
          thumb: "hover:bg-muted-foreground peer-hover:bg-muted-foreground data-[scroll=active]:bg-color right-1",
        }}
      >
        <h1 className="mb-4 text-xs font-medium leading-none">Scrollbar area</h1>
        {[...Array(30)].map((_, index) => (
          <p key={index} className="text-sm pt-3 pb-1.5 border-b gap-2 flex items-center">
            <FileIcon /> Lorem ipsum...
          </p>
        ))}
      </ScrollArea>
    </section>
  );
}
