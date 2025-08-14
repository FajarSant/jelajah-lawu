import { Card, CardContent } from "@/components/ui/card";
import { Car, CalendarCheck, DollarSign, TrendingUp } from "lucide-react";

interface StatistikProps {
  totalJeepTour: number;
  rataRataHarga: number;
  totalBooking: number;
  totalPendapatan: number;
}

export function JeepStatistik({
  totalJeepTour,
  rataRataHarga,
  totalBooking,
  totalPendapatan,
}: StatistikProps) {
  const stats = [
    {
      title: "Total Jeep Tour",
      value: totalJeepTour,
      icon: Car,
      color: "from-blue-500 to-indigo-500",
    },
    {
      title: "Total Booking",
      value: totalBooking,
      icon: CalendarCheck,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Total Pendapatan",
      value: `Rp${totalPendapatan.toLocaleString()}`,
      icon: DollarSign,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Rata-rata Harga",
      value: `Rp${rataRataHarga.toLocaleString()}`,
      icon: TrendingUp,
      color: "from-pink-500 to-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
