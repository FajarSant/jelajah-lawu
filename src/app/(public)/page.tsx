"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Search, MapPin, Car, Home, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const categories = [
    { name: "Destinasi", icon: MapPin, color: "bg-blue-100 text-blue-600" },
    { name: "Jeep", icon: Car, color: "bg-yellow-100 text-yellow-600" },
    { name: "Villa", icon: Home, color: "bg-green-100 text-green-600" },
    { name: "Restoran", icon: Utensils, color: "bg-pink-100 text-pink-600" },
  ];

  const rekomendasi = [
    {
      title: "Gunung Lawu",
      image: "/images/lawu.jpg",
      location: "Karanganyar, Jawa Tengah",
    },
    {
      title: "Telaga Sarangan",
      image: "/images/sarangan.jpg",
      location: "Magetan, Jawa Timur",
    },
    {
      title: "Air Terjun Grojogan Sewu",
      image: "/images/grojogan.jpg",
      location: "Tawangmangu, Jawa Tengah",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full">
        <Image
          src="/images/hero-travel.jpg"
          alt="Hero Travel"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Jelajahi Keindahan Lawu
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-lg md:text-xl mb-6"
          >
            Temukan destinasi terbaik, jeep, villa, dan kuliner dalam satu aplikasi.
          </motion.p>
          {/* Search Bar */}
          <div className="bg-white rounded-full flex items-center shadow-lg w-full max-w-xl overflow-hidden">
            <input
              type="text"
              placeholder="Cari destinasi, jeep, villa, restoran..."
              className="flex-1 px-4 py-3 text-gray-700 outline-none"
            />
            <Button className="rounded-none rounded-r-full px-6 py-3">
              <Search size={20} />
            </Button>
          </div>
        </div>
      </section>

      {/* Kategori Populer */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Kategori Populer</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              key={cat.name}
              className={`flex flex-col items-center justify-center gap-3 p-6 rounded-xl shadow-sm border ${cat.color} cursor-pointer hover:shadow-md`}
            >
              <cat.icon size={28} />
              <span className="font-medium">{cat.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Rekomendasi Destinasi */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Rekomendasi Untuk Anda</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {rekomendasi.map((item) => (
            <motion.div
              whileHover={{ scale: 1.02 }}
              key={item.title}
              className="bg-white rounded-xl overflow-hidden shadow-md cursor-pointer"
            >
              <div className="relative w-full h-48">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-8 mt-12 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Jelajah Lawu. Semua hak dilindungi.
      </footer>
    </div>
  );
}
