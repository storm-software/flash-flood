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

    const existingAdmin = await prisma.user.findUnique({
      where: {
        username: "admin"
      }
    });
    if (existingAdmin) {
      // eslint-disable-next-line no-console
      console.log("Admin user already exists, skipping creation.");
    } else {
      if (!process.env.ADMIN_PASSWORD) {
        throw new Error(
          "ADMIN_PASSWORD is not set in the environment variables"
        );
      }

      const result = await authClient.admin.createUser({
        email: "admin@stormsoftware.com",
        name: "admin",
        password: process.env.ADMIN_PASSWORD,
        role: "admin",
        data: {
          username: "admin",
          displayUsername: "System Admin"
        }
      });
      if (result.error) {
        throw new Error(
          `Error creating Admin user: \n${JSON.stringify(result.error.message)}`
        );
      }

      // eslint-disable-next-line no-console
      console.log("🎉 Admin user created successfully!");
    }

    const existingManager = await prisma.user.findUnique({
      where: {
        username: "manager"
      }
    });
    if (existingManager) {
      // eslint-disable-next-line no-console
      console.log("Manager user already exists, skipping creation.");
    } else {
      if (!process.env.MANAGER_PASSWORD) {
        throw new Error(
          "MANAGER_PASSWORD is not set in the environment variables"
        );
      }

      const result = await authClient.admin.createUser({
        email: "development@stormsoftware.com",
        name: "manager",
        password: process.env.MANAGER_PASSWORD,
        role: "manager",
        data: {
          username: "manager",
          displayUsername: "System Manager"
        }
      });
      if (result.error) {
        throw new Error(
          `Error creating Manager user: \n${JSON.stringify(result.error.message)}`
        );
      }

      // eslint-disable-next-line no-console
      console.log("🎉 Manager user created successfully!");
    }

    const existingGuest = await prisma.user.findUnique({
      where: {
        username: "guest"
      }
    });
    if (existingGuest) {
      // eslint-disable-next-line no-console
      console.log("Guest user already exists, skipping creation.");
    } else {
      if (!process.env.GUEST_PASSWORD) {
        throw new Error(
          "GUEST_PASSWORD is not set in the environment variables"
        );
      }

      const result = await authClient.admin.createUser({
        email: "test@email.com",
        name: "guest",
        password: process.env.GUEST_PASSWORD,
        role: "guest",
        data: {
          username: "guest",
          displayUsername: "Guest"
        }
      });
      if (result.error) {
        throw new Error(
          `Error creating Guest user: \n${JSON.stringify(result.error.message)}`
        );
      }

      // eslint-disable-next-line no-console
      console.log("🎉 Guest user created successfully!");
    }
  }

  await main();
} catch (e) {
  // eslint-disable-next-line no-console
  console.error("Error seeding database: ", e);
} finally {
  await prisma.$disconnect();
}
