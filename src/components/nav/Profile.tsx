"use client";

import { User } from "@supabase/supabase-js";
import Image from "next/image";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useUser } from "@/lib/store/user";

const Profile = ({ user }: { user: User }) => {
  const supabase = createClient();
  const setUser = useUser((state) => state.setUser);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(undefined);
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Image
          src={user.user_metadata.avatar_url}
          alt="user profile"
          width={50}
          height={50}
          className="rounded-full ring-2 ring-purple-500"
        />
      </PopoverTrigger>
      <PopoverContent className="space-y-5 ">
        <div className="px-4 text-sm  ">
          <p>{user.user_metadata.name}</p>
          <p className="text-gray-400">{user.user_metadata.email}</p>
        </div>
        <div>
          <Link
            className={buttonVariants({
              variant: "outline",
              className: "w-full",
            })}
            href="/create"
          >
            글쓰기
          </Link>
        </div>
        <Button variant={"outline"} className="w-full" onClick={handleLogout}>
          Logout
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default Profile;
