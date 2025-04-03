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
import { prisma } from "@/db/prisma";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function UserProfile({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth.api.getSession({
    headers: await headers()
  });

  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      walletGroups: {
        orderBy: { updatedAt: "desc" }
      }
    }
  });

  if (!user) {
    notFound();
  }

  const isOwnProfile = session?.user?.id === id;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <div className="mb-8 rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-6">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.displayUsername}
                width={80}
                height={80}
                className="rounded-full"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                <span className="text-2xl font-medium text-gray-500">
                  {user.displayUsername.charAt(0)}
                </span>
              </div>
            )}
            <div>
              <h1 className="mb-2 text-3xl font-bold text-gray-900">
                {user.displayUsername}
              </h1>
              <Link
                href="/"
                className="text-gray-500 transition-colors hover:text-gray-700">
                ← Back to all users
              </Link>
            </div>
          </div>
        </div>

        {isOwnProfile || (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Created Wallets
              </h2>

              <Link
                href="/posts/new"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-600">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                New Post
              </Link>
            </div>
            {user.walletGroups.length === 0 ? (
              <div className="rounded-lg border border-gray-100 bg-white p-8 text-center">
                <p className="mb-4 text-gray-500">
                  {isOwnProfile
                    ? "You haven't published any posts yet."
                    : "No published posts yet."}
                </p>
                {isOwnProfile && (
                  <Link
                    href="/posts/new"
                    className="inline-flex items-center gap-2 font-medium text-blue-500 transition-colors hover:text-blue-600">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Write your first post
                  </Link>
                )}
              </div>
            ) : (
              <div className="grid gap-4">
                {user.walletGroups.map(walletGroup => (
                  <Link
                    key={walletGroup.id}
                    href={`/wallet-groups/${walletGroup.id}`}
                    className="block transition-transform hover:scale-[1.01]">
                    <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {walletGroup.name}
                        </h3>
                        {!walletGroup.createdAt && (
                          <span className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                            Created on{" "}
                            {new Date(
                              walletGroup.createdAt
                            ).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
