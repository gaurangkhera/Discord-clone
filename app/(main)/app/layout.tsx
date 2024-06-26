"use client";

import "@/app/globals.css";
import { toast, Toaster } from "sonner";
import { Inter } from "next/font/google";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  Ban,
  Home,
  MoreHorizontal,
  PanelRight,
  Trash2,
  User,
} from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/clerk-react";
import { redirect, usePathname } from "next/navigation";
import Image from "next/image";
import { ThemeProvider } from "@/components/theme-provider";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { Id } from "@/convex/_generated/dataModel";
import { FriendItem } from "@/components/friend-item";

const font = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const clerkUser = useUser();
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useConvexAuth();
  const currentUser = useQuery(api.users.getUserByEmail, {
    email: clerkUser.user?.emailAddresses[0].emailAddress as string,
  });
  const friends = useQuery(api.friends.getUserFriends)?.filter(
    (friend) => friend.active && !friend.blocked
  );

  if (!currentUser) {
    return null;
  }

  if (isLoading) {
    return (
      <Skeleton className="w-screen h-screen" />
    );
  }

  if (!isAuthenticated) {
    return redirect("/");
  }

  

  return (
<div>
        <Toaster position="top-center" richColors />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <div className="flex h-screen gap-2 p-2 noscroll">
            <div className="z-[99999] md:hidden block top-0 right-0 absolute p-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button size="icon" variant="outline">
                    <PanelRight className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="z-[9999999] p-9" side="right">
                  <Link href={`/app`} className="group my-1">
                    <div
                      className={`group-hover:bg-muted group-hover:text-primary rounded-lg p-3 gap-2 flex flex-row items-center cursor-pointer ${
                        pathname === `/app`
                          ? "bg-primary text-background"
                          : "bg-background text-primary text-background"
                      }`}
                    >
                      <div className="group-hover:bg-primary group-hover:text-muted text-primary bg-muted rounded-full p-2">
                        <Home className="w-5 h-5" />
                      </div>
                      Home
                    </div>
                  </Link>
                  <Link href={`/app/blocked`} className="group my-1">
                    <div
                      className={`group-hover:bg-muted group-hover:text-primary rounded-lg p-3 gap-2 flex flex-row items-center cursor-pointer ${
                        pathname === `/app/blocked`
                          ? "bg-primary text-background"
                          : "bg-background text-primary text-background"
                      }`}
                    >
                      <div className="group-hover:bg-primary group-hover:text-muted text-primary bg-muted rounded-full p-2">
                        <Ban className="w-5 h-5" />
                      </div>
                      Blocked users
                    </div>
                  </Link>
                  <hr className="text-primary my-3 -mt-1"/>
                  {friends === undefined ? (
                    <>
                      <Skeleton className="h-12 w-full my-1" />
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-12 w-full my-1" />
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-12 w-full my-1" />
                    </>
                  ) : (
                    friends.map((friend) => (
                      <FriendItem friend={friend} />
                    ))
                  )}
                  <SheetFooter className="bottom-0 fixed mb-4">
                    <Link href="/app/account" className="group">
                      <div
                        className={`group-hover:bg-muted group-hover:text-primary rounded-lg p-3 gap-2 flex flex-row items-center cursor-pointer ${
                          pathname === `/account`
                            ? "bg-primary text-background"
                            : "bg-background text-primary text-background"
                        }`}
                      >
                        <div className="rounded-full overflow-hidden">
                          <Image
                            src={clerkUser.user?.imageUrl as string}
                            width={40}
                            height={40}
                            alt="user-img"
                          />
                        </div>
                        {currentUser.name}
                      </div>
                    </Link>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
            <div className={`w-64 h-full overflow-auto md:block hidden`}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Friends</CardTitle>
                  <CardDescription>See your friends here.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={`/app`} className="group my-1">
                    <div
                      className={`group-hover:bg-muted group-hover:text-primary rounded-lg p-3 gap-2 flex flex-row items-center cursor-pointer transition-all ${
                        pathname === `/app`
                          ? "bg-primary text-background"
                          : "bg-background text-primary text-background"
                      }`}
                    >
                      <div className="group-hover:bg-primary group-hover:text-muted text-primary bg-muted rounded-full p-2">
                        <Home className="w-5 h-5" />
                      </div>
                      Home
                    </div>
                  </Link>
                  <Link href={`/app/blocked`} className="group my-1">
                    <div
                      className={`group-hover:bg-muted group-hover:text-primary rounded-lg p-3 gap-2 flex flex-row items-center cursor-pointer transition-all ${
                        pathname === `/app/blocked`
                          ? "bg-primary text-background"
                          : "bg-background text-primary text-background"
                      }`}
                    >
                      <div className="group-hover:bg-primary group-hover:text-muted text-primary bg-muted rounded-full p-2">
                        <Ban className="w-5 h-5" />
                      </div>
                      Blocked users
                    </div>
                  </Link>

                      <hr className="my-2 mb-3" />
                  {friends === undefined ? (
                    <>
                      <Skeleton className="h-12 w-full my-1" />
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-12 w-full my-1" />
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-12 w-full my-1" />

                    </>
                  ) : (
                    friends.map((friend) => (
                      <FriendItem friend={friend} />
                    ))
                  )}
                </CardContent>
                <CardFooter className="bottom-0 fixed">
                  <Link href="/app/account" className="group">
                    <div
                      className={`group-hover:bg-muted group-hover:text-primary rounded-lg p-3 gap-2 flex flex-row items-center cursor-pointer transition-all ${
                        pathname === `/app/account`
                          ? "bg-primary text-background"
                          : "bg-background text-primary text-background"
                      }`}
                    >
                      <div className="rounded-full overflow-hidden">
                        <Image
                          src={clerkUser.user?.imageUrl as string}
                          width={40}
                          height={40}
                          alt="user-img"
                        />
                      </div>
                      {currentUser.discId.split("#")[0]}
                    </div>
                  </Link>
                </CardFooter>
              </Card>
            </div>
            <div className="flex-grow overflow-auto">{children}</div>
          </div>
        </ThemeProvider>
      <style jsx>{`
        @media (min-width: 768px) {
          button {
            display: none;
          }
        }
      `}</style>
</div>
  );
}
