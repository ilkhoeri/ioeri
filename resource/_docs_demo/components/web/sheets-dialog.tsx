import React from "react";
import { Sheets, SheetsClosed, SheetsContent, SheetsTrigger } from "@/modules/components/web";

export function Demo() {
  return (
    <Sheets variant="dialog">
      <SheetsTrigger>
        <span
          data-labelopen="Open"
          data-labelclosed="Close"
          className="group-data-[state=closed]:before:content-[attr(data-labelopen)] group-data-[state=open]:before:content-[attr(data-labelclosed)]"
        />
      </SheetsTrigger>

      <SheetsContent className="overflow-hidden flex flex-col gap-4 md:w-[426px] md:h-[316px]">
        <div className="flex flex-col space-y-1.5 text-start">
          <h2 className="text-lg font-semibold leading-none tracking-tight">Lorem ipsum</h2>
          <p className="text-sm text-muted-foreground">
            Tenetur fugiat aspernatur aut quas ex praesentium molestias officiis. repudiandae.
          </p>
        </div>
        <div className="size-full text-sm flex flex-col overflow-y-auto">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur fugiat aspernatur aut quas ex praesentium
          molestias officiis fugit accusamus expedita alias repudiandae, exercitationem maiores velit quos reiciendis
          recusandae, quod iusto earum? Fugiat fuga dolor atque nobis esse dignissimos temporibus vel incidunt maxime
          provident ut dolorem hic explicabo corrupti, praesentium a.
        </div>

        <SheetsClosed />
      </SheetsContent>
    </Sheets>
  );
}
