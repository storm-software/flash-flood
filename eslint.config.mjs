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

import { getStormConfig } from "@storm-software/eslint";

Error.stackTraceLimit = Number.POSITIVE_INFINITY;

/** @type {import('eslint').Linter.Config[]} */
export default getStormConfig({
  repositoryName: "flash-flood",
  next: {
    rootDir: "apps/website"
  },
  pnpm: {
    ignore: ["typescript", "react", "react-dom"]
  },
  react: {
    overrides: {
      "react-refresh/only-export-components": "off"
    }
  }
});
