'use client';

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Search, Eye, Pencil, Trash2 } from "lucide-react";
// import { ImportExportBookingButtons } from "../Button/ImportExportButtonBooking"; // opsional

interface BookingTableProps {
  bookings: {
    id: string;
    namaUser: string;
    kategori: string;
    namaItem: string;
    status: string;
    totalHarga: number;
    tanggal: Date;
  }[];
}

export function BookingTable({ bookings }: BookingTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filtered = bookings.filter((b) =>
    b.namaUser.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.kategori.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.namaItem.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusVariant = (status: string) => {
    switch (status) {
      case "SELESAI":
        return "default";
      case "DIPROSES":
        return "secondary";
      case "DIBATALKAN":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader className="pb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle>Booking Terbaru</CardTitle>
          <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Cari booking..."
                className="pl-9"
              />
            </div>

            {/* <ImportExportBookingButtons data={bookings} /> */}

            <Link href="/admin/booking/create">
              <Button className="whitespace-nowrap">+ Tambah Booking</Button>
            </Link>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama User</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Nama Item</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total Harga</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((b) => (
              <TableRow key={b.id}>
                <TableCell>{b.namaUser}</TableCell>
                <TableCell>{b.kategori}</TableCell>
                <TableCell>{b.namaItem}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant(b.status)}>{b.status}</Badge>
                </TableCell>
                <TableCell>Rp {b.totalHarga.toLocaleString("id-ID")}</TableCell>
                <TableCell>
                  {new Date(b.tanggal).toLocaleDateString("id-ID")}
                </TableCell>
                <TableCell className="text-center space-x-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link href={`/admin/booking/${b.id}`}>
                          <Button size="icon" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>Detail</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link href={`/admin/booking/${b.id}/edit`}>
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
                          onClick={() => console.log("hapus", b.id)}
                          disabled={deletingId === b.id}
                        >
                          {deletingId === b.id ? (
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
            Tidak ada data booking.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
