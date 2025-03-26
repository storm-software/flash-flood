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

import { Card } from "@/ui/components/ui/card";

export default function Layout({
  drawer,
  children
}: {
  drawer: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <Card className="w-full py-8 sm:px-6 lg:px-8">{children}</Card>

      {drawer}
    </div>
  );
}
