"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SearchBar from "./SearchBar";

export default function HeroBanner() {
  return (
    <section className="relative h-[75vh] flex flex-col justify-center items-center text-center text-white">
      <Image
        src="/images/hero-travel.jpg"
        alt="Travel Hero"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl px-4"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Jelajahi Keindahan Nusantara
        </h1>
        <p className="mb-8 text-lg md:text-xl text-gray-200">
          Temukan destinasi, villa, jeep tour, dan kuliner terbaik hanya di satu aplikasi.
        </p>
        <SearchBar />
      </motion.div>
    </section>
  );
}
