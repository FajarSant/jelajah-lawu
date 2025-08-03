'use server';

import { prisma } from '@/lib/prisma';
import { format } from 'date-fns';

export async function getDestinationDashboardData() {
  // Statistik umum
  const [totalDestinasi, avgHarga, totalReview, totalFavorit, totalBooking] = await Promise.all([
    prisma.destinasi.count(),
    prisma.destinasi.aggregate({ _avg: { harga: true } }),
    prisma.review.count({ where: { destinasiId: { not: null } } }),
    prisma.favorite.count({ where: { destinasiId: { not: null } } }),
    prisma.booking.count({ where: { destinasiId: { not: null } } }),
  ]);

  // 5 destinasi terbaru
  const destinasiBaru = await prisma.destinasi.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: {
      vendor: { select: { name: true } },
      reviews: { select: { id: true } },
      favorites: { select: { id: true } },
    },
  });

  const formattedDestinations = destinasiBaru.map((d) => ({
    id: d.id,
    nama: d.nama,
    lokasi: d.lokasi,
    harga: d.harga,
    vendorNama: d.vendor?.name ?? '-',
    totalUlasan: d.reviews.length,
    totalFavorit: d.favorites.length,
    createdAt: d.createdAt,
  }));

  // 5 ulasan terbaru untuk destinasi
  const recentReviews = await prisma.review.findMany({
    where: { destinasiId: { not: null } },
    include: {
      user: { select: { name: true } },
      destinasi: { select: { nama: true } },
    },
    orderBy: { createdAt: 'desc' },
    take: 5,
  });

  const formattedReviews = recentReviews.map((r) => ({
    id: r.id,
    komentar: r.komentar ?? '',
    nilai: r.nilai,
    createdAt: r.createdAt,
    user: { name: r.user.name },
    destinasi: { nama: r.destinasi?.nama || 'Tidak diketahui' },
  }));

  return {
    statistik: {
      totalDestinasi,
      rataRataHarga: avgHarga._avg.harga || 0,
      totalReview,
      totalFavorit,
      totalBooking,
    },
    destinasiBaru: formattedDestinations,
    ulasanBaru: formattedReviews,
  };
}
