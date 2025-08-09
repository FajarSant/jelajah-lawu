"use client";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export type RestoranExportData = {
  id: string;
  nama: string;
  lokasi: string;
  hargaRata: number;
  deskripsi: string;
  fasilitas: string | null;
  jenisMakanan: string | null;
  jamBuka: string | null;
  jamTutup: string | null;
  gambarUrl: string;
  vendorNama: string;
  vendorId: string;
  createdAt: string | Date;
};

export function exportRestoran(data: RestoranExportData[]) {
  const formattedData = data.map((item) => ({
    Nama: item.nama,
    Lokasi: item.lokasi,
    HargaRata: item.hargaRata,
    Deskripsi: item.deskripsi,
    Fasilitas: item.fasilitas,
    JenisMakanan: item.jenisMakanan,
    JamBuka: item.jamBuka,
    JamTutup: item.jamTutup,
    GambarUrl: item.gambarUrl,
    VendorID: item.vendorId,
    VendorNama: item.vendorNama,
  }));

  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Restoran");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

  saveAs(blob, `Export_Restoran_${new Date().toISOString().slice(0, 10)}.xlsx`);
}
