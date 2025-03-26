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

/* eslint-disable ts/no-misused-promises */

import type { ServerActionResult } from "@/lib/types";
import { Button } from "@/ui/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/ui/components/ui/form";
import { Input } from "@/ui/components/ui/input";
import { Label } from "@/ui/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/ui/components/ui/radio-group";
import { Separator } from "@/ui/components/ui/separator";
import { Textarea } from "@/ui/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { isSetString } from "@stryke/type-checks/is-set-string";
import { useQueryClient } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import type { FieldErrors } from "react-hook-form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { EthereumLogo } from "../ethereum-logo";
import { SolanaLogo } from "../solana-logo";
import type { CreateWalletGroupSchema } from "./schemas";
import { createWalletGroupSchema } from "./schemas";

export function CreateWalletGroupForm({
  submitAction,
  defaultValues
}: {
  submitAction: (
    values: CreateWalletGroupSchema
  ) => Promise<ServerActionResult<{ groupId: string }>>;
  defaultValues?: CreateWalletGroupSchema;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<CreateWalletGroupSchema>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: zodResolver(createWalletGroupSchema),
    defaultValues: defaultValues ?? {
      name: "",
      description: "",
      type: "ethereum",
      numberOfWallets: 1
    }
  });

  function onInvalid(error: Error | FieldErrors<CreateWalletGroupSchema>) {
    if (
      (error as FieldErrors<CreateWalletGroupSchema>)?.root?.message ||
      isSetString(error?.message)
    ) {
      toast.error("Issues occured while creating the wallet bundle", {
        richColors: true,
        position: "top-center",
        closeButton: true,
        description:
          (error as FieldErrors<CreateWalletGroupSchema>)?.root?.message ||
          isSetString(error?.message)
            ? String(error.message)
            : undefined
      });
    }
  }

  async function onSubmit(values: CreateWalletGroupSchema) {
    const result = await submitAction(values);
    if (result.success && result.data?.groupId) {
      toast.success("Wallet bundle created successfully", {
        richColors: true,
        position: "bottom-right",
        closeButton: true,
        action: (
          <Button
            variant="link"
            onClick={() =>
              router.push(`/wallet-groups/${result.data!.groupId}`)
            }>
            View
          </Button>
        )
      });

      void queryClient.invalidateQueries({ queryKey: ["wallet-groups"] });
      router.back();
    } else {
      let description!: string;
      if (!result.success) {
        if (result.errors) {
          Object.keys(result.errors).forEach(key => {
            const errors = result.errors?.[key];
            if (errors && errors.length > 0) {
              form.setError(
                key,
                {
                  type: "manual",
                  message: errors.join(" \n")
                },
                {
                  shouldFocus: true
                }
              );
            }
          });
        }

        description = result.error;
      }

      toast.error("Issues occured while creating the wallet bundle", {
        richColors: true,
        position: "top-center",
        closeButton: true,
        description
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onInvalid)}
        className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wallet Bundle Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Blockchain Type</FormLabel>
              <FormControl>
                <RadioGroup
                  className="grid grid-cols-2 gap-4"
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <div className="border-input hover:border-accent-foreground flex flex-row items-center gap-0.5 rounded-md border p-3 transition-colors">
                    <RadioGroupItem value="ethereum" id="ethereum" />
                    <div className="flex grow justify-center">
                      <Label htmlFor="ethereum">
                        <div className="flex flex-row items-center gap-2">
                          <EthereumLogo className="size-9" /> Ethereum
                        </div>
                      </Label>
                    </div>
                  </div>
                  <div className="border-input hover:border-accent-foreground flex flex-row items-center gap-0.5 rounded-md border p-3 transition-colors">
                    <RadioGroupItem value="solana" id="solana" />
                    <div className="flex grow justify-center">
                      <Label htmlFor="solana">
                        <div className="flex flex-row items-center gap-4">
                          <SolanaLogo className="size-9" /> Solana
                        </div>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="numberOfWallets"
          rules={{
            min: {
              value: 1,
              message: "Number of wallets must be at least 1"
            },
            max: {
              value: 5000,
              message: "Number of wallets must be at most 5000"
            }
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Wallets</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />

        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && (
            <LoaderCircle className="animate-spin" />
          )}{" "}
          {form.formState.isSubmitting ? "Adding Bundle..." : "Add Bundle"}
        </Button>
      </form>
    </Form>
  );
}
