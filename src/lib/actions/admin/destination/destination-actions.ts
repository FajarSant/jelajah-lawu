"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/lib/auth";

// ─── SCHEMA VALIDASI ───────────────────────────────────────────────────────────
const DestinasiSchema = z.object({
  nama: z.string().min(2, { message: "Nama destinasi harus diisi" }),
  lokasi: z.string().min(2, { message: "Lokasi harus diisi" }),
  harga: z.coerce.number().min(0, { message: "Harga harus positif" }),
  deskripsi: z.string().min(10, { message: "Deskripsi minimal 10 karakter" }),
  gambarUrl: z.string().url({ message: "URL gambar tidak valid" }),
  vendorId: z.string().min(1, { message: "Vendor wajib dipilih" }),
});

// ─── FUNGSI CEK ROLE ───────────────────────────────────────────────────────────
async function requireRole(allowedRoles: string[]) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  if (!allowedRoles.includes(session.user.role)) {
    throw new Error("Forbidden");
  }
  return session;
}

// ─── CREATE ────────────────────────────────────────────────────────────────────
export async function tambahDestinasi(form: FormData) {
  await requireRole(["ADMIN", "VENDOR"]);

  const formData = {
    nama: form.get("nama"),
    lokasi: form.get("lokasi"),
    harga: form.get("harga"),
    deskripsi: form.get("deskripsi"),
    gambarUrl: form.get("gambarUrl"),
    vendorId: form.get("vendorId"),
  };

  const parsed = DestinasiSchema.safeParse(formData);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  await prisma.destinasi.create({ data: parsed.data });
  revalidatePath("/admin/destinasi");
  return { success: "Destinasi berhasil ditambahkan" };
}

// ─── GET ALL ────────────────────────────────────────────────────────────────────
export async function getAllDestinasi() {
  const data = await prisma.destinasi.findMany({
    include: {
      vendor: { select: { name: true } },
      _count: { select: { bookings: true, reviews: true, favorites: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return data.map((d) => ({
    ...d,
    vendorNama: d.vendor?.name ?? "-",
    createdAt: d.createdAt.toISOString(),
    updatedAt: d.updatedAt.toISOString(),
  }));
}

// ─── GET BY ID ──────────────────────────────────────────────────────────────────
export async function getDestinasiById(id: string) {
  const destinasi = await prisma.destinasi.findUnique({
    where: { id },
    include: {
      vendor: { select: { id: true, name: true } },
    },
  });
  if (!destinasi) return null;

  return {
    ...destinasi,
    vendorNama: destinasi.vendor?.name ?? "-",
    createdAt: destinasi.createdAt.toISOString(),
    updatedAt: destinasi.updatedAt.toISOString(),
  };
}

// ─── UPDATE ─────────────────────────────────────────────────────────────────────
export async function updateDestinasi(id: string, form: FormData) {
  await requireRole(["ADMIN", "VENDOR"]);

  try {
    const formData = {
      nama: form.get("nama"),
      lokasi: form.get("lokasi"),
      harga: form.get("harga"),
      deskripsi: form.get("deskripsi"),
      gambarUrl: form.get("gambarUrl"),
      vendorId: form.get("vendorId"),
    };

    const parsed = DestinasiSchema.safeParse(formData);
    if (!parsed.success) {
      return { error: parsed.error.flatten().fieldErrors };
    }

    await prisma.destinasi.update({
      where: { id },
      data: parsed.data,
    });

    revalidatePath("/admin/destinasi");
    return { success: true };
  } catch (error) {
    console.error("Gagal update Destinasi:", error);
    return { success: false, error: "Gagal memperbarui destinasi" };
  }
}

// ─── DELETE ─────────────────────────────────────────────────────────────────────
export async function hapusDestinasi(id: string) {
  await requireRole(["ADMIN", "VENDOR"]);

  try {
    await prisma.destinasi.delete({ where: { id } });
    revalidatePath("/admin/destinasi");
    return { success: true };
  } catch (error) {
    console.error("Gagal hapus destinasi:", error);
    return { success: false, error: "Gagal menghapus destinasi" };
  }
}

// ─── DASHBOARD DATA ─────────────────────────────────────────────────────────────
export async function getDestinationDashboardData() {
  await requireRole(["ADMIN", "VENDOR"]);

  const [totalDestinasi, avgHarga, totalReview, totalFavorit, totalBooking] =
    await Promise.all([
      prisma.destinasi.count(),
      prisma.destinasi.aggregate({ _avg: { harga: true } }),
      prisma.review.count({ where: { destinasiId: { not: null } } }),
      prisma.favorite.count({ where: { destinasiId: { not: null } } }),
      prisma.booking.count({ where: { destinasiId: { not: null } } }),
    ]);

  const daftarDestinasi = await prisma.destinasi.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
    include: { vendor: { select: { name: true } } },
  });

  return {
    statistik: {
      totalDestinasi,
      rataRataHarga: avgHarga._avg.harga || 0,
      totalReview,
      totalFavorit,
      totalBooking,
    },
    destinasiTerbaru: daftarDestinasi.map((d) => ({
      id: d.id,
      nama: d.nama,
      lokasi: d.lokasi,
      harga: d.harga,
      vendorId: d.vendorId,
      deskripsi: d.deskripsi,
      gambarUrl: d.gambarUrl,
      vendorNama: d.vendor?.name ?? "-",
      createdAt: d.createdAt,
    })),
  };
}

// ─── EXPORT DATA ───────────────────────────────────────────────────────────────
export type DestinationExportData = {
  nama: string;
  lokasi: string;
  harga: number;
  deskripsi: string;
  gambarUrl: string;
  vendorId: string;
  vendorNama: string;
};

export async function getAllDestinasiForExport(): Promise<DestinationExportData[]> {
  await requireRole(["ADMIN", "VENDOR"]);

  try {
    const destinasi = await prisma.destinasi.findMany({
      orderBy: { createdAt: "desc" },
      include: { vendor: { select: { name: true } } },
    });

    return destinasi.map((d) => ({
      nama: d.nama,
      lokasi: d.lokasi,
      harga: d.harga,
      deskripsi: d.deskripsi,
      gambarUrl: d.gambarUrl,
      vendorId: d.vendorId,
      vendorNama: d.vendor?.name ?? "-",
    }));
  } catch (error) {
    console.error("Gagal mengambil data destinasi:", error);
    return [];
  }
}

// ─── GET ALL VENDOR ─────────────────────────────────────────────────────────────
export async function getAllVendors() {
  await requireRole(["ADMIN", "VENDOR"]);

  const vendors = await prisma.user.findMany({
    where: { role: "VENDOR", name: { not: null } },
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  return vendors.map((v) => ({
    id: v.id,
    name: v.name ?? "Tanpa Nama",
  }));
}
