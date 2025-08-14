"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth"; // Pastikan path sesuai

// Role yang diizinkan
const ALLOWED_ROLES = ["ADMIN", "VENDOR"] as const;

async function requireRole() {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  if (!ALLOWED_ROLES.includes(session.user.role as typeof ALLOWED_ROLES[number])) {
    throw new Error("Forbidden");
  }

  return session;
}

export async function getFavoriteDashboardStats() {
  try {
    await requireRole(); // 🔒 Cek role

    const totalFavorite = await prisma.favorite.count();

    const totalDestinasi = await prisma.favorite.count({ where: { tipe: "DESTINASI" } });
    const totalJeep = await prisma.favorite.count({ where: { tipe: "JEEP" } });
    const totalVilla = await prisma.favorite.count({ where: { tipe: "VILLA" } });
    const totalRestoran = await prisma.favorite.count({ where: { tipe: "RESTORAN" } });

    return {
      success: true,
      data: {
        totalFavorite,
        totalPerKategori: {
          destinasi: totalDestinasi,
          jeep: totalJeep,
          villa: totalVilla,
          restoran: totalRestoran,
        },
      },
    };
  } catch (error) {
    console.error("Gagal mengambil statistik favorit:", error);
    return { success: false, error: "Gagal mengambil statistik favorit" };
  }
}

export async function getLatestFavorites(limit: number = 10) {
  try {
    await requireRole(); // 🔒 Cek role

    const favorites = await prisma.favorite.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
      include: {
        user: { select: { name: true } },
        destinasi: { select: { nama: true } },
        jeepTour: { select: { nama: true } },
        villa: { select: { nama: true } },
        restoran: { select: { nama: true } },
      },
    });

    const formatted = favorites.map((fav) => {
      let namaItem = "";

      switch (fav.tipe) {
        case "DESTINASI":
          namaItem = fav.destinasi?.nama || "-";
          break;
        case "JEEP":
          namaItem = fav.jeepTour?.nama || "-";
          break;
        case "VILLA":
          namaItem = fav.villa?.nama || "-";
          break;
        case "RESTORAN":
          namaItem = fav.restoran?.nama || "-";
          break;
        default:
          namaItem = "-";
      }

      return {
        id: fav.id,
        namaUser: fav.user?.name || "Pengguna",
        kategori: fav.tipe,
        namaItem,
        tanggal: fav.createdAt,
      };
    });

    return { success: true, data: formatted };
  } catch (error) {
    console.error("Gagal mengambil favorit terbaru:", error);
    return { success: false, error: "Gagal mengambil favorit terbaru" };
  }
}
