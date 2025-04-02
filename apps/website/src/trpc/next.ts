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
