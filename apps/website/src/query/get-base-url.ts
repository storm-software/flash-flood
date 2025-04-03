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

export function getBaseUrl(): string {
  if (
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.NEXT_PUBLIC_VERCEL_URL ||
    process.env.NEXT_PUBLIC_BASE_URL
  ) {
    return formatUrl(
      (process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ||
        process.env.NEXT_PUBLIC_VERCEL_URL ||
        process.env.NEXT_PUBLIC_BASE_URL)!
    );
  }

  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  // Fallback for server-side rendering
  return "http://localhost:3000";
}

export function formatUrl(url: string): string {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return `https://${url}`;
  }

  return url;
}
