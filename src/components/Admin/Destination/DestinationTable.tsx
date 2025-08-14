"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Eye, Pencil, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Swal from "sweetalert2";
import { ImportExportButtons } from "@/components/Admin/Button/ImportExportButtonDestination";
import { hapusDestinasi } from "@/lib/actions/admin/destination/destination-actions";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Destinasi = {
  id: string;
  nama: string;
  lokasi: string;
  harga: number;
  deskripsi: string;
  gambarUrl: string;
  vendorId: string;
  vendorNama: string;
  createdAt: string | Date;
};

type Props = {
  destinasi: Destinasi[];
};

export function DestinationTable({ destinasi }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Yakin ingin menghapus?",
      text: "Tindakan ini tidak bisa dibatalkan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonColor: "#d33",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      setDeletingId(id);
      try {
        const res = await hapusDestinasi(id);
        if (res.success) {
          await Swal.fire("Berhasil!", "Destinasi berhasil dihapus", "success");
          window.location.reload();
        } else {
          await Swal.fire(
            "Gagal!",
            "Terjadi kesalahan saat menghapus.",
            "error"
          );
        }
      } catch {
        await Swal.fire("Error!", "Gagal menghapus destinasi.", "error");
      } finally {
        setDeletingId(null);
      }
    }
  };

  const filtered = destinasi.filter((d) =>
    d.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="shadow-lg border border-gray-100">
      <CardHeader className="pb-4 border-b border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Cari destinasi..."
                className="pl-9 rounded-full"
              />
            </div>

            <ImportExportButtons data={destinasi} />

            <Link href="/admin/destination/create">
              <Button className="whitespace-nowrap rounded-full px-4 bg-blue-600 hover:bg-blue-700 text-white">
                + Tambah Destinasi
              </Button>
            </Link>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Nama</TableHead>
              <TableHead>Lokasi</TableHead>
              <TableHead>Harga</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>Dibuat</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((item, idx) => (
              <TableRow
                key={item.id}
                className={`transition-colors hover:bg-gray-50 ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                }`}
              >
                <TableCell className="font-medium">{item.nama}</TableCell>
                <TableCell>{item.lokasi}</TableCell>
                <TableCell>Rp{item.harga.toLocaleString()}</TableCell>
                <TableCell>{item.vendorNama}</TableCell>
                <TableCell>
                  {new Date(item.createdAt).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell className="text-center space-x-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link href={`/admin/destinasi/${item.id}`}>
                          <Button
                            size="icon"
                            variant="outline"
                            className="rounded-full"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Detail</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link href={`/admin/destinasi/${item.id}/edit`}>
                          <Button
                            size="icon"
                            variant="secondary"
                            className="rounded-full"
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Edit</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="icon"
                          variant="destructive"
                          onClick={() => handleDelete(item.id)}
                          disabled={deletingId === item.id}
                          className="rounded-full"
                        >
                          {deletingId === item.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Hapus</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filtered.length === 0 && (
          <div className="text-center text-sm text-muted-foreground py-6">
            Tidak ada data destinasi.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
