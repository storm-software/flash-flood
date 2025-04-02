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
import { TRPCTanstackQueryProvider } from "@/query/client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Providers component wraps the application with necessary providers.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TRPCTanstackQueryProvider>
      <NextThemesProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange>
        {children}

        <Toaster className="dark:hidden" />
        <Toaster theme="dark" className="hidden dark:block" />
      </NextThemesProvider>
      {process.env.NEXT_PUBLIC_VERCEL_ENV === "development" && (
        <ReactQueryDevtools />
      )}
    </TRPCTanstackQueryProvider>
  );
}
