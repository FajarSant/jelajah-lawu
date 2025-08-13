import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, CalendarCheck, Ban, Wallet, MapPin } from "lucide-react";

interface BookingStatProps {
  statistik: {
    totalBooking: number;
    totalPerKategori: {
      destinasi: number;
      jeep: number;
      villa: number;
      restoran: number;
    };
    totalPerStatus: {
      diproses: number;
      selesai: number;
      dibatalkan: number;
    };
    totalPendapatan: number;
  };
}

export default function BookingStatsCard({ statistik }: BookingStatProps) {
  const stats = [
    {
      title: "Total Booking",
      value: statistik.totalBooking,
      icon: <CalendarCheck className="h-5 w-5 text-blue-600" />,
      color: "bg-blue-100",
    },
    {
      title: "Pendapatan",
      value: `Rp ${statistik.totalPendapatan.toLocaleString("id-ID")}`,
      icon: <Wallet className="h-5 w-5 text-green-600" />,
      color: "bg-green-100",
    },
    {
      title: "Sedang Diproses",
      value: statistik.totalPerStatus.diproses,
      icon: <TrendingUp className="h-5 w-5 text-yellow-600" />,
      color: "bg-yellow-100",
    },
    {
      title: "Selesai",
      value: statistik.totalPerStatus.selesai,
      icon: <MapPin className="h-5 w-5 text-purple-600" />,
      color: "bg-purple-100",
    },
    {
      title: "Dibatalkan",
      value: statistik.totalPerStatus.dibatalkan,
      icon: <Ban className="h-5 w-5 text-red-600" />,
      color: "bg-red-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {stats.map((item, i) => (
        <Card key={i} className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            <div className={`p-2 rounded-full ${item.color}`}>{item.icon}</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
