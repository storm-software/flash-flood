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

import { protectedProcedure } from "@/trpc/__generated__/trpc";
import { experimental_nextAppDirCaller } from "@trpc/server/adapters/next-app-dir";
import { createContext } from "./context";

export const nextProc = protectedProcedure.experimental_caller(
  experimental_nextAppDirCaller({
    normalizeFormData: true,
    createContext
  })
);

export {
  experimental_notFound as notFound,
  experimental_redirect as redirect
} from "@trpc/server/adapters/next-app-dir";
