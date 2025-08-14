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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ImportExportJeepButtons } from "../Button/ImportExportButtonJeep";

type JeepTour = {
  id: string;
  nama: string;
  lokasi: string;
  harga: number;
  deskripsi: string;
  kapasitas: number;
  durasi: number;
  rute: string;
  gambarUrl: string;
  vendorId: string;
  vendorNama: string;
  createdAt: string | Date;
};

type Props = {
  jeepTours: JeepTour[];
};

export function JeepTourTable({ jeepTours }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filtered = jeepTours.filter((jt) =>
    jt.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="shadow-sm border rounded-xl">
      <CardHeader className="pb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Cari jeep tour..."
                className="pl-9 rounded-lg border-muted focus-visible:ring-2 focus-visible:ring-primary/50"
              />
            </div>

            <ImportExportJeepButtons data={jeepTours} />

            <Link href="/admin/jeeptour/create">
              <Button className="whitespace-nowrap shadow-sm transition-all hover:shadow-md">
                + Tambah Jeep Tour
              </Button>
            </Link>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0 overflow-x-auto">
        <Table className="min-w-full rounded-lg overflow-hidden">
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Nama</TableHead>
              <TableHead>Lokasi</TableHead>
              <TableHead>Harga</TableHead>
              <TableHead>Kapasitas</TableHead>
              <TableHead>Durasi</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>Dibuat</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((item, index) => (
              <TableRow
                key={item.id}
                className={`transition-colors hover:bg-muted/30 ${
                  index % 2 === 0 ? "bg-background" : "bg-muted/10"
                }`}
              >
                <TableCell className="font-medium truncate max-w-[150px]">
                  {item.nama}
                </TableCell>
                <TableCell className="truncate max-w-[120px]">{item.lokasi}</TableCell>
                <TableCell>Rp{item.harga.toLocaleString()}</TableCell>
                <TableCell>{item.kapasitas}</TableCell>
                <TableCell>{item.durasi} jam</TableCell>
                <TableCell className="truncate max-w-[120px]">{item.vendorNama}</TableCell>
                <TableCell>
                  {new Date(item.createdAt).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell className="text-center space-x-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link href={`/admin/jeeptour/${item.id}`}>
                          <Button size="icon" variant="outline" className="transition-all hover:scale-105">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>Detail</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link href={`/admin/jeeptour/${item.id}/edit`}>
                          <Button size="icon" variant="secondary" className="transition-all hover:scale-105">
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
                          onClick={() => console.log("hapus", item.id)}
                          disabled={deletingId === item.id}
                          className="transition-all hover:scale-105"
                        >
                          {deletingId === item.id ? (
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
            Tidak ada data jeep tour.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
