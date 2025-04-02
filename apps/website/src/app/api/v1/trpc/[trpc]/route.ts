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

import { appRouter } from "@/trpc/__generated__/routers";
import { createContext } from "@/trpc/context";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

// Add back once NextAuth v5 is released
// export const runtime = 'edge';

const handler = async (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/v1/trpc",
    req,
    router: appRouter,
    createContext
  });

export { handler as GET, handler as POST };
