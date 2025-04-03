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

import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import React from "react";
import { Footer } from "./footer";
import "./globals.css";
import { NavigationHeader } from "./navigation-header";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Flash Flood",
  description:
    "Experimental web application for bulk blockchain data processing."
};

export const viewport: Viewport = {
  maximumScale: 1
};

const manrope = Manrope({ subsets: ["latin"] });

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`bg-zinc-50 text-black dark:bg-zinc-900 dark:text-white ${manrope.className}`}>
      <body className="min-h-[100dvh] bg-zinc-50 dark:bg-zinc-900">
        <Providers>
          <NavigationHeader />
          <div className="min-h-[75dvh]">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
