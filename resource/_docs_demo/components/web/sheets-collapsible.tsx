import React from "react";
import { Sheets, SheetsTrigger, SheetsContent } from "@/modules/components/web";
import { ChevronIcon } from "@/modules/icons";

export function Demo() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative rounded-md font-semibold group min-w-24 w-24 z-50 bg-color text-background hover:bg-color/90 h-9 px-2 text-center"
      >
        {isOpen ? "Close" : "Read"}
      </button>
      <Sheets variant="collapsible" open={isOpen} onOpenChange={setIsOpen} className="text-sm w-80 text-justify">
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat, eius adipisci voluptas nemo reprehenderit
          recusandae. Incidunt distinctio voluptates veniam quia soluta voluptate unde nisi autem dignissimos doloremque
          fuga, corrupti repellat pariatur molestiae illum. Enim iure doloribus culpa soluta mollitia, dolores labore
          cupiditate fugiat temporibus? Officia est laudantium consectetur ipsam doloribus.
        </p>
      </Sheets>

      <hr className="w-80" />

      <Sheets variant="collapsible" clickOutsideToClose className="space-y-2 w-80">
        <SheetsTrigger id="collapsible" className="w-full bg-background text-color justify-between font-mono text-sm">
          Select your &lt;Sheets /&gt;
          <span className="rounded-md p-1 border group-hover:bg-muted/90 transition-colors group-data-[state=open]:border-color">
            <ChevronIcon chevron="up-down" />
          </span>
        </SheetsTrigger>

        <a
          href="#sheets-collapsible"
          className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm mt-4 w-full justify-start"
        >
          @sheets/collapsible
        </a>

        <SheetsContent className="space-y-2">
          {["accordion", "dialog", "drawer", "dropdown"].map((i) => (
            <a
              key={i}
              href={`#sheets-${i}`}
              className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm w-full justify-start"
            >
              @sheets/{i}
            </a>
          ))}
        </SheetsContent>
      </Sheets>
    </div>
  );
}
