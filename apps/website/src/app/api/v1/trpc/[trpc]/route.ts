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
