'use client';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

type JeepTourExportData = {
  nama: string;
  lokasi: string;
  harga: number;
  deskripsi: string;
  kapasitas: number;
  rute: string;
  durasi: number;
  fasilitas?: string | null;
  gambarUrl: string;
  vendorId: string;
  vendorNama: string;
};

export function exportJeepTours(data: JeepTourExportData[]) {
  const formattedData = data.map((item) => ({
    Nama: item.nama,
    Lokasi: item.lokasi,
    Harga: item.harga,
    Deskripsi: item.deskripsi,
    Kapasitas: item.kapasitas,
    Rute: item.rute,
    Durasi: item.durasi,
    Fasilitas: item.fasilitas || '',
    GambarUrl: item.gambarUrl,
    VendorID: item.vendorId,
    VendorNama: item.vendorNama,
  }));

  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, 'JeepTour');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

  saveAs(blob, `Export_JeepTour_${new Date().toISOString().slice(0, 10)}.xlsx`);
}
