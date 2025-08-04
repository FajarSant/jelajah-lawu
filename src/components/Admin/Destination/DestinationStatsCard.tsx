"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Statistik = {
  totalDestinasi: number;
  rataRataHarga: number;
  totalReview: number;
  totalFavorit: number;
  totalBooking: number;
};

type Props = {
  statistik: Statistik;
};

export default function DestinationDashboard({ statistik }: Props) {
  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Statistik */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl font-semibold">
            Statistik Destinasi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            <StatItem label="Total Destinasi" value={statistik.totalDestinasi} />
            <StatItem
              label="Rata-rata Harga"
              value={`Rp${statistik.rataRataHarga.toLocaleString()}`}
            />
            <StatItem label="Total Ulasan" value={statistik.totalReview} />
            <StatItem label="Total Favorit" value={statistik.totalFavorit} />
            <StatItem label="Total Booking" value={statistik.totalBooking} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatItem({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col items-start space-y-1">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-lg font-bold text-foreground">{value}</span>
    </div>
  );
}
