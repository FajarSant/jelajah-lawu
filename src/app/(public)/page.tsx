"use client";


import CategoryCard from "@/components/public/CategoryCard";
import HeroBanner from "@/components/public/HeroBanner";
import RecommendationCard from "@/components/public/RecomendationCard";
import { MapPin, Car, Home, Utensils } from "lucide-react";

export default function HomePage() {
  const categories = [
    { title: "Destinasi", icon: MapPin, href: "/destinasi", color: "bg-gradient-to-r from-blue-500 to-indigo-500" },
    { title: "Jeep Tour", icon: Car, href: "/jeep", color: "bg-gradient-to-r from-green-500 to-teal-500" },
    { title: "Villa", icon: Home, href: "/villa", color: "bg-gradient-to-r from-pink-500 to-rose-500" },
    { title: "Restoran", icon: Utensils, href: "/restoran", color: "bg-gradient-to-r from-yellow-500 to-orange-500" },
  ];

  const recommendations = [
    { title: "Pantai Kuta", description: "Nikmati pasir putih dan ombak yang mempesona.", image: "/images/rekomendasi-1.jpg", href: "/detail/1" },
    { title: "Gunung Bromo", description: "Pengalaman jeep tour yang tak terlupakan.", image: "/images/rekomendasi-2.jpg", href: "/detail/2" },
    { title: "Villa Bali", description: "Rasakan kenyamanan villa private di tepi pantai.", image: "/images/rekomendasi-3.jpg", href: "/detail/3" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <HeroBanner />

      {/* Categories */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-10">Jelajahi Berdasarkan Kategori</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <CategoryCard key={cat.title} {...cat} />
          ))}
        </div>
      </section>

      {/* Recommendations */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-10">Rekomendasi Untuk Anda</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendations.map((rec) => (
            <RecommendationCard key={rec.title} {...rec} />
          ))}
        </div>
      </section>
    </div>
  );
}
