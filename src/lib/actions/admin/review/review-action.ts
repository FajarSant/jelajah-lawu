"use server";

import { prisma } from "@/lib/prisma";

// Statistik Review
export async function getReviewDashboardStats() {
  try {
    const totalReview = await prisma.review.count();

    // Hitung per kategori berdasarkan enum tipe
    const totalDestinasi = await prisma.review.count({ where: { tipe: "DESTINASI" } });
    const totalJeep = await prisma.review.count({ where: { tipe: "JEEP" } });
    const totalVilla = await prisma.review.count({ where: { tipe: "VILLA" } });
    const totalRestoran = await prisma.review.count({ where: { tipe: "RESTORAN" } });

    // Rata-rata nilai
    const avgNilai = await prisma.review.aggregate({
      _avg: { nilai: true },
    });

    return {
      success: true,
      data: {
        totalReview,
        totalPerKategori: {
          destinasi: totalDestinasi,
          jeep: totalJeep,
          villa: totalVilla,
          restoran: totalRestoran,
        },
        rataRataNilai: Number(avgNilai._avg.nilai?.toFixed(2)) || 0,
      },
    };
  } catch (error) {
    console.error("Gagal mengambil statistik review:", error);
    return { success: false, error: "Gagal mengambil statistik review" };
  }
}

// Review Terbaru
export async function getLatestReviews(limit: number = 10) {
  try {
    const reviews = await prisma.review.findMany({
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

    const formatted = reviews.map((review) => {
      let namaItem = "";

      switch (review.tipe) {
        case "DESTINASI":
          namaItem = review.destinasi?.nama || "-";
          break;
        case "JEEP":
          namaItem = review.jeepTour?.nama || "-";
          break;
        case "VILLA":
          namaItem = review.villa?.nama || "-";
          break;
        case "RESTORAN":
          namaItem = review.restoran?.nama || "-";
          break;
        default:
          namaItem = "-";
      }

      return {
        id: review.id,
        namaUser: review.user?.name || "Pengguna",
        kategori: review.tipe,
        namaItem,
        nilai: review.nilai,
        komentar: review.komentar || "",
        tanggal: review.createdAt,
      };
    });

    return { success: true, data: formatted };
  } catch (error) {
    console.error("Gagal mengambil review terbaru:", error);
    return { success: false, error: "Gagal mengambil review terbaru" };
  }
}
