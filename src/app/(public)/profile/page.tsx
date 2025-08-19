import UserInfo from "@/components/UserInfo";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function UserPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      nomorHp: true,
      alamat: true,
      role: true,
      jenisKelamin: true,
      tanggalLahir: true,
      image: true,
    },
  });

  if (!user) redirect("/auth/login");

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header Profile */}
        <div className="relative h-40 bg-gradient-to-r from-blue-500 to-indigo-600">
          <div className="absolute -bottom-12 left-6 flex items-center gap-4">
            <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden">
              <Image
                src={user.image ?? "/default-avatar.png"}
                alt={user.name ?? "User"}
                width={96}
                height={96}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="mt-12">
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                {user.name}
              </h1>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="pt-16 px-6 md:px-10 pb-8">
          <UserInfo
            user={{
              ...user,
              tanggalLahir: user.tanggalLahir?.toISOString() ?? null,
              jenisKelamin: user.jenisKelamin as "PRIA" | "WANITA" | "LAINNYA",
            }}
          />
        </div>
      </div>
    </main>
  );
}
