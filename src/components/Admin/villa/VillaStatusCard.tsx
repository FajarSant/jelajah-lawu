"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Home, Tag, CalendarCheck, DollarSign } from "lucide-react";

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
  const stats = [
    {
      title: "Total Villa",
      value: statistik.totalVilla,
      icon: Home,
      color: "from-blue-500 to-indigo-500",
    },
    {
      title: "Rata-rata Harga",
      value: formatRp(statistik.rataRataHarga),
      icon: Tag,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Total Booking",
      value: statistik.totalBooking,
      icon: CalendarCheck,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Total Pendapatan",
      value: formatRp(statistik.totalPendapatan),
      icon: DollarSign,
      color: "from-yellow-500 to-orange-500",
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
