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

import { HydrateClient, prefetch, trpc } from "@/query/server";
import { Button } from "@/ui/components/ui/button";
import { Plus, Wallet } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { TableErrorBoundary } from "../table-error-boundary";
import { TableSkeleton } from "../table-skeleton";
import { WalletGroupsTable } from "./table";

export const dynamic = "force-dynamic";

export default async function Page() {
  prefetch(
    trpc.walletGroup.findMany.queryOptions({
      where: { deletedAt: null },
      include: {
        wallets: {
          select: { id: true }
        },
        user: {
          select: { id: true, displayUsername: true }
        }
      }
    })
  );

  return (
    <>
      <div className="flex w-full flex-row justify-between gap-6">
        <div className="flex flex-col items-start gap-0.5">
          <div className="flex flex-row items-start justify-center gap-3">
            <Wallet className="h-10 w-10" />
            <h3 className="text-foreground text-3xl font-bold">
              Wallet Bundles
            </h3>
          </div>
          <p className="text-muted-foreground text-lg">
            The wallet bundles managed by the system.
          </p>
        </div>

        <div className="flex flex-row items-center gap-6 sm:items-start">
          <Button asChild variant="secondary">
            <Link
              href="/wallet-groups/create"
              className="flex items-center gap-2">
              Add Bundle <Plus />
            </Link>
          </Button>
        </div>
      </div>
      <HydrateClient>
        <TableErrorBoundary>
          <Suspense fallback={<TableSkeleton />}>
            <WalletGroupsTable />
          </Suspense>
        </TableErrorBoundary>
      </HydrateClient>
    </>
  );
}
