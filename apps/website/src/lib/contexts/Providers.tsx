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

import { Toaster } from "@/components/sonner";
import { QueryClientProvider } from "@/contexts/QueryClientProvider";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import type * as React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider>
      <ThemeProvider>
        {children}

        <Toaster className="dark:hidden" />
        <Toaster theme="dark" className="hidden dark:block" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
