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

import { queryOptions } from "@tanstack/react-query";
import { authClient } from "../auth/client";

export interface ClientSession {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  expiresAt: Date;
  token: string;
  ipAddress?: string | null | undefined | undefined;
  userAgent?: string | null | undefined | undefined;
  impersonatedBy?: string | null | undefined;
}

export interface ClientUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null | undefined | undefined;
  username?: string | null | undefined;
  displayUsername?: string | null | undefined;
  banned: boolean | null | undefined;
  role?: string | null | undefined;
  banReason?: string | null | undefined;
  banExpires?: Date | null | undefined;
}

export function getSessionOptions() {
  return queryOptions({
    queryKey: ["session"].filter(Boolean),
    queryFn: async () => {
      return authClient.getSession();
    }
  });
}

export function getUserOptions() {
  return queryOptions({
    ...getSessionOptions(),
    select: (data: {
      data: { user: ClientUser; session: ClientSession } | null;
    }) => {
      return data?.data?.user;
    }
  });
}
