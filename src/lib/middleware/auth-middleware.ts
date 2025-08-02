// lib/middleware/auth.ts
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function requireAuth() {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  return session;
}
