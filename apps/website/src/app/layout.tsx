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

import { Providers } from "@/contexts/Providers";
import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { Footer } from "./footer";
import "./globals.css";
import { NavigationHeader } from "./navigation-header";

export const metadata: Metadata = {
  title: "pump.dump",
  description: "And... its gone."
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
