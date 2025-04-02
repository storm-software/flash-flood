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

import { auth } from "@/auth/server";
import { prisma } from "@/db/prisma";
import { StormURLBuilder } from "@stryke/http";
import { headers } from "next/headers";
import { notFound, unauthorized } from "next/navigation";
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

  if (!url.paths || url.paths.length < 4) {
    return NextResponse.json(
      { error: "Wallet group ID is required" },
      { status: 400 }
    );
  }

  const data = await prisma.walletGroup.findFirst({
    where: { id: url.paths[3] },
    include: {
      wallets: {
        select: { id: true }
      },
      user: {
        select: { id: true, displayUsername: true }
      }
    }
  });
  if (!data) {
    return notFound();
  }

  return new NextResponse(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
}
