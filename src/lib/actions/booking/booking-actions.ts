"use server";

import { prisma } from "@/lib/prisma";

export async function getBookingDashboardData() {
  const totalBooking = await prisma.booking.count();

  const totalPerKategori = {
    destinasi: await prisma.booking.count({ where: { destinasiId: { not: null } } }),
    jeep: await prisma.booking.count({ where: { jeepTourId: { not: null } } }),
    villa: await prisma.booking.count({ where: { villaId: { not: null } } }),
    restoran: await prisma.booking.count({ where: { restoranId: { not: null } } }),
  };

  const totalPerStatus = {
    diproses: await prisma.booking.count({ where: { status: "DIPROSES" } }),
    selesai: await prisma.booking.count({ where: { status: "SELESAI" } }),
    dibatalkan: await prisma.booking.count({ where: { status: "DIBATALKAN" } }),
  };

  const totalPendapatan = await prisma.booking.aggregate({
    _sum: { totalHarga: true },
  });

  const latestBookings = await prisma.booking.findMany({
    orderBy: { tanggal: "desc" },
    take: 10,
    include: {
      user: true,
      destinasi: true,
      jeepTour: true,
      villa: true,
      restoran: true,
    },
  });

  const bookings = latestBookings.map((b) => ({
    id: b.id,
    namaUser: b.user?.name ?? "-",
    kategori: b.destinasi
      ? "Destinasi"
      : b.jeepTour
      ? "Jeep"
      : b.villa
      ? "Villa"
      : b.restoran
      ? "Restoran"
      : "-",
    namaItem:
      b.destinasi?.nama ??
      b.jeepTour?.nama ??
      b.villa?.nama ??
      b.restoran?.nama ??
      "-",
    status: b.status,
    totalHarga: b.totalHarga,
    tanggal: b.tanggal,
  }));

  return {
    statistik: {
      totalBooking,
      totalPerKategori,
      totalPerStatus,
      totalPendapatan: totalPendapatan._sum.totalHarga ?? 0,
    },
    bookings,
  };
}
