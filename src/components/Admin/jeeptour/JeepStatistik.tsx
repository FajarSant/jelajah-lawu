import { Card, CardContent } from "@/components/ui/card";

interface StatistikProps {
  totalJeepTour: number;
  rataRataHarga: number;
  totalBooking: number;
  totalPendapatan: number;
}

export function JeepStatistik({ totalJeepTour, rataRataHarga, totalBooking, totalPendapatan }: StatistikProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <h3 className="text-sm text-muted-foreground">Total Jeep Tour</h3>
          <p className="text-xl font-bold">{totalJeepTour}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <h3 className="text-sm text-muted-foreground">Total Booking</h3>
          <p className="text-xl font-bold">{totalBooking}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <h3 className="text-sm text-muted-foreground">Total Pendapatan</h3>
          <p className="text-xl font-bold">Rp{totalPendapatan.toLocaleString()}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <h3 className="text-sm text-muted-foreground">Rata-rata Harga</h3>
          <p className="text-xl font-bold">Rp{rataRataHarga.toLocaleString()}</p>
        </CardContent>
      </Card>
    </div>
  );
}
