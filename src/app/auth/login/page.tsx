"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

export default function AuthPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
  if (status === "authenticated") {
    const role = session?.user?.role ?? "PENGUNJUNG";

    if (role === "ADMIN") router.push("/admin");
    else if (role === "VENDOR") router.push("/vendor");
    else if (role === "PENGUNJUNG") router.push("/explore");
    else router.push("/");
  }
}, [session, status, router]);


  const handleGoogleLogin = async () => {
    await signIn("google");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center">Masuk atau Daftar</h1>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Button variant="outline" className="w-full mt-4" onClick={handleGoogleLogin}>
              <FcGoogle className="mr-2 h-5 w-5" />
              Login dengan Google
            </Button>
          </TabsContent>

          <TabsContent value="register">
            <Button variant="outline" className="w-full mt-4" onClick={handleGoogleLogin}>
              <FcGoogle className="mr-2 h-5 w-5" />
              Daftar dengan Google
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
