import UserInfo from "@/components/UserInfo";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

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
    <div className="p-6">
      <UserInfo
        user={{
          ...user,
          tanggalLahir: user.tanggalLahir?.toISOString() ?? null,
          jenisKelamin: user.jenisKelamin as "PRIA" | "WANITA" | "LAINNYA",
        }}
      />
    </div>
  );
}
