// app/api/admin-only/route.ts
import { requireRole } from "@/lib/checkRole";
import { Role } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await requireRole([Role.ADMIN]);

    return NextResponse.json({ message: `Halo, ${user.name}` });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 403 });
  }
}
