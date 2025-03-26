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

import { z } from "zod";

export const createWalletGroupSchema: z.ZodType = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, {
      message: "Name must be 100 characters or less"
    })
    .trim(),
  description: z
    .string()
    .max(500, {
      message: "Description must be 500 characters or less"
    })
    .trim()
    .optional()
    .nullable(),
  type: z.enum(["ethereum", "solana"], {
    errorMap: () => ({ message: "Invalid blockchain type" })
  }),
  numberOfWallets: z.coerce
    .number()
    .int()
    .positive("Number of wallets must be a positive integer")
    .min(1, "At least one wallet is required")
    .max(5000, {
      message: "You can only create up to 5000 wallets at a time"
    })
    .default(1)
});

export type CreateWalletGroupSchema = z.infer<typeof createWalletGroupSchema>;

export const updateWalletGroupSchema: z.ZodType = z.object({
  id: z.string().uuid("Invalid wallet group ID"),
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, {
      message: "Name must be 100 characters or less"
    })
    .trim(),
  description: z
    .string()
    .max(500, {
      message: "Description must be 500 characters or less"
    })
    .trim()
    .optional()
    .nullable(),
  type: z.enum(["ethereum", "solana"], {
    errorMap: () => ({ message: "Invalid blockchain type" })
  }),
  numberOfWallets: z.coerce
    .number()
    .int()
    .positive("Number of wallets must be a positive integer")
    .min(1, "At least one wallet is required")
    .max(5000, {
      message: "You can only create up to 5000 wallets at a time"
    })
    .default(1)
});

export type UpdateWalletGroupSchema = z.infer<typeof updateWalletGroupSchema>;
