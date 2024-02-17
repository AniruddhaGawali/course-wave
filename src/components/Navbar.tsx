"use client";

import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CircleUser, LayoutDashboard, LogOut } from "lucide-react";
import * as action from "@/actions";

type Props = {};

function Navbar({}: Props) {
  const { data: session } = useSession();

  return (
    <header className="fixed left-1/2 top-10 z-50 flex h-20 w-[90%] -translate-x-1/2 items-center justify-between rounded-xl bg-[rgba(255,255,255,0.45)]  px-10 backdrop-blur-sm">
      <Link href={"/"}>
        <h1>Logo</h1>
      </Link>

      <nav>
        <ul className="flex items-center justify-center gap-10">
          <li className="text-lg font-semibold transition-colors duration-200 ease-in-out">
            <a href="/dashboard" className="hidden hover:underline sm:block ">
              Dashboard
            </a>
            <LayoutDashboard className="block hover:underline sm:hidden " />
          </li>
          <li>
            {!session ? (
              <a href="/auth/login">
                <Button>Login</Button>
              </a>
            ) : (
              <Popover>
                <PopoverTrigger>
                  <Avatar>
                    <AvatarImage src={session.user?.image ?? ""} />
                    <AvatarFallback>
                      <CircleUser size={32} />
                    </AvatarFallback>
                  </Avatar>
                </PopoverTrigger>

                <PopoverContent className="w-fit p-2">
                  <div>
                    <Button variant="ghost" onClick={action.logOut}>
                      <LogOut className="mr-2 h-4 w-4" /> Sign Out
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
