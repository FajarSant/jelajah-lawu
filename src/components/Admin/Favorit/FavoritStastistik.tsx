"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Heart, MapPin, Car, Home, Utensils } from "lucide-react";

interface FavoriteStatProps {
  statistik: {
    totalFavorite: number;
    totalPerKategori: {
      destinasi: number;
      jeep: number;
      villa: number;
      restoran: number;
    };
  };
}

export default function FavoriteDashboardStatsCard({ statistik }: FavoriteStatProps) {
  const stats = [
    {
      title: "Total Favorit",
      value: statistik.totalFavorite,
      icon: Heart,
      color: "from-pink-500 to-rose-500",
    },
    {
      title: "Destinasi Favorit",
      value: statistik.totalPerKategori.destinasi,
      icon: MapPin,
      color: "from-blue-500 to-indigo-500",
    },
    {
      title: "Jeep Favorit",
      value: statistik.totalPerKategori.jeep,
      icon: Car,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Villa Favorit",
      value: statistik.totalPerKategori.villa,
      icon: Home,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Restoran Favorit",
      value: statistik.totalPerKategori.restoran,
      icon: Utensils,
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
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
