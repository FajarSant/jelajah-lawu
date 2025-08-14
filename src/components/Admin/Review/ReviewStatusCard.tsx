"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star, MessageSquare, MapPin, Car, Home, Utensils } from "lucide-react";

interface ReviewStatProps {
  statistik: {
    totalReview: number;
    totalPerKategori: {
      destinasi: number;
      jeep: number;
      villa: number;
      restoran: number;
    };
    rataRataNilai: number;
  };
}

export default function ReviewDashboardStatsCard({ statistik }: ReviewStatProps) {
  const stats = [
    {
      title: "Total Review",
      value: statistik.totalReview,
      icon: MessageSquare,
      color: "from-blue-500 to-indigo-500",
    },
    {
      title: "Destinasi",
      value: statistik.totalPerKategori.destinasi,
      icon: MapPin,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Jeep",
      value: statistik.totalPerKategori.jeep,
      icon: Car,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Villa",
      value: statistik.totalPerKategori.villa,
      icon: Home,
      color: "from-pink-500 to-purple-500",
    },
    {
      title: "Restoran",
      value: statistik.totalPerKategori.restoran,
      icon: Utensils,
      color: "from-teal-500 to-cyan-500",
    },
    {
      title: "Rata-rata Rating",
      value: statistik.rataRataNilai.toFixed(1),
      icon: Star,
      color: "from-red-500 to-pink-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
