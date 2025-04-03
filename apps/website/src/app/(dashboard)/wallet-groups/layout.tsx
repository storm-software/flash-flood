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

import { auth } from "@/auth/server";
import { Card } from "@/ui/components/ui/card";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({
  drawer,
  children
}: {
  drawer: React.ReactNode;
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="w-full">
      <Card className="w-full px-2 py-8 sm:px-6">{children}</Card>

      {drawer}
    </div>
  );
}
