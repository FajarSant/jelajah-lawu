'use server';

import { prisma } from "@/lib/prisma";
import { JenisKelamin } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function updateUserProfile(userId: string, data: {
  name: string;
  nomorHp: string;
  alamat: string;
  jenisKelamin: JenisKelamin;
  tanggalLahir?: string;
}) {
  await prisma.user.update({
    where: { id: userId },
    data: {
      name: data.name,
      nomorHp: data.nomorHp,
      alamat: data.alamat,
      jenisKelamin: data.jenisKelamin,
      tanggalLahir: data.tanggalLahir ? new Date(data.tanggalLahir) : null,
    },
  });

  revalidatePath("/profil");
}
