'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
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
import { Search, Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ImportExportVillaButtons } from "@/components/Admin/Button/ImportExportButtonVilla"; // sesuaikan path ini

type Villa = {
  id: string;
  nama: string;
  lokasi: string;
  harga: number;
  kapasitas: number;
  deskripsi: string;
  fasilitas: string | null;
  gambarUrl: string;
  vendorId: string;
  vendorNama: string;
  createdAt: string | Date;
};


type Props = {
  villas: Villa[];
};

export function VillaTable({ villas }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filtered = villas.filter((villa) =>
    villa.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Cari villa..."
                className="pl-9"
              />
            </div>

            <ImportExportVillaButtons data={villas} />

            <Link href="/admin/villa/create">
              <Button className="whitespace-nowrap">+ Tambah Villa</Button>
            </Link>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Lokasi</TableHead>
              <TableHead>Harga</TableHead>
              <TableHead>Kapasitas</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>Dibuat</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((villa) => (
              <TableRow key={villa.id}>
                <TableCell className="font-medium">{villa.nama}</TableCell>
                <TableCell>{villa.lokasi}</TableCell>
                <TableCell>Rp{villa.harga.toLocaleString()}</TableCell>
                <TableCell>{villa.kapasitas} orang</TableCell>
                <TableCell>{villa.vendorNama}</TableCell>
                <TableCell>
                  {new Date(villa.createdAt).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell className="text-center space-x-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link href={`/admin/villa/${villa.id}`}>
                          <Button size="icon" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>Detail</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link href={`/admin/villa/${villa.id}/edit`}>
                          <Button size="icon" variant="secondary">
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>Edit</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="icon"
                          variant="destructive"
                          onClick={() => console.log("hapus", villa.id)}
                          disabled={deletingId === villa.id}
                        >
                          {deletingId === villa.id ? (
                            <span className="text-xs">...</span>
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Hapus</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filtered.length === 0 && (
          <div className="text-center text-sm text-muted-foreground py-6">
            Tidak ada data villa.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
