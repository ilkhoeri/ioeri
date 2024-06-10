"use client";

import * as React from "react";

import { flexRender } from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataTableViewOptions } from "@/components/assets/table/data-table-view-options";
import { DataTablePagination } from "@/components/assets/table/data-table-pagination";
import { DataTableProps, TableConfig } from "@/components/assets/table/table-config";
import { Input } from "@/components/ui/input";


import style from "@/styles/ioeri.module.css";

export type SearchKey = { searchKey: string };

export function TableEvent<TData, TValue>({
  columns,
  data,
  searchKey,
}: DataTableProps<TData, TValue> & SearchKey) {
  const table = TableConfig({ data, columns });
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!data) {
    return null;
  }

  return (
    <div data-state="open" className={style.event_root}>
      <div className={style.event_wrapper_top}>
        <Input
          placeholder="Search"
          name="search"
          autoComplete="off"
          value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn(searchKey)?.setFilterValue(event.target.value)}
          className={style.event_filtered}
        />
        <DataTableViewOptions table={table} />
      </div>

      <div className={style.event_wrapper_bottom}>
        <Table unstyled className={style.event_table}>
          <TableHeader unstyled className={style.event_thead}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} unstyled className={style.event_tr}>
                {headerGroup.headers.map((header) => {
                  const headerContent = header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext());

                  return headerContent !== null ? (
                    <TableHead key={header.id} unstyled className={style.event_th}>
                      {headerContent}
                    </TableHead>
                  ) : null;
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody unstyled className={style.event_body}>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  unstyled
                  className={style.event_tr}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} unstyled className={style.event_td}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} unstyled className={style.event_noresult}>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination table={table} />
    </div>
  );
}
