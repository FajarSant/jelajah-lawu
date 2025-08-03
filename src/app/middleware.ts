// middleware.ts
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await auth();

  const { pathname } = req.nextUrl;

  // Jika belum login dan akses dashboard → redirect ke /auth/signin
  if (!session?.user && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Proteksi khusus berdasarkan role
  const userRole = session?.user?.role;

  if (pathname.startsWith("/dashboard/admin") && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (pathname.startsWith("/dashboard/vendor") && userRole !== "VENDOR") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  // Jika semua aman
  return NextResponse.next();
}
