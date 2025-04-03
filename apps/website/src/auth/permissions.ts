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

import type { ArrayValues } from "@stryke/types";
import { createAccessControl } from "better-auth/plugins/access";
import {
  adminAc,
  defaultStatements,
  userAc
} from "better-auth/plugins/admin/access";
import { createDefu } from "defu";
import { statements as prismaStatements } from "./__generated__/statements";

const merge = createDefu((obj, key, value) => {
  if (Array.isArray(obj[key]) && Array.isArray(value)) {
    const arr = obj[key];
    obj[key] = [...new Set([...arr, ...value])] as ArrayValues<typeof arr>;
  }

  return true;
});

export const statements = merge(prismaStatements, defaultStatements);
export const ac = createAccessControl(statements);

export const guestRole = ac.newRole({
  ...userAc.statements,
  walletGroup: ["aggregate", "findFirst", "findMany", "findUnique", "groupBy"],
  wallet: ["aggregate", "findFirst", "findMany", "findUnique", "groupBy"],
  token: ["aggregate", "findFirst", "findMany", "findUnique", "groupBy"],
  transaction: ["aggregate", "findFirst", "findMany", "findUnique", "groupBy"],
  user: ["set-password"]
});

export const userRole = ac.newRole(
  merge(
    {
      walletGroup: ["create", "createMany", "update", "updateMany", "upsert"],
      wallet: ["create", "createMany", "update", "updateMany", "upsert"],
      token: ["create", "createMany", "update", "updateMany", "upsert"],
      transaction: ["createMany", "create"]
    },
    guestRole.statements
  )
);

export const managerRole = ac.newRole(
  merge(
    {
      walletGroup: ["softDelete", "softDeleteMany"],
      wallet: ["softDelete", "softDeleteMany"],
      token: ["softDelete", "softDeleteMany"],
      transaction: [
        "update",
        "updateMany",
        "upsert",
        "softDelete",
        "softDeleteMany"
      ],
      user: ["create", "list", "ban", "set-role", "set-password"]
    },
    userRole.statements
  )
);

export const adminRole = ac.newRole(
  merge(
    {
      walletGroup: ["delete", "deleteMany"],
      token: ["delete", "deleteMany"],
      transaction: ["delete", "deleteMany"],
      user: ["impersonate", "delete"],
      session: ["list", "revoke", "delete"]
    },
    adminAc.statements,
    managerRole.statements
  )
);
