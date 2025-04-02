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
import type { PropsWithChildren } from "react";
import type { FallbackProps } from "react-error-boundary";
import { ErrorBoundary } from "react-error-boundary";

function TableErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="border-13 m-4 flex flex-col rounded-lg border-red-800 p-6 dark:border-red-500">
      <div className="flex items-center justify-center">
        <div className="max-w-2xl space-y-4 text-center">
          <div className="flex justify-center">
            <TriangleAlert className="size-42 p-1 text-red-800 dark:text-red-500" />
          </div>
          <h2 className="text-foreground pt-1 text-4xl font-bold tracking-tight">
            It looks like something went wrong
          </h2>
          <p className="text-muted-foreground pb-2 text-base">
            <b>Error: </b>
            {error.message || "Please try again later."}
          </p>

          <div className="flex flex-row justify-center gap-4">
            <Button onClick={resetErrorBoundary} className="w-full max-w-48">
              Try again
            </Button>
            <Button asChild className="w-full max-w-48" variant="secondary">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TableErrorBoundary({ children }: PropsWithChildren) {
  return (
    <ErrorBoundary fallbackRender={TableErrorFallback}>
      {children}
    </ErrorBoundary>
  );
}
