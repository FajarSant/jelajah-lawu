'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export type ImportedRestoran = {
  nama: string;
  lokasi: string;
  hargaRata: number;
  deskripsi: string;
  fasilitas?: string;
  jenisMakanan?: string;
  jamBuka?: string;
  jamTutup?: string;
  vendorId: string;
};

// Schema validasi untuk import restoran
const restoranImportSchema = z.object({
  nama: z.string().min(2),
  lokasi: z.string().min(2),
  hargaRata: z.number().nonnegative(),
  deskripsi: z.string().min(5),
  fasilitas: z.string().optional(),
  jenisMakanan: z.string().optional(),
  jamBuka: z.string().optional(),
  jamTutup: z.string().optional(),
  vendorId: z.string().min(5),
});

export async function importRestoran(file: File): Promise<{
  success?: string;
  error?: string;
}> {
  const buffer = await file.arrayBuffer();
  const XLSX = await import('xlsx');
  const workbook = XLSX.read(buffer, { type: 'array' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData: Record<string, unknown>[] = XLSX.utils.sheet_to_json(sheet);

  const validRestoran: ImportedRestoran[] = [];

  for (const row of jsonData) {
    const parsed = restoranImportSchema.safeParse({
      nama: row['Nama'],
      lokasi: row['Lokasi'],
      hargaRata: Number(row['HargaRata']),
      deskripsi: row['Deskripsi'],
      fasilitas: row['Fasilitas'] || undefined,
      jenisMakanan: row['JenisMakanan'] || undefined,
      jamBuka: row['JamBuka'] || undefined,
      jamTutup: row['JamTutup'] || undefined,
      vendorId: row['VendorID'],
    });

    if (!parsed.success) {
      return {
        error: `Validasi gagal pada baris: ${JSON.stringify(row)}.`,
      };
    }

    const restoranData = parsed.data;

    const vendor = await prisma.user.findUnique({
      where: { id: restoranData.vendorId },
    });

    if (!vendor || vendor.role !== 'VENDOR') {
      return {
        error: `Vendor tidak valid atau tidak ditemukan (ID: ${restoranData.vendorId})`,
      };
    }

    validRestoran.push(restoranData);
  }

  await prisma.restoran.createMany({
    data: validRestoran.map((resto) => ({
      ...resto,
      gambarUrl: 'https://via.placeholder.com/300x200?text=Imported',
    })),
  });

  revalidatePath('/admin/restoran');
  return { success: 'Import Restoran berhasil disimpan' };
}
