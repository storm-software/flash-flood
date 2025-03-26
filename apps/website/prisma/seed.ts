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

import { authClient } from "@/auth/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

try {
  /**
   * This function will seed the database with some data
   */
  async function main() {
    // eslint-disable-next-line no-console
    console.log("Seeding database...");

    if (!process.env.ADMIN_PASSWORD) {
      throw new Error("ADMIN_PASSWORD is not set in the environment variables");
    }

    const result = await authClient.signUp.email({
      email: "admin@stormsoftware.com",
      name: "admin",
      displayUsername: "System Admin",
      username: "admin",
      password: process.env.ADMIN_PASSWORD
    });
    if (result.error) {
      throw new Error(
        `Error creating admin user: \n${JSON.stringify(result.error.message)}`
      );
    }

    // eslint-disable-next-line no-console
    console.log("🎉 Admin user created successfully!");
  }

  await main();
} catch (e) {
  // eslint-disable-next-line no-console
  console.error("Error seeding database: ", e);
} finally {
  await prisma.$disconnect();
}
