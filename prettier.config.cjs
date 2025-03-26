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
