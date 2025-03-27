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

import { auth } from "@/lib/auth/server";
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
