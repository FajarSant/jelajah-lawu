"use client";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export type VillaExportData = {
  id: string;
  nama: string;
  lokasi: string;
  harga: number;
  kapasitas: number;
  deskripsi: string;
  fasilitas: string | null;
  gambarUrl: string;
  vendorNama: string;
  vendorId: string;
  createdAt: string | Date;
};

export function exportVillas(data: VillaExportData[]) {
  const formattedData = data.map((item) => ({
    Nama: item.nama,
    Lokasi: item.lokasi,
    Harga: item.harga,
    Deskripsi: item.deskripsi,
    Kapasitas: item.kapasitas,
    Fasilitas: item.fasilitas,
    GambarUrl: item.gambarUrl,
    VendorID: item.vendorId,
    VendorNama: item.vendorNama,
  }));

  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Villa");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

  saveAs(blob, `Export_Villa_${new Date().toISOString().slice(0, 10)}.xlsx`);
}
