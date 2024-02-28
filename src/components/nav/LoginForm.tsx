import React from "react";
import { FaGoogle } from "react-icons/fa";
import { Button } from "../ui/button";
import { createClient } from "@/utils/supabase/client";
import { usePathname } from "next/navigation";

const LoginForm = () => {
  // 현재의 pathName을 알기위함.
  const pathName = usePathname();

  const supabase = createClient();

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: location.origin + "/auth/callback?next=" + pathName,
      },
    });

    // console.log("error : ", error);
  };

  return (
    <Button
      onClick={handleLogin}
      variant={"ghost"}
      className="flex items-center gap-2 border rounded-md p-2"
    >
      <FaGoogle />
      Login
    </Button>
  );
};

export default LoginForm;
