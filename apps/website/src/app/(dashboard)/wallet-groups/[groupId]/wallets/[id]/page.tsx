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
import { EthereumLogo } from "../../../../ethereum-logo";
import { SolanaLogo } from "../../../../solana-logo";

export default async function Page({
  params
}: {
  params: Promise<{ groupId: string; id: string }>;
}) {
  const { groupId, id } = await params;

  const walletGroup = await prisma.walletGroup.findFirst({
    where: { id: groupId },
    include: {
      wallets: {
        select: {
          id: true,
          description: true,
          address: true,
          publicKey: true,
          createdAt: true,
          updatedAt: true,
          userId: true,
          user: {
            select: { id: true, displayUsername: true }
          }
        },
        where: { id }
      }
    }
  });
  if (
    !walletGroup ||
    walletGroup.wallets.length === 0 ||
    !walletGroup.wallets[0]
  ) {
    notFound();
  }

  const publicKey = `${walletGroup.wallets[0]?.publicKey.slice(0, 10)}...${walletGroup.wallets[0]?.publicKey.slice(-8)}`;

  return (
    <div className="flex w-full flex-col gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/wallet-groups">Wallet Groups</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/wallet-groups/${walletGroup.id}`}>
              {walletGroup.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{publicKey}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex w-full flex-col gap-6 sm:flex-row sm:justify-between">
        <div className="flex flex-row items-center gap-2">
          {walletGroup.type === "ethereum" ? (
            <EthereumLogo className="size-12" />
          ) : (
            <SolanaLogo className="size-12" />
          )}
          <div className="gap-0.25 flex flex-col justify-start text-start">
            <h3 className="text-foreground text-3xl font-bold">{publicKey}</h3>
            <p className="text-muted-foreground">
              {walletGroup.wallets[0].createdAt.toISOString() ===
              walletGroup.wallets[0].updatedAt.toISOString()
                ? "Created by"
                : "Updated by"}{" "}
              {walletGroup.wallets[0].user.displayUsername} on{" "}
              {new Date(walletGroup.wallets[0].updatedAt).toLocaleDateString(
                "en-US",
                {
                  month: "numeric",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric"
                }
              )}
            </p>
          </div>
        </div>

        <div className="flex flex-row items-center gap-4 sm:items-start">
          <Button asChild variant="secondary">
            <Link
              href={`/wallet-groups/${walletGroup.id}/wallets/${walletGroup.wallets[0].id}/update`}
              className="flex items-center gap-2">
              Edit Wallet <Pencil />
            </Link>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                className="flex cursor-pointer items-center gap-2"
                variant="destructive">
                Delete Wallet <Trash2 />
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to delete the wallet?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  wallet.
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
    </div>
  );
}
