"use client";
import { Dialog, DialogContent, DialogTrigger, DialogOverlay } from "@/modules/components/web";
import { XIcon } from "@/modules/icons";

export function Demo() {
  return (
    <div>
      <Dialog>
        <DialogTrigger className="rounded-md bg-color text-background border border-background hover:bg-color/90 disabled:opacity-50 h-9 px-2.5">
          <span>Open Dialog</span>
        </DialogTrigger>

        <DialogOverlay />
        <DialogContent className="overflow-hidden flex flex-col gap-4 md:w-[426px] md:h-[316px]">
          <DialogTrigger className="size-4 absolute right-4 top-4 text-muted-foreground hover:text-color rounded-sm disabled:opacity-50">
            <XIcon size={16} />
          </DialogTrigger>

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
        </DialogContent>
      </Dialog>
    </div>
  );
}
