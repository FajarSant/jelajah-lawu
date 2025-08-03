// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
      user: {
      id: string;
      name: string;
      email: string;
      role: "ADMIN" | "VENDOR" | "PENGGUNA";
    }& DefaultSession["user"];
     accessToken?: string;
  }

  interface User {
    id: string;
    role: "ADMIN" | "VENDOR" | "PENGGUNA";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role?: string;
  }
}
