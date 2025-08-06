'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export type ImportedJeepTour = {
  nama: string;
  lokasi: string;
  harga: number;
  kapasitas: number;
  rute: string;
  durasi: number;
  fasilitas?: string;
  vendorId: string;
};

// Skema validasi
const jeepTourImportSchema = z.object({
  nama: z.string().min(2),
  lokasi: z.string().min(2),
  harga: z.number().nonnegative(),
  kapasitas: z.number().positive(),
  rute: z.string().min(2),
  durasi: z.number().positive(),
  fasilitas: z.string().optional(),
  vendorId: z.string().min(5),
});

// Fungsi import file
export async function importJeepTours(file: File): Promise<{
  success?: string;
  error?: string;
}> {
  const buffer = await file.arrayBuffer();
  const XLSX = await import('xlsx');
  const workbook = XLSX.read(buffer, { type: 'array' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = XLSX.utils.sheet_to_json(sheet) as Record<string, any>[];

  const validJeepTours = [];

  for (const row of jsonData) {
    const parsed = jeepTourImportSchema.safeParse({
      nama: row['Nama'] ?? '',
      lokasi: row['Lokasi'] ?? '',
      harga: Number(row['Harga'] ?? 0),
      kapasitas: Number(row['Kapasitas'] ?? 0),
      rute: row['Rute'] ?? '',
      durasi: Number(row['Durasi'] ?? 0),
      fasilitas: row['Fasilitas'] ?? undefined,
      vendorId: row['VendorID'] ?? '',
    });

    if (!parsed.success) {
      return {
        error: `Validasi gagal pada baris: ${JSON.stringify(row)}.`,
      };
    }

    const { nama, lokasi, harga, kapasitas, rute, durasi, fasilitas, vendorId } = parsed.data;

    // Pastikan vendor valid
    const vendor = await prisma.user.findUnique({
      where: { id: vendorId },
    });

    if (!vendor || vendor.role !== 'VENDOR') {
      return {
        error: `Vendor tidak valid atau tidak ditemukan (ID: ${vendorId})`,
      };
    }

    validJeepTours.push({
      nama,
      lokasi,
      harga,
      kapasitas,
      rute,
      durasi,
      fasilitas,
      vendorId,
      deskripsi: 'Deskripsi default hasil import',
      gambarUrl: 'https://via.placeholder.com/300x200?text=Imported',
    });
  }

  await prisma.jeepTour.createMany({
    data: validJeepTours,
  });

  revalidatePath('/admin/jeep');
  return { success: 'Import Jeep Tour berhasil disimpan' };
}
