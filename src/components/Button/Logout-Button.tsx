"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  return (
    <Button
      variant="outline"
      onClick={() => signOut({ callbackUrl: "/auth/signin" })}
      className="flex items-center gap-2"
    >
      <LogOut size={18} />
      Keluar
    </Button>
  );
}
