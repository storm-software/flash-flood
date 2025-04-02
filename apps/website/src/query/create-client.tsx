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

import type { StormURL } from "@stryke/http/types";
import { getTRPCServerUrl, transformer } from "@stryke/trpc-next/shared";
import type { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import {
  createTRPCClient,
  httpBatchStreamLink,
  loggerLink
} from "@trpc/client";
import type { AnyTRPCRouter } from "@trpc/server";
import { createTRPCContext } from "@trpc/tanstack-react-query";
import { useState } from "react";

/**
 * Create a TRPC Tanstack Query client.
 *
 * @returns The TRPC Tanstack Query client
 */
export function createTRPCTanstackQueryClient<TRouter extends AnyTRPCRouter>(
  baseUrl: string | StormURL,
  queryClient: QueryClient
) {
  const { TRPCProvider, useTRPC } = createTRPCContext<TRouter>();

  return {
    useTRPCTanstackQuery: useTRPC,
    TRPCTanstackQueryProvider: (props: { children: React.ReactNode }) => {
      const { children } = props;

      const [trpcClient] = useState(() =>
        createTRPCClient<TRouter>({
          links: [
            loggerLink({
              enabled: op =>
                process.env.NEXT_PUBLIC_VERCEL_ENV === "development" ||
                (op.direction === "down" && op.result instanceof Error)
            }),
            httpBatchStreamLink<TRouter>({
              transformer,
              url: getTRPCServerUrl(baseUrl),
              headers: { "x-trpc-source": "react-query" }
            } as TRouter["_def"]["_config"]["$types"])
          ]
        })
      );

      return (
        <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </TRPCProvider>
      );
    }
  };
}
