'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

//
// ─── SCHEMA VALIDASI ───────────────────────────────────────────────────────────
//

const destinasiSchema = z.object({
  nama: z.string().min(2, 'Nama destinasi harus diisi'),
  lokasi: z.string().min(2, 'Lokasi harus diisi'),
  harga: z.number().min(0, 'Harga tidak boleh negatif'),
  deskripsi: z.string().min(10, 'Deskripsi minimal 10 karakter'),
  gambarUrl: z.string().url('URL gambar tidak valid'),
  vendorId: z.string().min(1, { message: "Vendor wajib dipilih" }),
});

//
// ─── TAMBAH DESTINASI ──────────────────────────────────────────────────────────
//

export async function tambahDestinasi(formData: FormData) {
  const parsed = destinasiSchema.safeParse({
    nama: formData.get('nama'),
    lokasi: formData.get('lokasi'),
    harga: Number(formData.get('harga')),
    deskripsi: formData.get('deskripsi'),
    gambarUrl: formData.get('gambarUrl'),
    vendorId: formData.get('vendorId'),
  });

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const data = parsed.data;

  await prisma.destinasi.create({ data });

  revalidatePath('/admin/destinasi');
  return { success: 'Destinasi berhasil ditambahkan' };
}

//
// ─── EDIT DESTINASI ────────────────────────────────────────────────────────────
//

export async function editDestinasi(id: string, formData: FormData) {
  const parsed = destinasiSchema.safeParse({
    nama: formData.get('nama'),
    lokasi: formData.get('lokasi'),
    harga: Number(formData.get('harga')),
    deskripsi: formData.get('deskripsi'),
    gambarUrl: formData.get('gambarUrl'),
    vendorId: formData.get('vendorId'),
  });

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const data = parsed.data;

  await prisma.destinasi.update({
    where: { id },
    data,
  });

  revalidatePath('/admin/destinasi');
  return { success: 'Destinasi berhasil diperbarui' };
}

//
// ─── AMBIL DETAIL DESTINASI ────────────────────────────────────────────────────
//

export async function getDetailDestinasi(id: string) {
  const destinasi = await prisma.destinasi.findUnique({
    where: { id },
    include: {
      vendor: { select: { id: true, name: true } },
    },
  });

  if (!destinasi) return null;

  return {
    id: destinasi.id,
    nama: destinasi.nama,
    lokasi: destinasi.lokasi,
    harga: destinasi.harga,
    deskripsi: destinasi.deskripsi,
    gambarUrl: destinasi.gambarUrl,
    vendorId: destinasi.vendor?.id ?? '',
    vendorNama: destinasi.vendor?.name ?? '',
    createdAt: destinasi.createdAt,
  };
}

//
// ─── HAPUS DESTINASI ───────────────────────────────────────────────────────────
//

export async function hapusDestinasi(id: string) {
  await prisma.destinasi.delete({
    where: { id },
  });

  revalidatePath('/admin/destinasi');
  return { success: 'Destinasi berhasil dihapus' };
}
//
// ─── AMBIL SEMUA VENDOR ────────────────────────────────────────────────────────
//

export async function getAllVendors() {
  const vendors = await prisma.user.findMany({
    where: {
      role: 'VENDOR',
      name: { not: null },
    },
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: 'asc',
    },
  });

  return vendors.map((v) => ({
    id: v.id,
    name: v.name ?? 'Tanpa Nama',
  }));
}
