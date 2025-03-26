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

import { createWalletGroupAction } from "../actions";
import { CreateWalletGroupForm } from "../create-form";

export default function CreateWalletGroupPage() {
  return (
    <div className="max-w-container mx-auto flex flex-col gap-4 p-4 sm:p-6 lg:p-8">
      <div className="gap-0.25 flex flex-col">
        <h2 className="text-2xl font-bold">Create Wallet Bundle</h2>
        <p className="text-muted-foreground">
          Create a new wallet bundle to manage your assets.
        </p>
      </div>

      <CreateWalletGroupForm submitAction={createWalletGroupAction} />
    </div>
  );
}
