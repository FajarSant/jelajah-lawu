"use client";

import { Card, CardContent } from "@/components/ui/card";

interface Props {
  statistik: {
    totalRestoran: number;
    rataRataHargaMenu: number;
    totalBooking: number;
    totalPendapatan: number;
  };
}

const formatRp = (angka: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(angka);

export default function RestoranDashboardStatsCard({ statistik }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">Total Restoran</p>
          <p className="text-xl font-bold">{statistik.totalRestoran}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">Rata-rata Harga Menu</p>
          <p className="text-xl font-bold">{formatRp(statistik.rataRataHargaMenu)}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">Total Booking</p>
          <p className="text-xl font-bold">{statistik.totalBooking}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">Total Pendapatan</p>
          <p className="text-xl font-bold">{formatRp(statistik.totalPendapatan)}</p>
        </CardContent>
      </Card>
    </div>
  );
}
