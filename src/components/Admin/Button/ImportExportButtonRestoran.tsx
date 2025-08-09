'use client';

import { Button } from "@/components/ui/button";
import { Upload, Download } from "lucide-react";
import Swal from "sweetalert2";
import { exportRestoran, RestoranExportData } from "@/lib/actions/admin/export/RestoranExport";
import { importRestoran } from "@/lib/actions/admin/import/RestoranImport";

type ImportExportButtonsProps = {
  data: RestoranExportData[];
  disabled?: boolean;
};

export function ImportExportRestoranButtons({
  data,
  disabled = false,
}: ImportExportButtonsProps) {
  const handleExport = () => {
    if (data.length === 0) {
      Swal.fire("Tidak ada data!", "Data tidak tersedia untuk diekspor.", "info");
      return;
    }

    exportRestoran(data);
  };

  const handleImport = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".xlsx, .xls";

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      try {
        const res = await importRestoran(file);

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
