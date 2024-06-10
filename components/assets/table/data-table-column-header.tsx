import { Column } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { twMerge } from "tailwind-merge";

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
  visibility?: {
    hide?: boolean;
  };
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
  visibility,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={twMerge(className)}>{title}</div>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={twMerge("flex items-center space-x-2", className)}>
        <Button
          variant="ghost"
          size="sm"
          className="-ml-1 h-8 w-full justify-start hover:bg-muted/30 hover:text-color data-[state=open]:bg-muted/30 focus-visible:ring-offset-0 focus-visible:ring-0"
        >
          <span className="capitalize">{title}</span>
          {column.getIsSorted() === "desc" ? (
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              height="16"
              width="16"
              className="ml-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m3 16 4 4 4-4" />
              <path d="M7 4v16" />
              <path d="M15 4h5l-5 6h5" />
              <path d="M15 20v-3.5a2.5 2.5 0 0 1 5 0V20" />
              <path d="M20 18h-5" />
            </svg>
          ) : column.getIsSorted() === "asc" ? (
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              height="16"
              width="16"
              className="ml-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m3 8 4-4 4 4" />
              <path d="M7 4v16" />
              <path d="M20 8h-5" />
              <path d="M15 10V6.5a2.5 2.5 0 0 1 5 0V10" />
              <path d="M15 14h5l-5 6h5" />
            </svg>
          ) : (
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              height="1em"
              width="1em"
              className="ml-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m7 15 5 5 5-5" />
              <path d="m7 9 5-5 5 5" />
            </svg>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="16"
            width="16"
            className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m3 8 4-4 4 4" />
            <path d="M7 4v16" />
            <path d="M20 8h-5" />
            <path d="M15 10V6.5a2.5 2.5 0 0 1 5 0V10" />
            <path d="M15 14h5l-5 6h5" />
          </svg>
          Asc
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="16"
            width="16"
            className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m3 16 4 4 4-4" />
            <path d="M7 4v16" />
            <path d="M15 4h5l-5 6h5" />
            <path d="M15 20v-3.5a2.5 2.5 0 0 1 5 0V20" />
            <path d="M20 18h-5" />
          </svg>
          Desc
        </DropdownMenuItem>

        {!visibility?.hide === false && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                height="16"
                width="16"
                className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                <line x1="2" x2="22" y1="2" y2="22" />
              </svg>
              Hide
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => column.clearSorting()}>
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="16"
            width="16"
            className="mr-2 h-4 w-4 text-muted-foreground/70"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M21 6H3" />
            <path d="M7 12H3" />
            <path d="M7 18H3" />
            <path d="M12 18a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L11 14" />
            <path d="M11 10v4h4" />
          </svg>
          Reset
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
