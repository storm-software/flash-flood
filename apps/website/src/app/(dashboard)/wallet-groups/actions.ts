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

"use server";

import { auth } from "@/auth/server";
import { prisma } from "@/db/prisma";
import type { ServerActionResult } from "@/lib/types";
import { Keypair } from "@solana/web3.js";
import { Wallet } from "ethers";
import { headers } from "next/headers";
import { notFound, unauthorized } from "next/navigation";
import { Buffer } from "node:buffer";
import type {
  CreateWalletGroupSchema,
  UpdateWalletGroupSchema
} from "./schemas";
import { createWalletGroupSchema, updateWalletGroupSchema } from "./schemas";

export async function createWalletGroupAction(
  values: CreateWalletGroupSchema
): Promise<ServerActionResult<{ groupId: string }>> {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  if (!session?.user) {
    unauthorized();
  }

  const validatedFields = await createWalletGroupSchema.safeParseAsync(values);

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      success: false,
      error: "Invalid input data",
      errors: validatedFields.error.flatten().fieldErrors
    };
  }

  const walletGroup = await prisma.walletGroup.create({
    data: {
      id: crypto.randomUUID(),
      name: validatedFields.data.name,
      type: validatedFields.data.type,
      description: validatedFields.data.description,
      userId: session.user.id
    }
  });

  const groupId = walletGroup.id;
  if (validatedFields.data.type === "ethereum") {
    await Promise.all(
      Array.from({ length: validatedFields.data.numberOfWallets }).map(
        async () => {
          const wallet = Wallet.createRandom();
          if (!wallet) {
            throw new Error("Failed to create wallet");
          }

          return prisma.wallet.create({
            data: {
              id: crypto.randomUUID(),
              groupId,
              mnemonic: wallet.mnemonic?.phrase,
              address: wallet.address,
              publicKey: wallet.publicKey,
              privateKey: wallet.privateKey,
              userId: session.user.id
            }
          });
        }
      )
    );
  } else if (validatedFields.data.type === "solana") {
    await Promise.all(
      Array.from({ length: validatedFields.data.numberOfWallets }).map(
        async () => {
          const wallet = Keypair.generate();
          if (!wallet) {
            throw new Error("Failed to create wallet");
          }

          return prisma.wallet.create({
            data: {
              id: crypto.randomUUID(),
              groupId,
              publicKey: wallet.publicKey.toString(),
              privateKey: Buffer.from(wallet.secretKey).toString("hex"),
              userId: session.user.id
            }
          });
        }
      )
    );
  } else {
    return {
      success: false,
      error: "Invalid input data",
      errors: { type: ["Unsupported wallet type"] }
    };
  }

  return { success: true, data: { groupId } };
}

export async function updateWalletGroupAction(
  values: UpdateWalletGroupSchema
): Promise<ServerActionResult<{ groupId: string }>> {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  if (!session?.user) {
    unauthorized();
  }

  const validatedFields = await updateWalletGroupSchema.safeParseAsync(values);

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      success: false,
      error: "Invalid input data",
      errors: validatedFields.error.flatten().fieldErrors
    };
  }

  const originalWalletGroup = await prisma.walletGroup.findFirst({
    where: { id: validatedFields.data.id },
    include: {
      wallets: { select: { id: true } }
    }
  });
  if (!originalWalletGroup) {
    notFound();
  }

  if (originalWalletGroup.type !== validatedFields.data.type) {
    return {
      success: false,
      error: "Invalid input data",
      errors: { type: ["Cannot change wallet group type"] }
    };
  }

  if (
    originalWalletGroup.wallets.length > validatedFields.data.numberOfWallets
  ) {
    return {
      success: false,
      error: "Invalid input data",
      errors: { numberOfWallets: ["Cannot reduce the number of wallets"] }
    };
  }

  const walletGroup = await prisma.walletGroup.update({
    where: { id: validatedFields.data.id },
    data: {
      name: validatedFields.data.name,
      type: validatedFields.data.type,
      description: validatedFields.data.description,
      userId: session.user.id
    }
  });

  const groupId = walletGroup.id;
  if (validatedFields.data.type === "ethereum") {
    await Promise.all(
      Array.from({
        length:
          validatedFields.data.numberOfWallets -
          originalWalletGroup.wallets.length
      }).map(async () => {
        const wallet = Wallet.createRandom();
        if (!wallet) {
          throw new Error("Failed to create wallet");
        }

        return prisma.wallet.create({
          data: {
            id: crypto.randomUUID(),
            groupId,
            mnemonic: wallet.mnemonic?.phrase,
            address: wallet.address,
            publicKey: wallet.publicKey,
            privateKey: wallet.privateKey,
            userId: session.user.id
          }
        });
      })
    );
  } else if (validatedFields.data.type === "solana") {
    await Promise.all(
      Array.from({
        length:
          validatedFields.data.numberOfWallets -
          originalWalletGroup.wallets.length
      }).map(async () => {
        const wallet = Keypair.generate();
        if (!wallet) {
          throw new Error("Failed to create wallet");
        }

        return prisma.wallet.create({
          data: {
            id: crypto.randomUUID(),
            groupId,
            publicKey: wallet.publicKey.toString(),
            privateKey: Buffer.from(wallet.secretKey).toString("hex"),
            userId: session.user.id
          }
        });
      })
    );
  } else {
    return {
      success: false,
      error: "Invalid input data",
      errors: { type: ["Unsupported wallet type"] }
    };
  }

  return { success: true, data: { groupId } };
}
