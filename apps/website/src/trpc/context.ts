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

import { auth } from "@/auth/server";
import { prisma } from "@/db/prisma";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { headers } from "next/headers";

export async function createContext(opts?: FetchCreateContextFnOptions) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  return {
    session: session!,
    prisma,
    headers: opts && Object.fromEntries(opts.req.headers)
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
