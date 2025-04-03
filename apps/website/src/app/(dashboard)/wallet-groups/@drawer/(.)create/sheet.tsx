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
