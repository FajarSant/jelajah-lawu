"use server";

import { prisma } from "@/lib/prisma";

export async function getJeepDashboardData() {
  // Statistik Jeep Tour
  const [totalJeepTour, avgHarga, totalBooking, totalPendapatan] = await Promise.all([
    prisma.jeepTour.count(),
    prisma.jeepTour.aggregate({ _avg: { harga: true } }),
    prisma.booking.count({ where: { jeepTourId: { not: null } } }),
    prisma.booking.aggregate({
      _sum: { totalHarga: true },
      where: { jeepTourId: { not: null } },
    }),
  ]);

  // Jeep Tour terbaru (10 data terakhir)
  const daftarJeepTour = await prisma.jeepTour.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
    include: {
      vendor: { select: { name: true } },
    },
  });

  // Ulasan terbaru khusus Jeep Tour
  const daftarUlasan = await prisma.review.findMany({
    where: {
      jeepTourId: { not: null },
      tipe: "JEEP", // hanya tipe ulasan Jeep
    },
    take: 10,
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true } },
      jeepTour: { select: { nama: true } },
    },
  });

  return {
    statistik: {
      totalJeepTour,
      rataRataHarga: avgHarga._avg.harga || 0,
      totalBooking,
      totalPendapatan: totalPendapatan._sum.totalHarga || 0,
    },
    jeepTourTerbaru: daftarJeepTour.map((j) => ({
      id: j.id,
      nama: j.nama,
      deskripsi: j.deskripsi,
      lokasi: j.lokasi,
      kapasitas: j.kapasitas,
      rute: j.rute,
      durasi: j.durasi,
      gambarUrl: j.gambarUrl,
      fasilitas: j.fasilitas,
      harga: j.harga,
      vendorId: j.vendorId,
      vendorNama: j.vendor?.name ?? "-",
      createdAt: j.createdAt,
    })),
    ulasanTerbaru: daftarUlasan.map((u) => ({
      namaUser: u.user?.name ?? "-",
      jeepTourNama: u.jeepTour?.nama ?? "-",
      rating: u.nilai,
      komentar: u.komentar,
      createdAt: u.createdAt,
    })),
  };
}
