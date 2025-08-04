'use client';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

type DestinationExportData = {
  nama: string;
  lokasi: string;
  harga: number;
  deskripsi: string;
  gambarUrl: string;
  vendorId: string;
  vendorNama: string;
};

export function exportDestinations(data: DestinationExportData[]) {
  const formattedData = data.map((item) => ({
    Nama: item.nama,
    Lokasi: item.lokasi,
    Harga: item.harga,
    Deskripsi: item.deskripsi,
    GambarUrl: item.gambarUrl,
    VendorID: item.vendorId,
    VendorNama: item.vendorNama,
  }));

  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Destinasi');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

  saveAs(blob, `Export_Destination_${new Date().toISOString().slice(0, 10)}.xlsx`);
}
