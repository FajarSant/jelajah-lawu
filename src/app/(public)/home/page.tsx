import { BookingOptions } from "@/components/public/BookingOptions";
import { FeaturedDestinations } from "@/components/public/FeaturedDestination";
import { Header } from "@/components/public/Header";
import { Hero } from "@/components/public/Hero";
import { Promotions } from "@/components/public/Promotion";
import React from "react";
import { Footer } from "react-day-picker";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-50">
      <Header />
      <main className="flex-1">
        <Hero />
        <BookingOptions />
        <FeaturedDestinations />
        <Promotions />
      </main>
      <Footer />
    </div>
  );
}
