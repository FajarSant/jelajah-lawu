"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface RecommendationCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
}

export default function RecommendationCard({ title, description, image, href }: RecommendationCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow-md overflow-hidden"
    >
      <div className="relative h-56">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <Button variant="outline" asChild>
          <Link href={href}>Lihat Detail</Link>
        </Button>
      </div>
    </motion.div>
  );
}
