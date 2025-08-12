"use server";

import { prisma } from "@/lib/prisma";

export async function getBookingDashboardStats() {
  try {
    const totalBooking = await prisma.booking.count();

    const totalPerKategori = {
      destinasi: await prisma.booking.count({
        where: { destinasiId: { not: null } },
      }),
      jeep: await prisma.booking.count({
        where: { jeepTourId: { not: null } },
      }),
      villa: await prisma.booking.count({ where: { villaId: { not: null } } }),
      restoran: await prisma.booking.count({
        where: { restoranId: { not: null } },
      }),
    };

    const totalPerStatus = {
      DIPROSES: await prisma.booking.count({ where: { status: "DIPROSES" } }),
      SELESAI: await prisma.booking.count({ where: { status: "SELESAI" } }),
      DIBATALKAN: await prisma.booking.count({
        where: { status: "DIBATALKAN" },
      }),
    };

    return {
      data: {
        totalBooking,
        totalPerKategori,
        totalPerStatus,
      },
    };
  } catch (error) {
    console.error("Error fetching booking dashboard stats:", error);
    return { data: null };
  }
}

export async function getLatestBookings(limit: number = 10) {
  try {
    const bookings = await prisma.booking.findMany({
      take: limit,
      orderBy: { tanggal: "desc" },
      include: {
        user: true,
        destinasi: true,
        jeepTour: true,
        villa: true,
        restoran: true,
      },
    });

    const mapped = bookings.map((b) => ({
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

    return { data: mapped };
  } catch (error) {
    console.error("Error fetching latest bookings:", error);
    return { data: [] };
  }
}
