"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";

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
    await signIn("google"); // biarkan callbackUrl default agar diarahkan kembali ke halaman ini
  };

  if (status === "loading") {
    return null; // atau bisa diganti dengan spinner/loading animation
  }

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-white to-blue-100 dark:from-gray-900 dark:to-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="w-full max-w-md space-y-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <h1 className="text-2xl font-bold">Masuk atau Daftar</h1>
          <p className="text-sm text-muted-foreground">
            Gunakan akun Google untuk melanjutkan
          </p>
        </motion.div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={handleGoogleLogin}
            >
              <FcGoogle className="h-5 w-5" />
              Login dengan Google
            </Button>
          </TabsContent>

          <TabsContent value="register">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={handleGoogleLogin}
            >
              <FcGoogle className="h-5 w-5" />
              Daftar dengan Google
            </Button>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}
