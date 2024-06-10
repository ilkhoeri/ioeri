"use client";

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Table } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { twMerge } from "tailwind-merge";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
  className?: string;
}

export function DataTableViewOptions<TData>({ table, className }: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={twMerge(
            "ml-8 md:ml-auto md:px-2 md:min-w-[80px] w-max [--sz:36px] focus-visible:outline-0 focus-visible:ring-0",
            className,
          )}
        >
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="md:mr-2 h-5 w-5"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 7h-9" />
            <path d="M14 17H5" />
            <circle cx="17" cy="17" r="3" />
            <circle cx="7" cy="7" r="3" />
          </svg>
          <p className="hidden scale-0 md:block md:scale-100">View</p>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-[162px] focus-visible:border focus-visible:ring-0"
      >
        <DropdownMenuLabel className="bg-muted/40 rounded text-center">Visibility</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide())
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize cursor-pointer"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            );
          })}

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => table.resetColumnVisibility()}>
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="16"
            width="16"
            className="mr-2 h-4 w-4"
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
