"use server";

import { prisma } from "@/lib/prisma";

export async function getDestinationDashboardData() {
  // Statistik umum
  const [totalDestinasi, avgHarga, totalReview, totalFavorit, totalBooking] =
    await Promise.all([
      prisma.destinasi.count(),
      prisma.destinasi.aggregate({ _avg: { harga: true } }),
      prisma.review.count({ where: { destinasiId: { not: null } } }),
      prisma.favorite.count({ where: { destinasiId: { not: null } } }),
      prisma.booking.count({ where: { destinasiId: { not: null } } }),
    ]);

  // Ambil 10 destinasi terbaru
  const daftarDestinasi = await prisma.destinasi.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
    include: {
      vendor: { select: { name: true } },
    },
  });

  return {
    statistik: {
      totalDestinasi,
      rataRataHarga: avgHarga._avg.harga || 0,
      totalReview,
      totalFavorit,
      totalBooking,
    },
    destinasi: daftarDestinasi.map((d) => ({
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
