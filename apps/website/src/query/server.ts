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

import type { AppRouter } from "@/trpc/__generated__/routers";
import { appRouter } from "@/trpc/__generated__/routers";
import { createContext } from "@/trpc/context";
import { createTRPCTanstackQueryServer } from "@stryke/trpc-next/tanstack-query/server";
import type { inferRouterContext } from "@trpc/server";
import type {
  TRPCOptionsProxy,
  TRPCQueryOptions
} from "@trpc/tanstack-react-query";
import { headers } from "next/headers";

const result = createTRPCTanstackQueryServer<
  AppRouter,
  inferRouterContext<AppRouter>
>(headers, appRouter, createContext);

export const trpc: TRPCOptionsProxy<AppRouter> = result.trpc;
export const HydrateClient = result.HydrateClient;
export const prefetch: <T extends ReturnType<TRPCQueryOptions<any>>>(
  queryOptions: T
) => void = result.prefetch;
