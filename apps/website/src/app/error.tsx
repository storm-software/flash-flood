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
import { useEffect } from "react";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[75dvh] items-center justify-center">
      <div className="max-w-2xl space-y-8 p-4 text-center">
        <div className="flex justify-center">
          <TriangleAlert className="size-50 text-red-800 dark:text-red-500" />
        </div>
        <h2 className="text-foreground text-4xl font-bold tracking-tight">
          It looks like something went wrong
        </h2>
        <p className="text-muted-foreground text-base">
          <b>Error: </b>
          {error.message || "Please try again later."}
        </p>

        <div className="flex flex-row justify-center gap-4">
          <Button onClick={reset} className="w-full max-w-48">
            Try again
          </Button>
          <Button asChild className="w-full max-w-48" variant="secondary">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
