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

import { LoaderCircle } from "lucide-react";

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="animate-spin">
          <LoaderCircle className="h-24 w-24" />
        </div>
        <h3 className="text-foreground text-3xl font-bold">Loading...</h3>
      </div>
    </div>
  );
}
