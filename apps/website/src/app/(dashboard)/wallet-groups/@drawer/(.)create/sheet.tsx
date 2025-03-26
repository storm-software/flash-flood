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

"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/ui/components/ui/sheet";
import { useRouter } from "next/navigation";

export default function WalletGroupSheet({
  children
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <Sheet open onOpenChange={() => router.back()}>
      <SheetContent className="w-[750px]">
        <SheetHeader>
          <SheetTitle>Create Wallet Bundle</SheetTitle>
          <SheetDescription>
            Create a new wallet bundle to manage your assets.
          </SheetDescription>
        </SheetHeader>

        <div className="p-5">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
