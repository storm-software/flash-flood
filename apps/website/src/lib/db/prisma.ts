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

import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const _prisma = new PrismaClient().$extends(withAccelerate());

// eslint-disable-next-line no-restricted-globals
const globalForPrisma = global as unknown as { prisma: typeof _prisma };

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = _prisma;
}

export const prisma = _prisma;
