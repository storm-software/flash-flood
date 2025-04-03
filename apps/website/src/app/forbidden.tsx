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

"use client";

import { Button } from "@/ui/components/ui/button";
import { TriangleAlert } from "lucide-react";
import Link from "next/link";

export default function Forbidden() {
  return (
    <div className="flex min-h-[75dvh] items-center justify-center">
      <div className="max-w-md space-y-8 p-4 text-center">
        <div className="flex justify-center">
          <TriangleAlert className="size-50 text-red-800 dark:text-red-500" />
        </div>
        <h2 className="text-foreground text-4xl font-bold tracking-tight">
          This resource is forbidden
        </h2>
        <p className="text-muted-foreground text-base">
          You are not authorized to access this resource.
        </p>

        <Button asChild className="w-full max-w-48">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
