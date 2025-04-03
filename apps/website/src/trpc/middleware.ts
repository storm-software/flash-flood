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
import type { MiddlewareFunction } from "@trpc/server/unstable-core-do-not-import";
import { TRPCError } from "@trpc/server/unstable-core-do-not-import";
import type { Context } from "./context";

export type AuthMiddlewareFunction<TContext extends Record<string, any>> =
  MiddlewareFunction<TContext, object, TContext, TContext, unknown>;

/**
 * Validates rules and generates middleware from defined rule tree.
 */
async function middleware({
  next,
  ctx,
  type,
  path,
  input
}: Parameters<AuthMiddlewareFunction<Context>>[0]) {
  const { session } = ctx;
  if (!session?.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to access this resource."
    });
  }

  if (!path || !path.includes(".")) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Invalid path."
    });
  }

  const resource = path.split(".")[0]!;
  const operation = path.split(".")[1]!;

  const hasPermission = await auth.api.userHasPermission({
    body: {
      userId: session.user.id,
      permission: {
        [resource]: [operation]
      }
    }
  });
  if (!hasPermission) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "You do not have permission to access this resource."
    });
  }

  const params = input as Record<string, any>;
  if (
    resource === "user" &&
    type === "mutation" &&
    params.userId === "admin" &&
    session.user.id !== "admin"
  ) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Only admin can update or delete admin user."
    });
  }

  return next();
}

export default middleware;
