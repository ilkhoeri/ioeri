"use client";

import React, { useEffect, useState } from "react";
import { cvx, VariantsType } from "@/modules/utility";
import { Command, command } from "@/modules/components/web";
import { EmptyBoxIcon, FileIcon, XIcon } from "@/modules/icons";
import { fuzzySearch, levenshteinDistance } from "@/modules/index";

import { type SingleRoute, type NestedRoute, type InnerRoutes, appRoutes } from "@/library/routes";

export type CommandDialogType = { routes: (SingleRoute | NestedRoute)[] | null };

export function useSearch<T>({ clearQuery }: { clearQuery: boolean | undefined }) {
  const [query, setQuery] = useState("");
  const [suggest, setSuggest] = useState<T[]>([]);

  useEffect(() => {
    if (!clearQuery) {
      setQuery("");
      setSuggest([]);
    }
  }, [clearQuery]);

  return { query, setQuery, suggest, setSuggest };
}

interface Suggestion {
  id: string;
  label: string;
  href: string;
  leftSection: JSX.Element;
}
interface FilterResult {
  group: string;
  actions: Suggestion[];
}

export function CommandDialog({ routes }: CommandDialogType) {
  const { query, setQuery, suggest, setSuggest } = useSearch<FilterResult>({
    clearQuery: true,
  });

  useEffect(() => {
    const results = filter({ routes }, query);
    setSuggest(results);
  }, [routes, query, setSuggest]);

  const Suggest = (
    <React.Fragment>
      <h4 {...cn({ as: "suggest" })}>Suggestions</h4>
      {suggest.map((group, index) => (
        <Command.ActionsGroup key={index} label={group.group}>
          {group.actions.map((i) => (
            <Command.Action key={i.label} href={i.href}>
              {i.leftSection} {i.label}
            </Command.Action>
          ))}
        </Command.ActionsGroup>
      ))}
    </React.Fragment>
  );

  const rightSection = (
    <button
      type="button"
      {...cn({ as: "close" })}
      onClick={() => {
        command.close();
        setQuery("");
      }}
    >
      <XIcon size={16} />
    </button>
  );

  const found = (x: React.JSX.Element) => (suggest.length > 0 ? x : <EmptyBoxIcon />);

  const rest = {
    query,
    onQueryChange: setQuery,
    nothingFound: found(Suggest),
    actions: [...suggestMain({ query }), ...suggest],
    classNames: {
      content: "h-2/3",
      empty: suggest.length > 0 ? "pt-0 [display:unset]" : undefined,
    },
  };

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
        searchProps={{
          rightSection,
          value: query,
          onChange: (e) => setQuery(e.target.value),
        }}
        {...rest}
      />
    </>
  );
}

function filterX({ routes }: CommandDialogType) {
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

function filter({ routes }: CommandDialogType, query: string) {
  if (!routes) return [];

  const filteredRoutes = routes.flatMap((route) => {
    const routeData = (route as NestedRoute).data?.[0]?.data ? (route as NestedRoute).data : [route as SingleRoute];

    return routeData.flatMap((singleRoute) => {
      const actions = singleRoute.data
        .filter((i) => fuzzySearch(i.title, query))
        .map((i) => ({
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

  if (filteredRoutes.some((route) => route.actions.length > 0)) {
    return filteredRoutes;
  }

  const levenshteinSuggestions = routes.flatMap((route) => {
    const routeData = (route as NestedRoute).data?.[0]?.data ? (route as NestedRoute).data : [route as SingleRoute];

    return routeData.flatMap((singleRoute) => {
      const actions = singleRoute.data
        .map((i) => ({ item: i, distance: levenshteinDistance(i.title, query) }))
        .filter(({ distance }) => distance <= 4)
        .sort((a, b) => a.distance - b.distance)
        .map(({ item }) => ({
          id: item.title,
          label: item.title,
          href: item.href,
          leftSection: <FileIcon arrow />,
        }));

      return {
        group: singleRoute.title,
        actions,
      };
    });
  });

  return levenshteinSuggestions.filter((route) => route.actions.length > 0);
}

function suggestMain({ query }: { query: string }) {
  if (query) return [];

  const routes = appRoutes["suggestions"];
  const actions = routes.data.map((i) => ({
    id: i.title,
    label: i.title,
    href: i.href,
    leftSection: <i.icon />,
  }));
  return [
    {
      group: routes.title,
      actions,
    },
  ];
}

type X = {
  group: string;
  actions: {
    id: string;
    label: string;
    description: string;
  }[];
}[];
type ExampleData = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
function content({ data }: { data: ExampleData[] | null }) {
  if (!data) return [];
  const groupedData = data.reduce(
    (acc, item) => {
      const group = item.userId.toString();
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push({
        id: item.id.toString(),
        label: item.title,
        description: item.body,
      });
      return acc;
    },
    {} as Record<string, { id: string; label: string; description: string }[]>,
  );

  return Object.entries(groupedData).map(([group, actions]) => ({
    group,
    actions,
  }));
}

export function CommandDialogOld({ routes }: CommandDialogType) {
  const { query, setQuery } = useSearch({ clearQuery: true });

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

        <Command.Search value={query} onChange={(e) => setQuery(e.target.value)} />

        <Command.ActionsList data-group-items="" role="group" classNames={{ actionBody: "h-[calc(100%-41px)]" }}>
          {/* {suggestions({ query })} */}
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

const classes = cvx({
  variants: {
    as: {
      trigger:
        "inline-flex items-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-muted/60 text-muted-foreground hover:text-color px-4 py-2 relative h-8 w-full justify-start rounded-[0.5rem] text-sm font-normal shadow-none sm:pr-12 md:w-40 lg:w-64",
      kbd: "pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex [&_span]:text-xs",
      close: "size-4 absolute right-3 top-3 text-muted-foreground hover:text-color rounded-sm disabled:opacity-50",
      suggest:
        "text-center px-2 py-1.5 text-sm text-color font-medium select-none border-b flex items-center justify-center load_ after:top-6",
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
