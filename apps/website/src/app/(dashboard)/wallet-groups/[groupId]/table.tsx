/* -------------------------------------------------------------------

                ⚡ Storm Software - Flash Flood

 This code was released as part of the Flash Flood project. Flash Flood
 is maintained by Storm Software under the Apache-2.0 License, and is
 free for commercial and private use. For more information, please visit
 our licensing page.

 Website:         https://stormsoftware.com
 Repository:      https://github.com/storm-software/flash-flood
 Documentation:   https://stormsoftware.com/projects/flash-flood/docs
 Contact:         https://stormsoftware.com/contact
 License:         https://stormsoftware.com/projects/flash-flood/license

 ------------------------------------------------------------------- */

"use client";

import type { BlockchainType } from "@/lib/types";
import { useTRPCTanstackQuery } from "@/query/client";
import type { Wallet } from "@/trpc/__generated__/schemas/models/wallet.schema";
import { Button } from "@/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/ui/components/ui/dropdown-menu";
import { Input } from "@/ui/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/ui/components/ui/table";
import { titleCase } from "@stryke/string-format/title-case";
import { isSetString } from "@stryke/type-checks/is-set-string";
import { useSuspenseQuery } from "@tanstack/react-query";
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState
} from "@tanstack/react-table";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import { ArrowDown10, ChevronDown, Download } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export interface WalletTableRow extends Wallet {
  displayUserName: string;
}

const columnHelper = createColumnHelper<WalletTableRow>();

export const columns = [
  columnHelper.accessor("id", {
    header: "Identifier",
    enableSorting: true,
    enableHiding: true
  }),
  columnHelper.accessor("groupId", {
    header: "Bundle Identifier",
    enableSorting: true,
    enableHiding: true
  }),
  columnHelper.accessor("publicKey", {
    header: "Public Key",
    enableSorting: true,
    enableHiding: true,
    cell: ({ row }) => (
      <Button asChild variant="link" className="underline hover:no-underline">
        <Link
          href={`/wallet-groups/${String(row.getValue("groupId"))}/wallets/${String(row.getValue("id"))}`}
          prefetch>
          {row.getValue("publicKey")}
        </Link>
      </Button>
    )
  }),
  columnHelper.accessor("address", {
    header: "Wallet Address",
    enableSorting: true,
    enableHiding: true
  }),
  columnHelper.accessor("description", {
    header: "Description",
    enableSorting: true,
    enableHiding: true
  }),
  columnHelper.accessor("displayUserName", {
    header: "Updated By",
    enableSorting: true,
    enableHiding: true
  }),
  columnHelper.accessor(
    row =>
      new Date(row.createdAt).toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
      }),
    {
      header: "Creation Date",
      sortDescFirst: true,
      enableSorting: true,
      enableHiding: true
    }
  ),
  columnHelper.accessor(
    row =>
      new Date(row.updatedAt).toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
      }),
    {
      id: "updatedAt",
      header: () => {
        return (
          <span className="flex flex-row items-center gap-2">
            Update Date
            <ArrowDown10 />
          </span>
        );
      },
      sortDescFirst: true,
      enableSorting: true,
      enableHiding: true
    }
  )
] as ColumnDef<WalletTableRow>[];

export function WalletsTable({
  groupId,
  type
}: {
  groupId: string;
  type?: BlockchainType;
}) {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "updatedAt", desc: true }
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    id: false,
    groupId: false,
    address: type === "ethereum"
  });
  const [rowSelection, setRowSelection] = useState({});

  const trpc = useTRPCTanstackQuery();
  const { data } = useSuspenseQuery<WalletTableRow[]>(
    trpc.wallet.findMany.queryOptions(
      {
        where: { groupId },
        select: {
          id: true,
          groupId: true,
          description: true,
          address: true,
          publicKey: true,
          createdAt: true,
          updatedAt: true,
          userId: true,
          user: {
            select: { id: true, displayUsername: true }
          }
        }
      },
      {
        select: (data: any) => {
          return !Array.isArray(data?.json)
            ? data
            : data.json.map((wallet: any) => ({
                ...wallet,
                displayUserName: wallet.user.displayUsername
              }));
        }
      }
    )
  );

  const table = useReactTable({
    data: data ?? [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  });

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 py-4">
        <Input
          placeholder="Filter public keys..."
          value={
            (table.getColumn("publicKey")?.getFilterValue() as string) ?? ""
          }
          onChange={event =>
            table.getColumn("publicKey")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <div className="ml-auto flex flex-row items-center gap-4">
          <a
            href={`/api/v1/wallet-groups/${groupId}/export`}
            download={`wallet-bundle_${groupId}.json`}>
            <Button variant="outline" onClick={() => {}}>
              Download <Download />
            </Button>
          </a>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter(column => column.getCanHide())
                .map(column => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      checked={column.getIsVisible()}
                      onCheckedChange={value =>
                        column.toggleVisibility(!!value)
                      }>
                      {isSetString(column.columnDef.header)
                        ? column.columnDef.header
                        : titleCase(column.id)}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-start align-middle">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel()?.rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell
                      key={cell.id}
                      className="text-start align-middle">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center">
                  No wallets found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
