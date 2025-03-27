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

import { auth } from "@/auth/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { BlockchainFilter } from "./blockchain-filter";
import { NavigationTabs } from "./navigation-tabs";

export default async function Layout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="container mx-auto flex w-full flex-col items-center justify-center gap-1.5 pt-14 text-center">
        <div className="flex w-full flex-row justify-between gap-6 px-4 md:px-10">
          <div className="flex flex-col items-start gap-0.5">
            <h2 className="text-foreground text-4xl font-bold">
              Blockchain Dashboard
            </h2>
            <p className="text-muted-foreground text-lg">
              Manage your wallets, minted tokens, and transactions with ease.
            </p>
          </div>

          <BlockchainFilter />
        </div>

        <NavigationTabs>
          <div className="flex w-full flex-col">{children}</div>
        </NavigationTabs>
      </div>
    </main>
  );
}
