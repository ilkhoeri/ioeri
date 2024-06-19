export function AsideRight() {
  return (
    <aside className="m-0 h-dvh max-h-dvh bg-background overflow-hidden [transition:all_0.5s_ease] w-0 focus-visible:outline-0 top-0 bottom-0 md:sticky md:top-[calc(var(--navbar)*1)] md:pl-6 md:pr-4 md:left-0 [--aside-rx:calc(var(--aside)-1rem)] md:w-[--aside-rx] md:min-w-[--aside-rx] md:max-w-[--aside-rx] max-md:fixed max-md:z-[111] max-md:left-0 max-md:border-0 max-md:border-r-[0.04rem] max-md:border-r-muted/75 max-md:data-[state=open]:w-[--aside-rx] max-md:data-[state=open]:min-w-[--aside-rx] max-md:data-[state=open]:max-w-[--aside-rx] data-[state=open]:pr-6 data-[state=open]:pl-3 max-md:data-[state=closed]:pr-0 max-md:data-[state=closed]:pl-0 max-md:data-[state=closed]:opacity-0">
      <nav className="relative flex items-start justify-start flex-col flex-nowrap size-full pr-0 px-4 pt-8 pb-24 max-md:pt-0 max-md:pr-0.5 overflow-y-auto overflow-x-hidden webkit-scrollbar"></nav>
    </aside>
  );
}
