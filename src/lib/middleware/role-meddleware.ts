// lib/middleware/role.ts
import { auth } from "@/lib/auth";

export async function requireRole(allowedRoles: string[]) {
  const session = await auth();
  const role = session?.user?.role;

  if (!session?.user || !allowedRoles.includes(role ?? "")) {
    throw new Error("Forbidden");
  }

  return session;
}
