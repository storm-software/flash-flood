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

import { Separator } from "@/ui/components/ui/separator";
import { CircleIcon } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function Footer() {
  return (
    <footer className="bg-background w-full px-4">
      <div className="max-w-container mx-auto">
        <div className="bg-background text-foreground pb-4 pt-12">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            <div className="flex flex-col gap-4">
              <Link href="/" className="flex items-center gap-2">
                <CircleIcon className="text-white-500 h-6 w-6" />
                <h3 className="text-white-500 leading-0 pb-1 text-xl font-bold">
                  pump.dump
                </h3>
              </Link>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-md pt-1 font-semibold">Posts</h3>
              <Link
                href="https://stormsoftware.com/blog"
                className="text-muted-foreground text-sm hover:underline">
                Blog
              </Link>
              <Link
                href="https://medium.com/storm-software"
                className="text-muted-foreground text-sm hover:underline">
                Medium
              </Link>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-md pt-1 font-semibold">Company</h3>
              <Link
                href="https://stormsoftware.com"
                className="text-muted-foreground text-sm hover:underline">
                Website
              </Link>
              <Link
                href="https://stormsoftware.com/about"
                className="text-muted-foreground text-sm hover:underline">
                About
              </Link>
              <Link
                href="https://github.com/storm-software"
                className="text-muted-foreground text-sm hover:underline">
                Github
              </Link>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-md pt-1 font-semibold">Contact</h3>
              <Link
                href="https://stormsoftware.com/contact"
                className="text-muted-foreground text-sm hover:underline">
                Contact Us
              </Link>
              <Link
                href="https://discord.gg/MQ6YVzakM5"
                className="text-muted-foreground text-sm hover:underline">
                Discord
              </Link>
              <Link
                href="https://t.me/storm_software"
                className="text-muted-foreground text-sm hover:underline">
                Telegram
              </Link>
              <Link
                href="https://discord.gg/MQ6YVzakM5"
                className="text-muted-foreground text-sm hover:underline">
                Discord
              </Link>
            </div>
          </div>
          <div className="border-border dark:border-border/15 text-muted-foreground mt-8 flex flex-col items-center justify-between gap-4 border-t pt-4 text-xs sm:flex-row">
            <div className="flex h-5 items-center space-x-2 text-sm">
              <p>© 2025 pump.dump</p>
              <Separator orientation="vertical" />
              <p>All rights reserved</p>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://stormsoftware.com/privacy"
                className="text-muted-foreground text-sm hover:underline">
                Privacy Policy
              </a>
              <a
                href="https://stormsoftware.com/terms"
                className="text-muted-foreground text-sm hover:underline">
                Terms of Service
              </a>

              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
