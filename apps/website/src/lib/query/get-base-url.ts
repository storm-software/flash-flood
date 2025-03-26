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

export function getBaseUrl(): string {
  if (process.env.BASE_URL || process.env.NEXT_URL || process.env.VERCEL_URL) {
    return (process.env.BASE_URL ||
      process.env.NEXT_URL ||
      process.env.VERCEL_URL)!;
  }

  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  // Fallback for server-side rendering
  return "http://localhost:3000";
}
