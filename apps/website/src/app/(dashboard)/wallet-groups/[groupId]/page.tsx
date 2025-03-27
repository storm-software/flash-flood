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

import { prisma } from "@/db/prisma";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/ui/components/ui/alert-dialog";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/ui/components/ui/breadcrumb";
import { Button } from "@/ui/components/ui/button";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { EthereumLogo } from "../../ethereum-logo";
import { SolanaLogo } from "../../solana-logo";
import { TableSkeleton } from "../../table-skeleton";
import { WalletsTable } from "./table";

export default async function Page({
  params
}: {
  params: Promise<{ groupId: string }>;
}) {
  const { groupId } = await params;

  const walletGroup = await prisma.walletGroup.findFirst({
    where: { id: groupId },
    include: {
      wallets: { select: { id: true } },
      user: {
        select: { id: true, displayUsername: true }
      }
    }
  });
  if (!walletGroup) {
    notFound();
  }

  return (
    <>
      <div className="flex w-full flex-row justify-between gap-6">
        <div className="flex w-full flex-col gap-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/wallet-groups">
                  Wallet Groups
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{walletGroup.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex flex-row items-center gap-2">
            {walletGroup.type === "ethereum" ? (
              <EthereumLogo className="size-12" />
            ) : (
              <SolanaLogo className="size-12" />
            )}
            <div className="gap-0.25 flex flex-col justify-start text-start">
              <h3 className="text-foreground text-3xl font-bold">
                Wallet Bundle - {walletGroup.name}
              </h3>
              <p className="text-muted-foreground">
                {walletGroup.createdAt.toISOString() ===
                walletGroup.updatedAt.toISOString()
                  ? "Created by"
                  : "Updated by"}{" "}
                {walletGroup.user.displayUsername} on{" "}
                {new Date(walletGroup.updatedAt).toLocaleDateString("en-US", {
                  month: "numeric",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric"
                })}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center gap-4 sm:items-start">
          <Button asChild variant="secondary">
            <Link
              href={`/wallet-groups/${groupId}/update`}
              className="flex items-center gap-2">
              Edit Bundle <Pencil />
            </Link>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                className="flex cursor-pointer items-center gap-2"
                variant="destructive">
                Delete Bundle <Trash2 />
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to delete the wallet bundle?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  wallet bundle and all of the underlying wallets.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button variant="destructive">Delete</Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <WalletsTable groupId={groupId} type={walletGroup.type} />
      </Suspense>
    </>
  );
}
