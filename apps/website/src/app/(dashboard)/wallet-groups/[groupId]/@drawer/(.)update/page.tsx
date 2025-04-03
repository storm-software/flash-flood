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
import { notFound } from "next/navigation";
import { updateWalletGroupAction } from "../../../actions";
import { UpdateWalletGroupForm } from "../../update-form";
import UpdateWalletGroupSheet from "./sheet";

export default async function Page({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const walletGroup = await prisma.walletGroup.findFirst({
    where: { id },
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

  const defaultValues = {
    ...walletGroup,
    numberOfWallets: walletGroup.wallets.length
  };

  return (
    <UpdateWalletGroupSheet name={walletGroup.name} type={walletGroup.type}>
      <UpdateWalletGroupForm
        submitAction={updateWalletGroupAction}
        defaultValues={defaultValues}
      />
    </UpdateWalletGroupSheet>
  );
}
