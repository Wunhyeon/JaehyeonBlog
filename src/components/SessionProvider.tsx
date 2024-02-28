"use client";

import { useUser } from "@/lib/store/user";
import { createClient } from "@/utils/supabase/client";
import React, { useEffect } from "react";

const SessionProvider = () => {
  const client = createClient();

  const setUser = useUser((state) => state.setUser);

  const readUserSession = async () => {
    const { data } = await client.auth.getSession();

    const user = data.session?.user;
    console.log("SessionProvider - user : ", user);
    setUser(user);
  };

  useEffect(() => {
    readUserSession();
  }, []);
  return <div></div>;
};

export default SessionProvider;
