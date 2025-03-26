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

import { Button } from "@/ui/components/ui/button";
import { CircleIcon } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[75dvh] items-center justify-center">
      <div className="max-w-md space-y-8 p-4 text-center">
        <div className="flex justify-center">
          <CircleIcon className="text-foreground size-16" />
        </div>
        <h2 className="text-foreground text-4xl font-bold tracking-tight">
          Page not found
        </h2>
        <p className="text-muted-foreground text-base">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        <Button asChild className="w-full max-w-48">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
