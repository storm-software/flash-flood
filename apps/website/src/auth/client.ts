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

import { getBaseUrl } from "@/query/get-base-url";
import { adminClient, usernameClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { ac, adminRole, guestRole, managerRole, userRole } from "./permissions";

export const authClient = createAuthClient({
  baseURL: getBaseUrl(),
  basePath: "/api/v1/auth",
  plugins: [
    usernameClient(),
    adminClient({
      ac,
      roles: {
        admin: adminRole,
        manager: managerRole,
        user: userRole,
        guest: guestRole
      },
      defaultRole: "guest"
    })
  ]
});
