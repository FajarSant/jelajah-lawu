'use client';

import { Button } from "@/components/ui/button";
import { Upload, Download } from "lucide-react";
import Swal from "sweetalert2";
import { exportVillas } from "@/lib/actions/admin/export/VillaExport";
import { importVillas } from "@/lib/actions/admin/import/VillaImport";
import type { VillaExportData } from "@/lib/actions/admin/export/VillaExport"; // ✅ Gunakan tipe dari file asli

type ImportExportButtonsProps = {
  data: VillaExportData[];
  disabled?: boolean;
};

export function ImportExportVillaButtons({
  data,
  disabled = false,
}: ImportExportButtonsProps) {
  const handleExport = () => {
    if (data.length === 0) {
      Swal.fire("Tidak ada data!", "Data tidak tersedia untuk diekspor.", "info");
      return;
    }

    exportVillas(data);
  };

  const handleImport = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".xlsx, .xls";

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      try {
        const res = await importVillas(file);

        if (res?.error) {
          Swal.fire("Gagal!", res.error, "error");
        } else {
          Swal.fire("Berhasil!", res?.success ?? "Import berhasil", "success").then(() => {
            window.location.reload();
          });
        }
      } catch (err) {
        Swal.fire("Gagal!", "Terjadi kesalahan saat mengimpor file.", "error");
        console.error(err);
      }
    };

    input.click();
  };

  return (
    <div className="flex gap-2">
      <Button variant="outline" onClick={handleImport} disabled={disabled}>
        <Upload className="w-4 h-4 mr-2" />
        Import
      </Button>
      <Button variant="outline" onClick={handleExport} disabled={disabled}>
        <Download className="w-4 h-4 mr-2" />
        Export
      </Button>
    </div>
  );
}
