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

"use client";

import { useBlockchainFilter } from "@/hooks/use-blockchain-filter";
import { ToggleGroup, ToggleGroupItem } from "@/ui/components/ui/toggle-group";
import { cn } from "@/ui/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { EthereumLogo } from "./ethereum-logo";
import { SolanaLogo } from "./solana-logo";

export function BlockchainFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const blockchainFilter = useBlockchainFilter();
  const handleEthereumClick = () => {
    if (blockchainFilter !== "ethereum") {
      router.push(`${pathname}?${createQueryString("type", "ethereum")}`);
    } else {
      router.push(pathname);
    }
  };
  const handleSolanaClick = () => {
    if (blockchainFilter !== "solana") {
      router.push(`${pathname}?${createQueryString("type", "solana")}`);
    } else {
      router.push(pathname);
    }
  };

  return (
    <ToggleGroup
      className="cursor-pointer"
      type="multiple"
      size="lg"
      variant="outline"
      value={
        [
          blockchainFilter !== "ethereum" && "ethereum",
          blockchainFilter !== "solana" && "solana"
        ].filter(Boolean) as string[]
      }>
      <ToggleGroupItem
        className={cn("h-12 cursor-pointer hover:border-zinc-200", {
          "border-1 border-solid border-zinc-400/75":
            blockchainFilter !== "ethereum"
        })}
        value="ethereum"
        aria-label="Toggle Ethereum"
        onClick={handleEthereumClick}>
        <div className="flex size-12 items-center justify-center">
          <EthereumLogo
            className={cn("m-auto size-7 transition-all", {
              "size-9": blockchainFilter !== "ethereum"
            })}
            grayscale={blockchainFilter === "ethereum"}
          />
        </div>
      </ToggleGroupItem>
      <ToggleGroupItem
        className={cn("h-12 cursor-pointer hover:border-zinc-200", {
          "border-1 border-solid border-zinc-400/75":
            blockchainFilter !== "solana"
        })}
        value="solana"
        aria-label="Toggle Solana"
        onClick={handleSolanaClick}>
        <div className="flex size-12 items-center justify-center">
          <SolanaLogo
            className={cn("m-auto size-7 transition-all", {
              "size-9": blockchainFilter !== "solana"
            })}
            grayscale={blockchainFilter === "solana"}
          />
        </div>
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
