"use client";

import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import NavMenu from "./NavMenu";
import { useUser } from "@/lib/store/user";
import { ToggleDarkMode } from "../ToggleDarkmode";
import Link from "next/link";
import LoginForm from "./LoginForm";
import Profile from "./Profile";

const Navbar = () => {
  const user = useUser((state) => state.user);
  console.log("user : ", user?.user_metadata);

  return (
    <nav className="py-4 border-b-2 border-gray-500 min-h-6">
      <div className="flex justify-around  items-center w-5/6 mx-auto flex-wrap">
        <div>
          <Link href={"/"}>
            <h1 className="text-2xl font-bold">임재현 블로그</h1>
          </Link>
        </div>
        <div className="flex gap-2 items-center">
          <NavMenu />
          <ToggleDarkMode />
          <div>
            {user ? (
              <Profile user={user} />
            ) : (
              // <div>로그인 하라는 구글표시</div>
              <LoginForm />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
