"use client";

import { Card, CardContent } from "@/components/ui/card";

interface Props {
  statistik: {
    totalVilla: number;
    rataRataHarga: number;
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

export default function VillaDashboardStatsCard({ statistik }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">Total Villa</p>
          <p className="text-xl font-bold">{statistik.totalVilla}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">Rata-rata Harga</p>
          <p className="text-xl font-bold">{formatRp(statistik.rataRataHarga)}</p>
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
