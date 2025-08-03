// components/auth/AuthAction.tsx
"use client";

import { useSession } from "next-auth/react";
import { LoginButton } from "@/components/Button/Login-Button";
import { LogoutButton } from "@/components/Button/Logout-Button";

export function AuthAction() {
  const { data: session } = useSession();

  if (session?.user) {
    return <LogoutButton />;
  }

  return <LoginButton />;
}
