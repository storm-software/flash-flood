#!/usr/bin/env zx
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

import { $, chalk, echo } from "zx";

// usePwsh();

try {
  await echo`\n${chalk.whiteBright("💣  Nuking the monorepo...")}\n\n`;

  //   let proc = $`pnpm nx clear-cache`.timeout(`${5 * 60}s`);
  //   proc.stdout.on("data", data => {
  //     echo`${data}`;
  //   });
  //   let result = await proc;
  //   if (!result.ok) {
  //     throw new Error(
  //       `An error occured while clearing Nx cache: \n\n${result.message}\n`
  //     );
  //   }

  let proc =
    $`pnpm exec rimraf --no-interactive -- ./.nx/cache ./.nx/workspace-data ./dist ./tmp ./pnpm-lock.yaml`.timeout(
      `${5 * 60}s`
    );
  proc.stdout.on("data", data => {
    echo`${data}`;
  });
  let result = await proc;
  if (!result.ok) {
    throw new Error(
      `An error occured while removing cache directories: \n\n${result.message}\n`
    );
  }

  proc =
    $`pnpm exec rimraf --no-interactive --glob "apps/**/{node_modules,dist,.storm,.next}"`.timeout(
      `${5 * 60}s`
    );
  proc.stdout.on("data", data => {
    echo`${data}`;
  });
  result = await proc;
  if (!result.ok) {
    throw new Error(
      `An error occured while removing node modules and build directories from the monorepo's projects: \n\n${result.message}\n`
    );
  }

  proc =
    $`pnpm exec rimraf --no-interactive --glob "./node_modules/**"`.timeout(
      `${5 * 60}s`
    );
  proc.stdout.on("data", data => {
    echo`${data}`;
  });
  result = await proc;
  if (!result.ok) {
    throw new Error(
      `An error occured while removing node modules from the workspace root: \n\n${result.message}\n`
    );
  }

  echo`${chalk.green("Successfully nuked the cache, node modules, and build folders")}`;
} catch (error) {
  echo`${chalk.red(error?.message ? error.message : "A failure occured while nuking the monorepo")}`;

  process.exit(1);
}
