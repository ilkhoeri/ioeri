"use client";

import { useEffect, useState } from "react";
import { Command, command } from "@/modules/components/web";
import { FileIcon, SearchIcon, XIcon } from "@/modules/icons";
import { cvx, VariantsType } from "@/modules/utility";

import { type SingleRoute, type NestedRoute, type InnerRoutes, appRoutes } from "@/library/routes";
import { sanitizedToParams } from "@/modules/index";
import { commandActions } from "@/modules/components/web/command/command-store";

export type CommandDialogType = { routes: (SingleRoute | NestedRoute)[] | null };

export function useSearch<T>({ clearQuery }: { clearQuery: boolean | undefined }) {
  const [query, setQuery] = useState("");
  const [value, setValue] = useState("");
  const [suggest, setSuggest] = useState<T[]>([]);

  useEffect(() => {
    if (!clearQuery) {
      setValue("");
      setQuery("");
      setSuggest([]);
    }
  }, [clearQuery]);

  return { query, setQuery, value, setValue, suggest, setSuggest };
}

const actions = [
  {
    group: "Pages",
    actions: [
      { id: "home", label: "Home page", description: "Where we present the product" },
      { id: "careers", label: "Careers page", description: "Where we list open positions" },
      { id: "about-us", label: "About us page", description: "Where we tell what we do" },
    ],
  },

  {
    group: "Apps",
    actions: [
      { id: "svg-compressor", label: "SVG compressor", description: "Compress SVG images" },
      { id: "base64", label: "Base 64 converter", description: "Convert data to base 64 format" },
      { id: "fake-data", label: "Fake data generator", description: "Lorem ipsum generator" },
    ],
  },
];

export function CommandDialog({ routes }: CommandDialogType) {
  const { query, setQuery, value, setValue } = useSearch({ clearQuery: true });

  return (
    <>
      <button type="button" {...cn({ as: "trigger" })} onClick={command.open}>
        <span className="hidden lg:inline-flex">Search documentation...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd {...cn({ as: "kbd" })}>
          <span>⌘</span>K
        </kbd>
      </button>

      <Command
        actions={filter({ routes })}
        searchProps={{
          rightSection: (
            <button type="button" {...cn({ as: "close" })} onClick={command.close}>
              <XIcon size={16} />
            </button>
          ),
        }}
      />
    </>
  );
}
type actionsxxx = {
  group: string;
  actions: {
    id: string;
    label: string;
    description: string;
  }[];
}[];

function filter({ routes }: CommandDialogType) {
  if (!routes) return [];

  const filteredRoutes = routes.flatMap((route) => {
    const routeData = (route as NestedRoute).data?.[0]?.data ? (route as NestedRoute).data : [route as SingleRoute];
    return routeData.flatMap((singleRoute) => {
      const actions = singleRoute.data.map((i) => ({
        id: i.title,
        label: i.title,
        href: i.href,
        leftSection: <FileIcon />,
      }));
      return {
        group: singleRoute.title,
        actions,
      };
    });
  });

  return filteredRoutes;
}

export function CommandDialogOld({ routes }: CommandDialogType) {
  const { query, setQuery, value, setValue } = useSearch({ clearQuery: true });

  return (
    <>
      <button type="button" {...cn({ as: "trigger" })} onClick={command.open}>
        <span className="hidden lg:inline-flex">Search documentation...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd {...cn({ as: "kbd" })}>
          <span>⌘</span>K
        </kbd>
      </button>

      <Command.Content {...cn({ as: "command" })} query={query} onQueryChange={setQuery}>
        <button type="button" {...cn({ as: "close" })} onClick={command.close}>
          <XIcon size={16} />
        </button>

        <Command.Search value={value} onChange={(e) => setValue(e.target.value)} />

        <Command.ActionsList data-group-items="" role="group" classNames={{ actionBody: "h-[calc(100%-41px)]" }}>
          {suggestions({ query })}
          {filtering({ routes, query })}
        </Command.ActionsList>
      </Command.Content>
    </>
  );
}

function filtering({ routes, query }: { query: string } & CommandDialogType) {
  if (!routes || !query) return null;

  const filteredRoutes = routes.flatMap((route, index) => {
    const isRouteMatch = route.title.toLowerCase().includes(query.toLowerCase().trim());
    const routeData = (route as NestedRoute).data?.[0]?.data ? (route as NestedRoute).data : [route as SingleRoute];

    return routeData.flatMap((singleRoute, singleIndex) => {
      const filteredItems = singleRoute.data.filter((i) => i.title.toLowerCase().includes(query.toLowerCase().trim()));

      if (isRouteMatch || filteredItems.length > 0) {
        return (
          <Command.ActionsGroup key={`${index}-${singleIndex}`} label={singleRoute.title}>
            {(isRouteMatch ? singleRoute.data : filteredItems).map((i) => (
              <Command.Action key={i.title} href={i.href}>
                <FileIcon className="mr-2 size-4" />
                {i.title}
              </Command.Action>
            ))}
          </Command.ActionsGroup>
        );
      }

      return null;
    });
  });

  return filteredRoutes;
}

function suggestions({ query }: { query: string }) {
  if (query) return null;

  /**
  return (
    <Command.ActionsGroup label="Suggestions">
      {routes.map((route, index) => {
        if ((route as NestedRoute).data[0].data) {
          const i = route as NestedRoute;
          return <Links key={i.title} {...i} />;
        } else {
          const i = route as SingleRoute;
          return <Links key={index} {...i} />;
        }
      })}
    </Command.ActionsGroup>
  );
  */

  const routes = appRoutes["suggestions"];
  return (
    <Command.ActionsGroup label={routes.title} classNames={{ actionGroupLabel: "border-b mb-2" }}>
      {routes.data.map((i, index) => (
        <Command.Action key={index} href={i.href}>
          <i.icon size={18} />
          {i.title}
        </Command.Action>
      ))}
    </Command.ActionsGroup>
  );
}

const classes = cvx({
  variants: {
    as: {
      trigger:
        "inline-flex items-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-muted/60 text-muted-foreground hover:text-color px-4 py-2 relative h-8 w-full justify-start rounded-[0.5rem] text-sm font-normal shadow-none sm:pr-12 md:w-40 lg:w-64",
      kbd: "pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex [&_span]:text-xs",
      close: "size-4 absolute right-3 top-3 text-muted-foreground hover:text-color rounded-sm disabled:opacity-50",
      content: "overflow-hidden p-0 md:w-[520px] md:h-[360px]",
      command: "[&_[data-command=search-wrap]]:pr-10",
    },
  },
});

function cn({ as }: VariantsType<typeof classes>) {
  return {
    className: classes({ as }),
  };
}
