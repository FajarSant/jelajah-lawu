"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

export function LoginButton() {
  return (
    <Button
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="w-full flex items-center gap-2"
    >
      <FcGoogle size={20} />
      Masuk dengan Google
    </Button>
  );
}
