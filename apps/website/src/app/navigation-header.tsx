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

"use client";

import { authClient } from "@/auth/client";
import { getUserOptions } from "@/query/auth-options";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/components/ui/avatar";
import { Button } from "@/ui/components/ui/button";
import { Card } from "@/ui/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/ui/components/ui/dropdown-menu";
import { Skeleton } from "@/ui/components/ui/skeleton";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CircleIcon, Home, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { ThemeToggle } from "./theme-toggle";

function UserMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    await authClient.signOut();
    router.refresh();
    router.push("/login");
  }

  const user = useSuspenseQuery(getUserOptions());
  if (user.isError || !user.data?.name) {
    return (
      <Button asChild variant="ghost">
        <Link href="/login">Login</Link>
      </Button>
    );
  }

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DropdownMenuTrigger>
        <Avatar className="size-9 cursor-pointer">
          <AvatarImage
            src={user.data.image || ""}
            alt={
              user.data.displayUsername || user.data.username || user.data.name
            }
          />
          <AvatarFallback>
            {user.data.displayUsername
              ? user.data.displayUsername
                  .split(" ")
                  .map(n => n[0])
                  .join("")
              : user.data.username
                ? user.data.username
                    .split("-")
                    .map(n => n[0])
                    .join("")
                : user.data.name
                    .split(" ")
                    .map(n => n[0])
                    .join("")}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex flex-col gap-1">
        <DropdownMenuItem className="cursor-pointer">
          <Link href="/" className="flex w-full items-center">
            <Home className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <form action={handleLogout} className="w-full">
          <button type="submit" className="flex w-full">
            <DropdownMenuItem className="w-full flex-1 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function NavigationHeader() {
  return (
    <nav className="sticky top-0 z-50 md:top-5">
      <Card className="bg-white-50/50 mx-auto flex w-full flex-row items-center justify-between rounded-none px-4 py-4 backdrop-blur-sm sm:px-6 md:max-w-7xl md:rounded-2xl lg:px-8 dark:bg-zinc-950/50">
        <Link href="/" className="flex items-center gap-2">
          <CircleIcon className="text-white-500 h-6 w-6" />
          <h1 className="text-white-500 leading-0 pb-1 text-2xl font-bold">
            pump.dump
          </h1>
        </Link>
        <div className="flex items-center space-x-4">
          <Suspense fallback={<Skeleton className="h-9 w-9 rounded-full" />}>
            <UserMenu />
          </Suspense>
          <ThemeToggle />
        </div>
      </Card>
    </nav>
  );
}
