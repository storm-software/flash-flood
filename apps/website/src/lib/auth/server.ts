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

import { prisma } from "@/db/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { admin, username } from "better-auth/plugins";

export const auth = betterAuth({
  appName: "pump-dot-dump",
  baseURL: process.env.BASE_URL || "http://localhost:3000",
  basePath: "/api/v1/auth",
  secret: process.env.BETTER_AUTH_SECRET,
  cookieName: "auth",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7 // 1 week
  },
  emailAndPassword: {
    enabled: true
  },
  usernameAndPassword: {
    enabled: true
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  plugins: [
    username({
      minUsernameLength: 5,
      maxUsernameLength: 50,
      usernameValidator: (username: string) => {
        // if (username === "admin" || username.endsWith("admin")) {
        //   return false;
        // }

        return true;
      }
    }),
    admin({
      adminUserIds: ["admin"]
    }),
    nextCookies()
  ]
});
