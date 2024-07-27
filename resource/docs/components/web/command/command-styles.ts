import { cvx, Variant, VariantsType } from "@/modules/utility";

const classes = cvx({
  variants: {
    selector: {
      overlay:
        "fixed data-[modal=false]:hidden inset-0 z-[100] bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-200 data-[state=closed]:fade-out-0",
      content:
        "fixed data-[modal=false]:relative data-[modal=false]:inset-auto data-[modal=false]:translate-y-0 data-[modal=false]:translate-x-0 data-[modal=false]:z-[unset] left-[50%] top-[50%] z-[111] w-80 h-80 translate-x-[-50%] translate-y-[-50%] border bg-background shadow-lg !duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-200 data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-90 data-[state=closed]:zoom-out-90 data-[state=open]:slide-in-from-left-1/2 data-[state=closed]:slide-out-to-left-1/2 data-[state=open]:slide-in-from-top-[50%] data-[state=closed]:slide-out-to-top-[50%] rounded-lg overflow-hidden p-0 md:w-[520px] md:h-[360px] flex flex-col",
      searchWrap: "flex items-center border-b px-3",
      search:
        "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
      empty: "flex items-center justify-center text-center font-medium text-muted-foreground pt-10 text-sm",
      actionsOrder: "flex-1 overflow-y-auto h-full webkit-scrollbar",
      actionSection:
        "data-[dimmed]:opacity-100 data-[dimmed]:text-muted-foreground data-[position=left]:mr-3 data-[position=right]:ml-3 [&>svg]:block",
      actionsList: "p-1 pb-10 h-max min-h-[inherit] [&_[data-selected=true]]:bg-muted/80",
      actionsGroup:
        "flex empty:hidden flex-col overflow-hidden text-muted-foreground mt-2 pb-2 first:mt-0 border-b last:border-b-0",
      actionGroupLabel: "flex flex-row items-center px-2 py-1.5 text-xs font-medium text-muted-foreground select-none",
      action:
        "relative flex flex-row items-center justify-start gap-2 p-1.5 w-full min-w-full max-w-full text-left select-none rounded-sm px-2 py-1.5 text-sm text-muted-foreground outline-none hover:bg-muted/80 hover:text-color aria-selected:bg-muted/80 aria-selected:text-color data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>[data-command=action-left-section]+[data-command=action-inner]_span]:pl-0",
      actionLabel: "flex flex-row items-center px-2 text-sm font-medium select-none [&_mark]:rounded-sm",
      actionDescription:
        "flex flex-col items-start justify-center text-xs px-2 text-muted-foreground select-none [&>:nth-child(2)]:block [&>:nth-child(2)]:text-xs [&>:nth-child(2)]:text-muted-foreground empty:hidden",
      footer: "border-t",
    },
  },
});
export default classes;

export type SelectorClassesName = (
  variant?: Variant<{ selector: Record<NonNullable<VariantsType<typeof classes>["selector"]>, string> }>,
) => string;
