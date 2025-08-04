'use server';

import { prisma } from "@/lib/prisma";

export async function getAllJeepTour() {
  try {
    const jeepTours = await prisma.jeepTour.findMany({
      include: {
        vendor: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return jeepTours.map((jt) => ({
      id: jt.id,
      nama: jt.nama,
      lokasi: jt.lokasi,
      harga: jt.harga,
      deskripsi: jt.deskripsi,
      kapasitas: jt.kapasitas,
      rute: jt.rute,
      durasi: jt.durasi,
      gambarUrl: jt.gambarUrl,
      vendorId: jt.vendorId,
      vendorNama: jt.vendor?.name || "-",
      createdAt: jt.createdAt,
    }));
  } catch (error) {
    console.error("Gagal mengambil data jeep tour", error);
    return [];
  }
}
