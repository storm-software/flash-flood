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

/* eslint-disable ts/no-misused-promises */

import { authClient } from "@/auth/client";
import { Button } from "@/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/card";
import { Checkbox } from "@/components/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/form";
import { Input } from "@/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import type { FieldErrors } from "react-hook-form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const loginSchema: z.ZodType = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .max(50, "Username must be at most 50 characters"),
  password: z
    .string()
    .min(1, "Password is required")
    .max(100, "Password must be at most 100 characters"),
  rememberMe: z.boolean().optional()
});

export default function LoginPage() {
  const router = useRouter();

  const session = authClient.useSession();
  if (session.data) {
    router.push("/");
  }

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false
    }
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const result = await authClient.signIn.username({
      username: values.username,
      password: values.password,
      rememberMe: values.rememberMe
    });
    if (result.error) {
      toast.error("Issues occured while processing your sign-on request", {
        richColors: true,
        position: "top-center",
        closeButton: true,
        description: result.error.message
      });
    } else {
      router.refresh();
      router.push("/");
    }
  }

  function onInvalid(errors: FieldErrors<z.infer<typeof loginSchema>>) {
    if (errors.root?.message) {
      toast.error("Issues occured while processing your sign-on request", {
        richColors: true,
        position: "top-center",
        closeButton: true,
        description: errors.root.message
      });
    }
  }

  return (
    <Suspense>
      <div className="flex flex-col gap-6">
        <Card className="mx-auto my-20 w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your credentials below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit, onInvalid)}
                className="space-y-6">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input autoComplete="username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          autoComplete="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox {...field} />
                      </FormControl>
                      <FormLabel>Keep me logged in</FormLabel>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting && (
                    <LoaderCircle className="animate-spin" />
                  )}{" "}
                  {form.formState.isSubmitting ? "Logging In..." : "Login"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Suspense>
  );
}
