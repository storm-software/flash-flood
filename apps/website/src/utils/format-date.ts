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

import { format } from "date-fns";

/**
 * Formats a date string or Date object into a human-readable format.
 *
 * @param date - The date to format, can be a string, Date object, or null.
 * @returns The formatted date string in "dd/MM/yyyy" format.
 */
export function formatDate(date?: string | Date | null): string {
  if (!date) return "";
  if (typeof date === "string") date = new Date(date);
  return format(date, "dd/MM/yyyy");
}

/**
 * Formats a date string or Date object into a human-readable format with time.
 *
 * @param date - The date to format, can be a string, Date object, or null.
 * @returns The formatted date string in "dd/MM/yyyy HH:mm" format.
 */
export function formatDateTime(date?: string | Date | null): string {
  if (!date) return "";
  if (typeof date === "string") date = new Date(date);
  return format(date, "dd/MM/yyyy HH:mm");
}

/**
 * Formats a date string or Date object into a human-readable format with seconds.
 *
 * @param date - The date to format, can be a string, Date object, or null.
 * @returns The formatted date string in "dd/MM/yyyy HH:mm:ss" format.
 */
export function formatDateTimeWithSeconds(date?: string | Date | null): string {
  if (!date) return "";
  if (typeof date === "string") date = new Date(date);
  return format(date, "dd/MM/yyyy HH:mm:ss");
}
