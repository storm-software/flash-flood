#!/usr/bin/env zx
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

import { $, argv, chalk, echo } from "zx";

// usePwsh();

try {
  let configuration = argv.configuration;
  if (!configuration) {
    if (argv.prod) {
      configuration = "production";
    } else if (argv.dev) {
      configuration = "development";
    } else {
      configuration = "production";
    }
  }

  await echo`${chalk.whiteBright(`📦  Building the monorepo in ${configuration} mode...`)}`;

  let proc = $`pnpm bootstrap`.timeout("60s");
  proc.stdout.on("data", data => {
    echo`${data}`;
  });
  let result = await proc;
  if (!result.ok) {
    throw new Error(
      `An error occured while bootstrapping the monorepo: \n\n${result.message}\n`
    );
  }

  if (configuration === "production") {
    proc = $`pnpm nx run-many --target=build --all --exclude="@pump-dot-dump/monorepo" --configuration=production --parallel=5`;
    proc.stdout.on("data", data => {
      echo`${data}`;
    });
    result = await proc;

    if (!result.ok) {
      throw new Error(
        `An error occured while building the monorepo in production mode: \n\n${result.message}\n`
      );
    }
  } else {
    proc = $`pnpm nx run-many --target=build --all --exclude="@pump-dot-dump/monorepo" --configuration=${configuration} --nxBail`;
    proc.stdout.on("data", data => {
      echo`${data}`;
    });
    result = await proc;

    if (!result.ok) {
      throw new Error(
        `An error occured while building the monorepo in development mode: \n\n${result.message}\n`
      );
    }
  }

  echo`${chalk.green(`Successfully built the monorepo in ${configuration} mode!`)}`;
} catch (error) {
  echo`${chalk.red(error?.message ? error.message : "A failure occurred while building the monorepo")}`;

  process.exit(1);
}
