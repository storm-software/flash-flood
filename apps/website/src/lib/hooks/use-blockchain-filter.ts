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
