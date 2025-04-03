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

import { Tabs, TabsList, TabsTrigger } from "@/ui/components/ui/tabs";
import { ArrowLeftRight, Coins, Wallet } from "lucide-react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export function NavigationTabs({ children }: { children: React.ReactNode }) {
  const segment = useSelectedLayoutSegment();

  return (
    <Tabs
      defaultValue="wallet-groups"
      value={!segment ? "wallet-groups" : segment}
      className="w-full px-4 py-6">
      <TabsList className="mx-auto grid grid-cols-3">
        <TabsTrigger
          value="wallet-groups"
          className="data-[state=active]:bg-zinc-50 dark:data-[state=active]:bg-zinc-900">
          <Link href="/wallet-groups" className="flex items-center gap-2">
            <Wallet /> Wallets
          </Link>
        </TabsTrigger>
        <TabsTrigger value="tokens">
          <Link href="/tokens" className="flex items-center gap-2">
            <Coins /> Tokens
          </Link>
        </TabsTrigger>
        <TabsTrigger value="transactions">
          <Link href="/transactions" className="flex items-center gap-2">
            <ArrowLeftRight /> Transactions
          </Link>
        </TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
}
