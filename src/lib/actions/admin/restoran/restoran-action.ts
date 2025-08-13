"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/lib/auth";

// ─── VALIDASI SCHEMA ────────────────────────────────────────────────────────────
const RestoranSchema = z.object({
  nama: z.string().trim().min(2, { message: "Nama restoran wajib diisi" }),
  deskripsi: z
    .string()
    .trim()
    .min(10, { message: "Deskripsi minimal 10 karakter" }),
  lokasi: z.string().trim().min(2, { message: "Lokasi wajib diisi" }),
  fasilitas: z.string().trim().optional(),
  hargaRata: z.coerce
    .number()
    .min(0, { message: "Harga rata-rata harus angka positif" }),
  jenisMakanan: z.string().trim().optional(),
  jamBuka: z.string().trim().optional(),
  jamTutup: z.string().trim().optional(),
  gambarUrl: z.string().url({ message: "URL gambar tidak valid" }),
  vendorId: z.string().min(1, { message: "Vendor wajib dipilih" }),
  isApproved: z.coerce.boolean().optional(),
});

// ─── CEK ROLE ───────────────────────────────────────────────────────────────────
async function requireRole(roles: string[]) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  if (!roles.includes(session.user.role)) {
    throw new Error("Forbidden");
  }
  return session.user;
}

// ─── CREATE ─────────────────────────────────────────────────────────────────────
export async function tambahRestoran(form: FormData) {
  const user = await requireRole(["ADMIN", "VENDOR"]);

  const formData = {
    nama: form.get("nama"),
    deskripsi: form.get("deskripsi"),
    lokasi: form.get("lokasi"),
    fasilitas: form.get("fasilitas"),
    hargaRata: form.get("hargaRata"),
    jenisMakanan: form.get("jenisMakanan"),
    jamBuka: form.get("jamBuka"),
    jamTutup: form.get("jamTutup"),
    gambarUrl: form.get("gambarUrl"),
    vendorId: user.role === "VENDOR" ? user.id : form.get("vendorId"),
    isApproved: form.get("isApproved") === "true",
  };

  const parsed = RestoranSchema.safeParse(formData);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  await prisma.restoran.create({ data: parsed.data });
  revalidatePath("/admin/restoran");
  return { success: "Restoran berhasil ditambahkan" };
}

// ─── GET ALL ────────────────────────────────────────────────────────────────────
export async function getAllRestoran() {
  const user = await requireRole(["ADMIN", "VENDOR"]);

  const whereCondition =
    user.role === "VENDOR" ? { vendorId: user.id } : {};

  const data = await prisma.restoran.findMany({
    where: whereCondition,
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
    orderBy: { createdAt: "desc" },
  });

  return data.map((r) => ({
    ...r,
    vendorNama: r.vendor?.name ?? "-",
    createdAt: r.createdAt.toISOString(),
    updatedAt: r.updatedAt.toISOString(),
  }));
}

// ─── GET BY ID ──────────────────────────────────────────────────────────────────
export async function getRestoranById(id: string) {
  const user = await requireRole(["ADMIN", "VENDOR"]);
  const data = await prisma.restoran.findUnique({ where: { id } });

  if (!data) return null;

  if (user.role === "VENDOR" && data.vendorId !== user.id) {
    throw new Error("Forbidden");
  }

  return {
    ...data,
    createdAt: data.createdAt.toISOString(),
    updatedAt: data.updatedAt.toISOString(),
  };
}

// ─── UPDATE ─────────────────────────────────────────────────────────────────────
export async function updateRestoran(id: string, form: FormData) {
  const user = await requireRole(["ADMIN", "VENDOR"]);

  const existing = await prisma.restoran.findUnique({ where: { id } });
  if (!existing) {
    return { success: false, error: "Restoran tidak ditemukan" };
  }

  if (user.role === "VENDOR" && existing.vendorId !== user.id) {
    return { success: false, error: "Tidak diizinkan" };
  }

  const formData = {
    nama: form.get("nama"),
    deskripsi: form.get("deskripsi"),
    lokasi: form.get("lokasi"),
    fasilitas: form.get("fasilitas"),
    hargaRata: form.get("hargaRata"),
    jenisMakanan: form.get("jenisMakanan"),
    jamBuka: form.get("jamBuka"),
    jamTutup: form.get("jamTutup"),
    gambarUrl: form.get("gambarUrl"),
    vendorId: user.role === "VENDOR" ? user.id : form.get("vendorId"),
    isApproved: form.get("isApproved") === "true",
  };

  const parsed = RestoranSchema.safeParse(formData);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  await prisma.restoran.update({ where: { id }, data: parsed.data });
  revalidatePath("/admin/restoran");
  return { success: true };
}

// ─── DELETE ─────────────────────────────────────────────────────────────────────
export async function hapusRestoran(id: string) {
  const user = await requireRole(["ADMIN", "VENDOR"]);

  const existing = await prisma.restoran.findUnique({ where: { id } });
  if (!existing) {
    return { success: false, error: "Restoran tidak ditemukan" };
  }

  if (user.role === "VENDOR" && existing.vendorId !== user.id) {
    return { success: false, error: "Tidak diizinkan" };
  }

  await prisma.restoran.delete({ where: { id } });
  revalidatePath("/admin/restoran");
  return { success: true };
}

// ─── DASHBOARD DATA ─────────────────────────────────────────────────────────────
export async function getRestoranDashboardData() {
  const user = await requireRole(["ADMIN", "VENDOR"]);

  const whereCondition =
    user.role === "VENDOR" ? { vendorId: user.id } : {};

  const totalRestoran = await prisma.restoran.count({
    where: whereCondition,
  });

  const rataRataHarga = await prisma.restoran.aggregate({
    _avg: { hargaRata: true },
    where: whereCondition,
  });

  const totalBooking = await prisma.booking.count({
    where: { restoranId: { not: null }, ...whereCondition },
  });

  const totalPendapatan = await prisma.booking.aggregate({
    _sum: { totalHarga: true },
    where: { restoranId: { not: null }, ...whereCondition },
  });

  const restoranTerbaru = await prisma.restoran.findMany({
    take: 5,
    where: whereCondition,
    orderBy: { createdAt: "desc" },
    include: {
      vendor: { select: { id: true, name: true, email: true } },
    },
  });

  const ulasanTerbaru = await prisma.review.findMany({
    where: { restoranId: { not: null }, restoran: whereCondition },
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { id: true, name: true, email: true } },
      restoran: { select: { id: true, nama: true } },
    },
  });

  const restoranRaw = await prisma.restoran.findMany({
    where: whereCondition,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      nama: true,
      deskripsi: true,
      lokasi: true,
      fasilitas: true,
      hargaRata: true,
      jenisMakanan: true,
      jamBuka: true,
      jamTutup: true,
      gambarUrl: true,
      vendorId: true,
      isApproved: true,
      createdAt: true,
      updatedAt: true,
      vendor: { select: { id: true, name: true } },
      _count: { select: { bookings: true, reviews: true } },
    },
  });

  const restorant = restoranRaw.map((r) => ({
    ...r,
    vendorNama: r.vendor?.name ?? "-",
  }));

  return {
    statistik: {
      totalRestoran,
      rataRataHargaMenu: rataRataHarga._avg.hargaRata ?? 0,
      totalBooking,
      totalPendapatan: totalPendapatan._sum.totalHarga ?? 0,
    },
    restorant,
    restoranTerbaru,
    ulasanTerbaru,
  };
}

// ─── GET ALL VENDOR ─────────────────────────────────────────────────────────────
export async function getAllVendors() {
  await requireRole(["ADMIN"]);
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
