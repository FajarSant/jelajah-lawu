'use server';

import { prisma } from '@/lib/prisma';

export type DestinationExportData = {
  nama: string;
  lokasi: string;
  harga: number;
  deskripsi: string;
  gambarUrl: string;
  vendorId: string;
  vendorNama: string;
};

export async function getAllDestinasiForExport(): Promise<DestinationExportData[]> {
  try {
    const destinasi = await prisma.destinasi.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        vendor: { select: { name: true } },
      },
    });

    return destinasi.map((d) => ({
      nama: d.nama,
      lokasi: d.lokasi,
      harga: d.harga,
      deskripsi: d.deskripsi,
      gambarUrl: d.gambarUrl,
      vendorId: d.vendorId,
      vendorNama: d.vendor?.name ?? '-',
    }));
  } catch (error) {
    console.error('Gagal mengambil data destinasi:', error);
    return []; 
  }
}
