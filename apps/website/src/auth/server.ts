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

import { prisma } from "@/db/prisma";
import { getBaseUrl } from "@/query/get-base-url";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { admin, username } from "better-auth/plugins";
import { ac, adminRole, guestRole, managerRole, userRole } from "./permissions";

export const auth = betterAuth({
  appName: "flash-flood",
  baseURL: getBaseUrl(),
  basePath: "/api/v1/auth",
  secret: process.env.BETTER_AUTH_SECRET,
  cookieName: "auth",
  cookieOptions: {
    secure: process.env.NEXT_PUBLIC_VERCEL_ENV !== "development",
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
        if (username !== "admin" && username.endsWith("admin")) {
          return false;
        }

        return true;
      }
    }),
    admin({
      ac,
      roles: {
        admin: adminRole,
        manager: managerRole,
        user: userRole,
        guest: guestRole
      },
      adminUserIds: ["admin"],
      defaultRole: "guest"
    }),
    nextCookies()
  ],
  socialProviders: {
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string
    }
  }
});
