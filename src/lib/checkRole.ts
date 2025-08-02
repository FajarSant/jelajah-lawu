import { auth } from "@/lib/auth"
import { Role } from "@prisma/client"

export async function requireRole(allowedRoles: Role[]) {
  const session = await auth()

  if (!session?.user) {
    throw new Error("Unauthorized")
  }

  if (!allowedRoles.includes(session.user.role as Role)) {
    throw new Error("Forbidden: Anda tidak memiliki akses.")
  }

  return session.user
}
