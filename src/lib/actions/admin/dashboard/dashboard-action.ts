"use server";

import { prisma } from "@/lib/prisma";
import { startOfYear, endOfYear } from "date-fns";
import { auth } from "@/lib/auth";

// Proteksi role admin
async function requireAdmin() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized: hanya ADMIN yang boleh mengakses");
  }
  return session.user;
}

// Ambil statistik dashboard
export async function getAdminStats() {
  try {
    await requireAdmin();

    const totalPengguna = await prisma.user.count();
    const totalBooking = await prisma.booking.count();
    const totalPendapatan = await prisma.booking.aggregate({
      _sum: { totalHarga: true },
      where: { status: "SELESAI" },
    });
    const ratingResult = await prisma.review.aggregate({ _avg: { nilai: true } });

    return {
      success: true,
      data: {
        totalPengguna,
        totalBooking,
        totalPendapatan: totalPendapatan._sum.totalHarga || 0,
        totalRating: Number(ratingResult._avg.nilai?.toFixed(1)) || 0,
      },
    };
  } catch (error) {
    console.error("Error getAdminStats:", error);
    return {
      success: false,
      data: { totalPengguna: 0, totalBooking: 0, totalPendapatan: 0, totalRating: 0 },
      message: "Gagal mengambil statistik admin",
    };
  }
}

// Ambil data booking bulanan
export async function getMonthlyBooking() {
  try {
    await requireAdmin();

    const now = new Date();
    const start = startOfYear(now);
    const end = endOfYear(now);

    const bookings = await prisma.booking.findMany({
      where: { tanggal: { gte: start, lte: end } },
      select: { tanggal: true },
    });

    const monthlyCounts = new Array(12).fill(0);
    bookings.forEach((b) => {
      const month = new Date(b.tanggal).getMonth();
      monthlyCounts[month]++;
    });

    const namaBulan = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];
    return { success: true, data: namaBulan.map((nama, i) => ({ month: nama, total: monthlyCounts[i] })) };
  } catch (error) {
    console.error("Gagal mengambil data booking bulanan:", error);
    return { success: false, data: [], message: "Unauthorized" };
  }
}

// Ambil data kategori favorit
export async function getFavoriteCategory() {
  try {
    await requireAdmin();

    const counts = await prisma.favorite.groupBy({
      by: ['tipe'],
      _count: { _all: true },
    });

    const formatted = counts.map((item) => ({
      name: formatTipeFavorit(item.tipe),
      value: item._count._all,
    }));

    return { success: true, data: formatted };
  } catch (error) {
    console.error("Gagal mengambil data kategori favorit:", error);
    return { success: false, message: "Gagal mengambil data kategori favorit" };
  }
}

// Format tipe favorit user-friendly
function formatTipeFavorit(tipe: string): string {
  switch (tipe) {
    case "JeepTour": return "Jeep Tour";
    case "Villa": return "Villa";
    case "Restoran": return "Restoran";
    case "Destinasi": return "Destinasi";
    default: return tipe;
  }
}
