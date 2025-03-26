/* -------------------------------------------------------------------

                 ⚡ Storm Software - Pump Dot Dump

 This code was released as part of the Pump Dot Dump project. Pump Dot Dump
 is maintained by Storm Software under the Apache-2.0 License, and is
 free for commercial and private use. For more information, please visit
 our licensing page.

 Website:         https://stormsoftware.com
 Repository:      https://github.com/storm-software/pump-dot-dump
 Documentation:   https://stormsoftware.com/projects/pump-dot-dump/docs
 Contact:         https://stormsoftware.com/contact
 License:         https://stormsoftware.com/projects/pump-dot-dump/license

 ------------------------------------------------------------------- */

import { Button } from "@/ui/components/ui/button";
import { Plus, Wallet } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { TableSkeleton } from "../table-skeleton";
import { WalletGroupsTable } from "./table";

export default async function WalletGroupsPage() {
  // const session = await auth.api.getSession({
  //   headers: await headers()
  // });

  // const queryClient = getQueryClient();
  // void queryClient.prefetchQuery(walletsOptions);

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
      <Suspense fallback={<TableSkeleton />}>
        <WalletGroupsTable />
      </Suspense>
    </>
  );
}
