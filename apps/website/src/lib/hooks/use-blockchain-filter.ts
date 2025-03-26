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

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import type { BlockchainType } from "../types";

export function useBlockchainFilter(): BlockchainType | undefined {
  const searchParams = useSearchParams();

  return useMemo(() => {
    const params = new URLSearchParams(searchParams.toString());

    const blockchain = params.get("type");
    const ethereum = blockchain?.includes("ethereum") ?? false;
    const solana = blockchain?.includes("solana") ?? false;

    return ethereum ? "ethereum" : solana ? "solana" : undefined;
  }, [searchParams]);
}
