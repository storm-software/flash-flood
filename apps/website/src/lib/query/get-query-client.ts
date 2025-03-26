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

/* eslint-disable camelcase */

import { broadcastQueryClient } from "@tanstack/query-broadcast-client-experimental";
import { experimental_createPersister } from "@tanstack/query-persist-client-core";
import {
  defaultShouldDehydrateQuery,
  isServer,
  QueryClient
} from "@tanstack/react-query";

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
              prefix: "pump-dot-dump",
              storage: window.localStorage,
              maxAge: 1000 * 60 * 60 * 24 * 24
              // serialize: persistedQuery => {
              //   return StormJSON.stringify(persistedQuery);
              // },
              // deserialize: cachedString => {
              //   // eslint-disable-next-line ts/no-unnecessary-type-assertion
              //   return StormJSON.parse(cachedString) as PersistedQuery;
              // }
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
        broadcastChannel: "pump-dot-dump"
      });
    }

    return browserQueryClient;
  }
}
