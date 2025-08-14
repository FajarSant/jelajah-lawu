import { Card, CardContent } from "@/components/ui/card";
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
      icon: CalendarCheck,
      color: "from-blue-500 to-indigo-500",
    },
    {
      title: "Pendapatan",
      value: `Rp${statistik.totalPendapatan.toLocaleString("id-ID")}`,
      icon: Wallet,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Sedang Diproses",
      value: statistik.totalPerStatus.diproses,
      icon: TrendingUp,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Selesai",
      value: statistik.totalPerStatus.selesai,
      icon: MapPin,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Dibatalkan",
      value: statistik.totalPerStatus.dibatalkan,
      icon: Ban,
      color: "from-red-500 to-rose-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {stats.map((stat) => (
        <Card
          key={stat.title}
          className="overflow-hidden rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
        >
          {/* Gradient top bar */}
          <div className={`h-2 bg-gradient-to-r ${stat.color}`} />

          <CardContent className="p-5 flex items-center gap-4">
            {/* Icon */}
            <div
              className={`p-3 rounded-full bg-gradient-to-r ${stat.color} text-white`}
            >
              <stat.icon size={22} />
            </div>

            {/* Text */}
            <div>
              <h3 className="text-sm text-gray-500">{stat.title}</h3>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
