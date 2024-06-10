"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/assets/table/data-table-column-header";
import { Currency } from "@/components/ui/currency";
import { Image } from "@/components/ui/image";

import type { Events } from "@/types/connections";

import style from "@/styles/ioeri.module.css";

export const EventColumns: ColumnDef<Events>[] = [
  {
    accessorKey: "images",
    header: () => null,
    cell: ({ row }) => (
      <figure className={style.event_figure}>
        {row?.original?.images?.length ? (
          <Image
            alt=""
            srcLoad={row.original.title}
            src={row.original.images?.[0]?.url || ""}
            height={40}
            width={40}
            className={style.event_img}
          />
        ) : (
          <code>{row?.original?.title.slice(0, 2)}</code>
        )}
      </figure>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => <DataTableColumnHeader visibility={{ hide: false }} column={column} title="title" />,
  },
  {
    accessorKey: "price",
    header: ({ column }) => <DataTableColumnHeader visibility={{ hide: false }} column={column} title="price" />,
    cell: ({ row }) => <Currency value={row?.original?.price} />,
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => <DataTableColumnHeader visibility={{ hide: false }} column={column} title="quantity" />,
    cell: ({ row }) => <p className={style.event_quantity}>{row?.original?.quantity}</p>,
  },
  {
    accessorKey: "description",
    header: ({ column }) => <DataTableColumnHeader visibility={{ hide: false }} column={column} title="description" />,
  },
  {
    id: "actions",
    header: undefined,
    cell: ({ row }) => (
      <Link
        href={`/event/${row?.original?.slug}`}
        aria-label={row?.original?.title}
        rel="noopener noreferrer nofollow"
        className="w-full mx-auto"
      >
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
          height="16"
          width="16"
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </Link>
    ),
  },
];
