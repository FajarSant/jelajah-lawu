'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export type ImportedDestination = {
  nama: string;
  lokasi: string;
  harga: number;
  vendorId: string;
};

// Skema validasi
const destinationImportSchema = z.object({
  nama: z.string().min(2),
  lokasi: z.string().min(2),
  harga: z.number().nonnegative(),
  vendorId: z.string().min(5),
});

// Fungsi import file
export async function importDestinations(file: File): Promise<{
  success?: string;
  error?: string;
}> {
  const buffer = await file.arrayBuffer();
  const XLSX = await import('xlsx');
  const workbook = XLSX.read(buffer, { type: 'array' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = XLSX.utils.sheet_to_json(sheet) as Record<string, any>[];

  const validDestinations = [];

  for (const row of jsonData) {
    const parsed = destinationImportSchema.safeParse({
      nama: row['Nama'] ?? '',
      lokasi: row['Lokasi'] ?? '',
      harga: Number(row['Harga'] ?? 0),
      vendorId: row['VendorID'] ?? '',
    });

    if (!parsed.success) {
      return {
        error: `Validasi gagal pada baris: ${JSON.stringify(row)}.`,
      };
    }

    const { nama, lokasi, harga, vendorId } = parsed.data;

    // Pastikan vendor valid
    const vendor = await prisma.user.findUnique({
      where: { id: vendorId },
    });

    if (!vendor || vendor.role !== 'VENDOR') {
      return {
        error: `Vendor tidak valid atau tidak ditemukan (ID: ${vendorId})`,
      };
    }

    validDestinations.push({
      nama,
      lokasi,
      harga,
      vendorId,
      deskripsi: 'Deskripsi default hasil import',
      gambarUrl: 'https://via.placeholder.com/300x200?text=Imported',
    });
  }

  await prisma.destinasi.createMany({
    data: validDestinations,
  });

  revalidatePath('/admin/destinasi');
  return { success: 'Import berhasil disimpan' };
}
