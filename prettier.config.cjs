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

const config = {
  proseWrap: "always",
  trailingComma: "none",
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  quoteProps: "preserve",
  insertPragma: false,
  bracketSameLine: true,
  printWidth: 80,
  bracketSpacing: true,
  arrowParens: "avoid",
  endOfLine: "lf",
  overrides: [
    {
      files: "**/{*.ts,*.tsx,*.mts,*.cts}",
      options: {
        parser: "typescript",
        singleQuote: false,
        trailingComma: "none"
      }
    },
    {
      files: "*.md{,x}",
      options: {
        semi: false,
        trailingComma: "none"
      }
    },
    {
      files: "*.svg",
      options: {
        parser: "html"
      }
    },
    { files: "*.json", options: { trailingComma: "none" } },
    {
      files: "**/*.hbs",
      options: {
        parser: "html"
      }
    },
    {
      files: "**/*.prisma",
      options: {
        parser: "prisma-parse"
      }
    },
    {
      files: "**/{*.acid,*.aci,*.acidic}",
      options: {
        parser: "prisma-parse"
      }
    },
    {
      files: "**/*.sol",
      options: {
        parser: "solidity-parse",
        printWidth: 80,
        tabWidth: 4,
        useTabs: false,
        singleQuote: false,
        bracketSpacing: false
      }
    }
  ],
  plugins: [
    "prettier-plugin-sh",
    "prettier-plugin-pkg",
    "prettier-plugin-organize-imports",
    "prettier-plugin-prisma",
    "prettier-plugin-tailwindcss",
    "prettier-plugin-solidity"
  ]
};

module.exports = config;
