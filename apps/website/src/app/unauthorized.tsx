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

"use client";

import { Button } from "@/ui/components/ui/button";
import { TriangleAlert } from "lucide-react";
import Link from "next/link";

export default function Forbidden() {
  return (
    <div className="flex min-h-[75dvh] items-center justify-center">
      <div className="max-w-md space-y-8 p-4 text-center">
        <div className="flex justify-center">
          <TriangleAlert className="text-destructive-foreground size-32" />
        </div>
        <h2 className="text-foreground text-4xl font-bold tracking-tight">
          Unauthorized Access
        </h2>
        <p className="text-muted-foreground text-base">
          Please log in to access this resource.
        </p>

        <div className="flex flex-row justify-center gap-4">
          <Button asChild className="w-full max-w-48">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild className="w-full max-w-48" variant="secondary">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
