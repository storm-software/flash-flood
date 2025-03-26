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

import type { BlockchainType } from "@/lib/types";
import { StormURLBuilder } from "@stryke/http";
import { queryOptions } from "@tanstack/react-query";
import { getBaseUrl } from "./get-base-url";

export type GetWalletGroupsReturnType = {
  user: {
    id: string;
    displayUsername: string;
  };
  wallets: {
    id: string;
  }[];
} & {
  type: BlockchainType;
  id: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  name: string;
  userId: string;
};

export function getWalletGroupsOptions(type?: BlockchainType) {
  return queryOptions({
    queryKey: ["wallet-groups", type].filter(Boolean),
    queryFn: async () => {
      const builder = StormURLBuilder.create(getBaseUrl()).withPath(
        "api/v1/wallet-groups"
      );
      if (type) {
        builder.addQueryParam({
          "type": type
        });
      }

      const response = await fetch(builder.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      return response.json();
    }
  });
}

export function getWalletGroupsTableOptions(type?: BlockchainType) {
  return queryOptions({
    ...getWalletGroupsOptions(type),
    select: (data: GetWalletGroupsReturnType[]) => {
      return !Array.isArray(data)
        ? data
        : data.map(walletGroup => ({
            ...walletGroup,
            displayUserName: walletGroup.user.displayUsername,
            numberOfWallets: walletGroup.wallets.length
          }));
    }
  });
}

export type GetWalletsReturnType = {
  user: {
    displayUsername: string;
    id: string;
  };
} & {
  groupId: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  description: string | null;
  userId: string;
  mnemonic: string | null;
  address: string | null;
  publicKey: string;
  privateKey: string;
  deletedAt: Date | null;
};

export function getWalletsOptions(groupId: string, type?: BlockchainType) {
  return queryOptions({
    queryKey: ["wallet-groups", groupId, "wallets", type].filter(Boolean),
    queryFn: async () => {
      const builder = StormURLBuilder.create(getBaseUrl()).withPath(
        `api/v1/wallet-groups/${groupId}/wallets`
      );
      if (type) {
        builder.addQueryParam({
          "type": type
        });
      }

      const response = await fetch(builder.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      return response.json();
    }
  });
}

export function getWalletsTableOptions(groupId: string, type?: BlockchainType) {
  return queryOptions({
    ...getWalletsOptions(groupId, type),
    select: (data: GetWalletsReturnType[]) => {
      return !Array.isArray(data)
        ? data
        : data.map(wallet => ({
            ...wallet,
            displayUserName: wallet.user.displayUsername
          }));
    }
  });
}
