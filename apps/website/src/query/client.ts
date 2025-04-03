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

/* eslint-disable camelcase */

import type { AppRouter } from "@/trpc/__generated__/routers";
import { joinPaths } from "@stryke/path/join-paths";
import { transformer } from "@stryke/trpc-next/shared";
import { broadcastQueryClient } from "@tanstack/query-broadcast-client-experimental";
import type { PersistedQuery } from "@tanstack/query-persist-client-core";
import { experimental_createPersister } from "@tanstack/query-persist-client-core";
import {
  defaultShouldDehydrateQuery,
  isServer,
  QueryClient
} from "@tanstack/react-query";
import type React from "react";
import { createTRPCTanstackQueryClient } from "./create-client";
import { getBaseUrl } from "./get-base-url";

let browserQueryClient: QueryClient | undefined;

export function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000
        },
        dehydrate: {
          shouldDehydrateQuery: query =>
            defaultShouldDehydrateQuery(query) ||
            query.state.status === "pending"
        }
      }
    });
  } else {
    if (!browserQueryClient) {
      browserQueryClient = new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            gcTime: 1000 * 60 * 2,
            refetchOnReconnect: true,
            refetchOnWindowFocus: true,
            persister: experimental_createPersister({
              prefix: "flash-flood",
              storage: window.localStorage,
              maxAge: 1000 * 60 * 60 * 24 * 24,
              serialize: persistedQuery => {
                return transformer.serialize(persistedQuery);
              },
              deserialize: cachedString => {
                return transformer.deserialize(cachedString) as PersistedQuery;
              }
            })
          },
          dehydrate: {
            shouldDehydrateQuery: query =>
              defaultShouldDehydrateQuery(query) ||
              query.state.status === "pending"
          }
        }
      });

      broadcastQueryClient({
        queryClient: browserQueryClient,
        broadcastChannel: "flash-flood"
      });
    }

    return browserQueryClient;
  }
}

const result = createTRPCTanstackQueryClient<AppRouter>(
  joinPaths(getBaseUrl(), "api/v1/trpc"),
  getQueryClient()
);

export const TRPCTanstackQueryProvider: (props: {
  children: React.ReactNode;
}) => React.JSX.Element = result.TRPCTanstackQueryProvider;
export const useTRPCTanstackQuery = result.useTRPCTanstackQuery;
