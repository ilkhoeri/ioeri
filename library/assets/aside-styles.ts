import { cvx } from "@/resource/docs/utility/cvx/cvx";

const Styles = cvx({
  variants: {
    style: {
      aside:
        "m-0 h-[--aside-h] max-h-[--aside-h] [--aside-h:100dvh] md:[--aside-h:calc(100dvh-2rem)] md:mt-[2rem] top-0 bottom-0 md:sticky md:top-[calc(var(--navbar)+2rem)] max-md:data-[state=closed]:opacity-0 overflow-hidden [transition:all_0.5s_ease] w-0 focus-visible:outline-0",
      hgroup: "bg-background flex flex-row items-center justify-between h-[--navbar] mb-4 md:hidden md:sr-only",
      nav: "bg-background relative flex items-start justify-start flex-col flex-nowrap max-md:pb-24 md:pb-20 max-md:pt-0 overflow-y-auto overflow-x-hidden webkit-scrollbar",
      overlay:
        "md:hidden md:sr-only fixed max-md:z-[95] w-full h-full min-w-full min-h-full inset-y-0 inset-x-0 backdrop-blur-[0.5px] bg-background/15 supports-[backdrop-filter]:bg-background/15",
      trigger:
        "font-medium focus-visible:ring-inset focus-visible:ring-offset-[-2px] text-muted-foreground data-[state*=open]:text-color max-md:active:text-color md:hover:text-color",
    },
    aside: {
      left: "[--aside-lx:calc(var(--aside)+2rem)] md:pr-6 md:pl-4 md:left-0 md:w-[--aside-lx] md:min-w-[--aside-lx] md:max-w-[--aside-lx] max-md:fixed max-md:z-[111] max-md:left-0 max-md:border-0 max-md:border-r-[0.04rem] max-md:border-r-muted/75 max-md:data-[state=open]:w-[--aside-lx] max-md:data-[state=open]:min-w-[--aside-lx] max-md:data-[state=open]:max-w-[--aside-lx] data-[state=open]:pl-6 data-[state=open]:pr-3 max-md:data-[state=closed]:pl-0 max-md:data-[state=closed]:pr-0",
      right:
        "[--aside-rx:calc(var(--aside)-1rem)] md:pl-8 md:pr-4 md:left-0 md:w-[--aside-rx] md:min-w-[--aside-rx] md:max-w-[--aside-rx] max-md:fixed max-md:z-[111] max-md:left-0 max-md:border-0 max-md:border-r-[0.04rem] max-md:border-r-muted/75 max-md:data-[state=open]:w-[--aside-rx] max-md:data-[state=open]:min-w-[--aside-rx] max-md:data-[state=open]:max-w-[--aside-rx] data-[state=open]:pr-6 data-[state=open]:pl-3 max-md:data-[state=closed]:pr-0 max-md:data-[state=closed]:pl-0 max-md:hidden max-md:sr-only",
    },
  },
});

export default Styles;
