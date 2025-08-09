"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    { title: "Total Review", value: statistik.totalReview, icon: MessageSquare },
    { title: "Destinasi", value: statistik.totalPerKategori.destinasi, icon: MapPin },
    { title: "Jeep", value: statistik.totalPerKategori.jeep, icon: Car },
    { title: "Villa", value: statistik.totalPerKategori.villa, icon: Home },
    { title: "Restoran", value: statistik.totalPerKategori.restoran, icon: Utensils },
    { title: "Rata-rata Rating", value: statistik.rataRataNilai.toFixed(1), icon: Star },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <Card key={idx} className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
