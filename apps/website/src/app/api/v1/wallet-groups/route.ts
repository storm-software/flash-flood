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
import { prisma } from "@/db/prisma";
import { StormURLBuilder } from "@stryke/http";
import { headers } from "next/headers";
import { unauthorized } from "next/navigation";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  if (!session?.user) {
    unauthorized();
  }

  const url = StormURLBuilder.create(request.url).build();

  let where = {};
  if (
    url.queryParams.type === "ethereum" ||
    url.queryParams.type === "solana"
  ) {
    where = { type: url.queryParams.type };
  }

  const data = await prisma.walletGroup.findMany({
    where,
    include: {
      wallets: {
        select: { id: true }
      },
      user: {
        select: { id: true, displayUsername: true }
      }
    }
  });

  return new NextResponse(JSON.stringify(data ?? []), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
}
