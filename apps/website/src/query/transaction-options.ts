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

import type { BlockchainType } from "@/lib/types";
import { StormURLBuilder } from "@stryke/http";
import { queryOptions } from "@tanstack/react-query";
import { getBaseUrl } from "./get-base-url";

export type GetTransactionsReturnType = {
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

export function getTransactionsOptions(type?: BlockchainType) {
  return queryOptions({
    queryKey: ["transactions", type].filter(Boolean),
    queryFn: async () => {
      const builder = StormURLBuilder.create(getBaseUrl()).withPath(
        "api/v1/transactions"
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

export function getTransactionsTableOptions(type?: BlockchainType) {
  return queryOptions({
    ...getTransactionsOptions(type),
    select: (data: GetTransactionsReturnType[]) => {
      return !Array.isArray(data)
        ? data
        : data.map(transaction => ({
            ...transaction,
            displayUserName: transaction.user.displayUsername,
            numberOfWallets: transaction.wallets.length
          }));
    }
  });
}
