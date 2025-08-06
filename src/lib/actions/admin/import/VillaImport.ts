'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export type ImportedVilla = {
  nama: string;
  lokasi: string;
  harga: number;
  kapasitas: number;
  fasilitas: string;
  vendorId: string;
};

// Schema validasi untuk import villa
const villaImportSchema = z.object({
  nama: z.string().min(2),
  lokasi: z.string().min(2),
  harga: z.number().nonnegative(),
  kapasitas: z.number().positive(),
  fasilitas: z.string().min(2),
  vendorId: z.string().min(5),
});

export async function importVillas(file: File): Promise<{
  success?: string;
  error?: string;
}> {
  const buffer = await file.arrayBuffer();
  const XLSX = await import('xlsx');
  const workbook = XLSX.read(buffer, { type: 'array' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData: Record<string, unknown>[] = XLSX.utils.sheet_to_json(sheet);

  const validVillas: ImportedVilla[] = [];

  for (const row of jsonData) {
    const parsed = villaImportSchema.safeParse({
      nama: row['Nama'],
      lokasi: row['Lokasi'],
      harga: Number(row['Harga']),
      kapasitas: Number(row['Kapasitas']),
      fasilitas: row['Fasilitas'],
      vendorId: row['VendorID'],
    });

    if (!parsed.success) {
      return {
        error: `Validasi gagal pada baris: ${JSON.stringify(row)}.`,
      };
    }

    const { nama, lokasi, harga, kapasitas, fasilitas, vendorId } = parsed.data;

    const vendor = await prisma.user.findUnique({
      where: { id: vendorId },
    });

    if (!vendor || vendor.role !== 'VENDOR') {
      return {
        error: `Vendor tidak valid atau tidak ditemukan (ID: ${vendorId})`,
      };
    }

    validVillas.push({
      nama,
      lokasi,
      harga,
      kapasitas,
      fasilitas,
      vendorId,
    });
  }

  await prisma.villa.createMany({
    data: validVillas.map((villa) => ({
      ...villa,
      deskripsi: 'Deskripsi default hasil import',
      gambarUrl: 'https://via.placeholder.com/300x200?text=Imported',
    })),
  });

  revalidatePath('/admin/villa');
  return { success: 'Import Villa berhasil disimpan' };
}
