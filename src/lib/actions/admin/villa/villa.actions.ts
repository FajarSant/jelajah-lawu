"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// ─── VALIDASI SCHEMA ────────────────────────────────────────────────────────────
const VillaSchema = z.object({
  nama: z.string().min(2, { message: "Nama wajib diisi" }),
  lokasi: z.string().min(2, { message: "Lokasi wajib diisi" }),
  harga: z.coerce.number().min(0, { message: "Harga harus berupa angka positif" }),
  deskripsi: z.string().min(10, { message: "Deskripsi minimal 10 karakter" }),
  gambarUrl: z.string().url({ message: "URL gambar tidak valid" }),
  kapasitas: z.coerce.number().min(1, { message: "Kapasitas minimal 1 orang" }),
  fasilitas: z.string().optional(),
  vendorId: z.string().min(1, { message: "Vendor wajib dipilih" }),
});

// ─── CREATE ─────────────────────────────────────────────────────────────────────
export async function tambahVilla(form: FormData) {
  const formData = {
    nama: form.get("nama"),
    lokasi: form.get("lokasi"),
    harga: form.get("harga"),
    deskripsi: form.get("deskripsi"),
    gambarUrl: form.get("gambarUrl"),
    kapasitas: form.get("kapasitas"),
    fasilitas: form.get("fasilitas"),
    vendorId: form.get("vendorId"),
  };

  const parsed = VillaSchema.safeParse(formData);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const data = parsed.data;

  await prisma.villa.create({ data });
  revalidatePath("/admin/villa");
  return { success: "Villa berhasil ditambahkan" };
}

// ─── GET ALL ────────────────────────────────────────────────────────────────────
export async function getAllVilla() {
  const data = await prisma.villa.findMany({
    include: {
      vendor: { select: { name: true } },
      _count: {
        select: {
          bookings: true,
          reviews: true,
          favorites: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data.map((v) => ({
    ...v,
    vendorNama: v.vendor?.name ?? "-",
    createdAt: v.createdAt.toISOString(),
    updatedAt: v.updatedAt.toISOString(),
  }));
}

// ─── GET BY ID ──────────────────────────────────────────────────────────────────
export async function getVillaById(id: string) {
  const data = await prisma.villa.findUnique({ where: { id } });
  if (!data) return null;

  return {
    ...data,
    createdAt: data.createdAt.toISOString(),
    updatedAt: data.updatedAt.toISOString(),
  };
}

// ─── UPDATE ─────────────────────────────────────────────────────────────────────
export async function updateVilla(id: string, form: FormData) {
  try {
    const formData = {
      nama: form.get("nama"),
      lokasi: form.get("lokasi"),
      harga: form.get("harga"),
      deskripsi: form.get("deskripsi"),
      gambarUrl: form.get("gambarUrl"),
      kapasitas: form.get("kapasitas"),
      fasilitas: form.get("fasilitas"),
      vendorId: form.get("vendorId"),
    };

    const parsed = VillaSchema.safeParse(formData);
    if (!parsed.success) {
      return { error: parsed.error.flatten().fieldErrors };
    }

    const data = parsed.data;

    await prisma.villa.update({ where: { id }, data });
    revalidatePath("/admin/villa");
    return { success: true };
  } catch (error) {
    console.error("Gagal update Villa:", error);
    return { success: false, error: "Gagal memperbarui Villa" };
  }
}

// ─── DELETE ─────────────────────────────────────────────────────────────────────
export async function hapusVilla(id: string) {
  try {
    await prisma.villa.delete({ where: { id } });
    revalidatePath("/admin/villa");
    return { success: true };
  } catch (error) {
    console.error("Gagal hapus Villa:", error);
    return { success: false, error: "Gagal menghapus Villa" };
  }
}

// ─── DASHBOARD DATA ─────────────────────────────────────────────────────────────
export async function getVillaDashboardData() {
  const totalVilla = await prisma.villa.count();

  const rataRataHarga = await prisma.villa.aggregate({
    _avg: { harga: true },
  });

  const totalBooking = await prisma.booking.count({
    where: { villaId: { not: null } },
  });

  const totalPendapatan = await prisma.booking.aggregate({
    _sum: { totalHarga: true },
    where: { villaId: { not: null } },
  });

  const villaTerbaru = await prisma.villa.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      vendor: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  const ulasanTerbaru = await prisma.review.findMany({
    where: { villaId: { not: null } },
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      villa: {
        select: {
          id: true,
          nama: true,
        },
      },
    },
  });

  const villasRaw = await prisma.villa.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      nama: true,
      deskripsi: true,
      lokasi: true,
      gambarUrl: true,
      harga: true,
      kapasitas: true,
      fasilitas: true,
      vendorId: true,
      createdAt: true,
      updatedAt: true,
      vendor: {
        select: {
          id: true,
          name: true,
        },
      },
      _count: {
        select: {
          bookings: true,
          reviews: true,
        },
      },
    },
  });

  const villas = villasRaw.map((villa) => ({
    ...villa,
    vendorNama: villa.vendor?.name ?? "-",
  }));

  return {
    statistik: {
      totalVilla,
      rataRataHarga: rataRataHarga._avg.harga ?? 0,
      totalBooking,
      totalPendapatan: totalPendapatan._sum.totalHarga ?? 0,
    },
    villaTerbaru,
    ulasanTerbaru,
    villas,
  };
}

// ─── GET ALL VENDOR ─────────────────────────────────────────────────────────────
export async function getAllVendors() {
  const vendors = await prisma.user.findMany({
    where: {
      role: "VENDOR",
      name: { not: null },
    },
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return vendors.map((v) => ({
    id: v.id,
    name: v.name ?? "Tanpa Nama",
  }));
}
