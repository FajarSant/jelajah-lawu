// components/auth/RegisterButton.tsx
"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

export function RegisterButton() {
  return (
    <Button
      onClick={() => signIn("google", { callbackUrl: "/", prompt: "consent" })}
      className="w-full flex items-center gap-2"
    >
      <FcGoogle size={20} />
      Daftar dengan Google
    </Button>
  );
}
