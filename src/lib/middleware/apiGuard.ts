// lib/middleware/apiGuard.ts
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function withRoleGuard(request: Request, allowedRoles: string[]) {
  const session = await auth();

  if (!session?.user || !allowedRoles.includes(session.user.role ?? "")) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  return session;
}
